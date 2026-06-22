import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // If you deploy to GitHub Pages as a *project* site (username.github.io/repo-name),
  // change base to '/repo-name/'. For a user/org site or Netlify/Vercel, leave it as '/'.
  base: '/',
  plugins: [react(), tailwindcss()],
})
