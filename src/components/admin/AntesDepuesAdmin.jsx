import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Trash2, Save, Loader2, ChevronDown, ChevronUp } from "lucide-react";

const EMPTY = { titulo: "", foto_antes: "", foto_despues: "", orden: 0 };

export default function AntesDepuesAdmin() {
  const [pares, setPares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newP, setNewP] = useState(EMPTY);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    base44.entities.AntesDepues.list("orden", 50).then(data => {
      setPares(data);
      setLoading(false);
    });
  }, []);

  const save = async (p) => {
    setSaving(p.id);
    await base44.entities.AntesDepues.update(p.id, {
      titulo: p.titulo, foto_antes: p.foto_antes, foto_despues: p.foto_despues, orden: p.orden
    });
    setSaving(null);
  };

  const remove = async (id) => {
    await base44.entities.AntesDepues.delete(id);
    setPares(prev => prev.filter(p => p.id !== id));
  };

  const add = async () => {
    if (!newP.foto_antes || !newP.foto_despues) return;
    const created = await base44.entities.AntesDepues.create(newP);
    setPares(prev => [...prev, created]);
    setNewP(EMPTY);
    setAdding(false);
  };

  const update = (id, field, value) => {
    setPares(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">📸</span>
          <span className="font-bold text-stone-900">Antes & Después</span>
          <span className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full">{pares.length} pares</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
      </button>

      {open && (
        <div className="border-t border-stone-100 px-6 pb-6 pt-4 space-y-4">
          {loading ? (
            <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-stone-400" /></div>
          ) : (
            <>
              {pares.map((p) => (
                <div key={p.id} className="border border-stone-100 rounded-xl p-4 space-y-3 bg-stone-50">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-500 block mb-1">Título (opcional)</label>
                      <input
                        type="text"
                        value={p.titulo || ""}
                        onChange={e => update(p.id, "titulo", e.target.value)}
                        placeholder="Ej: Poda de setos"
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-500 block mb-1">Orden</label>
                      <input
                        type="number"
                        value={p.orden || 0}
                        onChange={e => update(p.id, "orden", Number(e.target.value))}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-500 block mb-1">Foto ANTES (URL)</label>
                      <input
                        type="text"
                        value={p.foto_antes || ""}
                        onChange={e => update(p.id, "foto_antes", e.target.value)}
                        placeholder="https://..."
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      />
                      {p.foto_antes && (
                        <img src={p.foto_antes} alt="antes" className="mt-2 rounded-lg h-24 w-full object-cover" />
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-500 block mb-1">Foto DESPUÉS (URL)</label>
                      <input
                        type="text"
                        value={p.foto_despues || ""}
                        onChange={e => update(p.id, "foto_despues", e.target.value)}
                        placeholder="https://..."
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      />
                      {p.foto_despues && (
                        <img src={p.foto_despues} alt="después" className="mt-2 rounded-lg h-24 w-full object-cover" />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => remove(p.id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => save(p)}
                      disabled={saving === p.id}
                      className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {saving === p.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      Guardar
                    </button>
                  </div>
                </div>
              ))}

              {adding ? (
                <div className="border-2 border-dashed border-green-200 rounded-xl p-4 space-y-3 bg-green-50">
                  <p className="text-sm font-semibold text-stone-700">Nuevo par</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text" placeholder="Título (opcional)"
                      value={newP.titulo} onChange={e => setNewP(p => ({ ...p, titulo: e.target.value }))}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                    />
                    <input
                      type="number" placeholder="Orden"
                      value={newP.orden} onChange={e => setNewP(p => ({ ...p, orden: Number(e.target.value) }))}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-500 block mb-1">Foto ANTES (URL) *</label>
                      <input
                        type="text" placeholder="https://..."
                        value={newP.foto_antes} onChange={e => setNewP(p => ({ ...p, foto_antes: e.target.value }))}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-500 block mb-1">Foto DESPUÉS (URL) *</label>
                      <input
                        type="text" placeholder="https://..."
                        value={newP.foto_despues} onChange={e => setNewP(p => ({ ...p, foto_despues: e.target.value }))}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      />
                    </div>
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
                  Añadir par antes/después
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}