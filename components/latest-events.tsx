"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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

export default function LatestEvents() {
  const [events, setEvents] = useState<Event[]>([])
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

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  return (
    <motion.section
      className="mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-12">Latest Events</h2>

      {upcomingEvents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.2 }}
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
        <div className="text-center text-gray-400">
          <p className="text-xl">No upcoming events at the moment.</p>
          <p className="mt-2">Check back soon for exciting chess tournaments and activities!</p>
        </div>
      )}

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
    </motion.section>
  )
}
