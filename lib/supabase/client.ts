import { createClient } from "@supabase/supabase-js"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

// Create Supabase client
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Database types matching the schema
export interface Player {
  id: string
  name: string
  email: string
  rating: number
  team_type: string
  house_team: string
  bio: string
  join_date: string
  achievements_count: number
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  name: string
  description: string
  date: string
  time: string
  venue: string
  type: string
  max_participants: number
  current_participants: number
  photos: string[]
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  difficulty: string
  points: number
  photos: string[]
  created_at: string
  updated_at: string
}

export interface Suggestion {
  id: string
  name: string
  email: string
  message: string
  status: string
  created_at: string
  updated_at: string
}
