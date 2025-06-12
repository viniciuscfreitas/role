'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useNavigation } from '@/lib/contexts/navigation-context'
import { useSidebar } from '@/lib/contexts/sidebar-context'
import { cn } from '@/lib/utils'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

// Event Previews - apenas organizadores de eventos podem criar
const eventPreviews = [
  {
    id: 'ep1',
    organizer: {
      name: 'Festival Music',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    event: {
      title: 'Festival de Música Eletrônica 2024',
      type: 'live', // live, upcoming, teaser
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // Em 2 horas
      location: 'Arena Eventos SP',
      attendees: 2500,
      category: 'Música'
    },
    previewType: 'countdown', // countdown, behind-scenes, highlights, announcement
    isViewed: false
  },
  {
    id: 'ep2',
    organizer: {
      name: 'João Oliveira',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: false
    },
    event: {
      title: 'Tech Meetup: IA e Futuro',
      type: 'upcoming',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop',
      startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Em 3 dias
      location: 'Innovation Hub',
      attendees: 150,
      category: 'Tecnologia'
    },
    previewType: 'announcement',
    isViewed: false
  },
  {
    id: 'ep3',
    organizer: {
      name: 'Ana Silva',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    event: {
      title: 'Noite de Stand-up Comedy',
      type: 'upcoming',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
      startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Em 5 dias
      location: 'Teatro Municipal',
      attendees: 300,
      category: 'Entretenimento'
    },
    previewType: 'behind-scenes',
    isViewed: true
  },
  {
    id: 'ep4',
    organizer: {
      name: 'Maria Costa',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    event: {
      title: 'Workshop de Fotografia',
      type: 'upcoming',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=400&fit=crop',
      startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Em 7 dias
      location: 'Estúdio Criativo',
      attendees: 50,
      category: 'Educação'
    },
    previewType: 'teaser',
    isViewed: false
  },
  {
    id: 'ep5',
    organizer: {
      name: 'Carlos Santos',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      verified: false
    },
    event: {
      title: 'Feira Gastronômica',
      type: 'upcoming',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop',
      startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // Em 10 dias
      location: 'Parque Ibirapuera',
      attendees: 1000,
      category: 'Gastronomia'
    },
    previewType: 'highlights',
    isViewed: false
  }
]

// Função para obter cor do preview baseado no tipo
const getPreviewColor = (type: string, eventType: string) => {
  if (eventType === 'live') {
    return 'from-red-500 to-red-600' // Vermelho para eventos ao vivo
  }
  
  switch (type) {
    case 'countdown':
      return 'from-purple-500 to-purple-600'
    case 'announcement':
      return 'from-blue-500 to-blue-600'
    case 'behind-scenes':
      return 'from-green-500 to-green-600'
    case 'teaser':
      return 'from-orange-500 to-orange-600'
    case 'highlights':
      return 'from-pink-500 to-pink-600'
    default:
      return 'from-primary/70 to-primary/90'
  }
}

// Função para obter ícone do preview
const getPreviewIcon = (type: string) => {
  switch (type) {
    case 'countdown':
      return <Clock className="w-3 h-3" />
    case 'announcement':
      return <Calendar className="w-3 h-3" />
    case 'behind-scenes':
      return <Users className="w-3 h-3" />
    case 'teaser':
      return <MapPin className="w-3 h-3" />
    case 'highlights':
      return <Calendar className="w-3 h-3" />
    default:
      return <Calendar className="w-3 h-3" />
  }
}

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
                <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-primary/50 to-primary/70 group-hover:scale-105 transition-all duration-200">
                  <Avatar className="w-full h-full ring-1 ring-background/60">
                    <AvatarImage src="/eu.jpeg" alt="Criar Preview" />
                    <AvatarFallback className="bg-gradient-to-br from-primary/70 to-primary text-primary-foreground font-bold text-lg">
                      +
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                {/* Badge indicando tipo de conteúdo */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-primary text-primary-foreground">
                    <Calendar className="w-2.5 h-2.5 mr-1" />
                    Evento
                  </Badge>
                </div>
                
                <p className="text-xs text-foreground text-center mt-3 font-medium truncate w-20">
                  Criar Preview
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
                  {/* Ring colorido baseado no tipo de preview */}
                  <div className={`
                    w-20 h-20 rounded-full p-[2px] transition-all duration-200
                    ${preview.isViewed 
                      ? 'bg-gradient-to-tr from-muted-foreground/40 to-muted-foreground/40' 
                      : `bg-gradient-to-tr ${getPreviewColor(preview.previewType, preview.event.type)}`
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
                  
                  {/* Badge do tipo de preview */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <Badge 
                      variant="secondary" 
                      className={`text-[10px] px-1.5 py-0.5 text-white bg-gradient-to-r ${getPreviewColor(preview.previewType, preview.event.type)}`}
                    >
                      {getPreviewIcon(preview.previewType)}
                      {preview.event.type === 'live' ? 'AO VIVO' : preview.previewType.toUpperCase()}
                    </Badge>
                  </div>
                  
                  {/* Verificado */}
                  {preview.organizer.verified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  <p className="text-xs text-foreground text-center mt-3 font-medium truncate w-20">
                    {preview.organizer.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Legenda explicativa */}
          <div className="mt-2 text-center">
            <p className="text-xs text-muted-foreground">
              Event Previews • Apenas organizadores podem criar
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 