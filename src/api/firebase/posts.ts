import admin from 'firebase-admin';
import { db } from './index';

export function fetchPosts() {
  const quotes = db.collection('posts');
  const key = quotes.doc().id;

  return quotes.where(admin.firestore.FieldPath.documentId(), '>=', key).limit(1).get()
    .then((snapshot) => {
      if (snapshot.size > 0) {
        let data: any;
        snapshot.forEach((doc) => {
          data = doc.data();
        });
        return data;
      } else {
        return quotes.where(admin.firestore.FieldPath.documentId(), '<', key)
          .limit(1).get()
          .then((snapshot) => {
            let data: any;
            snapshot.forEach((doc) => {
              data = doc.data();
            });
            return data;
          })
          .catch((error) => {
            throw new Error(error.response);
          });
      }
    })
    .catch((error) => {
      throw new Error(error.response);
    });
}