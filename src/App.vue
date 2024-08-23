<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useStoreUsers } from 'src/stores/storeUsers'
import { useStorePages } from 'src/stores/storePages'
import { useStoreSettings } from 'src/stores/storeSettings'

const storeUsers = useStoreUsers()
const storePages = useStorePages()
const storeSettings = useStoreSettings()

onMounted(async () => {
  await storeUsers.getCurrentUser()
  if (storeUsers.currentUser) {
    storePages.loadPages(storeUsers.currentUser.uid)
  }
  storeSettings.loadSettings()
})
</script>
