import { defineStore } from 'pinia'

import { collection, getDocs,  query, where, onSnapshot, snapshotEqual } from 'firebase/firestore'

// import db ตัวแทนของ Firestore
import { db } from '@/firebase'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [],
    loaded: false
  }),
  actions: {
    async loadProducts () {      
      const productsCol = query(collection(db, 'products'), where('status', '==', 'open'))
      onSnapshot(productsCol, (snapshot) => {
        this.list = snapshot.docs.map(doc => ({
          productId: doc.id,
          ...doc.data()
        }))
      })
    },
    filterProducts (searchText) {
      return this.list.filter(product => product.name.includes(searchText))
    }
  }

})