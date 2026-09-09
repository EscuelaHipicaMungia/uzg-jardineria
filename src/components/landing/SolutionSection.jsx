import React from "react";
import { motion } from "framer-motion";
import { Scissors, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const steps = [
  {
    number: "01",
    icon: Sparkles,
    title: "Limpieza completa",
    description: "Retiramos todo lo que sobra: malas hierbas, hojas secas, ramas caídas y residuos acumulados. Tu jardín respira desde el primer día.",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80",
  },
  {
    number: "02",
    icon: Scissors,
    title: "Poda estética y profesional",
    description: "Damos forma a setos, arbustos y árboles con técnicas profesionales. Cada corte tiene un propósito: belleza, salud y armonía visual.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Mantenimiento integral",
    description: "Nos encargamos de todo: riego, abono, control de plagas y cuidado continuo. Tú solo disfruta de un jardín impecable, siempre.",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&q=80",
  },
];

export default function SolutionSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-green-600 mb-4 block">
            Así trabajamos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
            De jardín olvidado a
            <span className="text-green-600"> espacio de ensueño</span>
          </h2>
          <p className="text-stone-500 mt-4 text-lg max-w-2xl mx-auto">
            Un proceso sencillo, transparente y sin sorpresas. Nosotros hacemos el trabajo duro para que tú disfrutes el resultado.
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-16`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                    <span className="text-green-700 font-bold text-sm">Paso {step.number}</span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2">
                <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-stone-500 text-lg leading-relaxed mb-6">
                  {step.description}
                </p>
                {index === steps.length - 1 && (
                  <WhatsAppButton text="Quiero mi jardín así" variant="primary" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}