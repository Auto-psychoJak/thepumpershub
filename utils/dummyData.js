import { db } from '../firebase'; // Adjust the import path if necessary
import { collection, addDoc } from 'firebase/firestore';
import { loremIpsum } from 'lorem-ipsum';
import { faker } from '@faker-js/faker';

const generateRandomJob = (date) => {
  const companyName = loremIpsum({ count: 2, units: 'words' });
  const address = faker.address.streetAddress();
  const city = faker.address.city();
  const totalYards = faker.datatype.number({ min: 1, max: 100 });
  const totalAmount = faker.datatype.number({ min: 100, max: 5000 });
  const paymentMethods = ['cash', 'check', 'card', 'zelle'];
  const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

  return {
    companyName,
    address,
    city,
    totalYards,
    totalAmount,
    paymentMethod,
    date: date.toISOString(),
  };
};

export const addDummyData = async (userId) => {
  const jobsCollection = collection(db, 'users', userId, 'jobs');
  const now = new Date();
  const jobsPromises = [];

  for (let i = 0; i < 365; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const numberOfJobs = Math.floor(Math.random() * 3) + 1;

    for (let j = 0; j < numberOfJobs; j++) {
      const job = generateRandomJob(date);
      jobsPromises.push(addDoc(jobsCollection, job));
    }
  }

  await Promise.all(jobsPromises);
  console.log('Dummy data added successfully.');
};
