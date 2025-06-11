'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Heart, Send, Volume2, VolumeX, Pause, Play } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigation } from '@/lib/contexts/navigation-context'

// Mock stories data
export const storiesData = [
  {
    id: '1',
    user: {
      name: 'Ana Silva',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=150&h=150&fit=crop&crop=face',
    },
    stories: [
      {
        id: '1-1',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T20:30:00'),
        text: 'Show incrível hoje! 🎵',
        duration: 5000
      },
      {
        id: '1-2', 
        type: 'image',
        content: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T21:15:00'),
        text: 'After party foi demais! 🔥',
        duration: 5000
      }
    ]
  },
  {
    id: '2',
    user: {
      name: 'Tech Events',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    stories: [
      {
        id: '2-1',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T14:20:00'),
        text: 'Networking incrível no Tech Meetup! 💻',
        duration: 5000
      }
    ]
  },
  {
    id: '3',
    user: {
      name: 'Festival Music',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    stories: [
      {
        id: '3-1',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T22:00:00'),
        text: 'Festival de música eletrônica 🎧',
        duration: 5000
      },
      {
        id: '3-2',
        type: 'image', 
        content: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T23:30:00'),
        text: 'Crowd incrível! 🙌',
        duration: 5000
      }
    ]
  },
  {
    id: '4',
    user: {
      name: 'João Pedro',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    },
    stories: [
      {
        id: '4-1',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T19:00:00'),
        text: 'Pôr do sol incrível hoje! 🌅',
        duration: 5000
      }
    ]
  },
  {
    id: '5',
    user: {
      name: 'Maria Costa',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    },
    stories: [
      {
        id: '5-1',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T18:30:00'),
        text: 'Dança é vida! 💃',
        duration: 5000
      },
      {
        id: '5-2',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1495374519711-e22c8b4596a0?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T18:45:00'),
        text: 'Apresentação incrível! 🎭',
        duration: 5000
      }
    ]
  },
  {
    id: '6',
    user: {
      name: 'Carlos Santos',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    stories: [
      {
        id: '6-1',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1519335337423-a3357c2cd12e?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T17:15:00'),
        text: 'Dia de treino! 💪',
        duration: 5000
      },
      {
        id: '6-2',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T17:30:00'),
        text: 'Novo recorde pessoal! 🏆',
        duration: 5000
      },
      {
        id: '6-3',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T17:45:00'),
        text: 'Finalizando com alongamento 🧘‍♂️',
        duration: 5000
      }
    ]
  },
  {
    id: '7',
    user: {
      name: 'Luiza Oliveira',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
    },
    stories: [
      {
        id: '7-1',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T16:00:00'),
        text: 'Cozinhando algo especial hoje! 👩‍🍳',
        duration: 5000
      }
    ]
  },
  {
    id: '8',
    user: {
      name: 'Pedro Alves',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    },
    stories: [
      {
        id: '8-1',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T15:30:00'),
        text: 'Codando novos projetos! 💻',
        duration: 5000
      },
      {
        id: '8-2',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop',
        timestamp: new Date('2024-12-20T15:45:00'),
        text: 'Bug resolvido! 🎉',
        duration: 5000
      }
    ]
  }
]

export function StoryViewer() {
  const { 
    isStoryViewerOpen, 
    setIsStoryViewerOpen, 
    currentStoryIndex, 
    setCurrentStoryIndex 
  } = useNavigation()
  
  const [currentStoryItemIndex, setCurrentStoryItemIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [message, setMessage] = useState('')
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right')

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const pausedTimeRef = useRef<number>(0)

  const currentUserStories = storiesData[currentStoryIndex]
  const currentStory = currentUserStories?.stories[currentStoryItemIndex]
  const storyDuration = currentStory?.duration || 5000

  // Progress timer management
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    
    startTimeRef.current = Date.now() - pausedTimeRef.current
    
    timerRef.current = setInterval(() => {
      if (!isPaused && !isPressed && !isTransitioning) {
        const elapsed = Date.now() - startTimeRef.current
        const newProgress = (elapsed / storyDuration) * 100
        
        setProgress(newProgress)
        
        if (newProgress >= 100) {
          nextStory()
        }
      }
    }, 50)
  }, [isPaused, isPressed, isTransitioning, storyDuration])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const pauseTimer = useCallback(() => {
    pausedTimeRef.current = Date.now() - startTimeRef.current
    stopTimer()
  }, [stopTimer])

  const resumeTimer = useCallback(() => {
    startTimer()
  }, [startTimer])

  // Initialize timer when story changes
  useEffect(() => {
    if (!isStoryViewerOpen || !currentStory || isTransitioning) return

    setProgress(0)
    pausedTimeRef.current = 0
    startTimer()

    return () => stopTimer()
  }, [isStoryViewerOpen, currentStoryIndex, currentStoryItemIndex, startTimer, stopTimer, isTransitioning])

  // Pause/Resume logic
  useEffect(() => {
    if (isPaused || isPressed || isTransitioning) {
      pauseTimer()
    } else {
      resumeTimer()
    }
  }, [isPaused, isPressed, isTransitioning, pauseTimer, resumeTimer])

  const nextStory = async () => {
    if (currentStoryItemIndex < currentUserStories.stories.length - 1) {
      // Próximo story do mesmo usuário - sem animação
      setCurrentStoryItemIndex(prev => prev + 1)
    } else if (currentStoryIndex < storiesData.length - 1) {
      // Próximo usuário - com animação
      setIsTransitioning(true)
      setTransitionDirection('right')
      
      // Aguarda a animação de saída
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setCurrentStoryIndex(prev => prev + 1)
      setCurrentStoryItemIndex(0)
      
      // Aguarda a animação de entrada
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setIsTransitioning(false)
    } else {
      closeViewer()
    }
  }

  const previousStory = async () => {
    if (progress > 20) {
      // If story has played for more than 20%, restart current story
      setProgress(0)
      pausedTimeRef.current = 0
      startTimer()
    } else if (currentStoryItemIndex > 0) {
      // Story anterior do mesmo usuário - sem animação
      setCurrentStoryItemIndex(prev => prev - 1)
    } else if (currentStoryIndex > 0) {
      // Usuário anterior - com animação
      setIsTransitioning(true)
      setTransitionDirection('left')
      
      // Aguarda a animação de saída
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setCurrentStoryIndex(prev => prev - 1)
      const prevUserStories = storiesData[currentStoryIndex - 1]
      setCurrentStoryItemIndex(prevUserStories.stories.length - 1)
      
      // Aguarda a animação de entrada
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setIsTransitioning(false)
    }
  }

  const closeViewer = () => {
    stopTimer()
    setIsStoryViewerOpen(false)
    setCurrentStoryItemIndex(0)
    setProgress(0)
    setIsLiked(false)
    setMessage('')
    setIsPaused(false)
    setIsTransitioning(false)
    pausedTimeRef.current = 0
  }

  const handlePress = (pressed: boolean) => {
    setIsPressed(pressed)
  }

  const handleTap = (e: React.MouseEvent) => {
    if (isTransitioning) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width

    if (x < width * 0.4) {
      previousStory()
    } else if (x > width * 0.6) {
      nextStory()
    } else {
      setIsPaused(!isPaused)
    }
  }

  const handleDragEnd = (info: PanInfo) => {
    if (isTransitioning) return
    
    if (info.offset.y > 100) {
      closeViewer()
    } else if (info.offset.x > 100) {
      if (currentStoryIndex < storiesData.length - 1) {
        previousStory()
      }
    } else if (info.offset.x < -100) {
      if (currentStoryIndex > 0) {
        nextStory()
      }
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Mensagem enviada:', message)
      setMessage('')
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = Date.now()
    const diff = now - timestamp.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return 'agora'
    if (hours < 24) return `${hours}h`
    return `${Math.floor(hours / 24)}d`
  }

  if (!isStoryViewerOpen || !currentUserStories || !currentStory) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        onClick={closeViewer}
      >
        {/* Story Content */}
        <motion.div
          key={`${currentStoryIndex}-${currentStoryItemIndex}`}
          initial={{ 
            scale: 0.9, 
            opacity: 0,
            x: isTransitioning ? (transitionDirection === 'right' ? 300 : -300) : 0
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            x: 0
          }}
          exit={{ 
            scale: 0.9, 
            opacity: 0,
            x: isTransitioning ? (transitionDirection === 'right' ? -300 : 300) : 0
          }}
          transition={{
            duration: isTransitioning ? 0.3 : 0.2,
            ease: [0.23, 1, 0.32, 1]
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => handleDragEnd(info)}
          className="relative w-full max-w-md h-full bg-black overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 z-20 flex gap-2">
            {currentUserStories.stories.map((_, index) => (
              <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: index < currentStoryItemIndex ? '100%' : '0%' }}
                  animate={{ 
                    width: index === currentStoryItemIndex ? `${progress}%` : 
                           index < currentStoryItemIndex ? '100%' : '0%' 
                  }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
            ))}
          </div>

          {/* User Info */}
          <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 ring-2 ring-white/50">
                <AvatarImage src={currentUserStories.user.image} alt={currentUserStories.user.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-white font-bold text-xs">
                  {currentUserStories.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-semibold text-sm">{currentUserStories.user.name}</p>
                <p className="text-white/60 text-xs">{formatTime(currentStory.timestamp)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className="text-white hover:bg-white/20 p-1.5 h-auto"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/20 p-1.5 h-auto"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeViewer}
                className="text-white hover:bg-white/20 p-1.5 h-auto"
            >
                <X className="h-4 w-4" />
            </Button>
            </div>
          </div>

          {/* Story Image */}
          <div 
            className="relative w-full h-full cursor-pointer select-none"
            onClick={handleTap}
            onMouseDown={() => handlePress(true)}
            onMouseUp={() => handlePress(false)}
            onMouseLeave={() => handlePress(false)}
            onTouchStart={() => handlePress(true)}
            onTouchEnd={() => handlePress(false)}
          >
            <img
              src={currentStory.content}
              alt="Story"
              className="w-full h-full object-cover"
              draggable={false}
            />
            
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            
            {/* Pause indicator */}
            {(isPaused || isPressed) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm">
                  <Pause className="h-8 w-8 text-white" />
                </div>
              </motion.div>
            )}
            
            {/* Story text */}
            {currentStory.text && (
              <div className="absolute bottom-24 left-4 right-4">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-base font-medium drop-shadow-lg leading-relaxed"
                >
                  {currentStory.text}
                </motion.p>
              </div>
            )}

            {/* Navigation hints */}
            <div className="absolute inset-0 flex">
              <div className="w-1/3 h-full" />
              <div className="w-1/3 h-full flex items-center justify-center">
                {isPaused && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    className="text-white/50 text-xs"
                  >
                    Toque para continuar
                  </motion.div>
                )}
              </div>
              <div className="w-1/3 h-full" />
            </div>
          </div>

          {/* Action Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2.5 border border-white/20">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Responder..."
                  className="bg-transparent border-none text-white placeholder:text-white/60 focus-visible:ring-0 p-0 text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  className="bg-transparent hover:bg-white/20 p-1.5 h-auto"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                className="p-3 rounded-full hover:bg-white/20 transition-colors"
                whileTap={{ scale: 0.9 }}
                animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart 
                  className={`h-6 w-6 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} 
                />
              </motion.button>
            </div>
          </div>

          {/* Navigation arrows for desktop */}
          <div className="hidden md:block">
            {currentStoryIndex > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={previousStory}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2 h-auto opacity-50 hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            )}
            {currentStoryIndex < storiesData.length - 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={nextStory}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2 h-auto opacity-50 hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 