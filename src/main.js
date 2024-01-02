import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css' // เพิ่มบรรทัดนี้เข้ามา
import VueApexCharts from "vue3-apexcharts";


const app = createApp(App)
app.use(createPinia())


app.use(router)
app.use(VueApexCharts);
app.mount('#app')

