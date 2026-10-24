import React, { useState } from 'react';
import { CircleDot, Sparkles, Layers, Sun, Eye, ChevronDown } from 'lucide-react';

interface GlossaryItem {
  id: string;
  category: string;
  term: string;
  simpleAnswer: string;
  detailedExplanation: string;
  exampleScenario: string;
}

const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'filtros-rosca',
    category: 'Accesorios y Creatividad',
    term: '¿Qué son los filtros de rosca (degradados, polarizadores, ND)?',
    simpleAnswer: 'Son pequeños discos de cristal fino que se enroscan directamente en la punta del objetivo, como ponerle gafas de sol a tu cámara.',
    detailedExplanation: `Existen 3 filtros muy populares que los fotógrafos adoran:
• Filtro Polarizador: Funciona igual que las gafas de sol polarizadas. Elimina los reflejos blancos del agua (permitiéndote ver peces o piedras del fondo del mar) y satura el azul del cielo de forma natural.
• Filtro Degradado: Tiene la mitad superior oscura y la mitad inferior transparente. Es el truco clásico para fotos de atardeceres: frena la luz del sol brillante arriba sin oscurecer a la gente o el paisaje abajo.
• Filtro de Densidad Neutra (ND): Un cristal oscuro que te permite hacer fotos con agua en movimiento a pleno día para lograr ese "efecto seda" en cascadas sin quemar la foto.`,
    exampleScenario: 'Si estás en una playa al atardecer, un filtro polarizador te quita los reflejos del agua y un filtro degradado deja ver las nubes doradas sin que la arena quede negra.'
  },
  {
    id: 'tamano-sensor',
    category: 'Calidad de Imagen',
    term: '¿Por qué el tamaño del sensor importa más que los megapíxeles?',
    simpleAnswer: 'El sensor es la "retina" de la cámara. Cuanto más grande sea físicamente, más luz auténtica capta.',
    detailedExplanation: `Los smartphones anuncian a veces "108 o 200 megapíxeles", pero su sensor físico es diminuto (como una uña pequeña). Una cámara mirrorless tiene un sensor de 3 a 8 veces más grande.
¿En qué se nota?
1. De noche: no aparece ese grano arenoso molesto de los móviles.
2. Profundidad: las personas y objetos se separan del fondo de forma tridimensional y natural.
3. Textura real: el pelo, la ropa y las hojas de los árboles se ven con textura viva, no con el aspecto "plástico y sobreenfocado" que a veces meten los algoritmos del teléfono.`,
    exampleScenario: 'Al hacer una foto en una cena con velas, la cámara con sensor grande capta el ambiente cálido y las caras nítidas sin meter flash cegador ni ruido sucio.'
  },
  {
    id: 'bokeh-desenfoque',
    category: 'Estilo y Retrato',
    term: '¿Qué es el "Efecto Bokeh" y cómo se logra de verdad?',
    simpleAnswer: 'Es ese fondo suave y desenfocado que hace que la persona retratada resalte como en una película de cine.',
    detailedExplanation: `En los móviles, el "modo retrato" es un recorte por ordenador (que a menudo borra mechones de pelo, bordes de gafas o sombreros).
En una cámara con sensor grande y una lente luminosa, el desenfoque ocurre en las lentes de cristal de forma puramente física: el fondo se funde de manera gradual y armoniosa, sin cortes bruscos ni fallos de silueta.`,
    exampleScenario: 'Un primer plano de tu hijo sonriendo en el parque: su cara y ojos tienen nitidez cristalina, mientras los árboles y bancos del fondo se transforman en círculos de luz suaves y elegantes.'
  },
  {
    id: 'objetivo-kit-vs-fijo',
    category: 'Lentes y Objetivos',
    term: '¿Qué es un "Objetivo de Kit" y qué es un "Objetivo Fijo"?',
    simpleAnswer: 'El objetivo de kit es el todoterreno versátil con zoom para empezar; el fijo es un especialista luminoso para retratos.',
    detailedExplanation: `• Objetivo de Kit (ej. 18-45mm o 16-50mm): Es el objetivo que viene en la caja con la cámara. Tiene zoom para acercar y alejar, es muy ligero y compacto, ideal para vacaciones y fotos de día a día.
• Objetivo Fijo (ej. 50mm f/1.8): No tiene zoom (si quieres acercarte, caminas tú). Su ventaja es que tiene una apertura gigantesca que deja entrar 4 veces más luz, logrando el máximo desenfoque de fondo y fotos nocturnas perfectas por muy poco dinero (muchos rondan los 150-250 €).`,
    exampleScenario: 'Para ir de excursión te llevas el objetivo zoom de kit. Para una sesión de fotos de comunión, bautizo o retrato íntimo, montas el objetivo fijo.'
  },
  {
    id: 'enfoque-inteligente',
    category: 'Tecnología Sencilla',
    term: '¿Por qué las cámaras modernas enfocan solas a los ojos de personas y mascotas?',
    simpleAnswer: 'Tienen un procesador que reconoce rostros humanos, ojos de gatos y perros, e incluso aves o vehículos en tiempo real.',
    detailedExplanation: `Antiguamente había que seleccionar un punto en el centro, pulsar a medias y reencuadrar. Hoy en día, la cámara ve la cara en la escena, dibuja un diminuto cuadrito verde sobre el ojo de tu perro o tu hijo y lo persigue como un imán por toda la pantalla.
Tú solo tienes que preocuparte del encuadre y apretar el botón: la foto saldrá enfocada al milímetro en el 99% de las ocasiones.`,
    exampleScenario: 'Tu perro salta al aire a coger una pelota: la cámara sigue su ojo en pleno salto y congela el instante con total nitidez.'
  },
  {
    id: 'visor-vs-pantalla',
    category: 'Uso Práctico',
    term: '¿Para qué sirve el visor si ya tengo pantalla?',
    simpleAnswer: 'El visor es la mirilla ocular tradicional para pegar el ojo a la cámara. Es el salvavidas cuando hay un sol cegador en la playa o en la nieve.',
    detailedExplanation: `Bajo el sol del mediodía en verano, las pantallas de los teléfonos y las cámaras sufren reflejos y cuesta ver bien lo que estás encuadrando.
Mirar por el visor electrónico elimina toda la luz exterior: ves la foto exactamente tal y como va a salir, con colores y brillo perfectos. Además, sujetar la cámara apoyada contra la cara te da mayor estabilidad física y evita fotos movidas.`,
    exampleScenario: 'En unas vacaciones en la playa a las dos de la tarde: en la pantalla casi no ves nada por los reflejos, pero miras por el visor y ves la toma impecable.'
  }
];

export const GlossarySection: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>('filtros-rosca');

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-zinc-500 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-zinc-800" />
          <span>Traductor de fotografía para humanos</span>
        </div>
        <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
          Glosario sin Tecnicismos
        </h2>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
          Todo lo que siempre quisiste saber sobre cámaras, lentes y filtros explicado con palabras llanas y ejemplos cotidianos.
        </p>
      </div>

      <div className="space-y-4">
        {GLOSSARY_ITEMS.map((item) => {
          const isOpen = openItem === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-zinc-50/70 transition-colors"
              >
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-zinc-900">
                    {item.term}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-1">
                    {item.simpleAnswer}
                  </p>
                </div>
                <div className={`p-1.5 rounded-lg bg-zinc-100 text-zinc-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-zinc-100 bg-zinc-50/40 text-xs sm:text-sm text-zinc-700 space-y-3">
                  <div className="whitespace-pre-line leading-relaxed text-zinc-700">
                    {item.detailedExplanation}
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-zinc-200/80 text-xs text-zinc-600 leading-relaxed flex items-start gap-2">
                    <span className="font-bold text-zinc-900 shrink-0">Ejemplo práctico:</span>
                    <span>{item.exampleScenario}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
