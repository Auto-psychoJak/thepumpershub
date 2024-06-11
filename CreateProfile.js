import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button as RNButton } from 'react-native';
import { Text, TextInput, Button, Checkbox } from 'react-native-paper';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function CreateProfile() {
  const { currentUser, setProfileExists } = useAuth();
  const [realName, setRealName] = useState('');
  const [role, setRole] = useState('');
  const [ownsTruck, setOwnsTruck] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setRealName(data.realName || '');
          setRole(data.role || '');
          setOwnsTruck(data.ownsTruck || false);
        }
      } catch (error) {
        setError('Failed to fetch user data');
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleCreateProfile = async () => {
    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await setDoc(userDocRef, {
        realName,
        role,
        ownsTruck,
        email: currentUser.email,
      }, { merge: true });
      setLoading(false);
      setProfileExists(true);
      navigation.navigate('Home', { role });
    } catch (error) {
      setError('Failed to create profile');
      console.error("Failed to create profile", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        label="Real Name"
        value={realName}
        onChangeText={setRealName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Role (Owner/Employee)"
        value={role}
        onChangeText={setRole}
        style={styles.input}
        mode="outlined"
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={ownsTruck ? 'checked' : 'unchecked'}
          onPress={() => setOwnsTruck(!ownsTruck)}
        />
        <Text style={styles.checkboxLabel}>Do you own the truck?</Text>
      </View>
      <Button
        mode="contained"
        onPress={handleCreateProfile}
        style={styles.button}
        loading={loading}
      >
        Create Profile
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    width: '80%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    marginTop: 16,
    width: '80%',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default CreateProfile;
