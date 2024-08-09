<template>
  <div class="text-center text-h5 q-pt-lg">
    Welcome to
    <h3 class="q-ma-none">Backpack</h3>
    <div v-if="user">
      <p class="q-ma-md">
        Hello {{ user.displayName }}! Go to one of your pages:
      </p>
      <PagesList />
    </div>

    <p v-else>
      Please <RouterLink to="/login">Login</RouterLink> or
      <RouterLink to="/signup">Sign Up</RouterLink>
    </p>
  </div>
</template>

<script setup>
import PagesList from 'src/components/user-pages/PagesList.vue'

const props = defineProps({
  user: { type: Object },
})
</script>
