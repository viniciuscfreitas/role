'use client'

import { Sparkles, Users, Calendar, MapPin, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/lib/contexts/sidebar-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

// Mock data
const trendingEvents = [
  {
    id: '1',
    title: 'Festival de Verão',
    location: 'Praia de Copacabana',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop&crop=face',
    attendees: 1240,
    date: '24 Mar',
    category: 'Música'
  },
  {
    id: '2',
    title: 'Tech Conference',
    location: 'Centro de Convenções',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=150&fit=crop&crop=face',
    attendees: 850,
    date: '28 Mar',
    category: 'Tech'
  },
  {
    id: '3',
    title: 'Show de Jazz',
    location: 'Blue Note',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop&crop=face',
    attendees: 320,
    date: '01 Abr',
    category: 'Música'
  }
]

const recommendedEvents = [
  {
    id: '4',
    title: 'Workshop de Fotografia',
    location: 'Estúdio Central',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face',
    match: 98,
    date: '30 Mar',
    category: 'Arte'
  },
  {
    id: '5',
    title: 'Noite de Stand Up',
    location: 'Comedy Club',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop&crop=face',
    match: 95,
    date: '02 Abr',
    category: 'Comédia'
  }
]

export function RightSidebar() {
  const { isRightSidebarCollapsed: isCollapsed, setRightSidebarCollapsed: setIsCollapsed } = useSidebar()

  return (
    <motion.div
      className={cn(
        "fixed right-0 top-0 h-screen bg-card/80 backdrop-blur-sm z-40 transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-80"
      )}
      layout
    >
      <div className="flex flex-col h-full p-3">
        {/* Header */}
        <motion.div 
          className={cn(
            "flex items-center gap-3 mb-6 relative cursor-pointer",
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
            <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
          </motion.div>
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-foreground">
              Descobrir
            </h2>
          )}
        </motion.div>

        {/* Content */}
        <div className={cn(
          "flex-1 transition-all duration-300 space-y-6 overflow-y-auto scrollbar-none",
          isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
        )}>
          {/* Em Alta */}
          <div>
            <div className="flex items-center justify-between mb-4 px-3">
              <h3 className="text-sm font-semibold text-foreground">Em Alta</h3>
              <Badge variant="secondary" className="font-normal">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            </div>
            <div className="space-y-2">
              {trendingEvents.map((event) => (
                <motion.div 
                  key={event.id}
                  className="group flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Avatar className="w-12 h-12 rounded-lg ring-2 ring-background">
                    <AvatarImage src={event.image} alt={event.title} className="object-cover" />
                    <AvatarFallback>{event.title[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate leading-none mt-0.5">
                        {event.title}
                      </p>
                      <Badge variant="outline" className="shrink-0 text-[10px] h-5 font-normal">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs text-primary">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{event.attendees.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Para Você */}
          <div>
            <div className="flex items-center justify-between mb-4 px-3">
              <h3 className="text-sm font-semibold text-foreground">Para Você</h3>
              <Badge variant="secondary" className="font-normal">
                <Sparkles className="h-3 w-3 mr-1" />
                Match
              </Badge>
            </div>
            <div className="space-y-2">
              {recommendedEvents.map((event) => (
                <motion.div 
                  key={event.id}
                  className="group flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Avatar className="w-12 h-12 rounded-lg ring-2 ring-background">
                    <AvatarImage src={event.image} alt={event.title} className="object-cover" />
                    <AvatarFallback>{event.title[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate leading-none mt-0.5">
                        {event.title}
                      </p>
                      <Badge variant="outline" className="shrink-0 text-[10px] h-5 font-normal">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs text-primary">
                        <Sparkles className="h-3 w-3 mr-1" />
                        <span>{event.match}% match</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 