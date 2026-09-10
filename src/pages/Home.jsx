import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import PainPoints from "../components/landing/PainPoints";
import TrustBadges from "../components/landing/TrustBadges";
import SolutionSection from "../components/landing/SolutionSection";
import FinalCTA from "../components/landing/FinalCTA";
import Testimonios from "../components/landing/Testimonios";
import AntesDepues from "../components/landing/AntesDepues";
import SobreMi from "../components/landing/SobreMi";
import MaquinariaCarrusel from "../components/landing/MaquinariaCarrusel";
import Footer from "../components/landing/Footer";
import GaleriaFotos from "../components/landing/GaleriaFotos";
import VideosYoutube from "../components/landing/VideosYoutube";
import DocumentosPDF from "../components/landing/DocumentosPDF";
import FormularioResena from "../components/landing/FormularioResena";
import AdminPasswordModal from "../components/admin/AdminPasswordModal";
import AdminPanel from "../components/admin/AdminPanel";

export default function Home() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // Estado inicial con TODAS las secciones visibles por defecto
  const [visibility, setVisibility] = useState({
    hero: true,
    pain_points: true,
    trust_badges: true,
    solution: true,
    sobre_mi: true,
    maquinaria: true,
    antes_despues: true,
    testimonios: true,
    galeria: true,
    videos_youtube: true,
    documentos_pdf: true,
    cta_final: true,
  });

  const loadVisibility = () => {
    if (!base44?.entities?.SectionVisibility) return;
    
    base44.entities.SectionVisibility.list()
      .then(items => {
        if (Array.isArray(items) && items.length > 0) {
          const map = {};
          items.forEach(i => { map[i.section_key] = i.visible !== false; });
          setVisibility(prev => ({ ...prev, ...map }));
        }
      })
      .catch(err => {
        console.warn("No se pudo cargar la visibilidad desde la API, usando valores por defecto:", err);
      });
  };

  useEffect(() => {
    loadVisibility();
  }, []);

  const isVisible = (key) => visibility[key] !== false;

  const handleAdminSuccess = () => {
    setShowPasswordModal(false);
    setShowAdminPanel(true);
  };

  const handleAdminClose = () => {
    setShowAdminPanel(false);
    loadVisibility();
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      {isVisible("hero") && <HeroSection />}
      {isVisible("pain_points") && <PainPoints />}
      {isVisible("trust_badges") && <TrustBadges />}
      {isVisible("solution") && (
        <div id="servicios">
          <SolutionSection />
        </div>
      )}
      {isVisible("sobre_mi") && <SobreMi />}
      {isVisible("maquinaria") && <MaquinariaCarrusel />}
      {isVisible("antes_despues") && <AntesDepues />}
      {isVisible("testimonios") && <Testimonios />}
      {isVisible("galeria") && <GaleriaFotos />}
      {isVisible("videos_youtube") && <VideosYoutube />}
      {isVisible("documentos_pdf") && <DocumentosPDF />}
      {isVisible("cta_final") && (
        <div id="contacto">
          <FinalCTA />
        </div>
      )}
      <FormularioResena />
      <Footer onAdminClick={() => setShowPasswordModal(true)} />

      <AnimatePresence>
        {showPasswordModal && (
          <AdminPasswordModal
            onSuccess={handleAdminSuccess}
            onClose={() => setShowPasswordModal(false)}
          />
        )}
        {showAdminPanel && (
          <AdminPanel onClose={handleAdminClose} />
        )}
      </AnimatePresence>
    </div>
  );
}
