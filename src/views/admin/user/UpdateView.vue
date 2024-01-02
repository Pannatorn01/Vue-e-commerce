<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router' 
import AdminLayout from '@/layouts/AdminLayout.vue'

import { useAdminUserStore } from '@/stores/admin/user'
import { useEventStore } from '@/stores/event.js'

const formData = [
  {
  name: 'Name',
  field: 'fullname',
  type: 'text'
  },
  {
  name: 'Role',
  field: 'role',
  type: 'select',
  dropdowsList: ['admin', 'moderator', 'user']
  },
  {
  name: 'Status',
  field: 'status',
  type: 'select',
  dropdowsList: ['active', 'inactive']
  }
]

const adminUserStore = useAdminUserStore()
const eventStore = useEventStore()
const route = useRoute()
const router = useRouter()

const userIndex = ref(-1)
const userData = reactive({
  fullname: '',
  role: '',
  status: ''
})

onMounted (async () => {
  if (route.params.id) {
    userIndex.value = route.params.id
    const selectUser = await adminUserStore.getUser(userIndex.value)
    userData.fullname = selectUser.fullname
    userData.role = selectUser.role
    userData.status = selectUser.status
  }
})

const updateUser = async () => {
  await adminUserStore.updateUser(userIndex.value, userData)
  eventStore.popupMessage('info','Upate user successful')
  router.push({ name: 'admin-users-list'})
}


</script>

<template>
  <AdminLayout>
    <div>
      <div class="shadow-xl p-10 m-4">
        <div class="text-3xl font-bold">Update User</div>
        <div class="divider"></div>
          <div class="grid grid-cols-1 gap-2">
            <div v-for="form in formData" class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ form.name }}</span>
              </label>
              <input 
                v-if="form.type === 'text'"
                v-model="userData[form.field]"
                type="text" 
                class="input input-bordered w-full"              
              />
              <select 
                v-if="form.type === 'select'"
                v-model="userData[form.field]"
                class="input input-bordered w-full"              
              >
                <option v-for="item in form.dropdowsList">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
        <div class="flex mt-4 justify-end">        
          <RouterLink :to="{name:'admin-users-list'}" class="btn btn-ghost">Back</RouterLink>
          <button class="btn btn-neutral" @click="updateUser()">Update</button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
