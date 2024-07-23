import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Caveat } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import theme from "./theme";
import { ThemeProvider } from '@mui/material/styles';
import "./globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar/Navbar";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Unstudio",
  description: "Unstudio AI app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
      <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
      <Navbar/>
        {children}
      </ThemeProvider>
      </AppRouterCacheProvider>
      </Providers>
        </body>
    </html>
  );
}
