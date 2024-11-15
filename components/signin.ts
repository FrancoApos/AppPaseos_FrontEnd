// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';

GoogleSignin.configure({
  webClientId: '77754861461-3divhjv8ounug5ia0pus1nfqai06f6fi.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], 
  offlineAccess: true,
});
const router = useRouter();  

export const signIn = async (router: ReturnType<typeof useRouter>) => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    if (response && response.data?.user && response.data?.user.email) {
      const email = response.data?.user.email;
      console.log('User email:', email);

      // Navegar a la pantalla de rol con el email
      router.push({
        pathname: '/rol',
        params: { email },
      });
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.log('Sign in is in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Play services not available or outdated');
          break;
        default:
          console.log('Error during Google sign in', error);
      }
    } else {
      console.log('An unexpected error occurred', error);
    }
  }
};