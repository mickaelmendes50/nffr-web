import { createRouter, createWebHashHistory } from 'vue-router'
import FormView from './src/views/FormView.vue'
import ResultView from '@/views/ResultView.vue'

const routes = [
  { path: '/', component: FormView },
  { path: '/resultados', component: ResultView },
]

const router = createRouter({
  history: createWebHashHistory('/arquetipos/'),
  routes,
})

export default router
