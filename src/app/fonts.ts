import { NextFont } from 'next/dist/compiled/@next/font';
import localFont from 'next/font/local';

// Load PP Editorial New font
export const ppEditorialNew = localFont({
  src: [
    {
      path: './fonts/PP-Editorial-New-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    // Add additional weights/styles as needed
  ],
  variable: '--font-pp-editorial-new',
  display: 'swap',
});

// Load TT Hoves Pro Trial fonts
export const ttHovesProTrial = localFont({
  src: [
    {
      path: './fonts/TT Hoves Pro Trial Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/TT Hoves Pro Trial Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/TT Hoves Pro Trial Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-tt-hoves-pro-trial',
  display: 'swap',
}); 