import { motion } from 'framer-motion'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, MapPin, Clock, Users, Phone, Navigation, Zap } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LiveEvent } from '@/types/events'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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

  const getUrgencyConfig = (urgency: 'high' | 'medium' | 'low') => {
    switch (urgency) {
      case 'high':
        return {
          borderColor: 'border-red-500',
          glowColor: 'shadow-red-500/20',
          bgGradient: 'bg-gradient-to-br from-red-50/30 to-orange-50/30 dark:from-red-950/20 dark:to-orange-950/20',
          buttonText: '🚨 PARTICIPAR AGORA!',
          buttonStyle: 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold shadow-lg animate-pulse'
        }
      case 'medium':
        return {
          borderColor: 'border-orange-500',
          glowColor: 'shadow-orange-500/15',
          bgGradient: 'bg-gradient-to-br from-orange-50/20 to-yellow-50/20 dark:from-orange-950/15 dark:to-yellow-950/15',
          buttonText: '⚡ Participar Agora',
          buttonStyle: 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold shadow-md'
        }
      case 'low':
        return {
          borderColor: 'border-green-500',
          glowColor: 'shadow-green-500/10',
          bgGradient: 'bg-gradient-to-br from-green-50/15 to-emerald-50/15 dark:from-green-950/10 dark:to-emerald-950/10',
          buttonText: '✨ Participar',
          buttonStyle: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium shadow-sm'
        }
    }
  }

  const urgencyConfig = getUrgencyConfig(event.urgencyLevel)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden',
        'border-l-4', urgencyConfig.borderColor,
        urgencyConfig.glowColor,
        urgencyConfig.bgGradient,
        className
      )}
    >
      {/* ROLE Header with Live Indicator */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-9 h-9 ring-2 ring-red-500">
              <AvatarImage src={event.organizer.image} alt={event.organizer.name} />
              <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500 text-white text-sm font-semibold">
                {event.organizer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {/* Live indicator dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
          </div>
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
              {formatDistanceToNow(event.startDate, { addSuffix: false, locale: ptBR })}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Button>
      </div>

      {/* Enhanced Live Image */}
      <div className="relative aspect-square" onDoubleClick={handleDoubleClick}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        
        {/* Live Badge - ROLE Style */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-red-500 text-white border-none text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
            🔴 AO VIVO
          </Badge>
        </div>

        {/* Urgency Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={cn(
            'text-white border-none text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg',
            event.urgencyLevel === 'high' && 'bg-gradient-to-r from-red-600 to-red-700 animate-pulse',
            event.urgencyLevel === 'medium' && 'bg-gradient-to-r from-orange-500 to-orange-600',
            event.urgencyLevel === 'low' && 'bg-gradient-to-r from-green-500 to-green-600'
          )}>
            <Zap className="w-3 h-3" />
            {event.urgencyLevel === 'high' && 'URGENTE'}
            {event.urgencyLevel === 'medium' && 'MODERADO'}
            {event.urgencyLevel === 'low' && 'TRANQUILO'}
          </Badge>
        </div>

        {/* Live Stats Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between">
          {/* Current Occupancy */}
          <div className="bg-black/80 rounded-lg px-3 py-1.5 backdrop-blur-sm">
            <div className="flex items-center gap-1 text-white text-xs">
              <Users className="w-3 h-3" />
              <span className="font-semibold">
                {event.currentAttendees}/{event.maxAttendees}
              </span>
            </div>
          </div>

          {/* Time Remaining */}
          <div className="bg-black/80 rounded-lg px-3 py-1.5 backdrop-blur-sm">
            <div className="flex items-center gap-1 text-white text-xs">
              <Clock className="w-3 h-3" />
              <span className="font-semibold">
                {Math.floor((event.endDate.getTime() - Date.now()) / (1000 * 60 * 60))}h restantes
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
            <Heart className="w-20 h-20 text-red-500 fill-red-500 drop-shadow-lg" />
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
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart 
              className={cn(
                'w-6 h-6 transition-all duration-200',
                isLiked 
                  ? 'text-red-500 fill-red-500 scale-110' 
                  : 'text-gray-700 dark:text-gray-300 group-hover:text-red-500'
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
          >
            <Send className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-violet-500 transition-colors" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 hover:bg-transparent group"
          onClick={() => setIsSaved(!isSaved)}
        >
          <Bookmark 
            className={cn(
              'w-6 h-6 transition-all duration-200',
              isSaved 
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
            {event.currentAttendees} pessoas participando agora
          </span>
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs px-2 py-0.5 rounded-full animate-pulse">
            AO VIVO
          </Badge>
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

      {/* Live Updates as "Comments" */}
      {event.liveUpdates.length > 0 && (
        <div className="px-4 pb-3">
          <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Atualizações ao vivo
          </div>
          
          {/* Latest update */}
          {event.liveUpdates[0] && (
            <div className="text-sm bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900 dark:text-white text-xs">
                  AGORA
                </span>
                <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  LIVE
                </Badge>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {event.liveUpdates[0].content}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Action Buttons */}
      <div className="px-4 pb-4 space-y-3">
        {/* Primary CTA */}
        <Button
          className={cn('w-full text-sm font-semibold py-3 rounded-xl', urgencyConfig.buttonStyle)}
          onClick={() => onJoinNow?.(event)}
        >
          {urgencyConfig.buttonText}
        </Button>

        {/* Secondary Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs py-2 rounded-lg border-gray-300 dark:border-gray-600 hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:border-violet-300 dark:hover:border-violet-600"
            onClick={() => onGetDirections?.(event)}
          >
            <Navigation className="w-3 h-3 mr-1" />
            Direções
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs py-2 rounded-lg border-gray-300 dark:border-gray-600 hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:border-violet-300 dark:hover:border-violet-600"
            onClick={() => onCallVenue?.(event)}
          >
            <Phone className="w-3 h-3 mr-1" />
            Ligar
          </Button>
        </div>
      </div>
    </motion.div>
  )
} 