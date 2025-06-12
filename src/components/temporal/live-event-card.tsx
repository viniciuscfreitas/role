import { motion } from 'framer-motion'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Users, MapPin, Clock, Zap, Navigation, Phone } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LiveEvent } from '@/types/events'
import { formatTimeRemaining } from '@/lib/utils/temporal-events'
import { cn } from '@/lib/utils'
import { useState } from 'react'

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
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showHeart, setShowHeart] = useState(false)

  const handleDoubleClick = () => {
    setIsLiked(true)
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 1000)
  }

  const urgencyColors = {
    high: 'border-red-500',
    medium: 'border-orange-500', 
    low: 'border-yellow-500'
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
      className={cn(
        'bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800',
        urgencyColors[event.urgencyLevel],
        'border-l-4',
        className
      )}
    >
      {/* Instagram Header with Live Indicator */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-8 h-8 ring-2 ring-red-500 ring-offset-1">
              <AvatarImage src={event.organizer.image} alt={event.organizer.name} />
              <AvatarFallback className="bg-red-500 text-white text-sm">
                {event.organizer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {/* Live indicator dot */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
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
            <span className="text-red-500 text-sm font-semibold animate-pulse">
              AO VIVO
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-1">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </Button>
      </div>

      {/* Instagram Image with Live Overlays */}
      <div className="relative aspect-square" onDoubleClick={handleDoubleClick}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        
        {/* Live Badge - Instagram Live Style */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-red-500 text-white border-none text-xs px-2 py-1 animate-pulse">
            🔴 AO VIVO
          </Badge>
        </div>

        {/* Urgency Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={cn(
            'text-white border-none text-xs px-2 py-1 flex items-center gap-1',
            event.urgencyLevel === 'high' ? 'bg-red-600' :
            event.urgencyLevel === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
          )}>
            <Zap className="w-3 h-3" />
            {event.urgencyLevel.toUpperCase()}
          </Badge>
        </div>

        {/* Time Remaining */}
        <div className="absolute bottom-3 right-3 bg-black/70 rounded-lg px-2 py-1">
          <div className="flex items-center gap-1 text-white">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-semibold">
              {event.timeRemaining ? formatTimeRemaining(event.timeRemaining) : '∞'}
            </span>
          </div>
        </div>

        {/* Current Attendees with Progress */}
        <div className="absolute bottom-3 left-3 bg-black/70 rounded-lg px-2 py-1">
          <div className="flex items-center gap-2 text-white">
            <Users className="w-3 h-3" />
            <span className="text-xs font-semibold">
              {event.currentAttendees}
            </span>
            {event.maxAttendees && (
              <div className="flex items-center gap-1">
                <div className="w-8 h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      'h-full transition-all duration-300',
                      getOccupancyColor(getOccupancyPercentage())
                    )}
                    style={{ width: `${getOccupancyPercentage()}%` }}
                  />
                </div>
              </div>
            )}
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
            onClick={() => setIsLiked(!isLiked)}
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
          >
            <Send className="w-6 h-6 text-gray-900 dark:text-white" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 hover:bg-transparent"
          onClick={() => setIsSaved(!isSaved)}
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
            {event.currentAttendees.toLocaleString()} pessoas aqui agora
          </span>
          {event.maxAttendees && getOccupancyPercentage() >= 90 && (
            <Badge className="bg-red-100 text-red-700 text-xs px-1 py-0">
              LOTADO
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
        
        {/* Location with urgency */}
        <div className="flex items-center gap-1 mt-2 text-sm">
          <MapPin className={cn(
            'w-4 h-4',
            event.urgencyLevel === 'high' ? 'text-red-500' : 'text-gray-500'
          )} />
          <span className={cn(
            event.urgencyLevel === 'high' ? 'text-red-500 font-semibold' : 'text-gray-500'
          )}>
            {event.location}
          </span>
          {event.urgencyLevel === 'high' && (
            <span className="text-red-500 text-xs font-bold animate-pulse ml-1">
              • ÚLTIMOS MINUTOS!
            </span>
          )}
        </div>
      </div>

      {/* Live Updates as "Comments" */}
      {event.liveUpdates.length > 0 && (
        <div className="px-3 pb-2">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500">
              Atualizações ao vivo
            </span>
          </div>
          
          {/* Latest updates as comments */}
          {event.liveUpdates.slice(0, 2).map((update) => (
            <div key={update.id} className="text-sm mb-1">
              <span className="font-semibold text-gray-900 dark:text-white mr-2">
                {update.user?.name || 'Organizador'}
              </span>
              <span className="text-gray-900 dark:text-white">
                {update.content}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Call-to-Action Buttons */}
      <div className="px-3 pb-3 space-y-2">
        {/* Primary CTA */}
        <Button
          onClick={() => onJoinNow?.(event)}
          className={cn(
            'w-full font-semibold',
            event.urgencyLevel === 'high' 
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          )}
        >
          {event.urgencyLevel === 'high' ? '🚨 PARTICIPAR AGORA!' : '🎉 Participar Agora'}
        </Button>

        {/* Secondary Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onGetDirections?.(event)}
            className="flex-1 text-xs"
          >
            <Navigation className="w-3 h-3 mr-1" />
            Direções
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCallVenue?.(event)}
            className="flex-1 text-xs"
          >
            <Phone className="w-3 h-3 mr-1" />
            Ligar
          </Button>
        </div>
      </div>
    </motion.div>
  )
} 