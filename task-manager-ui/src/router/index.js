import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/login-view.vue';
import Register from '../views/register-view.vue';
import TaskIndex from '../components/task-index.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/task-index', component: TaskIndex },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
