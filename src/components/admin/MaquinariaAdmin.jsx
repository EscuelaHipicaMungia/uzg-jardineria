import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Trash2, Save, Loader2, ChevronDown, ChevronUp, Eye } from "lucide-react";

export default function MaquinariaAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState({ nombre: "", foto: "", orden: 0 });
  const [saving, setSaving] = useState({});
  const [saved, setSaved] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await base44.entities.Maquinaria.list("orden", 50);
    setItems(data);
    setLoading(false);
  };

  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const saveItem = async (item) => {
    setSaving(p => ({ ...p, [item.id]: true }));
    await base44.entities.Maquinaria.update(item.id, { nombre: item.nombre, foto: item.foto, orden: item.orden });
    setSaving(p => ({ ...p, [item.id]: false }));
    setSaved(p => ({ ...p, [item.id]: true }));
    setTimeout(() => setSaved(p => ({ ...p, [item.id]: false })), 2000);
  };

  const deleteItem = async (id) => {
    await base44.entities.Maquinaria.delete(id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const addItem = async () => {
    if (!newItem.nombre) return;
    const created = await base44.entities.Maquinaria.create(newItem);
    setItems(prev => [...prev, created]);
    setNewItem({ nombre: "", foto: "", orden: 0 });
    setAdding(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🔧</span>
          <span className="font-bold text-stone-900">Mi Maquinaria</span>
          <span className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full">{items.length} equipos</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
      </button>

      {open && (
        <div className="border-t border-stone-100 px-6 pb-6 pt-4 space-y-4">
          {loading ? (
            <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-stone-400" /></div>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="bg-stone-50 rounded-xl p-4 space-y-3 group">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-700">Equipo</span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Nombre del equipo"
                    value={item.nombre}
                    onChange={e => updateItem(item.id, "nombre", e.target.value)}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  />
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="URL de la foto"
                      value={item.foto || ""}
                      onChange={e => updateItem(item.id, "foto", e.target.value)}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                    />
                    {item.foto && (
                      <div className="relative rounded-lg overflow-hidden h-28 bg-stone-100">
                        <img src={item.foto} alt={item.nombre} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-stone-500 w-16">Orden</label>
                    <input
                      type="number"
                      value={item.orden || 0}
                      onChange={e => updateItem(item.id, "orden", Number(e.target.value))}
                      className="w-20 border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-green-500"
                    />
                    <button
                      onClick={() => saveItem(item)}
                      disabled={saving[item.id]}
                      className="ml-auto flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      {saving[item.id] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                      {saved[item.id] ? "¡Guardado!" : "Guardar"}
                    </button>
                  </div>
                </div>
              ))}

              {adding ? (
                <div className="bg-green-50 rounded-xl p-4 space-y-3 border-2 border-dashed border-green-200">
                  <p className="text-sm font-semibold text-stone-700">Nuevo equipo</p>
                  <input
                    type="text"
                    placeholder="Nombre del equipo"
                    value={newItem.nombre}
                    onChange={e => setNewItem(p => ({ ...p, nombre: e.target.value }))}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  />
                  <input
                    type="text"
                    placeholder="URL de la foto (opcional)"
                    value={newItem.foto}
                    onChange={e => setNewItem(p => ({ ...p, foto: e.target.value }))}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  />
                  <div className="flex gap-2">
                    <button onClick={addItem} className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Añadir
                    </button>
                    <button onClick={() => setAdding(false)} className="text-stone-500 text-sm px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAdding(true)}
                  className="flex items-center gap-2 text-sm text-stone-400 hover:text-green-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Añadir equipo
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}