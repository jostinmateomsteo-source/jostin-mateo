
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Panel Principal', icon: 'home' },
    { path: '/fundamentals', label: 'Conceptos IA', icon: 'school' },
    { path: '/thinking', label: 'Razonamiento', icon: 'psychology' },
    { path: '/image-tools', label: 'IA Visual', icon: 'image' },
    { path: '/voice', label: 'Conversación', icon: 'settings_voice' },
    { path: '/case-study', label: 'Laboratorio', icon: 'science' },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 bg-[#1e1f20] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] flex flex-col border-r border-[#444746]/30
      ${isOpen ? 'w-[280px] translate-x-0 shadow-2xl' : 'w-[80px] translate-x-0'}`}>
      
      {/* Header / Toggle */}
      <div className="h-[80px] flex items-center px-4 mb-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 hover:bg-white/5 rounded-full transition-all flex items-center justify-center shrink-0 active:scale-90"
        >
          <span className="material-symbols-outlined text-gemini-subtext hover:text-white">menu</span>
        </button>
        {isOpen && (
          <div className="ml-4 flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-500">
             <span className="material-symbols-outlined text-gemini-blue text-2xl fill-1">smart_toy</span>
             <h1 className="google-font font-semibold text-[22px] tracking-tight text-white">JoschatAI</h1>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center h-[52px] rounded-full transition-all duration-300 group relative
                ${isActive 
                  ? 'bg-gemini-blue/15 text-gemini-blue shadow-inner' 
                  : 'text-gemini-subtext hover:bg-white/5 hover:text-white'}`}
            >
              <div className="w-[56px] flex items-center justify-center shrink-0">
                <span className={`material-symbols-outlined text-[24px] ${isActive ? 'fill-1' : ''}`}>
                  {item.icon}
                </span>
              </div>
              
              {isOpen && (
                <span className="font-medium text-[14px] whitespace-nowrap opacity-100 transition-opacity duration-500 delay-100">
                  {item.label}
                </span>
              )}

              {isActive && (
                <div className="absolute right-3 w-1 h-1 bg-gemini-blue rounded-full" />
              )}

              {!isOpen && (
                 <div className="absolute left-full ml-6 px-3 py-2 bg-gemini-surface text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 whitespace-nowrap shadow-xl border border-gemini-border translate-x-[-10px] group-hover:translate-x-0">
                   {item.label}
                 </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Profile */}
      <div className="p-4 border-t border-[#444746]/20 bg-[#1e1f20]/50">
        <div className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all cursor-pointer hover:bg-white/5
          ${!isOpen ? 'justify-center' : ''}`}>
          <div className="size-10 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xs border border-white/20 shrink-0 shadow-lg">
            JD
          </div>
          {isOpen && (
            <div className="flex flex-col overflow-hidden animate-in fade-in duration-300">
              <span className="text-sm font-semibold text-white truncate">John Doe</span>
              <div className="flex items-center gap-1">
                 <span className="size-1.5 bg-green-500 rounded-full"></span>
                 <span className="text-[11px] text-gemini-subtext">Plan Premium</span>
              </div>
            </div>
          )}
        </div>
        
        {isOpen && (
            <div className="mt-4 px-2 space-y-1 animate-in slide-in-from-bottom-2 duration-500">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gemini-blue w-[70%] rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-gemini-subtext mt-1">
                  <span>Tokens usados</span>
                  <span>70%</span>
                </div>
            </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
