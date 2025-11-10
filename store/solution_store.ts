import { defineStore } from 'pinia';

export interface Solution {
  id:string;
  projectName: string;
  description: string;
  linkVideoPreview: string;
  date: string;
  linkPresentSheet: string;
  type: string;
  tag: string;
}



export const solutionsStore = defineStore('solution_store', {
  state: () => ({
    solutions: [] as Solution[],
    sol_type_Network: true,
    sol_type_Solarcell: true,
    sol_type_Software: true,
    sol_type_Other: true,
  }),
  actions: {
    handleMenuSelectNetwork() {
      this.sol_type_Network = !this.sol_type_Network;
    },
    handleMenuSelectSolarcell() {
      this.sol_type_Solarcell = !this.sol_type_Solarcell;
    },
    handleMenuSelectSoftware() {
      this.sol_type_Software = !this.sol_type_Software;
    },
    handleMenuSelectOther() {
      this.sol_type_Other = !this.sol_type_Other;
    },
  },
});
