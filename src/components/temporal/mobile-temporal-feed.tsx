'use client'

import { motion } from 'framer-motion'
import { PastEventCard } from './past-event-card'
import { LiveEventCard } from './live-event-card'
import { FutureEventCard } from './future-event-card'
import { useTemporalEvents } from '@/lib/hooks/use-temporal-events'
import { allTemporalEvents } from '@/lib/data/temporal-events-mock'
import { PastEvent, LiveEvent, FutureEvent } from '@/types/events'
import { useMobileLayout } from '@/lib/contexts/mobile-layout-context'
import { cn } from '@/lib/utils'
import { useState, useRef, useCallback } from 'react'

interface MobileTemporalFeedProps {
  className?: string
  maxItems?: number
}

export function MobileTemporalFeed({ 
  className, 
  maxItems = 20 
}: MobileTemporalFeedProps) {
  const { shouldUseMobileLayout } = useMobileLayout()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const touchStartY = useRef<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    filteredEvents,
    refreshFeed
  } = useTemporalEvents({
    events: allTemporalEvents,
    maxItems,
    autoUpdate: true
  })

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await refreshFeed()
    setTimeout(() => setIsRefreshing(false), 1000)
  }, [refreshFeed])

  const handleEventAction = useCallback((action: string, event: PastEvent | LiveEvent | FutureEvent) => {
    console.log(`Mobile Action: ${action}`, event)
  }, [])

  // Pull to refresh handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const currentY = e.targetTouches[0].clientY
    const diff = currentY - touchStartY.current
    
    if (scrollRef.current && scrollRef.current.scrollTop === 0 && diff > 0) {
      setPullDistance(Math.min(diff * 0.5, 80))
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (pullDistance > 60) {
      handleRefresh()
    }
    setPullDistance(0)
  }, [pullDistance, handleRefresh])

  const renderEventCard = useCallback((event: PastEvent | LiveEvent | FutureEvent, index: number) => {
    const baseProps = {
      key: event.id,
      className: ""
    }

    switch (event.status) {
      case 'past':
        return (
          <motion.div
            {...baseProps}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
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
            transition={{ duration: 0.3, delay: index * 0.03 }}
          >
            <FutureEventCard
              event={event as FutureEvent}
              onMarkInterested={(e) => handleEventAction('interested', e)}
              onMarkGoing={(e) => handleEventAction('going', e)}
              onInviteFriends={(e) => handleEventAction('inviteFriends', e)}
            />
          </motion.div>
        )

      default:
        return null
    }
  }, [handleEventAction])

  // Only render if mobile layout
  if (!shouldUseMobileLayout) return null

  return (
    <div 
      ref={scrollRef}
      className={cn('w-full bg-white dark:bg-black min-h-screen', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div 
          className="flex items-center justify-center py-4 bg-gray-50 dark:bg-gray-900 transition-all duration-200"
          style={{ transform: `translateY(${pullDistance}px)` }}
        >
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            {isRefreshing ? 'Atualizando...' : pullDistance > 60 ? 'Solte para atualizar' : 'Puxe para atualizar'}
          </div>
        </div>
      )}

      {/* Instagram-style Mobile Feed */}
      <div className="space-y-0">
        {filteredEvents.map((event, index) => renderEventCard(event, index))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && !isRefreshing && (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Nenhum evento encontrado
          </h3>
          <p className="text-gray-500 text-base mb-6 max-w-sm">
            Puxe para baixo para atualizar ou tente novamente mais tarde
          </p>
          <button
            onClick={handleRefresh}
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold text-sm"
          >
            Atualizar Feed
          </button>
        </div>
      )}

      {/* Bottom spacing for mobile navigation */}
      <div className="h-20" />
    </div>
  )
} 