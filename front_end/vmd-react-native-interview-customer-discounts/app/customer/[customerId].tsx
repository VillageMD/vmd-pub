// app/customer/[customerId].tsx

import React, { useState, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Button, List, Snackbar, Checkbox } from 'react-native-paper';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import dataStore from '../../services/dataStore';
import { validateDiscountAssignment } from '../../utils/validation';

export default function CustomerDetailScreen() {
  const { customerId } = useLocalSearchParams();
  const navigation = useNavigation();

  const [messageVisible, setMessageVisible] = useState(false);
  const [messageText, setMessageText] = useState('');

  const customerIdNumber = Number(customerId);
  if (isNaN(customerIdNumber)) {
    return <Text>Error: Invalid Customer ID.</Text>;
  }

  const customers = dataStore.getCustomers();
  const discounts = dataStore.getDiscounts();
  const discountAssignments = dataStore.getDiscountAssignments();

  const customer = customers.find((c) => c.customerId === customerIdNumber);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: customer ? customer.name : 'Customer Details',
    });
  }, [navigation, customer]);

  const initialAssignedDiscountIds = discountAssignments
    .filter((da) => da.customerId === customerIdNumber)
    .map((da) => da.discountId);

  const [selectedDiscountIds, setSelectedDiscountIds] = useState<number[]>(initialAssignedDiscountIds);

  const toggleDiscountSelection = (discountId: number) => {
    if (selectedDiscountIds.includes(discountId)) {
      setSelectedDiscountIds(selectedDiscountIds.filter((id) => id !== discountId));
    } else {
      setSelectedDiscountIds([...selectedDiscountIds, discountId]);
    }
  };

  const handleAddDiscount = () => {
    const proposedDiscountIds = selectedDiscountIds;

    const isValid = validateDiscountAssignment(customerIdNumber, proposedDiscountIds);

    if (isValid) {
      dataStore.assignDiscountsToCustomer(customerIdNumber, proposedDiscountIds);
      setSelectedDiscountIds(proposedDiscountIds);
      setMessageText('Discount successfully updated.');
      setMessageVisible(true);
    } else {
      setMessageText('Cannot assign selected discounts due to validation rules.');
      setMessageVisible(true);
    }
  };

  const arraysEqual = (a: number[], b: number[]) => {
    if (a.length !== b.length) return false;
    const aSorted = [...a].sort();
    const bSorted = [...b].sort();
    return aSorted.every((value, index) => value === bSorted[index]);
  };

  const currentAssignedDiscountIds = discountAssignments
    .filter((da) => da.customerId === customerIdNumber)
    .map((da) => da.discountId);

  const isModified = !arraysEqual(selectedDiscountIds, currentAssignedDiscountIds);

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>Name: {customer?.name}</Text>
      <Text style={styles.spendText}>Yearly Spend: ${customer?.yearlySpend}</Text>

      <Text style={styles.sectionTitle}>Select Discounts to Assign:</Text>
      <FlatList
        data={discounts}
        keyExtractor={(item) => item.discountId.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedDiscountIds.includes(item.discountId);

          return (
            <List.Item
              title={`Discount ID: ${item.discountId}`}
              description={`Value: $${item.value}`}
              onPress={() => toggleDiscountSelection(item.discountId)}
              left={() => (
                <Checkbox
                  status={isSelected ? 'checked' : 'unchecked'}
                  onPress={() => toggleDiscountSelection(item.discountId)}
                />
              )}
            />
          );
        }}
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleAddDiscount}
        disabled={!isModified}
      >
        Update Discounts
      </Button>

      <Snackbar visible={messageVisible} onDismiss={() => setMessageVisible(false)}>
        {messageText}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, 
  },
  nameText: {
    fontSize: 18,
    marginBottom: 8,
  },
  spendText: {
    fontSize: 18,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
});
