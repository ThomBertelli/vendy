import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/signin',
      name: 'signin',
      component: () => import('../components/SignIn.vue') 
    },
    {
      path:'/signup',
      name: 'signup',
      component: () => import('../components/SignUp.vue') 
    },
    {
      path:'/stores',
      name: 'stores',
      component: () => import('../components/Stores.vue') 
    },
  ]
})

export default router
