'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface LiquidTextProps {
  children: string
  className?: string
  delay?: number
}

export const LiquidText = ({ children, className = "", delay = 0 }: LiquidTextProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const [letters, setLetters] = useState<string[]>([])

  useEffect(() => {
    setLetters(children.split(''))
  }, [children])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      }
    }
  }

  const letterVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      rotateX: -90,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
        duration: 0.8,
      }
    }
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-wrap"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
            style={{
              transformOrigin: "50% 50%",
            }}
            whileHover={{
              scale: 1.1,
              color: "#00FFF7",
              transition: { duration: 0.2 }
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}