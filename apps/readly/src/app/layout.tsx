import DefaultHeader from '@/components/header/DefaultHeader';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Provider from './provider';
import KaKaoScript from './script/KaKaoScript';
import { CommonToaster } from '@yeong/ui';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Readly',
  description: 'Readly에서 읽은 책의 한마디를 작성해보세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Provider>
          <div className="flex flex-col items-center">
            <DefaultHeader />
            <div className="w-full m-[24px] lg:w-[1000px] px-[16px] md:px-[32px]">
              {children}
            </div>
          </div>
        </Provider>
        <CommonToaster />
      </body>
      <KaKaoScript />
    </html>
  );
}
