import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function Profile({ navigation }) {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({ name: '', role: '', ownsTruck: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchProfileData();
    }
  }, [currentUser]);

  const fetchProfileData = async () => {
    try {
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, profileData);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={profileData.name}
        onChangeText={(text) => setProfileData({ ...profileData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={profileData.role}
        onChangeText={(text) => setProfileData({ ...profileData, role: text })}
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Home')} style={styles.button}>
        Home
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

export default Profile;
