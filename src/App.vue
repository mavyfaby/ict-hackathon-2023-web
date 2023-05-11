<template>
  <div class="container mx-auto p-4 h-full ">
    <v-appbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { setDefaultTheme } from './theme';
import VAppbar from './components/VAppbar.vue';

setDefaultTheme(false);
</script>

<style scoped>

</style>
