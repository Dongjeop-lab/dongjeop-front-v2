import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',

  theme: {
    extend: {
      tokens: {
        colors: {
          button: {
            primary: { value: '#3182F7' },
            pressed: { value: '#1462D3' },
            disabled: { value: '#E7EDF3' },
            text: {
              primary: { value: '#FFFFFF' },
              pressed: { value: '#99BEF5' },
              disabled: { value: '#B3BFCE' },
            },
          },
        },
        fonts: {
          body: { value: 'Pretendard, ui-sans-serif, system-ui, sans-serif' },
        },
      },
    },
  },

  globalCss: {
    body: {
      fontFamily: 'Pretendard, ui-sans-serif, system-ui, sans-serif',
    },
  },
});
