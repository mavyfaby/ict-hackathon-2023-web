<template>
  <div class="container flex justify-center pt-16 mx-auto">
    <VCard :loading="isLoading" class="w-full sm:w-3/4 md:w-3/5 lg:w-1/2">
      <h3 class="title">Sign in to our platform</h3>
      <div class="flex flex-col">
        <!-- Username -->
        <md-filled-text-field
          v-model="user"
          class="mt-4"
          label="Username"
          placeholder="Enter username"
        >
          <md-icon slot="leadingicon">person</md-icon>
        </md-filled-text-field> 

        <!-- Password -->
        <md-filled-text-field
          v-model="pass"
          class="mt-4"
          type="password"
          label="Password"
          placeholder="Enter password"
        >
          <md-icon slot="leadingicon">lock</md-icon>
        </md-filled-text-field>

        <div class="flex items-center mt-5">
          <label class="flex items-center" for="intern">
            <md-radio @click="type = 1" name="type" value="0" id="intern" checked /> Intern
          </label>
          <label class="flex items-center" for="mentor">
            <md-radio @click="type = 2" name="type" value="1" id="mentor" /> Mentor
          </label>
        </div>

        <!-- Login Button -->
        <div class="flex items-center justify-between">
          <md-text-button @click="create" class="mt-8">
            Create Account
          </md-text-button>
          <md-filled-button @click="login" class="mt-8">
            <md-icon slot="icon">login</md-icon> Login
          </md-filled-button>
        </div>
      </div>
    </VCard>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import VCard from '../../components/VCard.vue';
import makeRequest, { Endpoints } from "../../network/request";
import { setStore } from "../../utils/storage";

const isLoading = ref(false);
const router = useRouter();

const user = ref("");
const pass = ref("");
const type = ref(1);

function login() {
  makeRequest("POST", type.value == 1 ? Endpoints.InternLogin : Endpoints.MentorLogin, {
    username: user.value,
    password: pass.value
  }, data => {
    if (data.intern !== undefined) {
      setStore("intern", data.intern.intern_id);
      router.push({ name: "Intern" });
      return;
    }

    if (data.mentor !== undefined) {
      setStore("mentor", data.mentor.mentor_id);
      router.push({ name: "Mentor" });
      return;
    }
  });
}

function create() {
  router.push({ name: 'Signup' });
}
</script>

<style scoped>
.title {
  @apply font-bold text-2xl mb-3 text-center;
}
</style>