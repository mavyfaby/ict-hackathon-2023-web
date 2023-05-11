<template>
  <div class="grid grid-cols-2 px-4 h-full">
    <div>
      <div v-show="isLoading" class="flex justify-center items-center">
        <md-circular-progress indeterminate />
      </div>
      <div v-show="!isLoading">
        <div class="flex gap-3 text-on-surface">
          <h4>#{{ route.params.id }}</h4>
          <h4 class="font-bold text-on-surface">{{ getStore("challenge") }}</h4>
        </div>
        <div class="mt-10 text-on-surface" v-html="data" />
        <div class="flex mt-5 justify-end">
          <md-filled-button class="mt-5" :disabled="isSubmitting" @click="onSubmit">
            {{ getStore("intern") !== null ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Review' }}
          </md-filled-button>
        </div>

        <h4 class="text-on-surface">Chats</h4>
        
        <div class="flex justify-between flex-col border border-outline-variant rounded-xl p-5 mt-5 chats-container">
          <div class="chats" ref="chatsEl">
            <VChat
              class="py-2"
              v-for="(chat, i) in chats"
              :key="i"
              :message="chat.message"
            />
          </div>

          <div class="flex items-center mt-4">
            <md-filled-text-field class="w-full" v-model="message" placeholder="Your message">
            </md-filled-text-field>
            <md-tonal-button class="ml-3" @click="onMessage">Send</md-tonal-button>
          </div>
        </div>
      </div>
    </div>
    <div class="h-full">
      <div v-show="isLoading" class="flex justify-center items-center">
        <md-circular-progress indeterminate />
      </div>
      <div class="h-full" v-show="!isLoading">
        <div ref="code" class="code-container h-full">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import makeRequest, { Endpoints } from "../../network/request";
import { getStore, setStore } from "../../utils/storage";

import {EditorView, basicSetup} from "codemirror"
import {EditorState} from "@codemirror/state"
import {javascript} from "@codemirror/lang-javascript"

import VChat from "../../components/VChat.vue";
import showToast from "../../utils/toast";
import { TYPE } from "vue-toastification";

const route = useRoute();
const data = ref("");
const message = ref("");
const isLoading = ref(true);
const isSubmitting = ref(false);

const code = ref(null);
const chats: any = ref([]);
const chatsEl: any = ref(null);

let editor: any = null;

onMounted(() => {
  chats.value = JSON.parse(getStore("chats" + route.params.id) || "[]");

  setTimeout(() => {
    chatsEl.value.scrollTop = chatsEl.value.scrollHeight;
  }, 500);
});

makeRequest("GET", Endpoints.Problem, route.params.id, d => {
  data.value = d;
  isLoading.value = false;

  let startState = EditorState.create({
    doc: "// Insert your code here",
    extensions: [basicSetup, javascript()]
  })

  editor = new EditorView({
    state: startState,
    parent: document.querySelector(".code-container")!
  });

  // Set content from getStore("code" + route.params.id)
  editor.dispatch({
    changes: {
      from: 0,
      to: editor.state.doc.length,
      insert: getStore("code" + route.params.id) || ""
    }
  });
});

function onSubmit() {
  isSubmitting.value = true;

  makeRequest("POST", Endpoints.Submit, {
    problem_id: route.params.id,
    solution: editor?.state.doc.toString(),
    title: getStore("challenge"),
    language: "js",
    intern_id: getStore("intern"),
    description: data.value
  }, d => {
    isSubmitting.value = false;
    showToast(TYPE.SUCCESS, "Your code has been submitted!");
  })
}

function onMessage() {
  chats.value.push({
    message: message.value.toString()
  });

  message.value = "";

  // Save to local storage
  setStore("chats" + route.params.id, JSON.stringify(chats.value));
}
</script>

<style lang="scss" scoped>
.chats {
  @apply w-full grid justify-end flex-col;

  max-height: 275px;
  overflow-y: scroll;
}
</style>