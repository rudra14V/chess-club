import { supabase, type Player, type Event, type Achievement, type Suggestion } from "./supabase/client"

class KnightsClubAPI {
  // Events API
  async getEvents(): Promise<Event[]> {
    try {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching events:", error)
      return []
    }
  }

  async createEvent(event: Partial<Event>): Promise<Event> {
    try {
      const { data, error } = await supabase
        .from("events")
        .insert([
          {
            name: event.name,
            description: event.description,
            date: event.date,
            time: event.time,
            venue: event.venue,
            type: event.type,
            max_participants: event.max_participants || 0,
            current_participants: event.current_participants || 0,
            photos: event.photos || [],
          },
        ])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error creating event:", error)
      throw new Error("Failed to create event")
    }
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    try {
      const { data, error } = await supabase
        .from("events")
        .update({
          name: event.name,
          description: event.description,
          date: event.date,
          time: event.time,
          venue: event.venue,
          type: event.type,
          max_participants: event.max_participants,
          current_participants: event.current_participants,
          photos: event.photos,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error updating event:", error)
      throw new Error("Failed to update event")
    }
  }

  async deleteEvent(id: string): Promise<{ success: boolean }> {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error("Error deleting event:", error)
      throw new Error("Failed to delete event")
    }
  }

  // Achievements API
  async getAchievements(): Promise<Achievement[]> {
    try {
      const { data, error } = await supabase.from("achievements").select("*").order("points", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching achievements:", error)
      return []
    }
  }

  async createAchievement(achievement: Partial<Achievement>): Promise<Achievement> {
    try {
      const { data, error } = await supabase
        .from("achievements")
        .insert([
          {
            name: achievement.name,
            description: achievement.description,
            icon: achievement.icon,
            difficulty: achievement.difficulty,
            points: achievement.points || 0,
            photos: achievement.photos || [],
          },
        ])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error creating achievement:", error)
      throw new Error("Failed to create achievement")
    }
  }

  async updateAchievement(id: string, achievement: Partial<Achievement>): Promise<Achievement> {
    try {
      const { data, error } = await supabase
        .from("achievements")
        .update({
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          difficulty: achievement.difficulty,
          points: achievement.points,
          photos: achievement.photos,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error updating achievement:", error)
      throw new Error("Failed to update achievement")
    }
  }

  async deleteAchievement(id: string): Promise<{ success: boolean }> {
    try {
      const { error } = await supabase.from("achievements").delete().eq("id", id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error("Error deleting achievement:", error)
      throw new Error("Failed to delete achievement")
    }
  }

  // Players API
  async getPlayers(): Promise<Player[]> {
    try {
      const { data, error } = await supabase.from("players").select("*").order("rating", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching players:", error)
      return []
    }
  }

  async createPlayer(player: Partial<Player>): Promise<Player> {
    try {
      const { data, error } = await supabase
        .from("players")
        .insert([
          {
            name: player.name,
            email: player.email,
            rating: player.rating || 1200,
            team_type: player.team_type,
            house_team: player.house_team,
            bio: player.bio,
            join_date: player.join_date || new Date().toISOString().split("T")[0],
            achievements_count: player.achievements_count || 0,
          },
        ])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error creating player:", error)
      throw new Error("Failed to create player")
    }
  }

  async updatePlayer(id: string, player: Partial<Player>): Promise<Player> {
    try {
      const { data, error } = await supabase
        .from("players")
        .update({
          name: player.name,
          email: player.email,
          rating: player.rating,
          team_type: player.team_type,
          house_team: player.house_team,
          bio: player.bio,
          join_date: player.join_date,
          achievements_count: player.achievements_count,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error updating player:", error)
      throw new Error("Failed to update player")
    }
  }

  async deletePlayer(id: string): Promise<{ success: boolean }> {
    try {
      const { error } = await supabase.from("players").delete().eq("id", id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error("Error deleting player:", error)
      throw new Error("Failed to delete player")
    }
  }

  // Suggestions API
  async getSuggestions(): Promise<Suggestion[]> {
    try {
      const { data, error } = await supabase.from("suggestions").select("*").order("created_at", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      return []
    }
  }

  async createSuggestion(suggestion: Partial<Suggestion>): Promise<Suggestion> {
    try {
      const { data, error } = await supabase
        .from("suggestions")
        .insert([
          {
            name: suggestion.name,
            email: suggestion.email,
            message: suggestion.message,
            status: suggestion.status || "pending",
          },
        ])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error creating suggestion:", error)
      throw new Error("Failed to create suggestion")
    }
  }

  // Relationship methods for future use
  async getPlayerAchievements(playerId: string) {
    try {
      const { data, error } = await supabase
        .from("player_achievements")
        .select(`
          *,
          achievements (*)
        `)
        .eq("player_id", playerId)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching player achievements:", error)
      return []
    }
  }

  async addPlayerAchievement(playerId: string, achievementId: string) {
    try {
      const { data, error } = await supabase
        .from("player_achievements")
        .insert([
          {
            player_id: playerId,
            achievement_id: achievementId,
            earned_date: new Date().toISOString().split("T")[0],
          },
        ])
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error("Error adding player achievement:", error)
      return { success: false }
    }
  }

  async getEventParticipants(eventId: string) {
    try {
      const { data, error } = await supabase
        .from("event_participants")
        .select(`
          *,
          players (*)
        `)
        .eq("event_id", eventId)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching event participants:", error)
      return []
    }
  }

  async addEventParticipant(eventId: string, playerId: string) {
    try {
      const { data, error } = await supabase
        .from("event_participants")
        .insert([
          {
            event_id: eventId,
            player_id: playerId,
            registration_date: new Date().toISOString().split("T")[0],
          },
        ])
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error("Error adding event participant:", error)
      return { success: false }
    }
  }
}

export const api = new KnightsClubAPI()
