
<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { useAdminProductStore } from '@/stores/admin/product'

import AdminLayout from '@/layouts/AdminLayout.vue'
import Edit from '@/components/icons/Edit.vue'
import Trash from '@/components/icons/Trash.vue'
import Table from '@/components/Table.vue'
import Pagination from '@/components/Pagination.vue'

const currentPage = ref(1)

const adminProduct = useAdminProductStore()

const removeProduct = (index) => {
  adminProduct.removeProduct(index)
}

onMounted(() => {
  adminProduct.loadProducts()
})

const searchProduct = async () => {
  await adminProduct.loadProducts()
}

const changeStatusFilter = async (newStatus) =>{
  adminProduct.filter.status = newStatus
  await adminProduct.loadProducts()

}

const changeSortUpdatedAt = async (newSort) => {
  adminProduct.filter.sort.updatedAt = newSort
  await adminProduct.loadProducts()
}

const changePage = async (newPage) => {
  if (newPage < currentPage.value){
    await adminProduct.loadNextProduct('previous')
  } else if (newPage > currentPage.value) {
    await adminProduct.loadNextProduct('next')
  }
  currentPage.value = newPage
}
</script>

<template>
  <AdminLayout>
      <div class="my-4 p-4">
        <div class="flex items-center justify-between">
          <div class="text-3xl font-bold">Product</div>
          <RouterLink :to="{ name: 'admin-products-create' }" class="btn btn-neutral">Add New</RouterLink>
        </div>
      </div>
      <div class="flex gap-2 items-center">
        <div class="flex1">
          <input v-model="adminProduct.filter.search" type="text" placeholder="Type here" class="input input-bordered w-full">
        </div>
        <div class="flex1">
          <div>Updated At</div>
          <div class="join">
            <button
             class="join-item btn btn-outline btn-primary"
             @click="changeSortUpdatedAt('asc')"
             :class="adminProduct.filter.sort.updatedAt === 'asc' ? 'btn-active' : ''"
             >ASC</button>
            <button class="join-item btn btn-outline btn-primary"
            @click="changeSortUpdatedAt('desc')"
            :class="adminProduct.filter.sort.updatedAt === 'desc' ? 'btn-active' : ''"
            >DESC</button>
          </div>
        </div>
        <div class="flex1">
          <div>Status</div>
          <div class="join">
            <button 
             @click="changeStatusFilter('open')"
             class="join-item btn btn-outline btn-primary"
             :class="adminProduct.filter.status === 'open' ? 'btn-active' : ''"
             >Open</button>
            <button
             @click="changeStatusFilter('close')"  
             class="join-item btn btn-outline btn-primary"
             :class="adminProduct.filter.status === 'close' ? 'btn-active' : ''"
             >Close</button>
          </div>
        </div>
        <div class="flex1">
            <button @click="searchProduct()" class="btn btn-info">Search</button>
        </div>
      </div>
      <Table :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'Update At', '']">
        <tr v-for="(product) in adminProduct.list">
          <td class="font-bold">{{ product.name }}</td>
          <td>
            <img :src=product.imageUrl class="w-12">
          </td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }} / {{ product.remainQuantity }}</td>
          <td>
            <div class="badge gap-2" :class="product.status === 'open' ? 'badge-success' : 'badge-error text-white'
              ">
              {{ product.status }}
            </div>
          </td>
          <td>{{ product.updatedAt }}</td>
          <td>
            <div class="flex gap-4">
              <RouterLink :to="{ name: 'admin-products-update', params: { id: product.productId } }" class="btn btn-ghost">
                <Edit></Edit>
              </RouterLink>
              <div @click="removeProduct( product.productId)" class="btn btn-ghost">
                <Trash></Trash>
              </div>
            </div>
          </td>
        </tr>
      </Table>   
      <Pagination
        :activePage="currentPage"
        :maxPage="adminProduct.totalPage"
        :changePage="changePage"
      ></Pagination>
  </AdminLayout>
</template>