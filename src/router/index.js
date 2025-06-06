import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/HomeView.vue';
import Post from '../views/PostsView.vue';
import Login from '../views/LoginView.vue';
import Todos from '../views/TodosView.vue';
import Users from '../views/UsersView.vue';
import Contact from '../views/ContactView.vue';
import Register from '../views/RegisterView.vue';
import Dashboard from '../views/DashboardView.vue';
import PostDetail from '../views/PostDetailView.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true },
  },
  {
    path: '/posts',
    name: 'Post',
    component: Post,
    meta: { requiresAuth: true },
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetail,
    meta: { requiresAuth: true },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 1. Block guests from protected pages
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
    return;
  }

  // 2. Block logged-in users from auth pages.
  const guestOnlyPages = ['/login', '/register'];
  if (guestOnlyPages.includes(to.path) && isLoggedIn) {
    next('/');
    return;
  }

  // 3. Otherwise, allow navigation
  next();
});

export default router;
