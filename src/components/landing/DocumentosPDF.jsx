import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { FileText, Download } from "lucide-react";

export default function DocumentosPDF() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.DocumentoPDF.list("orden", 20).then(data => {
      setDocs(data);
      setLoading(false);
    });
  }, []);

  if (loading || docs.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-stone-400 mb-4 block">
            Recursos gratuitos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
            Consejos y guías
            <span className="text-green-600"> para tu jardín</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc, i) => (
            <motion.a
              key={doc.id}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300 p-6 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 group-hover:bg-green-100 transition-colors flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-stone-900 text-lg leading-tight mb-2">
                  {doc.titulo}
                </h3>
                {doc.descripcion && (
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {doc.descripcion}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                <Download className="w-4 h-4" />
                Descargar PDF
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}