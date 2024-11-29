import { useState, useCallback } from 'react'

export function useBallAnimation() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [color, setColor] = useState('#3B82F6') // Bright blue for visibility in dark mode
  const [isShame, setIsShame] = useState(false)
  const [yellowChance, setYellowChance] = useState(20)
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    setIsAnimating(true)
    setCount((prev) => prev + 1)
    setTimeout(() => {
      setIsAnimating(false)
      const newColor = Math.random() * 100 < yellowChance ? '#FBBF24' : '#3B82F6' // Yellow and blue for dark mode
      setColor(newColor)
      setIsShame(newColor === '#FBBF24')
    }, 750) // 0.75 seconds for the animation (doubled speed)
  }, [yellowChance])

  const reset = useCallback(() => {
    setColor('#3B82F6')
    setIsShame(false)
    setCount(0)
  }, [])

  return { count, isAnimating, color, isShame, yellowChance, setYellowChance, animate, reset }
}

