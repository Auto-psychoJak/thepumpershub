import { db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const deleteOldJobs = async (userId) => {
  const elevenMonthsAgo = new Date();
  elevenMonthsAgo.setMonth(elevenMonthsAgo.getMonth() - 11);

  try {
    const jobsCollection = collection(db, 'users', userId, 'jobs');
    const oldJobsQuery = query(jobsCollection, where('date', '<', elevenMonthsAgo));
    const querySnapshot = await getDocs(oldJobsQuery);

    const batch = db.batch();
    querySnapshot.forEach((jobDoc) => {
      batch.delete(doc(db, 'users', userId, 'jobs', jobDoc.id));
    });

    await batch.commit();
    console.log('Old jobs successfully deleted');
  } catch (error) {
    console.error('Error deleting old jobs: ', error);
  }
};

export default deleteOldJobs;
