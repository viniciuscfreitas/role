import { motion } from 'framer-motion'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Users, MapPin, Calendar, Clock, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FutureEvent } from '@/types/events'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface FutureEventCardProps {
  event: FutureEvent
  onMarkInterested?: (event: FutureEvent) => void
  onMarkGoing?: (event: FutureEvent) => void
  onInviteFriends?: (event: FutureEvent) => void
  className?: string
}

export function FutureEventCard({ 
  event, 
  onMarkInterested, 
  onMarkGoing,
  onInviteFriends,
  className 
}: FutureEventCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showHeart, setShowHeart] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')

  const handleDoubleClick = () => {
    setIsLiked(true)
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 1000)
  }

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const eventDate = new Date(event.startDate)
      const diff = eventDate.getTime() - now.getTime()

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h`)
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`)
        } else {
          setTimeLeft(`${minutes}m`)
        }
      } else {
        setTimeLeft('Começou!')
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [event.startDate])

  const getAnticipationColor = (level: number) => {
    if (level >= 80) return 'bg-purple-500'
    if (level >= 60) return 'bg-blue-500'
    if (level >= 40) return 'bg-green-500'
    return 'bg-gray-500'
  }

  const getAnticipationText = (level: number) => {
    if (level >= 80) return 'MUITO AGUARDADO'
    if (level >= 60) return 'AGUARDADO'
    if (level >= 40) return 'INTERESSE CRESCENTE'
    return 'NOVO EVENTO'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800', className)}
    >
      {/* Instagram Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={event.organizer.image} alt={event.organizer.name} />
            <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
              {event.organizer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm text-gray-900 dark:text-white">
              {event.organizer.name}
            </span>
            {event.organizer.verified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">
              {formatDistanceToNow(event.startDate, { addSuffix: true, locale: ptBR })}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-1">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </Button>
      </div>

      {/* Instagram Image */}
      <div className="relative aspect-square" onDoubleClick={handleDoubleClick}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        
        {/* Future Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-blue-500 text-white border-none text-xs px-2 py-1">
            📅 PRÓXIMO
          </Badge>
        </div>

        {/* Anticipation Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={cn(
            'text-white border-none text-xs px-2 py-1',
            getAnticipationColor(event.anticipationLevel)
          )}>
            {getAnticipationText(event.anticipationLevel)}
          </Badge>
        </div>

        {/* Countdown Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/70 rounded-lg px-2 py-1">
          <div className="flex items-center gap-1 text-white">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-semibold">
              {timeLeft}
            </span>
          </div>
        </div>

        {/* Expected Attendees */}
        <div className="absolute bottom-3 right-3 bg-black/70 rounded-lg px-2 py-1">
          <div className="flex items-center gap-1 text-white">
            <Users className="w-3 h-3" />
            <span className="text-xs font-semibold">
              {event.expectedAttendees}+ interessados
            </span>
          </div>
        </div>

        {/* Double-tap heart animation */}
        {showHeart && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Heart className="w-20 h-20 text-red-500 fill-red-500" />
          </motion.div>
        )}
      </div>

      {/* Instagram Actions */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 hover:bg-transparent"
            onClick={() => {
              setIsLiked(!isLiked)
              onMarkInterested?.(event)
            }}
          >
            <Heart 
              className={cn(
                'w-6 h-6 transition-colors',
                isLiked ? 'text-red-500 fill-red-500' : 'text-gray-900 dark:text-white'
              )} 
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 hover:bg-transparent"
          >
            <MessageCircle className="w-6 h-6 text-gray-900 dark:text-white" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 hover:bg-transparent"
            onClick={() => onInviteFriends?.(event)}
          >
            <Send className="w-6 h-6 text-gray-900 dark:text-white" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 hover:bg-transparent"
          onClick={() => {
            setIsSaved(!isSaved)
            onMarkGoing?.(event)
          }}
        >
          <Bookmark 
            className={cn(
              'w-6 h-6 transition-colors',
              isSaved ? 'text-gray-900 dark:text-white fill-gray-900 dark:fill-white' : 'text-gray-900 dark:text-white'
            )} 
          />
        </Button>
      </div>

      {/* Instagram Engagement */}
      <div className="px-3 pb-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900 dark:text-white">
            {event.expectedAttendees.toLocaleString()} pessoas interessadas
          </span>
          {event.anticipationLevel >= 80 && (
            <Badge className="bg-purple-100 text-purple-700 text-xs px-1 py-0">
              TRENDING
            </Badge>
          )}
        </div>
      </div>

      {/* Instagram Caption */}
      <div className="px-3 pb-2">
        <div className="text-sm">
          <span className="font-semibold text-gray-900 dark:text-white mr-2">
            {event.organizer.name}
          </span>
          <span className="text-gray-900 dark:text-white">
            {event.title}
          </span>
        </div>
        <p className="text-sm text-gray-900 dark:text-white mt-1 line-clamp-2">
          {event.description}
        </p>
        
        {/* Event Details */}
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.startDate).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      {/* Friends Going Preview */}
      {event.friendsGoing && event.friendsGoing.length > 0 && (
        <div className="px-3 pb-2">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {event.friendsGoing.slice(0, 3).map((friend) => (
                <Avatar key={friend.id} className="w-6 h-6 border-2 border-white">
                  <AvatarImage src={friend.image} alt={friend.name} />
                  <AvatarFallback className="text-xs bg-gray-200">
                    {friend.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-gray-900 dark:text-white">
              <span className="font-semibold">{event.friendsGoing[0].name}</span>
              {event.friendsGoing.length > 1 && (
                <span> e mais {event.friendsGoing.length - 1} amigos vão participar</span>
              )}
              {event.friendsGoing.length === 1 && (
                <span> vai participar</span>
              )}
            </span>
          </div>
        </div>
      )}

      {/* Planning Groups */}
      {event.planningGroups && event.planningGroups.length > 0 && (
        <div className="px-3 pb-2">
          <div className="text-sm">
            <span className="font-semibold text-gray-900 dark:text-white mr-2">
              Grupos de planejamento:
            </span>
            {event.planningGroups.slice(0, 2).map((group, index) => (
              <span key={group.id} className="text-blue-600 dark:text-blue-400">
                {group.name}
                {index < Math.min(event.planningGroups!.length, 2) - 1 && ', '}
              </span>
            ))}
            {event.planningGroups.length > 2 && (
              <span className="text-gray-500"> +{event.planningGroups.length - 2} mais</span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-3 pb-3 space-y-2">
        {/* Primary Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onMarkInterested?.(event)}
            variant="outline"
            className="flex-1 text-sm"
          >
            <Heart className="w-4 h-4 mr-1" />
            Interessado
          </Button>
          <Button
            onClick={() => onMarkGoing?.(event)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Vou participar
          </Button>
        </div>

        {/* Secondary Action */}
        <Button
          variant="ghost"
          onClick={() => onInviteFriends?.(event)}
          className="w-full text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/20"
        >
          Convidar amigos
        </Button>
      </div>
    </motion.div>
  )
} 