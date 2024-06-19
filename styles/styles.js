import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
  scrollContainer: {
    flexGrow: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sortButton: {
    marginBottom: 20,
  },
  sortButtonText: {
    color: 'gray',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 10,
    marginHorizontal: 5,
  },
  dummyButton: {
    marginTop: 20,
    backgroundColor: '#6200ee',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6200ee',
  },
});

export default styles;
