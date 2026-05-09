/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F6FE',
          100: '#BAE6FD',
          200: '#6EC8F5',
          300: '#3BA8E8',
          400: '#1B7FD4',
          500: '#0F5EA8',
          600: '#072A56',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand': 'linear-gradient(135deg, #072A56 0%, #1B7FD4 50%, #6EC8F5 100%)',
        'hero-grad': 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 38%, #BAE6FD 68%, #F0F9FF 100%)',
      },
      animation: {
        'ticker': 'ticker-scroll 32s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease both',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        'ticker-scroll': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'float': { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        'pulse-glow': { '0%,100%': { boxShadow: '0 0 20px rgba(110,200,245,0.4)' }, '50%': { boxShadow: '0 0 40px rgba(110,200,245,0.8), 0 0 60px rgba(27,127,212,0.4)' } },
        'gradient-shift': { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      boxShadow: {
        'glow': '0 0 40px rgba(27,127,212,0.2)',
        'glow-lg': '0 0 60px rgba(27,127,212,0.3)',
        'card': '0 4px 24px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.4)',
      }
    },
  },
  plugins: [],
}
