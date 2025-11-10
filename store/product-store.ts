import { defineStore } from 'pinia';
import axios from "axios";
// โหลดค่าจากไฟล์ .env
interface ProductsInterface {
  Products_id: string;
  ProductBrand: string;
  ProductCode: string;
  type: string;
  price: number;
  salePercent: number;
  dateSell: string;
  Keyfeature: string;
  DataSheetLink: string;
  Color: [{ colorHex: string , colorname :string }];
  len: {
    detail: string;
  };
  image: string;
  images: string[];
  tag: {
    ICT64: boolean;
    Dome: boolean;
    Bullet: boolean;
    "Air-solarcell": boolean;
    accesscontrol: boolean;
    interActive: boolean;
    inverter5kw1p: boolean;
    leddisplay: boolean;
    Networkswitch: boolean;
    NVR: boolean;
    solarpanal: boolean;
  };
  showCompare: boolean;
  checked: boolean;
}
interface productSearchInterface {
  "Products_id": string,
  "ProductBrand": string,
  "ProductCode": string,
  "type": string,
  "image": string
}
// export dataUserstore to store for use nuxt manage
export const dataProductStore = defineStore('data-store', {
  state: () => ({
    allProducts: [] as ProductsInterface[],
    showProductWithFilter: [] as ProductsInterface[],
    productSearch: [] as productSearchInterface[],
    BannerProduct: [
      { image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-menu-promotion-banner-2x6-design-template-829dd4c0a9901048bf81549ea076baa7_screen.jpg?ts=1633750162' },
      { image: 'https://media.istockphoto.com/id/1368645225/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B9%82%E0%B8%94%E0%B8%A2%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B9%81%E0%B8%A5%E0%B9%87%E0%B8%9B%E0%B8%97%E0%B9%87%E0%B8%AD%E0%B8%9B%E0%B9%83%E0%B8%99%E0%B8%A3%E0%B8%B0%E0%B8%AB%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B8%E0%B8%A1.jpg?s=2048x2048&w=is&k=20&c=KCsRen-z-8ERHPQGYoMpXSgBjXgBhPCCIKT5gm8E3ew=' },
      { image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ],
    FilterValue: ref<string[]>([]),
    brandFilterValue: ref<string[]>([]),
    CatagoriesType: '',
    sortValue: 'ใหม่ - เก่า',
    Catagories: [
      {
        name: 'CCTV และอุปกรณ์ที่เกี่ยวข้อง',
        subcategories: [{ name: 'ICT64', checkStatus: false },
        { name: 'Dome', checkStatus: false },
        { name: 'Bullet', checkStatus: false },
        { name: 'NVR', checkStatus: false },
        { name: 'Networkswitch', checkStatus: false }],
      },
      {
        name: 'แผงโซลาเซลล์และอุปกรณ์ที่เกี่ยวข้อง',
        subcategories: [{ name: 'Solar panel', checkStatus: false },
        { name: 'Inverter', checkStatus: false }],
      },
      {
        name: 'Accesscontrol และอุปกรณ์ที่เกี่ยวข้อง',
        subcategories: [{ name: 'Accesscontrol terminal', checkStatus: false },],
      },
      {
        name: 'จอ Interactive',
        subcategories: [],
      },
      {
        name: 'จอ Led display',
        subcategories: [],
      },
      {
        name: 'Air Solarcell',
        subcategories: [{ name: 'Air-solarcellwall', checkStatus: false },
        { name: 'Air-solarcell4way', checkStatus: false }],
      },
    ],
    Brand: [
      { name: 'Hikvision', checkStatus: false },
      { name: 'Dahua', checkStatus: false },
      { name: 'Leyard', checkStatus: false },
      { name: 'Longi', checkStatus: false },
    ],
  }),
  actions: {
    // 
    setDefaultCatagoriesAndBand() {
      this.Brand = [
        { name: 'Hikvision', checkStatus: false },
        { name: 'Dahua', checkStatus: false },
      ]
      this.Catagories = [
        {
          name: 'CCTV และอุปกรณ์ที่เกี่ยวข้อง',
          subcategories: [{ name: 'ICT64', checkStatus: false },
          { name: 'Dome', checkStatus: false },
          { name: 'Bullet', checkStatus: false },
          { name: 'NVR', checkStatus: false },
          { name: 'Networkswitch', checkStatus: false }],
        },
        {
          name: 'แผงโซลาเซลล์และอุปกรณ์ที่เกี่ยวข้อง',
          subcategories: [{ name: 'Solar panel', checkStatus: false },
          { name: 'Inverter', checkStatus: false }],
        },
        {
          name: 'Accesscontrol และอุปกรณ์ที่เกี่ยวข้อง',
          subcategories: [{ name: 'Accesscontrol terminal', checkStatus: false },],
        },
        {
          name: 'จอ Interactive',
          subcategories: [],
        },
        {
          name: 'จอ Led display',
          subcategories: [],
        },
        {
          name: 'Air Solarcell',
          subcategories: [{ name: 'Air-solarcellwall', checkStatus: false },
          { name: 'Air-solarcell4way', checkStatus: false }],
        },
      ]
      this.brandFilterValue = [];
      this.FilterValue = [];
    },
    filterProducts() {
      // Filter by tags and brand
      this.showProductWithFilter = this.allProducts.filter((product) => {
        // Filter by tags: at least one filter in FilterValue should match
        const matchesTags = this.FilterValue.length > 0
          ? this.FilterValue.some((filter) => product.tag[filter as keyof typeof product.tag])
          : true;  // If no filters in FilterValue, skip tag filtering

        // Filter by brand: if brandFilterValue is not empty, match at least one brand
        const matchesBrand = this.brandFilterValue.length > 0
          ? this.brandFilterValue.includes(product.ProductBrand)
          : true;  // If no filters in brandFilterValue, skip brand filtering

        return matchesTags && matchesBrand;
      });

      // Sort by sortValue
      if (this.sortValue === "ใหม่ - เก่า") {
        this.showProductWithFilter.sort((a, b) => new Date(b.dateSell).getTime() - new Date(a.dateSell).getTime());
      } else if (this.sortValue === "เก่า - ใหม่") {
        this.showProductWithFilter.sort((a, b) => new Date(a.dateSell).getTime() - new Date(b.dateSell).getTime());
      } else if (this.sortValue === "ราคาสูง - ราคาต่ำ") {
        this.showProductWithFilter.sort((a, b) => b.price - a.price);
      } else if (this.sortValue === "ราคาต่ำ - ราคาสูง") {
        this.showProductWithFilter.sort((a, b) => a.price - b.price);
      }

      // If both FilterValue and brandFilterValue are empty, return all products sorted by sortValue
      if (!this.FilterValue.length && !this.brandFilterValue.length) {
        this.showProductWithFilter = [...this.allProducts];

        // Sort again if necessary based on sortValue
        if (this.sortValue === "ใหม่ - เก่า") {
          this.showProductWithFilter.sort((a, b) => new Date(b.dateSell).getTime() - new Date(a.dateSell).getTime());
        } else if (this.sortValue === "เก่า - ใหม่") {
          this.showProductWithFilter.sort((a, b) => new Date(a.dateSell).getTime() - new Date(b.dateSell).getTime());
        } else if (this.sortValue === "ราคาสูง - ราคาต่ำ") {
          this.showProductWithFilter.sort((a, b) => b.price - a.price);
        } else if (this.sortValue === "ราคาต่ำ - ราคาสูง") {
          this.showProductWithFilter.sort((a, b) => a.price - b.price);
        }
      }
    }
  }
});

