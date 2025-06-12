import { motion } from 'framer-motion'
import { Users, MapPin, Clock, Zap, Navigation, Phone } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LiveEvent } from '@/types/events'
import { TemporalBadge } from './temporal-badge'
import { formatTimeRemaining } from '@/lib/utils/temporal-events'
import { cn } from '@/lib/utils'

interface LiveEventCardProps {
  event: LiveEvent
  onJoinNow?: (event: LiveEvent) => void
  onGetDirections?: (event: LiveEvent) => void
  onCallVenue?: (event: LiveEvent) => void
  className?: string
}

export function LiveEventCard({ 
  event, 
  onJoinNow, 
  onGetDirections,
  onCallVenue,
  className 
}: LiveEventCardProps) {
  const urgencyColors = {
    high: 'border-red-500 bg-red-50 dark:bg-red-950/20',
    medium: 'border-orange-500 bg-orange-50 dark:bg-orange-950/20',
    low: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
  }

  const urgencyTextColors = {
    high: 'text-red-600 dark:text-red-400',
    medium: 'text-orange-600 dark:text-orange-400',
    low: 'text-yellow-600 dark:text-yellow-400'
  }

  const getOccupancyPercentage = () => {
    if (!event.maxAttendees) return 0
    return Math.min(100, (event.currentAttendees / event.maxAttendees) * 100)
  }

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-orange-500'
    return 'bg-green-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className={cn('cursor-pointer', className)}
    >
      <Card className={cn(
        'bg-card border-2 hover:shadow-xl transition-all duration-200 overflow-hidden',
        urgencyColors[event.urgencyLevel]
      )}>
        <div className="relative">
          {/* Event Image with Live Overlay */}
          <div className="aspect-[16/9] relative overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            
            {/* Live overlay with pulsing effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            
            {/* Live badge with pulse animation */}
            <div className="absolute top-3 left-3 flex gap-2">
              <TemporalBadge state="live" size="md" />
              <Badge className={cn(
                'text-white border-white/50 text-xs font-bold',
                urgencyTextColors[event.urgencyLevel]
              )}>
                <Zap className="w-3 h-3 mr-1" />
                {event.urgencyLevel.toUpperCase()}
              </Badge>
            </div>

            {/* Time remaining */}
            <div className="absolute top-3 right-3 bg-black/70 rounded-lg px-3 py-1">
              <div className="flex items-center gap-1 text-white">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {event.timeRemaining ? formatTimeRemaining(event.timeRemaining) : 'Tempo indefinido'}
                </span>
              </div>
            </div>

            {/* Current attendees indicator */}
            <div className="absolute bottom-3 left-3 bg-black/70 rounded-lg px-3 py-1">
              <div className="flex items-center gap-2 text-white">
                <Users className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {event.currentAttendees} pessoas aqui
                </span>
                {event.maxAttendees && (
                  <div className="flex items-center gap-1">
                    <div className="w-12 h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          'h-full transition-all duration-300',
                          getOccupancyColor(getOccupancyPercentage())
                        )}
                        style={{ width: `${getOccupancyPercentage()}%` }}
                      />
                    </div>
                    <span className="text-xs">
                      {Math.round(getOccupancyPercentage())}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="w-10 h-10 ring-2 ring-red-500 ring-offset-2">
                  <AvatarImage src={event.organizer.image} alt={event.organizer.name} />
                  <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                    {event.organizer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-foreground text-sm truncate">
                      {event.organizer.name}
                    </span>
                    {event.organizer.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Organizando agora
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                {event.category}
              </Badge>
            </div>

            {/* Event Info */}
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-foreground text-lg leading-tight mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
              </div>

              {/* Location with urgency indicator */}
              <div className="flex items-center gap-2 text-sm">
                <MapPin className={cn('h-4 w-4', urgencyTextColors[event.urgencyLevel])} />
                <span className="truncate font-medium">{event.location}</span>
                {event.urgencyLevel === 'high' && (
                  <Badge className="bg-red-100 text-red-700 border-red-300 text-xs ml-auto">
                    ÚLTIMOS MINUTOS!
                  </Badge>
                )}
              </div>

              {/* Live Updates Preview */}
              {event.liveUpdates.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-foreground">
                      Atualizações ao vivo
                    </span>
                  </div>
                  <div className="space-y-1">
                    {event.liveUpdates.slice(0, 2).map((update) => (
                      <div key={update.id} className="text-sm text-muted-foreground">
                        <span className="font-medium">{update.user?.name || 'Organizador'}</span>: {update.content}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Urgency-based Action Buttons */}
              <div className="space-y-2 pt-2">
                {/* Primary CTA */}
                <Button
                  size="lg"
                  onClick={() => onJoinNow?.(event)}
                  className={cn(
                    'w-full font-bold text-base',
                    event.urgencyLevel === 'high' 
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                      : event.urgencyLevel === 'medium'
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  )}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {event.urgencyLevel === 'high' 
                    ? 'PARTICIPAR AGORA!' 
                    : 'Participar do evento'}
                </Button>

                {/* Secondary actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onGetDirections?.(event)}
                    className="flex-1"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Direções
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCallVenue?.(event)}
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar
                  </Button>
                </div>
              </div>

              {/* Urgency message */}
              {event.urgencyLevel === 'high' && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-sm text-red-700 dark:text-red-300 font-medium text-center">
                    ⚡ Evento terminando em breve! Não perca esta oportunidade!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
} 