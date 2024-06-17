import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Text, Button, FAB, Card, Appbar, Menu, Divider, Provider } from 'react-native-paper';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import { db } from './firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import AddJobForm from './AddJobForm';
import { addDummyData } from './utils/dummyData';
import styles from './styles/styles';

function Home() {
  const { currentUser, logout } = useAuth();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate('Login');
    } else {
      fetchJobs();
    }
  }, [currentUser, sortOrder]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const jobsCollection = collection(db, 'users', currentUser.uid, 'jobs');
      const jobsQuery = query(jobsCollection, orderBy('date', sortOrder), limit(5));
      const jobsSnapshot = await getDocs(jobsQuery);
      const jobsList = jobsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(jobsList);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleAddJob = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
    fetchJobs();
  };

  const handleJobPress = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleAddDummyData = async () => {
    if (currentUser) {
      await addDummyData(currentUser.uid);
      fetchJobs();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleJobPress(item)}>
      <Card style={styles.card}>
        <Card.Title title={item.companyName} subtitle={`Date: ${formatDate(item.date)}`} />
        <Card.Content>
          <Text>Address: {item.address}</Text>
          <Text>City: {item.city}</Text>
          <Text>Total Yards: {item.totalYards}</Text>
          <Text>Total Amount: ${item.totalAmount}</Text>
          <Text>Pay with: {item.paymentMethod}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="Home" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={() => setMenuVisible(true)} />
          }
        >
          <Menu.Item onPress={handleProfile} title="Profile" />
          <Menu.Item onPress={() => navigation.navigate('Home')} title="Home" />
          <Divider />
          <Menu.Item onPress={handleLogout} title="Logout" />
        </Menu>
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {currentUser ? (
          <>
            <Text style={styles.text}>Hello, {currentUser.email}!</Text>
            <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
              <Text style={styles.sortButtonText}>Toggle Sort Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Recent</Text>
            <FlatList
              data={jobs}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              onRefresh={fetchJobs}
              refreshing={loading}
              horizontal={true} // Display items horizontally
              contentContainerStyle={styles.list}
            />
            <Button mode="contained" onPress={handleAddDummyData} style={styles.dummyButton}>
              Add Dummy Data
            </Button>
            <FAB
              style={styles.fab}
              small
              icon="plus"
              label="Add Job"
              onPress={handleAddJob}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={handleCloseModal}
            >
              <View style={styles.modalView}>
                {selectedJob ? (
                  <>
                    <Text style={styles.modalTitle}>{selectedJob.companyName}</Text>
                    <Text style={styles.modalSubtitle}>Date: {formatDate(selectedJob.date)}</Text>
                    <Text>Address: {selectedJob.address}</Text>
                    <Text>City: {selectedJob.city}</Text>
                    <Text>Total Yards: {selectedJob.totalYards}</Text>
                    <Text>Total Amount: ${selectedJob.totalAmount}</Text>
                    <Text>Pay with: {selectedJob.paymentMethod}</Text>
                    <Button mode="contained" onPress={handleCloseModal} style={styles.button}>
                      Close
                    </Button>
                  </>
                ) : (
                  <AddJobForm onClose={handleCloseModal} />
                )}
              </View>
            </Modal>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </Provider>
  );
}

export default Home;
