import { motion } from 'framer-motion'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Star, MapPin, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PastEvent } from '@/types/events'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { useState } from 'react'

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
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showHeart, setShowHeart] = useState(false)

  const handleDoubleClick = () => {
    setIsLiked(true)
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 1000)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-3 h-3',
          i < Math.floor(rating) 
            ? 'text-yellow-500 fill-yellow-500' 
            : 'text-gray-300'
        )}
      />
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden',
        'border border-gray-100 dark:border-gray-800',
        // Subtle past event styling
        'bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900',
        className
      )}
    >
      {/* ROLE Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 ring-2 ring-gray-200 dark:ring-gray-700">
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
              {formatDistanceToNow(event.endDate, { addSuffix: false, locale: ptBR })}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Button>
      </div>

      {/* Enhanced Image */}
      <div className="relative aspect-square" onDoubleClick={handleDoubleClick}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge - ROLE Style */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-gray-800/90 text-white border-none text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            ✨ FINALIZADO
          </Badge>
        </div>

        {/* FOMO Badge */}
        {event.fomo && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <TrendingUp className="w-3 h-3" />
              FOMO
            </Badge>
          </div>
        )}

        {/* Rating Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/80 rounded-lg px-3 py-1.5 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            {renderStars(event.rating)}
            <span className="text-white text-xs font-semibold ml-1">
              {event.rating.toFixed(1)}
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
            onClick={() => onViewDetails?.(event)}
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
            {event.attendeeCount.toLocaleString()} pessoas participaram
          </span>
          {event.fomo && (
            <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs px-2 py-0.5 rounded-full">
              Alta demanda
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

      {/* Reviews as "Comments" */}
      {event.reviews.length > 0 && (
        <div className="px-4 pb-3">
          <Button
            variant="ghost"
            className="p-0 h-auto text-sm text-gray-500 hover:bg-transparent hover:text-violet-500 transition-colors"
            onClick={() => onViewDetails?.(event)}
          >
            Ver todas as {event.reviews.length} avaliações
          </Button>
          
          {/* Latest review as comment */}
          {event.reviews[0] && (
            <div className="mt-2 text-sm">
              <span className="font-semibold text-gray-900 dark:text-white mr-2">
                {event.reviews[0].user.name}
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                {event.reviews[0].comment}
              </span>
              <div className="flex items-center gap-1 mt-1">
                {renderStars(event.reviews[0].rating)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* FOMO Action */}
      {event.fomo && (
        <div className="px-4 pb-4">
          <Button
            variant="ghost"
            className="p-0 h-auto text-sm text-orange-600 hover:bg-transparent font-semibold hover:text-orange-700 transition-colors"
            onClick={() => onFindSimilar?.(event)}
          >
            🔥 Encontrar eventos similares
          </Button>
        </div>
      )}
    </motion.div>
  )
} 