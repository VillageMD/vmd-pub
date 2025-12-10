import dataStore from '../services/dataStore';
import { validateDiscountAssignment } from '../utils/validation';

describe('validateDiscountAssignment', () => {
  beforeEach(() => {
    dataStore.reset();
  });

  it('should return true for valid discount assignments', () => {
    const customerId = 1;
    const discountIds = [1, 2];

    const isValid = validateDiscountAssignment(customerId, discountIds);
    expect(isValid).toBe(true);
  });

  it('should return false if more than 3 discounts are assigned', () => {
    const customerId = 1;
    const discountIds = [1, 2, 3, 4]; 

    const isValid = validateDiscountAssignment(customerId, discountIds);
    expect(isValid).toBe(false);
  });

  it('should return false if total discount value exceeds 20% of yearly spend', () => {
    const customerId = 1;
    const discountIds = [1, 2, 3]; 

    dataStore.discounts = dataStore.discounts.map((discount) => {
      if (discountIds.includes(discount.discountId)) {
        return { ...discount, value: 1000 }; 
      }
      return discount;
    });

    const isValid = validateDiscountAssignment(customerId, discountIds);
    expect(isValid).toBe(false);
  });

  it('should return false if higher-spending customer receives lower discounts', () => {
    dataStore.customers = [
      { customerId: 1, name: 'High Spender', yearlySpend: 10000 },
      { customerId: 2, name: 'Low Spender', yearlySpend: 5000 },
    ];

    dataStore.assignDiscountsToCustomer(2, [5, 6]); 


    const customerId = 1;
    const discountIds = [1];

    const isValid = validateDiscountAssignment(customerId, discountIds);
    expect(isValid).toBe(false);
  });

  it('should return true if higher-spending customer receives equal or higher discounts', () => {
    dataStore.customers = [
      { customerId: 1, name: 'High Spender', yearlySpend: 10000 },
      { customerId: 2, name: 'Low Spender', yearlySpend: 5000 },
    ];


    dataStore.assignDiscountsToCustomer(2, [1]); 

    
    const customerId = 1;
    const discountIds = [5, 6]; 

    const isValid = validateDiscountAssignment(customerId, discountIds);
    expect(isValid).toBe(true);
  });

  it('should handle cases where customers have equal yearly spend', () => {
    dataStore.customers = [
      { customerId: 1, name: 'Customer One', yearlySpend: 8000 },
      { customerId: 2, name: 'Customer Two', yearlySpend: 8000 },
    ];

    dataStore.assignDiscountsToCustomer(1, [2, 3]);

    const customerId = 2;
    const discountIds = [2];

    const isValid = validateDiscountAssignment(customerId, discountIds);
    expect(isValid).toBe(true);
  });
});
