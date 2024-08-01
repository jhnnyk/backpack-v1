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
    <div class="row">
      <q-space />
      <q-btn
        color="primary"
        :label="formAction == 'login' ? 'Login' : 'Sign Up'"
        type="submit"
        no-caps
      />
    </div>
  </q-form>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({ formAction: String })

const formData = reactive({
  name: '',
  email: '',
  password: '',
})

const submitForm = () => {
  if (props.formAction == 'login') {
    console.log('login!')
  } else {
    console.log('sign up!')
  }
}
</script>
