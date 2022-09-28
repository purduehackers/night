/** @type {import('tailwindcss').Config} */

const { transitionProperty } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      main: '"Space Grotesk", system-ui, Roboto, sans-serif',
      sans: '"Inter", sans-serif',
      mono: '"IBM Plex Mono"'
    },
    extend: {
      colors: {
        blue: {
          discord: '#807cfc',
          'discord-light': '#9b98fa'
        },
        amber: {
          450: '#F8AF18',
          550: '#E78B09'
        },
        'gray-nav': 'rgba(243, 244, 246, 0.75)',
        'gray-nav-dark': 'rgba(31, 41, 55, 0.75)'
      },
      screens: {
        xs: '375px'
      },
      transitionProperty: {
        border: 'border-style',
        width: 'width'
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      }
    }
  },
  variants: {
    extend: {
      borderStyle: ['hover']
    }
  }
}
