import React from 'react';
import { Mountain, User, Zap, ShieldCheck } from 'lucide-react';

export const VisualShowcase: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-zinc-200">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
          ¿Por qué dar el salto de un móvil a una cámara real?
        </h3>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
          Los sensores grandes captan luz física real, creando profundidad y nitidez auténtica sin los errores de recorte artificiales del teléfono.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Retrato y bokeh */}
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs flex flex-col">
          <div className="relative aspect-4/3 bg-zinc-100 overflow-hidden">
            <img
              src="https://previews.123rf.com/images/antonioguillem/antonioguillem1312/antonioguillem131200082/24758947-portrait-of-a-beautiful-woman-doing-breath-exercises-with-an-autumn-unfocused-background.jpg"
              alt="Retrato con fondo desenfocado natural"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "/src/assets/images/camera_portrait_bokeh_1792869328533.jpg";
              }}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
                <User className="w-3.5 h-3.5 text-zinc-700" />
                <span>Retrato Natural</span>
                <span aria-hidden="true">·</span>
                <span>Fondo Desenfocado (Bokeh)</span>
              </div>
              <h4 className="text-base font-semibold text-zinc-900">
                La persona destaca con suavidad
              </h4>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                Sin pelos cortados ni bordes borrosos falsos. La óptica real crea una separación tridimensional orgánica entre la persona y el fondo.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-500">
              Ideal para retratos familiares, niños y recuerdos inolvidables.
            </div>
          </div>
        </div>

        {/* Card 2: Acción y movimiento */}
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs flex flex-col">
          <div className="relative aspect-4/3 bg-zinc-100 overflow-hidden">
            <img
              src="https://cdn.create.vista.com/api/media/small/296355064/stock-photo-black-brown-hairy-shepherd-dog-running-fast-splashing-water-river"
              alt="Foto de acción con perro corriendo con gotas de agua congeladas"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "/src/assets/images/camera_action_wildlife_1792869328934.jpg";
              }}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
                <Zap className="w-3.5 h-3.5 text-zinc-700" />
                <span>Velocidad de Obturación</span>
                <span aria-hidden="true">·</span>
                <span>Acción Instantánea</span>
              </div>
              <h4 className="text-base font-semibold text-zinc-900">
                Congela el movimiento al milisegundo
              </h4>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                El enfoque sigue los ojos del animal o niño mientras corre, congelando gotas de agua y expresiones alegres sin fotos borrosas.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-500">
              Imprescindible para mascotas activas, carreras y deportes.
            </div>
          </div>
        </div>

        {/* Card 3: Paisaje y viajes */}
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs flex flex-col">
          <div className="relative aspect-4/3 bg-zinc-100 overflow-hidden">
            <img
              src="https://media.istockphoto.com/id/517188688/es/foto/paisaje-de-monta%C3%B1a.jpg?s=612x612&w=0&k=20&c=EnSd5sJdxih_svZHscQ5Hfzr3RSOdXO9MpdmKK4CMTs="
              alt="Paisaje montañoso al atardecer"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "/src/assets/images/camera_landscape_travel_1792869328578.jpg";
              }}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
                <Mountain className="w-3.5 h-3.5 text-zinc-700" />
                <span>Rango Dinámico</span>
                <span aria-hidden="true">·</span>
                <span>Viajes y Paisaje</span>
              </div>
              <h4 className="text-base font-semibold text-zinc-900">
                Cielos con detalle y texturas nítidas
              </h4>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                Conserva tanto las luces doradas del sol como las sombras del bosque sin que el cielo salga como una mancha blanca quemada.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-500">
              Perfecto para caminatas, escapadas y ciudades.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
