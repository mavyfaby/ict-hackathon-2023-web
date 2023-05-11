<template>
  <div class="container flex justify-center mx-auto">
    <VCard :loading="isLoading" class="w-full sm:w-3/4 md:w-3/5 lg:w-1/2">
      <h3 class="title">Create Account</h3>
      <div class="flex flex-col">
        <!-- Name -->
        <md-filled-text-field
          v-model="name"
          class="mt-4"
          label="Name"
          placeholder="Enter bane"
        >
          <md-icon slot="leadingicon">person</md-icon>
        </md-filled-text-field> 

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
          <md-text-button @click="login" class="mt-8">
            Login Instead
          </md-text-button>
          <md-filled-button @click="create" class="mt-8">
            <md-icon slot="icon">login</md-icon> Create Account
          </md-filled-button>
        </div>
      </div>
    </VCard>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VCard from '../../components/VCard.vue';

import { useRouter } from "vue-router";
import showToast from "../../utils/toast";
import { TYPE } from "vue-toastification";
import makeRequest, { Endpoints } from "../../network/request";

const router = useRouter();
const isLoading = ref(false);

const name = ref("");
const user = ref("");
const pass = ref("");
const type = ref(1);

function login() {
  router.push({ name: 'Login' });
}

function create() {
  if (name.value === "" || user.value === "" || pass.value === "") {
    showToast(TYPE.ERROR, "Please fill all fields");
    return;
  }

  makeRequest("POST", type.value == 1 ? Endpoints.Intern : Endpoints.Mentor, {
    name: name.value,
    username: user.value,
    password: pass.value,
  }, data => {
    if (data.result && data.result > 0) {
      showToast(TYPE.SUCCESS, "Account created successfully");
      router.push({ name: 'Login' });
      return;
    }

    showToast(TYPE.ERROR, "Account creation failed");
  });
}
</script>

<style scoped>
.title {
  @apply font-bold text-2xl mb-3 text-center;
}
</style>