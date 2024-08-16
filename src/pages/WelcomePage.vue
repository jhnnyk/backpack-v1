<template>
  <div class="text-center text-h5 q-pt-lg">
    <p>Welcome to</p>
    <h3 class="q-ma-none">Backpack</h3>
    <div v-if="storeUsers.userIsLoading">
      <LoadingSpinner />
    </div>

    <div v-if="storeUsers.currentUser">
      <div v-if="storeUsers.currentUser.emailVerified">
        <p class="q-ma-md">
          Hello {{ storeUsers.currentUser.displayName }}! Go to one of your
          pages or add one below:
        </p>
        <PagesList />
        <AddPage />
      </div>

      <div v-else-if="!storeUsers.currentUser.emailVerified">
        <p class="q-ma-md">
          Hello {{ storeUsers.currentUser.displayName }}! Please verify your
          email to continue.
        </p>
        <p>
          <q-btn
            label="Resend email verification"
            color="secondary"
            no-caps
            rounded
          />
        </p>
        <p>
          <q-btn
            @click="refreshPage"
            label="I verified my email. Check again"
            color="secondary"
            no-caps
            rounded
          />
        </p>
      </div>
    </div>

    <p v-else>
      Please <RouterLink to="/login">Login</RouterLink> or
      <RouterLink to="/signup">Sign Up</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStoreUsers } from 'src/stores/storeUsers'
import AddPage from 'src/components/user-pages/AddPage.vue'
import PagesList from 'src/components/user-pages/PagesList.vue'
import LoadingSpinner from 'src/components/LoadingSpinner.vue'

const router = useRouter()
const storeUsers = useStoreUsers()

const props = defineProps({
  user: { type: Object },
  userIsLoading: { type: Boolean },
})

const refreshPage = () => {
  router.go()
}
</script>
