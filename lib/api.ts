import { localDB as db, type Player, type Event, type Achievement, type Suggestion } from "./database"

class KnightsClubAPI {
  // Events API
  async getEvents(): Promise<Event[]> {
    try {
      return await db.getEvents()
    } catch (error) {
      console.error("Error fetching events:", error)
      return []
    }
  }

  async createEvent(event: Partial<Event>): Promise<Event> {
    try {
      return await db.createEvent(event as Omit<Event, "id" | "created_at">)
    } catch (error) {
      console.error("Error creating event:", error)
      throw new Error("Failed to create event")
    }
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    try {
      return await db.updateEvent(Number.parseInt(id), event)
    } catch (error) {
      console.error("Error updating event:", error)
      throw new Error("Failed to update event")
    }
  }

  async deleteEvent(id: string): Promise<{ success: boolean }> {
    try {
      await db.deleteEvent(Number.parseInt(id))
      return { success: true }
    } catch (error) {
      console.error("Error deleting event:", error)
      throw new Error("Failed to delete event")
    }
  }

  // Achievements API
  async getAchievements(): Promise<Achievement[]> {
    try {
      return await db.getAchievements()
    } catch (error) {
      console.error("Error fetching achievements:", error)
      return []
    }
  }

  async createAchievement(achievement: Partial<Achievement>): Promise<Achievement> {
    try {
      return await db.createAchievement(achievement as Omit<Achievement, "id" | "created_at">)
    } catch (error) {
      console.error("Error creating achievement:", error)
      throw new Error("Failed to create achievement")
    }
  }

  async updateAchievement(id: string, achievement: Partial<Achievement>): Promise<Achievement> {
    try {
      return await db.updateAchievement(Number.parseInt(id), achievement)
    } catch (error) {
      console.error("Error updating achievement:", error)
      throw new Error("Failed to update achievement")
    }
  }

  async deleteAchievement(id: string): Promise<{ success: boolean }> {
    try {
      await db.deleteAchievement(Number.parseInt(id))
      return { success: true }
    } catch (error) {
      console.error("Error deleting achievement:", error)
      throw new Error("Failed to delete achievement")
    }
  }

  // Players API
  async getPlayers(): Promise<Player[]> {
    try {
      return await db.getPlayers()
    } catch (error) {
      console.error("Error fetching players:", error)
      return []
    }
  }

  async createPlayer(player: Partial<Player>): Promise<Player> {
    try {
      return await db.createPlayer(player as Omit<Player, "id" | "created_at">)
    } catch (error) {
      console.error("Error creating player:", error)
      throw new Error("Failed to create player")
    }
  }

  async updatePlayer(id: string, player: Partial<Player>): Promise<Player> {
    try {
      return await db.updatePlayer(Number.parseInt(id), player)
    } catch (error) {
      console.error("Error updating player:", error)
      throw new Error("Failed to update player")
    }
  }

  async deletePlayer(id: string): Promise<{ success: boolean }> {
    try {
      await db.deletePlayer(Number.parseInt(id))
      return { success: true }
    } catch (error) {
      console.error("Error deleting player:", error)
      throw new Error("Failed to delete player")
    }
  }

  // Suggestions API
  async getSuggestions(): Promise<Suggestion[]> {
    try {
      return await db.getSuggestions()
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      return []
    }
  }

  async createSuggestion(suggestion: Partial<Suggestion>): Promise<Suggestion> {
    try {
      return await db.createSuggestion(suggestion as Omit<Suggestion, "id" | "created_at">)
    } catch (error) {
      console.error("Error creating suggestion:", error)
      throw new Error("Failed to create suggestion")
    }
  }

  // Simplified relationship methods (for compatibility)
  async getPlayerAchievements(playerId: string) {
    return []
  }

  async addPlayerAchievement(playerId: string, achievementId: string) {
    return { success: true }
  }

  async getEventParticipants(eventId: string) {
    return []
  }

  async addEventParticipant(eventId: string, playerId: string) {
    return { success: true }
  }
}

export const api = new KnightsClubAPI()
