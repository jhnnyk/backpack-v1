<template>
  <q-item-section class="text-grey-9">
    <q-item-label>
      <h1>{{ item.title }}</h1>
    </q-item-label>
  </q-item-section>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
