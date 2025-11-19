<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
            <!-- Logo/Header -->
            <div class="text-center mb-8">
                <div class="flex justify-center mb-4">
                    <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                        <i class="fas fa-lock text-white text-2xl"></i>
                    </div>
                </div>
                <h2 class="text-3xl font-bold text-slate-900">Reset Password</h2>
                <p class="mt-2 text-sm text-slate-600">Enter your new password</p>
            </div>

            <!-- Reset Password Card -->
            <div class="card bg-white shadow-xl">
                <div class="card-body">
                    <!-- Success Alert -->
                    <div v-if="successMessage" class="alert alert-success mb-4">
                        <i class="fas fa-check-circle"></i>
                        <span>{{ successMessage }}</span>
                    </div>

                    <!-- Error Alert -->
                    <div v-if="error" class="alert alert-error mb-4">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>{{ error }}</span>
                    </div>

                    <form v-if="!successMessage" @submit.prevent="handleResetPassword" class="space-y-4">
                        <!-- Email -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Email Address</span>
                            </label>
                            <input
                                v-model="form.email"
                                type="email"
                                placeholder="admin@example.com"
                                class="input input-bordered w-full"
                                :class="{ 'input-error': errors.email }"
                                required
                            />
                            <label v-if="errors.email" class="label">
                                <span class="label-text-alt text-error">{{ errors.email[0] }}</span>
                            </label>
                        </div>

                        <!-- Token -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Reset Token</span>
                            </label>
                            <input
                                v-model="form.token"
                                type="text"
                                placeholder="Enter reset token from email"
                                class="input input-bordered w-full"
                                :class="{ 'input-error': errors.token }"
                                required
                            />
                            <label v-if="errors.token" class="label">
                                <span class="label-text-alt text-error">{{ errors.token[0] }}</span>
                            </label>
                        </div>

                        <!-- Password -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">New Password</span>
                            </label>
                            <div class="relative">
                                <input
                                    v-model="form.password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="Minimum 8 characters"
                                    class="input input-bordered w-full pr-10"
                                    :class="{ 'input-error': errors.password }"
                                    required
                                />
                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                </button>
                            </div>
                            <label v-if="errors.password" class="label">
                                <span class="label-text-alt text-error">{{ errors.password[0] }}</span>
                            </label>
                        </div>

                        <!-- Confirm Password -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Confirm Password</span>
                            </label>
                            <div class="relative">
                                <input
                                    v-model="form.password_confirmation"
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    placeholder="Confirm your password"
                                    class="input input-bordered w-full pr-10"
                                    :class="{ 'input-error': errors.password_confirmation }"
                                    required
                                />
                                <button
                                    type="button"
                                    @click="showConfirmPassword = !showConfirmPassword"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                </button>
                            </div>
                            <label v-if="errors.password_confirmation" class="label">
                                <span class="label-text-alt text-error">{{ errors.password_confirmation[0] }}</span>
                            </label>
                        </div>

                        <!-- Submit Button -->
                        <button
                            type="submit"
                            class="btn btn-primary w-full"
                            :class="{ 'loading': loading }"
                            :disabled="loading"
                        >
                            <span v-if="!loading">Reset Password</span>
                            <span v-else>Resetting...</span>
                        </button>
                    </form>

                    <!-- Back to Login -->
                    <div class="divider"></div>
                    <div class="text-center">
                        <router-link to="/admin/login" class="link link-primary font-semibold">
                            <i class="fas fa-arrow-left mr-2"></i>
                            Back to Login
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '../../../../composables/useAuth.js';

const route = useRoute();
const router = useRouter();
const { resetPassword, loading, error } = useAuth();

const form = reactive({
    email: '',
    token: '',
    password: '',
    password_confirmation: '',
});

const errors = ref({});
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const successMessage = ref('');

onMounted(() => {
    // Get token and email from URL query params if available
    if (route.query.token) {
        form.token = route.query.token;
    }
    if (route.query.email) {
        form.email = route.query.email;
    }
});

const handleResetPassword = async () => {
    errors.value = {};
    error.value = null;
    successMessage.value = '';

    const result = await resetPassword(form);

    if (result.success) {
        successMessage.value = result.message || 'Password reset successfully';
        setTimeout(() => {
            router.push({ name: 'login' });
        }, 2000);
    } else {
        if (result.errors) {
            errors.value = result.errors;
        }
    }
};
</script>

