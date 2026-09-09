import React from "react";
import { motion } from "framer-motion";
import { Frown, Clock, TrendingDown } from "lucide-react";

const pains = [
  {
    icon: Frown,
    title: "Da mala imagen",
    description: "Un jardín descuidado transmite abandono. Los vecinos lo notan, las visitas lo notan... y tú también, cada vez que miras por la ventana.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Clock,
    title: "Te roba tiempo y energía",
    description: "Los fines de semana son para descansar, no para pasarlos arrancando malas hierbas bajo el sol. Tu tiempo libre vale demasiado.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: TrendingDown,
    title: "Tu propiedad pierde valor",
    description: "Un exterior descuidado puede reducir el valor percibido de tu casa hasta un 15%. Un jardín bonito, en cambio, es una inversión que se ve.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

export default function PainPoints() {
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
            ¿Te suena esto?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
            Un jardín descuidado es más
            <br className="hidden md:block" />
            <span className="text-red-500"> problema</span> de lo que parece
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pains.map((pain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100"
            >
              <div className={`w-14 h-14 rounded-2xl ${pain.bg} flex items-center justify-center mb-6`}>
                <pain.icon className={`w-7 h-7 ${pain.color}`} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{pain.title}</h3>
              <p className="text-stone-500 leading-relaxed">{pain.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}