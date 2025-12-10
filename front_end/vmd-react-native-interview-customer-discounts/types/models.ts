export interface Customer {
    customerId: number;
    name: string;
    yearlySpend: number;
  }
  
  export interface Discount {
    discountId: number;
    value: number;
  }
  
  export interface DiscountAssignment {
    discountId: number;
    customerId: number;
  }
  