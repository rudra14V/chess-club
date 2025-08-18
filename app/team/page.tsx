"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Crown, Star, Users } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ChessRainfall from "@/components/chess-rainfall"
import FloatingParticles from "@/components/floating-particles"
import BackButton from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { api } from "@/lib/api"

interface Player {
  id: string
  name: string
  position: string
  rating: string
  fideUrl?: string
  photo: string
  teamType: "inter-iiit" | "college" | "house"
  houseTeam?: "trishul" | "astra" | "vajra" | "chakra"
}

const houseTeams = [
  { id: "trishul", name: "Trishul", color: "from-yellow-400 to-orange-500", symbol: "🔱" },
  { id: "astra", name: "Astra", color: "from-blue-400 to-purple-500", symbol: "⚡" },
  { id: "vajra", name: "Vajra", color: "from-green-400 to-teal-500", symbol: "⚔️" },
  { id: "chakra", name: "Chakra", color: "from-red-400 to-pink-500", symbol: "🎯" },
]

export default function TeamPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [activeTab, setActiveTab] = useState<"inter-iiit" | "college" | "house">("inter-iiit")
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null)

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const playersData = await api.getPlayers()
        setPlayers(Array.isArray(playersData) ? playersData : [])
      } catch (error) {
        console.error("Error loading players:", error)
      }
    }
    loadPlayers()
  }, [])

  const getPlayersByType = (type: string) => {
    return players.filter((player) => player.teamType === type)
  }

  const getPlayersByHouse = (house: string) => {
    return players.filter((player) => player.teamType === "house" && player.houseTeam === house)
  }

  const tabs = [
    { id: "inter-iiit" as const, label: "Inter IIIT Team", count: getPlayersByType("inter-iiit").length },
    { id: "college" as const, label: "College Team", count: getPlayersByType("college").length },
    { id: "house" as const, label: "House Teams", count: getPlayersByType("house").length },
  ]

  const renderPlayerCard = (player: Player, index: number) => {
    const isCaptain = player.position.toLowerCase().includes("captain")
    const isViceCaptain = player.position.toLowerCase().includes("vice")

    return (
      <motion.div
        key={player.id}
        className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border transition-all duration-300 ${
          isCaptain
            ? "border-red-500 hover:border-red-400"
            : isViceCaptain
              ? "border-green-500 hover:border-green-400"
              : "border-cyan-400/30 hover:border-cyan-400"
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{
          scale: 1.05,
          boxShadow: isCaptain
            ? "0 0 30px rgba(239, 68, 68, 0.5)"
            : isViceCaptain
              ? "0 0 30px rgba(34, 197, 94, 0.5)"
              : "0 0 30px rgba(0, 255, 255, 0.3)",
        }}
      >
        <div className="text-center">
          <div className="relative mb-4">
            <img
              src={player.photo || "/placeholder.svg"}
              alt={player.name}
              className={`w-24 h-24 rounded-full mx-auto object-cover border-4 ${
                isCaptain ? "border-red-500" : isViceCaptain ? "border-green-500" : "border-cyan-400/50"
              }`}
            />
            {isCaptain && <Crown className="absolute -top-2 -right-2 w-6 h-6 text-red-500" />}
            {isViceCaptain && <Star className="absolute -top-2 -right-2 w-6 h-6 text-green-500" />}
          </div>

          <h3 className="text-lg font-bold text-white mb-2">{player.name}</h3>
          <p
            className={`font-semibold mb-2 ${
              isCaptain ? "text-red-400" : isViceCaptain ? "text-green-400" : "text-cyan-400"
            }`}
          >
            {player.position}
          </p>
          <p className="text-gray-400 mb-3">Rating: {player.rating}</p>

          {player.fideUrl && (
            <Button
              onClick={() => window.open(player.fideUrl, "_blank")}
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              FIDE Profile
            </Button>
          )}
        </div>
      </motion.div>
    )
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
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-cyan-400 mb-4">Our Team</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the strategic minds behind Knights Club's success.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 border border-cyan-400/30">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id ? "bg-cyan-600 text-white shadow-lg" : "text-gray-300 hover:text-cyan-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label} ({tab.count})
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "house" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {houseTeams.map((house, index) => (
                  <motion.div
                    key={house.id}
                    className={`bg-gradient-to-br ${house.color} p-6 rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] border-2 border-transparent hover:border-white/50`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedHouse(house.id)}
                    whileHover={{
                      boxShadow: "0 0 50px rgba(255, 255, 255, 0.5)",
                      y: -10,
                      rotateY: 5,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">{house.symbol}</div>
                      <h3 className="text-2xl font-bold mb-2">{house.name}</h3>
                      <p className="text-lg">{getPlayersByHouse(house.id).length} Members</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getPlayersByType(activeTab).map((player, index) => renderPlayerCard(player, index))}
                {getPlayersByType(activeTab).length === 0 && (
                  <div className="col-span-full text-center text-gray-400 py-12">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">No team members found.</p>
                    <p className="mt-2">Team members will appear here once added by admin.</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* House Team Modal */}
      <Dialog open={!!selectedHouse} onOpenChange={() => setSelectedHouse(null)}>
        <DialogContent className="bg-gray-900 border-cyan-400/30 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyan-400">
              {selectedHouse && houseTeams.find((h) => h.id === selectedHouse)?.name} Team
            </DialogTitle>
          </DialogHeader>

          {selectedHouse && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {getPlayersByHouse(selectedHouse).map((player, index) => renderPlayerCard(player, index))}
              {getPlayersByHouse(selectedHouse).length === 0 && (
                <div className="col-span-full text-center text-gray-400 py-8">
                  <p>No members in this house team yet.</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
