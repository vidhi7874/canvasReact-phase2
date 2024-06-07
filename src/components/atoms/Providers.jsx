"use client";

import { ThemeProvider } from "next-themes";

const Providers = ({ children }) => (
  <ThemeProvider
    defaultTheme="dark"
    attribute="class"
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
);

export default Providers;
