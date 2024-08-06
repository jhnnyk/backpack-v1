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

        <div v-if="!storeUsers.currentUser">
          <q-btn to="/login" padding="xs" flat no-caps>Login</q-btn>
          or
          <q-btn to="/signup" padding="xs" flat no-caps>Sign Up</q-btn>
        </div>
        <div v-else-if="storeUsers.userIsLoading">loading...</div>
        <div v-else>
          <q-icon name="mdi-account-circle" />
          {{ storeUsers.currentUser.displayName }}
          <q-btn @click="storeUsers.logoutUser">Logout</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <PagesListHeader />
      <PagesList />
    </q-drawer>

    <q-page-container>
      <router-view
        :user="storeUsers.currentUser"
        :userIsLoading="storeUsers.userIsLoading"
      />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useStoreUsers } from 'src/stores/storeUsers'
import PagesList from 'src/components/user-pages/PagesList.vue'
import PagesListHeader from 'src/components/user-pages/PagesListHeader.vue'

const storeUsers = useStoreUsers()

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
