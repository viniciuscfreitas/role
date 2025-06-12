export type EventTemporalState = 'past' | 'live' | 'future'

export interface BaseEvent {
  id: string
  title: string
  description: string
  organizer: {
    name: string
    image: string
    verified?: boolean
  }
  image: string
  images?: string[]
  location: string
  coordinates?: {
    lat: number
    lng: number
  }
  category: string
  price: string
  createdAt: Date
  updatedAt: Date
}

export interface PastEvent extends BaseEvent {
  status: 'past'
  startDate: Date
  endDate: Date
  attendeeCount: number
  reviews: Review[]
  highlights: Highlight[]
  rating: number
  fomo: boolean // Se deve gerar FOMO para eventos similares
  tags: string[]
}

export interface LiveEvent extends BaseEvent {
  status: 'live'
  startDate: Date
  endDate: Date
  currentAttendees: number
  maxAttendees?: number
  liveUpdates: LiveUpdate[]
  urgencyLevel: 'high' | 'medium' | 'low'
  timeRemaining?: number // Em minutos
  lastActivity: Date
}

export interface FutureEvent extends BaseEvent {
  status: 'upcoming'
  startDate: Date
  endDate: Date
  expectedAttendees: number
  maxAttendees?: number
  confirmedAttendees: number
  interestedCount: number
  friendsGoing: User[]
  planningGroups: PlanningGroup[]
  countdown: number // Em milissegundos
  anticipationLevel: number // 0-100
  earlyBirdPrice?: string
}

export type TemporalEvent = PastEvent | LiveEvent | FutureEvent

export interface Review {
  id: string
  user: User
  rating: number // 1-5
  comment: string
  timestamp: Date
  likes: number
  isLiked: boolean
  images?: string[]
}

export interface Highlight {
  id: string
  type: 'photo' | 'video' | 'moment'
  content: string
  user: User
  timestamp: Date
  likes: number
  isLiked: boolean
}

export interface LiveUpdate {
  id: string
  type: 'checkin' | 'photo' | 'announcement' | 'activity'
  content: string
  user?: User
  timestamp: Date
  location?: string
}

export interface User {
  id: string
  name: string
  image: string
  verified?: boolean
  isFollowing?: boolean
}

export interface PlanningGroup {
  id: string
  name: string
  description: string
  members: User[]
  organizer: User
  createdAt: Date
  isPublic: boolean
}

export interface EventTemporalFeed {
  liveEvents: LiveEvent[]
  upcomingEvents: FutureEvent[]
  pastEvents: PastEvent[]
  algorithm: {
    prioritization: 'temporal' | 'proximity' | 'social' | 'personalized'
    timeContext: 'morning' | 'afternoon' | 'evening' | 'weekend'
    personalizedWeight: number
    locationWeight: number
  }
}

export interface TemporalFilters {
  timeRange: 'today' | 'this_week' | 'this_month' | 'all'
  category?: string
  distance?: number
  priceRange?: {
    min: number
    max: number
  }
  showPast: boolean
  showLive: boolean
  showFuture: boolean
}

export interface EventDiscoveryCard {
  event: TemporalEvent
  priority: number
  reason: string // Por que foi recomendado
  socialProof: {
    friendsGoing: User[]
    totalAttendees: number
    trending: boolean
  }
} 