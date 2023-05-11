<template>
  <div class="appbar flex justify-between p-4">
    <div class="left">
      {{ store.title }}
    </div>
    <div class="right">
      <md-text-button v-if="isFunctionShow && route.name !== 'Mentors' && route.name !== 'Mentor'" @click="router.push({ name: 'Mentors' })">
        See all mentors
      </md-text-button>
      <md-tonal-button v-if="isFunctionShow" @click="onLogout">
        Logout
      </md-tonal-button>
      <md-switch @click="changeTheme" :selected="isDarkMode()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";

import { useRouter, useRoute } from "vue-router";
import { useStore } from "../store";
import { setDefaultTheme, isDarkMode } from "../theme";

const isFunctionShow = computed(() => {
  return !["Login", "Signup", "Landing"].includes(route.name as string);
});

const store = useStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {

});

function onLogout() {
  localStorage.removeItem("intern");
  localStorage.removeItem("mentor");
  router.push({ name: 'Login' })
}

function changeTheme(ev: any) {
  setDefaultTheme(ev.target.button.ariaChecked === "true");
}
</script>

<style lang="scss" scoped>
.left, .right {
  @apply flex items-center font-bold text-on-surface-variant text-lg;
}

.right {
  @apply space-x-4;
}
</style>