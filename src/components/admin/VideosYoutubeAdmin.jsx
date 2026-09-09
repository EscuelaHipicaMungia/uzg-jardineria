import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ChevronDown, ChevronUp, Plus, Trash2, Loader2, Save, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function getYoutubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function VideosYoutubeAdmin() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [nuevo, setNuevo] = useState({ titulo: "", url: "", orden: "" });
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    base44.entities.VideoYoutube.list("orden", 20).then(data => {
      setVideos(data);
      setLoading(false);
    });
  }, []);

  const updateVideo = (id, field, value) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const saveAll = async () => {
    setSaving(true);
    for (const v of videos) {
      await base44.entities.VideoYoutube.update(v.id, { titulo: v.titulo, url: v.url, orden: v.orden });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const deleteVideo = async (id) => {
    await base44.entities.VideoYoutube.delete(id);
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const addVideo = async () => {
    if (!nuevo.titulo || !nuevo.url) return;
    const created = await base44.entities.VideoYoutube.create(nuevo);
    setVideos(prev => [...prev, created]);
    setNuevo({ titulo: "", url: "", orden: "" });
    setAddingNew(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">▶️</span>
          <span className="font-bold text-stone-900">Vídeos de YouTube</span>
          <span className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full">{videos.length} vídeos</span>
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
                  {videos.map(video => {
                    const id = getYoutubeId(video.url);
                    return (
                      <div key={video.id} className="border border-stone-100 rounded-xl p-4 space-y-2">
                        <div className="flex gap-3">
                          {id && (
                            <img
                              src={`https://img.youtube.com/vi/${id}/default.jpg`}
                              alt=""
                              className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 space-y-2 min-w-0">
                            <input type="text" value={video.titulo}
                              onChange={e => updateVideo(video.id, "titulo", e.target.value)}
                              placeholder="Título *"
                              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                            <input type="text" value={video.url}
                              onChange={e => updateVideo(video.id, "url", e.target.value)}
                              placeholder="URL de YouTube"
                              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 font-mono text-xs" />
                            <input type="number" value={video.orden || ""}
                              onChange={e => updateVideo(video.id, "orden", Number(e.target.value))}
                              placeholder="Orden"
                              className="w-28 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                          </div>
                          <button onClick={() => deleteVideo(video.id)} className="text-red-400 hover:text-red-600 self-start">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {addingNew ? (
                    <div className="bg-stone-50 rounded-xl p-4 space-y-3 border-2 border-dashed border-stone-200">
                      <p className="text-sm font-semibold text-stone-700">Nuevo vídeo</p>
                      <input type="text" placeholder="Título *" value={nuevo.titulo}
                        onChange={e => setNuevo(p => ({ ...p, titulo: e.target.value }))}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                      <input type="text" placeholder="URL de YouTube (ej: https://youtube.com/watch?v=...)" value={nuevo.url}
                        onChange={e => setNuevo(p => ({ ...p, url: e.target.value }))}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 font-mono text-xs" />
                      {nuevo.url && getYoutubeId(nuevo.url) && (
                        <img
                          src={`https://img.youtube.com/vi/${getYoutubeId(nuevo.url)}/hqdefault.jpg`}
                          alt="Vista previa"
                          className="w-full max-w-xs rounded-lg"
                        />
                      )}
                      <input type="number" placeholder="Orden" value={nuevo.orden}
                        onChange={e => setNuevo(p => ({ ...p, orden: Number(e.target.value) }))}
                        className="w-28 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                      <div className="flex gap-2">
                        <button onClick={addVideo} className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700">Añadir</button>
                        <button onClick={() => setAddingNew(false)} className="text-stone-500 text-sm px-4 py-2 rounded-lg hover:bg-stone-200">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setAddingNew(true)} className="flex items-center gap-2 text-sm text-stone-400 hover:text-green-600 transition-colors">
                      <Plus className="w-4 h-4" /> Añadir vídeo
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