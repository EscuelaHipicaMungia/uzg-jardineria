import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ChevronDown, ChevronUp, Loader2, Eye, EyeOff } from "lucide-react";

const SECTIONS = [
  { key: "hero", label: "🏠 Héroe (portada)" },
  { key: "pain_points", label: "⚠️ Problemas (puntos de dolor)" },
  { key: "trust_badges", label: "✅ Insignias de confianza" },
  { key: "solution", label: "🌿 Solución (servicios)" },
  { key: "sobre_mi", label: "👤 Sobre Mí" },
  { key: "maquinaria", label: "🔧 Mi Maquinaria" },
  { key: "antes_despues", label: "📸 Antes & Después" },
  { key: "testimonios", label: "💬 Testimonios" },
  { key: "galeria", label: "🖼️ Galería de fotos" },
  { key: "videos_youtube", label: "▶️ Vídeos de YouTube" },
  { key: "documentos_pdf", label: "📄 Documentos PDF" },
  { key: "cta_final", label: "📱 CTA Final (contacto)" },
];

export default function VisibilityAdmin({ visibility, onVisibilityChange }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const existing = await base44.entities.SectionVisibility.list();
    const existingKeys = existing.map(e => e.section_key);
    const missing = SECTIONS.filter(s => !existingKeys.includes(s.key));
    let all = [...existing];
    if (missing.length > 0) {
      const created = await base44.entities.SectionVisibility.bulkCreate(
        missing.map(s => ({ section_key: s.key, label: s.label, visible: true }))
      );
      all = [...all, ...created];
    }
    // Sort by SECTIONS order
    all.sort((a, b) => {
      const ai = SECTIONS.findIndex(s => s.key === a.section_key);
      const bi = SECTIONS.findIndex(s => s.key === b.section_key);
      return ai - bi;
    });
    setItems(all);
    setLoading(false);
    // Notify parent
    const map = {};
    all.forEach(i => { map[i.section_key] = i.visible; });
    onVisibilityChange(map);
  };

  const toggle = async (item) => {
    const newVisible = !item.visible;
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, visible: newVisible } : i));
    await base44.entities.SectionVisibility.update(item.id, { visible: newVisible });
    // Notify parent
    setItems(prev => {
      const map = {};
      prev.map(i => i.id === item.id ? { ...i, visible: newVisible } : i).forEach(i => { map[i.section_key] = i.visible; });
      onVisibilityChange(map);
      return prev.map(i => i.id === item.id ? { ...i, visible: newVisible } : i);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border-2 border-green-200 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-green-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">👁️</span>
          <div className="text-left">
            <span className="font-bold text-stone-900 block">Visibilidad de secciones</span>
            <span className="text-xs text-stone-400">Activa o desactiva cada sección de la web</span>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
      </button>

      {open && (
        <div className="border-t border-stone-100 px-6 pb-6 pt-4 space-y-3">
          {loading ? (
            <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-stone-400" /></div>
          ) : (
            items.map(item => {
              const def = SECTIONS.find(s => s.key === item.section_key);
              return (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                  <span className="text-sm font-medium text-stone-700">{def?.label || item.section_key}</span>
                  <button
                    onClick={() => toggle(item)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      item.visible
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-stone-100 text-stone-400 hover:bg-stone-200"
                    }`}
                  >
                    {item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    {item.visible ? "Visible" : "Oculta"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}