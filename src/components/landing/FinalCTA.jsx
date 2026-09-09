import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Leaf, FileText } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

export default function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80"
          alt="Jardín cuidado por UZG Jardinería Unai Zárraga en Euskadi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-emerald-900/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 border border-white/20 mb-8">
            <Leaf className="w-4 h-4 text-green-300" />
            <span className="text-white/80 text-sm font-medium">Da el primer paso hoy</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Tu jardín perfecto está a
            <span className="block text-green-300"> un mensaje de distancia</span>
          </h2>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Escríbenos por WhatsApp, cuéntanos qué necesitas y te enviamos un presupuesto personalizado sin compromiso.
            <span className="text-white font-medium"> Respondemos en menos de 2 horas.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <WhatsAppButton variant="large" text="Pedir presupuesto gratis" />
            <a
              href="https://forms.gle/huTYNXzhmChZzooa6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-7 py-4 rounded-2xl border border-white/30 transition-all hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              Rellenar formulario
            </a>
          </div>

          {/* Phone number */}
          <div className="flex items-center justify-center gap-3 text-white/60">
            <Phone className="w-5 h-5" />
            <a href="tel:+34623063799" className="text-lg hover:text-white transition-colors">
              623 06 37 99
            </a>
            <span className="text-white/30">·</span>
            <span className="text-sm">También puedes llamarnos</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}