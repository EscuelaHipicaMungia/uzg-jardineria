import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Trash2, Save, Loader2, Star, ChevronDown, ChevronUp } from "lucide-react";

const EMPTY = { nombre: "", localidad: "", resumen: "", foto_jardin: "", valoracion: 5, orden: 0 };

export default function TestimoniosAdmin() {
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newT, setNewT] = useState(EMPTY);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    base44.entities.Testimonio.list("orden", 50).then(data => {
      setTestimonios(data);
      setLoading(false);
    });
  }, []);

  const save = async (t) => {
    setSaving(t.id);
    await base44.entities.Testimonio.update(t.id, {
      nombre: t.nombre, localidad: t.localidad, resumen: t.resumen,
      foto_jardin: t.foto_jardin, valoracion: t.valoracion, orden: t.orden
    });
    setSaving(null);
  };

  const remove = async (id) => {
    await base44.entities.Testimonio.delete(id);
    setTestimonios(prev => prev.filter(t => t.id !== id));
  };

  const add = async () => {
    if (!newT.nombre || !newT.resumen) return;
    const created = await base44.entities.Testimonio.create(newT);
    setTestimonios(prev => [...prev, created]);
    setNewT(EMPTY);
    setAdding(false);
  };

  const update = (id, field, value) => {
    setTestimonios(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">⭐</span>
          <span className="font-bold text-stone-900">Testimonios de Clientes</span>
          <span className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full">{testimonios.length} testimonios</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
      </button>

      {open && (
        <div className="border-t border-stone-100 px-6 pb-6 pt-4 space-y-4">
          {loading ? (
            <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-stone-400" /></div>
          ) : (
            <>
              {testimonios.map((t) => (
                <div key={t.id} className="border border-stone-100 rounded-xl p-4 space-y-3 bg-stone-50">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-500 block mb-1">Nombre</label>
                      <input
                        type="text"
                        value={t.nombre}
                        onChange={e => update(t.id, "nombre", e.target.value)}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-500 block mb-1">Localidad</label>
                      <input
                        type="text"
                        value={t.localidad || ""}
                        onChange={e => update(t.id, "localidad", e.target.value)}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-500 block mb-1">Resumen del trabajo</label>
                    <textarea
                      value={t.resumen}
                      onChange={e => update(t.id, "resumen", e.target.value)}
                      rows={2}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-500 block mb-1">Foto del jardín (URL)</label>
                    <input
                      type="text"
                      value={t.foto_jardin || ""}
                      onChange={e => update(t.id, "foto_jardin", e.target.value)}
                      placeholder="https://..."
                      className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium text-stone-500">Valoración:</label>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(n => (
                          <button key={n} onClick={() => update(t.id, "valoracion", n)}>
                            <Star className={`w-5 h-5 ${n <= (t.valoracion || 5) ? "fill-yellow-400 text-yellow-400" : "text-stone-300"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => remove(t.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => save(t)}
                        disabled={saving === t.id}
                        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {saving === t.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Añadir nuevo */}
              {adding ? (
                <div className="border-2 border-dashed border-green-200 rounded-xl p-4 space-y-3 bg-green-50">
                  <p className="text-sm font-semibold text-stone-700">Nuevo testimonio</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text" placeholder="Nombre *"
                      value={newT.nombre} onChange={e => setNewT(p => ({ ...p, nombre: e.target.value }))}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                    />
                    <input
                      type="text" placeholder="Localidad"
                      value={newT.localidad} onChange={e => setNewT(p => ({ ...p, localidad: e.target.value }))}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <textarea
                    placeholder="Resumen del trabajo realizado *" rows={2}
                    value={newT.resumen} onChange={e => setNewT(p => ({ ...p, resumen: e.target.value }))}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 resize-none"
                  />
                  <input
                    type="text" placeholder="URL de la foto del jardín"
                    value={newT.foto_jardin} onChange={e => setNewT(p => ({ ...p, foto_jardin: e.target.value }))}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  />
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-stone-500">Valoración:</label>
                    {[1,2,3,4,5].map(n => (
                      <button key={n} onClick={() => setNewT(p => ({ ...p, valoracion: n }))}>
                        <Star className={`w-5 h-5 ${n <= newT.valoracion ? "fill-yellow-400 text-yellow-400" : "text-stone-300"}`} />
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={add} className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Añadir</button>
                    <button onClick={() => setAdding(false)} className="text-stone-500 text-sm px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors">Cancelar</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAdding(true)}
                  className="flex items-center gap-2 text-sm text-stone-400 hover:text-green-600 transition-colors mt-2"
                >
                  <Plus className="w-4 h-4" />
                  Añadir testimonio
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}