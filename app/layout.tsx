import { Inter } from 'next/font/google'
import { ThemeProvider } from './theme-provider'
import './globals.css'

export const metadata = {
  title: {
    default: 'Frankazastain Studio',
    template: '%s | Frankazastain Studio',
  },
  description: 'Creative Design & Development Studio',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}