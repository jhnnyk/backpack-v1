<template>
  <q-form @submit="addNewTodo" class="row q-mt-lg items-center">
    <div class="col">
      <q-input
        v-model="newTodo"
        class="q-mx-lg"
        placeholder="new todo here"
        rounded
        standout
        dense
      />
    </div>

    <div class="col col-auto">
      <q-btn
        color="primary"
        class="q-mr-lg"
        icon="mdi-plus"
        type="submit"
        round
      />
    </div>
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
