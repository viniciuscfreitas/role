'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type NavigationPage = 'home' | 'search' | 'events' | 'map' | 'create-event' | 'notifications' | 'likes' | 'saved' | 'profile'

interface NavigationContextType {
  currentPage: NavigationPage
  setCurrentPage: (page: NavigationPage) => void
  isStoryViewerOpen: boolean
  setIsStoryViewerOpen: (open: boolean) => void
  currentStoryIndex: number
  setCurrentStoryIndex: React.Dispatch<React.SetStateAction<number>>
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home')
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  return (
    <NavigationContext.Provider value={{
      currentPage,
      setCurrentPage,
      isStoryViewerOpen,
      setIsStoryViewerOpen,
      currentStoryIndex,
      setCurrentStoryIndex
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
} 