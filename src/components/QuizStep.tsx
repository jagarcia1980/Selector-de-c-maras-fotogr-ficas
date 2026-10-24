import React from 'react';
import { 
  UserQuizAnswers, 
  ExperienceLevel, 
  PhotoGenre, 
  LightingCondition, 
  BodyTypePreference, 
  FilterNeed, 
  MobileTransferImportance 
} from '../types/camera';
import { 
  BUDGET_TIERS, 
  EXPERIENCE_OPTIONS, 
  GENRE_OPTIONS, 
  LIGHTING_OPTIONS, 
  BODY_TYPE_OPTIONS, 
  FILTER_OPTIONS, 
  MOBILE_TRANSFER_OPTIONS 
} from '../data/questions';
import { 
  ArrowLeft, 
  ArrowRight, 
  Smartphone, 
  GraduationCap, 
  Sliders, 
  Compass, 
  User, 
  Mountain, 
  Zap, 
  Video, 
  Sun, 
  SunMedium, 
  Moon, 
  Layers, 
  Minimize2, 
  Sparkles, 
  Wand2, 
  CircleDot, 
  HelpCircle, 
  Wifi, 
  HardDrive,
  Euro
} from 'lucide-react';

interface QuizStepProps {
  currentStep: number;
  totalSteps: number;
  answers: UserQuizAnswers;
  onUpdateAnswers: (updated: Partial<UserQuizAnswers>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const QuizStep: React.FC<QuizStepProps> = ({
  currentStep,
  totalSteps,
  answers,
  onUpdateAnswers,
  onNext,
  onPrev
}) => {
  // Helper to render icon by name
  const renderIcon = (name?: string) => {
    switch (name) {
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-zinc-700" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-zinc-700" />;
      case 'Sliders': return <Sliders className="w-5 h-5 text-zinc-700" />;
      case 'Compass': return <Compass className="w-5 h-5 text-zinc-700" />;
      case 'User': return <User className="w-5 h-5 text-zinc-700" />;
      case 'Mountain': return <Mountain className="w-5 h-5 text-zinc-700" />;
      case 'Zap': return <Zap className="w-5 h-5 text-zinc-700" />;
      case 'Video': return <Video className="w-5 h-5 text-zinc-700" />;
      case 'Sun': return <Sun className="w-5 h-5 text-zinc-700" />;
      case 'SunMedium': return <SunMedium className="w-5 h-5 text-zinc-700" />;
      case 'Moon': return <Moon className="w-5 h-5 text-zinc-700" />;
      case 'Layers': return <Layers className="w-5 h-5 text-zinc-700" />;
      case 'Minimize2': return <Minimize2 className="w-5 h-5 text-zinc-700" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-zinc-700" />;
      case 'Wand2': return <Wand2 className="w-5 h-5 text-zinc-700" />;
      case 'CircleDot': return <CircleDot className="w-5 h-5 text-zinc-700" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 text-zinc-700" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-zinc-700" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-zinc-700" />;
      default: return <Sparkles className="w-5 h-5 text-zinc-700" />;
    }
  };

  const toggleGenre = (genreId: PhotoGenre) => {
    const current = [...answers.primaryGenres];
    const index = current.indexOf(genreId);
    if (index > -1) {
      if (current.length > 1) {
        current.splice(index, 1);
      }
    } else {
      current.push(genreId);
    }
    onUpdateAnswers({ primaryGenres: current });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Progress header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
          <span>Paso {currentStep} de {totalSteps}</span>
          <span className="font-mono tabular-nums">{Math.round((currentStep / totalSteps) * 100)}% completado</span>
        </div>
        <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-zinc-900 h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Presupuesto */}
      {currentStep === 1 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              ¿Cuál es tu presupuesto aproximado?
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Incluye el cuerpo de la cámara y su primer objetivo para empezar a hacer fotos desde el minuto uno.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-zinc-800">Presupuesto seleccionado:</span>
              <span className="text-2xl font-bold font-mono text-zinc-950 tabular-nums flex items-center">
                {answers.budget >= 2400 ? 'Sin límite (2.500+ €)' : `Hasta ${answers.budget.toLocaleString()} €`}
              </span>
            </div>

            <input
              type="range"
              min={450}
              max={2500}
              step={50}
              value={answers.budget}
              onChange={(e) => onUpdateAnswers({ budget: Number(e.target.value) })}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
            />

            <div className="flex justify-between text-xs text-zinc-600 mt-2 font-mono tabular-nums">
              <span>450 €</span>
              <span>1.000 €</span>
              <span>1.500 €</span>
              <span>2.500+ €</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {BUDGET_TIERS.map((tier) => {
              const isSelected = 
                (tier.id === 'budget' && answers.budget <= 650) ||
                (tier.id === 'mid' && answers.budget > 650 && answers.budget <= 1100) ||
                (tier.id === 'enthusiast' && answers.budget > 1100 && answers.budget <= 1700) ||
                (tier.id === 'pro' && answers.budget > 1700);

              return (
                <button
                  key={tier.id}
                  onClick={() => onUpdateAnswers({ budget: tier.max })}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm' 
                      : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{tier.label}</div>
                  <div className={`text-xs leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {tier.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Nivel de Experiencia */}
      {currentStep === 2 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              ¿Cuál es tu nivel de experiencia en fotografía?
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Buscamos una cámara que se adapte a ti: sin menús laberínticos si estás empezando, o con diales directos si te gusta aprender.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {EXPERIENCE_OPTIONS.map((opt) => {
              const isSelected = answers.experience === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onUpdateAnswers({ experience: opt.id })}
                  className={`w-full text-left p-5 rounded-xl border transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                      : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? 'bg-zinc-800 text-white' : 'bg-zinc-100'}`}>
                    {renderIcon(opt.iconName)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="font-semibold text-base">{opt.title}</div>
                      {opt.badge && (
                        <span className={`text-[11px] font-medium ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {opt.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Estilo y situaciones de disparo */}
      {currentStep === 3 && (
        <div>
          <div className="mb-6">
            <div className="text-xs text-zinc-500 mb-1">Puedes elegir varias opciones</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              ¿Qué tipo de fotos o momentos sueñas con capturar?
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Cada estilo tiene secretos: para niños y perros hace falta autofoco ultrarrápido; para retratos, un sensor que desenfoque el fondo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {GENRE_OPTIONS.map((opt) => {
              const isSelected = answers.primaryGenres.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleGenre(opt.id)}
                  className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                      : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-zinc-800 text-white' : 'bg-zinc-100'}`}>
                    {renderIcon(opt.iconName)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">{opt.title}</div>
                    <div className={`text-xs leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {opt.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 4: Condiciones de luz */}
      {currentStep === 4 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              ¿Harás la mayoría de las fotos de día o también de noche?
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              De día casi cualquier cámara hace fotos preciosas. Con poca luz (cenas, conciertos, noche urbana) se nota la ventaja de los sensores con estabilizador.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {LIGHTING_OPTIONS.map((opt) => {
              const isSelected = answers.lighting === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onUpdateAnswers({ lighting: opt.id })}
                  className={`w-full text-left p-5 rounded-xl border transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                      : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? 'bg-zinc-800 text-white' : 'bg-zinc-100'}`}>
                    {renderIcon(opt.iconName)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-base mb-1">{opt.title}</div>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {opt.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 5: Tipo de cuerpo (Bolsillo vs Lentes intercambiables) */}
      {currentStep === 5 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              ¿Prefieres una cámara de bolsillo o una con lentes que se puedan cambiar?
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Las de bolsillo son comodísimas porque nunca tienes que limpiar sensores ni comprar piezas; las de lentes intercambiables te permiten crecer durante años.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {BODY_TYPE_OPTIONS.map((opt) => {
              const isSelected = answers.bodyType === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onUpdateAnswers({ bodyType: opt.id })}
                  className={`w-full text-left p-5 rounded-xl border transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                      : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? 'bg-zinc-800 text-white' : 'bg-zinc-100'}`}>
                    {renderIcon(opt.iconName)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="font-semibold text-base">{opt.title}</div>
                      {opt.badge && (
                        <span className={`text-[11px] font-medium ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {opt.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 6: Filtros físicos (degradados, polarizadores) */}
      {currentStep === 6 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              ¿Te gustaría usar filtros físicos de rosca (degradados para atardeceres o polarizadores)?
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Son pequeños cristales que se enroscan delante del objetivo: los polarizadores quitan los reflejos del mar o charcos; los degradados oscurecen el cielo para que se vea el atardecer perfecto.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {FILTER_OPTIONS.map((opt) => {
              const isSelected = answers.filterNeed === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onUpdateAnswers({ filterNeed: opt.id })}
                  className={`w-full text-left p-5 rounded-xl border transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                      : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? 'bg-zinc-800 text-white' : 'bg-zinc-100'}`}>
                    {renderIcon(opt.iconName)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="font-semibold text-base">{opt.title}</div>
                      {opt.badge && (
                        <span className={`text-[11px] font-medium ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {opt.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 7: Pasar fotos al teléfono móvil */}
      {currentStep === 7 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              ¿Cómo de importante es para ti pasar las fotos al móvil al instante?
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Algunas marcas tienen aplicaciones que sincronizan por Bluetooth mientras caminas; en otras es más cómodo usar un cable o lector.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {MOBILE_TRANSFER_OPTIONS.map((opt) => {
              const isSelected = answers.mobileTransfer === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onUpdateAnswers({ mobileTransfer: opt.id })}
                  className={`w-full text-left p-5 rounded-xl border transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                      : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? 'bg-zinc-800 text-white' : 'bg-zinc-100'}`}>
                    {renderIcon(opt.iconName)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="font-semibold text-base">{opt.title}</div>
                      {opt.badge && (
                        <span className={`text-[11px] font-medium ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {opt.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-zinc-200">
        {currentStep > 1 ? (
          <button
            onClick={onPrev}
            className="px-5 py-2.5 text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={onNext}
          className="px-6 py-2.5 text-sm font-semibold text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-xs ml-auto"
        >
          <span>{currentStep === totalSteps ? 'Ver Mi Cámara Ideal' : 'Siguiente'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
