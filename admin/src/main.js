import { createApp } from "vue";
import { createPinia } from "pinia";
import store from "@/stores/index.js";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import Particles from "particles.vue3";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import router from "./router";
import "@/util/axios.config";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(Particles);
app.use(createPinia());
app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount("#app");
