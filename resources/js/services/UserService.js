import axios from 'axios';

const API_BASE_URL = '/api';

class UserService {
    async getUsers(params = {}) {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/users`, {
                params: {
                    page: params.page || 1,
                    per_page: params.perPage || 10,
                    search: params.search || '',
                    role: params.role || 'all',
                }
            });
            return {
                success: true,
                data: response.data.data,
                pagination: response.data.pagination,
                stats: response.data.stats,
            };
        } catch (error) {
            console.error('Error fetching users:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch users',
            };
        }
    }
}

export default new UserService();
