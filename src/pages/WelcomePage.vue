<template>
  <div class="text-center text-h5 q-pt-lg">
    Welcome to
    <h3 class="q-ma-none">Backpack</h3>
    <p class="q-ma-md">Hello {{ user.displayName }}!</p>
  </div>
</template>

<script setup>
const props = defineProps({
  user: { type: Object },
})
</script>
