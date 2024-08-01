import { defineStore } from 'pinia'
import { auth } from 'src/boot/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const useStoreUsers = defineStore('users', () => {
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

  return {
    registerUser,
  }
})
