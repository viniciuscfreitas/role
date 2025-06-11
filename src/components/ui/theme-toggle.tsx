'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface ThemeToggleProps {
  showLabel?: boolean
  className?: string
}

export function ThemeToggle({ showLabel, className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isDark = theme === 'dark'

  // Evita hidratação incorreta
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "w-full h-10 rounded-lg hover:bg-muted relative overflow-hidden",
          className
        )}
      >
        <div className="w-5 h-5" />
        {showLabel && <span className="ml-3">Tema</span>}
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        "w-full h-10 rounded-lg hover:bg-muted relative overflow-hidden",
        className
      )}
      title={!showLabel ? "Alternar tema" : undefined}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 45 : 0,
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1
          }}
          transition={{ 
            duration: 0.2,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-5 w-5" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 0 : -45,
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0
          }}
          transition={{ 
            duration: 0.2,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
      </div>

      {showLabel && (
        <motion.span 
          initial={false}
          animate={{ opacity: 1 }}
          className="ml-3"
        >
          Tema {isDark ? 'Escuro' : 'Claro'}
        </motion.span>
      )}
    </Button>
  )
} 