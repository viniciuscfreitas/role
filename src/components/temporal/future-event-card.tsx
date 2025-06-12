import { motion } from 'framer-motion'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, MapPin, Clock, Users, Calendar, Star } from 'lucide-react'
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
  const [isInterested, setIsInterested] = useState(false)
  const [isGoing, setIsGoing] = useState(false)
  const [showHeart, setShowHeart] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')

  // Real-time countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const eventTime = event.startDate.getTime()
      const difference = eventTime - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

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

  const handleDoubleClick = () => {
    setIsInterested(true)
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 1000)
  }

  const getAnticipationBadge = (level: number) => {
    if (level >= 80) return { text: 'MUITO AGUARDADO', color: 'bg-gradient-to-r from-purple-500 to-pink-500' }
    if (level >= 60) return { text: 'AGUARDADO', color: 'bg-gradient-to-r from-blue-500 to-purple-500' }
    if (level >= 40) return { text: 'INTERESSANTE', color: 'bg-gradient-to-r from-green-500 to-blue-500' }
    return { text: 'NOVO', color: 'bg-gradient-to-r from-gray-500 to-gray-600' }
  }

  const anticipationBadge = getAnticipationBadge(event.anticipationLevel)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden',
        'border border-gray-100 dark:border-gray-800',
        // Future event gradient
        'bg-gradient-to-br from-violet-50/30 to-purple-50/30 dark:from-violet-950/20 dark:to-purple-950/20',
        className
      )}
    >
      {/* ROLE Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 ring-2 ring-violet-200 dark:ring-violet-700">
            <AvatarImage src={event.organizer.image} alt={event.organizer.name} />
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-500 text-white text-sm font-semibold">
              {event.organizer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm text-gray-900 dark:text-white">
              {event.organizer.name}
            </span>
            {event.organizer.verified && (
              <div className="w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-500 text-sm">
              {formatDistanceToNow(event.startDate, { addSuffix: true, locale: ptBR })}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Button>
      </div>

      {/* Enhanced Future Image */}
      <div className="relative aspect-square" onDoubleClick={handleDoubleClick}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        
        {/* Future Badge - ROLE Style */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-violet-500 text-white border-none text-xs px-3 py-1 rounded-full shadow-lg">
            📅 PRÓXIMO
          </Badge>
        </div>

        {/* Anticipation Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={cn(
            'text-white border-none text-xs px-3 py-1 rounded-full shadow-lg',
            anticipationBadge.color
          )}>
            <Star className="w-3 h-3 mr-1" />
            {anticipationBadge.text}
          </Badge>
        </div>

        {/* Countdown Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between">
          {/* Countdown Timer */}
          <div className="bg-black/80 rounded-lg px-3 py-1.5 backdrop-blur-sm">
            <div className="flex items-center gap-1 text-white text-xs">
              <Clock className="w-3 h-3" />
              <span className="font-semibold">
                {timeLeft}
              </span>
            </div>
          </div>

          {/* Interest Level */}
          <div className="bg-black/80 rounded-lg px-3 py-1.5 backdrop-blur-sm">
            <div className="flex items-center gap-1 text-white text-xs">
              <Users className="w-3 h-3" />
              <span className="font-semibold">
                {event.interestedCount} interessados
              </span>
            </div>
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
            <Heart className="w-20 h-20 text-violet-500 fill-violet-500 drop-shadow-lg" />
          </motion.div>
        )}
      </div>

      {/* Enhanced Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-5">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 hover:bg-transparent group"
            onClick={() => {
              setIsInterested(!isInterested)
              onMarkInterested?.(event)
            }}
          >
            <Heart 
              className={cn(
                'w-6 h-6 transition-all duration-200',
                isInterested 
                  ? 'text-violet-500 fill-violet-500 scale-110' 
                  : 'text-gray-700 dark:text-gray-300 group-hover:text-violet-500'
              )} 
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 hover:bg-transparent group"
          >
            <MessageCircle className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-violet-500 transition-colors" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 hover:bg-transparent group"
            onClick={() => onInviteFriends?.(event)}
          >
            <Send className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-violet-500 transition-colors" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 hover:bg-transparent group"
          onClick={() => {
            setIsGoing(!isGoing)
            onMarkGoing?.(event)
          }}
        >
          <Bookmark 
            className={cn(
              'w-6 h-6 transition-all duration-200',
              isGoing 
                ? 'text-violet-500 fill-violet-500' 
                : 'text-gray-700 dark:text-gray-300 group-hover:text-violet-500'
            )} 
          />
        </Button>
      </div>

      {/* Enhanced Engagement */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900 dark:text-white">
            {event.interestedCount.toLocaleString()} pessoas interessadas
          </span>
          {event.anticipationLevel >= 80 && (
            <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs px-2 py-0.5 rounded-full">
              Trending
            </Badge>
          )}
        </div>
      </div>

      {/* Enhanced Caption */}
      <div className="px-4 pb-3">
        <div className="text-sm">
          <span className="font-semibold text-gray-900 dark:text-white mr-2">
            {event.organizer.name}
          </span>
          <span className="text-gray-900 dark:text-white">
            {event.title}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
        
        {/* Location */}
        <div className="flex items-center gap-1 mt-3 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
      </div>

      {/* Friends Going Preview */}
      {event.friendsGoing.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {event.friendsGoing.slice(0, 3).map((friend) => (
                <Avatar key={friend.id} className="w-6 h-6 border-2 border-white dark:border-gray-900">
                  <AvatarImage src={friend.image} alt={friend.name} />
                  <AvatarFallback className="bg-violet-500 text-white text-xs">
                    {friend.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {event.friendsGoing.length === 1 
                ? `${event.friendsGoing[0].name} está interessado`
                : `${event.friendsGoing[0].name} e mais ${event.friendsGoing.length - 1} amigos estão interessados`
              }
            </span>
          </div>
        </div>
      )}

      {/* Planning Groups */}
      {event.planningGroups.length > 0 && (
        <div className="px-4 pb-3">
          <div className="text-sm text-gray-500 mb-2">
            Grupos de planejamento
          </div>
          
          {event.planningGroups.slice(0, 2).map((group) => (
            <div key={group.id} className="text-sm bg-violet-50 dark:bg-violet-950/20 rounded-lg p-3 mb-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-violet-700 dark:text-violet-300">
                  {group.name}
                </span>
                <Badge className="bg-violet-200 text-violet-700 dark:bg-violet-800 dark:text-violet-300 text-xs px-2 py-0.5 rounded-full">
                  {group.members.length} membros
                </Badge>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-xs">
                {group.description}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-4 pb-4 space-y-2">
        <div className="flex gap-2">
          <Button
            variant={isInterested ? "default" : "outline"}
            size="sm"
            className={cn(
              'flex-1 text-sm py-2 rounded-lg transition-all duration-200',
              isInterested 
                ? 'bg-violet-500 hover:bg-violet-600 text-white' 
                : 'border-violet-300 dark:border-violet-600 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/20'
            )}
            onClick={() => {
              setIsInterested(!isInterested)
              onMarkInterested?.(event)
            }}
          >
            <Heart className={cn('w-4 h-4 mr-1', isInterested && 'fill-current')} />
            {isInterested ? 'Interessado' : 'Interessado?'}
          </Button>
          <Button
            variant={isGoing ? "default" : "outline"}
            size="sm"
            className={cn(
              'flex-1 text-sm py-2 rounded-lg transition-all duration-200',
              isGoing 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'border-green-300 dark:border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20'
            )}
            onClick={() => {
              setIsGoing(!isGoing)
              onMarkGoing?.(event)
            }}
          >
            <Calendar className={cn('w-4 h-4 mr-1', isGoing && 'fill-current')} />
            {isGoing ? 'Vou participar' : 'Vou participar?'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
} 