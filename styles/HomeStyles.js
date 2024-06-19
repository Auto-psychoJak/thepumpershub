import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  sortButton: {
    marginVertical: 10,
  },
  sortButtonText: {
    fontSize: 16,
    color: 'grey',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  list: {
    paddingVertical: 20,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  dummyButton: {
    marginVertical: 10,
    // backgroundColor: '#6200ee',
    width: 100,
    color: 'white',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#6200ee',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'gray',
  },
});

export default HomeStyles;
