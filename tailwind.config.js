/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gruvbox color palette
        gruvbox: {
          dark: {
            bg: '#282828',
            bg0: '#1d2021',
            bg1: '#3c3836',
            bg2: '#504945',
            bg3: '#665c54',
            bg4: '#7c6f64',
            fg: '#ebdbb2',
            fg0: '#fbf1c7',
            fg1: '#ebdbb2',
            fg2: '#d5c4a1',
            fg3: '#bdae93',
            fg4: '#a89984',
          },
          light: {
            red: '#cc241d',
            green: '#98971a',
            yellow: '#d79921',
            blue: '#458588',
            purple: '#b16286',
            aqua: '#689d6a',
            gray: '#a89984',
            orange: '#d65d0e',
          },
          bright: {
            red: '#fb4934',
            green: '#b8bb26',
            yellow: '#fabd2f',
            blue: '#83a598',
            purple: '#d3869b',
            aqua: '#8ec07c',
            gray: '#928374',
            orange: '#fe8019',
          }
        }
      },
      fontFamily: {
        mono: ['Source Code Pro', 'monospace'],
        code: ['Source Code Pro', 'monospace'],
      },
      backgroundImage: {
        'mystical-gradient': 'linear-gradient(135deg, #30323d 0%, #4d5061 25%, #5c80bc 50%, #cdd1c4 75%, #e8c547 100%)',
        'card-gradient': 'linear-gradient(145deg, #4d5061 0%, #30323d 100%)',
        'header-gradient': 'linear-gradient(90deg, #30323d 0%, #4d5061 50%, #5c80bc 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #e8c547, 0 0 10px #e8c547, 0 0 15px #e8c547' },
          '100%': { boxShadow: '0 0 10px #e8c547, 0 0 20px #e8c547, 0 0 30px #e8c547' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
