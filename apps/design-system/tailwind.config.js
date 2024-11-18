/** @type {import('tailwindcss').Config} */
import defaultPreset from '@yeong/config/tailwindcss/default-preset.js';

export default {
  presets: [defaultPreset],
  content: [
    './node_modules/@yeong/ui/**/*.{js,jsx,ts,tsx}',
    './src/stories/**/*.{js,jsx,ts,tsx}',
  ],
};
