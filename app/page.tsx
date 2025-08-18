"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import HomePage from "@/components/home-page"

export default function Page() {
  const [showIntro, setShowIntro] = useState(true)
  const [currentText, setCurrentText] = useState("")
  const [showKnightsClub, setShowKnightsClub] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const introTexts = [
    "Initializing Chess Database Connection...",
    "Scanning Global Chess Networks...",
    "Analyzing Player Profiles and Rankings...",
  ]

  const searchQueries = ["chess clubs", "elite players", "tournaments", "grandmasters", "knights club"]

  const databaseData = [
    "PLAYER_ID: 2847291 | RATING: 2650 | STATUS: ACTIVE",
    "TOURNAMENT_DATA: WORLD_CHAMPIONSHIP_2024",
    "CHESS_ENGINE: STOCKFISH_16 | DEPTH: 25",
    "MATCH_RESULT: WHITE_WINS | MOVES: 42",
    "OPENING: SICILIAN_DEFENSE | VARIATION: NAJDORF",
    "TIME_CONTROL: 90+30 | PHASE: ENDGAME",
    "PLAYER_PROFILE: GRANDMASTER | ELO: 2789",
    "GAME_DATABASE: 15,847,293 GAMES INDEXED",
    "ANALYSIS_ENGINE: NEURAL_NETWORK_V2.1",
    "POSITION_EVAL: +0.47 | BEST_MOVE: Nf6+",
    "CLUB_MEMBERS: 1,247 | ACTIVE: 892",
    "TOURNAMENT_SCHEDULE: LOADING...",
    "RATING_CALCULATION: GLICKO-2 SYSTEM",
    "MOVE_HISTORY: e4 e5 Nf3 Nc6 Bb5",
    "DATABASE_SIZE: 2.4TB | COMPRESSED",
    "SEARCH_INDEX: REBUILDING... 67%",
    "PLAYER_STATS: WINS: 847 | LOSSES: 203",
    "OPENING_BOOK: 50,000 VARIATIONS",
    "ENDGAME_TABLEBASE: 7-PIECE SYZYGY",
    "LIVE_GAMES: 15,847 IN PROGRESS",
  ]

  useEffect(() => {
    // Check if user has already seen the intro
    const hasSeenIntro = sessionStorage.getItem("knights_club_intro_seen")
    if (hasSeenIntro) {
      setShowIntro(false)
      return
    }

    let textIndex = 0
    let charIndex = 0

    const typeText = () => {
      if (textIndex < introTexts.length) {
        if (charIndex < introTexts[textIndex].length) {
          setCurrentText(introTexts[textIndex].substring(0, charIndex + 1))
          charIndex++
          setTimeout(typeText, 50)
        } else {
          setTimeout(() => {
            if (textIndex === introTexts.length - 1) {
              // Start search phase
              setIsSearching(true)
              startSearchSequence()
            } else {
              textIndex++
              charIndex = 0
              setCurrentText("")
              typeText()
            }
          }, 1000)
        }
      }
    }

    const startSearchSequence = () => {
      let queryIndex = 0
      const searchInterval = setInterval(() => {
        if (queryIndex < searchQueries.length) {
          setSearchQuery(searchQueries[queryIndex])
          queryIndex++
        } else {
          clearInterval(searchInterval)
          setTimeout(() => {
            setShowAlert(true)
            setTimeout(() => {
              setShowKnightsClub(true)
              setTimeout(() => {
                sessionStorage.setItem("knights_club_intro_seen", "true")
                setShowIntro(false)
              }, 3000)
            }, 2000)
          }, 1000)
        }
      }, 800)
    }

    typeText()
  }, [])

  if (showIntro) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          {/* Scrolling Database Data Columns */}
          {Array.from({ length: 8 }).map((_, columnIndex) => (
            <motion.div
              key={`column-${columnIndex}`}
              className="absolute top-0 font-mono text-green-400"
              style={{
                left: `${columnIndex * 12.5}%`,
                width: "12%",
              }}
              animate={{
                y: ["-100vh", "100vh"],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            >
              {Array.from({ length: 30 }).map((_, lineIndex) => {
                const dataIndex = (columnIndex * 30 + lineIndex) % databaseData.length
                const isSmall = Math.random() > 0.6
                return (
                  <motion.div
                    key={`line-${lineIndex}`}
                    className={`mb-2 ${isSmall ? "text-xs opacity-60" : "text-sm"}`}
                    style={{
                      textShadow: "0 0 10px #22c55e",
                      filter: `brightness(${0.7 + Math.random() * 0.6})`,
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  >
                    {databaseData[dataIndex]}
                  </motion.div>
                )
              })}
            </motion.div>
          ))}

          {/* Horizontal Scanning Lines */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent h-8"
            animate={{
              y: ["-50px", "100vh"],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/10 to-transparent h-16"
            animate={{
              y: ["-100px", "100vh"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: 2,
            }}
          />
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          {!showKnightsClub ? (
            <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Main Status Text */}
              <motion.div className="text-cyan-400 text-2xl font-mono mb-4" style={{ textShadow: "0 0 20px #00ffff" }}>
                {currentText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                >
                  |
                </motion.span>
              </motion.div>

              {isSearching && (
                <motion.div
                  className="bg-gray-900/50 backdrop-blur-md rounded-lg p-6 border border-cyan-400/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)" }}
                >
                  <div className="text-green-400 text-lg font-mono mb-4">🔍 DATABASE SCAN ACTIVE</div>

                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="text-white">Searching:</div>
                    <motion.div
                      className="text-yellow-400 font-bold text-xl font-mono"
                      key={searchQuery}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      "{searchQuery}"
                    </motion.div>
                  </div>

                  {/* Loading Animation */}
                  <div className="flex justify-center space-x-2">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {showAlert && (
                <motion.div
                  className="bg-red-900/20 backdrop-blur-md rounded-lg p-6 border-2 border-red-500/50"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    boxShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.3)",
                      "0 0 40px rgba(239, 68, 68, 0.6)",
                      "0 0 20px rgba(239, 68, 68, 0.3)",
                    ],
                  }}
                  transition={{
                    boxShadow: {
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    },
                  }}
                >
                  <motion.div
                    className="text-red-400 text-2xl font-bold mb-2 font-mono"
                    animate={{
                      textShadow: ["0 0 10px #ff0000", "0 0 20px #ff0000, 0 0 30px #ff0000", "0 0 10px #ff0000"],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    &gt;&gt;&gt; MATCH FOUND &lt;&lt;&lt;
                  </motion.div>
                  <div className="text-white text-lg font-mono">
                    TARGET ACQUIRED: <span className="text-yellow-400 font-bold">KNIGHTS_CLUB.EXE</span>
                  </div>
                  <div className="text-green-400 text-sm font-mono mt-2">ACCESS_LEVEL: ELITE | STATUS: VERIFIED</div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <motion.h1 className="text-6xl font-bold mb-4">
                {["K", "N", "I", "G", "H", "T", "S", " ", " ", "C", "L", "U", "B"].map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-cyan-400"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff",
                      marginRight: letter === "S" ? "2rem" : "0",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.div
                className="text-cyan-300 text-lg font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Elite Chess Club Database - Access Granted
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    )
  }

  return <HomePage />
}
