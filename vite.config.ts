import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves a project site from a subpath:
//   https://mdiepwr.github.io/tableau-day-2026-website/
// so the production build must prefix every asset URL with that repo path, or
// the fingerprinted /assets/* links resolve against the domain root and 404.
// Dev (`vite`) is unaffected — base only rewrites built URLs. If the repo is
// ever renamed, or moved to a user/org site (mdiepwr.github.io), update this.
const base = '/tableau-day-2026-website/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
