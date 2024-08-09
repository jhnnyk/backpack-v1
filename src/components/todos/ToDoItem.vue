<template>
  <q-item>
    <q-item-section side>
      <q-checkbox v-model="completed" />
    </q-item-section>
    <q-item-section class="text-grey-9">
      <q-item-label> {{ todo.name }} - {{ todo.sort }} </q-item-label>
    </q-item-section>

    <q-item-section v-if="storeTodos.options.showOptions" side top>
      <div>
        <q-btn icon="mdi-square-edit-outline" size="sm" flat round />
        <q-btn
          @click="storeTodos.deleteTodo(todo.id)"
          icon="mdi-delete"
          color="negative"
          size="sm"
          flat
          round
        />
        <q-btn
          icon="mdi-reorder-horizontal"
          class="handle"
          size="sm"
          flat
          round
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref } from 'vue'
import { useStoreTodos } from 'src/stores/storeTodos'

const storeTodos = useStoreTodos()
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const completed = ref(false)
</script>
