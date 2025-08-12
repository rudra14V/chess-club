"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const chessPieces = ["♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"]

export default function ChessRainfall() {
  const [pieces, setPieces] = useState<Array<{ id: number; piece: string; x: number; delay: number }>>([])

  useEffect(() => {
    const newPieces = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      piece: chessPieces[Math.floor(Math.random() * chessPieces.length)],
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setPieces(newPieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute text-cyan-400/20 text-2xl"
          style={{ left: `${piece.x}%` }}
          animate={{
            y: ["0vh", "100vh"],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: piece.delay,
            ease: "linear",
          }}
        >
          {piece.piece}
        </motion.div>
      ))}
    </div>
  )
}
