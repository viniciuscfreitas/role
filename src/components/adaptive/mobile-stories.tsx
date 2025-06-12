'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigation } from '@/lib/contexts/navigation-context'
import { Plus } from 'lucide-react'

// Event Previews Mobile - versão simplificada
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

export function MobileStories() {
  const { setCurrentPage, setIsStoryViewerOpen, setCurrentStoryIndex } = useNavigation()

  const openEventPreview = (previewIndex: number) => {
    setCurrentStoryIndex(previewIndex)
    setIsStoryViewerOpen(true)
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {/* Criar Event Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCurrentPage('create-event')}
            className="flex-shrink-0"
          >
            <div className="relative cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 group-active:scale-95 transition-all duration-200 flex items-center justify-center">
                <Plus className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              </div>
              
              <p className="text-[10px] text-gray-900 dark:text-gray-100 text-center mt-2 font-medium truncate w-16">
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
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => openEventPreview(index)}
              className="flex-shrink-0"
            >
              <div className="relative cursor-pointer group">
                {/* Ring simples */}
                <div className={`
                  w-16 h-16 rounded-full p-[2px] transition-all duration-200
                  ${preview.isViewed 
                    ? 'bg-gray-300 dark:bg-gray-600' 
                    : 'bg-gradient-to-tr from-purple-500 to-purple-600'
                  }
                  group-active:scale-95
                `}>
                  <Avatar className="w-full h-full ring-1 ring-white/60 dark:ring-slate-800/60">
                    <AvatarImage src={preview.organizer.image} alt={preview.organizer.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-sm">
                      {preview.organizer.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                {/* Verificado - simples */}
                {preview.organizer.verified && (
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                <p className="text-[10px] text-gray-900 dark:text-gray-100 text-center mt-2 font-medium truncate w-16">
                  {preview.organizer.name.split(' ')[0]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 