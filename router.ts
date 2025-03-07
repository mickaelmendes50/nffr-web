import { createRouter, createWebHistory } from 'vue-router'
import FormView from './src/views/FormView.vue'
import ResultView from '@/views/ResultView.vue'

const routes = [
  { path: '/', component: FormView },
  { path: '/resultados', component: ResultView },
]

const router = createRouter({
  history: createWebHistory('/arquetipos/'),
  routes
})

export default router
