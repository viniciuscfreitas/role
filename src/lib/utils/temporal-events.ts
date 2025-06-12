import { 
  TemporalEvent, 
  EventTemporalState, 
  LiveEvent, 
  FutureEvent, 
  PastEvent,
  EventTemporalFeed 
} from '@/types/events'

/**
 * Determina o estado temporal de um evento baseado nas datas
 */
export function getEventTemporalState(startDate: Date, endDate: Date): EventTemporalState {
  const now = new Date()
  
  if (now > endDate) {
    return 'past'
  }
  
  if (now >= startDate && now <= endDate) {
    return 'live'
  }
  
  return 'future'
}

/**
 * Verifica se um evento está acontecendo agora
 */
export function isEventLive(startDate: Date, endDate: Date): boolean {
  const now = new Date()
  return now >= startDate && now <= endDate
}

/**
 * Calcula tempo restante para um evento em minutos
 */
export function getTimeRemaining(endDate: Date): number {
  const now = new Date()
  const diffMs = endDate.getTime() - now.getTime()
  return Math.max(0, Math.floor(diffMs / (1000 * 60)))
}

/**
 * Calcula countdown para evento futuro em milissegundos
 */
export function getCountdown(startDate: Date): number {
  const now = new Date()
  const diffMs = startDate.getTime() - now.getTime()
  return Math.max(0, diffMs)
}

/**
 * Determina nível de urgência para eventos ao vivo
 */
export function getUrgencyLevel(timeRemaining: number): 'high' | 'medium' | 'low' {
  if (timeRemaining <= 30) return 'high'    // Menos de 30 min
  if (timeRemaining <= 120) return 'medium' // Menos de 2 horas
  return 'low'
}

/**
 * Calcula nível de antecipação para eventos futuros (0-100)
 */
export function getAnticipationLevel(
  startDate: Date, 
  confirmedAttendees: number, 
  interestedCount: number
): number {
  const now = new Date()
  const daysUntil = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  // Base score baseado em proximidade temporal
  let score = 0
  if (daysUntil <= 1) score = 90
  else if (daysUntil <= 3) score = 70
  else if (daysUntil <= 7) score = 50
  else if (daysUntil <= 30) score = 30
  else score = 10
  
  // Boost baseado em interesse social
  const socialBoost = Math.min(40, (confirmedAttendees + interestedCount) / 10)
  
  return Math.min(100, score + socialBoost)
}

/**
 * Determina contexto temporal do dia
 */
export function getTimeContext(): 'morning' | 'afternoon' | 'evening' | 'weekend' {
  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay()
  
  // Weekend (Sábado = 6, Domingo = 0)
  if (day === 0 || day === 6) return 'weekend'
  
  // Weekday
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  return 'evening'
}

/**
 * Classifica eventos por estado temporal
 */
export function classifyEventsByTemporal(events: TemporalEvent[]): {
  past: PastEvent[]
  live: LiveEvent[]
  future: FutureEvent[]
} {
  const past: PastEvent[] = []
  const live: LiveEvent[] = []
  const future: FutureEvent[] = []
  
  events.forEach(event => {
    switch (event.status) {
      case 'past':
        past.push(event as PastEvent)
        break
      case 'live':
        live.push(event as LiveEvent)
        break
      case 'upcoming':
        future.push(event as FutureEvent)
        break
    }
  })
  
  return { past, live, future }
}

/**
 * Ordena eventos por prioridade temporal
 */
export function sortEventsByTemporalPriority(events: TemporalEvent[]): TemporalEvent[] {
  return events.sort((a, b) => {
    // 1. Eventos ao vivo têm prioridade máxima
    if (a.status === 'live' && b.status !== 'live') return -1
    if (b.status === 'live' && a.status !== 'live') return 1
    
    // 2. Entre eventos ao vivo, ordenar por urgência
    if (a.status === 'live' && b.status === 'live') {
      const aLive = a as LiveEvent
      const bLive = b as LiveEvent
      const urgencyOrder = { high: 3, medium: 2, low: 1 }
      return urgencyOrder[bLive.urgencyLevel] - urgencyOrder[aLive.urgencyLevel]
    }
    
    // 3. Eventos futuros por proximidade
    if (a.status === 'upcoming' && b.status === 'upcoming') {
      return a.startDate.getTime() - b.startDate.getTime()
    }
    
    // 4. Eventos passados por recência
    if (a.status === 'past' && b.status === 'past') {
      return b.endDate.getTime() - a.endDate.getTime()
    }
    
    // 5. Futuros antes de passados
    if (a.status === 'upcoming' && b.status === 'past') return -1
    if (b.status === 'upcoming' && a.status === 'past') return 1
    
    return 0
  })
}

/**
 * Filtra eventos por proximidade temporal
 */
export function filterEventsByTimeRange(
  events: TemporalEvent[], 
  timeRange: 'today' | 'this_week' | 'this_month' | 'all'
): TemporalEvent[] {
  if (timeRange === 'all') return events
  
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  let cutoffDate: Date
  
  switch (timeRange) {
    case 'today':
      cutoffDate = new Date(today.getTime() + 24 * 60 * 60 * 1000)
      break
    case 'this_week':
      cutoffDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      break
    case 'this_month':
      cutoffDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
      break
    default:
      return events
  }
  
  return events.filter(event => {
    // Para eventos passados, mostrar apenas os recentes
    if (event.status === 'past') {
      return event.endDate >= today
    }
    
    // Para eventos futuros e ao vivo, filtrar por data de início
    return event.startDate <= cutoffDate
  })
}

/**
 * Cria feed temporal balanceado
 */
export function createTemporalFeed(
  events: TemporalEvent[],
  maxItems: number = 20
): EventTemporalFeed {
  const classified = classifyEventsByTemporal(events)
  const timeContext = getTimeContext()
  
  // Balanceamento baseado no contexto temporal
  let liveWeight = 0.3
  let futureWeight = 0.5
  let pastWeight = 0.2
  
  // Ajustar pesos baseado no horário
  if (timeContext === 'evening' || timeContext === 'weekend') {
    liveWeight = 0.4 // Mais eventos ao vivo à noite/fim de semana
    futureWeight = 0.4
    pastWeight = 0.2
  }
  
  const maxLive = Math.ceil(maxItems * liveWeight)
  const maxFuture = Math.ceil(maxItems * futureWeight)
  const maxPast = Math.ceil(maxItems * pastWeight)
  
  // Ordenar cada categoria
  const sortedLive = classified.live
    .sort((a, b) => {
      const urgencyOrder = { high: 3, medium: 2, low: 1 }
      return urgencyOrder[b.urgencyLevel] - urgencyOrder[a.urgencyLevel]
    })
    .slice(0, maxLive)
  
  const sortedFuture = classified.future
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, maxFuture)
  
  const sortedPast = classified.past
    .sort((a, b) => b.endDate.getTime() - a.endDate.getTime())
    .slice(0, maxPast)
  
  return {
    liveEvents: sortedLive,
    upcomingEvents: sortedFuture,
    pastEvents: sortedPast,
    algorithm: {
      prioritization: 'temporal',
      timeContext,
      personalizedWeight: 0.3,
      locationWeight: 0.2
    }
  }
}

/**
 * Formata tempo restante para display
 */
export function formatTimeRemaining(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min restantes`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (hours < 24) {
    return remainingMinutes > 0 
      ? `${hours}h ${remainingMinutes}min restantes`
      : `${hours}h restantes`
  }
  
  const days = Math.floor(hours / 24)
  const remainingHours = hours % 24
  
  return remainingHours > 0
    ? `${days}d ${remainingHours}h restantes`
    : `${days}d restantes`
}

/**
 * Formata countdown para display
 */
export function formatCountdown(milliseconds: number): string {
  const totalMinutes = Math.floor(milliseconds / (1000 * 60))
  
  if (totalMinutes < 60) {
    return `em ${totalMinutes}min`
  }
  
  const hours = Math.floor(totalMinutes / 60)
  if (hours < 24) {
    return `em ${hours}h`
  }
  
  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `em ${days}d`
  }
  
  const weeks = Math.floor(days / 7)
  if (weeks < 4) {
    return `em ${weeks}sem`
  }
  
  const months = Math.floor(days / 30)
  return `em ${months}mês`
} 