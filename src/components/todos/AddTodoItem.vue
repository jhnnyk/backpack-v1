<template>
  <q-form @submit="addNewTodo" class="row q-mt-lg">
    <div class="col-10">
      <q-input
        v-model="newTodo"
        :error="!!storeTodos.error"
        class="q-mx-lg"
        placeholder="new todo here"
        bottom-slots
        rounded
        standout
        dense
      >
        <template v-slot:error>
          {{ storeTodos.error }}
        </template>
      </q-input>
    </div>

    <div class="col-1">
      <q-btn type="submit" color="primary" icon="mdi-plus" size="md" round />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreTodos } from 'src/stores/storeTodos'
import { useStorePages } from 'src/stores/storePages'
import { useStoreUsers } from 'src/stores/storeUsers'

const route = useRoute()
const storeTodos = useStoreTodos()
const storePages = useStorePages()
const storeUsers = useStoreUsers()

const newTodo = ref('')

const addNewTodo = async () => {
  await storeTodos.addNewTodo({
    pageId: storePages.currentPageId,
    name: newTodo.value,
    description: 'lorem ipsum',
    owner: storeUsers.currentUser.uid,
    completed: false,
    sort: storeTodos.pageTodos(route.params.pageId).length,
  })

  // if adding todo was successful reset the form
  if (!storeTodos.error) {
    newTodo.value = ''
  }
}
</script>
