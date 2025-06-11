'use client'

import { createContext, useContext, useState } from 'react'

interface SidebarContextType {
  isLeftSidebarCollapsed: boolean
  isRightSidebarCollapsed: boolean
  setLeftSidebarCollapsed: (collapsed: boolean) => void
  setRightSidebarCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isLeftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false)
  const [isRightSidebarCollapsed, setRightSidebarCollapsed] = useState(false)

  return (
    <SidebarContext.Provider
      value={{
        isLeftSidebarCollapsed,
        isRightSidebarCollapsed,
        setLeftSidebarCollapsed,
        setRightSidebarCollapsed
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
} 