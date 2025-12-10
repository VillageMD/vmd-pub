import { Customer, Discount, DiscountAssignment } from '../types/models';
import customerData from '../assets/data/customers.json';
import discountData from '../assets/data/discounts.json';
import discountAssignmentData from '../assets/data/discountAssignments.json';

class DataStore {
  customers: Customer[];
  discounts: Discount[];
  discountAssignments: DiscountAssignment[];

  constructor() {
    this.customers = customerData as Customer[];
    this.discounts = discountData as Discount[];
    this.discountAssignments = discountAssignmentData as DiscountAssignment[];
  }

 
  getCustomers() {
    return this.customers;
  }

  getDiscounts() {
    return this.discounts;
  }

  getDiscountAssignments() {
    return this.discountAssignments;
  }

  reset() {
    this.customers = customerData as Customer[];
    this.discounts = discountData as Discount[];
    this.discountAssignments = discountAssignmentData as DiscountAssignment[];
  }

  assignDiscountsToCustomer(customerId: number, discountIds: number[]) {
    this.discountAssignments = this.discountAssignments.filter(
      (da) => da.customerId !== customerId
    );
    const newAssignments = discountIds.map((discountId) => ({
      discountId,
      customerId,
    }));
    this.discountAssignments = [...this.discountAssignments, ...newAssignments];
  }

}

const dataStore = new DataStore();
export default dataStore;
