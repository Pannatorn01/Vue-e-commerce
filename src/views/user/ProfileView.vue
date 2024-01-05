<script setup>
import { ref, onMounted } from 'vue'
import UserLayouts  from '@/layouts/UserLayout.vue'

import { useAccountStore } from '@/stores/account'
import { storage } from '@/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'

const accountStore = useAccountStore()

const profileImageUrl = ref('')
const email = ref('')
const fullname = ref('')

onMounted(() => {
    const profileData = accountStore.profile 
    profileImageUrl.value = profileData.imageUrl || 'https://lh3.googleusercontent.com/FPaaqejSmrWmkqOpXBOpQoxDYivfwjTzCiCqy8n4ZMJoVEzy_01vJNCTu0wNZlBKaiBIRi2_7Ba_3IGhkt5elMk2D_YhKvVT1DByBQ'
    fullname.value = profileData.fullname
    email.value = profileData.email
})

const handleFileUpload = async (event) => {
    const file = event.target.files[0]

    if (file) {
        const uploadRef = storageRef(  
            storage,
           `users/${accountStore.user.uid}/${file.name}`
        )
        
        const snapshot = await uploadBytes(uploadRef, file)
        const downloadURL =  await getDownloadURL(snapshot.ref)
        profileImageUrl.value = downloadURL
    }
}

const updateProfile = async () => {
    try {
        const profileData = {
        imageUrl: profileImageUrl.value,
        fullname: fullname.value,
        email: email.value
    }
     await accountStore.updateProfile(profileData)
     alert('Profile updated successfully')
    } catch (error) {
        console.log('error',error)
    }
}
</script>

<template>
    <UserLayouts>
        <div class="max-w-2xl mx-auto border border-base-200 shadow-xl p-8 my-4">
            <div class="text-2xl font-bold">Your Profile</div>
            <div class="flex flex-col items-center ">
                <div>
                    <div class="avatar">
                        <div class="w-24 rounded-full">
                           <img :src="profileImageUrl">
                        </div>
                    </div>                
                </div>
                <input type="file" @change="handleFileUpload">
                <div class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full" :value="email" disabled/>
                </div>
                <div class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Name</span>
                    </div>
                    <input  v-model="fullname" type="text" placeholder="Type here" class="input input-bordered w-full " />
                </div>
                <button @click="updateProfile()" class="btn btn-neutral mt-8 w-full">UPDATE PROFILE</button>
            </div>
        </div>
    </UserLayouts>
</template>