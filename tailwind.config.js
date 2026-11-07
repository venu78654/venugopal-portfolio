/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0D1117',
        ink2: '#0A0E14',
        navy: '#1A365D',
        slate2: '#2D3748',
        line: 'rgba(148,163,184,0.14)',
        fg: '#F1F5F9',
        muted: '#AEB9C9',
        blue: { DEFAULT: '#3B82F6', bright: '#60A5FA' },
        cyan: { DEFAULT: '#22D3EE', soft: '#67E8F9' },
      },
      fontFamily: {
        hand: ['var(--font-hand)', 'cursive'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
}
