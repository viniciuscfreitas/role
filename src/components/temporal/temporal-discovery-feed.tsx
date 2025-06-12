'use client'

import { motion } from 'framer-motion'
import { RefreshCw, TrendingUp, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

  const handleEventAction = (action: string, event: PastEvent | LiveEvent | FutureEvent) => {
    console.log(`Action: ${action}`, event)
    // Aqui você implementaria as ações reais (navegação, API calls, etc.)
  }

  const renderEventCard = (event: PastEvent | LiveEvent | FutureEvent, index: number) => {
    const baseProps = {
      key: event.id,
      className: "mb-6"
    }

    switch (event.status) {
      case 'past':
        return (
          <motion.div
            {...baseProps}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
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
            transition={{ duration: 0.4, delay: index * 0.1 }}
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
            transition={{ duration: 0.4, delay: index * 0.1 }}
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
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Header com estatísticas */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card className="bg-gradient-to-r from-primary/5 to-purple/5 border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-foreground">
                Descobrir Eventos
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshFeed}
                disabled={isLoading}
                className="text-primary"
              >
                <RefreshCw className={cn('w-4 h-4 mr-2', isLoading && 'animate-spin')} />
                Atualizar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-muted-foreground">
                  <span className="font-semibold text-red-600">{liveEventsCount}</span> ao vivo
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 text-blue-500" />
                <span className="text-muted-foreground">
                  <span className="font-semibold text-blue-600">{upcomingEventsCount}</span> próximos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-muted-foreground">
                  <span className="font-semibold text-gray-600">{pastEventsCount}</span> passados
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filtros rápidos */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger 
              value="all"
              onClick={() => setFilters({ showPast: true, showLive: true, showFuture: true })}
              className="text-xs"
            >
              Todos
            </TabsTrigger>
            <TabsTrigger 
              value="live"
              onClick={() => setFilters({ showPast: false, showLive: true, showFuture: false })}
              className="text-xs"
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Ao Vivo
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming"
              onClick={() => setFilters({ showPast: false, showLive: false, showFuture: true })}
              className="text-xs"
            >
              Próximos
            </TabsTrigger>
            <TabsTrigger 
              value="past"
              onClick={() => setFilters({ showPast: true, showLive: false, showFuture: false })}
              className="text-xs"
            >
              Passados
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Filtros de tempo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={filters.timeRange === 'today' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ timeRange: 'today' })}
            className="text-xs"
          >
            Hoje
          </Button>
          <Button
            variant={filters.timeRange === 'this_week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ timeRange: 'this_week' })}
            className="text-xs"
          >
            Esta semana
          </Button>
          <Button
            variant={filters.timeRange === 'this_month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ timeRange: 'this_month' })}
            className="text-xs"
          >
            Este mês
          </Button>
          <Button
            variant={filters.timeRange === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ timeRange: 'all' })}
            className="text-xs"
          >
            Todos
          </Button>
          
          <div className="ml-auto">
            <Badge variant="secondary" className="text-xs">
              {filteredEvents.length} eventos
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Feed de eventos */}
      <div className="space-y-6">
        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum evento encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou verificar novamente mais tarde.
            </p>
            <Button onClick={refreshFeed} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar feed
            </Button>
          </motion.div>
        ) : (
          filteredEvents.map((event, index) => renderEventCard(event, index))
        )}
      </div>

      {/* Load more */}
      {filteredEvents.length > 0 && filteredEvents.length >= maxItems && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8"
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              // Implementar carregamento de mais eventos
              console.log('Load more events')
            }}
          >
            Carregar mais eventos
          </Button>
        </motion.div>
      )}
    </div>
  )
} 