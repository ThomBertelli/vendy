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
      component: () => import('../components/StoresManage.vue') 
    },
    {
      path:'/new-store',
      name: 'new-store',
      component: () => import('../components/NewStore.vue') 
    },
    {
      path: '/edit-store',
      name: 'EditStore',
      component: () => import('../components/EditStore.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../components/ProductsManage.vue'),
      props:true
    },
    {
      path: '/new-product',
      name: 'new-product',
      component: () => import('../components/NewProduct.vue'),
      props:true
    },
    {
      path: '/edit-product',
      name: 'edit-product',
      component: () => import('../components/EditProduct.vue'),
      
    },

  ]
})

export default router
