/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        alexandria: {
          background: '#FFFFFF',
          foreground: '#171717',
          muted: '#F5F5F5',
          'muted-foreground': '#737373',
          border: '#000000',
          primary: '#000000',
          'primary-foreground': '#FFFFFF',
          secondary: '#F5F5F5',
          'secondary-foreground': '#171717',
          accent: '#F5F5F5',
          'accent-foreground': '#171717',
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        serif: ["Times New Roman", "serif"], // Ensuring serif font for Alexandria
        'pp-editorial-new': ["var(--font-pp-editorial-new)"], // PP Editorial New font
        'tt-hoves': ["var(--font-tt-hoves-pro-trial)"], // TT Hoves Pro Trial font
      },
      spacing: {
        '0.25': '0.0625rem', // For ultra-fine adjustments
        '0.75': '0.1875rem', // For ultra-fine adjustments
      },
      fontSize: {
        // Semantic sizes for Alexandria typography
        'alexandria-small': '4rem',
        'alexandria-medium': '7.25rem',
        'alexandria-large': '8rem',
        // Standard sizes
        '2.5xl': '1.6875rem',
        '4.5xl': '2.6875rem',
        // Semantic typography variants
        'heading-1': '3rem',
        'heading-2': '2.25rem',
        'heading-3': '1.875rem',
        'heading-4': '1.5rem',
        'body-large': '1.125rem',
        'body-normal': '1rem',
        'body-small': '0.875rem',
        'caption': '0.75rem',
      },
      lineHeight: {
        'extra-tight': '1.1',
        'normal': '1.5',
        'relaxed': '1.625',
      },
      borderRadius: {
        'xs': '0.125rem', // For smaller rounded corners
      },
    },
  },
  plugins: [],
}; 