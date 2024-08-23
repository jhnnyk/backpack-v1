<template>
  <q-btn
    icon="mdi-account-circle"
    :label="displayName"
    class="q-pa-sm"
    no-caps
    rounded
    dense
    flat
  >
    <q-menu>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <q-toggle
            v-model="storeSettings.settings.showUnfinishedTodoCount"
            @update:model-value="
              !storeSettings.settings.showUnfinishedTodoCount
            "
            label="show unfinished todo count"
          />
          <q-toggle
            v-model="storeSettings.settings.confirmDeletePage"
            @update:model-value="!storeSettings.settings.confirmDeletePage"
            label="confirm delete page"
          />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar
            size="72px"
            font-size="54px"
            color="blue-grey-7"
            text-color="white"
          >
            {{ Array.from(displayName)[0].toUpperCase() }}
          </q-avatar>

          <div class="text-subtitle1 q-mb-xs">{{ displayName }}</div>

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
import { useStoreSettings } from 'src/stores/storeSettings'

defineProps({
  displayName: { String, required: true },
})

const storeUsers = useStoreUsers()
const storeSettings = useStoreSettings()

const mobileData = ref(true)
const bluetooth = ref(false)
</script>
