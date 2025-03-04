import { createRouter, createWebHistory } from 'vue-router'
import FormView from './src/views/FormView.vue'

const routes = [
  { path: '/', component: FormView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
