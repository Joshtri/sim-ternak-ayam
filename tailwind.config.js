import { heroui } from '@heroui/react';

// ============================================
// 🎨 COLOR VARIABLES - Poultry Farm Theme
// ============================================
// Tema warna untuk Sistem Manajemen Ternak Ayam Broiler
// Format: HSL (Hue, Saturation, Lightness)
// Palet warna: Orange (ayam/telur), Brown (pakan/kandang), Green (sehat/organik)

const colors = {
  // Primary Color - Orange (Warna ayam & telur yang hangat)
  primary: {
    light: '25 95% 53%',         // #ff6b1a - Orange terang untuk light mode
    lightForeground: '0 0% 100%', // White text on orange button
    dark: '33 100% 60%',         // #ff9933 - Orange cerah untuk dark mode
    darkForeground: '20 14% 8%', // Dark text on bright orange button
  },

  // Secondary Color - Brown (Warna natural peternakan)
  secondary: {
    light: '30 67% 44%',         // #b8792e - Brown untuk light mode
    lightForeground: '0 0% 100%', // White text on brown button
    dark: '36 60% 50%',          // #cc9952 - Lighter brown untuk dark mode
    darkForeground: '20 14% 8%',  // Dark text on bright brown button
  },

  // Success Color - Green (Kesehatan & produktivitas)
  success: {
    light: '142 71% 45%',        // #22c55e - Green-500 untuk light mode
    lightForeground: '0 0% 100%', // White text on green button
    dark: '142 76% 55%',         // #34d666 - Lighter green untuk dark mode
    darkForeground: '142 90% 10%', // Dark text on bright green button
  },

  // Warning Color - Amber (Perhatian/Alert)
  warning: {
    light: '38 92% 50%',         // #f59e0b - Amber-500 untuk light mode
    lightForeground: '20 14% 8%', // Dark text on amber (better contrast)
    dark: '43 96% 56%',          // #fbbf24 - Yellow-400 untuk dark mode
    darkForeground: '20 14% 8%',  // Dark text on bright yellow button
  },

  // Danger Color - Red (Error/Bahaya)
  danger: {
    light: '0 72% 51%',          // #dc2626 - Red-600 untuk light mode
    lightForeground: '0 0% 100%', // White text on red button
    dark: '0 91% 71%',           // #fca5a5 - Red-300 untuk dark mode
    darkForeground: '0 80% 10%',  // Dark text on bright red button
  },

  // Info Color - Blue (Informasi)
  info: {
    light: '199 89% 48%',        // #0ea5e9 - Sky-500 untuk light mode
    lightForeground: '0 0% 100%', // White text on blue button
    dark: '199 89% 60%',         // Lighter blue untuk dark mode
    darkForeground: '199 90% 10%', // Dark text on bright blue button
  },

  // Background Colors
  background: {
    light: '36 33% 97%',         // #faf8f5 - Warm white (cream)
    dark: '20 14% 8%',           // #141210 - Dark brown-gray
  },

  // Content/Card Background
  content: {
    light: '0 0% 100%',          // #ffffff - Pure white untuk cards
    dark: '24 10% 12%',          // #1f1c19 - Dark brown
  },

  // Focus Ring Color - Orange (konsisten dengan primary)
  focus: {
    light: '25 95% 53%',         // Orange
    dark: '33 100% 60%',         // Lighter orange untuk dark mode
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ============================================
      // 🪟 GLASSMORPHISM UTILITIES
      // ============================================
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      backgroundColor: {
        // Glass backgrounds dengan alpha (transparency)
        'glass-light': 'rgba(255, 255, 255, 0.7)',      // White dengan 70% opacity
        'glass-light-sm': 'rgba(255, 255, 255, 0.5)',   // White dengan 50% opacity
        'glass-light-md': 'rgba(255, 255, 255, 0.6)',   // White dengan 60% opacity
        'glass-light-lg': 'rgba(255, 255, 255, 0.8)',   // White dengan 80% opacity
        'glass-dark': 'rgba(20, 18, 16, 0.7)',          // Dark brown dengan 70% opacity
        'glass-dark-sm': 'rgba(20, 18, 16, 0.5)',       // Dark brown dengan 50% opacity
        'glass-dark-md': 'rgba(20, 18, 16, 0.6)',       // Dark brown dengan 60% opacity
        'glass-dark-lg': 'rgba(20, 18, 16, 0.8)',       // Dark brown dengan 80% opacity
      },
      boxShadow: {
        // Glass shadow effects
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.1)',
        'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.2)',
        'glass-xl': '0 16px 64px 0 rgba(31, 38, 135, 0.25)',
      },
      borderColor: {
        // Glass borders dengan alpha
        'glass-light': 'rgba(255, 255, 255, 0.18)',
        'glass-dark': 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            // Primary - Orange (warm, chicken/egg color)
            primary: {
              DEFAULT: `hsl(${colors.primary.light})`,
              foreground: `hsl(${colors.primary.lightForeground})`,
            },
            // Secondary - Brown (natural, farm color)
            secondary: {
              DEFAULT: `hsl(${colors.secondary.light})`,
              foreground: `hsl(${colors.secondary.lightForeground})`,
            },
            // Success - Green (health, productivity)
            success: {
              DEFAULT: `hsl(${colors.success.light})`,
              foreground: `hsl(${colors.success.lightForeground})`,
            },
            // Warning - Amber (alert, attention)
            warning: {
              DEFAULT: `hsl(${colors.warning.light})`,
              foreground: `hsl(${colors.warning.lightForeground})`,
            },
            // Danger - Red (error, danger)
            danger: {
              DEFAULT: `hsl(${colors.danger.light})`,
              foreground: `hsl(${colors.danger.lightForeground})`,
            },
            // Info - Blue (information)
            info: {
              DEFAULT: `hsl(${colors.info.light})`,
              foreground: `hsl(${colors.info.lightForeground})`,
            },
            // Background - Warm cream color
            background: `hsl(${colors.background.light})`,
            foreground: 'hsl(20 14% 8%)', // Dark brown text - MAIN TEXT COLOR
            // Content cards - Pure white
            content1: `hsl(${colors.content.light})`,
            content2: 'hsl(36 33% 96%)', // Lighter cream
            content3: 'hsl(36 33% 94%)',
            content4: 'hsl(36 33% 92%)',
            // Focus ring
            focus: `hsl(${colors.focus.light})`,
            // Default color
            default: {
              DEFAULT: 'hsl(240 6% 90%)',
              foreground: 'hsl(240 4% 16%)', // Dark text
            },
            // Divider color for light mode
            divider: 'hsl(240 5% 84%)',
          },
        },
        dark: {
          colors: {
            // Primary - Brighter orange for dark mode visibility
            primary: {
              DEFAULT: `hsl(${colors.primary.dark})`,
              foreground: `hsl(${colors.primary.darkForeground})`,
            },
            // Secondary - Lighter brown for dark mode
            secondary: {
              DEFAULT: `hsl(${colors.secondary.dark})`,
              foreground: `hsl(${colors.secondary.darkForeground})`,
            },
            // Success - Lighter green for contrast
            success: {
              DEFAULT: `hsl(${colors.success.dark})`,
              foreground: `hsl(${colors.success.darkForeground})`,
            },
            // Warning - Lighter amber/yellow for visibility
            warning: {
              DEFAULT: `hsl(${colors.warning.dark})`,
              foreground: `hsl(${colors.warning.darkForeground})`,
            },
            // Danger - Softer red for dark mode
            danger: {
              DEFAULT: `hsl(${colors.danger.dark})`,
              foreground: `hsl(${colors.danger.darkForeground})`,
            },
            // Info - Lighter blue for contrast
            info: {
              DEFAULT: `hsl(${colors.info.dark})`,
              foreground: `hsl(${colors.info.darkForeground})`,
            },
            // Background - Dark brown-gray
            background: `hsl(${colors.background.dark})`,
            foreground: 'hsl(36 33% 95%)', // Warm white text - MAIN TEXT COLOR
            // Content cards - Slightly lighter than background
            content1: `hsl(${colors.content.dark})`,
            content2: 'hsl(24 10% 14%)',
            content3: 'hsl(24 10% 16%)',
            content4: 'hsl(24 10% 18%)',
            // Focus ring - Brighter for dark mode
            focus: `hsl(${colors.focus.dark})`,
            // Default color
            default: {
              DEFAULT: 'hsl(240 4% 16%)',
              foreground: 'hsl(240 5% 96%)', // Light gray text
            },
            // Divider color for dark mode
            divider: 'hsl(24 10% 20%)',
          },
        },
      },
    }),
  ],
};
