"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ChessRainfall from "@/components/chess-rainfall"
import FloatingParticles from "@/components/floating-particles"
import BackButton from "@/components/back-button"
import { api } from "@/lib/api"

const timeline = [
  {
    year: "2021",
    title: "The Beginning",
    description: "Started by Gautam & Shravan as a small chess enthusiast group.",
  },
  {
    year: "2022",
    title: "Growth Phase",
    description: "Continued and expanded by Mihir, organizing regular tournaments.",
  },
  {
    year: "2024",
    title: "Official Establishment",
    description: "Officially established by Vivash as Knights Club with structured teams and competitions.",
  },
]

const founders = [
  {
    id: 1,
    name: "Gautam",
    role: "Founder",
    description: "Co-founded Knights Club in 2021, establishing the foundation for our chess community.",
    image: "/chess-founder-portrait.png",
  },
  {
    id: 2,
    name: "Shravan",
    role: "Co-Founder",
    description: "Co-founded Knights Club in 2021, helping shape the early vision and structure.",
    image: "/chess-co-founder-portrait.png",
  },
  {
    id: 3,
    name: "Mihir",
    role: "Former Leader",
    description: "Led the club's growth phase in 2022, organizing tournaments and expanding membership.",
    image: "/chess-former-leader.png",
  },
  {
    id: 4,
    name: "Vivash",
    role: "Current President",
    description: "Officially established Knights Club in 2024 with structured teams and competitions.",
    image: "/chess-member-portrait.png",
  },
]

export default function AboutPage() {
  const [players, setPlayers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setLoading(true)
        const playersData = await api.getPlayers()
        console.log("Loaded players:", playersData)
        setPlayers(Array.isArray(playersData) ? playersData : [])
      } catch (error) {
        console.error("Error loading players:", error)
      } finally {
        setLoading(false)
      }
    }
    loadPlayers()
  }, [])

  const getHouseTeamColor = (houseTeam?: string) => {
    switch (houseTeam?.toLowerCase()) {
      case "trishul":
        return "text-red-400"
      case "astra":
        return "text-blue-400"
      case "vajra":
        return "text-green-400"
      case "chakra":
        return "text-purple-400"
      default:
        return "text-yellow-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-brown-900 to-black text-white relative overflow-hidden">
      <ChessRainfall />
      <FloatingParticles />

      <Navigation />
      <BackButton />

      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-cyan-400 mb-4">The Legacy of Knights Club</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From humble beginnings to a prestigious chess institution, discover the journey that shaped our elite
              community.
            </p>
          </motion.div>

          {/* Enhanced Timeline with Interactive Effects */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center text-cyan-400 mb-12">Our Journey</h2>
            <div className="relative">
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-600"
                animate={{
                  boxShadow: ["0 0 10px #00ffff", "0 0 20px #00ffff, 0 0 30px #0080ff", "0 0 10px #00ffff"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <motion.div
                      className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300"
                      whileHover={{
                        boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)",
                        borderColor: "#00ffff",
                      }}
                    >
                      <motion.div
                        className="text-2xl font-bold text-cyan-400 mb-2"
                        animate={{
                          textShadow: ["0 0 5px #00ffff", "0 0 15px #00ffff, 0 0 25px #0080ff", "0 0 5px #00ffff"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        {item.year}
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </motion.div>
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      className="w-6 h-6 bg-cyan-400 rounded-full border-4 border-gray-900"
                      animate={{
                        boxShadow: ["0 0 10px #00ffff", "0 0 20px #00ffff, 0 0 30px #0080ff", "0 0 10px #00ffff"],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  </div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <h2 className="text-3xl font-bold text-center text-cyan-400 mb-12">Our Founders & Leaders</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {founders.map((founder, index) => (
                <motion.div
                  key={founder.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-400/30 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)",
                    borderColor: "#00ffff",
                  }}
                >
                  <div className="mb-4">
                    <img
                      src={founder.image || "/placeholder.svg"}
                      alt={founder.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-cyan-400/50"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{founder.name}</h3>
                  <p className="text-cyan-400 font-semibold mb-2 text-sm">{founder.role}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{founder.description}</p>
                </motion.div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-center text-cyan-400 mb-12">Current Team Members</h2>
            {loading ? (
              <div className="text-center text-gray-400 py-12">
                <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-xl">Loading team members...</p>
              </div>
            ) : players.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {players.map((player, index) => (
                  <motion.div
                    key={player.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-400/30 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)",
                      borderColor: "#00ffff",
                    }}
                  >
                    <div className="mb-4">
                      <img
                        src="/chess-player-portrait.png"
                        alt={player.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-cyan-400/50"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
                    <p className="text-gray-400 mb-2">Rating: {player.rating}</p>
                    <p className="text-cyan-400 font-semibold mb-1">Achievements: {player.achievements_count}</p>
                    <div className="text-sm text-gray-500">
                      {player.team_type && <p className="capitalize">{player.team_type.replace("-", " ")}</p>}
                      {player.house_team && (
                        <p className={`capitalize font-semibold ${getHouseTeamColor(player.house_team)}`}>
                          {player.house_team} House
                        </p>
                      )}
                    </div>
                    {player.bio && <p className="text-gray-400 text-sm mt-2 line-clamp-2">{player.bio}</p>}
                    {player.join_date && (
                      <p className="text-xs text-gray-500 mt-2">
                        Joined: {new Date(player.join_date).toLocaleDateString()}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <p className="text-xl">No team members added yet.</p>
                <p className="mt-2">Team members will be displayed here once added by admin.</p>
              </div>
            )}
          </motion.section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
