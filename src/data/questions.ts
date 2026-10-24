import { 
  ExperienceLevel, 
  PhotoGenre, 
  LightingCondition, 
  BodyTypePreference, 
  FilterNeed, 
  MobileTransferImportance 
} from '../types/camera';

export interface QuizOption<T> {
  id: T;
  title: string;
  subtitle: string;
  badge?: string;
  iconName?: string;
}

export interface QuizQuestionDef<T> {
  stepIndex: number;
  id: string;
  title: string;
  question: string;
  friendlyExplanation: string;
  options: QuizOption<T>[];
  isMultiSelect?: boolean;
}

export const BUDGET_TIERS = [
  { id: 'budget', label: 'Económico (Hasta 650 €)', max: 650, desc: 'Ideal para empezar con calidad real sin un gran desembolso' },
  { id: 'mid', label: 'Equilibrado (650 € - 1.100 €)', max: 1100, desc: 'La mejor relación calidad-precio para la gran mayoría' },
  { id: 'enthusiast', label: 'Avanzado (1.100 € - 1.700 €)', max: 1700, desc: 'Enfoque de inteligencia artificial y máxima nitidez' },
  { id: 'pro', label: 'Sin límite (+ 1.700 €)', max: 3000, desc: 'Rendimiento supremo y sensores profesionales' }
];

export const EXPERIENCE_OPTIONS: QuizOption<ExperienceLevel>[] = [
  {
    id: 'beginner_mobile',
    title: 'Vengo del móvil (Cero experiencia previa)',
    subtitle: 'Quiero encender la cámara, apuntar y que la foto salga nítida y bonita sin tener que estudiar manuales ni entender fórmulas técnicas.',
    badge: 'La más elegida',
    iconName: 'Smartphone'
  },
  {
    id: 'curious_learner',
    title: 'Principiante con ganas de aprender a mi ritmo',
    subtitle: 'Quiero que la cámara me lo ponga fácil al principio con modos automáticos y guías visuales, pero que me permita experimentar si me apetece.',
    iconName: 'GraduationCap'
  },
  {
    id: 'enthusiast',
    title: 'Aficionado con base o conocimientos previos',
    subtitle: 'Ya conozco conceptos como apertura, velocidad o ISO y busco una herramienta con buenos controles físicos y versatilidad.',
    iconName: 'Sliders'
  }
];

export const GENRE_OPTIONS: QuizOption<PhotoGenre>[] = [
  {
    id: 'travel_street',
    title: 'Viajes, paseos y fotografía urbana',
    subtitle: 'Que no dé pereza sacarla de la mochila, ligera y cómoda para caminar horas enteras.',
    iconName: 'Compass'
  },
  {
    id: 'portraits_bokeh',
    title: 'Retratos de personas y familias',
    subtitle: 'El codiciado fondo desenfocado (bokeh suave) que hace destacar a la persona con aspecto de cine.',
    iconName: 'User'
  },
  {
    id: 'landscapes_nature',
    title: 'Paisajes, montaña y naturaleza',
    subtitle: 'Gran definición de esquina a esquina, colores vivos y cielos con detalle.',
    iconName: 'Mountain'
  },
  {
    id: 'fast_action_animals',
    title: 'Mascotas, niños en movimiento o deportes',
    subtitle: 'Velocidad de enfoque instantánea para congelar el movimiento sin que la toma quede borrosa.',
    iconName: 'Zap'
  },
  {
    id: 'vlog_video',
    title: 'Vídeos, vlogs y redes sociales',
    subtitle: 'Pantalla que gira para poder verte de frente, buen sonido y enfoque que no pierde tu cara.',
    iconName: 'Video'
  }
];

export const LIGHTING_OPTIONS: QuizOption<LightingCondition>[] = [
  {
    id: 'mostly_daylight',
    title: 'Mayoría de fotos de día y en exteriores',
    subtitle: 'Viajes de día, excursiones, parques, reuniones familiares al aire libre o interiores con sol.',
    iconName: 'Sun'
  },
  {
    id: 'mixed_lighting',
    title: 'Variado: tanto de día como de tarde o interiores',
    subtitle: 'Uso general en cualquier momento, cenas familiares, paseos al atardecer y luz habitual.',
    iconName: 'SunMedium'
  },
  {
    id: 'low_light_night',
    title: 'Noches, conciertos o interiores con poca luz',
    subtitle: 'Quiero tomas nocturnas limpias sin grano desagradable y sin que salgan movidas por falta de luz.',
    iconName: 'Moon'
  }
];

export const BODY_TYPE_OPTIONS: QuizOption<BodyTypePreference>[] = [
  {
    id: 'interchangeable',
    title: 'Con objetivos intercambiables (Lentes que se quitan y ponen)',
    subtitle: 'Quiero poder ponerle hoy una lente versátil y en el futuro añadir un teleobjetivo o una lente para retratos.',
    badge: 'Mayor versatilidad',
    iconName: 'Layers'
  },
  {
    id: 'compact_pocket',
    title: 'De bolsillo o fija (Cero cambios de lente)',
    subtitle: 'Quiero un solo aparato que quepa en un bolsillo o bolso pequeño. Cero mochilas y cero miedo a que entre polvo al sensor.',
    badge: 'Máxima ligereza',
    iconName: 'Minimize2'
  },
  {
    id: 'indifferent',
    title: 'Me da igual el tipo, priorizo comodidad y calidad',
    subtitle: 'Recomiéndame lo que mejor se adapte a mi presupuesto y estilo sin complicarme.',
    iconName: 'Sparkles'
  }
];

export const FILTER_OPTIONS: QuizOption<FilterNeed>[] = [
  {
    id: 'no_built_in',
    title: 'No, prefiero los colores y efectos que da la cámara sola',
    subtitle: 'No quiero comprar ni llevar accesorios extras en la mochila. Con los filtros y modos creativos automáticos de la cámara tengo de sobra.',
    iconName: 'Wand2'
  },
  {
    id: 'yes_important',
    title: 'Sí, me llama la atención usar filtros físicos enroscados',
    subtitle: 'Me interesa poder enroscar un filtro polarizador (para quitar brillos del mar o cristales) o filtros degradados para que los cielos al atardecer no salgan quemados.',
    badge: 'Creatividad clásica',
    iconName: 'CircleDot'
  },
  {
    id: 'curious_later',
    title: 'No lo sé aún / Prefiero que tenga la opción si me animo luego',
    subtitle: 'De momento no los compraré, pero que la cámara admita la rosca estándar por si el día de mañana me apetece.',
    iconName: 'HelpCircle'
  }
];

export const MOBILE_TRANSFER_OPTIONS: QuizOption<MobileTransferImportance>[] = [
  {
    id: 'vital_instant',
    title: 'Esencial: pasar fotos al móvil en menos de 1 minuto',
    subtitle: 'Quiero enviar la foto por WhatsApp a la familia o subirla a Instagram al instante mediante conexión inalámbrica Bluetooth o Wi-Fi.',
    badge: 'Muy recomendado',
    iconName: 'Wifi'
  },
  {
    id: 'standard',
    title: 'Normal: no tengo prisa en pasarlas de inmediato',
    subtitle: 'Puedo pasar las fotos tranquilamente por la noche con un cable, en el ordenador o con un lector de tarjetas.',
    iconName: 'HardDrive'
  }
];
