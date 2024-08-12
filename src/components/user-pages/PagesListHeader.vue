<template>
  <div class="bg-grey-3">
    <q-item>
      <q-item-section>Pages</q-item-section>
      <q-item-section side>
        <q-btn
          @click="showForm = !showForm"
          :icon="showForm ? 'mdi-minus' : 'mdi-plus'"
          size="sm"
          flat
          round
        />
      </q-item-section>
      <q-item-section side>
        <q-btn
          @click="
            storePages.options.showPageOptions =
              !storePages.options.showPageOptions
          "
          :icon="!storePages.options.showPageOptions ? 'mdi-cog' : 'mdi-check'"
          size="sm"
          round
          flat
        />
      </q-item-section>
    </q-item>

    <q-slide-transition>
      <div v-show="showForm">
        <AddPage />
      </div>
    </q-slide-transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStorePages } from 'src/stores/storePages'
import AddPage from './AddPage.vue'

const storePages = useStorePages()
const showForm = ref(false)
</script>
