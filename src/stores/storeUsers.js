import { defineStore } from 'pinia'
import { auth } from 'src/boot/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStorePages } from './storePages'

export const useStoreUsers = defineStore('users', () => {
  const router = useRouter()
  const currentUser = ref(null)
  const userIsLoading = ref(false)
  const authError = ref('')
  const storePages = useStorePages()

  const getCurrentUser = () => {
    userIsLoading.value = true
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          currentUser.value = user
          userIsLoading.value = false
          resolve()
        } else {
          currentUser.value = null
          userIsLoading.value = false
          resolve('no user found')
        }
      })
    })
  }

  const loginUser = (formData) => {
    userIsLoading.value = true
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        userIsLoading.value = false
        router.push('/')
      })
      .catch((error) => {
        formatErrorMessage(error)
        userIsLoading.value = false
      })
  }

  const registerUser = (formData) => {
    userIsLoading.value = true
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        // Signed up
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        })
        userIsLoading.value = false
        router.push('/')
      })
      .then(() => {
        // send email verification
        sendEmailVerification(auth.currentUser)
      })
      .catch((error) => {
        formatErrorMessage(error)
        userIsLoading.value = false
      })
  }

  const logoutUser = () => {
    signOut(auth)
    storePages.pages = []
    router.push('/')
  }

  const formatErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        authError.value =
          'There is already an account using that email. Please check the email address and try again or login instead.'
        break
      case 'auth/weak-password':
        authError.value = 'Password needs to be at least 6 characters long.'
        break
      case 'auth/missing-password':
        authError.value = 'Please enter your password.'
        break
      case 'auth/invalid-credential':
        authError.value =
          'Email address or Password is incorrect. Please try again or Sign Up instead.'
        break
      default:
        authError.value = error.code + ' | ' + error.message
        break
    }
  }

  return {
    authError,
    currentUser,
    userIsLoading,
    getCurrentUser,
    loginUser,
    registerUser,
    logoutUser,
  }
})
