"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navigation from "./navigation"
import ChessTransformation from "./chess-transformation"
import LatestEvents from "./latest-events"
import Footer from "./footer"
import ChessRainfall from "./chess-rainfall"
import FloatingParticles from "./floating-particles"

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-brown-900 to-black text-white relative overflow-hidden">
      <ChessRainfall />
      <FloatingParticles />

      <Navigation />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.h1
                className="text-5xl font-bold text-cyan-400 mb-6"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Welcome to Knights Club
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                An elite chess community where strategic minds converge. Experience the evolution of chess mastery
                through cutting-edge technology and timeless strategy. Join our prestigious club and elevate your game
                to grandmaster levels.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Professional Chess Training</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Tournament Participation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Strategic Analysis Sessions</span>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center">
              <ChessTransformation />
            </div>
          </div>

          <LatestEvents />
        </div>
      </motion.div>

      <Footer />
    </div>
  )
}
