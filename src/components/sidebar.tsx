'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/contexts/auth-context'
import { useNavigation, NavigationPage } from '@/lib/contexts/navigation-context'
import { 
  Home, 
  Search, 
  Calendar, 
  Bell, 
  User, 
  LogOut,
  Zap,
  Plus,
  Heart,
  Bookmark,
  MapPin
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { motion } from 'framer-motion'
import { useSidebar } from '@/lib/contexts/sidebar-context'

export function Sidebar() {
  const { logout } = useAuth()
  const { currentPage, setCurrentPage } = useNavigation()
  const { isLeftSidebarCollapsed: isCollapsed, setLeftSidebarCollapsed: setIsCollapsed } = useSidebar()

  const mainNavItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Buscar' },
    { id: 'events', icon: Calendar, label: 'Eventos' },
    { id: 'map', icon: MapPin, label: 'Mapa' },
    { id: 'create-event', icon: Plus, label: 'Criar Evento', variant: 'primary' as const },
    { id: 'notifications', icon: Bell, label: 'Notificações' },
    { id: 'likes', icon: Heart, label: 'Curtidas' },
    { id: 'saved', icon: Bookmark, label: 'Salvos' },
    { id: 'profile', icon: User, label: 'Perfil' }
  ]

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId as NavigationPage)
  }

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-card/80 backdrop-blur-sm z-50 transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex flex-col h-full p-3">
        {/* ROLE Brand Header */}
        <motion.div 
          className={cn(
            "flex items-center gap-3 mb-8 relative cursor-pointer",
            isCollapsed ? "justify-center" : "px-3"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-primary/80 to-primary rounded-xl flex items-center justify-center shadow-lg"
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
          </motion.div>
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-foreground">
            ROLE
          </h1>
          )}
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {mainNavItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => handleNavigation(item.id)}
              className={cn(
                "w-full justify-start text-left h-10 rounded-lg font-medium transition-all",
                isCollapsed ? "px-3" : "px-3 py-2",
                currentPage === item.id
                  ? "bg-primary/10 text-primary hover:bg-primary/20" 
                  : item.variant === 'primary'
                    ? "bg-gradient-to-r from-primary/80 to-primary text-primary-foreground hover:scale-[1.02] shadow-sm"
                    : "text-foreground hover:bg-muted"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon 
                className={cn(
                  "h-5 w-5",
                  !isCollapsed && "mr-3",
                  currentPage === item.id && "text-primary"
                )} 
                strokeWidth={currentPage === item.id ? 2.5 : 2} 
              />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="space-y-2 pt-2">
          {/* Theme Toggle */}
          <ThemeToggle showLabel={!isCollapsed} />

          {/* Logout Button */}
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              "w-full h-10 rounded-lg text-destructive hover:bg-destructive/10",
              isCollapsed ? "px-3" : "px-3 py-2"
            )}
            title={isCollapsed ? "Sair" : undefined}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Sair</span>}
          </Button>
        </div>
      </div>
    </aside>
  )
} 