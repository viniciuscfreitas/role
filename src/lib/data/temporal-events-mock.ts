import { 
  PastEvent, 
  LiveEvent, 
  FutureEvent, 
  TemporalEvent,
  User,
  Review,
  Highlight,
  LiveUpdate,
  PlanningGroup
} from '@/types/events'

// Mock users
const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Ana Silva',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=150&h=150&fit=crop&crop=face',
    verified: true
  },
  {
    id: 'u2',
    name: 'Carlos Santos',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: false
  },
  {
    id: 'u3',
    name: 'Maria Costa',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    verified: true
  },
  {
    id: 'u4',
    name: 'João Oliveira',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: false
  },
  {
    id: 'u5',
    name: 'Festival Music',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    verified: true
  }
]

// Mock reviews
const mockReviews: Review[] = [
  {
    id: 'r1',
    user: mockUsers[1],
    rating: 5,
    comment: 'Evento incrível! A organização estava perfeita e a música estava demais. Já quero o próximo! 🎵',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    likes: 24,
    isLiked: false
  },
  {
    id: 'r2',
    user: mockUsers[2],
    rating: 4,
    comment: 'Muito bom! Só achei que poderia ter mais variedade de comida, mas a experiência geral foi ótima.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    likes: 12,
    isLiked: true
  },
  {
    id: 'r3',
    user: mockUsers[3],
    rating: 5,
    comment: 'Networking fantástico! Conheci várias pessoas interessantes e fiz conexões valiosas para minha carreira.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    likes: 18,
    isLiked: false
  }
]

// Mock highlights
const mockHighlights: Highlight[] = [
  {
    id: 'h1',
    type: 'photo',
    content: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    user: mockUsers[0],
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    likes: 89,
    isLiked: true
  },
  {
    id: 'h2',
    type: 'moment',
    content: 'Momento épico quando o DJ tocou aquela música que todo mundo estava esperando! 🔥',
    user: mockUsers[1],
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    likes: 156,
    isLiked: false
  }
]

// Mock live updates
const mockLiveUpdates: LiveUpdate[] = [
  {
    id: 'lu1',
    type: 'checkin',
    content: 'Acabei de chegar! O ambiente está incrível! 🎉',
    user: mockUsers[2],
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    location: 'Entrada principal'
  },
  {
    id: 'lu2',
    type: 'announcement',
    content: 'Próxima apresentação em 10 minutos no palco principal!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: 'lu3',
    type: 'photo',
    content: 'A galera está animada! Vem todo mundo! 📸',
    user: mockUsers[1],
    timestamp: new Date(Date.now() - 8 * 60 * 1000)
  }
]

// Mock planning groups
const mockPlanningGroups: PlanningGroup[] = [
  {
    id: 'pg1',
    name: 'Galera do Tech',
    description: 'Grupo para ir juntos no evento de tecnologia',
    members: [mockUsers[0], mockUsers[3], mockUsers[1]],
    organizer: mockUsers[0],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    isPublic: true
  },
  {
    id: 'pg2',
    name: 'Amigos da Música',
    description: 'Vamos curtir o festival juntos!',
    members: [mockUsers[2], mockUsers[4]],
    organizer: mockUsers[2],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    isPublic: false
  }
]

// EVENTOS PASSADOS (20 eventos)
export const pastEvents: PastEvent[] = [
  {
    id: 'past1',
    status: 'past',
    title: 'Festival de Música Eletrônica 2024',
    description: 'O maior festival de música eletrônica da cidade com os melhores DJs nacionais e internacionais.',
    organizer: mockUsers[4],
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    location: 'Arena Eventos SP',
    coordinates: { lat: -23.5505, lng: -46.6333 },
    category: 'Música',
    price: 'R$ 120,00',
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    attendeeCount: 2500,
    reviews: [mockReviews[0], mockReviews[1]],
    highlights: mockHighlights,
    rating: 4.8,
    fomo: true,
    tags: ['eletrônica', 'festival', 'dj'],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'past2',
    status: 'past',
    title: 'Tech Meetup: IA e Futuro',
    description: 'Discussões sobre inteligência artificial e suas aplicações no mercado brasileiro.',
    organizer: mockUsers[3],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    location: 'Innovation Hub',
    coordinates: { lat: -23.5489, lng: -46.6388 },
    category: 'Tecnologia',
    price: 'Gratuito',
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
    attendeeCount: 150,
    reviews: [mockReviews[2]],
    highlights: [],
    rating: 4.6,
    fomo: false,
    tags: ['tecnologia', 'ia', 'networking'],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'past3',
    status: 'past',
    title: 'Noite de Stand-up Comedy',
    description: 'Uma noite hilária com os melhores comediantes da cidade.',
    organizer: mockUsers[0],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    location: 'Teatro Municipal',
    coordinates: { lat: -23.5454, lng: -46.6394 },
    category: 'Entretenimento',
    price: 'R$ 45,00',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    attendeeCount: 300,
    reviews: [],
    highlights: [],
    rating: 4.2,
    fomo: true,
    tags: ['comédia', 'entretenimento', 'teatro'],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
]

// EVENTOS AO VIVO (5-8 eventos)
export const liveEvents: LiveEvent[] = [
  {
    id: 'live1',
    status: 'live',
    title: 'Happy Hour Networking',
    description: 'Networking descontraído com profissionais de diversas áreas. Drinks e petiscos inclusos.',
    organizer: mockUsers[0],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    location: 'Rooftop Bar Vila Madalena',
    coordinates: { lat: -23.5505, lng: -46.6905 },
    category: 'Networking',
    price: 'R$ 35,00',
    startDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    currentAttendees: 45,
    maxAttendees: 80,
    liveUpdates: mockLiveUpdates,
    urgencyLevel: 'medium',
    timeRemaining: 120,
    lastActivity: new Date(Date.now() - 5 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: 'live2',
    status: 'live',
    title: 'Workshop de Fotografia',
    description: 'Aprenda técnicas avançadas de fotografia urbana com profissionais renomados.',
    organizer: mockUsers[2],
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
    location: 'Estúdio Criativo',
    coordinates: { lat: -23.5615, lng: -46.6565 },
    category: 'Educação',
    price: 'R$ 80,00',
    startDate: new Date(Date.now() - 30 * 60 * 1000),
    endDate: new Date(Date.now() + 30 * 60 * 1000),
    currentAttendees: 18,
    maxAttendees: 20,
    liveUpdates: [
      {
        id: 'lu4',
        type: 'announcement',
        content: 'Últimas vagas disponíveis! Apenas 2 lugares restantes.',
        timestamp: new Date(Date.now() - 10 * 60 * 1000)
      }
    ],
    urgencyLevel: 'high',
    timeRemaining: 30,
    lastActivity: new Date(Date.now() - 2 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 1000)
  },
  {
    id: 'live3',
    status: 'live',
    title: 'Feira de Artesanato Local',
    description: 'Feira com produtos artesanais de produtores locais. Música ao vivo e food trucks.',
    organizer: mockUsers[1],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    location: 'Praça da República',
    coordinates: { lat: -23.5431, lng: -46.6291 },
    category: 'Cultura',
    price: 'Gratuito',
    startDate: new Date(Date.now() - 4 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
    currentAttendees: 200,
    liveUpdates: [
      {
        id: 'lu5',
        type: 'activity',
        content: 'Apresentação de música ao vivo começando agora no palco central!',
        timestamp: new Date(Date.now() - 15 * 60 * 1000)
      }
    ],
    urgencyLevel: 'low',
    timeRemaining: 240,
    lastActivity: new Date(Date.now() - 15 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 60 * 1000)
  }
]

// EVENTOS FUTUROS (30 eventos)
export const futureEvents: FutureEvent[] = [
  {
    id: 'future1',
    status: 'upcoming',
    title: 'Conferência de Startups 2024',
    description: 'O maior evento de empreendedorismo do país. Palestrantes internacionais, networking e pitch de startups.',
    organizer: mockUsers[3],
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    location: 'Centro de Convenções Anhembi',
    coordinates: { lat: -23.5154, lng: -46.6166 },
    category: 'Negócios',
    price: 'R$ 250,00',
    earlyBirdPrice: 'R$ 180,00',
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000),
    expectedAttendees: 1500,
    maxAttendees: 2000,
    confirmedAttendees: 847,
    interestedCount: 1203,
    friendsGoing: [mockUsers[0], mockUsers[2]],
    planningGroups: [mockPlanningGroups[0]],
    countdown: 2 * 24 * 60 * 60 * 1000,
    anticipationLevel: 85,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'future2',
    status: 'upcoming',
    title: 'Festival de Comida de Rua',
    description: 'Sabores únicos dos melhores food trucks da cidade. Música ao vivo e ambiente familiar.',
    organizer: mockUsers[1],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    location: 'Parque Ibirapuera',
    coordinates: { lat: -23.5873, lng: -46.6573 },
    category: 'Gastronomia',
    price: 'Gratuito',
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000),
    expectedAttendees: 3000,
    confirmedAttendees: 1250,
    interestedCount: 2100,
    friendsGoing: [mockUsers[4]],
    planningGroups: [mockPlanningGroups[1]],
    countdown: 7 * 24 * 60 * 60 * 1000,
    anticipationLevel: 72,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'future3',
    status: 'upcoming',
    title: 'Maratona de Programação',
    description: '48 horas de coding intensivo. Prêmios incríveis e oportunidades de carreira.',
    organizer: mockUsers[0],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    location: 'Campus USP',
    coordinates: { lat: -23.5558, lng: -46.7319 },
    category: 'Tecnologia',
    price: 'R$ 50,00',
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
    expectedAttendees: 200,
    maxAttendees: 300,
    confirmedAttendees: 156,
    interestedCount: 89,
    friendsGoing: [mockUsers[3]],
    planningGroups: [],
    countdown: 14 * 24 * 60 * 60 * 1000,
    anticipationLevel: 68,
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'future4',
    status: 'upcoming',
    title: 'Show Acústico Intimista',
    description: 'Noite especial com artistas locais em ambiente aconchegante. Limitado a 50 pessoas.',
    organizer: mockUsers[2],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    location: 'Café Cultural',
    coordinates: { lat: -23.5505, lng: -46.6333 },
    category: 'Música',
    price: 'R$ 40,00',
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    expectedAttendees: 50,
    maxAttendees: 50,
    confirmedAttendees: 42,
    interestedCount: 78,
    friendsGoing: [],
    planningGroups: [],
    countdown: 3 * 24 * 60 * 60 * 1000,
    anticipationLevel: 90,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'future5',
    status: 'upcoming',
    title: 'Workshop de Yoga ao Ar Livre',
    description: 'Sessão de yoga matinal no parque. Todos os níveis são bem-vindos.',
    organizer: mockUsers[4],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    location: 'Parque Villa-Lobos',
    coordinates: { lat: -23.5447, lng: -46.7197 },
    category: 'Saúde',
    price: 'R$ 25,00',
    startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    expectedAttendees: 30,
    confirmedAttendees: 18,
    interestedCount: 45,
    friendsGoing: [mockUsers[0], mockUsers[1]],
    planningGroups: [],
    countdown: 1 * 24 * 60 * 60 * 1000,
    anticipationLevel: 55,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
]

// Combinar todos os eventos
export const allTemporalEvents: TemporalEvent[] = [
  ...pastEvents,
  ...liveEvents,
  ...futureEvents
]

// Função para obter eventos por estado
export function getEventsByState(state: 'past' | 'live' | 'upcoming'): TemporalEvent[] {
  return allTemporalEvents.filter(event => event.status === state)
}

// Função para obter eventos por categoria
export function getEventsByCategory(category: string): TemporalEvent[] {
  return allTemporalEvents.filter(event => 
    event.category.toLowerCase().includes(category.toLowerCase())
  )
}

// Função para obter eventos próximos (próximos 7 dias)
export function getUpcomingEvents(days: number = 7): FutureEvent[] {
  const cutoff = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  return futureEvents.filter(event => event.startDate <= cutoff)
}

// Função para obter eventos ao vivo com alta urgência
export function getHighUrgencyLiveEvents(): LiveEvent[] {
  return liveEvents.filter(event => event.urgencyLevel === 'high')
}

// Função para obter eventos com alto FOMO
export function getFOMOEvents(): PastEvent[] {
  return pastEvents.filter(event => event.fomo)
} 