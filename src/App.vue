<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useStoreUsers } from 'src/stores/storeUsers'
import { useStoreTodos } from 'src/stores/storeTodos'

const storeUsers = useStoreUsers()
const storeTodos = useStoreTodos()

onMounted(async () => {
  await storeUsers.getCurrentUser()
  if (storeUsers.currentUser) {
    storeTodos.loadTodos(storeUsers.currentUser.uid)
  }
})
</script>
