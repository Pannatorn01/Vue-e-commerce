<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { useCartStore } from '@/stores/user/cart'
import { useProductStore  } from '@/stores/user/product'
import {  useEventStore } from './stores/event'

const cartStore = useCartStore()
const productStore = useProductStore()
const eventStore =  useEventStore ()

onMounted(() => {
  productStore.loadProducts()
})
</script>

<template>  
   <div v-if=" eventStore.alert " class="toast toast-top toast-center">
        <div class="alert" :class="`alert-${eventStore.data.status} text-white`">
          <span>{{ eventStore.data.message }}</span>
        </div>
    </div>
  <RouterView />
</template>
