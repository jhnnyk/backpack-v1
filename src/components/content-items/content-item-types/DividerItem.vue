<template>
  <q-item-section class="text-grey-9">
    <q-item-label>
      <q-separator color="grey-6" />
      <q-separator color="grey-4" />
      <q-separator color="grey-2" />
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
