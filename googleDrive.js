// googleDrive.js
import { GDrive } from '@robinbobin/react-native-google-drive-api-wrapper';

const gdrive = new GDrive();

export const initializeDrive = (accessToken) => {
  gdrive.accessToken = accessToken;
};
