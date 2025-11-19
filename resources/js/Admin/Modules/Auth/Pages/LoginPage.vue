<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
            <!-- Logo/Header -->
            <div class="text-center mb-8">
                <div class="flex justify-center mb-4">
                    <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                        <i class="fas fa-shield-alt text-white text-2xl"></i>
                    </div>
                </div>
                <h2 class="text-3xl font-bold text-slate-900">Admin Login</h2>
                <p class="mt-2 text-sm text-slate-600">Sign in to your admin account</p>
            </div>

            <!-- Login Card -->
            <div class="card bg-white shadow-xl">
                <div class="card-body">
                    <!-- Error Alert -->
                    <div v-if="error" class="alert alert-error mb-4">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>{{ error }}</span>
                    </div>

                    <!-- Success Alert -->
                    <div v-if="successMessage" class="alert alert-success mb-4">
                        <i class="fas fa-check-circle"></i>
                        <span>{{ successMessage }}</span>
                    </div>

                    <form @submit.prevent="handleLogin" class="space-y-4">
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

                        <!-- Password -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Password</span>
                            </label>
                            <div class="relative">
                                <input
                                    v-model="form.password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="Enter your password"
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

                        <!-- Remember Me & Forgot Password -->
                        <div class="flex items-center justify-between">
                            <label class="label cursor-pointer">
                                <input
                                    v-model="form.remember"
                                    type="checkbox"
                                    class="checkbox checkbox-sm"
                                />
                                <span class="label-text ml-2">Remember me</span>
                            </label>
                            <router-link
                                :to="{ name: 'forgot-password' }"
                                class="label-text-alt link link-primary"
                            >
                                Forgot password?
                            </router-link>
                        </div>

                        <!-- Submit Button -->
                        <button
                            type="submit"
                            class="btn btn-primary w-full"
                            :class="{ 'loading': loading }"
                            :disabled="loading"
                        >
                            <span v-if="!loading">Sign In</span>
                            <span v-else>Signing in...</span>
                        </button>
                    </form>

                    <!-- Register Link -->
                    <div class="divider">OR</div>
                    <div class="text-center">
                        <p class="text-sm text-slate-600">
                            Don't have an account?
                            <router-link :to="{ name: 'register' }" class="link link-primary font-semibold">
                                Register here
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuth } from '../../../../composables/useAuth.js';

const { login, loading, error } = useAuth();

const form = reactive({
    email: '',
    password: '',
    remember: false,
});

const errors = ref({});
const showPassword = ref(false);
const successMessage = ref('');

const handleLogin = async () => {
    errors.value = {};
    error.value = null;
    successMessage.value = '';

    const result = await login({
        email: form.email,
        password: form.password,
    });

    if (!result.success && result.error?.errors) {
        errors.value = result.error.errors;
    }
};
</script>

