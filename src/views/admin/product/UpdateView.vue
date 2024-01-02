<script setup>
import { reactive, onMounted, ref} from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { useAdminProductStore } from '@/stores/admin/product'
import AdminLayout from '@/layouts/AdminLayout.vue'

import { storage } from '@/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'

const adminProductStore = useAdminProductStore()
const router = useRouter()
const route = useRoute()

const productIndex = ref(-1)
const mode = ref('ADD')

const formData = [
  {
    name: 'Name',
    filed: 'name'
  },
  {
    name: 'Image',
    filed: 'imageUrl',
    type: 'upload-image'
  },
  {
    name: 'Price',
    filed: 'price'
  },
  {
    name: 'Quantity',
    filed: 'quantity'
  },
  {
    name: 'About',
    filed: 'about'
  },
]

const productData = reactive({
  name: '',
  imageUrl: '',
  price: 0,
  quantity: 0,
  about: '',
  status: '',
  updatedAt: ''
})
 
const updateproduct = async () => {
  try {
    if (mode.value === 'EDIT') {
      await adminProductStore.updateProduct(productIndex.value,productData)
    } else {
      await adminProductStore.addProduct(productData)
    }  
    router.push({ name: 'admin-products-list'})
  } catch (error) {
    console.log('error',error)
  }
 
}

onMounted(async () => {
  if (route.params.id){
    productIndex.value = route.params.id
    mode.value = 'EDIT'
    const selectedProduct = await adminProductStore.getProduct(productIndex.value)

    productData.name = selectedProduct.name
    productData.imageUrl = selectedProduct.imageUrl
    productData.price = selectedProduct.price
    productData.quantity = selectedProduct.quantity
    productData.about = selectedProduct.about
    productData.status = selectedProduct.status
  }
})

const handleFileUpload = async (event) => {
    const file = event.target.files[0]

    let mainPath = ''

    if (productIndex.value !== -1){
      mainPath = productIndex.value + '-'
    }

    if (file) {
        const uploadRef = storageRef(  
            storage,
           `products/${mainPath}${file.name}`
        )
        
        const snapshot = await uploadBytes(uploadRef, file)
        const downloadURL =  await getDownloadURL(snapshot.ref)
        productData.imageUrl = downloadURL
    }
}

</script>

<template>
  
  <AdminLayout>
    <div class="shadow-xl p-10 m-4">
      <div class="text-3xl font-bold">{{ mode }}</div>
      <div class="divider"></div>
      <div class="grid grid-cols-2 gap-2">
        <div v-for="form in formData" class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ form.name }}</span>
          </label>
          <input 
            v-if="form.type !== 'upload-image'"
            type="text" 
            class="input input-bordered w-full" 
            v-model="productData[form.filed]"/>
            <div v-else>
              <div class="avatar">
                <div class="w-24 rounded-full">
                  <img :src="productData[form.filed]" />
                </div>
              </div>
              <input @change="handleFileUpload" type="file">
            </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="grid grid-cols-2 gap-2">
        <div class="form-control w-full">
          <div class="label">
            <span class="label-text">Status</span>
          </div>
          <select v-model="productData.status" class="select select-bordered">
            <option disabled selected>Select status</option>
            <option value="open">Open</option>
            <option value="close">Close</option>
          </select>
        </div>
      </div>
      <div class="flex mt-4 justify-end">
        <RouterLink :to="{name:'admin-products-list'}" class="btn btn-ghost">Back</RouterLink>
        <button class="btn btn-neutral" @click="updateproduct">{{ mode }}</button>
      </div>
    </div>

  </AdminLayout>
</template>