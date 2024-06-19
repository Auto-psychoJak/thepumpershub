import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        maxWidth: 1200, // Limit width for larger screens (e.g., tablets)
        minWidth:900,
        alignSelf: 'center', // Center container for larger screens
      },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#6200ee',
  },
});

export default commonStyles;
