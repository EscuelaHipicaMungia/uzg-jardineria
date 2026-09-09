import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { User, Clock, Heart, Wrench, MapPin, Zap, Star, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/34623063799?text=Hola%2C%20me%20gustar%C3%ADa%20pedir%20un%20presupuesto%20para%20mi%20jard%C3%ADn";

const KEYS = [
  "sobremi_foto",
  "sobremi_parrafo1",
  "sobremi_parrafo2",
  "sobremi_nombre",
  "sobremi_experiencia",
  "sobremi_motivacion",
  "sobremi_especialidad",
  "sobremi_zona",
  "sobremi_maquinaria",
  "sobremi_transformacion",
];

const DATOS_ICONS = {
  sobremi_nombre: User,
  sobremi_experiencia: Clock,
  sobremi_motivacion: Heart,
  sobremi_especialidad: Wrench,
  sobremi_zona: MapPin,
  sobremi_maquinaria: Zap,
  sobremi_transformacion: Star,
};

const DATOS_LABELS = {
  sobremi_nombre: "Nombre profesional",
  sobremi_experiencia: "Años de experiencia",
  sobremi_motivacion: "Por qué soy jardinero",
  sobremi_especialidad: "Especialidad técnica",
  sobremi_zona: "Zona de servicio",
  sobremi_maquinaria: "Maquinaria y equipo",
  sobremi_transformacion: "Transformación destacada",
};

export default function SobreMi() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SiteContent.list().then(items => {
      const map = {};
      items.forEach(i => { map[i.key] = i.value; });
      setContent(map);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  const datoKeys = [
    "sobremi_nombre", "sobremi_experiencia", "sobremi_motivacion",
    "sobremi_especialidad", "sobremi_zona", "sobremi_maquinaria", "sobremi_transformacion"
  ];

  return (
    <section id="sobre-mi" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-stone-400 mb-4 block">
            Detrás del trabajo
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
            La mano experta
            <span className="text-green-600"> detrás de tu jardín</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-stone-100 shadow-xl">
              {content.sobremi_foto ? (
                <img
                  src={content.sobremi_foto}
                  alt="Unai Zárraga jardinero profesional UZG Jardinería Vizcaya"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-green-50 gap-4">
                  <span className="text-6xl">🌿</span>
                  <p className="text-stone-400 text-sm">Añade tu foto desde el panel admin</p>
                </div>
              )}
            </div>
            {/* Badge */}
            <div className="absolute -bottom-5 -right-5 bg-green-600 text-white rounded-2xl p-4 shadow-lg">
              <p className="text-3xl font-bold leading-none">{content.sobremi_experiencia?.split(" ")[0] || "+"}</p>
              <p className="text-xs font-medium text-green-200 mt-1">años de exp.</p>
            </div>
          </motion.div>

          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Párrafos */}
            <div className="space-y-4">
              <p className="text-stone-700 text-lg leading-relaxed">
                {content.sobremi_parrafo1 || ""}
              </p>
              <p className="text-stone-600 leading-relaxed">
                {content.sobremi_parrafo2 || ""}
              </p>
            </div>

            {/* Datos clave */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {datoKeys.map(key => {
                const val = content[key];
                if (!val) return null;
                const Icon = DATOS_ICONS[key];
                const label = DATOS_LABELS[key];
                return (
                  <div key={key} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">{label}</span>
                      <p className="text-stone-800 font-medium text-sm mt-0.5">{val}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-4 rounded-2xl shadow-lg shadow-green-600/30 transition-all hover:scale-105 mt-4"
            >
              <MessageCircle className="w-5 h-5" />
              Hablar con UZG Jardinería por WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}