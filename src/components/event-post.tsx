'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, MapPin, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface EventPost {
  id: string
  user: {
    id: string
    name: string
    image: string
    verified?: boolean
  }
  event: {
    title: string
    description: string
    date: Date
    location: string
    image: string
    attendees: number
    category: string
  }
  stats: {
    likes: number
    comments: number
    shares: number
  }
  isLiked: boolean
  isSaved: boolean
  createdAt: Date
}

interface EventPostProps {
  post: EventPost
}

export function EventPost({ post }: EventPostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [isSaved, setIsSaved] = useState(post.isSaved)
  const [likes, setLikes] = useState(post.stats.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      {/* Header do Post */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.user.image} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground text-sm">{post.user.name}</span>
              {post.user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: ptBR })}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Imagem do Evento */}
      <div className="relative aspect-square bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
          <Calendar className="w-20 h-20 text-muted-foreground" />
        </div>
        {/* Categoria Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
            {post.event.category}
          </span>
        </div>
      </div>

      {/* Ações do Post */}
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
            <button className="text-muted-foreground hover:text-foreground transition-colors">
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

        {/* Stats */}
        <div className="mb-3">
          <span className="font-semibold text-sm text-foreground">
            {likes} curtidas
          </span>
        </div>

        {/* Conteúdo do Evento */}
        <div className="mb-3">
          <h3 className="font-semibold text-foreground mb-1">{post.event.title}</h3>
          <p className="text-muted-foreground text-sm mb-3">{post.event.description}</p>
          
          {/* Detalhes do Evento */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              <span>{post.event.date.toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span>{post.event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Users className="w-4 h-4" />
              <span>{post.event.attendees} pessoas confirmadas</span>
            </div>
          </div>
        </div>

        {/* Botão de Participar */}
        <Button className="w-full" size="sm">
          Participar do evento
        </Button>

        {/* Comentários */}
        {post.stats.comments > 0 && (
          <button className="text-muted-foreground text-sm mt-3 hover:text-foreground transition-colors">
            Ver todos os {post.stats.comments} comentários
          </button>
        )}
      </div>
    </motion.article>
  )
} 