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
      <q-item class="bg-grey-3">
        <q-item-section>Pages</q-item-section>
        <q-item-section side>
          <CreatePageButton icon="mdi-plus" size="sm" flat round />
        </q-item-section>
      </q-item>

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
import CreatePageButton from 'src/components/user-pages/CreatePageButton.vue'
import PagesList from 'src/components/user-pages/PagesList.vue'
import { onMounted, ref } from 'vue'
import { useStoreUsers } from 'src/stores/storeUsers'

const storeUsers = useStoreUsers()

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(() => {
  storeUsers.getCurrentUser()
})
</script>
