'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight, Smile, Flag, Link, Copy, AlertTriangle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { cn } from '@/lib/utils'

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
    timestamp: new Date('2024-12-20T21:00:00'),
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
    timestamp: new Date('2024-12-20T21:15:00'),
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
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=600&fit=crop'
    ],
    caption: 'Show incrível hoje! A energia estava contagiante 🎵✨ #música #festa #energia',
    location: 'Club Rooftop',
    likes: 142,
    comments: mockComments,
    shares: 8,
    timestamp: new Date('2024-12-20T20:30:00'),
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
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=600&fit=crop'
    ],
    caption: 'Festival de música eletrônica foi demais! 🎧🔥 Próximo evento em Janeiro!',
    location: 'Arena Eventos',
    likes: 567,
    comments: [],
    shares: 34,
    timestamp: new Date('2024-12-20T22:00:00'),
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
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=600&fit=crop'
    ],
    caption: 'Networking incrível no Tech Meetup! Tantas conexões novas 💻🤝 #tech #networking',
    location: 'Innovation Hub',
    likes: 89,
    comments: [],
    shares: 15,
    timestamp: new Date('2024-12-20T14:20:00'),
    isLiked: false,
    isSaved: true
  }
]

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showHearts, setShowHearts] = useState<{x: number, y: number, id: number}[]>([])
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const heartId = Date.now()
    setShowHearts(prev => [...prev, { x, y, id: heartId }])
    
    // Remove heart after animation
    setTimeout(() => {
      setShowHearts(prev => prev.filter(heart => heart.id !== heartId))
    }, 1000)
  }

  return (
    <div className="relative aspect-square group">
      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt="Post"
        className="w-full h-full object-cover cursor-pointer"
        onDoubleClick={handleDoubleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-white" : "bg-white/50"
              )}
            />
          ))}
        </div>
      )}

      {/* Double-click hearts */}
      <AnimatePresence>
        {showHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 0, y: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute pointer-events-none"
            style={{ left: heart.x - 15, top: heart.y - 15 }}
          >
            <Heart className="w-8 h-8 text-red-500 fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function PhotoPost({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isSaved, setIsSaved] = useState(post.isSaved || false)
  const [likes, setLikes] = useState(post.likes)
  const [isFollowing, setIsFollowing] = useState(post.user.isFollowing || false)
  const [newComment, setNewComment] = useState('')

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      setNewComment('')
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 cursor-pointer">
            <AvatarImage src={post.user.image} alt={post.user.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-white">
              {post.user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground text-sm cursor-pointer hover:text-primary transition-colors">
                {post.user.name}
              </span>
              {post.user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              {!isFollowing && (
                <>
                  <span className="text-muted-foreground mx-1">•</span>
                  <button
                    onClick={handleFollow}
                    className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors"
                  >
                    Seguir
                  </button>
                </>
              )}
            </div>
            {post.location && (
            <span className="text-xs text-muted-foreground">{post.location}</span>
            )}
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Copy className="w-4 h-4 mr-2" />
              Copiar link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-4 h-4 mr-2" />
              Ir para o post
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Flag className="w-4 h-4 mr-2" />
              Denunciar
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Deixar de seguir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Image Carousel */}
      <ImageCarousel images={post.images} />

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`transition-colors ${isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Share className="w-6 h-6" />
            </button>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={`transition-colors ${isSaved ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="font-semibold text-sm text-foreground cursor-pointer hover:text-primary transition-colors">
            {likes.toLocaleString()} curtidas
          </span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <p className="text-sm text-foreground">
            <span className="font-semibold mr-2 cursor-pointer hover:text-primary transition-colors">
              {post.user.name}
            </span>
            {post.caption}
          </p>
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <button 
            className="text-muted-foreground text-sm hover:text-foreground transition-colors mb-2 block"
          >
            Ver todos os {post.comments.length} comentários
          </button>
        )}

        {/* Add comment */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <Smile className="w-5 h-5 text-muted-foreground cursor-pointer" />
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Adicione um comentário..."
            className="border-none bg-transparent focus-visible:ring-0 p-0 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
          />
          {newComment.trim() && (
            <Button
              onClick={handleAddComment}
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 p-0 h-auto font-semibold text-sm"
            >
              Publicar
            </Button>
          )}
        </div>

        {/* Timestamp */}
        <div className="mt-2">
          <span className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            {Math.floor((Date.now() - post.timestamp.getTime()) / (1000 * 60 * 60))} horas atrás
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export function EventFeed() {
  return (
    <div className="space-y-6">
      {photoPostsData.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <PhotoPost post={post} />
        </motion.div>
      ))}

      {/* Load More */}
      <div className="text-center py-6">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Carregar mais posts
        </Button>
      </div>
    </div>
  )
} 