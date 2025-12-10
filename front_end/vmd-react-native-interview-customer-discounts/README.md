# Village Medical - Frontend Interview

![Village Medical](https://www.villagemd.com/hs-fs/hubfs/villagemd-logo-1.png?width=297&height=73&name=villagemd-logo-1.png)

## Introduction

This is a simple application that allows business owners to manage discounts for their customers. The app is built using React-Native, Expo amd react-native-paper.

## Features

- View Customer List
  - Business owners can see a list of their customers along with their yearly spend.
- Assign and Remove Discounts
  - Add or remove discounts for individual customers.
- Unassigned Discounts Page
  - View all discounts that have not been assigned to any customer.
- Discount Validation
  - When assigning discounts, the app validates the assignment based on specific business rules to ensure fairness and compliance.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Task

As part of this project, you are tasked with the following:

####   1. Implement an Unassigned Discounts Page
- Create a new page that displays all discounts which have not been assigned to any customer.
- This page should be accessible from the home screen via a "View All Unassigned Discounts" button.
- The page should list all unassigned discounts without any additional actions or buttons.

####   2. Complete the validateDiscountAssignment Function
- Implement the `validateDiscountAssignment` function found in the `utils`, which is called whenever a user tries to assign discounts to a customer.
- The function should validate the discount assignment based on the following business rules:
  - #####   Maximum of 3 Discounts per Customer
    - A customer cannot have more than 3 discounts assigned.
  - #####   Maximum Total Discount Value
    - The combined value of the discounts assigned to a customer cannot exceed 20% of their yearly spend.
  - #####   Total Discount Value Limit
    - A customer with a higher yearly spend should not have a total discount value less than a customer with a lower yearly spend.

### Screenshots

![Customer List](./customer-page.png)
![Customer Detail](./customer-detail-page.png)





