'use client';
import Dexie from 'dexie';

const db = new Dexie('offlineDB');

//define DB schema
db.version(0.1).stores({
  responseDataForOfflineAccess: 'type,records',
});

db.open()
  .then(() => {
    console.log('indexedDB opened');
  })
  .catch((err) => {
    console.log('Something went wrong', err);
  });

export default db;
