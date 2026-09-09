import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ChevronDown, ChevronUp, Plus, Trash2, Loader2, Save, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GaleriaAdmin() {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [nueva, setNueva] = useState({ url: "", titulo: "", orden: "" });
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    base44.entities.FotoGaleria.list("orden", 50).then(data => {
      setFotos(data);
      setLoading(false);
    });
  }, []);

  const updateFoto = (id, field, value) => {
    setFotos(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const saveAll = async () => {
    setSaving(true);
    for (const f of fotos) {
      await base44.entities.FotoGaleria.update(f.id, { url: f.url, titulo: f.titulo, orden: f.orden });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const deleteFoto = async (id) => {
    await base44.entities.FotoGaleria.delete(id);
    setFotos(prev => prev.filter(f => f.id !== id));
  };

  const addFoto = async () => {
    if (!nueva.url) return;
    const created = await base44.entities.FotoGaleria.create(nueva);
    setFotos(prev => [...prev, created]);
    setNueva({ url: "", titulo: "", orden: "" });
    setAddingNew(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🖼️</span>
          <span className="font-bold text-stone-900">Galería de fotos</span>
          <span className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full">{fotos.length} fotos</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-stone-100 pt-4 space-y-4">
              {loading ? (
                <div className="flex justify-center py-4"><Loader2 className="w-6 h-6 animate-spin text-stone-400" /></div>
              ) : (
                <>
                  {fotos.map(foto => (
                    <div key={foto.id} className="border border-stone-100 rounded-xl p-4 space-y-3">
                      <div className="flex gap-3">
                        {foto.url && (
                          <img src={foto.url} alt="" className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                        )}
                        <div className="flex-1 space-y-2 min-w-0">
                          <input
                            type="text"
                            value={foto.url}
                            onChange={e => updateFoto(foto.id, "url", e.target.value)}
                            placeholder="URL de la foto"
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                          />
                          <input
                            type="text"
                            value={foto.titulo || ""}
                            onChange={e => updateFoto(foto.id, "titulo", e.target.value)}
                            placeholder="Título (opcional)"
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                          />
                          <input
                            type="number"
                            value={foto.orden || ""}
                            onChange={e => updateFoto(foto.id, "orden", Number(e.target.value))}
                            placeholder="Orden"
                            className="w-28 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                          />
                        </div>
                        <button onClick={() => deleteFoto(foto.id)} className="text-red-400 hover:text-red-600 self-start">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {addingNew ? (
                    <div className="bg-stone-50 rounded-xl p-4 space-y-3 border-2 border-dashed border-stone-200">
                      <p className="text-sm font-semibold text-stone-700">Nueva foto</p>
                      <input type="text" placeholder="URL de la foto *" value={nueva.url}
                        onChange={e => setNueva(p => ({ ...p, url: e.target.value }))}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                      <input type="text" placeholder="Título (opcional)" value={nueva.titulo}
                        onChange={e => setNueva(p => ({ ...p, titulo: e.target.value }))}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                      <input type="number" placeholder="Orden" value={nueva.orden}
                        onChange={e => setNueva(p => ({ ...p, orden: Number(e.target.value) }))}
                        className="w-28 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                      <div className="flex gap-2">
                        <button onClick={addFoto} className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700">Añadir</button>
                        <button onClick={() => setAddingNew(false)} className="text-stone-500 text-sm px-4 py-2 rounded-lg hover:bg-stone-200">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setAddingNew(true)} className="flex items-center gap-2 text-sm text-stone-400 hover:text-green-600 transition-colors">
                      <Plus className="w-4 h-4" /> Añadir foto
                    </button>
                  )}

                  <button onClick={saveAll} disabled={saving}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-full text-sm transition-all">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar cambios"}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}