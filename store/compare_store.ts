import { defineStore } from 'pinia';
import axios from "axios";

// export dataUserstore to store for use nuxt manage
interface DataCompare {
  Products_id: string;
  ProductBrand: string;
  ProductCode: string;
  type: string;
  Color: {
    detail: string;
  };
  len: {
    detail: string;
  };
  image: string;
  tag: {
    ICT64: boolean;
    Dome: boolean;
    Bullet: boolean;
  };
}
export const dataComapareProductStore = defineStore('compare-store', {
  state: () => ({
    isOpenCompareComponent: false,
    productDataCompare: Array<DataCompare | null>(4).fill(null),
    catagoriesTypeCompare: ''
  }),
  actions: {
    // เปิดปิด section
    toggleCompareComponent() {
      this.isOpenCompareComponent = !this.isOpenCompareComponent;
    },
    // Add product to comparison list
    addProductCompare(product: DataCompare) {
      const emptyIndex = this.productDataCompare.findIndex(item => item === null);
      const isFull = this.productDataCompare.every(item => item !== null); // Check if full

      if (isFull) {
        console.log("Cannot add more products. Limit reached.");
        return; // Don't add if already full
      }

      if (emptyIndex !== -1) {
        this.productDataCompare[emptyIndex] = product; // Add product to first empty slot
      }
      this.checkCompareFull();
    },
    // Delete product from comparison list
    deleteProductCompare(product: DataCompare) {
      this.productDataCompare = this.productDataCompare.map(item =>
        item && item.Products_id === product.Products_id ? null : item // Set to null if it matches
      );
      this.checkCompareFull();
    },
    // Check if comparison list is full
    checkCompareFull() {
      const hasProducts = this.productDataCompare.some(item => item !== null); // Check if at least one product exists
      this.isOpenCompareComponent = hasProducts; // Set to true if at least one product is present
    },
    setDefaultCompare() {
      this.productDataCompare = Array<DataCompare | null>(4).fill(null)
      this.isOpenCompareComponent = false;
    },
  }
});


