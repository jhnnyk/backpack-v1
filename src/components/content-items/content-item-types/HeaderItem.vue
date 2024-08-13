<template>
  <q-item-section class="text-grey-9">
    <q-item-label>
      <h2 class="text-center q-ma-md">{{ item.title }}</h2>
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
