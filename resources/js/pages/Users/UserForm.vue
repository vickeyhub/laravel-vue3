<script setup>
import {ref, watch} from 'vue';
import axios from 'axios';

const props = defineProps({
    formAction: {
        type: String,
        default: null
    },
    userId: {
        type: Number,
        default: null
    }
});

const emit = defineEmits(['close', 'saved']);

const userFormModal = ref(null);
const userFormTitle = ref('');
const loading = ref(false);
const errors = ref({});

const form = ref({
    name: '',
    email: '',
    password: '',
    is_admin: false
});

// Watch for formAction changes
watch(
    () => props.formAction,
    async (newValue) => {
        if (newValue === 'create') {
            userFormTitle.value = 'Create User';
            resetForm();
            userFormModal.value?.showModal();
        } 
        else if (newValue === 'edit') {
            userFormTitle.value = 'Edit User';
            await fetchUserData();
            userFormModal.value?.showModal();
        }
        else if (newValue === null) {
            // Close modal when formAction is reset to null
            userFormModal.value?.close();
        }
    }
);

// Fetch user data for editing
const fetchUserData = async () => {
    if (!props.userId) return;
    
    try {
        const response = await axios.get(`/api/admin/users/${props.userId}`);
        if (response.data.success) {
            const user = response.data.data;
            form.value = {
                name: user.name || '',
                email: user.email || '',
                password: '', // Don't pre-fill password
                is_admin: user.is_admin || false
            };
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        errors.value = { general: ['Failed to load user data'] };
    }
};

// Reset form
const resetForm = () => {
    form.value = {
        name: '',
        email: '',
        password: '',
        is_admin: false
    };
    errors.value = {};
};

// Handle form submission
const handleSubmit = async () => {
    loading.value = true;
    errors.value = {};

    try {
        const formData = {
            name: form.value.name,
            email: form.value.email,
            is_admin: form.value.is_admin
        };

        // Only include password if it's provided (for create or update)
        if (form.value.password) {
            formData.password = form.value.password;
        }

        let response;
        if (props.formAction === 'create') {
            // Create new user
            response = await axios.post('/api/admin/users', formData);
        } else if (props.formAction === 'edit') {
            // Update existing user
            response = await axios.put(`/api/admin/users/${props.userId}`, formData);
        }

        if (response && response.data.success) {
            emit('saved', response.data.data);
            closeUserForm();
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            errors.value = error.response.data.errors;
        } else {
            errors.value = { 
                general: [error.response?.data?.message || 'An error occurred'] 
            };
        }
    } finally {
        loading.value = false;
    }
};

const closeUserForm = () => {
    resetForm();
    userFormModal.value?.close();
    // Emit close event to parent to reset formAction
    emit('close');
}
</script>
<template>
    <dialog ref="userFormModal" class="modal">
        <div class="modal-box">
            <form method="dialog">
                <button @click="closeUserForm" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 class="text-lg font-bold mb-4">{{ userFormTitle }}</h3>
            
            <!-- Error Message -->
            <div v-if="errors.general" class="alert alert-error mb-4">
                <i class="fas fa-exclamation-circle"></i>
                <span>{{ errors.general[0] }}</span>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Name Field -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Full Name <span class="text-error">*</span></span>
                    </label>
                    <input
                        v-model="form.name"
                        type="text"
                        placeholder="Enter full name"
                        class="input input-bordered w-full"
                        :class="{ 'input-error': errors.name }"
                        required
                    />
                    <label v-if="errors.name" class="label">
                        <span class="label-text-alt text-error">{{ errors.name[0] }}</span>
                    </label>
                </div>

                <!-- Email Field -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Email Address <span class="text-error">*</span></span>
                    </label>
                    <input
                        v-model="form.email"
                        type="email"
                        placeholder="Enter email address"
                        class="input input-bordered w-full"
                        :class="{ 'input-error': errors.email }"
                        required
                    />
                    <label v-if="errors.email" class="label">
                        <span class="label-text-alt text-error">{{ errors.email[0] }}</span>
                    </label>
                </div>

                <!-- Password Field -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">
                            Password 
                            <span v-if="formAction === 'create'" class="text-error">*</span>
                            <span v-else class="text-slate-500 text-xs">(Leave blank to keep current password)</span>
                        </span>
                    </label>
                    <input
                        v-model="form.password"
                        type="password"
                        :placeholder="formAction === 'create' ? 'Enter password' : 'Enter new password (optional)'"
                        class="input input-bordered w-full"
                        :class="{ 'input-error': errors.password }"
                        :required="formAction === 'create'"
                    />
                    <label v-if="errors.password" class="label">
                        <span class="label-text-alt text-error">{{ errors.password[0] }}</span>
                    </label>
                </div>

                <!-- Role Field -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">User Role</span>
                    </label>
                    <select v-model="form.is_admin" class="select select-bordered w-full">
                        <option :value="false">Regular User</option>
                        <option :value="true">Administrator</option>
                    </select>
                </div>

                <!-- Form Actions -->
                <div class="modal-action mt-6">
                    <button type="button" @click="closeUserForm" class="btn btn-ghost" :disabled="loading">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary" :disabled="loading">
                        <span v-if="loading" class="loading loading-spinner loading-sm"></span>
                        <span v-else>{{ formAction === 'create' ? 'Create User' : 'Update User' }}</span>
                    </button>
                </div>
            </form>
        </div>
        <!-- Backdrop -->
        <form method="dialog" class="modal-backdrop" @click="closeUserForm">
            <button>close</button>
        </form>
    </dialog>
</template>