"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff } from "lucide-react"
import AdminDashboard from "@/components/admin-dashboard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem("knightsclub_admin_auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple authentication (in production, use proper authentication)
    if (credentials.username === "admin" && credentials.password === "knights2024") {
      setIsAuthenticated(true)
      sessionStorage.setItem("knightsclub_admin_auth", "true")
      setError("")
    } else {
      setError("Invalid credentials")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("knightsclub_admin_auth")
    setCredentials({ username: "", password: "" })
  }

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white relative overflow-hidden">
      {/* Enhanced Realistic Red Chess Rainfall */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-400/40 text-lg font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 16}px`,
              filter: "blur(0.5px)",
            }}
            animate={{
              y: ["-10vh", "110vh"],
              rotate: [0, Math.random() * 360],
              opacity: [0, 0.8, 0.6, 0],
              scale: [0.8, 1, 1.2, 0.9],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            {["♔", "♕", "♖", "♗", "♘", "♙"][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}

        {/* Additional smaller rain drops for density */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute text-red-300/20 text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: ["-5vh", "105vh"],
              opacity: [0, 0.4, 0.2, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          >
            {["♔", "♕", "♖", "♗", "♘", "♙"][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}

        {/* Rain streaks for more realistic effect */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`streak-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-red-400/30 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${20 + Math.random() * 40}px`,
            }}
            animate={{
              y: ["-20vh", "120vh"],
              opacity: [0, 0.6, 0.3, 0],
            }}
            transition={{
              duration: 1.5 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Red Cyber Background Effects */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-400 text-xs font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
            }}
          >
            {Math.random() > 0.5
              ? `ERROR_${Math.floor(Math.random() * 999)
                  .toString()
                  .padStart(3, "0")}`
              : `ACCESS_${Math.random().toString(16).substring(2, 8).toUpperCase()}`}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-8 border border-red-500/50 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{
            boxShadow: "0 0 50px rgba(239, 68, 68, 0.5)",
            borderColor: "#ef4444",
          }}
        >
          <motion.div
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-red-600/20 rounded-full border border-red-500/50">
                <Lock className="w-8 h-8 text-red-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-red-400 mb-2">Admin Access</h1>
            <p className="text-gray-300">Secure login to Knights Club dashboard</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <Input
                id="username"
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                className="bg-gray-800/50 border-red-500/30 text-white placeholder-gray-400 focus:border-red-400 focus:ring-red-400"
                placeholder="Enter admin username"
              />
            </motion.div>

            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  className="bg-gray-800/50 border-red-500/30 text-white placeholder-gray-400 focus:border-red-400 focus:ring-red-400 pr-10"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {error && (
              <motion.div
                className="text-red-400 text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-semibold">
                <Lock className="w-4 h-4 mr-2" />
                Access Dashboard
              </Button>
            </motion.div>
          </form>

          <motion.div
            className="mt-6 text-center text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Authorized personnel only
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
