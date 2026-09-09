import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ChevronDown, ChevronUp, Plus, Trash2, Loader2, Save, Check, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DocumentosPDFAdmin() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [nuevo, setNuevo] = useState({ titulo: "", descripcion: "", url: "", orden: "" });
  const [addingNew, setAddingNew] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    base44.entities.DocumentoPDF.list("orden", 20).then(data => {
      setDocs(data);
      setLoading(false);
    });
  }, []);

  const updateDoc = (id, field, value) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const saveAll = async () => {
    setSaving(true);
    for (const d of docs) {
      await base44.entities.DocumentoPDF.update(d.id, { titulo: d.titulo, descripcion: d.descripcion, url: d.url, orden: d.orden });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const deleteDoc = async (id) => {
    await base44.entities.DocumentoPDF.delete(id);
    setDocs(prev => prev.filter(d => d.id !== id));
  };

  const addDoc = async () => {
    if (!nuevo.titulo || !nuevo.url) return;
    const created = await base44.entities.DocumentoPDF.create(nuevo);
    setDocs(prev => [...prev, created]);
    setNuevo({ titulo: "", descripcion: "", url: "", orden: "" });
    setAddingNew(false);
  };

  const handleFileUpload = async (e, isNew = false) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    if (isNew) {
      setNuevo(p => ({ ...p, url: file_url }));
    }
    setUploading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">📄</span>
          <span className="font-bold text-stone-900">Documentos PDF</span>
          <span className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full">{docs.length} docs</span>
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
                  {docs.map(doc => (
                    <div key={doc.id} className="border border-stone-100 rounded-xl p-4 space-y-2">
                      <div className="flex gap-2">
                        <div className="flex-1 space-y-2">
                          <input type="text" value={doc.titulo} onChange={e => updateDoc(doc.id, "titulo", e.target.value)}
                            placeholder="Título *"
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                          <input type="text" value={doc.descripcion || ""} onChange={e => updateDoc(doc.id, "descripcion", e.target.value)}
                            placeholder="Descripción (opcional)"
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                          <input type="text" value={doc.url} onChange={e => updateDoc(doc.id, "url", e.target.value)}
                            placeholder="URL del PDF"
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 font-mono text-xs" />
                          <input type="number" value={doc.orden || ""} onChange={e => updateDoc(doc.id, "orden", Number(e.target.value))}
                            placeholder="Orden"
                            className="w-28 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                        </div>
                        <button onClick={() => deleteDoc(doc.id)} className="text-red-400 hover:text-red-600 self-start">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {addingNew ? (
                    <div className="bg-stone-50 rounded-xl p-4 space-y-3 border-2 border-dashed border-stone-200">
                      <p className="text-sm font-semibold text-stone-700">Nuevo documento</p>
                      <input type="text" placeholder="Título *" value={nuevo.titulo}
                        onChange={e => setNuevo(p => ({ ...p, titulo: e.target.value }))}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                      <input type="text" placeholder="Descripción (opcional)" value={nuevo.descripcion}
                        onChange={e => setNuevo(p => ({ ...p, descripcion: e.target.value }))}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                      <div className="space-y-2">
                        <input type="text" placeholder="URL del PDF" value={nuevo.url}
                          onChange={e => setNuevo(p => ({ ...p, url: e.target.value }))}
                          className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 font-mono text-xs" />
                        <label className="flex items-center gap-2 text-sm text-stone-500 cursor-pointer hover:text-green-600 transition-colors">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          {uploading ? "Subiendo..." : "O sube un PDF desde tu dispositivo"}
                          <input type="file" accept=".pdf" className="hidden" onChange={e => handleFileUpload(e, true)} />
                        </label>
                      </div>
                      <input type="number" placeholder="Orden" value={nuevo.orden}
                        onChange={e => setNuevo(p => ({ ...p, orden: Number(e.target.value) }))}
                        className="w-28 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                      <div className="flex gap-2">
                        <button onClick={addDoc} className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700">Añadir</button>
                        <button onClick={() => setAddingNew(false)} className="text-stone-500 text-sm px-4 py-2 rounded-lg hover:bg-stone-200">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setAddingNew(true)} className="flex items-center gap-2 text-sm text-stone-400 hover:text-green-600 transition-colors">
                      <Plus className="w-4 h-4" /> Añadir documento
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