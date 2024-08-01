import { defineStore } from 'pinia'
import { auth } from 'src/boot/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { ref } from 'vue'

export const useStoreUsers = defineStore('users', () => {
  const currentUser = ref(null)
  const userIsLoading = ref(false)

  const getCurrentUser = () => {
    userIsLoading.value = true
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        currentUser.value = user
        userIsLoading.value = false
      } else {
        currentUser.value = null
        userIsLoading.value = false
      }
    })
  }

  const registerUser = (formData) => {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user
        updateProfile(auth.currentUser, {
          displayName: formData.name,
        })
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  const logoutUser = () => {
    console.log('logout')
  }

  return {
    currentUser,
    userIsLoading,
    getCurrentUser,
    registerUser,
    logoutUser,
  }
})
