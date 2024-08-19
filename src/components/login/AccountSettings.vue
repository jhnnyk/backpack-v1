<template>
  <q-btn icon="mdi-account-circle" :label="displayName" no-caps>
    <q-menu>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <q-toggle v-model="mobileData" label="Use Mobile Data" />
          <q-toggle v-model="bluetooth" label="Bluetooth" />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

          <q-btn
            @click="storeUsers.logoutUser"
            color="primary"
            label="Logout"
            size="sm"
            no-caps
            rounded
            v-close-popup
          />
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script setup>
import { ref } from 'vue'
import { useStoreUsers } from 'src/stores/storeUsers'

defineProps({
  displayName: { String, required: true },
})

const storeUsers = useStoreUsers()

const mobileData = ref(true)
const bluetooth = ref(false)
</script>
