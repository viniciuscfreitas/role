'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useMobileLayout } from '@/lib/contexts/mobile-layout-context'

interface Comment {
  id: string
  user: {
    name: string
    image: string
    verified?: boolean
  }
  text: string
  timestamp: Date
  likes: number
  isLiked: boolean
  replies?: Comment[]
}

interface Post {
  id: string
  user: {
    name: string
    image: string
    verified?: boolean
    isFollowing?: boolean
  }
  images: string[]
  caption: string
  location?: string
  likes: number
  comments: Comment[]
  shares: number
  timestamp: Date
  isLiked?: boolean
  isSaved?: boolean
}

const mockComments: Comment[] = [
  {
    id: 'c1',
    user: {
      name: 'Carlos Santos',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    text: 'Que show incrível! 🔥',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    likes: 12,
    isLiked: false
  },
  {
    id: 'c2',
    user: {
      name: 'Maria Costa',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    text: 'Também estava lá! A energia estava incrível 💃',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    likes: 8,
    isLiked: true
  }
]

const photoPostsData: Post[] = [
  {
    id: 'p1',
    user: {
      name: 'Ana Silva',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=150&h=150&fit=crop&crop=face',
      verified: true,
      isFollowing: false
    },
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1080&h=1350&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1080&h=1350&fit=crop',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1080&h=1350&fit=crop'
    ],
    caption: 'Show incrível hoje! A energia estava contagiante 🎵✨ #música #festa #energia',
    location: 'Club Rooftop',
    likes: 142,
    comments: mockComments,
    shares: 8,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isLiked: false,
    isSaved: false
  },
  {
    id: 'p2',
    user: {
      name: 'Festival Music',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: false,
      isFollowing: true
    },
    images: [
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1080&h=1350&fit=crop'
    ],
    caption: 'Festival de música eletrônica foi demais! 🎧🔥 Próximo evento em Janeiro!',
    location: 'Arena Eventos',
    likes: 567,
    comments: [],
    shares: 34,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isLiked: true,
    isSaved: false
  },
  {
    id: 'p3',
    user: {
      name: 'Tech Events',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true,
      isFollowing: false
    },
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1080&h=1350&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1080&h=1350&fit=crop'
    ],
    caption: 'Networking incrível no Tech Meetup! Tantas conexões novas 💻🤝 #tech #networking',
    location: 'Innovation Hub',
    likes: 89,
    comments: [],
    shares: 15,
    timestamp: new Date(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000),
    isLiked: false,
    isSaved: true
  }
]

function MobileImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showHearts, setShowHearts] = useState<{x: number, y: number, id: number}[]>([])
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Touch gesture handling for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && images.length > 1) {
      nextImage()
    }
    if (isRightSwipe && images.length > 1) {
      prevImage()
    }
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const heartId = Date.now()
    setShowHearts(prev => [...prev, { x, y, id: heartId }])
    
    setTimeout(() => {
      setShowHearts(prev => prev.filter(heart => heart.id !== heartId))
    }, 1000)
  }

  return (
    <div className="relative aspect-square w-full">
      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt="Post"
        className="w-full h-full object-cover"
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Dots indicator - always visible on mobile */}
      {images.length > 1 && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex ? "bg-white" : "bg-white/50"
              )}
            />
          ))}
        </div>
      )}

      {/* Double-tap hearts animation */}
      <AnimatePresence>
        {showHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none"
            style={{ left: heart.x, top: heart.y }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function MobilePhotoPost({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isSaved, setIsSaved] = useState(post.isSaved || false)
  const [isFollowing, setIsFollowing] = useState(post.user.isFollowing || false)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-background border-b border-border/50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.user.image} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">{post.user.name}</span>
              {post.user.verified && (
                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
              )}
            </div>
            {post.location && (
              <span className="text-xs text-muted-foreground">{post.location}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isFollowing && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleFollow}
              className="h-7 px-3 text-xs"
            >
              Seguir
            </Button>
          )}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Image */}
      <MobileImageCarousel images={post.images} />

      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="h-8 w-8 p-0"
            >
              <Heart 
                className={cn(
                  "w-6 h-6 transition-colors",
                  isLiked ? "text-red-500 fill-red-500" : "text-foreground"
                )} 
              />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="h-8 w-8 p-0"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Share className="w-6 h-6" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="h-8 w-8 p-0"
          >
            <Bookmark 
              className={cn(
                "w-6 h-6 transition-colors",
                isSaved ? "text-foreground fill-foreground" : "text-foreground"
              )} 
            />
          </Button>
        </div>

        {/* Likes count */}
        <div className="mb-2">
          <span className="text-sm font-semibold">
            {post.likes + (isLiked ? 1 : 0)} curtidas
          </span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="text-sm">
            <span className="font-semibold mr-2">{post.user.name}</span>
            {post.caption}
          </span>
        </div>

        {/* Comments preview */}
        {post.comments.length > 0 && (
          <Button
            variant="ghost"
            onClick={() => setShowComments(!showComments)}
            className="h-auto p-0 text-muted-foreground text-sm mb-2"
          >
            Ver todos os {post.comments.length} comentários
          </Button>
        )}

        {/* Timestamp */}
        <div className="text-xs text-muted-foreground">
          {formatDistanceToNow(post.timestamp, { addSuffix: true, locale: ptBR })}
        </div>
      </div>
    </motion.article>
  )
}

export function MobileFeed() {
  const { shouldUseMobileLayout } = useMobileLayout()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const touchStartY = useRef<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Only render if mobile layout
  if (!shouldUseMobileLayout) return null

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.targetTouches[0].clientY
    const diff = currentY - touchStartY.current
    
    // Only trigger pull-to-refresh if at top of scroll
    if (scrollRef.current && scrollRef.current.scrollTop === 0 && diff > 0) {
      setPullDistance(Math.min(diff * 0.5, 80))
    }
  }

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      setIsRefreshing(true)
      // Simulate refresh
      setTimeout(() => {
        setIsRefreshing(false)
        setPullDistance(0)
      }, 1500)
    } else {
      setPullDistance(0)
    }
  }

  return (
    <div 
      ref={scrollRef}
      className="w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div 
          className="flex items-center justify-center py-4 transition-all duration-200"
          style={{ transform: `translateY(${pullDistance}px)` }}
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
            className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
          />
          <span className="ml-2 text-sm text-muted-foreground">
            {isRefreshing ? 'Atualizando...' : pullDistance > 60 ? 'Solte para atualizar' : 'Puxe para atualizar'}
          </span>
        </div>
      )}

      {photoPostsData.map((post) => (
        <MobilePhotoPost key={post.id} post={post} />
      ))}
    </div>
  )
} 