<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useStoreUsers } from 'src/stores/storeUsers'
import { useStoreTodos } from 'src/stores/storeTodos'
import { useStorePages } from 'src/stores/storePages'

const storeUsers = useStoreUsers()
const storeTodos = useStoreTodos()
const storePages = useStorePages()

onMounted(async () => {
  await storeUsers.getCurrentUser()
  if (storeUsers.currentUser) {
    storeTodos.loadTodos(storeUsers.currentUser.uid)
    storePages.loadPages(storeUsers.currentUser.uid)
  }
})
</script>
