import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Star, ChevronLeft, ChevronRight, Quote, MapPin } from "lucide-react";

export default function Testimonios() {
  const [testimonios, setTestimonios] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Testimonio.list("orden", 20).then(data => {
      setTestimonios(data);
      setLoading(false);
    });
  }, []);

  if (loading || testimonios.length === 0) return null;

  const prev = () => setCurrent(i => (i - 1 + testimonios.length) % testimonios.length);
  const next = () => setCurrent(i => (i + 1) % testimonios.length);

  const t = testimonios[current];

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
            Lo que dicen nuestros clientes
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
            Clientes satisfechos
            <span className="text-green-600"> en Euskadi</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden"
            >
              {/* Imagen */}
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[260px] bg-stone-100">
                {t.foto_jardin ? (
                  <img
                    src={t.foto_jardin}
                    alt={`Resultado jardinería Vizcaya - ${t.nombre} - UZG Jardinería Unai Zárraga`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-50">
                    <span className="text-6xl">🌿</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Contenido */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <Quote className="w-10 h-10 text-green-200 mb-4" />

                {/* Estrellas */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < (t.valoracion || 5) ? "fill-yellow-400 text-yellow-400" : "text-stone-200"}`}
                    />
                  ))}
                </div>

                <p className="text-stone-700 text-lg leading-relaxed mb-6 italic">
                  "{t.resumen}"
                </p>

                <div>
                  <p className="font-bold text-stone-900 text-lg">{t.nombre}</p>
                  {t.localidad && (
                    <p className="text-stone-400 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {t.localidad}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles */}
          {testimonios.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-md border border-stone-100 flex items-center justify-center hover:bg-stone-50 transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5 text-stone-600" />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-white rounded-full shadow-md border border-stone-100 flex items-center justify-center hover:bg-stone-50 transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5 text-stone-600" />
              </button>
            </>
          )}

          {/* Dots */}
          {testimonios.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-green-600 w-6" : "bg-stone-300"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}