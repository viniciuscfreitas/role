'use client'

import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'

export function SavedPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Eventos salvos</h2>
        <p className="text-muted-foreground">Eventos que você salvou aparecerão aqui</p>
      </motion.div>
    </div>
  )
} 