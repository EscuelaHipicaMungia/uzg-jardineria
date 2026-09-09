import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Play, Youtube } from "lucide-react";

function getYoutubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function VideoCard({ video, index }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYoutubeId(video.url);
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  if (!videoId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-2xl overflow-hidden shadow-sm border border-stone-100 bg-white group"
    >
      <div className="relative aspect-video bg-stone-900 cursor-pointer" onClick={() => setPlaying(true)}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.titulo}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <>
            {thumbnail && (
              <img
                src={thumbnail}
                alt={video.titulo}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <p className="font-semibold text-stone-900 text-sm leading-snug">{video.titulo}</p>
      </div>
    </motion.div>
  );
}

export default function VideosYoutube() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.VideoYoutube.list("orden", 20).then(data => {
      setVideos(data);
      setLoading(false);
    });
  }, []);

  if (loading || videos.length === 0) return null;

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
            Síguenos en YouTube
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
            Mira nuestros
            <span className="text-green-600"> vídeos</span>
          </h2>
          <a
            href="https://youtube.com/@uzgjardineria"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-red-600 font-semibold text-sm hover:underline"
          >
            <Youtube className="w-5 h-5" />
            @uzgjardineria
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}