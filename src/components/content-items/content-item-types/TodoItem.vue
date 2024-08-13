<template>
  <q-item-section side>
    <q-checkbox v-model="completed" />
  </q-item-section>
  <q-item-section class="text-grey-9">
    <q-item-label> {{ item.title }}</q-item-label>
  </q-item-section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const completed = ref(false)
</script>
