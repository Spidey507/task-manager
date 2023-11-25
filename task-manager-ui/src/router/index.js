import { createRouter, createWebHistory } from "vue-router";
import LoginView from '@/views/LoginView';
import RegisterView from '@/views/RegisterView';
import TaskIndex from '@/components/task-index';

const routes = [
  { path: '/login', name: 'LoginView' ,component: LoginView },
  { path: '/register', name: 'RegisterView', component: RegisterView }, 
  { path: '/tasks', name: 'TaskIndex', component: TaskIndex, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Navigation guard to check authentication status
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  // If the route requires authentication and the user is not authenticated, redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
