import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuth } from './AuthContext';
import { styles } from './styles/LoginStyles';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signInWithGoogle } = useAuth();

  const handleLoginWithGoogle = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <Button mode="contained" onPress={handleLoginWithGoogle} style={styles.button}>
        Sign in with Google
      </Button>
    </View>
  );
}

export default Login;
