import { createApp } from "vue";
import App from "./App.vue";
import './index.css'
import createRouter from './router'
// import "./assets/reset.css";
import axios from 'axios'
import store from './store'

const axiosInstance = axios.create({
  withCredentials: true,
})

const app = createApp(App);
app.config.globalProperties.$axios = { ...axiosInstance }

app
  .use(store)
  .use(createRouter())
  .mount("#app");