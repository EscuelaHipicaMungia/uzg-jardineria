import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";

export default function MaquinariaCarrusel() {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Maquinaria.list("orden", 50).then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  if (loading || items.length === 0) return null;

  const prev = () => setCurrent(i => (i - 1 + items.length) % items.length);
  const next = () => setCurrent(i => (i + 1) % items.length);

  // Show up to 3 items at once on desktop
  const visible = [];
  for (let i = 0; i < Math.min(3, items.length); i++) {
    visible.push(items[(current + i) % items.length]);
  }

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
            Herramientas del oficio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
            Maquinaria
            <span className="text-green-600"> profesional</span>
          </h2>
          <p className="text-stone-500 mt-4 max-w-xl mx-auto">
            Trabajamos con equipos de primer nivel para garantizar resultados impecables en cada trabajo.
          </p>
        </motion.div>

        <div className="relative">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/3] bg-stone-100 overflow-hidden">
                    {item.foto ? (
                      <img
                        src={item.foto}
                        alt={item.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-50">
                        <Wrench className="w-12 h-12 text-green-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-stone-900 text-lg text-center">{item.nombre}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {items.length > 3 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-11 h-11 bg-white rounded-full shadow-md border border-stone-100 flex items-center justify-center hover:bg-stone-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-stone-600" />
              </button>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all ${i === current ? "bg-green-600 w-6" : "bg-stone-300 w-2"}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-11 h-11 bg-white rounded-full shadow-md border border-stone-100 flex items-center justify-center hover:bg-stone-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-stone-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}