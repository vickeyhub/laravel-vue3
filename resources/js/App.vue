<template>
    <!-- Auth Layout (Login, Register, etc.) -->
    <div v-if="isAuthLayout" class="min-h-screen">
        <router-view></router-view>
    </div>
    
    <!-- Main Admin Layout -->
    <div v-else class="drawer lg:drawer-open">
        <input id="main-drawer" type="checkbox" class="drawer-toggle" v-model="drawerOpen" />
        
        <!-- Main Content -->
        <div class="drawer-content flex flex-col min-h-screen">
            <!-- Header Component -->
            <AdminHeader 
                :brand-name="brandName"
                :user="currentUser"
                @search="handleSearch"
                @logout="handleLogout"
                @theme-change="handleThemeChange"
                @notification-click="handleNotificationClick"
            />
            
            <!-- Page Content -->
            <main class="flex-1 bg-base-200 p-4 md:p-6">
                <router-view></router-view>
            </main>
        </div>
        
        <!-- Sidebar -->
        <div class="drawer-side z-50">
            <label for="main-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <SideBar 
                :title="brandName"
                :user="currentUser"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AdminHeader from './components/AdminHeader.vue';
import SideBar from './components/SideBar.vue';
import AuthService from './services/AuthService.js';
import { useAuth } from './composables/useAuth.js';

const route = useRoute();
const router = useRouter();
const { user, logout: authLogout } = useAuth();

// State
const drawerOpen = ref(false);
const brandName = ref('Admin Panel');
const currentUser = ref(AuthService.getUser() || {
    name: 'Loading...',
    email: 'Please wait...',
    avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
});

// Check if current route is auth layout
const isAuthLayout = computed(() => {
    return route.meta?.layout === 'auth';
});

// Load user on mount
onMounted(async () => {
    if (AuthService.isAuthenticated()) {
        const userData = AuthService.getUser();
        if (userData && userData.name && userData.email) {
            // User data exists in localStorage
            currentUser.value = userData;
        } else {
            // Try to fetch user from API
            const result = await AuthService.getCurrentUser();
            if (result.success) {
                currentUser.value = result.user;
            } else {
                // If API fails, clear authentication and redirect
                AuthService.logout();
                router.push({ name: 'login' });
            }
        }
    }
});

// Watch for user changes
watch(() => user.value, (newUser) => {
    if (newUser) {
        currentUser.value = newUser;
    }
}, { deep: true });

// Event Handlers
const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Add your search logic here
};

const handleLogout = async () => {
    await authLogout();
    currentUser.value = null;
};

const handleThemeChange = (theme) => {
    console.log('Theme changed to:', theme);
    // Theme is already applied in AdminHeader component
};

const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    // Add your notification click logic here
};
</script>
