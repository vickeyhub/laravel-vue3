<template>
    <div class="navbar bg-white shadow-sm sticky top-0 z-40 border-b border-slate-200">
        <!-- Mobile Menu Toggle -->
        <div class="flex-none lg:hidden">
            <label for="main-drawer" class="btn btn-square btn-ghost">
                <i class="fas fa-bars text-xl text-slate-700"></i>
            </label>
        </div>
        
        <!-- Logo/Brand -->
        <div class="flex-1">
            <a class="btn btn-ghost text-xl font-bold text-slate-800">
                <i class="fas fa-shield-alt text-blue-600"></i>
                {{ brandName }}
            </a>
        </div>
        
        <!-- Header Actions -->
        <div class="flex items-center gap-3">
            <!-- Search Bar (Desktop) -->
            <div class="form-control hidden md:block">
                <div class="relative">
                    <input 
                        v-model="searchQuery" 
                        type="text" 
                        placeholder="Search..." 
                        class="input input-sm h-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 w-72 pl-9 pr-4 rounded-lg transition-all text-sm"
                        @keyup.enter="handleSearch"
                    />
                    <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                </div>
            </div>
            
            <!-- Notifications Dropdown -->
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle h-10 w-10 min-h-0 hover:bg-slate-100">
                    <div class="indicator">
                        <i class="fas fa-bell text-slate-600"></i>
                        <span v-if="notificationCount > 0" class="badge badge-xs bg-red-500 border-none text-white indicator-item px-1.5 min-w-[18px] h-[18px]">
                            {{ notificationCount }}
                        </span>
                    </div>
                </div>
                <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-bold text-lg">Notifications</span>
                            <button class="btn btn-ghost btn-xs" @click="markAllAsRead">
                                Mark all as read
                            </button>
                        </div>
                        
                        <div v-if="notifications.length > 0" class="space-y-2 max-h-96 overflow-y-auto">
                            <div 
                                v-for="notification in notifications" 
                                :key="notification.id"
                                class="flex gap-3 p-3 hover:bg-base-200 rounded-lg cursor-pointer transition-colors"
                                @click="handleNotificationClick(notification)"
                            >
                                <div class="avatar placeholder">
                                    <div :class="`bg-${notification.color} text-${notification.color}-content rounded-full w-10`">
                                        <i :class="`fas fa-${notification.icon}`"></i>
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <p class="font-semibold text-sm">{{ notification.title }}</p>
                                    <p class="text-xs text-base-content/70">{{ notification.message }}</p>
                                    <p class="text-xs text-base-content/50 mt-1">{{ notification.time }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div v-else class="text-center py-8 text-base-content/50">
                            <i class="fas fa-bell-slash text-4xl mb-2"></i>
                            <p>No notifications</p>
                        </div>
                        
                        <div class="divider my-2"></div>
                        <button class="btn btn-sm btn-ghost w-full">
                            View All Notifications
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Theme Toggle (Optional) -->
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle h-10 w-10 min-h-0 hover:bg-slate-100">
                    <i class="fas fa-palette text-slate-600"></i>
                </div>
                <ul tabindex="0" class="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li class="menu-title"><span>Select Theme</span></li>
                    <li><a @click="changeTheme('light')"><i class="fas fa-sun mr-2"></i>Light</a></li>
                    <li><a @click="changeTheme('dark')"><i class="fas fa-moon mr-2"></i>Dark</a></li>
                    <li><a @click="changeTheme('corporate')"><i class="fas fa-building mr-2"></i>Corporate</a></li>
                </ul>
            </div>
            
            <!-- User Profile Dropdown -->
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle h-10 w-10 min-h-0 p-0 hover:bg-slate-100">
                    <div class="avatar">
                        <div class="w-9 rounded-full">
                            <img 
                                :alt="user.name" 
                                :src="user.avatar || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'" 
                            />
                        </div>
                    </div>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li class="menu-title">
                        <span>{{ user.name }}</span>
                        <span class="text-xs text-base-content/50">{{ user.email }}</span>
                    </li>
                    <div class="divider my-1"></div>
                    <li>
                        <a @click="goToProfile">
                            <i class="fas fa-user mr-2"></i>
                            Profile
                        </a>
                    </li>
                    <li>
                        <a @click="goToSettings">
                            <i class="fas fa-cog mr-2"></i>
                            Settings
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="fas fa-question-circle mr-2"></i>
                            Help & Support
                        </a>
                    </li>
                    <div class="divider my-1"></div>
                    <li>
                        <a @click="handleLogout" class="text-error">
                            <i class="fas fa-sign-out-alt mr-2"></i>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Props
const props = defineProps({
    brandName: {
        type: String,
        default: 'Admin Panel',
    },
    user: {
        type: Object,
        default: () => ({
            name: 'John Doe',
            email: 'john@example.com',
            avatar: '',
        }),
    },
});

// Emits
const emit = defineEmits(['search', 'logout', 'theme-change', 'notification-click']);

// State
const searchQuery = ref('');
const notificationCount = ref(3);
const notifications = ref([
    {
        id: 1,
        title: 'New Order',
        message: 'You have a new order from customer',
        time: '2 minutes ago',
        icon: 'shopping-cart',
        color: 'success',
    },
    {
        id: 2,
        title: 'Low Stock Alert',
        message: 'Product inventory is running low',
        time: '1 hour ago',
        icon: 'exclamation-triangle',
        color: 'warning',
    },
    {
        id: 3,
        title: 'New User',
        message: 'A new user has registered',
        time: '3 hours ago',
        icon: 'user-plus',
        color: 'info',
    },
]);

// Methods
const handleSearch = () => {
    if (searchQuery.value.trim()) {
        emit('search', searchQuery.value);
    }
};

const markAllAsRead = () => {
    notificationCount.value = 0;
    // Add your mark as read logic here
};

const handleNotificationClick = (notification) => {
    emit('notification-click', notification);
};

const changeTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    emit('theme-change', theme);
};

const goToProfile = () => {
    // Add navigation to profile
    console.log('Navigate to profile');
};

const goToSettings = () => {
    // Add navigation to settings
    console.log('Navigate to settings');
};

const handleLogout = () => {
    emit('logout');
};
</script>

