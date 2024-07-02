// googleSignIn.js
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.file'], // Request access to Google Drive
  webClientId: '138004036298-q03f7kpsuf7lftm1ifis5lmqj1362cru.apps.googleusercontent.com', // Replace with your web client ID from Google Cloud Console
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const token = (await GoogleSignin.getTokens()).accessToken;
    return { userInfo, token };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};
