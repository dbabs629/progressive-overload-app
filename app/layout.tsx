import type { Metadata } from 'next'
import './globals.css'
import { UserAuthProvider } from '@/app/context/UserAuthContext'

export const metadata: Metadata = {
  title: 'Exercise Tracker',
  description:
    'Exercise progress tracker, sort exercises by groups (recommend by muscle group) and set exercise weight goals.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <UserAuthProvider>{children}</UserAuthProvider>
      </body>
    </html>
  )
}
