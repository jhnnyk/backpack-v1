import { defineStore } from 'pinia'
import { auth } from 'src/boot/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
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

  const loginUser = (formData) => {
    userIsLoading.value = true
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        userIsLoading.value = false
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        userIsLoading.value = false
      })
  }

  const registerUser = (formData) => {
    userIsLoading.value = true
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed up
        updateProfile(auth.currentUser, {
          displayName: formData.name,
        })
        userIsLoading.value = false
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        userIsLoading.value = false
      })
  }

  const logoutUser = () => {
    signOut(auth)
  }

  return {
    currentUser,
    userIsLoading,
    getCurrentUser,
    loginUser,
    registerUser,
    logoutUser,
  }
})
