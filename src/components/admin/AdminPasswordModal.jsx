import React, { useState } from "react";
import { X, Lock, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPasswordModal({ onSuccess, onClose }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "1976") {
      onSuccess();
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Panel de administración</h2>
          <p className="text-stone-400 text-sm mt-1">Introduce la contraseña para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              autoFocus
              className={`w-full border rounded-xl px-4 py-3 pr-12 text-stone-900 outline-none transition-all ${
                error
                  ? "border-red-400 bg-red-50 animate-pulse"
                  : "border-stone-200 focus:border-stone-900 bg-stone-50 focus:bg-white"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">Contraseña incorrecta</p>
          )}

          <button
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl py-3 transition-colors"
          >
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
}