import CommonHeader from '@/components/header/CommonHeader';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const nanumFont = localFont({ src: '../../public/fonts/NanumGothic.ttf' });
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
        <CommonHeader />
        <div className="py-[76px] flex flex-col items-center">{children}</div>
      </body>
    </html>
  );
}
