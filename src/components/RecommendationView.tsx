import React from 'react';
import { RecommendationMatch, UserQuizAnswers, CameraModel } from '../types/camera';
import { CameraImage } from './CameraImage';
import { 
  Sparkles, 
  Check, 
  Info, 
  Layers, 
  Weight, 
  Eye, 
  RotateCcw, 
  SlidersHorizontal, 
  Share2, 
  ArrowUpRight,
  Sun,
  Moon,
  Zap,
  Filter
} from 'lucide-react';

interface RecommendationViewProps {
  recommendations: RecommendationMatch[];
  answers: UserQuizAnswers;
  onUpdateAnswers: (updated: Partial<UserQuizAnswers>) => void;
  onRestartQuiz: () => void;
  onOpenCompare: (cameraA: CameraModel, cameraB: CameraModel) => void;
  onViewCatalog: () => void;
}

export const RecommendationView: React.FC<RecommendationViewProps> = ({
  recommendations,
  answers,
  onUpdateAnswers,
  onRestartQuiz,
  onOpenCompare,
  onViewCatalog
}) => {
  const bestMatch = recommendations[0];
  const budgetSaver = recommendations.find(r => r.role === 'budget_saver');
  const premiumUpgrade = recommendations.find(r => r.role === 'premium_upgrade');

  const otherTopCameras = recommendations.slice(1, 4);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Banner / Match Summary */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-1.5">
            <span>Resultados calculados</span>
            <span aria-hidden="true">·</span>
            <span>Para principiantes</span>
            <span aria-hidden="true">·</span>
            <span>Precios actualizados</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Tu Cámara Recomendada
          </h1>
          <p className="mt-2 text-sm text-zinc-600 max-w-2xl leading-relaxed">
            Hemos analizado tus preferencias de presupuesto, tipo de fotos y facilidad de uso. Esta es la combinación óptima para empezar con resultados espectaculares desde el primer disparo.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRestartQuiz}
            className="px-4 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repetir cuestionario</span>
          </button>
        </div>
      </div>

      {/* Main #1 Match Card */}
      {bestMatch && (
        <div className="mt-8 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Visual Column */}
            <div className="lg:col-span-5 bg-gradient-to-b from-zinc-50 to-zinc-100/70 border-b lg:border-b-0 lg:border-r border-zinc-200/80 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start z-10 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700 bg-white border border-zinc-200 px-3 py-1 rounded-md shadow-xs">
                  {bestMatch.camera.brand}
                </span>
                <span className="text-xs font-mono font-bold text-white bg-emerald-600 px-2.5 py-1 rounded-md shadow-xs">
                  {bestMatch.matchScore}% Afinidad
                </span>
              </div>

              <div className="my-auto py-3 flex items-center justify-center">
                <CameraImage
                  src={bestMatch.camera.imageUrl}
                  alt={bestMatch.camera.name}
                  fitMode="contain"
                  containerClassName="w-full h-64 sm:h-72 bg-transparent"
                  className="max-h-64 drop-shadow-md hover:scale-105 transition-transform"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200/60">
                <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Recomendación principal #1</div>
                <div className="text-xl font-bold font-display text-zinc-950">{bestMatch.camera.name}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{bestMatch.camera.tagline}</div>
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Price and Kit Strip */}
                <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-zinc-100">
                  <div>
                    <span className="text-xs text-zinc-500 font-medium block">Precio orientativo con objetivo:</span>
                    <span className="text-3xl font-extrabold font-mono text-zinc-950 tabular-nums">
                      ~{bestMatch.camera.price} €
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-500 font-medium block">Kit recomendado:</span>
                    <span className="text-xs font-semibold text-zinc-800">
                      {bestMatch.camera.recommendedKit}
                    </span>
                  </div>
                </div>

                {/* Headline & Why it fits */}
                <div className="my-5">
                  <h3 className="text-lg font-bold text-zinc-900 mb-1">
                    {bestMatch.camera.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {bestMatch.camera.idealForWho}
                  </p>
                </div>

                {/* Highlight bullets */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-semibold text-zinc-900 block mb-2">
                    Por qué encaja con tus respuestas:
                  </span>
                  {bestMatch.highlightReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                {/* Plain-Language Specs Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-100 mb-6 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Tipo de sensor</span>
                    <span className="font-semibold text-zinc-800">{bestMatch.camera.sensorName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Peso real</span>
                    <span className="font-semibold text-zinc-800">{bestMatch.camera.weightGrams} g</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Filtros físicos</span>
                    <span className="font-semibold text-zinc-800">
                      {bestMatch.camera.supportsPhysicalFilters ? 'Rosca universal' : 'Filtro digital/No'}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Pantalla móvil</span>
                    <span className="font-semibold text-zinc-800">
                      {bestMatch.camera.hasArticulatedScreen ? 'Abatible 360°' : 'Fija'}
                    </span>
                  </div>
                </div>

                {/* Pros and Honest Considerations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-zinc-100">
                  <div>
                    <span className="font-semibold text-zinc-900 block mb-1.5">Lo mejor de este modelo:</span>
                    <ul className="space-y-1 text-zinc-600">
                      {bestMatch.camera.pros.slice(0, 3).map((p, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-semibold text-zinc-900 block mb-1.5">A tener en cuenta (con sinceridad):</span>
                    <ul className="space-y-1 text-zinc-600">
                      {bestMatch.camera.goodToKnow.slice(0, 2).map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">·</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-zinc-500">
                  {bestMatch.camera.filterDetails}
                </div>
                <div className="flex items-center gap-2">
                  {budgetSaver && budgetSaver.camera.id !== bestMatch.camera.id && (
                    <button
                      onClick={() => onOpenCompare(bestMatch.camera, budgetSaver.camera)}
                      className="px-3.5 py-2 text-xs font-semibold text-zinc-800 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                      Comparar con {budgetSaver.camera.name}
                    </button>
                  )}
                  {premiumUpgrade && premiumUpgrade.camera.id !== bestMatch.camera.id && (
                    <button
                      onClick={() => onOpenCompare(bestMatch.camera, premiumUpgrade.camera)}
                      className="px-3.5 py-2 text-xs font-semibold text-zinc-800 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                      Comparar con {premiumUpgrade.camera.name}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alternative Options Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-zinc-900">
              Otras alternativas a considerar
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Si quieres gastar menos o si quieres dar un salto mayor de calidad
            </p>
          </div>
          <button
            onClick={onViewCatalog}
            className="text-xs font-semibold text-zinc-900 hover:underline flex items-center gap-1"
          >
            <span>Ver catálogo completo (12 cámaras)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherTopCameras.map((rec) => {
            const isSaver = rec.camera.price < bestMatch.camera.price - 100;
            const isUpgrade = rec.camera.price > bestMatch.camera.price + 100;

            return (
              <div
                key={rec.camera.id}
                className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold text-zinc-500 uppercase">{rec.camera.brand}</span>
                    <span className="font-mono text-zinc-700 font-semibold">{rec.matchScore}% afinidad</span>
                  </div>

                  <div className="relative aspect-16/9 bg-zinc-50 rounded-lg overflow-hidden mb-4 border border-zinc-100 flex items-center justify-center">
                    <CameraImage
                      src={rec.camera.imageUrl}
                      alt={rec.camera.name}
                      fitMode="contain"
                      containerClassName="w-full h-full bg-transparent"
                      className="p-2 hover:scale-105 transition-transform"
                    />
                    {isSaver && (
                      <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded shadow-xs">
                        Opción ahorro (~{rec.camera.price} €)
                      </span>
                    )}
                    {isUpgrade && (
                      <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-zinc-900 text-white px-2 py-0.5 rounded shadow-xs">
                        Gama superior (~{rec.camera.price} €)
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-zinc-900 text-base">{rec.camera.name}</h4>
                  <div className="text-xs text-zinc-500 mb-2 font-mono tabular-nums">~{rec.camera.price} € con lente</div>
                  
                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-4">
                    {rec.camera.headline}
                  </p>

                  <div className="space-y-1.5 text-xs text-zinc-700 mb-4">
                    {rec.highlightReasons.slice(0, 2).map((r, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-zinc-400">
                    {rec.camera.weightGrams} g · {rec.camera.hasViewfinder ? 'Con visor' : 'Sin visor'}
                  </span>
                  <button
                    onClick={() => onOpenCompare(bestMatch.camera, rec.camera)}
                    className="text-xs font-semibold text-zinc-900 hover:text-zinc-700 underline shrink-0"
                  >
                    Comparar cara a cara
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Dynamic Simulator Section */}
      <div className="mt-14 bg-zinc-900 text-white rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              <span>Simulador interactivo en tiempo real</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              ¿Y si cambias algún criterio? Mira cómo cambia la recomendación
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Modifica estos ajustes al vuelo y observa cómo la cámara óptima se recalcula de forma inmediata.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick budget slider */}
          <div className="bg-zinc-800/80 p-4 rounded-xl border border-zinc-700">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-zinc-300 font-medium">Presupuesto:</span>
              <span className="font-mono font-bold text-white tabular-nums">
                {answers.budget >= 2400 ? '2.500+ €' : `${answers.budget} €`}
              </span>
            </div>
            <input
              type="range"
              min={450}
              max={2500}
              step={50}
              value={answers.budget}
              onChange={(e) => onUpdateAnswers({ budget: Number(e.target.value) })}
              className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
              <span>450€</span>
              <span>1.000€</span>
              <span>1.500€</span>
              <span>2.500€+</span>
            </div>
          </div>

          {/* Quick night toggle */}
          <div className="bg-zinc-800/80 p-4 rounded-xl border border-zinc-700 flex flex-col justify-between">
            <div className="text-xs font-medium text-zinc-300 mb-2">
              ¿Fotos con poca luz / noche?
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onUpdateAnswers({ lighting: 'mostly_daylight' })}
                className={`py-1.5 px-3 rounded-lg font-medium transition-colors ${
                  answers.lighting === 'mostly_daylight'
                    ? 'bg-white text-zinc-900 font-bold'
                    : 'bg-zinc-700/60 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                De día
              </button>
              <button
                onClick={() => onUpdateAnswers({ lighting: 'low_light_night' })}
                className={`py-1.5 px-3 rounded-lg font-medium transition-colors ${
                  answers.lighting === 'low_light_night'
                    ? 'bg-white text-zinc-900 font-bold'
                    : 'bg-zinc-700/60 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                Noche/Poca luz
              </button>
            </div>
          </div>

          {/* Quick body type toggle */}
          <div className="bg-zinc-800/80 p-4 rounded-xl border border-zinc-700 flex flex-col justify-between">
            <div className="text-xs font-medium text-zinc-300 mb-2">
              ¿Tipo de cámara preferida?
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onUpdateAnswers({ bodyType: 'interchangeable' })}
                className={`py-1.5 px-3 rounded-lg font-medium transition-colors truncate ${
                  answers.bodyType === 'interchangeable'
                    ? 'bg-white text-zinc-900 font-bold'
                    : 'bg-zinc-700/60 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                Lentes cambiables
              </button>
              <button
                onClick={() => onUpdateAnswers({ bodyType: 'compact_pocket' })}
                className={`py-1.5 px-3 rounded-lg font-medium transition-colors truncate ${
                  answers.bodyType === 'compact_pocket'
                    ? 'bg-white text-zinc-900 font-bold'
                    : 'bg-zinc-700/60 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                Bolsillo / Fija
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
