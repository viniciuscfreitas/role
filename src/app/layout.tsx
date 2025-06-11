'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { AuthProvider } from '@/lib/contexts/auth-context'
import { NavigationProvider } from '@/lib/contexts/navigation-context'
import { SidebarProvider } from '@/lib/contexts/sidebar-context'
import { cn } from '@/lib/utils'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background antialiased")}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NavigationProvider>
              <SidebarProvider>
              {children}
              </SidebarProvider>
            </NavigationProvider>
          </AuthProvider>
        </NextThemesProvider>
      </body>
    </html>
  )
}
