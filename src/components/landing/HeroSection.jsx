import React from "react";
import { motion } from "framer-motion";
import { Leaf, Star } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80"
          alt="Jardín profesional en Vizcaya - UZG Jardinería Unai Zárraga"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-40 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="text-white/90 text-sm font-medium tracking-wide">Jardinería Profesional en Euskadi</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Tu jardín merece
            <span className="block text-green-400">verse increíble</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed max-w-xl"
          >
            Transformamos jardines descuidados en espacios de relax en los que da gusto estar.
            <span className="text-white font-medium"> Sin que muevas un dedo.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-2 mb-10"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-white/70 text-sm ml-2">Clientes satisfechos en Euskadi</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <WhatsAppButton variant="large" />
            <p className="text-white/50 text-sm mt-4 ml-1">
              Presupuesto gratuito · Respuesta en menos de 2 horas
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent z-10" />
    </section>
  );
}