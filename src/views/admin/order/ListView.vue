<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'

import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAdminOrderStore } from '@/stores/admin/order'

import Table from '@/components/Table.vue'

const adminOrderStore= useAdminOrderStore()

onMounted(async () => {
  await adminOrderStore.loadOrder()
  console.log(adminOrderStore.list)
})
</script>

<template>
  <AdminLayout>

    <div class="p-4 my-4">
        <div class="flex items-center justify-between">
          <div class="text-3xl font-bold">Order</div>
        </div>  
        <Table  :headers="['Customer Name','Price','Status','Update At','']">
          <tr v-for=" order in  adminOrderStore.list">
            <td>{{ order.name }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.createdAt }}</td>
            <td>
              <RouterLink :to="{name: 'admin-orders-detail', params:{ id: order.uid } }" 
              class="btn btn-ghost"
              >See details
              </RouterLink>
            </td>
          </tr>
        </Table> 
    </div>
  </AdminLayout> 
  
</template>