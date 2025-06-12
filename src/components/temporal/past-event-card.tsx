import { motion } from 'framer-motion'
import { Star, Users, Eye, TrendingUp, MapPin, Calendar } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PastEvent } from '@/types/events'
import { TemporalBadge } from './temporal-badge'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface PastEventCardProps {
  event: PastEvent
  onViewDetails?: (event: PastEvent) => void
  onFindSimilar?: (event: PastEvent) => void
  className?: string
}

export function PastEventCard({ 
  event, 
  onViewDetails, 
  onFindSimilar,
  className 
}: PastEventCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < Math.floor(rating) 
            ? 'text-yellow-500 fill-yellow-500' 
            : i < rating 
            ? 'text-yellow-500 fill-yellow-500/50'
            : 'text-gray-300'
        )}
      />
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn('cursor-pointer', className)}
    >
      <Card className="bg-card border border-border hover:shadow-lg transition-all duration-200 overflow-hidden">
        <div className="relative">
          {/* Event Image */}
          <div className="aspect-[16/9] relative overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute top-3 left-3 flex gap-2">
              <TemporalBadge state="past" size="sm" />
              {event.fomo && (
                <Badge className="bg-orange-500 text-white border-orange-600 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  FOMO
                </Badge>
              )}
            </div>

            {/* Rating overlay */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/70 rounded-lg px-3 py-1">
              <div className="flex items-center gap-1">
                {renderStars(event.rating)}
              </div>
              <span className="text-white text-sm font-semibold">
                {event.rating.toFixed(1)}
              </span>
            </div>
          </div>

          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={event.organizer.image} alt={event.organizer.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground">
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
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDistanceToNow(event.endDate, { addSuffix: true, locale: ptBR })}
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

              {/* Location and Attendees */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{event.attendeeCount} pessoas foram</span>
                </div>
              </div>

              {/* Reviews Preview */}
              {event.reviews.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      Avaliações ({event.reviews.length})
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary h-auto p-0">
                      Ver todas
                    </Button>
                  </div>
                  
                  {/* Latest review */}
                  {event.reviews[0] && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={event.reviews[0].user.image} />
                          <AvatarFallback className="text-xs">
                            {event.reviews[0].user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{event.reviews[0].user.name}</span>
                        <div className="flex items-center gap-1">
                          {renderStars(event.reviews[0].rating)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.reviews[0].comment}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails?.(event)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver detalhes
                </Button>
                
                {event.fomo && (
                  <Button
                    size="sm"
                    onClick={() => onFindSimilar?.(event)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Eventos similares
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
} 