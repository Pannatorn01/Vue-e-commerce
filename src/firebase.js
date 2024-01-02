import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator} from "firebase/firestore"
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'


const firebaseConfig = {
  apiKey: 'AIzaSyD74nvO9i3ZWw2cl2ZpbyBXU5rjgrnuhCU',
  authDomain: 'test-easy-emommerce.firebaseapp.com',
  databaseURL: 'https://test-easy-emommerce-default-rtdb.firebaseio.com',
  projectId: 'test-easy-emommerce',
  storageBucket: 'test-easy-emommerce.appspot.com',
  messagingSenderId: '1082320425133',
  appId: '1:1082320425133:web:b9ce860049cbf7dc72f624'
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage()
const realtimeDB = getDatabase()
//false && 
if (import.meta.env.DEV) {
  connectDatabaseEmulator(realtimeDB, '127.0.0.1', 9000)
  connectAuthEmulator(auth, "http://127.0.0.1:9099")
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
  connectStorageEmulator(storage, '127.0.0.1', 9199)  
}

export {
  db ,
  auth,
  storage,
  realtimeDB
}