import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import styles from './styles/styles'; // Import the global styles

const MonthView = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchJobs();
    }
  }, [currentUser]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const jobsCollection = collection(db, 'users', currentUser.uid, 'jobs');
      const jobsQuery = query(jobsCollection, orderBy('date', 'desc'));
      const jobsSnapshot = await getDocs(jobsQuery);
      const jobsList = jobsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsList);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const groupJobsByMonth = () => {
    const jobsByMonth = {};
    jobs.forEach(job => {
      const month = new Date(job.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!jobsByMonth[month]) {
        jobsByMonth[month] = [];
      }
      jobsByMonth[month].push(job);
    });
    return jobsByMonth;
  };

  const jobsByMonth = groupJobsByMonth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(jobsByMonth).map(month => (
        <View key={month} style={styles.monthContainer}>
          <Text style={styles.monthTitle}>{month}</Text>
          <FlatList
            data={jobsByMonth[month]}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Card style={styles.card}>
                  <Card.Title title={item.companyName} subtitle={`Date: ${new Date(item.date).toLocaleDateString()}`} />
                  <Card.Content>
                    <Text>Address: {item.address}</Text>
                    <Text>City: {item.city}</Text>
                    <Text>Total Yards: {item.totalYards}</Text>
                    <Text>Total Amount: ${item.totalAmount}</Text>
                    <Text>Pay with: {item.paymentMethod}</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default MonthView;
