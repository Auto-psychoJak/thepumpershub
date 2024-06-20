import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { useAuth } from '../AuthContext';

const MonthView = () => {
  const { currentUser } = useAuth();
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchMonthlyData();
    }
  }, [currentUser]);

  const fetchMonthlyData = async () => {
    try {
      const jobsCollection = collection(db, 'users', currentUser.uid, 'jobs');
      const jobsQuery = query(jobsCollection);
      const jobsSnapshot = await getDocs(jobsQuery);
      const jobsList = jobsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          date: new Date(data.date),
          totalAmount: Number(data.totalAmount) || 0 // Ensure totalAmount is a number
        };
      });

      console.log("Fetched jobs:", jobsList); // Log fetched jobs

      const groupedData = groupJobsByMonth(jobsList);
      setMonthlyData(groupedData);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  const groupJobsByMonth = (jobs) => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('en-US', { month: 'short' }),
      jobCount: 0,
      totalAmount: 0
    }));

    jobs.forEach(job => {
      if (job.date instanceof Date && !isNaN(job.date)) {
        const monthIndex = job.date.getMonth();
        months[monthIndex].jobCount += 1;
        months[monthIndex].totalAmount += job.totalAmount;
      } else {
        console.warn("Invalid job date or data:", job); // Log any invalid job data
      }
    });

    console.log("Grouped data by month:", months); // Log grouped data
    return months;
  };

  const renderMonth = ({ item }) => (
    <View style={styles.monthContainer}>
      <Text style={styles.monthTitle}>{item.month}</Text>
      <Text style={styles.monthDetails}>Jobs: {item.jobCount}</Text>
      <Text style={styles.monthDetails}>${Number(item.totalAmount).toFixed(2)}</Text> {/* Ensure totalAmount is a number */}
    </View>
  );

  return (
    <FlatList
      data={monthlyData}
      renderItem={renderMonth}
      keyExtractor={(item) => item.month}
      numColumns={3}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    flexGrow: 1,
    padding: 10,
  },
  monthContainer: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  monthDetails: {
    fontSize: 16,
  },
});

export default MonthView;
