import CommonHeader from '@/components/header/CommonHeader';
import type {Metadata} from 'next';
import './globals.css';

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
      <body>
        <CommonHeader />
        <div className="py-[76px]">{children}</div>
      </body>
    </html>
  );
}
