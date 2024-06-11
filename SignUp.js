import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { useNavigation } from '@react-navigation/native';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setError('');
      const userCredential = await signup(email, password);
      await db.collection('users').doc(userCredential.user.uid).set({
        email,
        role: 'Pending',
      });
      navigation.navigate('Profile');
    } catch (error) {
      setError('Failed to create an account');
      console.error("Failed to create an account", error);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Sign Up</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            mode="outlined"
          />
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Sign Up
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default Signup;
