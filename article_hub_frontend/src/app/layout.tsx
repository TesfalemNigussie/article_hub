import { Inter, Kumbh_Sans } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from "@/hooks/auth.hook";
import { ToastContainer } from 'react-toastify';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const kumbh = Kumbh_Sans({
  subsets: ['latin'],
  variable: '--font-kumbh',
  display: 'swap',
});

export const metadata = {
  title: 'Article Hub',
  description: 'Place you will find best articles',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${kumbh.variable} ${inter.variable} bg-dark-8 min-h-screen`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
