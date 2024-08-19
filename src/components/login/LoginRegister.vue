<template>
  <q-form
    @submit="submitForm"
    class="flex column q-px-lg q-mx-auto"
    style="max-width: 400px"
  >
    <h3 class="text-center">
      {{ formAction == 'login' ? 'Login' : 'Sign Up' }}
    </h3>
    <q-input
      v-if="formAction == 'signup'"
      class="q-mb-md"
      outlined
      v-model="formData.name"
      label="Name"
    />
    <q-input
      class="q-mb-md"
      outlined
      v-model="formData.email"
      label="Email"
      type="email"
    />
    <q-input
      class="q-mb-md"
      outlined
      v-model="formData.password"
      label="Password"
      type="password"
    />
    <div v-if="storeUsers.authError" class="text-negative text-center q-mb-sm">
      {{ storeUsers.authError }}
    </div>
    <div class="row">
      <q-space />
      <q-btn v-if="storeUsers.userIsLoading" disabled>Loading...</q-btn>
      <q-btn
        v-else
        color="primary"
        :label="formAction == 'login' ? 'Login' : 'Sign Up'"
        type="submit"
        no-caps
      />
    </div>
    <p v-if="formAction == 'login'" class="text-center q-mt-md">
      Need an account? <RouterLink to="/signup">Sign Up</RouterLink>
    </p>
    <p v-if="formAction == 'signup'" class="text-center q-mt-md">
      Already have an account? <RouterLink to="/login">Login</RouterLink>
    </p>
  </q-form>
</template>

<script setup>
import { reactive } from 'vue'
import { useStoreUsers } from 'src/stores/storeUsers'

const storeUsers = useStoreUsers()
const props = defineProps({ formAction: String })

const formData = reactive({
  name: '',
  email: '',
  password: '',
})

const submitForm = () => {
  if (props.formAction == 'login') {
    storeUsers.loginUser(formData)
  } else {
    storeUsers.registerUser(formData)
  }
}
</script>
