import admin from 'firebase-admin';
import serviceAccount from './tgbot.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tg-bot-13672-default-rtdb.firebaseio.com',
});

export const db = admin.firestore();