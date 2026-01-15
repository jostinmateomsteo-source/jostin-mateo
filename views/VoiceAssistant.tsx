
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { decodeBase64, decodeAudioData, encodePCM } from '../services/geminiService';

const VoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const sessionRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const outputCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev.slice(0, 10)]);

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (audioCtxRef.current) audioCtxRef.current.close();
    if (outputCtxRef.current) outputCtxRef.current.close();
    setIsActive(false);
    addLog("Sesión cerrada");
  };

  const startSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioCtxRef.current = inputCtx;
      outputCtxRef.current = outputCtx;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            addLog("Conectado con Gemini Live");
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const base64 = encodePCM(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg) => {
            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                const buffer = await decodeAudioData(decodeBase64(base64Audio), outputCtx, 24000, 1);
                const source = outputCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(outputCtx.destination);
                source.onended = () => sourcesRef.current.delete(source);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += buffer.duration;
                sourcesRef.current.add(source);
            }
            if (msg.serverContent?.interrupted) {
                sourcesRef.current.forEach(s => s.stop());
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            addLog("Error en la conexión");
            stopSession();
          },
          onclose: () => setIsActive(false),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'Eres un tutor experto en IA. Ayuda al usuario a entender conceptos complejos con analogías simples.'
        }
      });

      sessionRef.current = await sessionPromise;
      setIsActive(true);
    } catch (err) {
      console.error(err);
      addLog("No se pudo iniciar el micro.");
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      <header className="text-center">
        <h1 className="heading-font text-4xl font-extrabold mb-4">Conversación en Tiempo Real</h1>
        <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
            Habla directamente con Gemini 2.5 Native Audio. Sin latencia perceptible, una charla fluida sobre cualquier tema.
        </p>
      </header>

      <div className="flex flex-col items-center gap-8">
        <div className={`relative size-48 rounded-full flex items-center justify-center transition-all duration-500
            ${isActive ? 'bg-primary/20 scale-110 shadow-[0_0_80px_rgba(0,140,140,0.3)]' : 'bg-surface-dark border border-white/5'}`}>
          {isActive && (
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin opacity-50" />
          )}
          <button 
            onClick={isActive ? stopSession : startSession}
            className={`size-32 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90
              ${isActive ? 'bg-primary text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
          >
            <span className="material-symbols-outlined text-5xl">
              {isActive ? 'mic' : 'mic_off'}
            </span>
          </button>
        </div>

        <div className="w-full max-w-md bg-surface-dark border border-white/5 rounded-2xl p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-primary">Estado de Sesión</h4>
              <span className={`size-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          </div>
          <div className="space-y-2 h-40 overflow-y-auto custom-scrollbar text-sm font-mono opacity-60">
            {logs.length === 0 ? <p className="text-white/20">Esperando conexión...</p> : logs.map((log, i) => (
              <p key={i} className="border-l-2 border-primary/20 pl-3 py-1">{log}</p>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl max-w-2xl text-center">
            <h5 className="font-bold mb-2">¿Cómo funciona?</h5>
            <p className="text-xs text-white/50 leading-loose">
                Esta herramienta utiliza el nuevo **Gemini 2.5 Flash Native Audio**, que procesa audio directamente sin pasarlo por texto intermedio, permitiendo reconocer emociones, tono y responder en milisegundos.
            </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
