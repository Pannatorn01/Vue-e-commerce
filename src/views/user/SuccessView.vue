<script setup>
import {ref, onMounted } from 'vue'
import { useRoute} from 'vue-router'
import UserLayouts  from '@/layouts/UserLayout.vue'
import { useCartStore } from '@/stores/user/cart'

const route = useRoute()

const cartStore = useCartStore()
const orderData = ref({})

onMounted(async () => {
    const orderId =  route.query.order_id
    if (orderId) {
        try {
            orderData.value = await cartStore.loadCheckout(orderId)
        } catch (error) {
            alert('order unsuccessful !!')
            location.href = '/cart'
        }
    }
})

</script>

<template>
    <UserLayouts>
        <h1 class="text-3xl font-border m-4"></h1>
       <div class="max-w-4xl mx-auto border border-base-200 shadow-xl p-8 my-4">
            <div>
                <div class="text-2xl font-bold">Your order is {{ orderData.status  }} !</div>
                <div>Hi, {{orderData.name}} </div>
                <div>Wait to receive the product.</div>

                <div class="divider"></div>      

                <div class="grid grid-cols-4 gap-2">
                    <div>
                        <div class="font-bold">Order date</div>
                        <div>{{ orderData.createdAt }}</div>
                    </div>
                    <div>
                        <div class="font-bold">Order Number</div>
                        <div>{{ orderData.orderNumber }}</div>
                    </div>
                    <div>
                        <div class="font-bold">Payment method</div>
                        <div>{{ orderData.paymentMethod }}</div>
                    </div>
                    <div>
                        <div class="font-bold">Address</div>
                        <div>{{ orderData.address }}</div>
                    </div>
                </div>

                <div class="divider"></div> 

                <div v-for="product in orderData.products" class="grid grid-cols-4 gap-2 mb-4 items-center">
                    <div>
                       <img  class="w-full p-2" :src='product.imageUrl'>
                    </div>
                    <div>
                        <div class="font-bold ">{{ product.name }}</div>
                        <div>{{ product.about }}</div>
                    </div>
                    <div>
                        <div>quantity {{ product.quantity }}  </div>
                    </div>
                    <div>
                        <div>{{ product.price }} </div>
                    </div>
                </div>

                <div class="divider"></div>    

                <div class="flex justify-between mb-3">
                        <div class="font-bold">All product prices</div>
                        <div>{{ cartStore.summaryPrice }}</div>
                </div>
                <div class="flex justify-between">
                        <div class="font-bold">Shipping cost</div>
                        <div>0</div>
                </div>
                <div class="divider"></div>   
                <div class="flex justify-between">
                        <div class="font-bold">Total price</div>
                        <div>{{ cartStore.summaryPrice }}</div>
                </div>

                <div class="divider"></div>

                <div>Thank you for shopping with us.</div>

                <div class="divider"></div> 
            </div>
       </div>
    </UserLayouts>
</template>