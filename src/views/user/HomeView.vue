<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import UserLayouts  from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'

import { useProductStore } from '@/stores/user/product'
import { useCartStore } from '@/stores/user/cart'

const router = useRouter()
const cartStore = useCartStore()
const productStore = useProductStore()

const addToCart = (product) => {
    cartStore.addToCart(product)
    router.push({ name: 'cart' })
}

onMounted(() => {
    localStorage.removeItem('cart-data')
})
</script>
<template>
    <UserLayouts>
        <div class="hero h-96 bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-md">
                <h1 class="text-5xl font-bold">PNT Card</h1>
                <p class="py-6">Here is a drawing I created. You can collect as you wish.</p>
                </div>
            </div>
        </div>
        <!-- Product shle -->
        <Product 
        :products="productStore.list"
        :addToCart="addToCart">
        </Product>
        
    
    </UserLayouts>
</template>