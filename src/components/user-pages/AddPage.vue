<template>
  <q-form @submit="addNewPage" class="row q-gutter-sm q-pa-sm">
    <div class="col-9">
      <q-input
        v-model="newPageName"
        :error="!!storePages.error"
        @focus="clearError"
        placeholder="add new page"
        standout
        rounded
        dense
      >
        <template v-slot:error>
          {{ storePages.error }}
        </template>
      </q-input>
    </div>
    <div class="col-1">
      <q-btn color="primary" icon="mdi-plus" type="submit" round />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { useStorePages } from 'src/stores/storePages'
import { useStoreUsers } from 'src/stores/storeUsers'

const storePages = useStorePages()
const storeUsers = useStoreUsers()
const newPageName = ref('')

const addNewPage = () => {
  if (newPageName.value == '') {
    return (storePages.error = 'Please name your new page')
  }

  storePages.addPage({
    name: newPageName.value,
    owner: storeUsers.currentUser.uid,
    content: [
      {
        id: 'id1',
        type: 'text',
        title: 'welcome content',
        description: `
          <h4 style="text-align:center">Welcome to your new page</h4>
          <p>Add / edit / delete this content to get started.</p>`,
        completed: false,
      },
    ],
    pageSort: storePages.pages.length,
  })

  // if adding page was successful, reset the form
  if (!storePages.error) {
    newPageName.value = ''
  }
}

const clearError = () => {
  storePages.error = null
}
</script>
