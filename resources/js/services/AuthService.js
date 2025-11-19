import axios from 'axios';

const API_BASE_URL = '/api';

class AuthService {
    constructor() {
        this.setupInterceptors();
    }

    setupInterceptors() {
        // Request interceptor - Add token to headers
        axios.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor - Handle 401 errors
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    this.logout();
                    // Use window.location for full page reload after logout
                    window.location.href = '/admin/login';
                }
                return Promise.reject(error);
            }
        );
    }

    // Token Management
    getToken() {
        return localStorage.getItem('admin_token');
    }

    setToken(token) {
        localStorage.setItem('admin_token', token);
    }

    removeToken() {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    }

    // User Management
    getUser() {
        const user = localStorage.getItem('admin_user');
        return user ? JSON.parse(user) : null;
    }

    setUser(user) {
        localStorage.setItem('admin_user', JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem('admin_user');
    }

    // Auth Methods
    async login(credentials) {
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/auth/login`, credentials);
            
            if (response.data.success) {
                this.setToken(response.data.data.token);
                this.setUser(response.data.data.user);
                return {
                    success: true,
                    data: response.data.data,
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Login failed',
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed',
                errors: error.response?.data?.errors || {},
            };
        }
    }

    async register(userData) {
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/auth/register`, userData);
            
            if (response.data.success) {
                this.setToken(response.data.data.token);
                this.setUser(response.data.data.user);
                return {
                    success: true,
                    data: response.data.data,
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Registration failed',
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed',
                errors: error.response?.data?.errors || {},
            };
        }
    }

    async logout() {
        try {
            await axios.post(`${API_BASE_URL}/admin/logout`);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.removeToken();
            this.removeUser();
        }
    }

    async forgotPassword(email) {
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/auth/forgot-password`, { email });
            return {
                success: response.data.success,
                message: response.data.message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to send reset link',
                errors: error.response?.data?.errors || {},
            };
        }
    }

    async resetPassword(data) {
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/auth/reset-password`, data);
            return {
                success: response.data.success,
                message: response.data.message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Password reset failed',
                errors: error.response?.data?.errors || {},
            };
        }
    }

    async getCurrentUser() {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/user`);
            if (response.data.success) {
                this.setUser(response.data.data.user);
                return {
                    success: true,
                    user: response.data.data.user,
                };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}

export default new AuthService();

