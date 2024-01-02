import { 
    GoogleAuthProvider,
    signInWithPopup, 
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";

import { auth, db } from '@/firebase'
import { defineStore } from "pinia";

import {
    doc,
    getDoc,
    setDoc,
    updateDoc
} from  'firebase/firestore'

const provider = new GoogleAuthProvider() 

export const useAccountStore = defineStore('account', {
    state: () => ({
        isLoggedIn: false,
        isAdmin: false,
        user: {},  
        profile: {}
    }),
    actions: { 
        async checkAuth () { 
             return new Promise ((resolve) => {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                     this.user = user
                     const docRef = doc(db, 'users', user.uid )
                     const docSnap = await getDoc(docRef)
                      
                     if (docSnap.exists()) {
                        this.profile = docSnap.data()
                     } else {
                        const newUser = {
                            fullname: user.displayName,
                            role: 'member',
                            status: 'active',
                            updatedAt: new Date()
                        }
                        await setDoc(docRef, newUser)
                        this.profile = newUser                        
                     }
                     if (this.profile.role === 'admin' || this.profile.role === 'moderator') {
                        this.isAdmin = true
                     }
                     this.isLoggedIn = true 
                     
                     this.profile.email = user.email
                    
                     resolve(true)
                    } else {
                        resolve(false)
                    }
                 })
            })
          
        },
        async updateProfile (userData) {
            console.log(userData)
            try {
                const updateUserData = {
                    fullname: userData.fullname,
                    imageUrl: userData.imageUrl
                }
    
                const userRef = doc(db, `users/${this.user.uid}`)
                await updateDoc(userRef,updateUserData)
            } catch (error) {
                console.log('error',error)
            }
        },
        async signInWithGoogle () {
           try {
            const result = await signInWithPopup(auth, provider)
            this.isLoggedIn = true
            this.user = result.user
           } catch (error) {
                console.log('error',error)
           }         
        },
        async signInAdmin (email, passworad) {
            try {
                const result = await signInWithEmailAndPassword(auth, email , passworad)
                this.user = result.user
                this.isAdmin = true
                this.isLoggedIn = true
            } catch (error) {
                console.log('error',error.code)
                switch (error.code) {
                    case 'auth/invalid-email':
                        throw new Error('Email  ไม่ถูกต้อง')                      
                    case 'auth/wrong-password':
                        throw new Error('Password ไม่ถูกต้อง')                        
                    default: 
                        throw new Error('Login  มีปัญหา')
                }
            }
        },
        async logout () {
            try {
             this.isLoggedIn = false
             this.isAdmin = false
             await signOut(auth)
            } catch (error) {
                 console.log('error',error)
            }         
         }
    }
})

