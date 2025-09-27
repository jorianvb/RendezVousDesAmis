import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBP1wYOVeL-R0rrRzBiOZOLgsSl81AvLfU',
  authDomain: 'rendezvousdesamis-bc7fd.firebaseapp.com',
  projectId: 'rendezvousdesamis-bc7fd',
  storageBucket: 'rendezvousdesamis-bc7fd.firebasestorage.app',
  messagingSenderId: '1044405363789',
  appId: '1:1044405363789:web:fb0b1a72b7d7c99e146804',
  measurementId: 'G-1PQDP7F9L3',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
export default app;
