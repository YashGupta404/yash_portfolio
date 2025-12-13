import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        cinema: ['Playfair Display', 'serif'],
        film: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        velvet: {
          DEFAULT: "hsl(var(--velvet))",
          dark: "hsl(var(--velvet-dark))",
          light: "hsl(var(--velvet-light))",
        },
        projector: "hsl(var(--projector-light))",
        film: {
          sepia: "hsl(var(--film-sepia))",
          cream: "hsl(var(--film-cream))",
        },
        theater: {
          gold: "hsl(var(--theater-gold))",
        },
        screen: {
          glow: "hsl(var(--screen-glow))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "curtain-wave": {
          "0%, 100%": { transform: "scaleX(1) skewY(0deg)" },
          "25%": { transform: "scaleX(1.01) skewY(0.3deg)" },
          "50%": { transform: "scaleX(0.99) skewY(-0.2deg)" },
          "75%": { transform: "scaleX(1.005) skewY(0.1deg)" },
        },
        "dust-float": {
          "0%": { transform: "translateY(100vh) translateX(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.6" },
          "100%": { transform: "translateY(-10vh) translateX(50px) rotate(360deg)", opacity: "0" },
        },
        "projector-beam": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "0.8" },
        },
        "film-scratch": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "countdown-pulse": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        "reel-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-out": "fade-out 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out",
        "curtain-wave": "curtain-wave 4s ease-in-out infinite",
        "dust-float": "dust-float 15s linear infinite",
        "projector-beam": "projector-beam 2s ease-in-out infinite",
        "film-scratch": "film-scratch 0.3s linear infinite",
        "countdown-pulse": "countdown-pulse 1s ease-out forwards",
        "reel-spin": "reel-spin 2s linear infinite",
      },
      backgroundImage: {
        'velvet-gradient': 'linear-gradient(135deg, hsl(0, 70%, 25%) 0%, hsl(0, 65%, 18%) 50%, hsl(0, 60%, 12%) 100%)',
        'gold-gradient': 'linear-gradient(135deg, hsl(45, 90%, 60%) 0%, hsl(40, 80%, 45%) 100%)',
        'film-gradient': 'linear-gradient(180deg, hsl(40, 30%, 90%) 0%, hsl(35, 25%, 80%) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
