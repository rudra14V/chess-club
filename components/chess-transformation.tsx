"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const chessPieces = ["♟", "♜", "♝", "♞", "♛", "♚"]
const colors = ["#00ffff", "#ffffff", "#0080ff", "#e0f7ff", "#4dd0e1", "#b3e5fc"]

export default function ChessTransformation() {
  const [currentPiece, setCurrentPiece] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPiece((prev) => (prev + 1) % chessPieces.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Animated Circles */}
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border-2"
          style={{
            width: `${280 - index * 40}px`,
            height: `${280 - index * 40}px`,
            borderColor: colors[index % colors.length],
          }}
          animate={{
            rotate: index % 2 === 0 ? 360 : -360,
            scale: currentPiece === index ? [1, 1.2, 1] : 1,
          }}
          transition={{
            rotate: { duration: 8 + index * 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 0.5 },
          }}
        />
      ))}

      {/* Chess Piece */}
      <motion.div
        className="relative z-10 w-32 h-32 flex items-center justify-center"
        key={currentPiece}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="text-8xl text-white drop-shadow-2xl">{chessPieces[currentPiece]}</div>

        {/* Blue and White Particles matching website theme */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: i % 2 === 0 ? "#00ffff" : "#ffffff",
              top: "50%",
              left: "50%",
              boxShadow: `0 0 10px ${i % 2 === 0 ? "#00ffff" : "#ffffff"}`,
            }}
            animate={{
              x: Math.cos((i * 30 * Math.PI) / 180) * 60,
              y: Math.sin((i * 30 * Math.PI) / 180) * 60,
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
