import { createApp } from 'vue'
import router from '../router.ts'
import App from './App.vue'
import './assets/main.css'

createApp(App)
  .use(router)
  .mount('#app')
