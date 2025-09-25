// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: set base to '/<repo-name>/' for a project page
// e.g. '/chemlab-quiz-safety-rules/' for https://<user>.github.io/chemlab-quiz-safety-rules/
export default defineConfig({
  base: '/chemlab-quiz-safety-rules/',
  plugins: [react()],
})
