import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { 
        title: "Chat Inteligente", 
        desc: "Razonamiento profundo para resolver problemas complejos.", 
        icon: "psychology", 
        path: "/thinking",
        color: "text-blue-400",
        bg: "bg-blue-400/5"
    },
    { 
        title: "Arte Visual", 
        desc: "Genera imágenes fotorrealistas con modelos avanzados.", 
        icon: "palette", 
        path: "/image-tools",
        color: "text-purple-400",
        bg: "bg-purple-400/5"
    },
    { 
        title: "Asistente de Voz", 
        desc: "Conversaciones fluidas y naturales en tiempo real.", 
        icon: "mic_none", 
        path: "/voice",
        color: "text-rose-400",
        bg: "bg-rose-400/5"
    },
    { 
        title: "IA Académica", 
        desc: "Conceptos fundamentales y estudios de caso reales.", 
        icon: "auto_stories", 
        path: "/fundamentals",
        color: "text-emerald-400",
        bg: "bg-emerald-400/5"
    }
  ];

  return (
    <div className="min-h-full flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div className="bg-glow"></div>
      
      {/* Portada / Hero Section */}
      <div className="max-w-4xl w-full text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-gemini-blue animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-gemini-subtext">Nueva Generación de IA</span>
        </div>
        
        <h1 className="google-font text-6xl md:text-8xl font-medium tracking-tight mb-4">
          Hola, <span className="gemini-gradient-text">John Doe</span>
        </h1>
        <h2 className="google-font text-3xl md:text-5xl font-medium text-gemini-subtext/80 mb-12">
          Explora los límites de lo posible
        </h2>

        {/* Barra de entrada estilizada */}
        <div className="max-w-2xl mx-auto mb-16 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gemini-blue/30 via-purple-500/30 to-pink-500/30 rounded-[32px] blur-sm opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div 
                onClick={() => navigate('/thinking')}
                className="relative w-full glass-card border border-gemini-border rounded-[32px] px-8 py-6 flex items-center gap-4 cursor-pointer input-glow transition-all"
            >
              <div className="flex-1 text-left">
                  <span className="text-lg text-gemini-subtext/60 font-light">Pregúntale cualquier cosa a JoschatAI...</span>
              </div>
              <div className="flex items-center gap-5 text-gemini-subtext/60">
                <button title="Subir imagen" className="hover:text-gemini-blue transition-colors">
                    <span className="material-symbols-outlined text-2xl">add_photo_alternate</span>
                </button>
                <button title="Usar micrófono" className="hover:text-gemini-blue transition-colors">
                    <span className="material-symbols-outlined text-2xl">mic</span>
                </button>
                <div className="size-10 bg-white/5 rounded-full flex items-center justify-center text-gemini-blue hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Grid de Módulos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-6xl pb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => navigate(cat.path)}
            className={`group h-56 p-8 glass-card rounded-[32px] text-left hover:bg-white/[0.03] transition-all flex flex-col justify-between float-anim`}
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            <div className="space-y-4">
                <div className={`size-12 ${cat.bg} rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined ${cat.color} text-3xl`}>{cat.icon}</span>
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-gemini-blue transition-colors">
                    {cat.title}
                </h3>
            </div>
            <p className="text-gemini-subtext text-xs leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
              {cat.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Footer minimalista */}
      <div className="w-full flex justify-center py-8 border-t border-white/5 opacity-40">
        <p className="text-[11px] font-medium tracking-wide flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">security</span>
            Tus datos están protegidos y encriptados
        </p>
      </div>
    </div>
  );
};

export default Dashboard;