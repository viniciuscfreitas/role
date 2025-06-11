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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t shadow-lg"
         style={{
           backgroundColor: 'rgb(250 251 252)', // light: --background
           borderTopColor: 'rgb(226 232 240)', // light: --border
         }}>
      {/* Dark theme overlay */}
      <div className="dark:block hidden absolute inset-0"
           style={{
             backgroundColor: 'rgb(12 16 23)', // dark: --background
             borderTop: '1px solid rgb(30 41 59)', // dark: --border
           }} />
           
      {/* Safe area padding for devices with home indicator - similar to Instagram */}
      <div className="pb-8 safe-area-inset-bottom relative">
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
                  isCreateButton && "p-3 shadow-lg"
                )}
                style={{
                  ...(isCreateButton && {
                    backgroundColor: 'rgb(139 69 119)', // light: primary
                    color: 'rgb(255 255 255)', // light: primary-foreground
                  }),
                  ...(isActive && !isCreateButton && {
                    color: 'rgb(139 69 119)', // light: primary
                  }),
                  ...(!isActive && !isCreateButton && {
                    color: 'rgb(100 116 139)', // light: muted-foreground
                  }),
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: isCreateButton ? 1.05 : 1.02 }}
              >
                {/* Dark theme styles */}
                {isCreateButton && (
                  <div className="dark:block hidden absolute inset-0 rounded-xl"
                       style={{
                         backgroundColor: 'rgb(156 109 163)', // dark: primary
                         color: 'rgb(12 16 23)', // dark: primary-foreground
                       }} />
                )}

                {/* Icon */}
                <motion.div
                  className="relative z-10"
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
                    style={{
                      ...(isActive && !isCreateButton && {
                        color: 'rgb(139 69 119)', // light: primary
                      }),
                      ...(!isActive && !isCreateButton && {
                        color: 'rgb(100 116 139)', // light: muted-foreground  
                      }),
                    }}
                  />
                  {/* Dark theme icon colors */}
                  <div className="dark:block hidden absolute inset-0">
                    <item.icon 
                      className={cn(
                        "w-6 h-6",
                        isCreateButton ? "w-7 h-7" : ""
                      )} 
                      strokeWidth={isActive ? 2.5 : 2}
                      style={{
                        ...(isActive && !isCreateButton && {
                          color: 'rgb(156 109 163)', // dark: primary
                        }),
                        ...(!isActive && !isCreateButton && {
                          color: 'rgb(148 163 184)', // dark: muted-foreground  
                        }),
                      }}
                    />
                  </div>
                </motion.div>

                {/* Label - only show for non-create button */}
                {!isCreateButton && (
                  <div className="text-xs mt-1 font-medium transition-colors relative z-10">
                    {/* Light theme label */}
                    <span className="dark:hidden"
                          style={{
                            color: isActive ? 'rgb(139 69 119)' : 'rgb(100 116 139)'
                          }}>
                      {item.label}
                    </span>
                    {/* Dark theme label */}
                    <span className="dark:inline hidden"
                          style={{
                            color: isActive ? 'rgb(156 109 163)' : 'rgb(148 163 184)'
                          }}>
                      {item.label}
                    </span>
                  </div>
                )}

                {/* Active indicator */}
                {isActive && !isCreateButton && (
                  <motion.div
                    className="absolute -top-1 w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'rgb(139 69 119)' }} // light: primary
                    layoutId="activeTab"
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {/* Dark theme indicator */}
                    <div className="dark:block hidden absolute inset-0 rounded-full"
                         style={{ backgroundColor: 'rgb(156 109 163)' }} /> {/* dark: primary */}
                  </motion.div>
                )}

                {/* Badge for notifications */}
                {item.badge && item.badge > 0 && (
                  <motion.div
                    className="absolute -top-1 -right-1 text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold"
                    style={{
                      backgroundColor: 'rgb(220 38 38)', // light: destructive
                      color: 'rgb(255 255 255)',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Dark theme badge */}
                    <div className="dark:block hidden absolute inset-0 rounded-full"
                         style={{
                           backgroundColor: 'rgb(239 68 68)', // dark: destructive
                         }} />
                    <span className="relative z-10">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
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