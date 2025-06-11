'use client'

import { motion } from 'framer-motion'
import { Home, Search, MapPin, Plus, User } from 'lucide-react'
import { useNavigation, NavigationPage } from '@/lib/contexts/navigation-context'
import { cn } from '@/lib/utils'

interface NavItem {
  id: NavigationPage
  icon: typeof Home
  label: string
  badge?: number
}

const navItems: NavItem[] = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'search', icon: Search, label: 'Buscar' },
  { id: 'create-event', icon: Plus, label: 'Criar' },
  { id: 'map', icon: MapPin, label: 'Mapa' },
  { id: 'profile', icon: User, label: 'Perfil' }
]

export function BottomNavigation() {
  const { currentPage, setCurrentPage } = useNavigation()

  const handleNavigation = (pageId: NavigationPage) => {
    setCurrentPage(pageId)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      {/* Safe area padding for devices with home indicator - similar to Instagram */}
      <div className="pb-8 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id
            const isCreateButton = item.id === 'create-event'
            
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] rounded-xl transition-colors",
                  isCreateButton
                    ? "bg-primary text-primary-foreground p-3 shadow-lg"
                    : isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                )}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: isCreateButton ? 1.05 : 1.02 }}
              >
                {/* Icon */}
                <motion.div
                  animate={{
                    scale: isActive && !isCreateButton ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon 
                    className={cn(
                      "w-6 h-6",
                      isCreateButton ? "w-7 h-7" : ""
                    )} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </motion.div>

                {/* Label - only show for non-create button */}
                {!isCreateButton && (
                  <span className={cn(
                    "text-xs mt-1 font-medium transition-colors",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                )}

                {/* Active indicator */}
                {isActive && !isCreateButton && (
                  <motion.div
                    className="absolute -top-1 w-1 h-1 bg-primary rounded-full"
                    layoutId="activeTab"
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}

                {/* Badge for notifications */}
                {item.badge && item.badge > 0 && (
                  <motion.div
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </nav>
  )
} 