'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigation } from '@/lib/contexts/navigation-context'
import { useSidebar } from '@/lib/contexts/sidebar-context'
import { cn } from '@/lib/utils'

// Mock data
const stories = [
  {
    user: {
      name: 'Ana Silva',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=150&h=150&fit=crop&crop=face',
      hasStory: true,
      isViewed: false
    },
    storyIndex: 0
  },
  {
    user: {
      name: 'Tech Events',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      hasStory: true,
      isViewed: false
    },
    storyIndex: 1
  },
  {
    user: {
      name: 'Festival Music',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      hasStory: true,
      isViewed: false
    },
    storyIndex: 2
  },
  {
    user: {
      name: 'João Pedro',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      hasStory: true,
      isViewed: false
    },
    storyIndex: 3
  },
  {
    user: {
      name: 'Maria Costa',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      hasStory: true,
      isViewed: false
    },
    storyIndex: 4
  },
  {
    user: {
      name: 'Carlos Santos',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      hasStory: true,
      isViewed: false
    },
    storyIndex: 5
  },
  {
    user: {
      name: 'Luiza Oliveira',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
      hasStory: true,
      isViewed: false
    },
    storyIndex: 6
  },
  {
    user: {
      name: 'Pedro Alves',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      hasStory: true,
      isViewed: false
    },
    storyIndex: 7
    }
]

export function Stories() {
  const { setCurrentPage, setIsStoryViewerOpen, setCurrentStoryIndex } = useNavigation()
  const { isLeftSidebarCollapsed, isRightSidebarCollapsed } = useSidebar()

  const openStory = (storyIndex: number) => {
      setCurrentStoryIndex(storyIndex)
      setIsStoryViewerOpen(true)
  }

  return (
    <div className="w-full bg-card/80 backdrop-blur-sm">
      <div className="flex justify-center">
        <div className={cn(
          "w-full transition-all duration-300",
          isLeftSidebarCollapsed && isRightSidebarCollapsed ? "px-8 py-4 max-w-5xl" : 
          (isLeftSidebarCollapsed || isRightSidebarCollapsed) ? "px-6 py-4 max-w-4xl" : 
          "px-4 py-4 max-w-3xl"
        )}>
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
            {/* Seu Story */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => setCurrentPage('create-event')}
            >
              <div className="relative cursor-pointer group">
                <div className="w-20 h-20 rounded-full p-[2px] bg-muted/40 group-hover:scale-105 transition-all duration-200">
                  <Avatar className="w-full h-full ring-1 ring-background/60">
                    <AvatarImage src="/eu.jpeg" alt="Seu Story" />
                    <AvatarFallback className="bg-gradient-to-br from-primary/70 to-primary text-primary-foreground font-bold text-lg">
                      V
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <p className="text-xs text-foreground text-center mt-2 font-medium truncate w-20">
                  Seu story
                </p>
              </div>
            </motion.div>

            {/* Stories dos outros */}
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                onClick={() => openStory(story.storyIndex)}
              >
                  <div className="relative cursor-pointer group">
                    <div className={`
                      w-20 h-20 rounded-full p-[2px] transition-all duration-200
                      ${story.user.hasStory 
                        ? story.user.isViewed 
                          ? 'bg-gradient-to-tr from-muted-foreground/40 to-muted-foreground/40' 
                          : 'bg-gradient-to-tr from-primary/70 to-primary/90'
                        : 'bg-muted/40'
                      }
                      group-hover:scale-105
                    `}>
                      <Avatar className="w-full h-full ring-1 ring-background/60">
                        <AvatarImage src={story.user.image} alt={story.user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/70 to-primary text-primary-foreground font-bold text-lg">
                          {story.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <p className="text-xs text-foreground text-center mt-2 font-medium truncate w-20">
                      {story.user.name}
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