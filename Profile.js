import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [truckOwned, setTruckOwned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (currentUser) {
      const fetchProfile = async () => {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const profile = docSnap.data();
          setName(profile.name || '');
          setRole(profile.role || '');
          setTruckOwned(profile.truckOwned || false);
        }
      };
      fetchProfile();
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (currentUser) {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, { name, role, truckOwned });
      navigation.navigate('Home');
    }
  };

  return (
    <View>
      <Text>Hello, {currentUser.email}</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Name" />
      <TextInput value={role} onChangeText={setRole} placeholder="Role" />
      <Button title={truckOwned ? "Truck Owned: Yes" : "Truck Owned: No"} onPress={() => setTruckOwned(!truckOwned)} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default Profile;
