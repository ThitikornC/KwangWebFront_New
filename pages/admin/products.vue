<template>
  <div class="p-6 max-w-6xl mx-auto font-thai">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">จัดการสินค้า</h1>
      <div class="flex items-center gap-3">
        <input v-model="search" placeholder="ค้นหาชื่อหรือรหัส" class="border px-3 py-2" />
        <button @click="openNew" class="px-4 py-2 bg-reddeep text-white rounded">เพิ่มสินค้า</button>
      </div>
    </div>

    <div v-if="showForm" class="mb-6">
      <ProductForm :modelValue="editingItem" @save="onSave" @cancel="closeForm" />
    </div>

    <div class="overflow-x-auto bg-white border rounded">
      <table class="min-w-full">
        <thead>
          <tr class="text-left">
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Brand</th>
            <th class="px-4 py-3">Code</th>
            <th class="px-4 py-3">Type</th>
            <th class="px-4 py-3">Visible</th>
            <th class="px-4 py-3">Price</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, idx) in filtered" :key="p.Products_id" class="border-t">
            <td class="px-4 py-3 align-top">{{ idx + 1 }}</td>
            <td class="px-4 py-3">{{ p.ProductBrand }}</td>
            <td class="px-4 py-3">{{ p.ProductCode }}</td>
            <td class="px-4 py-3">{{ p.type }}</td>
            <td class="px-4 py-3">
              <input type="checkbox" :checked="p.visible !== false" @change="toggleVisibility(p)" />
            </td>
            <td class="px-4 py-3">{{ p.price }}</td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button @click="edit(p)" class="px-3 py-1 border">แก้ไข</button>
                <button @click="remove(p.Products_id)" class="px-3 py-1 bg-white border text-reddeep">ลบ</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { storage, storageRef, deleteObject } from '~/utils/firebase'
import ProductForm from '~/components/Shop/ProductForm.vue'
import { dataProductStore } from '~/store/product-store'
import { storeToRefs } from 'pinia'

const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL

const store = dataProductStore()
const { allProducts } = storeToRefs(store)

const search = ref('')
const showForm = ref(false)
const editingItem = ref<any>(null)

const filtered = computed(() => {
  if (!search.value) return allProducts.value
  const q = search.value.toLowerCase()
  return allProducts.value.filter(p => (p.ProductBrand || '').toLowerCase().includes(q) || (p.ProductCode || '').toLowerCase().includes(q))
})

function openNew() {
  editingItem.value = null
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingItem.value = null
}

async function fetchProducts() {
  try {
    const resp = await axios.get(`${apiURL}/products/all`)
    // assume API returns array of products
    store.allProducts = resp.data
    if (store.filterProducts) store.filterProducts()
  } catch (err) {
    console.error('Failed to fetch products from API, falling back to local store', err)
    // keep existing local store
  }
}

onMounted(async () => {
  await fetchProducts()
})

async function onSave(payload: any) {
  try {
    if (!payload.Products_id) {
      // create
      const resp = await axios.post(`${apiURL}/products`, payload)
      // if API returns created object, push that, otherwise push payload
      const created = resp.data || payload
      store.allProducts.push({ ...created, showCompare: false, checked: false })
    } else {
      // update
      await axios.put(`${apiURL}/products/${payload.Products_id}`, payload)
      const idx = store.allProducts.findIndex((x: any) => x.Products_id === payload.Products_id)
      if (idx > -1) store.allProducts[idx] = { ...store.allProducts[idx], ...payload }
    }
    if (store.filterProducts) store.filterProducts()
    closeForm()
    // notify other pages to refresh product list
    try { window.dispatchEvent(new Event('products-updated')) } catch (e) { /* ignore server-side */ }
  } catch (err) {
    console.error('Failed to save via API, falling back to local store', err)
    // fallback to local behavior
    if (!payload.Products_id) {
      payload.Products_id = String(Date.now())
      store.allProducts.push({ ...payload, showCompare: false, checked: false })
    } else {
      const idx = store.allProducts.findIndex((x: any) => x.Products_id === payload.Products_id)
      if (idx > -1) store.allProducts[idx] = { ...store.allProducts[idx], ...payload }
    }
    if (store.filterProducts) store.filterProducts()
    closeForm()
    try { window.dispatchEvent(new Event('products-updated')) } catch (e) { }
  }
}

function edit(item: any) {
  editingItem.value = { ...item }
  showForm.value = true
}

async function toggleVisibility(product: any) {
  // flip visible flag
  const newVisible = product.visible === false ? true : false
  try {
    await axios.put(`${apiURL}/products/${product.Products_id}`, { ...product, visible: newVisible })
    const idx = store.allProducts.findIndex((x: any) => x.Products_id === product.Products_id)
    if (idx > -1) {
      store.allProducts[idx].visible = newVisible
    }
    if (store.filterProducts) store.filterProducts()
    try { window.dispatchEvent(new Event('products-updated')) } catch (e) { }
  } catch (err) {
    console.error('Failed to update visibility via API, falling back to local store', err)
    const idx = store.allProducts.findIndex((x: any) => x.Products_id === product.Products_id)
    if (idx > -1) {
      store.allProducts[idx].visible = newVisible
    }
    if (store.filterProducts) store.filterProducts()
    try { window.dispatchEvent(new Event('products-updated')) } catch (e) { }
  }
}

async function remove(id: string) {
  if (!confirm('ลบสินค้านี้จริงหรือไม่?')) return
  // find product before we remove it from store so we can delete its storage file
  const product = store.allProducts.find((x: any) => x.Products_id === id)
  try {
    await axios.delete(`${apiURL}/products/${id}`)
    // delete associated storage file (if any). prefer stored imagePath
    if (product) {
      try {
        if (product.imagePath) {
          const sRef = storageRef(storage, product.imagePath)
          await deleteObject(sRef).catch((e) => console.warn('deleteObject warning', e))
        } else if (product.image) {
          // fallback: try to extract path from download URL
          const m = String(product.image).match(/\/b\/([^\/]+)\/o\/([^?]+)/)
          if (m && m[2]) {
            const decodedPath = decodeURIComponent(m[2])
            const sRef = storageRef(storage, decodedPath)
            await deleteObject(sRef).catch((e) => console.warn('deleteObject warning', e))
          }
        }
      } catch (e) {
        console.warn('Failed to delete storage file:', e)
      }
    }
    const idx = store.allProducts.findIndex((x: any) => x.Products_id === id)
    if (idx > -1) store.allProducts.splice(idx, 1)
    if (store.filterProducts) store.filterProducts()
    try { window.dispatchEvent(new Event('products-updated')) } catch (e) { }
  } catch (err) {
    console.error('Failed to delete via API, falling back to local delete', err)
    // fallback: remove locally and still attempt to delete storage file
    const productLocal = store.allProducts.find((x: any) => x.Products_id === id)
    if (productLocal) {
      try {
        if (productLocal.imagePath) {
          const sRef = storageRef(storage, productLocal.imagePath)
          await deleteObject(sRef).catch((e) => console.warn('deleteObject warning', e))
        } else if (productLocal.image) {
          const m = String(productLocal.image).match(/\/b\/([^\/]+)\/o\/([^?]+)/)
          if (m && m[2]) {
            const decodedPath = decodeURIComponent(m[2])
            const sRef = storageRef(storage, decodedPath)
            await deleteObject(sRef).catch((e) => console.warn('deleteObject warning', e))
          }
        }
      } catch (e) {
        console.warn('Failed to delete storage file (fallback):', e)
      }
    }
    const idx = store.allProducts.findIndex((x: any) => x.Products_id === id)
    if (idx > -1) store.allProducts.splice(idx, 1)
    if (store.filterProducts) store.filterProducts()
    try { window.dispatchEvent(new Event('products-updated')) } catch (e) { }
  }
}
</script>

<style scoped>
.bg-reddeep { background: #7F181B }
.text-reddeep { color: #7F181B }
</style>
