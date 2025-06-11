'use client'

import { Stories } from '@/components/stories'
import { MobileStories } from '@/components/adaptive/mobile-stories'
import { MobileFeed } from '@/components/adaptive/mobile-feed'
import { StoryViewer } from '@/components/story-viewer'
import { LoginPage } from '@/components/login-page'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/lib/contexts/auth-context'
import { useNavigation } from '@/lib/contexts/navigation-context'
import { motion } from 'framer-motion'
import { EventFeed } from '@/components/event-feed'
import { SearchPage } from '@/components/search-page'
import { NotificationsPage } from '@/components/notifications-page'
import { LikesPage } from '@/components/likes-page'
import { SavedPage } from '@/components/saved-page'
import { ProfilePage } from '@/components/profile-page'
import { CreateEventPage } from '@/components/create-event-page'
import { MapPage } from '@/components/map-page'
import { cn } from '@/lib/utils'
import { AdaptiveLayout } from '@/components/adaptive/adaptive-layout'
import { MobileLayoutProvider } from '@/lib/contexts/mobile-layout-context'
import { useMobileLayout } from '@/lib/contexts/mobile-layout-context'
import { useSidebar } from '@/lib/contexts/sidebar-context'

function HomePage() {
  const { shouldUseMobileLayout } = useMobileLayout()
  const { isLeftSidebarCollapsed, isRightSidebarCollapsed } = useSidebar()

  // Mobile Layout
  if (shouldUseMobileLayout) {
    return (
      <div className="min-h-screen bg-background">
        {/* Mobile Stories - não fixos, rolam junto com o feed */}
        <MobileStories />
        
        {/* Mobile Feed */}
        <MobileFeed />
      </div>
    )
  }

  // Desktop Layout
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Stories fixos no topo */}
      <div className="flex-shrink-0">
        <Stories />
      </div>
      
      {/* Feed que rola */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-center">
          <div className={cn(
            "w-full transition-all duration-300",
            isLeftSidebarCollapsed && isRightSidebarCollapsed ? "px-8 py-4 max-w-7xl" : 
            (isLeftSidebarCollapsed || isRightSidebarCollapsed) ? "px-6 py-4 max-w-6xl" : 
            "px-4 py-4 max-w-5xl"
          )}>
            <EventFeed />
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthenticatedFeed() {
  const { currentPage } = useNavigation()

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'search':
        return <SearchPage />
      case 'events':
        return <SearchPage />
      case 'map':
        return <MapPage />
      case 'create-event':
        return <CreateEventPage />
      case 'notifications':
        return <NotificationsPage />
      case 'likes':
        return <LikesPage />
      case 'saved':
        return <SavedPage />
      case 'profile':
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <AdaptiveLayout>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderPage()}
          </motion.div>
    </AdaptiveLayout>
  )
}

export default function MainPage() {
  const { user, isLoading } = useAuth()

  // Mostrar loading apenas durante o carregamento inicial
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  // Se não há usuário logado, mostrar tela de login
  if (!user) {
    return <LoginPage />
  }

  // Se há usuário logado, mostrar o app com layout adaptativo
  return (
    <MobileLayoutProvider>
      <AuthenticatedFeed />
      <StoryViewer />
    </MobileLayoutProvider>
  )
}
