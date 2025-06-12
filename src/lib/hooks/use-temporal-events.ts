import { useState, useEffect, useMemo } from 'react'
import { 
  TemporalEvent, 
  EventTemporalFeed, 
  TemporalFilters,
  LiveEvent,
  FutureEvent,
  PastEvent
} from '@/types/events'
import {
  createTemporalFeed,
  getEventTemporalState,
  getTimeRemaining,
  getCountdown,
  getUrgencyLevel,
  getAnticipationLevel,
  filterEventsByTimeRange,
  sortEventsByTemporalPriority
} from '@/lib/utils/temporal-events'

interface UseTemporalEventsOptions {
  events: TemporalEvent[]
  maxItems?: number
  autoUpdate?: boolean
  updateInterval?: number // em milissegundos
}

interface UseTemporalEventsReturn {
  temporalFeed: EventTemporalFeed
  filters: TemporalFilters
  setFilters: (filters: Partial<TemporalFilters>) => void
  filteredEvents: TemporalEvent[]
  liveEventsCount: number
  upcomingEventsCount: number
  pastEventsCount: number
  isLoading: boolean
  lastUpdated: Date
  refreshFeed: () => void
}

const DEFAULT_FILTERS: TemporalFilters = {
  timeRange: 'all',
  showPast: true,
  showLive: true,
  showFuture: true
}

export function useTemporalEvents({
  events,
  maxItems = 20,
  autoUpdate = true,
  updateInterval = 60000 // 1 minuto
}: UseTemporalEventsOptions): UseTemporalEventsReturn {
  const [filters, setFiltersState] = useState<TemporalFilters>(DEFAULT_FILTERS)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Atualizar estados temporais automaticamente
  useEffect(() => {
    if (!autoUpdate) return

    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, updateInterval)

    return () => clearInterval(interval)
  }, [autoUpdate, updateInterval])

  // Processar eventos com estados temporais atualizados
  const processedEvents = useMemo(() => {
    return events.map(event => {
      const currentState = getEventTemporalState(event.startDate, event.endDate)
      
      // Se o estado mudou, atualizar o evento
      if (event.status !== currentState) {
        const baseEvent = { ...event }
        
        switch (currentState) {
          case 'live':
            return {
              ...baseEvent,
              status: 'live' as const,
              currentAttendees: ('confirmedAttendees' in event ? event.confirmedAttendees : 0) || 0,
              liveUpdates: [],
              urgencyLevel: getUrgencyLevel(getTimeRemaining(event.endDate)),
              timeRemaining: getTimeRemaining(event.endDate),
              lastActivity: new Date()
            } as LiveEvent
            
          case 'future':
            return {
              ...baseEvent,
              status: 'upcoming' as const,
              expectedAttendees: ('currentAttendees' in event ? event.currentAttendees : 0) || 0,
              confirmedAttendees: ('currentAttendees' in event ? event.currentAttendees : 0) || 0,
              interestedCount: Math.floor(('currentAttendees' in event ? event.currentAttendees : 0) * 1.5) || 0,
              friendsGoing: [],
              planningGroups: [],
              countdown: getCountdown(event.startDate),
              anticipationLevel: getAnticipationLevel(
                event.startDate,
                ('confirmedAttendees' in event ? event.confirmedAttendees : 0) || 0,
                Math.floor(('currentAttendees' in event ? event.currentAttendees : 0) * 1.5) || 0
              )
            } as FutureEvent
            
          case 'past':
            return {
              ...baseEvent,
              status: 'past' as const,
              attendeeCount: ('currentAttendees' in event ? event.currentAttendees : 0) || 0,
              reviews: [],
              highlights: [],
              rating: 4.2 + Math.random() * 0.8, // Rating simulado
              fomo: Math.random() > 0.7, // 30% chance de FOMO
              tags: []
            } as PastEvent
        }
      }
      
      return event
    })
  }, [events, lastUpdated])

  // Criar feed temporal
  const temporalFeed = useMemo(() => {
    return createTemporalFeed(processedEvents, maxItems)
  }, [processedEvents, maxItems])

  // Aplicar filtros
  const filteredEvents = useMemo(() => {
    let filtered = processedEvents

    // Filtrar por range temporal
    filtered = filterEventsByTimeRange(filtered, filters.timeRange)

    // Filtrar por categoria
    if (filters.category) {
      filtered = filtered.filter(event => 
        event.category.toLowerCase().includes(filters.category!.toLowerCase())
      )
    }

    // Filtrar por estados temporais
    filtered = filtered.filter(event => {
      if (!filters.showPast && event.status === 'past') return false
      if (!filters.showLive && event.status === 'live') return false
      if (!filters.showFuture && event.status === 'upcoming') return false
      return true
    })

    // Filtrar por preço
    if (filters.priceRange) {
      filtered = filtered.filter(event => {
        const price = parseFloat(event.price.replace(/[^\d,]/g, '').replace(',', '.'))
        if (isNaN(price)) return true // Eventos gratuitos passam
        return price >= filters.priceRange!.min && price <= filters.priceRange!.max
      })
    }

    // Ordenar por prioridade temporal
    return sortEventsByTemporalPriority(filtered)
  }, [processedEvents, filters])

  // Contadores por estado
  const liveEventsCount = useMemo(() => 
    processedEvents.filter(e => e.status === 'live').length,
    [processedEvents]
  )

  const upcomingEventsCount = useMemo(() => 
    processedEvents.filter(e => e.status === 'upcoming').length,
    [processedEvents]
  )

  const pastEventsCount = useMemo(() => 
    processedEvents.filter(e => e.status === 'past').length,
    [processedEvents]
  )

  // Função para atualizar filtros
  const setFilters = (newFilters: Partial<TemporalFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }))
  }

  // Função para forçar refresh
  const refreshFeed = () => {
    setIsLoading(true)
    setLastUpdated(new Date())
    
    // Simular loading
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return {
    temporalFeed,
    filters,
    setFilters,
    filteredEvents,
    liveEventsCount,
    upcomingEventsCount,
    pastEventsCount,
    isLoading,
    lastUpdated,
    refreshFeed
  }
}

// Hook específico para eventos ao vivo
export function useLiveEvents(events: TemporalEvent[]) {
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([])

  useEffect(() => {
    const updateLiveEvents = () => {
      const live = events
        .filter(event => getEventTemporalState(event.startDate, event.endDate) === 'live')
        .map(event => ({
          ...event,
          status: 'live' as const,
          currentAttendees: ('confirmedAttendees' in event ? event.confirmedAttendees : 0) || 0,
          liveUpdates: [],
          urgencyLevel: getUrgencyLevel(getTimeRemaining(event.endDate)),
          timeRemaining: getTimeRemaining(event.endDate),
          lastActivity: new Date()
        })) as LiveEvent[]

      setLiveEvents(live)
    }

    updateLiveEvents()
    const interval = setInterval(updateLiveEvents, 30000) // Atualizar a cada 30s

    return () => clearInterval(interval)
  }, [events])

  return liveEvents
}

// Hook para countdown de eventos futuros
export function useEventCountdown(event: FutureEvent) {
  const [countdown, setCountdown] = useState(getCountdown(event.startDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(event.startDate))
    }, 1000) // Atualizar a cada segundo

    return () => clearInterval(interval)
  }, [event.startDate])

  return countdown
} 