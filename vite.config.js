import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from "vite-plugin-mkcert";
import pluginRewriteAll from 'vite-plugin-rewrite-all'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    host: "web.devlab.com",
  },
  plugins: [react(), mkcert(), pluginRewriteAll()],
});
