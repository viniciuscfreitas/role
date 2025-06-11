'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/sidebar'
import { RightSidebar } from '@/components/right-sidebar'
import { BottomNavigation } from '@/components/mobile/bottom-navigation'
import { useMobileLayout } from '@/lib/contexts/mobile-layout-context'
import { useNavigation } from '@/lib/contexts/navigation-context'
import { useSidebar } from '@/lib/contexts/sidebar-context'
import { cn } from '@/lib/utils'

interface AdaptiveLayoutProps {
  children: ReactNode
}

export function AdaptiveLayout({ children }: AdaptiveLayoutProps) {
  const { shouldUseMobileLayout } = useMobileLayout()
  const { currentPage } = useNavigation()
  const { isLeftSidebarCollapsed, isRightSidebarCollapsed } = useSidebar()

  // Mobile Layout
  if (shouldUseMobileLayout) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        {/* Main content area */}
        <main className="flex-1 pb-20"> {/* pb-20 for bottom navigation space */}
          {children}
        </main>
        
        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    )
  }

  // Desktop Layout (existing)
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar esquerda fixa */}
      <Sidebar />
      
      {/* Container principal */}
      <main className={cn(
        "flex-1 transition-all duration-300 flex flex-col",
        isLeftSidebarCollapsed ? "ml-[72px]" : "ml-64",
        currentPage === 'home' && (isRightSidebarCollapsed ? "mr-[72px]" : "mr-80")
      )}>
        <div className="w-full max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
      
      {/* Sidebar direita fixa - apenas na home */}
      {currentPage === 'home' && <RightSidebar />}
    </div>
  )
} 