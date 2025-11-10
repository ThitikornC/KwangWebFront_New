import { defineStore } from 'pinia';

interface CartItem {
  productID: string;
  quantity: number;

}
const test = [{

}]

export const cartDataStore = defineStore('cart_store', {
  state: () => ({
    cartData: [] as CartItem[],
  }),
  actions: {
    // เพิ่มสินค้า
    addToCart(productID: string, quantity: number): void {
      if (process.browser) {
        console.log("add product");
      } else {
        console.error('Cannot access localStorage in non-browser environment.');
      }
    },
    // ลบสินค้า
    removeFromCart(productID: string): void {
      if (process.browser) {
        console.log("remove product")
      } else {
        console.error('Cannot access localStorage in non-browser environment.');
      }
    },
    // อัพเดตข้อมูลสินค้า
    updateCart(productID: string, quantity: number): void {
      if (process.browser) {
        console.log("update product")
      } else {
        console.error('Cannot access localStorage in non-browser environment.');
      }
    }
  },
  getters: {
    // ดึงข้อมูลตะกร้าทั้งหมด
    getCartData(): CartItem[] {
      return this.cartData;
    },
    // ดึงจำนวนสินค้าทั้งหมดในตะกร้า
    getTotalItems(): number {
      return this.cartData.reduce((total, item) => total + item.quantity, 0);
    }
  }
});

