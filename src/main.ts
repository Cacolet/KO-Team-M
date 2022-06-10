import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store";
import router from "@/routers";

// reset css
import "@/styles/reset.scss"
// element plus
import ElementPlus from "element-plus"
// element icons
import * as Icons from "@element-plus/icons-vue"
// element css
import "element-plus/dist/index.css"
// element dark
import "element-plus/theme-chalk/dark/css-vars.css"

// 创建vue实例
const app = createApp(App)

// 挂载 pinia
app.use(store)
app.use(router)
app.use(ElementPlus)

Object.keys(Icons).forEach(key =>{
    app.component(key,Icons[key as keyof typeof Icons])
})

// 挂载实例
app.mount("#app")