// import library ทั้งหมดผ่าน firebase-admin เข้ามา
const { initializeApp, applicationDefault } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getAuth } = require('firebase-admin/auth')
const { getDatabase } = require('firebase-admin/database')

initializeApp({
  projectId: 'test-easy-emommerce',
  credential: applicationDefault(), 
  databaseURL: 'http://127.0.0.1:9000/?ns=test-easy-emommerce-default-rtdb'
})

const db = getFirestore()
const auth = getAuth()
const realtimeDB = getDatabase()

module.exports = {
  db,
  auth,
  realtimeDB
}