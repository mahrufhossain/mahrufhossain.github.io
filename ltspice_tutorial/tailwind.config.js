// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This tells Tailwind to look for the 'dark' class on the HTML tag
  content: [
    "./*.html", // Make sure this points to all your HTML files
  ],
  theme: {
    extend: {
      colors: {
        // Map your CSS variables to Tailwind's default color names
        // This makes Tailwind utility classes (like text-gray-700)
        // use your defined CSS variables.
        gray: {
          '100': 'var(--color-bg-body-light)', // For light mode body background if you want to explicitly map
          '200': 'var(--color-border-light)', // For light mode border if you want to explicitly map
          '700': 'var(--color-text-secondary-light)', // Your light mode gray-700
          '800': 'var(--color-bg-primary-dark)', // Your dark mode primary background
          '900': 'var(--color-text-primary-light)', // Your light mode gray-900
        },
        teal: {
          '600': 'var(--color-accent-light)', // Your light mode teal-600
          '700': 'var(--color-accent-hover-light)', // Your light mode teal-700
          '800': 'var(--color-tag-bg-default-dark)', // Your dark mode tag background (if you use this for dark tags)
          '900': 'var(--color-accent-dark-hover)', // A darker teal for hover in dark mode
        },
        // You can add more mappings here for other colors you use often
        // Example for dark mode specific colors if not already mapped by 'gray' or 'teal':
        'dark-bg-body': 'var(--color-bg-body-dark)',
        'dark-text-primary': 'var(--color-text-primary-dark)',
        // ... and so on for other variables like --color-bg-primary-dark, etc.
      },
    },
  },
  plugins: [],
}