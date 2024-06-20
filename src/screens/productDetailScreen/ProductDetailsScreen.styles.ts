import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  infoContainer: {
    padding: 16,
    marginBottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  editButton: {
    backgroundColor: '#ccc',
    marginTop: 16,
    width: '100%',
  },
  deleteButton: {
    backgroundColor: 'red',
    marginTop: 16,
    width: '100%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalConfirmButton: {
    backgroundColor: '#ffc107',
    marginBottom: 10,
  },
  modalCancelButton: {
    backgroundColor: '#ccc',
  },
});

export default styles;
