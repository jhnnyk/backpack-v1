<template>
  <div class="text-center text-h5 q-pt-lg">
    Welcome to
    <h3 class="q-ma-none">Backpack</h3>
    <p v-if="user" class="q-ma-md">Hello {{ user.displayName }}!</p>
    <p v-else>
      Please <RouterLink to="/login">Login</RouterLink> or
      <RouterLink to="/signup">Sign Up</RouterLink>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  user: { type: Object },
})
</script>
