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
                <h2 class="text-3xl font-bold text-slate-900">Admin Registration</h2>
                <p class="mt-2 text-sm text-slate-600">Create your admin account</p>
            </div>

            <!-- Register Card -->
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

                    <form @submit.prevent="handleRegister" class="space-y-4">
                        <!-- Name -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-semibold">Full Name</span>
                            </label>
                            <input
                                v-model="form.name"
                                type="text"
                                placeholder="John Doe"
                                class="input input-bordered w-full"
                                :class="{ 'input-error': errors.name }"
                                required
                            />
                            <label v-if="errors.name" class="label">
                                <span class="label-text-alt text-error">{{ errors.name[0] }}</span>
                            </label>
                        </div>

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
                            <span v-if="!loading">Create Account</span>
                            <span v-else>Creating account...</span>
                        </button>
                    </form>

                    <!-- Login Link -->
                    <div class="divider">OR</div>
                    <div class="text-center">
                        <p class="text-sm text-slate-600">
                            Already have an account?
                            <router-link to="/admin/login" class="link link-primary font-semibold">
                                Sign in here
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

const { register, loading, error } = useAuth();

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const errors = ref({});
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const successMessage = ref('');

const handleRegister = async () => {
    errors.value = {};
    error.value = null;
    successMessage.value = '';

    const result = await register(form);

    if (!result.success && result.error?.errors) {
        errors.value = result.error.errors;
    }
};
</script>

