<template>
    <dialog 
        ref="userDetailModal" 
        class="modal modal-bottom sm:modal-middle"
    >
        <div class="modal-box max-w-2xl w-full p-0 overflow-hidden" id="user-detail-content">
            <!-- Modal Header with Gradient -->
            <div class="bg-gradient-to-r from-primary to-primary-focus text-white p-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="avatar placeholder">
                            <div class="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                                <span class="text-2xl font-bold">
                                    {{ userDetail && userDetail.name ? getUserInitials(userDetail.name) : 'U' }}
                                </span>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-white">
                                {{ userDetail && userDetail.name ? userDetail.name : 'Loading...' }}
                            </h3>
                            <p class="text-primary-content/80 text-sm mt-1">User Details</p>
                        </div>
                    </div>
                    <button 
                        @click="closeModal"
                        class="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20"
                    >
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Modal Body -->
            <div class="p-6 bg-white">
                <!-- Loading State -->
                <div v-if="!userDetail" class="flex justify-center items-center py-12">
                    <span class="loading loading-spinner loading-lg text-primary"></span>
                </div>

                <!-- User Details Content -->
                <div v-else class="space-y-6">
                    <!-- User Information Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- User ID Card -->
                        <div class="card bg-base-100 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div class="card-body p-4">
                                <div class="flex items-center gap-3">
                                    <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <i class="fas fa-id-card text-primary text-xl"></i>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-xs text-slate-500 uppercase tracking-wide font-semibold">User ID</p>
                                        <p class="text-lg font-bold text-slate-900 mt-1">#{{ userDetail.id }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Email Card -->
                        <div class="card bg-base-100 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div class="card-body p-4">
                                <div class="flex items-center gap-3">
                                    <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center">
                                        <i class="fas fa-envelope text-info text-xl"></i>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-xs text-slate-500 uppercase tracking-wide font-semibold">Email Address</p>
                                        <p class="text-lg font-semibold text-slate-900 mt-1 break-all">{{ userDetail.email }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Role Card -->
                        <div class="card bg-base-100 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div class="card-body p-4">
                                <div class="flex items-center gap-3">
                                    <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                                        <i class="fas fa-user-shield text-success text-xl"></i>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-xs text-slate-500 uppercase tracking-wide font-semibold">Role</p>
                                        <div class="mt-1">
                                            <span 
                                                :class="[
                                                    'badge badge-lg gap-2',
                                                    userDetail.is_admin ? 'badge-primary' : 'badge-ghost'
                                                ]"
                                            >
                                                <i :class="userDetail.is_admin ? 'fas fa-shield-alt' : 'fas fa-user'"></i>
                                                {{ userDetail.is_admin ? 'Administrator' : 'Regular User' }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Status Card -->
                        <div class="card bg-base-100 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div class="card-body p-4">
                                <div class="flex items-center gap-3">
                                    <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                                        <i class="fas fa-check-circle text-success text-xl"></i>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-xs text-slate-500 uppercase tracking-wide font-semibold">Account Status</p>
                                        <div class="mt-1">
                                            <span class="badge badge-success badge-lg gap-2">
                                                <i class="fas fa-check-circle"></i>
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Additional Information Section -->
                    <div class="divider">
                        <i class="fas fa-info-circle text-slate-400"></i>
                    </div>

                    <!-- Timestamps -->
                    <div class="space-y-4">
                        <div class="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                                <i class="fas fa-calendar-plus text-warning"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-slate-700 mb-1">Account Created</p>
                                <p class="text-base text-slate-900">
                                    <i class="fas fa-clock text-slate-400 mr-2"></i>
                                    {{ formatDate(userDetail.created_at) }}
                                </p>
                                <p class="text-xs text-slate-500 mt-1">
                                    {{ formatDateTime(userDetail.created_at) }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                                <i class="fas fa-edit text-info"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-slate-700 mb-1">Last Updated</p>
                                <p class="text-base text-slate-900">
                                    <i class="fas fa-clock text-slate-400 mr-2"></i>
                                    {{ formatDate(userDetail.updated_at) }}
                                </p>
                                <p class="text-xs text-slate-500 mt-1">
                                    {{ formatDateTime(userDetail.updated_at) }}
                                </p>
                            </div>
                        </div>

                        <div v-if="userDetail.email_verified_at" class="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                                <i class="fas fa-check-circle text-success"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-slate-700 mb-1">Email Verified</p>
                                <p class="text-base text-slate-900">
                                    <i class="fas fa-clock text-slate-400 mr-2"></i>
                                    {{ formatDate(userDetail.email_verified_at) }}
                                </p>
                            </div>
                        </div>

                        <div v-else class="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                                <i class="fas fa-exclamation-circle text-warning"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-slate-700 mb-1">Email Verification</p>
                                <p class="text-base text-slate-900">
                                    <i class="fas fa-times-circle text-slate-400 mr-2"></i>
                                    Not Verified
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-action p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button 
                    @click="closeModal"
                    class="btn btn-ghost gap-2"
                >
                    <i class="fas fa-times"></i>
                    Close
                </button>
            </div>
        </div>
        <!-- Backdrop -->
        <form method="dialog" class="modal-backdrop" @click="closeModal">
            <button>close</button>
        </form>
    </dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        default: null
    },
    isOpen: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['close']);
const userDetailModal = ref(null);
const userDetail = ref(props.user);

// Watch for user prop changes
watch(() => props.user, (newUser) => {
    userDetail.value = newUser;
}, { immediate: true });

// Watch for modal open/close
watch(() => props.isOpen, (newValue) => {
    if (userDetailModal.value) {
        if (newValue) {
            userDetailModal.value.showModal();
        } else {
            userDetailModal.value.close();
        }
    }
});

// Close modal
const closeModal = () => {
    emit('close');
};

// Helper functions
const getUserInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
};

// Format date
const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatDateTime = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
</script>
