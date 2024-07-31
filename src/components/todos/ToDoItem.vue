<template>
  <q-item>
    <q-item-section side>
      <q-checkbox v-model="completed" />
    </q-item-section>
    <q-item-section class="text-grey-9">{{ todo.name }}</q-item-section>
    <q-item-section side>
      <q-btn icon="mdi-square-edit-outline" size="sm" flat round />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const completed = ref(false)
</script>
