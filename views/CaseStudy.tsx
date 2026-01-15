
import React from 'react';

const CaseStudy: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 pb-24">
      <header className="relative">
        <div className="absolute -top-10 -right-10 size-64 bg-primary/10 blur-[100px] rounded-full" />
        <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Deep Dive • Clinical AI</p>
        <h1 className="text-5xl font-extrabold tracking-tighter leading-none mb-6">
            IA en Salud:<br/><span className="text-primary">Estudio de Caso UCI</span>
        </h1>
        <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
            Implementación de redes neuronales predictivas en entornos de cuidados intensivos en la Universidad de California, Irvine.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-dark border border-white/5 rounded-3xl p-10 space-y-10">
          <div className="flex justify-between items-center">
            <h3 className="heading-font text-2xl font-bold uppercase tracking-tight">Performance Metrics</h3>
            <div className="bg-accent-lime/10 px-4 py-1.5 rounded-full text-xs font-bold text-accent-lime border border-accent-lime/20">
              +12% DELTA
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold">Neural Network (AI)</span>
                <span className="text-4xl font-extrabold text-primary">0.94</span>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[94%] shadow-[0_0_20px_rgba(0,140,140,0.4)]" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end opacity-40">
                <span className="text-lg font-medium">APACHE IV (Tradicional)</span>
                <span className="text-3xl font-extrabold">0.82</span>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-white/20 rounded-full w-[82%]" />
              </div>
            </div>
          </div>

          <p className="text-xs text-white/30 italic">
            *Las puntuaciones AUC representan la capacidad del modelo para discriminar entre supervivencia y mortalidad.
          </p>
        </div>

        <div className="space-y-6">
            <div className="bg-surface-dark border border-white/5 p-8 rounded-3xl group">
                <div className="bg-primary/20 size-12 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined">database</span>
                </div>
                <h5 className="font-bold text-lg mb-2">Fragmentación de Datos</h5>
                <p className="text-white/40 text-sm leading-relaxed">Formatos inconsistentes en sistemas EHR heredados dificultan la escalabilidad.</p>
            </div>
            <div className="bg-surface-dark border border-white/5 p-8 rounded-3xl group">
                <div className="bg-accent-lime/20 size-12 rounded-2xl flex items-center justify-center text-accent-lime mb-6 group-hover:bg-accent-lime group-hover:text-black transition-all">
                    <span className="material-symbols-outlined">lock</span>
                </div>
                <h5 className="font-bold text-lg mb-2">Privacidad</h5>
                <p className="text-white/40 text-sm leading-relaxed">Requerimientos de HIPAA y GDPR limitan el uso de soluciones en la nube.</p>
            </div>
        </div>
      </section>

      <div className="bg-white/5 border border-white/10 p-10 rounded-3xl flex flex-col items-center text-center gap-6">
          <p className="text-lg font-medium">¿Listo para profundizar en la ética?</p>
          <button className="bg-primary text-white font-bold px-12 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
              Siguiente Módulo: Ética en IA
          </button>
      </div>
    </div>
  );
};

export default CaseStudy;
