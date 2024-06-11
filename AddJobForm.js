import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

function AddJobForm({ onClose }) {
  const { currentUser } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [totalYards, setTotalYards] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSave = async () => {
    try {
      const jobsCollection = collection(db, 'users', currentUser.uid, 'jobs');
      await addDoc(jobsCollection, {
        companyName,
        address,
        city,
        totalYards,
        totalAmount,
        paymentMethod,
        date: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error("Failed to add job", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Job</Text>
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Yards"
        value={totalYards}
        onChangeText={setTotalYards}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Amount"
        value={totalAmount}
        onChangeText={setTotalAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Method"
        value={paymentMethod}
        onChangeText={setPaymentMethod}
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save
      </Button>
      <Button mode="text" onPress={onClose} style={styles.button}>
        Cancel
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginTop: 16,
  },
});

export default AddJobForm;
