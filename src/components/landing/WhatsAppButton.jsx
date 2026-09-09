import React from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "34623063799";
const DEFAULT_MESSAGE = "Hola, me gustaría pedir un presupuesto para mi jardín.";

export default function WhatsAppButton({ text = "Pedir presupuesto por WhatsApp", className = "", variant = "primary" }) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  const baseClasses = "inline-flex items-center gap-3 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95";
  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg shadow-lg shadow-green-600/25",
    large: "bg-green-600 hover:bg-green-700 text-white px-10 py-5 text-xl shadow-xl shadow-green-600/30",
    outline: "border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-8 py-4 text-lg",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      <MessageCircle className="w-6 h-6" />
      {text}
    </a>
  );
}