import { createApp } from 'vue'
import { createPinia } from "pinia";

import App from './App.vue'
import router from "./router";
import './scss/main.scss'
import './components'

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

const toastOptions = {
  position: POSITION.BOTTOM_RIGHT,
  maxToasts: 4,
};

app.use(pinia);
app.use(router);
app.use(Toast, toastOptions);
app.mount('#app')
