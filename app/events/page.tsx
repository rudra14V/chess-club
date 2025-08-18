"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Eye } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ChessRainfall from "@/components/chess-rainfall"
import FloatingParticles from "@/components/floating-particles"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { api } from "@/lib/api"
import BackButton from "@/components/back-button"

interface Event {
  id: string
  name: string
  date: string
  time: string
  venue: string
  description: string
  photos: string[]
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [activeTab, setActiveTab] = useState<"past" | "ongoing" | "upcoming">("upcoming")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await api.getEvents()
        setEvents(Array.isArray(eventsData) ? eventsData : [])
      } catch (error) {
        console.error("Error loading events:", error)
      }
    }
    loadEvents()
  }, [])

  const categorizeEvents = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    return {
      past: events
        .filter((event) => new Date(event.date) < today)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      ongoing: events.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.toDateString() === today.toDateString()
      }),
      upcoming: events
        .filter((event) => new Date(event.date) > today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    }
  }

  const categorizedEvents = categorizeEvents()
  const currentEvents = categorizedEvents[activeTab]

  const tabs = [
    { id: "past" as const, label: "Past Events", count: categorizedEvents.past.length },
    { id: "ongoing" as const, label: "Ongoing Events", count: categorizedEvents.ongoing.length },
    { id: "upcoming" as const, label: "Upcoming Events", count: categorizedEvents.upcoming.length },
  ]

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
            <h1 className="text-5xl font-bold text-cyan-400 mb-4">Chess Events</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our exciting chess tournaments, workshops, and community gatherings.
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

          {/* Events Grid */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)" }}
                  >
                    {event.photos.length > 0 && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={event.photos[0] || "/placeholder.svg"}
                          alt={event.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-white mb-3">{event.name}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                        {event.venue}
                      </div>
                    </div>

                    <p className="text-gray-400 mb-4 line-clamp-3">{event.description}</p>

                    <Button
                      onClick={() => setSelectedEvent(event)}
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
                <p className="text-xl">No {activeTab} events found.</p>
                <p className="mt-2">Check back soon for exciting chess activities!</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="bg-gray-900 border-cyan-400/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyan-400">{selectedEvent?.name}</DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4">
              {selectedEvent.photos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedEvent.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo || "/placeholder.svg"}
                      alt={`${selectedEvent.name} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                  <div>
                    <div className="text-sm text-gray-400">Date</div>
                    <div>{new Date(selectedEvent.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-2 text-cyan-400" />
                  <div>
                    <div className="text-sm text-gray-400">Time</div>
                    <div>{selectedEvent.time}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
                  <div>
                    <div className="text-sm text-gray-400">Venue</div>
                    <div>{selectedEvent.venue}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Description</h4>
                <p className="text-gray-300 leading-relaxed">{selectedEvent.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
