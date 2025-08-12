import { openDB, type DBSchema, type IDBPDatabase } from "idb"

interface ChessClubDB extends DBSchema {
  players: {
    key: number
    value: {
      id?: number
      name: string
      email: string
      rating: number
      team_type: string
      house_team: string
      bio: string
      achievements_count: number
      created_at: string
    }
  }
  achievements: {
    key: number
    value: {
      id?: number
      name: string
      description: string
      icon: string
      difficulty: string
      points: number
      photos: string[]
      created_at: string
    }
  }
  events: {
    key: number
    value: {
      id?: number
      name: string
      description: string
      date: string
      time: string
      venue: string
      type: string
      photos: string[]
      created_at: string
    }
  }
  suggestions: {
    key: number
    value: {
      id?: number
      name: string
      email: string
      message: string
      created_at: string
    }
  }
}

class LocalDatabase {
  private db: IDBPDatabase<ChessClubDB> | null = null

  async init() {
    if (this.db) return this.db

    this.db = await openDB<ChessClubDB>("chess-club-db", 1, {
      upgrade(db) {
        // Create players store
        if (!db.objectStoreNames.contains("players")) {
          const playersStore = db.createObjectStore("players", { keyPath: "id", autoIncrement: true })
          playersStore.createIndex("name", "name")
          playersStore.createIndex("email", "email")
        }

        // Create achievements store
        if (!db.objectStoreNames.contains("achievements")) {
          const achievementsStore = db.createObjectStore("achievements", { keyPath: "id", autoIncrement: true })
          achievementsStore.createIndex("name", "name")
          achievementsStore.createIndex("difficulty", "difficulty")
        }

        // Create events store
        if (!db.objectStoreNames.contains("events")) {
          const eventsStore = db.createObjectStore("events", { keyPath: "id", autoIncrement: true })
          eventsStore.createIndex("date", "date")
          eventsStore.createIndex("type", "type")
        }

        // Create suggestions store
        if (!db.objectStoreNames.contains("suggestions")) {
          const suggestionsStore = db.createObjectStore("suggestions", { keyPath: "id", autoIncrement: true })
          suggestionsStore.createIndex("created_at", "created_at")
        }
      },
    })

    return this.db
  }

  // Players operations
  async getPlayers() {
    const db = await this.init()
    return await db.getAll("players")
  }

  async createPlayer(player: Omit<ChessClubDB["players"]["value"], "id" | "created_at">) {
    const db = await this.init()
    const newPlayer = {
      ...player,
      created_at: new Date().toISOString(),
    }
    const id = await db.add("players", newPlayer)
    return { ...newPlayer, id }
  }

  async updatePlayer(id: number, player: Partial<ChessClubDB["players"]["value"]>) {
    const db = await this.init()
    const existing = await db.get("players", id)
    if (!existing) throw new Error("Player not found")

    const updated = { ...existing, ...player }
    await db.put("players", updated)
    return updated
  }

  async deletePlayer(id: number) {
    const db = await this.init()
    await db.delete("players", id)
  }

  // Achievements operations
  async getAchievements() {
    const db = await this.init()
    return await db.getAll("achievements")
  }

  async createAchievement(achievement: Omit<ChessClubDB["achievements"]["value"], "id" | "created_at">) {
    const db = await this.init()
    const newAchievement = {
      ...achievement,
      created_at: new Date().toISOString(),
    }
    const id = await db.add("achievements", newAchievement)
    return { ...newAchievement, id }
  }

  async updateAchievement(id: number, achievement: Partial<ChessClubDB["achievements"]["value"]>) {
    const db = await this.init()
    const existing = await db.get("achievements", id)
    if (!existing) throw new Error("Achievement not found")

    const updated = { ...existing, ...achievement }
    await db.put("achievements", updated)
    return updated
  }

  async deleteAchievement(id: number) {
    const db = await this.init()
    await db.delete("achievements", id)
  }

  // Events operations
  async getEvents() {
    const db = await this.init()
    return await db.getAll("events")
  }

  async createEvent(event: Omit<ChessClubDB["events"]["value"], "id" | "created_at">) {
    const db = await this.init()
    const newEvent = {
      ...event,
      created_at: new Date().toISOString(),
    }
    const id = await db.add("events", newEvent)
    return { ...newEvent, id }
  }

  async updateEvent(id: number, event: Partial<ChessClubDB["events"]["value"]>) {
    const db = await this.init()
    const existing = await db.get("events", id)
    if (!existing) throw new Error("Event not found")

    const updated = { ...existing, ...event }
    await db.put("events", updated)
    return updated
  }

  async deleteEvent(id: number) {
    const db = await this.init()
    await db.delete("events", id)
  }

  // Suggestions operations
  async getSuggestions() {
    const db = await this.init()
    return await db.getAll("suggestions")
  }

  async createSuggestion(suggestion: Omit<ChessClubDB["suggestions"]["value"], "id" | "created_at">) {
    const db = await this.init()
    const newSuggestion = {
      ...suggestion,
      created_at: new Date().toISOString(),
    }
    const id = await db.add("suggestions", newSuggestion)
    return { ...newSuggestion, id }
  }

  async deleteSuggestion(id: number) {
    const db = await this.init()
    await db.delete("suggestions", id)
  }
}

export type Player = ChessClubDB["players"]["value"]
export type Achievement = ChessClubDB["achievements"]["value"]
export type Event = ChessClubDB["events"]["value"]
export type Suggestion = ChessClubDB["suggestions"]["value"]

export const localDB = new LocalDatabase()
export const db = localDB
