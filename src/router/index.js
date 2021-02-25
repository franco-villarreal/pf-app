import { createRouter, createWebHashHistory } from 'vue-router'
import Movements from '../components/Movements.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Movements
  },
  {
    path: '/movements',
    name: 'Movements',
    component: () => import('../components/Movements.vue')
  },
  {
    path: '/movements/add',
    name: 'NewMovement',
    component: () => import('../views/NewMovement.vue')
  }
  ,
  {
    path: '/movements/update/:movId',
    name: 'UpdateMovement',
    props: true,
    component: () => import('../views/UpdateMovement.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router