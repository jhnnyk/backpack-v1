<template>
  <q-slide-item @right="onSlidingLeft" right-color="faded">
    <template v-slot:right>
      <span>- - divider - -</span>
      <q-btn
        @click="storePages.deleteContentItem(item.id)"
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
      <q-btn @click="closeSlider" icon="mdi-close" size="sm" flat round />
    </template>

    <q-item>
      <q-item-section class="text-grey-9">
        <q-item-label>
          <q-separator color="grey-6" />
          <q-separator color="grey-4" />
          <q-separator color="grey-2" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { ref } from 'vue'
import { useStorePages } from 'src/stores/storePages'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const storePages = useStorePages()
const resetSlide = ref(null)

const onSlidingLeft = ({ reset }) => {
  resetSlide.value = reset
}

const closeSlider = () => {
  resetSlide.value()
}
</script>
