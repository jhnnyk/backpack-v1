<template>
  <q-page>
    <div v-if="user">
      <p class="q-ma-md">Hello {{ user.displayName }}!</p>
      <TodoList />
      <AddTodoItem />
    </div>
    <div v-else-if="userIsLoading" class="text-center q-pa-lg">
      ... loading ...
    </div>
    <div v-else class="text-center q-pa-lg">
      Please <RouterLink to="/login">Login</RouterLink>
    </div>
  </q-page>
</template>

<script setup>
import AddTodoItem from 'src/components/todos/AddTodoItem.vue'
import TodoList from 'src/components/todos/TodoList.vue'

const props = defineProps({
  user: { type: Object },
  userIsLoading: { type: Boolean },
})
</script>
