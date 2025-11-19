import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/admin.js',
                'resources/js/customer.js',
            ],
            refresh: true,
        }),
        tailwindcss(),
        vue({
            // Only process .vue files, not .js files
            include: ['resources/**/*.vue'],
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                // Separate chunks for admin and customer
                manualChunks: (id) => {
                    // Separate Vue.js into its own chunk for admin
                    if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) {
                        return 'vue-vendor';
                    }
                    if (id.includes('node_modules/vue-router')) {
                        return 'vue-router';
                    }
                },
            },
        },
    },
});
