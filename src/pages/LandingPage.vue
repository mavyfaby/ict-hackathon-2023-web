<template>
    <div class="container mx-auto h-full relative">
      <div class="logo flex flex-col justify-center items-center h-full gap-5 pt-24">
        <img :src="store.dark ? DarkLogo : LightLogo" />
        <h3>MentorMe</h3>
        <h5>Elevate your skills, be mentored, be code ready.</h5>
        <md-filled-button @click="login">Get started</md-filled-button>
      </div>
    </div>
  </template>
    
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '../store';
  
  import LightLogo from "../assets/logo.svg?url";
  import DarkLogo from "../assets/logo-dark.svg?url";
  
  const router = useRouter();
  const store = useStore();
  const el = ref(null);
  
  function login() {
    router.push({ name: "Login" });
  }
  
  onMounted(() => {
    // // Loop animation
    // anime({
    //   targets: el.value,
    //   translateY: 30,
    //   duration: 2000,
    //   loop: true,
    //   direction: 'alternate',
    //   easing: 'linear',
    // });
  });
  </script>
  
  <style lang="scss" scoped>
  img {
    @apply w-24;
  }
  
  h3 {
    @apply text-4xl font-bold text-on-surface-variant dark:text-primary text-center;
  }
  
  h5 {
    @apply font-medium text-on-surface-variant text-center;
  }

.logo {
  animation: 2s linear infinite alternate updown;
}

@keyframes updown {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(20px);
  }
}
  </style>