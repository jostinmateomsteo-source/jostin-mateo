import React, { useState, useRef, useEffect } from 'react';
import { generateImage, editImage } from '../services/geminiService';
import { GoogleGenAI } from "@google/genai";

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

const ART_STYLES = [
  { id: 'none', label: 'Sin estilo', icon: 'auto_fix_off', prompt: '' },
  { id: 'photorealistic', label: 'Fotorrealista', icon: 'photo_camera', prompt: 'photorealistic style, high resolution, 8k, hyper-detailed, cinematic lighting' },
  { id: 'anime', label: 'Anime / Manga', icon: 'animation', prompt: 'japanese anime style, vibrant colors, clean lines, studio ghibli aesthetic' },
  { id: 'watercolor', label: 'Acuarela', icon: 'format_paint', prompt: 'watercolor style, soft edges, paper texture, artistic, handmade feel' },
  { id: 'pixelart', label: 'Pixel Art', icon: 'grid_view', prompt: 'pixel art style, 16-bit, retro video game aesthetic, sharp pixels' },
  { id: '3d-render', label: 'Render 3D', icon: 'deployed_code', prompt: '3D render, octane render style, unreal engine 5, volumetric lighting' },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: 'settings_input_antenna', prompt: 'cyberpunk style, neon lights, rainy night atmosphere, futuristic' },
  { id: 'oilpainting', label: 'Pintura al Óleo', icon: 'palette', prompt: 'oil painting style, thick brushstrokes, classical canvas texture' },
];

const ImageGen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('none');
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, chatLoading]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const styleConfig = ART_STYLES.find(s => s.id === selectedStyle);
      const finalPrompt = selectedStyle !== 'none' && styleConfig?.prompt 
        ? `${prompt}, ${styleConfig.prompt}` 
        : prompt;

      const url = await generateImage(finalPrompt, size);
      setResult(url);
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        content: `Imagen generada con éxito ${selectedStyle !== 'none' ? `usando el estilo ${styleConfig?.label}` : ''}. ¿Deseas aplicar algún retoque?` 
      }]);
    } catch (e) {
      console.error(e);
      alert("Error al generar. Comprueba tu clave API.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!prompt || !result) return;
    setLoading(true);
    try {
      const base64Data = result.split(',')[1];
      const newUrl = await editImage(base64Data, 'image/png', prompt);
      setResult(newUrl);
      setChatMessages(prev => [...prev, { role: 'ai', content: `Edición completada: "${prompt}".` }]);
    } catch (e) {
      console.error(e);
      alert("Error al editar.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResult(reader.result as string);
        setIsEditing(true);
        setChatMessages(prev => [...prev, { role: 'ai', content: "Imagen cargada. Pídeme cambios específicos sobre ella." }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChatSend = async () => {
    if (!chatInput || chatLoading) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Contexto: Generación de imágenes. Estilo actual: ${selectedStyle}. Prompt: ${prompt}. Usuario: ${userMsg}`,
        config: {
          systemInstruction: "Eres un consultor de arte IA. Sugiere mejoras de prompts o estilos técnicos.",
        }
      });
      setChatMessages(prev => [...prev, { role: 'ai', content: response.text || "No tengo sugerencias ahora." }]);
    } catch (e) {
      console.error(e);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-gemini-bg overflow-hidden">
      {/* Panel Izquierdo: Configuración */}
      <div className="w-full md:w-[400px] border-r border-gemini-border p-8 space-y-8 overflow-y-auto custom-scrollbar shrink-0">
        <header>
            <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-gemini-blue text-3xl">brush</span>
                <h1 className="google-font text-2xl font-medium">Estudio Visual</h1>
            </div>
            <p className="text-gemini-subtext text-sm">Crea obras de arte desde cero o edita las existentes.</p>
        </header>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gemini-subtext">Instrucción Principal</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={isEditing ? "Ej: 'haz que el cielo sea más brillante'..." : "Ej: 'Un astronauta cabalgando un unicornio en Marte'..."}
              className="w-full bg-gemini-surface border border-gemini-border rounded-2xl p-4 text-sm text-gemini-text focus:ring-2 focus:ring-gemini-blue/50 outline-none min-h-[140px] transition-all resize-none shadow-inner"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gemini-subtext flex items-center justify-between">
              Estilo Artístico
              <span className="text-[9px] bg-gemini-blue/10 text-gemini-blue px-2 py-0.5 rounded-full">Recomendado</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ART_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                    selectedStyle === style.id 
                    ? 'bg-gemini-blue/10 border-gemini-blue text-gemini-blue shadow-lg scale-[1.02]' 
                    : 'bg-gemini-surface border-gemini-border text-gemini-subtext hover:border-gemini-subtext/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{style.icon}</span>
                  <span className="text-[10px] font-semibold text-center leading-tight">{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gemini-subtext">Calidad de Salida</label>
            <div className="flex gap-2 p-1 bg-gemini-surface rounded-2xl border border-gemini-border">
              {(['1K', '2K', '4K'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${size === s ? 'bg-gemini-blue text-black shadow-md' : 'text-gemini-subtext hover:bg-white/5'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button
              disabled={loading || !prompt}
              onClick={isEditing ? handleEdit : handleGenerate}
              className="w-full bg-gemini-blue hover:bg-[#a1c6ff] disabled:opacity-30 py-4 rounded-2xl font-bold text-sm text-[#001d35] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              {loading ? (
                <div className="size-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span className="material-symbols-outlined">{isEditing ? 'magic_button' : 'auto_awesome'}</span>
                  {isEditing ? 'Aplicar Edición' : 'Generar Obra'}
                </>
              )}
            </button>
            <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 rounded-2xl border border-gemini-border text-xs font-semibold text-gemini-subtext hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
                <span className="material-symbols-outlined text-sm">upload</span>
                Cargar imagen base
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
          </div>
        </div>
      </div>

      {/* Área de Visualización y Feedback */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative p-4 md:p-10">
        <div className="flex-1 flex flex-col items-center justify-center">
          {result ? (
            <div className="relative group max-w-2xl w-full animate-in zoom-in-95 duration-700">
              <div className="absolute -inset-2 bg-gradient-to-r from-gemini-blue via-purple-500 to-pink-500 rounded-[36px] blur-md opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-gemini-surface p-2 rounded-[36px] border border-gemini-border overflow-hidden shadow-2xl">
                <img src={result} alt="Arte Generado" className="w-full h-auto rounded-[28px] shadow-inner" />
                <div className="absolute top-6 right-6 flex gap-2">
                    <button onClick={() => setResult(null)} className="size-10 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8 max-w-sm opacity-20 hover:opacity-40 transition-opacity">
               <span className="material-symbols-outlined text-[120px] gemini-gradient-text">image_search</span>
               <div className="space-y-2">
                 <h2 className="text-2xl font-medium text-white">Lienzo en espera</h2>
                 <p className="text-sm">Tus creaciones aparecerán aquí. Prueba a mezclar estilos y prompts creativos.</p>
               </div>
            </div>
          )}
        </div>

        {/* Chat flotante para consejos artísticos */}
        <div className="w-full max-w-3xl mx-auto pt-6">
            <div className="glass-card border border-white/5 rounded-[28px] p-4 flex flex-col shadow-2xl">
                <div className="max-h-32 overflow-y-auto px-4 py-2 space-y-3 custom-scrollbar">
                    {chatMessages.length === 0 && (
                        <p className="text-[11px] text-center text-gemini-subtext/40 italic">Asistente artístico listo para darte consejos...</p>
                    )}
                    {chatMessages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`px-4 py-2 rounded-2xl text-[12px] ${m.role === 'user' ? 'bg-gemini-blue/10 text-gemini-blue' : 'bg-white/5 text-gemini-subtext'}`}>
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {chatLoading && <div className="text-[10px] text-gemini-blue animate-pulse">Analizando composición...</div>}
                    <div ref={chatEndRef} />
                </div>
                <div className="flex items-center gap-2 bg-black/30 rounded-full px-4 py-1 mt-2">
                    <input 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                        className="flex-1 bg-transparent border-none outline-none text-xs py-2 text-gemini-text placeholder:text-white/20"
                        placeholder="Pregúntame sobre técnicas o colores..."
                    />
                    <button onClick={handleChatSend} className="text-gemini-blue hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGen;