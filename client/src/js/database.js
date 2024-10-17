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

  export const putDb = async (content) => {
    console.log('Post to the database');
    try {
      const jateDb = await openDB('jate', 1);
      const tx = jateDb.transaction('jate', 'readwrite');
      const store = tx.objectStore('jate');
  
      const data = { id: 1, content }; // Log what is being saved
      console.log('Saving content:', data);
  
      const request = store.put(data);
      const result = await request;
  
      console.log('Data saved to the database', result);
    } catch (error) {
      console.error('Error adding content to the database', error);
    }
  };  

  export const getDb = async () => {
    console.log('GET from the database');
    try {
      const jateDb = await openDB('jate', 1);
      const tx = jateDb.transaction('jate', 'readonly');
      const store = tx.objectStore('jate');
      const result = await store.getAll();
  
      console.log('Database content:', result);
  
      // Return an empty string if no valid content is found
      // if (!result || result.length === 0) return [{ content: '' }];
  
      return result;
    } catch (error) {
      console.error('Error retrieving data from the database', error);
      return [{ content: '' }]; // Return safe fallback in case of error
    }
  };
  
initdb();
