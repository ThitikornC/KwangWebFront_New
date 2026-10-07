<script setup lang="ts">
import { ref, watch } from 'vue'
import { storage, storageRef, uploadBytesResumable, getDownloadURL } from '~/utils/firebase'

const props = defineProps({
  modelValue: { type: Object as () => any, default: null }
})
const emits = defineEmits(['save','cancel'])

const form = ref({
  Products_id: '',
  ProductBrand: '',
  ProductCode: '',
  type: '',
  price: 0,
  image: '',
  visible: true
  ,
  imagePath: ''
})

// file upload state
const file = ref<File | null>(null)
const preview = ref<string | null>(null)
const uploading = ref(false)
const uploadProgress = ref(0)

function removeImage() {
  preview.value = null
  file.value = null
  form.value.image = ''
  form.value.imagePath = ''
}


watch(() => props.modelValue, (v) => {
  if (v) {
    form.value = { ...v }
    preview.value = v.image || null
  } else {
    form.value = { Products_id: '', ProductBrand: '', ProductCode: '', type: '', price: 0, image: '', visible: true, imagePath: '' }
    preview.value = null
    file.value = null
  }
}, { immediate: true })

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    file.value = input.files[0]
    preview.value = URL.createObjectURL(file.value)
  }
}

function uploadFileAndGetUrl(): Promise<string | null> {
  return new Promise(async (resolve, reject) => {
    if (!file.value) return resolve(form.value.image || null)
    try {
      const path = `product-images/${Date.now()}_${file.value.name}`
      const sRef = storageRef(storage, path)
      const task = uploadBytesResumable(sRef, file.value)

      uploading.value = true
      task.on('state_changed', (snapshot) => {
        uploadProgress.value = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      }, (err) => {
        uploading.value = false
        reject(err)
      }, async () => {
        const url = await getDownloadURL(task.snapshot.ref)
        uploading.value = false
        // set both download URL and the storage path so admin can delete the object later
        form.value.image = url
        form.value.imagePath = path
        resolve(url)
      })
    } catch (err) {
      uploading.value = false
      reject(err)
    }
  })
}

async function submit() {
  if (!form.value.ProductCode || !form.value.ProductBrand) {
    alert('กรุณากรอกชื่อแบรนด์และรหัสสินค้า')
    return
  }
  try {
    // upload file if present
    if (file.value) {
      const url = await uploadFileAndGetUrl()
      if (url) form.value.image = url
    }
    emits('save', { ...form.value })
  } catch (err: any) {
    console.error('Upload failed', err)
    alert('อัปโหลดรูปไม่สำเร็จ: ' + (err.message || err))
  }
}

function cancel() {
  emits('cancel')
}
</script>

<template>
  <div class="p-4 bg-white border rounded shadow-sm max-w-lg">
    <div class="flex flex-col gap-3">
      <label class="text-sm">Brand</label>
      <input v-model="form.ProductBrand" class="border px-3 py-2" />

      <label class="text-sm">Product Code</label>
      <input v-model="form.ProductCode" class="border px-3 py-2" />

      <label class="text-sm">Type</label>
      <input v-model="form.type" class="border px-3 py-2" />

      <label class="text-sm">Price</label>
      <input type="number" v-model.number="form.price" class="border px-3 py-2" />

      <label class="text-sm">รูปภาพสินค้า</label>
      <div class="border p-2 rounded">
        <div v-if="preview" class="mb-2">
          <img :src="preview" alt="preview" class="max-h-40 object-contain" />
        </div>
        <div v-else class="text-sm text-gray-500 mb-2">ยังไม่มีรูปภาพ เลือกไฟล์เพื่อนำขึ้น</div>
          <div class="flex items-center gap-2">
            <label class="px-3 py-2 bg-gray-100 rounded cursor-pointer border">
              เลือกไฟล์
              <input type="file" accept="image/*" @change="onFileChange" class="hidden" />
            </label>
            <button v-if="preview" type="button" @click="removeImage" class="px-3 py-2 border rounded">ลบ</button>
            <div v-if="uploading" class="text-sm text-gray-600">อัปโหลด: {{ uploadProgress }}%</div>
          </div>
      </div>

      <div class="flex gap-2 justify-end mt-2">
        <button @click="cancel" class="px-4 py-2 border">ยกเลิก</button>
        <button @click="submit" class="px-4 py-2 bg-reddeep text-white">บันทึก</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-reddeep { background: #7F181B }
</style>
