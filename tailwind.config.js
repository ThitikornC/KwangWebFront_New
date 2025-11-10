/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
      animation: {
        typing: "typing 3s steps(20) infinite alternate, blink .7s infinite",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        thai: ["Kanit", 'sans-serif'],
      },
      fontSize: {
        'h1': '2.25rem', // 36px
        'h2': '1.875rem', // 30px
        'h3': '1.5rem', // 24px
        'h4': '1.25rem', // 20px
        'h5': '1rem', // 16px
        'h6': '0.875rem', // 14px
        // Computer
        'special':'6rem',
        'title': '4rem' , // 64px
        'header':'2.5rem', // 40px
        'topic':'1.5rem', // 24px
        'detail':'1rem',  // 16px

      },
    },
    colors:{
      //american red cross style
      white:'#FFFFFF',
      reddeep:'#7F181B',
      redlight:'#ED1B2E',
      black:'#000000',
      graydeep:'#6D6E70',
      gray:'#9F9FA3',
      graylight:'#D7D7D8',
      bluedeep:'#004B79',
      bluesea:'#0091CD',
      bluesky:'#56A0D3',
      bluelight:'#C4DFF6',
      yellowold:'#ECB731',
      yellowoldlight:'#B4A996',
      greentea:'#537B35',
      greenlight:'#8EC06C',
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

