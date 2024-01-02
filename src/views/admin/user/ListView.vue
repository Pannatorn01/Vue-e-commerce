<script setup>
import { onMounted} from 'vue';
import { RouterLink } from 'vue-router';

import AdminLayout from '@/layouts/AdminLayout.vue'

import { useAdminUserStore } from '@/stores/admin/user'

import Table from '@/components/Table.vue'

const adminUserStore = useAdminUserStore()

onMounted(async () => {
  await adminUserStore.loadUser()
})

const changeStatus = async (index) => {
  let selectedUser = adminUserStore.list[index]
  selectedUser.status = selectedUser.status === 'active' ? 'inactive' : 'active'
  await adminUserStore.updateUser(selectedUser.uid,selectedUser)
}
</script>



<template>
    <AdminLayout>     
      <div class="my-4 p-4">
        <div class="flex items-center justify-between">
          <div class="text-3xl font-bold">User List View</div>
        </div>
        <Table :headers="['Name','Role','Status','Update At','']">
          <tr v-for="(user, index) in adminUserStore.list">
              <td>{{ user.fullname }}</td>
              <td>{{ user.role }}</td>
              <td>{{ user.status }}</td>
              <td>{{ user.updateAt }}</td>
              <td>
                <div class="flex gap-2">
                  <RouterLink 
                    :to="{ name: 'admin-users-update', params: {id: user.uid} }"
                    class="btn btn-ghost"
                  >Edit
                  </RouterLink>
                  <button class="btn btn-ghost" @click="changeStatus(index)">
                    {{ user.status === 'active' ? 'Disable' : 'Enadle'}}
                  </button>
                </div>
              </td>
          </tr>
        </Table>
      </div>

    </AdminLayout> 
</template>