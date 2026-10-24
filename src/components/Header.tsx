import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentTab: 'quiz' | 'catalog' | 'glossary';
  onSelectTab: (tab: 'quiz' | 'catalog' | 'glossary') => void;
  onRestartQuiz: () => void;
  isQuizCompleted: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onRestartQuiz,
  isQuizCompleted
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single element) */}
        <button
          onClick={() => onSelectTab('quiz')}
          className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <span>TAREA</span>
          <span className="text-zinc-400 font-normal text-sm hidden sm:inline">· Asesor Fotográfico</span>
        </button>

        {/* Zone 2: 4 nav links, single-line, text with hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <button
            onClick={() => onSelectTab('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'quiz'
                ? 'text-zinc-950 border-b-2 border-zinc-900 font-semibold'
                : 'hover:text-zinc-900'
            }`}
          >
            {isQuizCompleted ? 'Mi Recomendación' : 'Recomendador'}
          </button>
          <button
            onClick={() => onSelectTab('catalog')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'catalog'
                ? 'text-zinc-950 border-b-2 border-zinc-900 font-semibold'
                : 'hover:text-zinc-900'
            }`}
          >
            Todas las Cámaras
          </button>
          <button
            onClick={() => onSelectTab('glossary')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'glossary'
                ? 'text-zinc-950 border-b-2 border-zinc-900 font-semibold'
                : 'hover:text-zinc-900'
            }`}
          >
            Glosario sin Tecnicismos
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {isQuizCompleted ? (
            <button
              onClick={onRestartQuiz}
              className="px-4 py-2 text-xs font-semibold text-zinc-900 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
            >
              Reiniciar Test
            </button>
          ) : (
            <button
              onClick={() => onSelectTab('quiz')}
              className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Encontrar mi Cámara</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
