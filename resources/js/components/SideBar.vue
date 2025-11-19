<template>
    <aside class="bg-slate-900 min-h-full w-64 shadow-xl border-r border-slate-800">
        <!-- Sidebar Logo -->
        <div class="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <i class="fas fa-shield-alt text-white text-lg"></i>
            </div>
            <span class="text-lg font-bold text-white">{{ title }}</span>
        </div>

        <!-- Sidebar Menu -->
        <ul class="menu p-4 space-y-1 w-full">
            <li v-for="item in mainMenuItems" :key="item.path">
                <router-link
                    :to="item.path"
                    class="gap-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors rounded-lg"
                    active-class="bg-blue-600 text-white"
                >
                    <i :class="`fas fa-${item.icon}`"></i>
                    <span>{{ item.label }}</span>
                </router-link>
            </li>

            <li class="menu-title mt-4">
                <span class="text-slate-500 text-xs uppercase">Settings</span>
            </li>

            <li v-for="item in settingsMenuItems" :key="item.path">
                <router-link
                    v-if="item.path"
                    :to="item.path"
                    class="gap-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors rounded-lg"
                    active-class="bg-blue-600 text-white"
                >
                    <i :class="`fas fa-${item.icon}`"></i>
                    <span>{{ item.label }}</span>
                </router-link>
                <a
                    v-else
                    @click="item.action && item.action()"
                    class="gap-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors rounded-lg cursor-pointer"
                >
                    <i :class="`fas fa-${item.icon}`"></i>
                    <span>{{ item.label }}</span>
                </a>
            </li>
        </ul>

        <!-- Sidebar Footer -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-slate-900">
            <div class="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                <div class="avatar online">
                    <div class="w-10 rounded-full">
                        <img :src="user.avatar" :alt="user.name" />
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-white font-medium text-sm truncate">{{ user.name }}</p>
                    <p class="text-slate-400 text-xs truncate">{{ user.email }}</p>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth.js';

const { logout } = useAuth();

// Props
const props = defineProps({
    title: {
        type: String,
        default: 'Dashboard',
    },
    user: {
        type: Object,
        required: true,
    },
    menuItems: {
        type: Array,
        default: () => [],
    },
});

// Default menu items if not provided via props
const mainMenuItems = ref(props.menuItems.length > 0 ? props.menuItems : [
    { path: '/home', icon: 'th-large', label: 'Dashboard' },
    { path: '/users', icon: 'users', label: 'Users' },
    // { path: '/products', icon: 'box', label: 'Products' },
    // { path: '/orders', icon: 'shopping-cart', label: 'Orders' },
    // { path: '/analytics', icon: 'chart-line', label: 'Analytics' },
]);

const settingsMenuItems = ref([
    { path: '/about', icon: 'info-circle', label: 'About' },
    { path: null, icon: 'cog', label: 'Settings', action: () => console.log('Settings clicked') },
    { path: null, icon: 'sign-out-alt', label: 'Logout', action: () => logout() },
]);
</script>

