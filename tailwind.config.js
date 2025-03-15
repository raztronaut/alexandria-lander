/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '0.5rem',
  			sm: '0.75rem',
  			md: '1rem',
  			lg: '1.25rem',
  			xl: '1.5rem',
  			'2xl': '2rem'
  		}
  	},
  	screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
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
  				'accent-foreground': '#171717'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)'
  			],
  			mono: [
  				'var(--font-geist-mono)'
  			],
  			serif: [
  				'Times New Roman',
  				'serif'
  			],
  			'pp-editorial-new': [
  				'var(--font-pp-editorial-new)'
  			],
  			'tt-hoves': [
  				'var(--font-tt-hoves-pro-trial)'
  			]
  		},
  		spacing: {
  			'0.25': '0.0625rem',
  			'0.75': '0.1875rem'
  		},
  		fontSize: {
  			'alexandria-small': '4rem',
  			'alexandria-medium': '6rem',
  			'alexandria-large': '11rem',
  			'2.5xl': '1.6875rem',
  			'4.5xl': '2.6875rem',
  			'heading-1': '3rem',
  			'heading-2': '2.25rem',
  			'heading-3': '1.875rem',
  			'heading-4': '1.5rem',
  			'body-large': '1.125rem',
  			'body-normal': '1rem',
  			'body-small': '0.875rem',
  			caption: '0.75rem'
  		},
  		lineHeight: {
  			'extra-tight': '1.5',
  			normal: '1',
  			relaxed: '1.625'
  		},
  		borderRadius: {
  			xs: '0.125rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}; 