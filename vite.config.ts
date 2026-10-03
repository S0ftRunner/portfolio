import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isUserPage = repositoryName?.endsWith('.github.io')

export default defineConfig({
  plugins: [react()],
  base:
    process.env.GITHUB_ACTIONS && repositoryName && !isUserPage
      ? `/${repositoryName}/`
      : '/',
})
