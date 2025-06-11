'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useIsMobile, useIsTablet, useIsDesktop, useIsTouchDevice } from '@/lib/hooks/use-media-query'

interface MobileLayoutContextType {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouchDevice: boolean
  isSmallScreen: boolean // mobile + tablet
  shouldUseMobileLayout: boolean
}

const MobileLayoutContext = createContext<MobileLayoutContextType | undefined>(undefined)

interface MobileLayoutProviderProps {
  children: ReactNode
}

export function MobileLayoutProvider({ children }: MobileLayoutProviderProps) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const isTouchDevice = useIsTouchDevice()
  
  // Consider mobile layout for mobile devices and tablets in portrait mode
  const isSmallScreen = isMobile || isTablet
  const shouldUseMobileLayout = isMobile || (isTablet && isTouchDevice)

  const value: MobileLayoutContextType = {
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    isSmallScreen,
    shouldUseMobileLayout
  }

  return (
    <MobileLayoutContext.Provider value={value}>
      {children}
    </MobileLayoutContext.Provider>
  )
}

export function useMobileLayout() {
  const context = useContext(MobileLayoutContext)
  if (context === undefined) {
    throw new Error('useMobileLayout must be used within a MobileLayoutProvider')
  }
  return context
}

// Convenience hooks
export const useIsMobileLayout = () => useMobileLayout().shouldUseMobileLayout
export const useIsDesktopLayout = () => !useMobileLayout().shouldUseMobileLayout 