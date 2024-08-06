<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useStoreUsers } from 'src/stores/storeUsers'

const storeUsers = useStoreUsers()

onMounted(() => {
  storeUsers.getCurrentUser()
})
</script>
