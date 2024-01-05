<script setup>
import { reactive, } from 'vue'
import { RouterLink, useRouter } from 'vue-router';

import UserLayouts from '@/layouts/UserLayout.vue'
import { useCartStore } from '@/stores/user/cart'
import { useEventStore } from '@/stores/event'

const router = useRouter()
const cartStore = useCartStore()
const eventStore = useEventStore()

const FormData = [
    {
        name: 'Email address',
        field: 'email'
    },
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Address',
        field: 'address'
    },
    {
        name: 'Note',
        field: 'note'
    }
]

const userFormData = reactive({
    email: '',
    name: '',
    address: '',
    note: ''
})

const validateData = async () => {
 try {
    if(!userFormData.email || !userFormData.name || !userFormData.address){
       alert('The information entered is incomplete.')
    }
    else payment()
    
 } catch (error) {
   console.log('error',error)
 }
}

const payment = async () => {
    const responseData = await cartStore.placeorder(userFormData)
    location.href = responseData.redirectUrl
}

</script>

<template>
    <UserLayouts>
        <h1 class="text-3xl font-bold m-4">checkout</h1>

        <div class="flex">
            <section class="flex-auto w-64 bg-base-200 p-8">
                <div v-for="form in FormData " class="form-control w-full ">
                    <label class="label">
                        <span class="label-text">{{ form.name }}</span>
                    </label>
                    <input v-model="userFormData[form.field]" type="text" placeholder="Type here"
                        class="input input-bordered w-full" />
                </div>
                <button @click="validateData" class="btn btn-neutral mt-8 w-full">ชำระเงิน</button>

                <div class="pt-7">
                    <div class="">
                        <div v-for="mes in num"><li>{{ mes }}</li></div>
                    </div>
                </div>

            </section>
            <section class="flex-auto w-36 bg-slate-200 px-2">
                <div v-for="item in cartStore.items" class="flex bg-white m-8 py-4">
                    <div class="flex-1">
                        <img class="w-full p-4" :src="item.imageUrl">
                    </div>
                    <div class="flex-1">
                        <div class="flex flex-col justify-between h-full">
                            <div>
                                <div> <b>{{ item.name }}</b></div>
                                <div>Quantity {{ item.quantity }}</div>
                            </div>
                            <RouterLink :to="{ name: 'cart' }">Edit</RouterLink>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="px-4">
                    <div><b>Order Summary</b></div>
                    <div class="flex justify-between">
                        <div>All product prices</div>
                        <div>
                            {{ cartStore.summaryPrice }}
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div>Shipping cost</div>
                        <div>
                            0
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="flex justify-between pb-5 px-4">
                    <div>Total prices</div>
                    <div>
                        {{ cartStore.summaryPrice }}
                    </div>
                </div>
            </section>
        </div>

    </UserLayouts>
</template>