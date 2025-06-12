'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigation } from '@/lib/contexts/navigation-context'
import { useSidebar } from '@/lib/contexts/sidebar-context'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

// Event Previews - versão simplificada
const eventPreviews = [
  {
    id: 'ep1',
    organizer: {
      name: 'Festival Music',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    isViewed: false
  },
  {
    id: 'ep2',
    organizer: {
      name: 'João Oliveira',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: false
    },
    isViewed: false
  },
  {
    id: 'ep3',
    organizer: {
      name: 'Ana Silva',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    isViewed: true
  },
  {
    id: 'ep4',
    organizer: {
      name: 'Maria Costa',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    isViewed: false
  },
  {
    id: 'ep5',
    organizer: {
      name: 'Carlos Santos',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      verified: false
    },
    isViewed: false
  }
]

export function Stories() {
  const { setCurrentPage, setIsStoryViewerOpen, setCurrentStoryIndex } = useNavigation()
  const { isLeftSidebarCollapsed, isRightSidebarCollapsed } = useSidebar()

  const openEventPreview = (previewIndex: number) => {
    setCurrentStoryIndex(previewIndex)
    setIsStoryViewerOpen(true)
  }

  return (
    <div className="w-full bg-card border-b border-border">
      <div className="flex justify-center">
        <div className={cn(
          "w-full transition-all duration-300",
          isLeftSidebarCollapsed && isRightSidebarCollapsed ? "px-8 py-4 max-w-7xl" : 
          (isLeftSidebarCollapsed || isRightSidebarCollapsed) ? "px-6 py-4 max-w-6xl" : 
          "px-4 py-4 max-w-5xl"
        )}>
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
            {/* Criar Event Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => setCurrentPage('create-event')}
            >
              <div className="relative cursor-pointer group">
                <div className="w-20 h-20 rounded-full bg-muted/20 border-2 border-dashed border-muted-foreground/30 group-hover:border-muted-foreground/50 group-hover:scale-105 transition-all duration-200 flex items-center justify-center">
                  <Plus className="w-8 h-8 text-muted-foreground/60" />
                </div>
                
                <p className="text-xs text-foreground text-center mt-2 font-medium truncate w-20">
                  Criar
                </p>
              </div>
            </motion.div>

            {/* Event Previews dos Organizadores */}
            {eventPreviews.map((preview, index) => (
              <motion.div
                key={preview.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                onClick={() => openEventPreview(index)}
              >
                <div className="relative cursor-pointer group">
                  {/* Ring simples */}
                  <div className={`
                    w-20 h-20 rounded-full p-[2px] transition-all duration-200
                    ${preview.isViewed 
                      ? 'bg-muted/40' 
                      : 'bg-gradient-to-tr from-primary/60 to-primary/80'
                    }
                    group-hover:scale-105
                  `}>
                    <Avatar className="w-full h-full ring-1 ring-background/60">
                      <AvatarImage src={preview.organizer.image} alt={preview.organizer.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/70 to-primary text-primary-foreground font-bold text-lg">
                        {preview.organizer.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Verificado - simples */}
                  {preview.organizer.verified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  <p className="text-xs text-foreground text-center mt-2 font-medium truncate w-20">
                    {preview.organizer.name.split(' ')[0]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 