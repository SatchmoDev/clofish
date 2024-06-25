import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        background: "var(--background)",
      },
    },
  },
}

export default config
