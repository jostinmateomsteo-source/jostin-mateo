
import React, { useState } from 'react';
import { generateThinkingResponse } from '../services/geminiService';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

const ThinkingChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await generateThinkingResponse(userMsg);
      setMessages(prev => [...prev, { role: 'ai', content: response || 'No response.' }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'ai', content: "Hubo un error al contactar con Gemini 3 Pro Thinking." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-8 max-w-5xl mx-auto space-y-6">
      <header className="flex justify-between items-end">
        <div>
            <h1 className="heading-font text-4xl font-extrabold mb-2">Razonamiento Profundo</h1>
            <p className="text-white/50">Consultas complejas usando Gemini 3 Pro con Thinking Mode (32k tokens de pensamiento).</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full text-primary text-xs font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">psychology</span>
            Thinking Mode Active
        </div>
      </header>

      <div className="flex-1 bg-surface-dark border border-white/5 rounded-2xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 gap-4">
                <span className="material-symbols-outlined text-7xl">lightbulb_circle</span>
                <p className="max-w-xs font-bold uppercase tracking-widest text-xs">Empieza una consulta de alto razonamiento</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white/5 border border-white/10 text-white/80'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl max-w-[80%] space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tighter">
                    <div className="size-2 bg-primary rounded-full animate-pulse" />
                    Gemini está pensando...
                </div>
                <div className="space-y-2">
                    <div className="h-2 w-48 bg-white/10 rounded animate-pulse" />
                    <div className="h-2 w-32 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-black/20 border-t border-white/5 flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu consulta compleja aquí..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary text-white"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 p-4 rounded-xl text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThinkingChat;
