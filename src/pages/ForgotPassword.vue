<template>
  <q-form
    @submit="submitForm"
    class="flex column q-px-lg q-mx-auto"
    style="max-width: 400px"
  >
    <h3 class="text-center q-mb-sm">Reset Password</h3>
    <p class="text-center">
      Please enter your email below and a link to reset your password will be
      emailed to you.
    </p>
    <q-input
      class="q-mb-md"
      outlined
      v-model="email"
      label="Email"
      type="email"
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
        label="Send Password Reset Email"
        type="submit"
        no-caps
      />
    </div>
  </q-form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useStoreUsers } from 'src/stores/storeUsers'

const $q = useQuasar()
const storeUsers = useStoreUsers()

const email = ref('')

const submitForm = async () => {
  await storeUsers.passwordReset(email.value)
  if (!storeUsers.authError) {
    $q.notify({
      message: 'Password reset email sent!',
      color: 'accent',
      position: 'top',
    })
    email.value = ''
  }
}

onMounted(() => {
  storeUsers.authError = ''
})
</script>
