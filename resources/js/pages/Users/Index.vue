<template>
    <div class="space-y-6">
        <!-- Header Section -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 class="text-3xl font-bold text-slate-900">Users Management</h1>
                <p class="text-slate-600 mt-1">Manage and view all registered users</p>
            </div>
            <button class="btn btn-primary gap-2">
                <i class="fas fa-user-plus"></i>
                Add New User
            </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="stats shadow bg-white">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <i class="fas fa-users text-3xl"></i>
                    </div>
                    <div class="stat-title">Total Users</div>
                    <div class="stat-value text-primary">{{ stats.total_users || 0 }}</div>
                    <div class="stat-desc">All registered users</div>
                </div>
            </div>

            <div class="stats shadow bg-white">
                <div class="stat">
                    <div class="stat-figure text-success">
                        <i class="fas fa-user-shield text-3xl"></i>
                    </div>
                    <div class="stat-title">Admins</div>
                    <div class="stat-value text-success">{{ stats.total_admins || 0 }}</div>
                    <div class="stat-desc">Administrator accounts</div>
                </div>
            </div>

            <div class="stats shadow bg-white">
                <div class="stat">
                    <div class="stat-figure text-info">
                        <i class="fas fa-user text-3xl"></i>
                    </div>
                    <div class="stat-title">Regular Users</div>
                    <div class="stat-value text-info">{{ stats.total_regular_users || 0 }}</div>
                    <div class="stat-desc">Standard accounts</div>
                </div>
            </div>
        </div>

        <!-- Search and Filter Section -->
        <div class="card bg-white shadow-xl">
            <div class="card-body">
                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="form-control flex-1">
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                @input="handleSearchInput"
                                type="text"
                                placeholder="Search users by name or email..."
                                class="input input-bordered w-full pl-10"
                            />
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        </div>
                    </div>
                    <div class="form-control w-full sm:w-48">
                        <select v-model="filterRole" @change="handleFilterChange" class="select select-bordered w-full">
                            <option value="all">All Roles</option>
                            <option value="admin">Admins</option>
                            <option value="user">Users</option>
                        </select>
                    </div>
                    <div class="form-control w-full sm:w-32">
                        <select v-model="perPage" @change="handlePerPageChange" class="select select-bordered w-full">
                            <option :value="5">5 per page</option>
                            <option :value="10">10 per page</option>
                            <option :value="25">25 per page</option>
                            <option :value="50">50 per page</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table Section -->
        <div class="card bg-white shadow-xl">
            <div class="card-body">
                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center items-center py-12">
                    <span class="loading loading-spinner loading-lg text-primary"></span>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="alert alert-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <span>{{ error }}</span>
                </div>

                <!-- Empty State -->
                <div v-else-if="Users.length === 0" class="text-center py-12">
                    <i class="fas fa-users text-6xl text-slate-300 mb-4"></i>
                    <h3 class="text-xl font-semibold text-slate-600 mb-2">No Users Found</h3>
                    <p class="text-slate-500">There are no users matching your criteria.</p>
                </div>

                <!-- Users Table -->
                <div v-else class="overflow-x-auto">
                    <table class="table table-zebra">
                        <!-- Table Head -->
                        <thead>
                            <tr>
                                <th class="bg-slate-100">
                                    <label>
                                        <input type="checkbox" class="checkbox checkbox-sm" />
                                    </label>
                                </th>
                                <th class="bg-slate-100">User</th>
                                <th class="bg-slate-100">Email</th>
                                <th class="bg-slate-100">Role</th>
                                <th class="bg-slate-100">Status</th>
                                <th class="bg-slate-100">Joined Date</th>
                                <th class="bg-slate-100 text-center">Actions</th>
                            </tr>
                        </thead>
                        <!-- Table Body -->
                        <tbody>
                            <tr v-for="user in Users" :key="user.id" class="hover">
                                <td>
                                    <label>
                                        <input type="checkbox" class="checkbox checkbox-sm" />
                                    </label>
                                </td>
                                <td>
                                    <div class="flex items-center gap-3">
                                        <div class="avatar placeholder">
                                            <div class="bg-primary text-primary-content rounded-full w-12 h-12 flex items-center justify-center">
                                                <span class="text-lg">{{ getUserInitials(user.name) }}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold text-slate-900">{{ user.name }}</div>
                                            <div class="text-sm text-slate-500">ID: {{ user.id }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-envelope text-slate-400"></i>
                                        <span class="text-slate-700">{{ user.email }}</span>
                                    </div>
                                </td>
                                <td>
                                    <span
                                        v-if="user.is_admin"
                                        class="badge badge-primary gap-2"
                                    >
                                        <i class="fas fa-shield-alt"></i>
                                        Admin
                                    </span>
                                    <span v-else class="badge badge-ghost gap-2">
                                        <i class="fas fa-user"></i>
                                        User
                                    </span>
                                </td>
                                <td>
                                    <span class="badge badge-success gap-2">
                                        <i class="fas fa-check-circle"></i>
                                        Active
                                    </span>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2 text-slate-600">
                                        <i class="fas fa-calendar text-slate-400"></i>
                                        {{ formatDate(user.created_at) }}
                                    </div>
                                </td>
                                <td>
                                    <div class="flex justify-center gap-2">
                                        <button
                                            class="btn btn-ghost btn-sm tooltip"
                                            data-tip="View Details"
                                        >
                                            <i class="fas fa-eye text-info"></i>
                                        </button>
                                        <button
                                            class="btn btn-ghost btn-sm tooltip"
                                            data-tip="Edit User"
                                        >
                                            <i class="fas fa-edit text-warning"></i>
                                        </button>
                                        <button
                                            class="btn btn-ghost btn-sm tooltip"
                                            data-tip="Delete User"
                                        >
                                            <i class="fas fa-trash text-error"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="pagination.total > 0" class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                    <div class="text-sm text-slate-600">
                        Showing <span class="font-semibold">{{ pagination.from || 0 }}</span> to
                        <span class="font-semibold">{{ pagination.to || 0 }}</span> of
                        <span class="font-semibold">{{ pagination.total }}</span> users
                    </div>
                    <div class="join">
                        <button
                            class="join-item btn btn-sm"
                            :disabled="pagination.current_page === 1"
                            @click="goToPage(1)"
                        >
                            «
                        </button>
                        <button
                            class="join-item btn btn-sm"
                            :disabled="pagination.current_page === 1"
                            @click="goToPage(pagination.current_page - 1)"
                        >
                            ‹
                        </button>

                        <!-- Page Numbers -->
                        <button
                            v-for="page in visiblePages"
                            :key="page"
                            class="join-item btn btn-sm"
                            :class="{ 'btn-active': page === pagination.current_page }"
                            @click="goToPage(page)"
                        >
                            {{ page }}
                        </button>

                        <button
                            class="join-item btn btn-sm"
                            :disabled="pagination.current_page === pagination.last_page"
                            @click="goToPage(pagination.current_page + 1)"
                        >
                            ›
                        </button>
                        <button
                            class="join-item btn btn-sm"
                            :disabled="pagination.current_page === pagination.last_page"
                            @click="goToPage(pagination.last_page)"
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import UserService from '../../services/UserService';

const Users = ref([]);
const loading = ref(false);
const error = ref(null);
const searchQuery = ref('');
const filterRole = ref('all');
const perPage = ref(10);
const currentPage = ref(1);

// Pagination state
const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 0,
    to: 0,
});

// Stats state
const stats = ref({
    total_users: 0,
    total_admins: 0,
    total_regular_users: 0,
});

// Debounce timer for search
let searchTimeout = null;

// Computed properties
const visiblePages = computed(() => {
    const pages = [];
    const total = pagination.value.last_page;
    const current = pagination.value.current_page;

    // Show maximum 5 pages
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);

    // Adjust start if we're near the end
    if (end - start < 4) {
        start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
});

// Methods
const getUserInitials = (name) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Fetch users with filters and pagination
const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await UserService.getUsers({
            page: currentPage.value,
            perPage: perPage.value,
            search: searchQuery.value,
            role: filterRole.value,
        });

        if (response.success) {
            Users.value = response.data;
            pagination.value = response.pagination;
            stats.value = response.stats;
        } else {
            error.value = response.message || 'Failed to load users';
        }
    } catch (err) {
        error.value = 'An error occurred while fetching users';
        console.error('Error fetching users:', err);
    } finally {
        loading.value = false;
    }
};

// Handle search input with debounce
const handleSearchInput = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        currentPage.value = 1; // Reset to first page on search
        fetchUsers();
    }, 500); // 500ms debounce
};

// Handle filter change
const handleFilterChange = () => {
    currentPage.value = 1; // Reset to first page on filter change
    fetchUsers();
};

// Handle per page change
const handlePerPageChange = () => {
    currentPage.value = 1; // Reset to first page on per page change
    fetchUsers();
};

// Go to specific page
const goToPage = (page) => {
    if (page >= 1 && page <= pagination.value.last_page) {
        currentPage.value = page;
        fetchUsers();
    }
};

// Fetch users on mount
onMounted(() => {
    fetchUsers();
});
</script>
