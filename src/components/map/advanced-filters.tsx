'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, Calendar, MapPin, DollarSign, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  distanceRange: [number, number]
  dateRange: {
    start: Date | null
    end: Date | null
  }
  timeOfDay: string[]
  attendeesMin: number
  freeOnly: boolean
}

interface AdvancedFiltersProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

const CATEGORIES = [
  { id: 'festa', label: 'Festa', color: 'bg-pink-500' },
  { id: 'networking', label: 'Networking', color: 'bg-blue-500' },
  { id: 'festival', label: 'Festival', color: 'bg-purple-500' },
  { id: 'workshop', label: 'Workshop', color: 'bg-green-500' },
  { id: 'comedy', label: 'Comedy', color: 'bg-yellow-500' },
  { id: 'esporte', label: 'Esporte', color: 'bg-orange-500' },
  { id: 'cultura', label: 'Cultura', color: 'bg-indigo-500' },
  { id: 'gastronomia', label: 'Gastronomia', color: 'bg-red-500' }
]

const TIME_SLOTS = [
  { id: 'morning', label: 'Manhã (6h-12h)', value: 'morning' },
  { id: 'afternoon', label: 'Tarde (12h-18h)', value: 'afternoon' },
  { id: 'evening', label: 'Noite (18h-24h)', value: 'evening' },
  { id: 'late', label: 'Madrugada (0h-6h)', value: 'late' }
]

export function AdvancedFilters({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
  onResetFilters
}: AdvancedFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters)

  const updateFilters = (updates: Partial<FilterOptions>) => {
    const newFilters = { ...localFilters, ...updates }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const toggleCategory = (categoryId: string) => {
    const newCategories = localFilters.categories.includes(categoryId)
      ? localFilters.categories.filter(id => id !== categoryId)
      : [...localFilters.categories, categoryId]
    updateFilters({ categories: newCategories })
  }

  const toggleTimeSlot = (timeSlot: string) => {
    const newTimeSlots = localFilters.timeOfDay.includes(timeSlot)
      ? localFilters.timeOfDay.filter(slot => slot !== timeSlot)
      : [...localFilters.timeOfDay, timeSlot]
    updateFilters({ timeOfDay: newTimeSlots })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (localFilters.categories.length > 0) count++
    if (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 200) count++
    if (localFilters.distanceRange[1] < 10) count++
    if (localFilters.dateRange.start || localFilters.dateRange.end) count++
    if (localFilters.timeOfDay.length > 0) count++
    if (localFilters.attendeesMin > 0) count++
    if (localFilters.freeOnly) count++
    return count
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Filter Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Filter className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Filtros Avançados</h2>
                  {getActiveFiltersCount() > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {getActiveFiltersCount()} ativo{getActiveFiltersCount() > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Filters Content */}
              <div className="flex-1 p-6 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Categorias
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((category) => (
                      <Button
                        key={category.id}
                        variant={localFilters.categories.includes(category.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleCategory(category.id)}
                        className="justify-start gap-2 h-auto py-2"
                      >
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span className="text-xs">{category.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Faixa de Preço
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={localFilters.freeOnly}
                        onCheckedChange={(checked) => updateFilters({ freeOnly: checked })}
                      />
                      <span className="text-sm">Apenas eventos gratuitos</span>
                    </div>
                    {!localFilters.freeOnly && (
                      <div className="space-y-2">
                        <Slider
                          value={localFilters.priceRange}
                          onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                          max={200}
                          min={0}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>R$ {localFilters.priceRange[0]}</span>
                          <span>R$ {localFilters.priceRange[1]}+</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Distance Range */}
                <div>
                  <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Distância Máxima
                  </h3>
                  <div className="space-y-2">
                    <Slider
                      value={localFilters.distanceRange}
                      onValueChange={(value) => updateFilters({ distanceRange: value as [number, number] })}
                      max={10}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{localFilters.distanceRange[0]} km</span>
                      <span>{localFilters.distanceRange[1]} km</span>
                    </div>
                  </div>
                </div>

                {/* Time of Day */}
                <div>
                  <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Período do Dia
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={localFilters.timeOfDay.includes(slot.value) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleTimeSlot(slot.value)}
                        className="justify-start text-xs"
                      >
                        {slot.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Minimum Attendees */}
                <div>
                  <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Mínimo de Participantes
                  </h3>
                  <Select
                    value={localFilters.attendeesMin.toString()}
                    onValueChange={(value) => updateFilters({ attendeesMin: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Qualquer quantidade</SelectItem>
                      <SelectItem value="10">10+ pessoas</SelectItem>
                      <SelectItem value="50">50+ pessoas</SelectItem>
                      <SelectItem value="100">100+ pessoas</SelectItem>
                      <SelectItem value="250">250+ pessoas</SelectItem>
                      <SelectItem value="500">500+ pessoas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-border space-y-3">
                <Button onClick={onApplyFilters} className="w-full">
                  Aplicar Filtros {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
                </Button>
                <Button onClick={onResetFilters} variant="outline" className="w-full">
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 