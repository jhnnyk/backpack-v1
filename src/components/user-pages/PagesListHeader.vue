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
        <q-form class="q-pa-sm">
          <q-input placeholder="add new page" standout rounded dense>
            <template v-slot:after>
              <q-btn
                round
                color="primary"
                icon="mdi-plus"
                size="sm"
                type="submit"
              />
            </template>
          </q-input>
        </q-form>
      </div>
    </q-slide-transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showForm = ref(false)
</script>
