import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import TaskIndex from './components/task-index.vue';
import Login from './views/login-view.vue';
import Register from './views/register-view.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/task-index', component: TaskIndex },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
