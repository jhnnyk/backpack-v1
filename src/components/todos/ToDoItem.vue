<template>
  <q-item>
    <q-item-section side>
      <q-checkbox v-model="completed" />
    </q-item-section>
    <q-item-section class="text-grey-9"> go shopping </q-item-section>
    <q-item-section side>
      <q-btn icon="mdi-square-edit-outline" size="sm" flat round />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref } from 'vue'

const completed = ref(false)
</script>
