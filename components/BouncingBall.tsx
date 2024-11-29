'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Slider } from "@/components/ui/slider"
import { useBallAnimation } from '../hooks/useBallAnimation'
import { ScatteredText } from './ScatteredText'

export function BouncingBall() {
  const { isAnimating, color, isShame, yellowChance, setYellowChance, animate, reset } = useBallAnimation()
  const [showScatteredText, setShowScatteredText] = useState(false)

  const handleThrow = () => {
    animate()
    setShowScatteredText(true)
    setTimeout(() => setShowScatteredText(false), 500)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white dark relative overflow-hidden">
      <motion.div
        className="w-32 h-32 rounded-full"
        style={{ backgroundColor: color }}
        animate={isAnimating ? {
          y: [0, -200, 0],
          scale: [1, 1.2, 1]
        } : {}}
        transition={{
          duration: 0.75,
          times: [0, 0.5, 1],
          ease: "easeInOut"
        }}
      />
      <div className="mt-8 flex flex-col items-center w-64">
        {isShame ? (
          <>
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-3xl font-bold mb-8 text-red-400"
            >
              SHAME!
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16"
            >
              <button
                onClick={reset}
                className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Play Again
              </button>
            </motion.div>
          </>
        ) : (
          <>
            <button
              onClick={handleThrow}
              className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
              disabled={isAnimating}
            >
              Throw
            </button>
            <div className="w-full">
              <label htmlFor="yellow-chance" className="block text-sm font-medium text-gray-300 mb-2">
                Yellow Chance: {yellowChance}%
              </label>
              <Slider
                id="yellow-chance"
                min={0}
                max={100}
                step={1}
                value={[yellowChance]}
                onValueChange={(value) => setYellowChance(value[0])}
                className="w-full"
              />
            </div>
          </>
        )}
      </div>
      <ScatteredText isVisible={showScatteredText} />
    </div>
  )
}

