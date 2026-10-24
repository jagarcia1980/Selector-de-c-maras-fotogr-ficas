import React, { useState } from 'react';
import { CAMERA_DATABASE } from '../data/cameras';
import { CameraModel } from '../types/camera';
import { CameraImage } from './CameraImage';
import { Scale, Check, Filter } from 'lucide-react';

interface CatalogSectionProps {
  onOpenCompare: (camA: CameraModel, camB: CameraModel) => void;
  onSelectForQuiz: (camera: CameraModel) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onOpenCompare,
  onSelectForQuiz
}) => {
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'budget' | 'mid' | 'premium'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'mirrorless' | 'compact'>('all');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [selectedForCompare, setSelectedForCompare] = useState<CameraModel[]>([]);

  const filteredCameras = CAMERA_DATABASE.filter(cam => {
    if (budgetFilter === 'budget' && cam.price > 650) return false;
    if (budgetFilter === 'mid' && (cam.price <= 650 || cam.price > 1200)) return false;
    if (budgetFilter === 'premium' && cam.price <= 1200) return false;

    if (typeFilter === 'mirrorless' && cam.type !== 'mirrorless') return false;
    if (typeFilter === 'compact' && cam.type !== 'compact_premium') return false;

    if (brandFilter !== 'all' && cam.brand !== brandFilter) return false;

    return true;
  });

  const toggleSelectForCompare = (cam: CameraModel) => {
    if (selectedForCompare.some(c => c.id === cam.id)) {
      setSelectedForCompare(selectedForCompare.filter(c => c.id !== cam.id));
    } else {
      if (selectedForCompare.length >= 2) {
        setSelectedForCompare([selectedForCompare[1], cam]);
      } else {
        setSelectedForCompare([...selectedForCompare, cam]);
      }
    }
  };

  const handleTriggerCompare = () => {
    if (selectedForCompare.length === 2) {
      onOpenCompare(selectedForCompare[0], selectedForCompare[1]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-zinc-200">
        <div>
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
            Qué Cámara comprar
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Explora y filtra los modelos más recomendados de 2025/2026.
          </p>
        </div>

        {/* Selected compare pill banner */}
        {selectedForCompare.length > 0 && (
          <div className="flex items-center gap-3 bg-zinc-900 text-white px-4 py-2 rounded-xl text-xs">
            <span>
              {selectedForCompare.length === 1 
                ? `1 cámara seleccionada (${selectedForCompare[0].name}). Elige otra para comparar.` 
                : `Listas para comparar: ${selectedForCompare[0].name} y ${selectedForCompare[1].name}`}
            </span>
            {selectedForCompare.length === 2 && (
              <button
                onClick={handleTriggerCompare}
                className="bg-white text-zinc-900 px-3 py-1 rounded-md font-semibold hover:bg-zinc-100 transition-colors shrink-0"
              >
                Comparar ahora
              </button>
            )}
            <button
              onClick={() => setSelectedForCompare([])}
              className="text-zinc-400 hover:text-white underline text-[11px]"
            >
              Limpiar
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs / Controls */}
      <div className="space-y-3 mb-8 bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500 w-24">Presupuesto:</span>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setBudgetFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                budgetFilter === 'all' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Todos los precios
            </button>
            <button
              onClick={() => setBudgetFilter('budget')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                budgetFilter === 'budget' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Hasta 650 €
            </button>
            <button
              onClick={() => setBudgetFilter('mid')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                budgetFilter === 'mid' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              650 € - 1.200 €
            </button>
            <button
              onClick={() => setBudgetFilter('premium')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                budgetFilter === 'premium' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Más de 1.200 €
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500 w-24">Tipo:</span>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                typeFilter === 'all' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Todos los tipos
            </button>
            <button
              onClick={() => setTypeFilter('mirrorless')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                typeFilter === 'mirrorless' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Lentes intercambiables
            </button>
            <button
              onClick={() => setTypeFilter('compact')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                typeFilter === 'compact' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Compactas de bolsillo
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500 w-24">Marca:</span>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['all', 'Canon', 'Sony', 'Fujifilm', 'Nikon', 'Panasonic', 'Ricoh', 'OM System'].map(b => (
              <button
                key={b}
                onClick={() => setBrandFilter(b)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  brandFilter === b ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {b === 'all' ? 'Todas las marcas' : b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of cameras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCameras.map((cam) => {
          const isSelected = selectedForCompare.some(c => c.id === cam.id);
          return (
            <div
              key={cam.id}
              className={`bg-white rounded-xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                isSelected ? 'border-zinc-900 ring-2 ring-zinc-900' : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-zinc-500 uppercase">{cam.brand}</span>
                  <span className="text-zinc-500 font-mono tabular-nums">{cam.weightGrams} g</span>
                </div>

                <div className="relative aspect-16/9 bg-zinc-50 rounded-lg overflow-hidden mb-4 border border-zinc-100 flex items-center justify-center">
                  <CameraImage
                    src={cam.imageUrl}
                    alt={cam.name}
                    fitMode="contain"
                    containerClassName="w-full h-full bg-transparent"
                    className="p-2 hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={() => toggleSelectForCompare(cam)}
                      className={`p-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs ${
                        isSelected 
                          ? 'bg-zinc-900 text-white' 
                          : 'bg-white/95 text-zinc-800 hover:bg-white border border-zinc-200/80'
                      }`}
                      title="Seleccionar para comparar cara a cara"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{isSelected ? 'Seleccionada' : 'Comparar'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-bold text-zinc-900 text-base">{cam.name}</h3>
                  <span className="text-base font-extrabold font-mono text-zinc-950 tabular-nums">
                    ~{cam.price} €
                  </span>
                </div>

                <div className="text-xs text-zinc-500 mb-2">{cam.recommendedKit}</div>

                <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-4">
                  {cam.headline}
                </p>

                {/* Specs pill badges are prohibited by constitution, use clean inline text */}
                <div className="flex items-center gap-2 text-[11px] text-zinc-500 mb-4 pb-4 border-b border-zinc-100">
                  <span>{cam.hasViewfinder ? 'Con visor' : 'Sin visor'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{cam.hasArticulatedScreen ? 'Pantalla giratoria' : 'Pantalla fija'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{cam.supportsPhysicalFilters ? 'Filtros rosca' : 'Sin rosca'}</span>
                </div>

                <div className="space-y-1 text-xs text-zinc-700 mb-4">
                  <div className="font-semibold text-zinc-900 text-[11px] mb-1">Puntos clave:</div>
                  {cam.pros.slice(0, 2).map((p, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-zinc-600">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="line-clamp-1">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleSelectForCompare(cam)}
                  className="text-xs font-semibold text-zinc-900 hover:underline flex items-center gap-1"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isSelected ? 'Deseleccionar' : 'Comparar con otra'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
