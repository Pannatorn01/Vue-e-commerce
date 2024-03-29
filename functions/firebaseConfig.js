// import library ทั้งหมดผ่าน firebase-admin เข้ามา
const { initializeApp, applicationDefault } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getAuth } = require('firebase-admin/auth')
const { getDatabase } = require('firebase-admin/database')

initializeApp({
  projectId: 'test-easy-emommerce',
  credential: applicationDefault(), 
  databaseURL: "https://test-easy-emommerce-default-rtdb.firebaseio.com"
})

const db = getFirestore()
const auth = getAuth()
const realtimeDB = getDatabase()

module.exports = {
  db,
  auth,
  realtimeDB
}