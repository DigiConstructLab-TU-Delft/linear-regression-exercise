import { defineConfig } from 'vite'

// Work around a current Lightning CSS parse error in Slidev's generated utility CSS.
export default defineConfig({
  build: {
    cssMinify: false,
  },
})
