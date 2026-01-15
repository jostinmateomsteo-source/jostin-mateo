
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Fundamentals from './views/Fundamentals';
import CaseStudy from './views/CaseStudy';
import ImageGen from './views/ImageGen';
import VoiceAssistant from './views/VoiceAssistant';
import ThinkingChat from './views/ThinkingChat';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-gemini-bg overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className={`flex-1 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${isSidebarOpen ? 'ml-[280px]' : 'ml-[80px]'} h-screen overflow-y-auto relative z-10`}>
          <div className="min-h-full flex flex-col">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/fundamentals" element={<Fundamentals />} />
              <Route path="/case-study" element={<CaseStudy />} />
              <Route path="/image-tools" element={<ImageGen />} />
              <Route path="/voice" element={<VoiceAssistant />} />
              <Route path="/thinking" element={<ThinkingChat />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
