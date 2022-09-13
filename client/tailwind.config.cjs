/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        fontFamily: {
            'heading': ['Montserrat', 'sans-serif'],
        },
        extend: {
            colors: {
                'primary': '#E35A44',
              },
              backgroundColor: {
                'primary': '#E35A44',
                'half-transparent': 'rgba(0, 0, 0, 0.5)',
              },
              textColor: {
                'primary': '#E35A44',
              },
              width: {
                100: '100px',
                150: '150px',
                200: '200px',
                250: '250px',
                300: '300px',
                400: '400px',
                500: '500px',
                600: '600px',
              },
              height: {
                100: '100px',
                150: '150px',
                200: '200px',
                300: '300px',
                400: '400px',
                450: '450px',
                500: '500px',
                600: '600px',
                700: '700px',
                800: '800px',
              },
              borderColor: {
                'primary': '#E35A44',
              },
        }
    },
    plugins: []
}