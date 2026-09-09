import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Save, Loader2, ChevronDown, ChevronUp, Eye } from "lucide-react";

const DEFAULTS = [
  { key: "sobremi_foto", label: "Foto (URL)", type: "image", section: "Sobre Mí", value: "" },
  { key: "sobremi_parrafo1", label: "Párrafo 1 — Experiencia y pasión", type: "textarea", section: "Sobre Mí", value: "Llevo más de una década transformando jardines en Euskadi y cada trabajo lo afronto con la misma exigencia que el primero. Me apasiona ver cómo un espacio descuidado se convierte en un lugar en el que da gusto estar. No me conformo con hacer el trabajo: me conformo cuando el cliente sale y dice 'esto es exactamente lo que quería'." },
  { key: "sobremi_parrafo2", label: "Párrafo 2 — Profesionalidad y método", type: "textarea", section: "Sobre Mí", value: "Trabajo con maquinaria profesional de primer nivel y soy obsesivo con dos cosas: la puntualidad y la limpieza. Llego a la hora acordada, termino en el plazo prometido y dejo la zona de trabajo como si nunca hubiera pasado nadie por allí… excepto porque tu jardín ahora luce impecable." },
  { key: "sobremi_nombre", label: "Nombre profesional", type: "text", section: "Sobre Mí", value: "UZG Jardinería" },
  { key: "sobremi_experiencia", label: "Años de experiencia", type: "text", section: "Sobre Mí", value: "+10 años en jardinería profesional" },
  { key: "sobremi_motivacion", label: "Por qué soy jardinero", type: "text", section: "Sobre Mí", value: "Crecí rodeado de naturaleza y supe desde joven que quería trabajar al aire libre transformando espacios" },
  { key: "sobremi_especialidad", label: "Especialidad técnica", type: "text", section: "Sobre Mí", value: "Poda de formación, mantenimiento integral y diseño de jardines" },
  { key: "sobremi_zona", label: "Zona de servicio", type: "text", section: "Sobre Mí", value: "Euskadi (Bizkaia, Gipuzkoa, Álava)" },
  { key: "sobremi_maquinaria", label: "Maquinaria y equipo", type: "text", section: "Sobre Mí", value: "Cortacésped profesional, desbrozadora, motosierra, soplador y herramienta manual de precisión" },
  { key: "sobremi_transformacion", label: "Transformación destacada (opcional)", type: "textarea", section: "Sobre Mí", value: "Un jardín de 800 m² completamente abandonado durante 4 años en Getxo: lo dejamos listo en 3 jornadas, con setos podados, césped uniforme y acceso despejado." },
];

export default function SobreMiAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const existing = await base44.entities.SiteContent.list();
    const existingKeys = existing.map(e => e.key);
    const missing = DEFAULTS.filter(d => !existingKeys.includes(d.key));
    let all = existing.filter(e => DEFAULTS.find(d => d.key === e.key));
    if (missing.length > 0) {
      const created = await base44.entities.SiteContent.bulkCreate(missing);
      all = [...all, ...created];
    }
    // Sort by DEFAULTS order
    all.sort((a, b) => {
      const ai = DEFAULTS.findIndex(d => d.key === a.key);
      const bi = DEFAULTS.findIndex(d => d.key === b.key);
      return ai - bi;
    });
    setItems(all);
    setLoading(false);
  };

  const update = (id, value) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, value } : i));
  };

  const save = async () => {
    setSaving(true);
    for (const item of items) {
      await base44.entities.SiteContent.update(item.id, { value: item.value });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">👤</span>
          <span className="font-bold text-stone-900">Sobre Mí</span>
          <span className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full">{items.length} campos</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
      </button>

      {open && (
        <div className="border-t border-stone-100 px-6 pb-6 pt-4 space-y-4">
          {loading ? (
            <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-stone-400" /></div>
          ) : (
            <>
              {items.map(item => {
                const def = DEFAULTS.find(d => d.key === item.key);
                return (
                  <div key={item.id}>
                    <label className="text-sm font-medium text-stone-600 block mb-1.5">{def?.label || item.key}</label>
                    {def?.type === "textarea" ? (
                      <textarea
                        value={item.value}
                        onChange={e => update(item.id, e.target.value)}
                        rows={3}
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                      />
                    ) : def?.type === "image" ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={item.value}
                          onChange={e => update(item.id, e.target.value)}
                          placeholder="URL de la imagen"
                          className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                        />
                        {item.value && (
                          <div className="relative rounded-xl overflow-hidden h-40 bg-stone-100">
                            <img src={item.value} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Eye className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={item.value}
                        onChange={e => update(item.id, e.target.value)}
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                      />
                    )}
                  </div>
                );
              })}
              <div className="flex justify-end pt-2">
                <button
                  onClick={save}
                  disabled={saving}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar cambios"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}