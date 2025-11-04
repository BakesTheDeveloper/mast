/**
 * @file colors.ts
 * @description Color constants and typography definitions for the app
 */

export const Colors = {
  primary: '#1A535C', // Deep Teal
  background: '#F0F2F5', // Light Grey
  text: '#333333', // Dark Grey
  lightText: '#666666', // Medium Grey
  white: '#FFFFFF',
  accent: '#FF6B6B', // Muted Coral for accents
};

export const Typography = {
  header: {
    fontFamily: 'System', // Use system font for now, can be replaced with custom font
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  body: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: 'normal' as const,
    color: Colors.text,
  },
};
