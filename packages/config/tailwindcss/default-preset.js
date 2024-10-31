export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@yeong/ui/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#5ae9e4',
        black: '#111111',
        gray: '#d3d3d3',
        'dark-gray': '#898989',
      },
      fontSize: {
        sm: '12px',
        md: '14px',
        base: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
  },
  plugins: [],
}
