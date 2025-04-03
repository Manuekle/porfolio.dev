/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', '*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        entan: '#D05A39', // Entan Iro (鉛丹色)
        kurotobi: '#322B26', // Kurotobi (黒鳶)
        kurenai: '#9F0D27', // Kurenai (紅)
        shironeri: '#F8F4E6', // Shironeri (白練)
        chigusa: '#A8C0A5', // Chigusa Nezu (千草鼠)
        'vintage-red': '#d12128',
        'vintage-blue': '#01344f',
        'vintage-cream': '#fae3ac',
      },
      fontFamily: {
        display: ['Besten', 'sans-serif'],
        primary: ['Nukami', 'sans-serif'],
        fallback: [
          'system-ui',
          '-apple-system',
          'blinkmacsystemfont',
          'Segoe UI',
          'Noto Sans',
          'helvetica',
          'arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
        ],
      },
    },
  },
  plugins: [],
}
