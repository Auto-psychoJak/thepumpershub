import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
  input: {
    marginVertical: 10,
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#6200ee',
  },

  text: {
    fontSize: 24,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default LoginStyles;
