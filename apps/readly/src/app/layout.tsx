import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import './reset.css'
import Provider from './provider'
import DefaultHeader from '@/components/header/DefaultHeader'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <div className="flex flex-col items-center">
            <DefaultHeader />
            <div className="w-[600px] m-[24px]">{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  )
}
