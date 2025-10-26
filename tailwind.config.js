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
        // colors: {
        //   'primary': '#FF6347', // Tomato color
        //   'secondary': '#4682B4', // Steel Blue
        //   'accent': '#3CB371', // Medium Sea Green
        // },
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