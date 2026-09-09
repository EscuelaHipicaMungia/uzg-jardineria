import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Star, Send, Loader2, CheckCircle } from "lucide-react";

export default function FormularioResena() {
  const [nombre, setNombre] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [texto, setTexto] = useState("");
  const [estrellas, setEstrellas] = useState(5);
  const [hover, setHover] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !texto) return;
    setSending(true);

    await base44.entities.Resena.create({ nombre, localidad, texto, estrellas });

    setSending(false);
    setSent(true);
  };

  return (
    <section className="py-20 bg-stone-900">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-stone-400 mb-3 block">
            Tu opinión importa
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            ¿Has trabajado con nosotros? <span className="text-green-400">Déjanos tu reseña</span>
          </h2>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-900/40 border border-green-700 rounded-2xl p-10 text-center"
          >
            <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
            <h3 className="text-white text-xl font-bold mb-2">¡Gracias por tu reseña!</h3>
            <p className="text-stone-400">La hemos recibido correctamente. ¡Nos alegra mucho saber tu opinión!</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-stone-800 rounded-2xl p-6 md:p-8 space-y-5"
          >
            {/* Estrellas */}
            <div>
              <label className="text-stone-300 text-sm font-medium mb-2 block">Valoración</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setEstrellas(n)}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        n <= (hover || estrellas)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-stone-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-stone-300 text-sm font-medium mb-1.5 block">Nombre *</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  required
                  className="w-full bg-stone-700 border border-stone-600 rounded-xl px-4 py-3 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-stone-300 text-sm font-medium mb-1.5 block">Localidad</label>
                <input
                  type="text"
                  value={localidad}
                  onChange={e => setLocalidad(e.target.value)}
                  placeholder="Tu localidad"
                  className="w-full bg-stone-700 border border-stone-600 rounded-xl px-4 py-3 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-stone-300 text-sm font-medium mb-1.5 block">Tu reseña *</label>
              <textarea
                value={texto}
                onChange={e => setTexto(e.target.value)}
                placeholder="Cuéntanos cómo fue tu experiencia con UZG Jardinería..."
                required
                rows={4}
                className="w-full bg-stone-700 border border-stone-600 rounded-xl px-4 py-3 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-green-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all"
            >
              {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {sending ? "Enviando..." : "Enviar reseña"}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}