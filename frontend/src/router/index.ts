import { createRouter, createWebHistory } from 'vue-router'

import OnboardView from '@/views/OnboardView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import OrderView from '@/views/OrderView.vue'
import { auth } from '@/middleware/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: OnboardView
    },
    {
      path: "/register",
      name: 'register',
      component: RegisterView,
      
    },
    {
      path: "/login",
      name: 'login',
      component: LoginView,
      
    },
    {
      path:'/order',
      component: OrderView
    }
  ],
})

router.beforeEach((to, from, next) => {
  auth(to, from, next)
})

export default router
