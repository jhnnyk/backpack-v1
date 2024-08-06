<template>
  <q-form @submit="addNewTodo" class="q-mt-lg">
    <q-input
      v-model="newTodo"
      class="q-mx-lg"
      placeholder="new todo here"
      rounded
      standout
      dense
    >
      <template v-slot:after>
        <q-btn color="primary" icon="mdi-plus" type="submit" round />
      </template>
    </q-input>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { useStoreTodos } from 'src/stores/storeTodos'
import { useStorePages } from 'src/stores/storePages'
import { useStoreUsers } from 'src/stores/storeUsers'

const storeTodos = useStoreTodos()
const storePages = useStorePages()
const storeUsers = useStoreUsers()

const newTodo = ref('')

const addNewTodo = () => {
  storeTodos.addNewTodo({
    pageId: storePages.currentPageId,
    name: newTodo.value,
    description: 'lorem ipsum',
    owner: storeUsers.currentUser.uid,
    completed: false,
  })
}
</script>
