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

const storeTodos = useStoreTodos()

const newTodo = ref('')

const addNewTodo = () => {
  storeTodos.addNewTodo({
    pageId: 'thisone2',
    name: newTodo.value,
    description: 'lorem ipsum',
    owner: 'me',
    completed: false,
  })
}
</script>
