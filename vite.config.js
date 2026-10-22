
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // Split Swiper into a separate chunk
                        if (id.includes('swiper')) {
                            return 'swiper';
                        }
                        return;
                    }
                }
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: [
                    "mixed-decls",
                    "color-functions",
                    "global-builtin",
                    "import"
                ],
            },
        },
    },
})
