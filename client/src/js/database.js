import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
const textDB = await openDB('jate', 1);
const tx = textDB.transaction('jate', 'readwrite');
const store = tx.objectStore('jate');
const request = store.put({jate: content});
const result = await request; 

console.log ('Content Stored in DB', result);

}; console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

const textDB = await openDB ('jate', 1);
const tx = textDB.transaction('jate', 'readonly');
const store = tx.objectStore('jate');
const request = store.getAll();
const result = await request; 

result ? console.log('All data retrieved') : console.log ('No data found on DB');

return result?.value;

}; console.error('getDb not implemented');

initdb();
