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
    </q-item>

    <q-slide-transition>
      <div v-show="showForm">
        <q-form @submit="addNewPage" class="row q-gutter-sm q-pa-sm">
          <div class="col-9">
            <q-input placeholder="add new page" standout rounded dense />
          </div>
          <div class="col-1">
            <q-btn color="primary" icon="mdi-plus" type="submit" round />
          </div>
        </q-form>
      </div>
    </q-slide-transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showForm = ref(false)

const addNewPage = () => {
  console.log('add page...')
}
</script>
