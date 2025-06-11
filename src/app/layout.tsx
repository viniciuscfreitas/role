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
      <head>
        <meta name="application-name" content="ROLE" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ROLE" />
        <meta name="description" content="Descubra eventos e festas próximos, conecte-se com outros participantes e compartilhe experiências incríveis." />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#6366f1" />

        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#6366f1" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://role.app" />
        <meta name="twitter:title" content="ROLE - Rede Social de Eventos" />
        <meta name="twitter:description" content="Descubra eventos e festas próximos, conecte-se com outros participantes e compartilhe experiências incríveis." />
        <meta name="twitter:image" content="/icons/icon-192x192.png" />
        <meta name="twitter:creator" content="@roleapp" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ROLE - Rede Social de Eventos" />
        <meta property="og:description" content="Descubra eventos e festas próximos, conecte-se com outros participantes e compartilhe experiências incríveis." />
        <meta property="og:site_name" content="ROLE" />
        <meta property="og:url" content="https://role.app" />
        <meta property="og:image" content="/icons/icon-512x512.png" />

        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
      </head>
      <body className={cn("min-h-screen bg-background antialiased")}>
        <noscript>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>JavaScript é necessário</h1>
            <p>Por favor, habilite o JavaScript no seu navegador para usar o ROLE.</p>
          </div>
        </noscript>
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
