import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',

  theme: {
    extend: {
      keyframes: {
        spin: {
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      tokens: {
        colors: {
          bg: {
            page: { value: '#F4F6F8' },
          },
          text: {
            base: { value: '#121619' },
            sub: { value: '#697077' },
            dashboard: {
              secondary: { value: '#374151' },
              sub: { value: '#6B7280' },
            },
          },
          button: {
            primary: { value: '#3182F7' },
            pressed: { value: '#1462D3' },
            disabled: { value: '#E7EDF3' },
            gray: { value: '#697077' },
            text: {
              primary: { value: '#FFFFFF' },
              pressed: { value: '#99BEF5' },
              disabled: { value: '#B3BFCE' },
              gray: { value: '#FFFFFF' },
            },
          },
        },
      },
    },
  },
});
