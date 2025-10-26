/** @type {import('tailwindcss').Config} */
module.exports = {
    // Configure the files where Tailwind should look for class names
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}', // For Next.js App Router
      './src/**/*.{js,ts,jsx,tsx}', // If you are using a 'src' directory
      // Add any other directories or file types where you use Tailwind classes
    ],
    theme: {
      // Extend Tailwind's default theme to add custom styles
      extend: {
        // Example: Custom colors
        colors: {
          'purple-50': 'EAE3F2',
          'purple-100': '#D5C8E4',
          'purple-200': '#C0ACD7',
          'purple-300': '#AB91CA',
          'purple-400': '#9575BD',
          'purple-500': '#7851A8',
          'purple-600': '#6C4997',
          'purple-700': '#593C7C',
          'purple-800': '#452E60',
          'purple-900': '#322145',
          'orange-50': '#FFE6C2',
          'orange-100': '#FFD599',
          'orange-200': '#FFC370',
          'orange-300': '#FFB346',
          'orange-400': '#FFA21F',
          'orange-500': '#F58F00',
          'orange-600': '#CC7700',
          'orange-700': '#A35F00',
          'orange-800': '#7A4700',
          'orange-900': '#523000',
          'blue-50': '#EEF8FC',
          'blue-100': '#CCEBF5',
          'blue-200': '#B2E2F0',
          'blue-300': '#99D8EB',
          'blue-400': '#77CBE4',
          'blue-500': '#55BDDD',
          'blue-600': '#33B0D7',
          'blue-700': '#2598BB',
          'blue-800': '#1B6F88',
          'blue-900': '#145366',
        },
        // Example: Custom font families
        // fontFamily: {
        //   'sans': ['Roboto', 'sans-serif'],
        //   'serif': ['Merriweather', 'serif'],
        // },
        // Example: Custom spacing values
        // spacing: {
        //   '128': '32rem',
        //   '144': '36rem',
        // },
        // Example: Custom breakpoints
        // screens: {
        //   'tablet': '640px',
        //   'laptop': '1024px',
        //   'desktop': '1280px',
        // },
      },
    },
    // Add any Tailwind CSS plugins here
    plugins: [
      // require('@tailwindcss/typography'), // Example: Tailwind Typography plugin
    ],
  };