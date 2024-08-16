<template>
  <q-item-section class="text-grey-9">
    <div v-html="item.description"></div>
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
