<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useStoreUsers } from 'src/stores/storeUsers'
import { useStorePages } from 'src/stores/storePages'

const storeUsers = useStoreUsers()
const storePages = useStorePages()

onMounted(async () => {
  await storeUsers.getCurrentUser()
  if (storeUsers.currentUser) {
    storePages.loadPages(storeUsers.currentUser.uid)
  }
})
</script>
