import React from "react";
import { Leaf, Phone, MessageCircle, MapPin, Settings, Instagram, Youtube } from "lucide-react";

export default function Footer({ onAdminClick }) {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">UZG Jardinería</span>
            </div>
            <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
              Jardinería profesional en Euskadi. Transformamos espacios exteriores con pasión y experiencia.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm mb-4">Contacto</h4>
            <a href="tel:+34623063799" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              623 06 37 99
            </a>
            <a
              href="https://wa.me/34623063799"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              Euskadi
            </div>
            <a
              href="https://www.instagram.com/uzg_jardineria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @uzg_jardineria
            </a>
            <a
              href="https://youtube.com/@uzgjardineria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <Youtube className="w-4 h-4" />
              YouTube
            </a>
            <a
              href="https://www.tiktok.com/@uzg.jardineria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/>
              </svg>
              TikTok
            </a>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm mb-4">Servicios</h4>
            <p className="text-sm">Mantenimiento de jardines</p>
            <p className="text-sm">Poda profesional</p>
            <p className="text-sm">Limpieza de exteriores</p>
            <p className="text-sm">Diseño de jardines</p>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex items-center justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <p className="text-stone-600 text-xs">
              © {new Date().getFullYear()} UZG Jardinería · Todos los derechos reservados
            </p>
            <span className="hidden sm:inline text-stone-700 text-xs">·</span>
            <a
              href="https://cartel-craft-official.base44.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-stone-300 transition-colors text-xs"
            >
              Powered by Cartel Craft
            </a>
          </div>
          <button
            onClick={onAdminClick}
            className="flex items-center gap-1.5 text-stone-700 hover:text-stone-400 transition-colors text-xs"
            title="Admin"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </footer>
  );
}