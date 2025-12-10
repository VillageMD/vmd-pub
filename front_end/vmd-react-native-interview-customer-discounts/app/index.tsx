// app/index.tsx

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Button } from 'react-native-paper';
import { useRouter, Stack } from 'expo-router';
import dataStore from '@/services/dataStore';

export default function CustomerListScreen() {
  const router = useRouter();
  const customers = dataStore.getCustomers();

  return (
    <>
      <Stack.Screen options={{ title: 'Customers' }} />
      <View style={styles.container}>
        <FlatList
          data={customers}
          keyExtractor={(item) => item.customerId.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={`Yearly Spend: $${item.yearlySpend}`}
              onPress={() => router.push(`/customer/${item.customerId}`)}
            />
          )}
        />
        <Button
          mode="contained"
          // TODO 
          onPress={() => {}}
          style={styles.button}
        >
          View All Unassigned Discounts
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, 
  },
  button: {
    marginTop: 16, 
  },
});
