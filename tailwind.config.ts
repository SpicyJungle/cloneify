/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'cards': 'repeat(auto-fill, minmax(170px, 1fr))',
      },
      colors: {
        'recentlyPlayed': 'rgba(255,255,255,0.1)',
        'recentlyPlayedHover': 'rgba(255,255,255,0.2)',
        'spotifyGreen': '#1DB954',
        'grayText': "rgb(179, 179, 179)"
      }
    },
  },
  plugins: [],
};
