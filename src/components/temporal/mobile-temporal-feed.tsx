'use client'

import { motion } from 'framer-motion'
import { RefreshCw, TrendingUp, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PastEventCard } from './past-event-card'
import { LiveEventCard } from './live-event-card'
import { FutureEventCard } from './future-event-card'
import { useTemporalEvents } from '@/lib/hooks/use-temporal-events'
import { allTemporalEvents } from '@/lib/data/temporal-events-mock'
import { PastEvent, LiveEvent, FutureEvent } from '@/types/events'
import { useMobileLayout } from '@/lib/contexts/mobile-layout-context'
import { cn } from '@/lib/utils'
import { useState, useRef } from 'react'

interface MobileTemporalFeedProps {
  className?: string
  maxItems?: number
}

export function MobileTemporalFeed({ 
  className, 
  maxItems = 15 
}: MobileTemporalFeedProps) {
  const { shouldUseMobileLayout } = useMobileLayout()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const touchStartY = useRef<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    filters,
    setFilters,
    filteredEvents,
    liveEventsCount,
    upcomingEventsCount,
    pastEventsCount,
    isLoading,
    refreshFeed
  } = useTemporalEvents({
    events: allTemporalEvents,
    maxItems,
    autoUpdate: true
  })

  // Only render if mobile layout
  if (!shouldUseMobileLayout) return null

  const handleEventAction = (action: string, event: PastEvent | LiveEvent | FutureEvent) => {
    console.log(`Mobile Action: ${action}`, event)
    // Implementar ações específicas para mobile
  }

  // Pull to refresh handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.targetTouches[0].clientY
    const diff = currentY - touchStartY.current
    
    if (scrollRef.current && scrollRef.current.scrollTop === 0 && diff > 0) {
      setPullDistance(Math.min(diff * 0.5, 80))
    }
  }

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      setIsRefreshing(true)
      refreshFeed()
      setTimeout(() => {
        setIsRefreshing(false)
        setPullDistance(0)
      }, 1500)
    } else {
      setPullDistance(0)
    }
  }

  const renderMobileEventCard = (event: PastEvent | LiveEvent | FutureEvent, index: number) => {
    const baseProps = {
      key: event.id,
      className: "mb-4"
    }

    switch (event.status) {
      case 'past':
        return (
          <motion.div
            {...baseProps}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <PastEventCard
              event={event as PastEvent}
              onViewDetails={(e) => handleEventAction('viewDetails', e)}
              onFindSimilar={(e) => handleEventAction('findSimilar', e)}
            />
          </motion.div>
        )

      case 'live':
        return (
          <motion.div
            {...baseProps}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <LiveEventCard
              event={event as LiveEvent}
              onJoinNow={(e) => handleEventAction('joinNow', e)}
              onGetDirections={(e) => handleEventAction('getDirections', e)}
              onCallVenue={(e) => handleEventAction('callVenue', e)}
            />
          </motion.div>
        )

      case 'upcoming':
        return (
          <motion.div
            {...baseProps}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <FutureEventCard
              event={event as FutureEvent}
              onInterested={(e) => handleEventAction('interested', e)}
              onGoing={(e) => handleEventAction('going', e)}
              onShare={(e) => handleEventAction('share', e)}
              onSave={(e) => handleEventAction('save', e)}
              onInviteFriends={(e) => handleEventAction('inviteFriends', e)}
            />
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div 
      ref={scrollRef}
      className={cn('w-full', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div 
          className="flex items-center justify-center py-4 transition-all duration-200"
          style={{ transform: `translateY(${pullDistance}px)` }}
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
            className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
          />
          <span className="ml-2 text-sm text-muted-foreground">
            {isRefreshing ? 'Atualizando...' : pullDistance > 60 ? 'Solte para atualizar' : 'Puxe para atualizar'}
          </span>
        </div>
      )}

      {/* Mobile Header com estatísticas compactas */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border/50 p-4 z-10"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">Descobrir</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshFeed}
            disabled={isLoading}
            className="text-primary p-2"
          >
            <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
          </Button>
        </div>

        {/* Stats compactas */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-600 font-semibold">{liveEventsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-blue-500" />
            <span className="text-blue-600 font-semibold">{upcomingEventsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-gray-600 font-semibold">{pastEventsCount}</span>
          </div>
          <div className="ml-auto">
            <Badge variant="secondary" className="text-xs">
              {filteredEvents.length}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Filtros horizontais mobile */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 py-3"
      >
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={filters.showLive && !filters.showPast && !filters.showFuture ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ showPast: false, showLive: true, showFuture: false })}
            className="text-xs whitespace-nowrap flex-shrink-0"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1" />
            Ao Vivo
          </Button>
          <Button
            variant={!filters.showLive && !filters.showPast && filters.showFuture ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ showPast: false, showLive: false, showFuture: true })}
            className="text-xs whitespace-nowrap flex-shrink-0"
          >
            Próximos
          </Button>
          <Button
            variant={filters.showPast && !filters.showLive && !filters.showFuture ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ showPast: true, showLive: false, showFuture: false })}
            className="text-xs whitespace-nowrap flex-shrink-0"
          >
            Passados
          </Button>
          <Button
            variant={filters.showPast && filters.showLive && filters.showFuture ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ showPast: true, showLive: true, showFuture: true })}
            className="text-xs whitespace-nowrap flex-shrink-0"
          >
            Todos
          </Button>
        </div>
      </motion.div>

      {/* Feed de eventos mobile */}
      <div className="px-4 space-y-4 pb-20">
        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Nenhum evento encontrado
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tente ajustar os filtros ou puxe para atualizar.
            </p>
          </motion.div>
        ) : (
          filteredEvents.map((event, index) => renderMobileEventCard(event, index))
        )}
      </div>

      {/* Load more mobile */}
      {filteredEvents.length > 0 && filteredEvents.length >= maxItems && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-6 px-4"
        >
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              console.log('Load more events - mobile')
            }}
          >
            Carregar mais eventos
          </Button>
        </motion.div>
      )}
    </div>
  )
} 