import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { Button } from 'react-native-paper';

const MonthView = () => {
  const { currentUser } = useAuth();
  const [monthlyData, setMonthlyData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

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
          totalAmount: Number(data.totalAmount) || 0, // Ensure totalAmount is a number
          paymentMethod: data.paymentMethod || 'unknown' // Ensure paymentMethod is defined
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
      year: new Date().getFullYear(),
      jobCount: 0,
      totalAmount: 0,
      paymentMethods: {
        cash: 0,
        check: 0,
        zelle: 0,
        square: 0,
        charge: 0,
        unknown: 0
      },
      weeks: new Date(new Date().getFullYear(), i + 1, 0).getDate() / 7 // Calculate number of weeks
    }));

    jobs.forEach(job => {
      if (job.date instanceof Date && !isNaN(job.date)) {
        const monthIndex = job.date.getMonth();
        months[monthIndex].jobCount += 1;
        months[monthIndex].totalAmount += job.totalAmount;
        months[monthIndex].paymentMethods[job.paymentMethod.toLowerCase()] += job.totalAmount;
      } else {
        console.warn("Invalid job date or data:", job); // Log any invalid job data
      }
    });

    console.log("Grouped data by month:", months); // Log grouped data
    return months;
  };

  const handleMonthPress = (month) => {
    setSelectedMonth(month);
    setModalVisible(true);
  };

  const renderMonth = ({ item }) => (
    <TouchableOpacity onPress={() => handleMonthPress(item)} style={styles.monthTouchable}>
      <View style={styles.monthContainer}>
        <Text style={styles.monthTitle}>{item.month}</Text>
        <Text style={styles.monthDetails}>Jobs: {item.jobCount}</Text>
        <Text style={styles.monthDetails}>Total: ${Number(item.totalAmount).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={monthlyData}
        renderItem={renderMonth}
        keyExtractor={(item) => item.month}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
      />
      {selectedMonth && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedMonth.month} {selectedMonth.year}</Text>
            <Text style={styles.modalSubtitle}>Weeks: {Math.ceil(selectedMonth.weeks)}</Text>
            <Text style={styles.modalSubtitle}>Jobs: {selectedMonth.jobCount}</Text>
            <Text style={styles.modalSubtitle}>Cash: ${Number(selectedMonth.paymentMethods.cash).toFixed(2)}</Text>
            <Text style={styles.modalSubtitle}>Check: ${Number(selectedMonth.paymentMethods.check).toFixed(2)}</Text>
            <Text style={styles.modalSubtitle}>Zelle: ${Number(selectedMonth.paymentMethods.zelle).toFixed(2)}</Text>
            <Text style={styles.modalSubtitle}>Square: ${Number(selectedMonth.paymentMethods.square).toFixed(2)}</Text>
            <Text style={styles.modalSubtitle}>Charge: ${Number(selectedMonth.paymentMethods.charge).toFixed(2)}</Text>
            <Text style={styles.modalSubtitle}>Unknown: ${Number(selectedMonth.paymentMethods.unknown).toFixed(2)}</Text>
            <Text style={styles.modalTotal}>Total: ${Number(selectedMonth.totalAmount).toFixed(2)}</Text>
            <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.button}>
              Close
            </Button>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  grid: {
    flexGrow: 1,
    justifyContent: 'center', // Center the grid
  },
  row: {
    justifyContent: 'space-between', // Distribute items evenly
  },
  monthTouchable: {
    flex: 1,
    margin: 5,
  },
  monthContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 3 - 20, // Adjust the width to fit 3 columns
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  monthDetails: {
    fontSize: 16,
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
  modalTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#6200ee',
  },
});

export default MonthView;
