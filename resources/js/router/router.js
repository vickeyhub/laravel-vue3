import { createRouter, createWebHistory } from 'vue-router';
import AuthService from '../services/AuthService.js';

// Import pages
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Users from '../pages/Users/Index.vue';

// Import Auth pages
import LoginPage from '../Admin/Modules/Auth/Pages/LoginPage.vue';
import RegisterPage from '../Admin/Modules/Auth/Pages/RegisterPage.vue';
import ForgotPasswordPage from '../Admin/Modules/Auth/Pages/ForgotPasswordPage.vue';
import ResetPasswordPage from '../Admin/Modules/Auth/Pages/ResetPasswordPage.vue';

const routes = [
    // Auth Routes (Public)
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: { requiresAuth: false, layout: 'auth' },
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        meta: { requiresAuth: false, layout: 'auth' },
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPasswordPage,
        meta: { requiresAuth: false, layout: 'auth' },
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPasswordPage,
        meta: { requiresAuth: false, layout: 'auth' },
    },
    // Protected Routes
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: { requiresAuth: true },
    },
    {
        path: '/users',
        name: 'users',
        component: Users,
        meta: { requiresAuth: true },
    },
    {
        path: '/',
        redirect: '/home',
    },
];

const router = createRouter({
    history: createWebHistory('/admin'),
    routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
    const isAuthenticated = AuthService.isAuthenticated();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    console.log('Router Guard:', {
        to: to.name,
        from: from.name,
        isAuthenticated,
        requiresAuth,
        toMeta: to.meta
    });

    // If route requires auth and user is not authenticated
    if (requiresAuth && !isAuthenticated) {
        console.log('Redirecting to login - route requires auth but user not authenticated');
        next({ name: 'login', query: { redirect: to.fullPath } });
        return;
    }

    // If user is authenticated and trying to access auth pages, redirect to home
    if (isAuthenticated && to.meta.requiresAuth === false && to.meta.layout === 'auth') {
        console.log('Redirecting to home - user authenticated trying to access auth page');
        next({ name: 'home' });
        return;
    }

    console.log('Allowing navigation to:', to.name);
    next();
});

export default router;
