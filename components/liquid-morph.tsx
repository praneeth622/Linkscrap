'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export const LiquidMorph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      time += 0.01

      // Create liquid morphing shapes
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.2 + i * 0.3)
        const y = canvas.height * 0.5
        const radius = 100 + Math.sin(time + i) * 30

        // Create gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2)
        
        if (i === 0) {
          gradient.addColorStop(0, 'rgba(0, 255, 247, 0.3)')
          gradient.addColorStop(1, 'rgba(0, 255, 247, 0)')
        } else if (i === 1) {
          gradient.addColorStop(0, 'rgba(251, 37, 118, 0.2)')
          gradient.addColorStop(1, 'rgba(251, 37, 118, 0)')
        } else {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        }

        ctx.fillStyle = gradient
        ctx.filter = 'blur(40px)'

        // Draw morphing blob
        ctx.beginPath()
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const r = radius + Math.sin(angle * 3 + time * 2 + i) * 20
          const px = x + Math.cos(angle) * r
          const py = y + Math.sin(angle) * r
          
          if (angle === 0) {
            ctx.moveTo(px, py)
          } else {
            ctx.lineTo(px, py)
          }
        }
        ctx.closePath()
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}