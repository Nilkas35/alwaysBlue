import React from 'react'
import { motion } from 'framer-motion'

interface ScatteredTextProps {
  isVisible: boolean
}

export function ScatteredText({ isVisible }: ScatteredTextProps) {
  const texts = Array(20).fill("Always blue!")

  return (
    <>
      {texts.map((text, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-300 font-bold text-2xl pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isVisible ? {
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            x: [0, Math.random() * 1500 - 1000],
            y: [0, Math.random() * 1500 - 1000],
          } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {text}
        </motion.div>
      ))}
    </>
  )
}

