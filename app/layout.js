'use client';

import { Inter as CustomFont } from 'next/font/google';
import '../src/assets/styles/base.css';
import { Provider } from 'react-redux';
import store from '@/src/redux/store';

const customFont = CustomFont({
  subsets: ['latin'],
  variable: '--font-custom',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`motion-safe:scroll-smooth 2xl:text-[24px] ${customFont.variable} font-sans`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white tracking-tight  antialiased  dark:text-black-300">
        <Provider store={store}> {children}</Provider>
      </body>
    </html>
  );
}
