import CommonHeader from '@/components/header/CommonHeader';
import type {Metadata} from 'next';
import localFont from 'next/font/local';
import {Suspense} from 'react';
import './globals.css';

const nanumFont = localFont({src: '../../public/fonts/NanumGothic.ttf'});
export const metadata: Metadata = {
  title: '끄적끄적',
  description: '끄적끄적',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={nanumFont.className}>
        <Suspense>
          <CommonHeader />
          <div className="py-[76px] flex flex-col items-center p-[16px]">
            {children}
          </div>
        </Suspense>
      </body>
    </html>
  );
}
