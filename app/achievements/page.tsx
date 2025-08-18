"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Eye } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ChessRainfall from "@/components/chess-rainfall"
import FloatingParticles from "@/components/floating-particles"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { api } from "@/lib/api"
import BackButton from "@/components/back-button"

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [selectedAchievement, setSelectedAchievement] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setLoading(true)
        const achievementsData = await api.getAchievements()
        setAchievements(Array.isArray(achievementsData) ? achievementsData : [])
      } catch (error) {
        console.error("Error loading achievements:", error)
      } finally {
        setLoading(false)
      }
    }
    loadAchievements()
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    if (!difficulty) return "text-gray-400"

    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "hard":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getIconEmoji = (icon: string) => {
    if (!icon) return "🏆"

    switch (icon.toLowerCase()) {
      case "trophy":
        return "🏆"
      case "medal":
        return "🥇"
      case "crown":
        return "👑"
      case "star":
        return "⭐"
      case "fire":
        return "🔥"
      default:
        return "🏆"
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return "Date not available"
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
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-cyan-400 mb-4">Our Achievements</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Celebrating our victories and milestones in the world of chess.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center text-gray-400 py-12">
              <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-xl">Loading achievements...</p>
            </div>
          ) : achievements.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)" }}
                >
                  {achievement.photos && achievement.photos.length > 0 && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={achievement.photos[0] || "/placeholder.svg"}
                        alt={achievement.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2">{getIconEmoji(achievement.icon)}</span>
                    <h3 className="text-xl font-bold text-white">{achievement.name}</h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-gray-300">
                      <span className={`font-semibold ${getDifficultyColor(achievement.difficulty)}`}>
                        {achievement.difficulty ? achievement.difficulty.toUpperCase() : "UNKNOWN"}
                      </span>
                      <span className="text-yellow-400 font-bold">{achievement.points} pts</span>
                    </div>
                    {achievement.created_at && (
                      <div className="text-sm text-gray-400">Achieved: {formatDate(achievement.created_at)}</div>
                    )}
                  </div>

                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {achievement.description || "No description available"}
                  </p>

                  <Button
                    onClick={() => setSelectedAchievement(achievement)}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">No achievements recorded yet.</p>
              <p className="mt-2">Our victories will be displayed here once added by admin.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
        <DialogContent
          className="bg-gray-900 border-cyan-400/30 text-white max-w-2xl"
          aria-describedby="achievement-details"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyan-400 flex items-center">
              <span className="text-2xl mr-2">
                {selectedAchievement ? getIconEmoji(selectedAchievement.icon) : "🏆"}
              </span>
              {selectedAchievement?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedAchievement && (
            <div className="space-y-4" id="achievement-details">
              {selectedAchievement.photos && selectedAchievement.photos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAchievement.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo || "/placeholder.svg"}
                      alt={`${selectedAchievement.name} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-300">
                  <Trophy className="w-5 h-5 mr-2 text-cyan-400" />
                  <div>
                    <div className="text-sm text-gray-400">Difficulty</div>
                    <div className={`font-semibold ${getDifficultyColor(selectedAchievement.difficulty)}`}>
                      {selectedAchievement.difficulty ? selectedAchievement.difficulty.toUpperCase() : "UNKNOWN"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="text-yellow-400 text-xl mr-2">⭐</span>
                  <div>
                    <div className="text-sm text-gray-400">Points</div>
                    <div className="text-yellow-400 font-bold">{selectedAchievement.points}</div>
                  </div>
                </div>
              </div>

              {selectedAchievement.created_at && (
                <div className="flex items-center text-gray-300">
                  <span className="text-cyan-400 text-xl mr-2">📅</span>
                  <div>
                    <div className="text-sm text-gray-400">Date Achieved</div>
                    <div className="text-white font-semibold">{formatDate(selectedAchievement.created_at)}</div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Description</h4>
                <p className="text-gray-300 leading-relaxed">
                  {selectedAchievement.description || "No description available"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
