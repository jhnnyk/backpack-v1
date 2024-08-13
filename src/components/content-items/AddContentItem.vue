<template>
  <q-form @submit="addNewItem" class="row q-mt-lg">
    <div class="col-10">
      <q-input
        v-model="newItem"
        :error="!!storePages.addItemError"
        class="q-mx-lg"
        placeholder="new todo here"
        bottom-slots
        rounded
        standout
        dense
      >
        <template v-slot:error>
          {{ storePages.addItemError }}
        </template>
      </q-input>
    </div>

    <div class="col-1">
      <q-btn type="submit" color="primary" icon="mdi-plus" size="md" round />
    </div>
    <div class="col-1">
      <q-btn
        @click="closeForm"
        color="negative"
        icon="mdi-close"
        size="md"
        round
      />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { uid } from 'quasar'
import { useStorePages } from 'src/stores/storePages'

const storePages = useStorePages()

const newItem = ref('')

const addNewItem = async () => {
  await storePages.addNewItem({
    id: uid(),
    title: newItem.value,
    description: 'lorem ipsum',
    completed: false,
    type: 'todo',
  })

  // if adding todo was successful, reset the form
  if (!storePages.addItemError) {
    newItem.value = ''
  }
}

const closeForm = () => {
  storePages.options.showAddItemForm = false
}
</script>
