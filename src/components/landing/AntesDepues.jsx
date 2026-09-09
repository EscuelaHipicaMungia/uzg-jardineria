import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AntesDepues() {
  const [pares, setPares] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.AntesDepues.list("orden", 20).then(data => {
      setPares(data);
      setLoading(false);
    });
  }, []);

  if (loading || pares.length === 0) return null;

  const prev = () => setCurrent(i => (i - 1 + pares.length) % pares.length);
  const next = () => setCurrent(i => (i + 1) % pares.length);

  const par = pares[current];

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
            Resultados reales
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
            Antes <span className="text-stone-400">&</span>{" "}
            <span className="text-green-600">Después</span>
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
            >
              {par.titulo && (
                <p className="text-center text-stone-500 text-sm font-medium mb-6 uppercase tracking-widest">
                  {par.titulo}
                </p>
              )}
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                {/* Antes */}
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-square md:aspect-[4/3]">
                  <img
                    src={par.foto_antes}
                    alt="Antes - jardín descuidado en Vizcaya antes de UZG Jardinería"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="text-white font-bold text-sm md:text-base tracking-wide">ANTES</span>
                  </div>
                </div>

                {/* Después */}
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-square md:aspect-[4/3]">
                  <img
                    src={par.foto_despues}
                    alt="Después - jardín transformado por Unai Zárraga UZG Jardinería Vizcaya"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900/70 to-transparent p-4">
                    <span className="text-white font-bold text-sm md:text-base tracking-wide">DESPUÉS</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles */}
          {pares.length > 1 && (
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
          {pares.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {pares.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all ${i === current ? "bg-green-600 w-6" : "bg-stone-300 w-2.5"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}