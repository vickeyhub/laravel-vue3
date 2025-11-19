import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../services/AuthService.js';

export function useAuth() {
    const router = useRouter();
    const loading = ref(false);
    const error = ref(null);
    const user = ref(AuthService.getUser());

    const isAuthenticated = computed(() => {
        return AuthService.isAuthenticated() && user.value !== null;
    });

    const login = async (credentials) => {
        loading.value = true;
        error.value = null;

        try {
            const result = await AuthService.login(credentials);

            if (result.success) {
                user.value = result.data.user;
                router.push({ name: 'home' });
                return { success: true };
            } else {
                error.value = result.message || 'Login failed';
                return { success: false, error: result };
            }
        } catch (err) {
            error.value = 'An unexpected error occurred';
            return { success: false, error: err };
        } finally {
            loading.value = false;
        }
    };

    const register = async (userData) => {
        loading.value = true;
        error.value = null;

        try {
            const result = await AuthService.register(userData);

            if (result.success) {
                user.value = result.data.user;
                router.push({ name: 'home' });
                return { success: true };
            } else {
                error.value = result.message || 'Registration failed';
                return { success: false, error: result };
            }
        } catch (err) {
            error.value = 'An unexpected error occurred';
            return { success: false, error: err };
        } finally {
            loading.value = false;
        }
    };

    const logout = async () => {
        loading.value = true;
        console.log('Logout initiated...');
        try {
            // Call API to revoke token
            await AuthService.logout();
            console.log('AuthService.logout() completed - token and user cleared from localStorage');
        } catch (err) {
            console.error('Logout API error:', err);
            // Even if API fails, we still want to clear local data
            AuthService.removeToken();
            AuthService.removeUser();
        } finally {
            // Always clear user state and redirect
            user.value = null;
            loading.value = false;
            console.log('User state cleared, navigating to login page...');

            // Use replace instead of push to prevent going back to protected route
            await router.replace({ name: 'login' });
            console.log('Navigation to login completed');
        }
    };

    const forgotPassword = async (email) => {
        loading.value = true;
        error.value = null;

        try {
            const result = await AuthService.forgotPassword(email);
            return result;
        } catch (err) {
            error.value = 'An unexpected error occurred';
            return { success: false, message: 'Failed to send reset link' };
        } finally {
            loading.value = false;
        }
    };

    const resetPassword = async (data) => {
        loading.value = true;
        error.value = null;

        try {
            const result = await AuthService.resetPassword(data);
            return result;
        } catch (err) {
            error.value = 'An unexpected error occurred';
            return { success: false, message: 'Password reset failed' };
        } finally {
            loading.value = false;
        }
    };

    const checkAuth = async () => {
        if (AuthService.isAuthenticated()) {
            const result = await AuthService.getCurrentUser();
            if (result.success) {
                user.value = result.user;
                return true;
            } else {
                AuthService.logout();
                return false;
            }
        }
        return false;
    };

    return {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        checkAuth,
    };
}

