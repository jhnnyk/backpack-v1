<template>
  <q-item>
    <q-item-section side>
      <q-checkbox v-model="completed" />
    </q-item-section>
    <q-item-section class="text-grey-9"
      >{{ todo.name }} - {{ todo.sort }}</q-item-section
    >

    <q-item-section v-if="storeTodos.options.sort" side>
      <q-icon class="handle" name="mdi-reorder-horizontal" color="primary" />
    </q-item-section>
    <q-item-section v-else side>
      <q-btn icon="mdi-square-edit-outline" size="sm" flat round />
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
