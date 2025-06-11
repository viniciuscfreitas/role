'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Clock, Navigation, Filter, Search, LayoutGrid, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState, useCallback, useMemo } from 'react'
import { InteractiveMap } from '@/components/map/interactive-map'
import { AdvancedFilters, FilterOptions } from '@/components/map/advanced-filters'
import { SearchHighlight } from '@/components/map/search-highlight'
import { MapNotifications, useNotifications } from '@/components/map/map-notifications'
import { MapEvent, MapControls } from '@/types/maps'

const nearbyEvents: MapEvent[] = [
  {
    id: 'me1',
    title: 'Festa de Ano Novo 2025',
    organizer: 'Ana Silva',
    organizerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop',
    location: 'Club Rooftop - Vila Madalena',
    date: new Date('2024-12-31T22:00:00'),
    distance: 0.8,
    attendees: 250,
    category: 'Festa',
    price: 'R$ 80',
    coordinates: { lat: -23.5505, lng: -46.6333 }
  },
  {
    id: 'me2',
    title: 'Tech Meetup Janeiro',
    organizer: 'Tech Events SP',
    organizerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    location: 'Innovation Hub - Av. Paulista',
    date: new Date('2025-01-15T19:00:00'),
    distance: 1.2,
    attendees: 85,
    category: 'Networking',
    price: 'Gratuito',
    coordinates: { lat: -23.5618, lng: -46.6565 }
  },
  {
    id: 'me3',
    title: 'Festival de Música Eletrônica',
    organizer: 'Festival Music',
    organizerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
    location: 'Arena Eventos - Marginal Tietê',
    date: new Date('2025-01-20T20:00:00'),
    distance: 2.5,
    attendees: 1200,
    category: 'Festival',
    price: 'R$ 120',
    coordinates: { lat: -23.5129, lng: -46.6395 }
  },
  {
    id: 'me4',
    title: 'Workshop de Fotografia',
    organizer: 'Photo Academy',
    organizerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&h=300&fit=crop',
    location: 'Centro Cultural - Vila Olímpia',
    date: new Date('2025-01-25T14:00:00'),
    distance: 3.1,
    attendees: 45,
    category: 'Workshop',
    price: 'R$ 50',
    coordinates: { lat: -23.5955, lng: -46.6890 }
  },
  {
    id: 'me5',
    title: 'Stand-up Comedy Night',
    organizer: 'Comedy Club SP',
    organizerImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1585699475914-38e051d4530b?w=400&h=300&fit=crop',
    location: 'Comedy House - Pinheiros',
    date: new Date('2025-01-18T21:00:00'),
    distance: 1.8,
    attendees: 120,
    category: 'Comedy',
    price: 'R$ 30',
    coordinates: { lat: -23.5632, lng: -46.6950 }
  }
]

function EventCard({ event, onSelect, searchQuery = '' }: { event: MapEvent; onSelect: (event: MapEvent) => void; searchQuery?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={() => onSelect(event)}
    >
      <div className="aspect-[4/3] relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-black/70 text-white border-none text-xs">
            {event.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary/90 text-primary-foreground border-none text-xs">
            {event.price}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-green-600 text-white border-none text-xs">
            {event.distance} km
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 text-sm line-clamp-2">
          <SearchHighlight text={event.title} searchQuery={searchQuery} />
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="w-6 h-6">
            <AvatarImage src={event.organizerImage} alt={event.organizer} />
                                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {event.organizer.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            <SearchHighlight text={event.organizer} searchQuery={searchQuery} />
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{event.date.toLocaleDateString('pt-BR')}</span>
            <Clock className="h-3 w-3 ml-1" />
            <span>{event.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{event.attendees} participantes</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function MapPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>()
  const [mapControls, setMapControls] = useState<MapControls | null>(null)
  const [viewMode, setViewMode] = useState<'map' | 'grid' | 'split'>('split')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 200],
    distanceRange: [0, 10],
    dateRange: { start: null, end: null },
    timeOfDay: [],
    attendeesMin: 0,
    freeOnly: false
  })

  const { notifications, addNotification, removeNotification } = useNotifications()

  const categories = ['all', 'festa', 'networking', 'festival', 'workshop', 'comedy']

  // Sistema de filtros avançados
  const filteredEvents = useMemo(() => {
    return nearbyEvents.filter(event => {
      // Filtro de busca por texto
      const matchesSearch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase())

      // Filtro de categoria básica (pills)
      const matchesCategory = selectedCategory === 'all' || 
        event.category.toLowerCase() === selectedCategory

      // Filtros avançados
      const matchesAdvancedCategory = appliedFilters.categories.length === 0 || 
        appliedFilters.categories.includes(event.category.toLowerCase())

      // Filtro de preço
      const eventPrice = event.price === 'Gratuito' ? 0 : 
        parseInt(event.price.replace(/[^\d]/g, '')) || 0
      const matchesPrice = appliedFilters.freeOnly ? 
        event.price === 'Gratuito' : 
        eventPrice >= appliedFilters.priceRange[0] && eventPrice <= appliedFilters.priceRange[1]

      // Filtro de distância
      const matchesDistance = event.distance >= appliedFilters.distanceRange[0] && 
        event.distance <= appliedFilters.distanceRange[1]

      // Filtro de participantes mínimos
      const matchesAttendees = event.attendees >= appliedFilters.attendeesMin

      // Filtro de período do dia
      const matchesTimeOfDay = appliedFilters.timeOfDay.length === 0 || 
        appliedFilters.timeOfDay.some(timeSlot => {
          const hour = event.date.getHours()
          switch (timeSlot) {
            case 'morning': return hour >= 6 && hour < 12
            case 'afternoon': return hour >= 12 && hour < 18
            case 'evening': return hour >= 18 && hour < 24
            case 'late': return hour >= 0 && hour < 6
            default: return true
          }
        })

      return matchesSearch && matchesCategory && matchesAdvancedCategory && 
             matchesPrice && matchesDistance && matchesAttendees && matchesTimeOfDay
    })
  }, [searchQuery, selectedCategory, appliedFilters, nearbyEvents])

  const handleEventSelect = useCallback((event: MapEvent) => {
    setSelectedEventId(event.id)
  }, [])

  const handleMapReady = useCallback((controls: MapControls) => {
    setMapControls(controls)
  }, [])

  const handleMyLocation = () => {
    if (mapControls) {
      mapControls.showUserLocation()
    }
  }

  // Funções de filtros
  const handleFiltersChange = useCallback((filters: FilterOptions) => {
    setAppliedFilters(filters)
  }, [])

  const handleApplyFilters = useCallback(() => {
    setIsFiltersOpen(false)
    addNotification({
      type: 'success',
      title: 'Filtros aplicados',
      description: `${getActiveFiltersCount()} filtro${getActiveFiltersCount() > 1 ? 's' : ''} ativo${getActiveFiltersCount() > 1 ? 's' : ''}`
    })
  }, [])

  const handleResetFilters = useCallback(() => {
    setAppliedFilters({
      categories: [],
      priceRange: [0, 200],
      distanceRange: [0, 10],
      dateRange: { start: null, end: null },
      timeOfDay: [],
      attendeesMin: 0,
      freeOnly: false
    })
    addNotification({
      type: 'info',
      title: 'Filtros removidos',
      description: 'Todos os filtros foram limpos'
    })
  }, [])

  const getActiveFiltersCount = () => {
    let count = 0
    if (appliedFilters.categories.length > 0) count++
    if (appliedFilters.priceRange[0] > 0 || appliedFilters.priceRange[1] < 200) count++
    if (appliedFilters.distanceRange[1] < 10) count++
    if (appliedFilters.timeOfDay.length > 0) count++
    if (appliedFilters.attendeesMin > 0) count++
    if (appliedFilters.freeOnly) count++
    return count
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="bg-card/80 backdrop-  -sm border-b border-border p-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              Mapa de Eventos
            </h1>
            <p className="text-muted-foreground text-sm">Descubra eventos próximos a você</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Toggle View Mode */}
            <div className="flex border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'map' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('map')}
                className="px-2 py-1 h-auto"
                title="Somente Mapa"
              >
                <Map className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'split' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('split')}
                className="px-2 py-1 h-auto"
                title="Mapa + Lista"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-2 py-1 h-auto"
                title="Grade de Eventos"
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleMyLocation}>
              <Navigation className="h-4 w-4" />
              Minha localização
            </Button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar eventos ou locais..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2" 
            onClick={() => setIsFiltersOpen(true)}
          >
            <Filter className="h-4 w-4" />
            Filtros
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </div>
        
        {/* Category Pills */}
        <div className="space-y-2 mt-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap text-xs flex-shrink-0"
              >
                {category === 'all' ? 'Todos' : category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
          
          {/* Active Filters Indicator */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="h-3 w-3" />
              <span>{getActiveFiltersCount()} filtro{getActiveFiltersCount() > 1 ? 's' : ''} ativo{getActiveFiltersCount() > 1 ? 's' : ''}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleResetFilters}
                className="h-auto py-1 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
              >
                Limpar
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Map and Events Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Interactive Google Map */}
        {(viewMode === 'map' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'flex-1' : 'w-full'} relative`}>
            <InteractiveMap
              events={filteredEvents}
              selectedEventId={selectedEventId}
              onEventSelect={handleEventSelect}
              onMapReady={handleMapReady}
              className="w-full h-full"
            />
          </div>
        )}

        {/* Events Sidebar/Grid */}
        {(viewMode === 'grid' || viewMode === 'split') && (
          <div className={`${
            viewMode === 'split' 
              ? 'w-80 bg-card/80 backdrop-blur-sm border-l border-border' 
              : 'w-full bg-background'
          }`}>
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h2 className="font-semibold text-foreground">
                  Eventos Próximos ({filteredEvents.length})
                </h2>
                <Badge variant="secondary" className="text-xs">
                  5km de raio
                </Badge>
              </div>
              
              {viewMode === 'split' ? (
                // Sidebar Layout (Lista Vertical)
                <div className="space-y-3 overflow-y-auto scrollbar-hide flex-1">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                                               <EventCard event={event} onSelect={handleEventSelect} searchQuery={searchQuery} />
                    </motion.div>
                  ))}
                  
                  {filteredEvents.length === 0 && (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        Nenhum evento encontrado
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Grid Layout (Cards em Grid)
                <div className="overflow-y-auto scrollbar-hide flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <EventCard event={event} onSelect={handleEventSelect} searchQuery={searchQuery} />
                      </motion.div>
                    ))}
                  </div>
                  
                  {filteredEvents.length === 0 && (
                    <div className="text-center py-16">
                      <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg">
                        Nenhum evento encontrado
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={appliedFilters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      {/* Notifications */}
      <MapNotifications
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  )
} 