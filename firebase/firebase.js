import * as firebase from 'firebase';
import config from '../config/config';
// import '@firebase/storage';

const fbConfig = config || {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  appId: process.env.APP_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(fbConfig);
}

export default firebase;
// export const storageRef = firebase.storage();
