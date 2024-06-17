import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddJobForm = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [totalYards, setTotalYards] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = async () => {
    if (currentUser) {
      const jobsCollection = collection(db, 'users', currentUser.uid, 'jobs');
      await addDoc(jobsCollection, {
        companyName,
        address,
        city,
        totalYards,
        totalAmount,
        paymentMethod,
        date: serverTimestamp(),
      });
      onClose();
    }
  };

  return (
    <View>
      <TextInput value={companyName} onChangeText={setCompanyName} placeholder="Company Name" />
      <TextInput value={address} onChangeText={setAddress} placeholder="Address" />
      <TextInput value={city} onChangeText={setCity} placeholder="City" />
      <TextInput value={totalYards} onChangeText={setTotalYards} placeholder="Total Yards" />
      <TextInput value={totalAmount} onChangeText={setTotalAmount} placeholder="Total Amount" />
      <TextInput value={paymentMethod} onChangeText={setPaymentMethod} placeholder="Payment Method" />
      <Button title="Save Job" onPress={handleSubmit} />
    </View>
  );
};

export default AddJobForm;
