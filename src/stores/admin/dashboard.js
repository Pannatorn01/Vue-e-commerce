import { defineStore } from 'pinia'

import {
  realtimeDB
} from '@/firebase'

import {
  ref,
  get
} from 'firebase/database'

export const useAdminDashboardStore = defineStore('dashboard', {
  state: () => ({
    stats: {
      order: 0,
      product: 0,
      user: 0
    }
  }),
  actions: {
    async loadDashboard () {
      try {
        const statedRef = ref(realtimeDB,'stats')
        const stateSnapshot = await get(statedRef)
        this.stats = stateSnapshot.val()
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})