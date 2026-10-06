import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3665F3',
        secondary: '#F5AF02',
        accent: '#E53238',
        support: '#3665F3',
        escalation: '#10B981',
        analytics: '#8B5CF6',
      },
    },
  },
  plugins: [],
}
export default config
