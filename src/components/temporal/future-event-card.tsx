import { motion } from 'framer-motion'
import { Users, MapPin, Calendar, Heart, Share2, Bookmark, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FutureEvent } from '@/types/events'
import { TemporalBadge } from './temporal-badge'
import { formatCountdown } from '@/lib/utils/temporal-events'
import { useEventCountdown } from '@/lib/hooks/use-temporal-events'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface FutureEventCardProps {
  event: FutureEvent
  onInterested?: (event: FutureEvent) => void
  onGoing?: (event: FutureEvent) => void
  onShare?: (event: FutureEvent) => void
  onSave?: (event: FutureEvent) => void
  onInviteFriends?: (event: FutureEvent) => void
  className?: string
}

export function FutureEventCard({ 
  event, 
  onInterested, 
  onGoing,
  onShare,
  onSave,
  onInviteFriends,
  className 
}: FutureEventCardProps) {
  const countdown = useEventCountdown(event)

  const getAnticipationColor = (level: number) => {
    if (level >= 80) return 'border-purple-500 bg-purple-50 dark:bg-purple-950/20'
    if (level >= 60) return 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
    if (level >= 40) return 'border-green-500 bg-green-50 dark:bg-green-950/20'
    return 'border-gray-500 bg-gray-50 dark:bg-gray-950/20'
  }

  const getAnticipationBadge = (level: number) => {
    if (level >= 80) return { label: 'MUITO AGUARDADO', color: 'bg-purple-500' }
    if (level >= 60) return { label: 'POPULAR', color: 'bg-blue-500' }
    if (level >= 40) return { label: 'INTERESSANTE', color: 'bg-green-500' }
    return null
  }

  const anticipationBadge = getAnticipationBadge(event.anticipationLevel)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn('cursor-pointer', className)}
    >
      <Card className={cn(
        'bg-card border hover:shadow-lg transition-all duration-200 overflow-hidden',
        getAnticipationColor(event.anticipationLevel)
      )}>
        <div className="relative">
          {/* Event Image */}
          <div className="aspect-[16/9] relative overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <TemporalBadge state="future" size="sm" />
              {anticipationBadge && (
                <Badge className={cn(anticipationBadge.color, 'text-white border-white/50 text-xs')}>
                  {anticipationBadge.label}
                </Badge>
              )}
            </div>

            {/* Countdown */}
            <div className="absolute top-3 right-3 bg-black/70 rounded-lg px-3 py-1">
              <div className="flex items-center gap-1 text-white">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {formatCountdown(countdown)}
                </span>
              </div>
            </div>

            {/* Social proof */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              {/* Friends going avatars */}
              {event.friendsGoing.length > 0 && (
                <div className="flex -space-x-2">
                  {event.friendsGoing.slice(0, 3).map((friend) => (
                    <Avatar key={friend.id} className="w-6 h-6 border-2 border-white">
                      <AvatarImage src={friend.image} alt={friend.name} />
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {friend.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {event.friendsGoing.length > 3 && (
                    <div className="w-6 h-6 bg-black/70 border-2 border-white rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        +{event.friendsGoing.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Interest indicator */}
              <div className="bg-black/70 rounded-lg px-2 py-1">
                <div className="flex items-center gap-1 text-white">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {event.confirmedAttendees + event.interestedCount}
                  </span>
                </div>
              </div>
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
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(event.startDate, { addSuffix: true, locale: ptBR })}
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

              {/* Location and Price */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  {event.earlyBirdPrice && (
                    <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                      Early Bird: {event.earlyBirdPrice}
                    </Badge>
                  )}
                  <span className="font-semibold">{event.price}</span>
                </div>
              </div>

              {/* Social Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-green-600">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">{event.confirmedAttendees} confirmados</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Heart className="h-4 w-4" />
                    <span className="font-medium">{event.interestedCount} interessados</span>
                  </div>
                </div>
                
                {event.friendsGoing.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    {event.friendsGoing.length === 1 
                      ? `${event.friendsGoing[0].name} vai`
                      : `${event.friendsGoing.length} amigos vão`
                    }
                  </div>
                )}
              </div>

              {/* Planning Groups Preview */}
              {event.planningGroups.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">
                      Grupos de planejamento
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary h-auto p-0">
                      Ver todos
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {event.planningGroups.slice(0, 2).map((group) => (
                      <div key={group.id} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">
                          {group.name} ({group.members.length} membros)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {/* Primary actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onGoing?.(event)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Vou participar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onInterested?.(event)}
                    className="flex-1"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Interessado
                  </Button>
                </div>

                {/* Secondary actions */}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onInviteFriends?.(event)}
                    className="flex-1"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Convidar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onShare?.(event)}
                    className="flex-1"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSave?.(event)}
                    className="px-3"
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Anticipation indicator */}
              {event.anticipationLevel >= 60 && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                  <p className="text-sm text-purple-700 dark:text-purple-300 font-medium text-center">
                    🔥 Este evento está gerando muito interesse! Garante sua vaga!
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