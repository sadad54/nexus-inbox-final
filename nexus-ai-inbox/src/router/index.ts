import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'Home',
          // Temporary placeholder until Phase 2
          component: { template: '<div class="text-gray-400">Select a conversation to start chatting.</div>' } 
        }
      ]
    }
  ]
})

export default router