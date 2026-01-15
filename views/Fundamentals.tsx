
import React from 'react';

const Fundamentals: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 pb-24">
      <header className="text-center space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Chapter 01</span>
        <h1 className="heading-font text-5xl font-extrabold tracking-tight">Fundamentos de <span className="text-primary">IA</span></h1>
        <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
          Comprender la diferencia entre los distintos tipos de inteligencia es crucial para navegar el futuro.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-card-dark rounded-2xl border border-white/10 overflow-hidden">
            <div className="h-48 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" style={{backgroundImage: 'url("https://picsum.photos/600/400?1")'}}></div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Weak AI (Narrow)</h3>
                  <p className="text-primary font-semibold text-sm">Optimización Preprogramada</p>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl">precision_manufacturing</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">Excels en tareas específicas, como traducción o reconocimiento de imágenes, dentro de límites definidos.</p>
              <div className="bg-black/20 rounded-xl p-4 flex flex-wrap gap-2">
                <span className="bg-white/5 px-3 py-1 rounded text-xs text-white/70">ChatGPT</span>
                <span className="bg-white/5 px-3 py-1 rounded text-xs text-white/70">FaceID</span>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-lime/50 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-card-dark rounded-2xl border border-white/10 overflow-hidden">
            <div className="h-48 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" style={{backgroundImage: 'url("https://picsum.photos/600/400?2")'}}></div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Strong AI (AGI)</h3>
                  <p className="text-accent-lime font-semibold text-sm">Inteligencia General</p>
                </div>
                <span className="material-symbols-outlined text-accent-lime text-3xl">psychology</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">Capacidad teórica de resolver cualquier problema cognitivo que un humano pueda, con autoconciencia.</p>
              <div className="bg-black/20 rounded-xl p-4 flex flex-wrap gap-2">
                <span className="bg-white/5 px-3 py-1 rounded text-xs text-white/70">Hypothetical</span>
                <span className="bg-white/5 px-3 py-1 rounded text-xs text-white/70">Sentient</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl flex items-start gap-6">
          <div className="bg-primary p-3 rounded-2xl text-white">
              <span className="material-symbols-outlined text-3xl">lightbulb</span>
          </div>
          <div className="space-y-2">
              <h4 className="font-bold text-xl">Dato Clave</h4>
              <p className="text-white/60 leading-relaxed">
                  A pesar de su complejidad, todos los sistemas de IA actuales —incluyendo los LLMs avanzados— se categorizan como <strong className="text-primary">Weak AI</strong>.
              </p>
          </div>
      </div>
    </div>
  );
};

export default Fundamentals;
