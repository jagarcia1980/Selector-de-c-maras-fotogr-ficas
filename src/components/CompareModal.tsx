import React from 'react';
import { CameraModel } from '../types/camera';
import { CameraImage } from './CameraImage';
import { X, Check, Minus, Scale } from 'lucide-react';

interface CompareModalProps {
  cameraA: CameraModel | null;
  cameraB: CameraModel | null;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  cameraA,
  cameraB,
  onClose
}) => {
  if (!cameraA || !cameraB) return null;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1 font-mono text-xs font-semibold text-zinc-900">
        <span>{rating}/5</span>
        <div className="w-16 bg-zinc-200 h-1.5 rounded-full overflow-hidden inline-block ml-1">
          <div
            className="bg-zinc-900 h-full rounded-full"
            style={{ width: `${(rating / 5) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-zinc-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-zinc-700" />
            <h3 className="text-lg font-bold text-zinc-900">
              Comparativa Cara a Cara (Sin Tecnicismos)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Cameras summary banner */}
          <div className="grid grid-cols-2 gap-4 pb-6 border-b border-zinc-200">
            {/* Camera A */}
            <div className="text-center p-4 bg-zinc-50 rounded-xl flex flex-col items-center">
              <CameraImage
                src={cameraA.imageUrl}
                alt={cameraA.name}
                fitMode="contain"
                containerClassName="w-32 h-24 bg-transparent mb-2"
                className="max-h-24"
              />
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-0.5">
                {cameraA.brand}
              </span>
              <h4 className="font-bold text-zinc-900 text-base mb-1">{cameraA.name}</h4>
              <div className="text-lg font-extrabold font-mono text-zinc-950 tabular-nums">
                ~{cameraA.price} €
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">{cameraA.recommendedKit}</div>
            </div>

            {/* Camera B */}
            <div className="text-center p-4 bg-zinc-50 rounded-xl flex flex-col items-center">
              <CameraImage
                src={cameraB.imageUrl}
                alt={cameraB.name}
                fitMode="contain"
                containerClassName="w-32 h-24 bg-transparent mb-2"
                className="max-h-24"
              />
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-0.5">
                {cameraB.brand}
              </span>
              <h4 className="font-bold text-zinc-900 text-base mb-1">{cameraB.name}</h4>
              <div className="text-lg font-extrabold font-mono text-zinc-950 tabular-nums">
                ~{cameraB.price} €
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">{cameraB.recommendedKit}</div>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-zinc-100 text-sm">
            {/* Row: Tipo de cámara */}
            <div className="py-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 text-xs font-semibold text-zinc-500">
                Tipo de cámara
              </div>
              <div className="col-span-4 text-xs font-medium text-zinc-800">
                {cameraA.typeLabel}
              </div>
              <div className="col-span-4 text-xs font-medium text-zinc-800">
                {cameraB.typeLabel}
              </div>
            </div>

            {/* Row: Peso en la mano */}
            <div className="py-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 text-xs font-semibold text-zinc-500">
                Peso real en mano
              </div>
              <div className="col-span-4 text-xs font-medium text-zinc-800">
                {cameraA.weightLabel}
              </div>
              <div className="col-span-4 text-xs font-medium text-zinc-800">
                {cameraB.weightLabel}
              </div>
            </div>

            {/* Row: Facilidad para principiantes */}
            <div className="py-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 text-xs font-semibold text-zinc-500">
                Facilidad de uso (novatos)
              </div>
              <div className="col-span-4">
                {renderStars(cameraA.easeOfUseRating)}
              </div>
              <div className="col-span-4">
                {renderStars(cameraB.easeOfUseRating)}
              </div>
            </div>

            {/* Row: Comportamiento de noche */}
            <div className="py-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 text-xs font-semibold text-zinc-500">
                Fotos con poca luz / noche
              </div>
              <div className="col-span-4">
                {renderStars(cameraA.lowLightRating)}
              </div>
              <div className="col-span-4">
                {renderStars(cameraB.lowLightRating)}
              </div>
            </div>

            {/* Row: Rapidez para niños y perros */}
            <div className="py-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 text-xs font-semibold text-zinc-500">
                Rapidez con niños y mascotas
              </div>
              <div className="col-span-4">
                {renderStars(cameraA.actionSpeedRating)}
              </div>
              <div className="col-span-4">
                {renderStars(cameraB.actionSpeedRating)}
              </div>
            </div>

            {/* Row: Visor ocular (para cuando hay sol) */}
            <div className="py-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 text-xs font-semibold text-zinc-500">
                Visor para mirar con el ojo
              </div>
              <div className="col-span-4 text-xs text-zinc-700">
                {cameraA.hasViewfinder ? (
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-4 h-4" /> Sí, ideal a pleno sol
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-zinc-500">
                    <Minus className="w-4 h-4" /> No (se mira en pantalla)
                  </span>
                )}
              </div>
              <div className="col-span-4 text-xs text-zinc-700">
                {cameraB.hasViewfinder ? (
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-4 h-4" /> Sí, ideal a pleno sol
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-zinc-500">
                    <Minus className="w-4 h-4" /> No (se mira en pantalla)
                  </span>
                )}
              </div>
            </div>

            {/* Row: Admite filtros físicos de rosca */}
            <div className="py-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 text-xs font-semibold text-zinc-500">
                Filtros físicos de rosca
              </div>
              <div className="col-span-4 text-xs text-zinc-700">
                {cameraA.supportsPhysicalFilters ? (
                  <span className="text-emerald-700 font-medium">
                    Sí, enrosca filtros universales (degradados, polarizadores)
                  </span>
                ) : (
                  <span className="text-zinc-500">
                    No estándar (usa filtros digitales o adaptadores)
                  </span>
                )}
              </div>
              <div className="col-span-4 text-xs text-zinc-700">
                {cameraB.supportsPhysicalFilters ? (
                  <span className="text-emerald-700 font-medium">
                    Sí, enrosca filtros universales (degradados, polarizadores)
                  </span>
                ) : (
                  <span className="text-zinc-500">
                    No estándar (usa filtros digitales o adaptadores)
                  </span>
                )}
              </div>
            </div>

            {/* Row: Pantalla para selfies / vlogs */}
            <div className="py-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 text-xs font-semibold text-zinc-500">
                Pantalla que gira para verte
              </div>
              <div className="col-span-4 text-xs text-zinc-700">
                {cameraA.hasArticulatedScreen ? 'Sí, gira hacia el frente' : 'Fija o basculante sólo arriba'}
              </div>
              <div className="col-span-4 text-xs text-zinc-700">
                {cameraB.hasArticulatedScreen ? 'Sí, gira hacia el frente' : 'Fija o basculante sólo arriba'}
              </div>
            </div>
          </div>

          {/* Verdict cards */}
          <div className="mt-6 pt-6 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-zinc-50 rounded-xl">
              <span className="font-bold text-zinc-900 block mb-1">
                Elige la {cameraA.name} si:
              </span>
              <p className="text-zinc-600 leading-relaxed">
                {cameraA.idealForWho}
              </p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-xl">
              <span className="font-bold text-zinc-900 block mb-1">
                Elige la {cameraB.name} si:
              </span>
              <p className="text-zinc-600 leading-relaxed">
                {cameraB.idealForWho}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-50 px-6 py-4 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            Cerrar comparador
          </button>
        </div>
      </div>
    </div>
  );
};
