const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',

  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
    './node_modules/flowbite/**/*.js'
  ],

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('flowbite/plugin')
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6f9fc',
          100: '#e9f3fb',
          200: '#c4dbf7',
          300: '#9dc3f3',
          400: '#5391ec',
          500: '#097fea',
          600: '#0868c8',
          700: '#075299',
          800: '#063b6a',
          900: '#052f54'
        },
        secondary: {
          50: '#f4f8f9',
          100: '#e9f0f2',
          200: '#c9dce3',
          300: '#a8c8d5',
          400: '#659fad',
          500: '#216784',
          600: '#1e5b75',
          700: '#1a4e62',
          800: '#16404f',
          900: '#12363f'
        },
        accent: {
          50: '#fdfbfa',
          100: '#fbf0e9',
          200: '#f6d2c6',
          300: '#f0b4a3',
          400: '#e6785b',
          500: '#db3c14',
          600: '#c33712',
          700: '#a62d10',
          800: '#87230d',
          900: '#6f1b0b'
        },
        neutral: {
          50: '#f9f9f9',
          100: '#f2f2f2',
          200: '#d9d9d9',
          300: '#bfbfbf',
          400: '#8c8c8c',
          500: '#595959',
          600: '#525252',
          700: '#454545',
          800: '#383838',
          900: '#2e2e2e'
        }
      }
    },
    fontFamily: {
      body: [
        'Raleway',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      sans: [
        'Raleway',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  }
}

// tailwind.config.js
