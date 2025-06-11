'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Clock } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mapEventsData = [
  {
    id: 'm1',
    title: 'Festa de Ano Novo 2025',
    description: 'A maior festa da cidade para receber 2025',
    organizer: {
      name: 'Ana Silva',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=150&h=150&fit=crop&crop=face'
    },
    location: {
      name: 'Club Rooftop',
      address: 'Rua das Flores, 123 - Vila Madalena',
      coordinates: { lat: -23.5489, lng: -46.6388 }
    },
    date: new Date('2024-12-31T22:00:00'),
    attendees: 250,
    category: 'Festa',
    price: 'R$ 80',
    distance: '2.3 km'
  },
  {
    id: 'm2',
    title: 'Tech Meetup Janeiro',
    description: 'Networking e palestras sobre tendências tech',
    organizer: {
      name: 'Tech Events',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    location: {
      name: 'Innovation Hub',
      address: 'Av. Paulista, 1000 - Bela Vista',
      coordinates: { lat: -23.5618, lng: -46.6563 }
    },
    date: new Date('2025-01-15T19:00:00'),
    attendees: 85,
    category: 'Networking',
    price: 'Gratuito',
    distance: '1.8 km'
  },
  {
    id: 'm3',
    title: 'Festival de Música Eletrônica',
    description: 'Os melhores DJs da cena eletrônica',
    organizer: {
      name: 'Festival Music',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    location: {
      name: 'Arena Eventos',
      address: 'Marginal Tietê, 500 - Barra Funda',
      coordinates: { lat: -23.5262, lng: -46.6694 }
    },
    date: new Date('2025-01-20T20:00:00'),
    attendees: 1200,
    category: 'Festival',
    price: 'R$ 120',
    distance: '5.2 km'
  },
  {
    id: 'm4',
    title: 'Workshop de Fotografia',
    description: 'Aprenda técnicas profissionais de fotografia',
    organizer: {
      name: 'Photo Academy',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    location: {
      name: 'Studio Creative',
      address: 'Rua Augusta, 890 - Consolação',
      coordinates: { lat: -23.5505, lng: -46.6333 }
    },
    date: new Date('2024-12-25T14:00:00'),
    attendees: 45,
    category: 'Workshop',
    price: 'R$ 150',
    distance: '3.1 km'
  }
]

function MapEventCard({ event }: { event: typeof mapEventsData[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="cursor-pointer"
    >
      <Card className="bg-card border border-border hover:shadow-lg transition-all duration-200">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={event.organizer.image} alt={event.organizer.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground">
                  {event.organizer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground text-sm">{event.organizer.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.distance}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {event.category}
            </Badge>
          </div>

          {/* Event Info */}
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-foreground mb-1">{event.title}</h3>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>

            {/* Location */}
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground text-sm">{event.location.name}</span>
              </div>
              <p className="text-xs text-muted-foreground ml-6">{event.location.address}</p>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs font-medium text-foreground">
                    {event.date.toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {event.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs font-medium text-foreground">{event.attendees}</p>
                  <p className="text-xs text-muted-foreground">confirmados</p>
                </div>
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-bold text-lg text-primary">{event.price}</span>
              </div>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Ver no mapa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function MapFeed() {
  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6 text-center"
      >
        <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center mb-4">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
            <p className="text-foreground font-semibold">Mapa Interativo</p>
            <p className="text-sm text-muted-foreground">Visualize eventos próximos a você</p>
          </div>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <MapPin className="h-4 w-4 mr-2" />
          Ativar localização
        </Button>
      </motion.div>

      {/* Events List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Eventos próximos</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            Ver todos
          </Button>
        </div>

        <div className="space-y-4">
          {mapEventsData.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <MapEventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-xl p-4"
      >
        <h3 className="font-semibold text-foreground mb-3">Filtros rápidos</h3>
        <div className="flex flex-wrap gap-2">
          {['Próximos', 'Gratuitos', 'Hoje', 'Este fim de semana', 'Música', 'Tech', 'Arte'].map((filter) => (
            <Badge 
              key={filter} 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {filter}
            </Badge>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 