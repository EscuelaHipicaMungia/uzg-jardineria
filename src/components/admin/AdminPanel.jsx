import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import {
  X, Save, Plus, Trash2, Type, Image, Palette,
  ChevronDown, ChevronUp, Eye, LogOut, Loader2, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TestimoniosAdmin from "./TestimoniosAdmin";
import AntesDepuesAdmin from "./AntesDepuesAdmin";
import SobreMiAdmin from "./SobreMiAdmin";
import MaquinariaAdmin from "./MaquinariaAdmin";
import VisibilityAdmin from "./VisibilityAdmin";
import GaleriaAdmin from "./GaleriaAdmin";
import VideosYoutubeAdmin from "./VideosYoutubeAdmin";
import DocumentosPDFAdmin from "./DocumentosPDFAdmin";

const DEFAULT_CONTENT = [
  // Hero
  { key: "hero_title_1", label: "Héroe - Título línea 1", type: "text", section: "Hero", value: "Tu jardín merece" },
  { key: "hero_title_2", label: "Héroe - Título línea 2 (verde)", type: "text", section: "Hero", value: "verse increíble" },
  { key: "hero_subtitle", label: "Héroe - Subtítulo", type: "textarea", section: "Hero", value: "Transformamos jardines descuidados en espacios de relax en los que da gusto estar." },
  { key: "hero_badge", label: "Héroe - Texto badge", type: "text", section: "Hero", value: "Presupuesto gratuito · Respuesta en menos de 2 horas" },
  { key: "hero_bg_image", label: "Héroe - Imagen de fondo (URL)", type: "image", section: "Hero", value: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80" },
  // Pain Points
  { key: "pain_title", label: "Problemas - Título", type: "text", section: "Problemas", value: "Un jardín descuidado es más problema de lo que parece" },
  { key: "pain_1_title", label: "Problema 1 - Título", type: "text", section: "Problemas", value: "Da mala imagen" },
  { key: "pain_1_desc", label: "Problema 1 - Descripción", type: "textarea", section: "Problemas", value: "Un jardín descuidado transmite abandono. Los vecinos lo notan, las visitas lo notan... y tú también, cada vez que miras por la ventana." },
  { key: "pain_2_title", label: "Problema 2 - Título", type: "text", section: "Problemas", value: "Te roba tiempo y energía" },
  { key: "pain_2_desc", label: "Problema 2 - Descripción", type: "textarea", section: "Problemas", value: "Los fines de semana son para descansar, no para pasarlos arrancando malas hierbas bajo el sol. Tu tiempo libre vale demasiado." },
  { key: "pain_3_title", label: "Problema 3 - Título", type: "text", section: "Problemas", value: "Tu propiedad pierde valor" },
  { key: "pain_3_desc", label: "Problema 3 - Descripción", type: "textarea", section: "Problemas", value: "Un exterior descuidado puede reducir el valor percibido de tu casa hasta un 15%. Un jardín bonito, en cambio, es una inversión que se ve." },
  // Solution
  { key: "solution_step1_title", label: "Solución Paso 1 - Título", type: "text", section: "Solución", value: "Limpieza completa" },
  { key: "solution_step1_desc", label: "Solución Paso 1 - Descripción", type: "textarea", section: "Solución", value: "Retiramos todo lo que sobra: malas hierbas, hojas secas, ramas caídas y residuos acumulados. Tu jardín respira desde el primer día." },
  { key: "solution_step1_img", label: "Solución Paso 1 - Imagen (URL)", type: "image", section: "Solución", value: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80" },
  { key: "solution_step2_title", label: "Solución Paso 2 - Título", type: "text", section: "Solución", value: "Poda estética y profesional" },
  { key: "solution_step2_desc", label: "Solución Paso 2 - Descripción", type: "textarea", section: "Solución", value: "Damos forma a setos, arbustos y árboles con técnicas profesionales. Cada corte tiene un propósito: belleza, salud y armonía visual." },
  { key: "solution_step2_img", label: "Solución Paso 2 - Imagen (URL)", type: "image", section: "Solución", value: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80" },
  { key: "solution_step3_title", label: "Solución Paso 3 - Título", type: "text", section: "Solución", value: "Mantenimiento integral" },
  { key: "solution_step3_desc", label: "Solución Paso 3 - Descripción", type: "textarea", section: "Solución", value: "Nos encargamos de todo: riego, abono, control de plagas y cuidado continuo. Tú solo disfruta de un jardín impecable, siempre." },
  { key: "solution_step3_img", label: "Solución Paso 3 - Imagen (URL)", type: "image", section: "Solución", value: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&q=80" },
  // CTA
  { key: "cta_title_1", label: "CTA - Título línea 1", type: "text", section: "CTA Final", value: "Tu jardín perfecto está a" },
  { key: "cta_title_2", label: "CTA - Título línea 2 (verde)", type: "text", section: "CTA Final", value: "un mensaje de distancia" },
  { key: "cta_subtitle", label: "CTA - Subtítulo", type: "textarea", section: "CTA Final", value: "Escríbenos por WhatsApp, cuéntanos qué necesitas y te enviamos un presupuesto personalizado sin compromiso. Respondemos en menos de 2 horas." },
  { key: "cta_phone", label: "CTA - Teléfono", type: "text", section: "CTA Final", value: "623 06 37 99" },
  // Colors
  { key: "color_primary", label: "Color principal (botones, acentos)", type: "color", section: "Colores", value: "#16a34a" },
  { key: "color_hero_overlay", label: "Color overlay del héroe", type: "color", section: "Colores", value: "#000000" },
];

const SECTION_ICONS = { Hero: "🏠", Problemas: "⚠️", Solución: "✅", "CTA Final": "📱", Colores: "🎨" };

export default function AdminPanel({ onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openSections, setOpenSections] = useState({ Hero: true });
  const [newItemSection, setNewItemSection] = useState("");
  const [addingNew, setAddingNew] = useState(false);
  const [newItem, setNewItem] = useState({ label: "", value: "", type: "text", section: "" });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    const existing = await base44.entities.SiteContent.list();
    if (existing.length === 0) {
      // Seed defaults
      const created = await base44.entities.SiteContent.bulkCreate(DEFAULT_CONTENT);
      setItems(created);
    } else {
      // Merge defaults for any missing keys
      const existingKeys = existing.map(e => e.key);
      const missing = DEFAULT_CONTENT.filter(d => !existingKeys.includes(d.key));
      if (missing.length > 0) {
        const newOnes = await base44.entities.SiteContent.bulkCreate(missing);
        setItems([...existing, ...newOnes]);
      } else {
        setItems(existing);
      }
    }
    setLoading(false);
  };

  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const saveAll = async () => {
    setSaving(true);
    for (const item of items) {
      await base44.entities.SiteContent.update(item.id, { value: item.value, label: item.label });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const deleteItem = async (id) => {
    await base44.entities.SiteContent.delete(id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const addNewItem = async () => {
    if (!newItem.label || !newItem.value) return;
    const key = newItem.label.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    const created = await base44.entities.SiteContent.create({ ...newItem, key });
    setItems(prev => [...prev, created]);
    setNewItem({ label: "", value: "", type: "text", section: newItem.section });
    setAddingNew(false);
  };

  const sections = [...new Set(items.map(i => i.section).filter(Boolean))];

  const toggleSection = (s) => setOpenSections(prev => ({ ...prev, [s]: !prev[s] }));

  if (loading) {
    return (
      <div className="fixed inset-0 z-[90] bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-stone-100 overflow-y-auto"
    >
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-stone-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold">A</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">Panel de Administración</h1>
            <p className="text-stone-400 text-xs mt-0.5">Edita el contenido de tu web en tiempo real</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={saveAll}
            disabled={saving}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-full text-sm transition-all"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar cambios"}
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-stone-400 hover:text-white text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        {/* Visibilidad de secciones — siempre arriba */}
        <VisibilityAdmin visibility={{}} onVisibilityChange={() => {}} />

        {sections.map((section) => {
          const sectionItems = items.filter(i => i.section === section);
          const isOpen = openSections[section];
          return (
            <div key={section} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{SECTION_ICONS[section] || "📝"}</span>
                  <span className="font-bold text-stone-900">{section}</span>
                  <span className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full">{sectionItems.length} campos</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4 border-t border-stone-100 pt-4">
                      {sectionItems.map((item) => (
                        <div key={item.id} className="group">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <label className="text-sm font-medium text-stone-600 flex items-center gap-2">
                              {item.type === "text" && <Type className="w-3.5 h-3.5 text-blue-500" />}
                              {item.type === "textarea" && <Type className="w-3.5 h-3.5 text-purple-500" />}
                              {item.type === "image" && <Image className="w-3.5 h-3.5 text-green-500" />}
                              {item.type === "color" && <Palette className="w-3.5 h-3.5 text-orange-500" />}
                              {item.label}
                            </label>
                            {!DEFAULT_CONTENT.find(d => d.key === item.key) && (
                              <button
                                onClick={() => deleteItem(item.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          {item.type === "text" && (
                            <input
                              type="text"
                              value={item.value}
                              onChange={(e) => updateItem(item.id, "value", e.target.value)}
                              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                            />
                          )}

                          {item.type === "textarea" && (
                            <textarea
                              value={item.value}
                              onChange={(e) => updateItem(item.id, "value", e.target.value)}
                              rows={3}
                              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                            />
                          )}

                          {item.type === "image" && (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={item.value}
                                onChange={(e) => updateItem(item.id, "value", e.target.value)}
                                placeholder="URL de la imagen"
                                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                              />
                              {item.value && (
                                <div className="relative rounded-xl overflow-hidden h-32 bg-stone-100">
                                  <img src={item.value} alt="" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <Eye className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {item.type === "color" && (
                            <div className="flex items-center gap-3">
                              <input
                                type="color"
                                value={item.value}
                                onChange={(e) => updateItem(item.id, "value", e.target.value)}
                                className="w-12 h-10 rounded-lg border border-stone-200 cursor-pointer p-0.5"
                              />
                              <input
                                type="text"
                                value={item.value}
                                onChange={(e) => updateItem(item.id, "value", e.target.value)}
                                className="flex-1 border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                              />
                              <div
                                className="w-10 h-10 rounded-lg border border-stone-200"
                                style={{ backgroundColor: item.value }}
                              />
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Add new field to section */}
                      {addingNew && newItem.section === section ? (
                        <div className="bg-stone-50 rounded-xl p-4 space-y-3 border-2 border-dashed border-stone-200">
                          <p className="text-sm font-semibold text-stone-700">Nuevo campo</p>
                          <input
                            type="text"
                            placeholder="Etiqueta del campo"
                            value={newItem.label}
                            onChange={e => setNewItem(p => ({ ...p, label: e.target.value }))}
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                          />
                          <select
                            value={newItem.type}
                            onChange={e => setNewItem(p => ({ ...p, type: e.target.value }))}
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                          >
                            <option value="text">Texto corto</option>
                            <option value="textarea">Texto largo</option>
                            <option value="image">Imagen (URL)</option>
                            <option value="color">Color</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Valor inicial"
                            value={newItem.value}
                            onChange={e => setNewItem(p => ({ ...p, value: e.target.value }))}
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                          />
                          <div className="flex gap-2">
                            <button onClick={addNewItem} className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                              Añadir
                            </button>
                            <button onClick={() => setAddingNew(false)} className="text-stone-500 text-sm px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors">
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setAddingNew(true); setNewItem({ label: "", value: "", type: "text", section }); }}
                          className="flex items-center gap-2 text-sm text-stone-400 hover:text-green-600 transition-colors mt-2"
                        >
                          <Plus className="w-4 h-4" />
                          Añadir campo a esta sección
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Sobre Mí */}
        <SobreMiAdmin />

        {/* Maquinaria */}
        <MaquinariaAdmin />

        {/* Antes & Después */}
        <AntesDepuesAdmin />

        {/* Testimonios */}
        <TestimoniosAdmin />

        {/* Galería */}
        <GaleriaAdmin />

        {/* Vídeos YouTube */}
        <VideosYoutubeAdmin />

        {/* Documentos PDF */}
        <DocumentosPDFAdmin />

        {/* Add new section */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-stone-200 p-6">
          <p className="text-stone-500 text-sm font-medium text-center mb-3">¿Necesitas una nueva sección?</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nombre de la nueva sección"
              value={newItemSection}
              onChange={e => setNewItemSection(e.target.value)}
              className="flex-1 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
            />
            <button
              onClick={() => {
                if (!newItemSection.trim()) return;
                setAddingNew(true);
                setNewItem({ label: "", value: "", type: "text", section: newItemSection });
                setOpenSections(p => ({ ...p, [newItemSection]: true }));
                setNewItemSection("");
              }}
              className="bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-stone-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Crear
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}