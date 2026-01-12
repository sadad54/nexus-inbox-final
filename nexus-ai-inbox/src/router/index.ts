import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import InboxView from '../modules/chat/InboxView.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
  path: '',
  name: 'Inbox',
  component: InboxView // Use the component directly
}
      ]
    }
  ]
})

export default router