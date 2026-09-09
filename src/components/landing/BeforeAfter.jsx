import React from "react";
import { motion } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";

// Placeholder gallery — replace these with real before/after photos
const gallery = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1621149437721-35f889c33281?w=600&q=80",
    after: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80",
    label: "Jardín residencial · Madrid",
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1599629954294-43a0e9bdfc25?w=600&q=80",
    after: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80",
    label: "Patio exterior · Barcelona",
  },
  {
    id: 3,
    before: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
    after: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    label: "Chalet privado · Valencia",
  },
];

function GalleryCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group"
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100">
        <div className="grid grid-cols-2 gap-0">
          {/* Before */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={item.before}
              alt="Antes"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
              ANTES
            </div>
          </div>

          {/* After */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={item.after}
              alt="Después"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-3 right-3 bg-green-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
              DESPUÉS
            </div>
          </div>
        </div>

        {/* Arrow overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-white rounded-full p-2 shadow-md">
            <ArrowRight className="w-4 h-4 text-stone-600" />
          </div>
        </div>

        <div className="p-4 text-center">
          <p className="text-stone-500 text-sm font-medium">{item.label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-stone-400 mb-4 block">
            Resultados reales
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
            El cambio habla
            <span className="text-green-600"> por sí solo</span>
          </h2>
          <p className="text-stone-500 mt-4 text-lg max-w-xl mx-auto">
            Mira lo que conseguimos en cada proyecto. Estos son resultados reales de clientes como tú.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {gallery.map((item, index) => (
            <GalleryCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 text-stone-400 text-sm bg-white rounded-full px-5 py-3 border border-stone-200">
            <Camera className="w-4 h-4" />
            <span>Fotos de ejemplo · Sube tus propios Antes y Después</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}