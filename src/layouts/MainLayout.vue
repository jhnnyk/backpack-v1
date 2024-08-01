<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-icon name="mdi-bag-personal" />
          Backpack
        </q-toolbar-title>

        <div>Login or Register</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-item class="bg-grey-3">
        <q-item-section>Pages</q-item-section>
        <q-item-section side>
          <CreatePageButton icon="mdi-plus" size="sm" flat round />
        </q-item-section>
      </q-item>

      <PagesList />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import CreatePageButton from 'src/components/user-pages/CreatePageButton.vue'
import PagesList from 'src/components/user-pages/PagesList.vue'
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
