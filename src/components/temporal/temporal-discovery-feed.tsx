'use client'

import { motion } from 'framer-motion'
import { PastEventCard } from './past-event-card'
import { LiveEventCard } from './live-event-card'
import { FutureEventCard } from './future-event-card'
import { useTemporalEvents } from '@/lib/hooks/use-temporal-events'
import { allTemporalEvents } from '@/lib/data/temporal-events-mock'
import { PastEvent, LiveEvent, FutureEvent } from '@/types/events'
import { cn } from '@/lib/utils'

interface TemporalDiscoveryFeedProps {
  className?: string
  maxItems?: number
}

export function TemporalDiscoveryFeed({ 
  className, 
  maxItems = 20 
}: TemporalDiscoveryFeedProps) {
  const {
    filteredEvents
  } = useTemporalEvents({
    events: allTemporalEvents,
    maxItems,
    autoUpdate: true
  })

  const handleEventAction = (action: string, event: PastEvent | LiveEvent | FutureEvent) => {
    console.log(`Action: ${action}`, event)
    // Aqui você implementaria as ações reais (navegação, API calls, etc.)
  }

  const renderEventCard = (event: PastEvent | LiveEvent | FutureEvent, index: number) => {
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
            transition={{ duration: 0.4, delay: index * 0.05 }}
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
            transition={{ duration: 0.4, delay: index * 0.05 }}
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
            transition={{ duration: 0.4, delay: index * 0.05 }}
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
  }

  return (
    <div className={cn('w-full max-w-md mx-auto bg-white dark:bg-black', className)}>
      {/* Instagram-style Feed */}
      <div className="space-y-0">
        {filteredEvents.map((event, index) => renderEventCard(event, index))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Nenhum evento encontrado
          </h3>
          <p className="text-gray-500 text-sm">
            Tente ajustar seus filtros ou volte mais tarde
          </p>
        </div>
      )}
    </div>
  )
} 