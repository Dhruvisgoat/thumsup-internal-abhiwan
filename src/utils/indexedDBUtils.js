// import { openDB } from 'idb';

// const DB_NAME = 'GLBStorage';
// const STORE_NAME = 'models';

// export const getDB = async () => {
//   return openDB(DB_NAME, 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         db.createObjectStore(STORE_NAME);
//       }
//     },
//   });
// };

// export const storeGLB = async (key, glbBlob) => {
//   const db = await getDB();
//   await db.put(STORE_NAME, glbBlob, key);
// };

// export const fetchGLB = async (key) => {
//   const db = await getDB();
//   return db.get(STORE_NAME, key);
// };



import { openDB } from 'idb';

const MODEL_DB_NAME = 'modelCacheDB';
const MODEL_STORE_NAME = 'models';
const MODEL_KEY = 'mapModel';

const fetchAndCacheGLTF = async (url) => {
  const db = await openDB(MODEL_DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(MODEL_STORE_NAME)) {
        db.createObjectStore(MODEL_STORE_NAME);
      }
    },
  });

  // Check if the model exists in cache
  const cachedModel = await db.get(MODEL_STORE_NAME, MODEL_KEY);
  if (cachedModel) {
    return cachedModel;
  }

  // Fetch the model from the server
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  // Store in IndexedDB
  await db.put(MODEL_STORE_NAME, arrayBuffer, MODEL_KEY);

  return arrayBuffer;
};

const loadModel = async () => {
  const arrayBuffer = await fetchAndCacheGLTF('/models/Scene/thumsupNewmapp16jan-transformed.glb');
  return new Uint8Array(arrayBuffer); // Convert to Uint8Array if needed
};

// Usage in useEffect
useEffect(() => {
  loadModel().then((modelData) => {
    console.log(modelData); // Use the cached model data
  });
}, []);

