import { Badge } from '@/components/ui/badge'
import { Clock, Radio, Calendar } from 'lucide-react'
import { EventTemporalState } from '@/types/events'
import { cn } from '@/lib/utils'

interface TemporalBadgeProps {
  state: EventTemporalState
  className?: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const stateConfig = {
  live: {
    label: 'AO VIVO',
    icon: Radio,
    className: 'bg-red-500 text-white border-red-600 animate-pulse',
    iconClassName: 'text-white'
  },
  future: {
    label: 'PRÓXIMO',
    icon: Calendar,
    className: 'bg-blue-500 text-white border-blue-600',
    iconClassName: 'text-white'
  },
  past: {
    label: 'FINALIZADO',
    icon: Clock,
    className: 'bg-gray-500 text-white border-gray-600',
    iconClassName: 'text-white'
  }
}

export function TemporalBadge({ 
  state, 
  className, 
  showIcon = true, 
  size = 'md' 
}: TemporalBadgeProps) {
  const config = stateConfig[state]
  const Icon = config.icon

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5'
  }

  return (
    <Badge 
      className={cn(
        config.className,
        sizeClasses[size],
        'font-semibold tracking-wide',
        className
      )}
    >
      {showIcon && (
        <Icon className={cn(iconSizes[size], 'mr-1', config.iconClassName)} />
      )}
      {config.label}
    </Badge>
  )
} 