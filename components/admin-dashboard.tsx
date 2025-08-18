"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Users, Trophy, Calendar, MessageSquare, LogOut, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

interface Event {
  id: string
  name: string
  date: string
  time: string
  venue: string
  description: string
  photos: string[]
}

interface Achievement {
  id: string
  name: string
  date: string
  time: string
  venue: string
  description: string
  photos: string[]
}

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

interface Suggestion {
  id: string
  name: string
  email: string
  suggestion: string
  timestamp: string
}

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"events" | "achievements" | "players" | "suggestions">("events")
  const [events, setEvents] = useState<Event[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const { toast } = useToast()

  // Form states
  const [eventForm, setEventForm] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    photos: [] as string[],
  })
  const [achievementForm, setAchievementForm] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    photos: [] as string[],
  })
  const [playerForm, setPlayerForm] = useState({
    name: "",
    position: "",
    rating: "",
    fideUrl: "",
    photo: "",
    teamType: "inter-iiit" as const,
    houseTeam: "",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [eventsData, achievementsData, playersData, suggestionsData] = await Promise.all([
        api.getEvents(),
        api.getAchievements(),
        api.getPlayers(),
        api.getSuggestions(),
      ])

      setEvents(Array.isArray(eventsData) ? eventsData : [])
      setAchievements(Array.isArray(achievementsData) ? achievementsData : [])
      setPlayers(Array.isArray(playersData) ? playersData : [])
      setSuggestions(Array.isArray(suggestionsData) ? suggestionsData : [])
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "Warning",
        description: "Some data could not be loaded. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = (files: FileList | null, callback: (urls: string[]) => void) => {
    if (!files) return

    const urls: string[] = []
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        urls.push(e.target?.result as string)
        if (urls.length === files.length) {
          callback(urls)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleAddEvent = async () => {
    try {
      if (!eventForm.name || !eventForm.date || !eventForm.time || !eventForm.venue) {
        toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" })
        return
      }

      const newEvent: Event = {
        id: editingItem?.id || Date.now().toString(),
        ...eventForm,
      }

      let updatedEvents
      if (editingItem) {
        await api.updateEvent(editingItem.id, newEvent)
        updatedEvents = events.map((e) => (e.id === editingItem.id ? newEvent : e))
      } else {
        await api.createEvent(newEvent)
        updatedEvents = [...events, newEvent]
      }

      setEvents(updatedEvents)
      resetEventForm()
      setIsModalOpen(false)
      toast({ title: "Success", description: `Event ${editingItem ? "updated" : "added"} successfully` })
    } catch (error) {
      console.error("Error adding event:", error)
      toast({
        title: "Error",
        description: "Failed to add event. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddAchievement = async () => {
    try {
      if (!achievementForm.name || !achievementForm.date || !achievementForm.time || !achievementForm.venue) {
        toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" })
        return
      }

      const newAchievement: Achievement = {
        id: editingItem?.id || Date.now().toString(),
        ...achievementForm,
      }

      let updatedAchievements
      if (editingItem) {
        await api.updateAchievement(editingItem.id, newAchievement)
        updatedAchievements = achievements.map((a) => (a.id === editingItem.id ? newAchievement : a))
      } else {
        await api.createAchievement(newAchievement)
        updatedAchievements = [...achievements, newAchievement]
      }

      setAchievements(updatedAchievements)
      resetAchievementForm()
      setIsModalOpen(false)
      toast({ title: "Success", description: `Achievement ${editingItem ? "updated" : "added"} successfully` })
    } catch (error) {
      console.error("Error adding achievement:", error)
      toast({
        title: "Error",
        description: "Failed to add achievement. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddPlayer = async () => {
    try {
      if (!playerForm.name || !playerForm.position || !playerForm.rating || !playerForm.photo) {
        toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" })
        return
      }

      const newPlayer: Player = {
        id: editingItem?.id || Date.now().toString(),
        ...playerForm,
        houseTeam: playerForm.teamType === "house" ? playerForm.houseTeam : undefined,
      }

      let updatedPlayers
      if (editingItem) {
        await api.updatePlayer(editingItem.id, newPlayer)
        updatedPlayers = players.map((p) => (p.id === editingItem.id ? newPlayer : p))
      } else {
        await api.createPlayer(newPlayer)
        updatedPlayers = [...players, newPlayer]
      }

      setPlayers(updatedPlayers)
      resetPlayerForm()
      setIsModalOpen(false)
      toast({ title: "Success", description: `Player ${editingItem ? "updated" : "added"} successfully` })
    } catch (error) {
      console.error("Error adding player:", error)
      toast({
        title: "Error",
        description: "Failed to add player. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (type: string, id: string) => {
    try {
      if (type === "events") {
        const updated = events.filter((e) => e.id !== id)
        setEvents(updated)
        await api.deleteEvent(id)
      } else if (type === "achievements") {
        const updated = achievements.filter((a) => a.id !== id)
        setAchievements(updated)
        await api.deleteAchievement(id)
      } else if (type === "players") {
        const updated = players.filter((p) => p.id !== id)
        setPlayers(updated)
        await api.deletePlayer(id)
      }
      toast({ title: "Success", description: "Item deleted successfully" })
    } catch (error) {
      console.error("Error deleting item:", error)
      toast({
        title: "Error",
        description: "Failed to delete item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const resetEventForm = () => {
    setEventForm({ name: "", date: "", time: "", venue: "", description: "", photos: [] })
    setEditingItem(null)
  }

  const resetAchievementForm = () => {
    setAchievementForm({ name: "", date: "", time: "", venue: "", description: "", photos: [] })
    setEditingItem(null)
  }

  const resetPlayerForm = () => {
    setPlayerForm({
      name: "",
      position: "",
      rating: "",
      fideUrl: "",
      photo: "",
      teamType: "inter-iiit",
      houseTeam: "",
    })
    setEditingItem(null)
  }

  const openEditModal = (type: string, item: any) => {
    setEditingItem(item)
    if (type === "events") {
      setEventForm({
        name: item.name || "",
        date: item.date || "",
        time: item.time || "",
        venue: item.venue || "",
        description: item.description || "",
        photos: item.photos || [],
      })
    } else if (type === "achievements") {
      setAchievementForm({
        name: item.name || "",
        date: item.date || "",
        time: item.time || "",
        venue: item.venue || "",
        description: item.description || "",
        photos: item.photos || [],
      })
    } else if (type === "players") {
      setPlayerForm({
        name: item.name || "",
        position: item.position || "",
        rating: item.rating || "",
        fideUrl: item.fideUrl || "",
        photo: item.photo || "",
        teamType: item.teamType || "inter-iiit",
        houseTeam: item.houseTeam || "",
      })
    }
    setIsModalOpen(true)
  }

  const tabs = [
    { id: "events" as const, label: "Events", icon: Calendar, count: events.length },
    { id: "achievements" as const, label: "Achievements", icon: Trophy, count: achievements.length },
    { id: "players" as const, label: "Players", icon: Users, count: players.length },
    { id: "suggestions" as const, label: "Suggestions", icon: MessageSquare, count: suggestions.length },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-brown-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-cyan-400"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Admin Dashboard
          </motion.h1>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "bg-gray-800/50 text-gray-300 hover:text-cyan-400 border border-cyan-400/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label} ({tab.count})
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-400/30">
          {/* Add Button */}
          {activeTab !== "suggestions" && (
            <div className="mb-6">
              <Button
                onClick={() => {
                  setEditingItem(null)
                  if (activeTab === "events") resetEventForm()
                  else if (activeTab === "achievements") resetAchievementForm()
                  else if (activeTab === "players") resetPlayerForm()
                  setIsModalOpen(true)
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add {activeTab.slice(0, -1)}
              </Button>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-gray-700/50 rounded-lg p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{event.name}</h3>
                    <p className="text-gray-300 mb-1">Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-gray-300 mb-1">Time: {event.time}</p>
                    <p className="text-gray-300 mb-1">Venue: {event.venue}</p>
                    <p className="text-gray-400 text-sm">{event.description}</p>
                    {event.photos && event.photos.length > 0 && (
                      <p className="text-cyan-400 text-sm mt-2">{event.photos.length} photo(s) attached</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => openEditModal("events", event)}
                      size="sm"
                      variant="outline"
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete("events", event.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {events.length === 0 && <p className="text-gray-400 text-center py-8">No events added yet.</p>}
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-gray-700/50 rounded-lg p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                      <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                      {achievement.name}
                    </h3>
                    <p className="text-gray-300 mb-1">Date: {new Date(achievement.date).toLocaleDateString()}</p>
                    <p className="text-gray-300 mb-1">Time: {achievement.time}</p>
                    <p className="text-gray-300 mb-1">Venue: {achievement.venue}</p>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                    {achievement.photos && achievement.photos.length > 0 && (
                      <p className="text-cyan-400 text-sm mt-2">{achievement.photos.length} photo(s) attached</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => openEditModal("achievements", achievement)}
                      size="sm"
                      variant="outline"
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete("achievements", achievement.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {achievements.length === 0 && (
                <p className="text-gray-400 text-center py-8">No achievements added yet.</p>
              )}
            </div>
          )}

          {/* Players Tab */}
          {activeTab === "players" && (
            <div className="space-y-4">
              {players.map((player) => (
                <div key={player.id} className="bg-gray-700/50 rounded-lg p-4 flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <img
                      src={player.photo || "/placeholder.svg"}
                      alt={player.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{player.name}</h3>
                      <p className="text-cyan-400 mb-1">{player.position}</p>
                      <p className="text-gray-300 mb-1">Rating: {player.rating}</p>
                      <p className="text-gray-300 mb-1">
                        Team: {player.teamType ? player.teamType.replace("-", " ").toUpperCase() : "N/A"}
                      </p>
                      {player.houseTeam && (
                        <p className="text-gray-300 mb-1">House: {player.houseTeam.toUpperCase()}</p>
                      )}
                      {player.fideUrl && <p className="text-green-400 text-sm">FIDE Profile Available</p>}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => openEditModal("players", player)}
                      size="sm"
                      variant="outline"
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete("players", player.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {players.length === 0 && <p className="text-gray-400 text-center py-8">No players added yet.</p>}
            </div>
          )}

          {/* Suggestions Tab */}
          {activeTab === "suggestions" && (
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{suggestion.name}</h3>
                    <span className="text-sm text-gray-400">{new Date(suggestion.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-cyan-400 mb-2">{suggestion.email}</p>
                  <p className="text-gray-300">{suggestion.suggestion}</p>
                </div>
              ))}
              {suggestions.length === 0 && (
                <p className="text-gray-400 text-center py-8">No suggestions received yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="bg-gray-900 border-cyan-400/30 text-white max-w-2xl max-h-[80vh] overflow-y-auto"
          aria-describedby="dialog-description"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyan-400">
              {editingItem ? "Edit" : "Add"} {activeTab.slice(0, -1)}
            </DialogTitle>
            <div id="dialog-description" className="sr-only">
              {editingItem ? "Edit existing" : "Add new"} {activeTab.slice(0, -1)} form
            </div>
          </DialogHeader>

          {/* Event Form */}
          {activeTab === "events" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Name *</label>
                <Input
                  value={eventForm.name}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 border-cyan-400/30 text-white"
                  placeholder="Enter event name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                  <Input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm((prev) => ({ ...prev, date: e.target.value }))}
                    className="bg-gray-800 border-cyan-400/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Time *</label>
                  <Input
                    type="time"
                    value={eventForm.time}
                    onChange={(e) => setEventForm((prev) => ({ ...prev, time: e.target.value }))}
                    className="bg-gray-800 border-cyan-400/30 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Venue *</label>
                <Input
                  value={eventForm.venue}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, venue: e.target.value }))}
                  className="bg-gray-800 border-cyan-400/30 text-white"
                  placeholder="Enter venue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <Textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-cyan-400/30 text-white"
                  placeholder="Enter event description"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Photos (PNG only)</label>
                <Input
                  type="file"
                  accept=".png"
                  multiple
                  onChange={(e) =>
                    handleFileUpload(e.target.files, (urls) => setEventForm((prev) => ({ ...prev, photos: urls })))
                  }
                  className="bg-gray-800 border-cyan-400/30 text-white"
                />
                {eventForm.photos && eventForm.photos.length > 0 && (
                  <p className="text-cyan-400 text-sm mt-2">{eventForm.photos.length} photo(s) selected</p>
                )}
              </div>
              <div className="flex space-x-4">
                <Button onClick={handleAddEvent} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? "Update" : "Add"} Event
                </Button>
                <Button onClick={() => setIsModalOpen(false)} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Achievement Form */}
          {activeTab === "achievements" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Achievement Name *</label>
                <Input
                  value={achievementForm.name}
                  onChange={(e) => setAchievementForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 border-cyan-400/30 text-white"
                  placeholder="Enter achievement name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                  <Input
                    type="date"
                    value={achievementForm.date}
                    onChange={(e) => setAchievementForm((prev) => ({ ...prev, date: e.target.value }))}
                    className="bg-gray-800 border-cyan-400/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Time *</label>
                  <Input
                    type="time"
                    value={achievementForm.time}
                    onChange={(e) => setAchievementForm((prev) => ({ ...prev, time: e.target.value }))}
                    className="bg-gray-800 border-cyan-400/30 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Venue *</label>
                <Input
                  value={achievementForm.venue}
                  onChange={(e) => setAchievementForm((prev) => ({ ...prev, venue: e.target.value }))}
                  className="bg-gray-800 border-cyan-400/30 text-white"
                  placeholder="Enter venue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <Textarea
                  value={achievementForm.description}
                  onChange={(e) => setAchievementForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-cyan-400/30 text-white"
                  placeholder="Enter achievement description"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Photos (PNG only)</label>
                <Input
                  type="file"
                  accept=".png"
                  multiple
                  onChange={(e) =>
                    handleFileUpload(e.target.files, (urls) =>
                      setAchievementForm((prev) => ({ ...prev, photos: urls })),
                    )
                  }
                  className="bg-gray-800 border-cyan-400/30 text-white"
                />
                {achievementForm.photos && achievementForm.photos.length > 0 && (
                  <p className="text-cyan-400 text-sm mt-2">{achievementForm.photos.length} photo(s) selected</p>
                )}
              </div>
              <div className="flex space-x-4">
                <Button onClick={handleAddAchievement} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? "Update" : "Add"} Achievement
                </Button>
                <Button onClick={() => setIsModalOpen(false)} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Player Form */}
          {activeTab === "players" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Player Name *</label>
                <Input
                  value={playerForm.name}
                  onChange={(e) => setPlayerForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 border-cyan-400/30 text-white"
                  placeholder="Enter player name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Position *</label>
                <Input
                  value={playerForm.position}
                  onChange={(e) => setPlayerForm((prev) => ({ ...prev, position: e.target.value }))}
                  className="bg-gray-800 border-cyan-400/30 text-white"
                  placeholder="e.g., Captain, Vice Captain, Player"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">FIDE Rating *</label>
                <Input
                  value={playerForm.rating}
                  onChange={(e) => setPlayerForm((prev) => ({ ...prev, rating: e.target.value }))}
                  className="bg-gray-800 border-cyan-400/30 text-white"
                  placeholder="Enter FIDE rating"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">FIDE URL (Optional)</label>
                <Input
                  value={playerForm.fideUrl}
                  onChange={(e) => setPlayerForm((prev) => ({ ...prev, fideUrl: e.target.value }))}
                  className="bg-gray-800 border-cyan-400/30 text-white"
                  placeholder="Enter FIDE profile URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Team Type *</label>
                <Select
                  value={playerForm.teamType}
                  onValueChange={(value: "inter-iiit" | "college" | "house") =>
                    setPlayerForm((prev) => ({ ...prev, teamType: value, houseTeam: "" }))
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-cyan-400/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-cyan-400/30">
                    <SelectItem value="inter-iiit">Inter IIIT Team</SelectItem>
                    <SelectItem value="college">College Team</SelectItem>
                    <SelectItem value="house">House Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {playerForm.teamType === "house" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">House Team *</label>
                  <Select
                    value={playerForm.houseTeam}
                    onValueChange={(value) => setPlayerForm((prev) => ({ ...prev, houseTeam: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-cyan-400/30 text-white">
                      <SelectValue placeholder="Select house team" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-cyan-400/30">
                      <SelectItem value="trishul">Trishul</SelectItem>
                      <SelectItem value="astra">Astra</SelectItem>
                      <SelectItem value="vajra">Vajra</SelectItem>
                      <SelectItem value="chakra">Chakra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Photo (PNG only) *</label>
                <Input
                  type="file"
                  accept=".png"
                  onChange={(e) =>
                    handleFileUpload(e.target.files, (urls) =>
                      setPlayerForm((prev) => ({ ...prev, photo: urls[0] || "" })),
                    )
                  }
                  className="bg-gray-800 border-cyan-400/30 text-white"
                />
                {playerForm.photo && (
                  <div className="mt-2">
                    <img
                      src={playerForm.photo || "/placeholder.svg"}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex space-x-4">
                <Button onClick={handleAddPlayer} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? "Update" : "Add"} Player
                </Button>
                <Button onClick={() => setIsModalOpen(false)} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
