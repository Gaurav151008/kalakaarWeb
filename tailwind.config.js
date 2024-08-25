/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{html,ejs}',  // Include all HTML and EJS files in the 'views' directory
    './public/**/*.js',         // Include all JS files in the 'public' directory
    './*.js'                    // Include all JS files in the root directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
