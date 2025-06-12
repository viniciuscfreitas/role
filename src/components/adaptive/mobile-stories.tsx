'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigation } from '@/lib/contexts/navigation-context'
import { useMobileLayout } from '@/lib/contexts/mobile-layout-context'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

// Mock data - same as desktop but optimized for mobile
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

export function MobileStories() {
  const { setCurrentPage, setIsStoryViewerOpen, setCurrentStoryIndex } = useNavigation()
  const { shouldUseMobileLayout } = useMobileLayout()

  const openStory = (storyIndex: number) => {
    setCurrentStoryIndex(storyIndex)
    setIsStoryViewerOpen(true)
  }

  // Only render if mobile layout
  if (!shouldUseMobileLayout) return null

  return (
    <div className="w-full bg-background border-b border-border/50">
      <div className="px-4 py-3">
        {/* Mobile-optimized horizontal scroll */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none">
          {/* Create Story Button - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCurrentPage('create-event')}
            className="flex-shrink-0"
          >
            <div className="relative cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                <Plus className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
              </div>
              
              <p className="text-xs text-foreground text-center mt-1 font-medium truncate w-16">
                Criar
              </p>
            </div>
          </motion.div>

          {/* Stories dos outros - Mobile optimized */}
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => openStory(story.storyIndex)}
              className="flex-shrink-0"
            >
              <div className="relative cursor-pointer group">
                <div className={cn(
                  "w-16 h-16 rounded-full p-[2px] transition-transform group-active:scale-95",
                  story.user.hasStory 
                    ? story.user.isViewed 
                      ? 'bg-gradient-to-tr from-muted-foreground/40 to-muted-foreground/40' 
                      : 'bg-gradient-to-tr from-primary/70 to-primary/90'
                    : 'bg-muted/40'
                )}>
                  <Avatar className="w-full h-full ring-1 ring-background/60">
                    <AvatarImage src={story.user.image} alt={story.user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/70 to-primary text-primary-foreground font-bold text-sm">
                      {story.user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <p className="text-xs text-foreground text-center mt-1 font-medium truncate w-16">
                  {story.user.name.split(' ')[0]} {/* Only first name for mobile */}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 