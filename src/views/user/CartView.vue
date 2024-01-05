<script setup>
import { RouterLink } from 'vue-router';

import UserLayouts  from '@/layouts/UserLayout.vue'
import Close from '@/components/icons/Close.vue'

import { useCartStore } from '@/stores/user/cart'

const cartStore = useCartStore()

const changeQuantity = (event, index) => {
    const newQuantity = parseInt(event.target.value)
    cartStore.updateQuantity(index, newQuantity)
}
</script>

<template>
    <UserLayouts>
       <h1 class="text-3xl font-bold m-4">Shoppping Cart</h1>

       <div class="flex">
            <div class="flex-auto w-64 bg-base-200 p-4">
                <div v-if="cartStore.items.length === 0">
                    Cart is empty 
                </div>
                <div v-for="(item, index) in cartStore.items" class="flex">
                    <div  class="flex-1">
                        <img class="w-full p-10" :src="item.imageUrl">
                    </div>
                    <div  class="flex-1">
                        <div class="flex flex-col justify-between h-full">
                          <div>
                            <div class="relative grid grid-rows-2 ">
                               <div>
                                    <div class="mt-10 text-xl"><b>{{ item.name }}</b></div>
                                    <div class="mt-2 ">{{ item.about }}</div>
                                    <div class="mt-2 mb-8">price :{{ item.price }}</div>
                               </div>
                               <div >
                                <select v-model="item.quantity" @change="changeQuantity($event, index)" class="p-4 w-1/2">
                                    <option v-for="number in [1,2,3,4]">
                                        {{ number }}
                                    </option>
                                </select>
                               </div>
                               <div @click="cartStore.removeItemInCart(index)" class="absolute top-0 right-0">
                                <Close></Close>
                               </div>
                            </div>                           
                          </div>
                          <div><b>In stock</b></div>
                        </div>
                        
                    </div>
                 </div>
            </div>
            <div class="flex-auto w-32 bg-slate-200 p-4">
                <div class="text-xl font-bold">
                        Order summary
                </div>
                <div class="my-4 divide-y divide-black ">                    
                    <div class="flex justify-between">
                        <div>All product prices</div>
                        <div>{{ cartStore.summaryPrice }}</div>
                    </div>
                    <div class="flex justify-between py-2">
                        <div>Shipping cost</div> 
                        <span>0</span>
                    </div>
                    <div class="flex justify-between py-2 pb-5">
                        <div>Total price</div>
                        <span>{{ cartStore.summaryPrice }}</span>
                    </div>
                    <RouterLink :to="{ name: 'checkout' }" class="btn btn-neutral w-full ">
                        Payment
                    </RouterLink>
                </div>
            </div>
       </div>
    </UserLayouts>
</template>