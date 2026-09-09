import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GaleriaFotos() {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null); // index

  useEffect(() => {
    base44.entities.FotoGaleria.list("orden", 50).then(data => {
      setFotos(data);
      setLoading(false);
    });
  }, []);

  if (loading || fotos.length === 0) return null;

  const prev = () => setLightbox(i => (i - 1 + fotos.length) % fotos.length);
  const next = () => setLightbox(i => (i + 1) % fotos.length);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-stone-400 mb-4 block">
            Nuestro trabajo
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
            Galería de
            <span className="text-green-600"> trabajos realizados</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {fotos.map((foto, i) => (
            <motion.div
              key={foto.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-stone-100"
              onClick={() => setLightbox(i)}
            >
              <img
                src={foto.url}
                alt={foto.titulo ? `${foto.titulo} – UZG Jardinería Unai Zárraga Vizcaya` : "Trabajo de jardinería en Vizcaya – UZG Jardinería Unai Zárraga"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {foto.titulo && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  <p className="text-white text-sm font-medium px-3 pb-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {foto.titulo}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white"
              onClick={() => setLightbox(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={fotos[lightbox]?.url}
              alt={fotos[lightbox]?.titulo ? `${fotos[lightbox].titulo} – UZG Jardinería Unai Zárraga Vizcaya` : "Jardinería profesional en Vizcaya – UZG Jardinería Unai Zárraga"}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            {fotos[lightbox]?.titulo && (
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium">
                {fotos[lightbox].titulo}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}