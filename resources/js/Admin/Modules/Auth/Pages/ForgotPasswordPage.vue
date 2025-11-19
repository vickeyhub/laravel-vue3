<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
            <!-- Logo/Header -->
            <div class="text-center mb-8">
                <div class="flex justify-center mb-4">
                    <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                        <i class="fas fa-key text-white text-2xl"></i>
                    </div>
                </div>
                <h2 class="text-3xl font-bold text-slate-900">Forgot Password</h2>
                <p class="mt-2 text-sm text-slate-600">Enter your email to receive reset link</p>
            </div>

            <!-- Forgot Password Card -->
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

                    <form v-if="!successMessage" @submit.prevent="handleForgotPassword" class="space-y-4">
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

                        <!-- Submit Button -->
                        <button
                            type="submit"
                            class="btn btn-primary w-full"
                            :class="{ 'loading': loading }"
                            :disabled="loading"
                        >
                            <span v-if="!loading">Send Reset Link</span>
                            <span v-else>Sending...</span>
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
import { ref, reactive } from 'vue';
import { useAuth } from '../../../../composables/useAuth.js';

const { forgotPassword, loading, error } = useAuth();

const form = reactive({
    email: '',
});

const errors = ref({});
const successMessage = ref('');

const handleForgotPassword = async () => {
    errors.value = {};
    error.value = null;
    successMessage.value = '';

    const result = await forgotPassword(form.email);

    if (result.success) {
        successMessage.value = result.message || 'Password reset link sent to your email';
    } else {
        if (result.errors) {
            errors.value = result.errors;
        }
    }
};
</script>

