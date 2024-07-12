import type { Metadata } from "next";
import { Roboto_Condensed } from 'next/font/google';
import AuthProvider from '@/providers/authProvider';
import Script from 'next/script';
import './globals.css';


const robotoCond = Roboto_Condensed({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mircrodesk',
  description: 'Developed by BawdicSoft Pvt Ltd',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={robotoCond.className}>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="gtag-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
        
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`,
        }}
      />

      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
