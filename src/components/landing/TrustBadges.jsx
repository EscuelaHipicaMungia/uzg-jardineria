import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, ThumbsUp, Banknote } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Profesionales asegurados", detail: "Trabajo con garantía" },
  { icon: Clock, label: "Puntuales y comprometidos", detail: "Siempre a la hora" },
  { icon: ThumbsUp, label: "Satisfacción garantizada", detail: "No paras hasta estar contento" },
  { icon: Banknote, label: "Presupuesto sin compromiso", detail: "100% gratuito" },
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-white border-y border-stone-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                <badge.icon className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-semibold text-stone-800 text-sm">{badge.label}</p>
              <p className="text-stone-400 text-xs mt-1">{badge.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}