<template>
  <q-item-section class="text-grey-9">
    <q-item-label>
      <h4>{{ item.title }}</h4>
    </q-item-label>
    <p>{{ item.description }}</p>
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
