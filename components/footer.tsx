"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-sm border-t border-cyan-400/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Knights Club</h3>
            <p className="text-gray-300 mb-4">
              Elite chess community fostering strategic excellence and competitive spirit.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h4 className="text-xl font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-cyan-400" />
                <span>knightsclub@chess.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-cyan-400" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-cyan-400" />
                <span>Chess Academy, City Center</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                whileHover={{ scale: 1.2, textShadow: "0 0 10px #00ffff" }}
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                whileHover={{ scale: 1.2, textShadow: "0 0 10px #00ffff" }}
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-cyan-400/30 mt-8 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>&copy; 2024 Knights Club. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
