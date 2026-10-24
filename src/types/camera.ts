export type ExperienceLevel = 'beginner_mobile' | 'curious_learner' | 'enthusiast';

export type PhotoGenre = 
  | 'travel_street'
  | 'portraits_bokeh'
  | 'landscapes_nature'
  | 'fast_action_animals'
  | 'vlog_video';

export type LightingCondition = 
  | 'mostly_daylight'
  | 'mixed_lighting'
  | 'low_light_night';

export type BodyTypePreference = 
  | 'interchangeable' // Quiere cambiar lentes
  | 'compact_pocket'   // Objetivo fijo que quepa en un bolsillo
  | 'indifferent';     // Lo que mejor calidad dé

export type FilterNeed = 
  | 'yes_important'    // Interesa enroscar filtros físicos (degradados, polarizadores)
  | 'no_built_in'      // Prefiere filtros de software o nada de accesorios
  | 'curious_later';   // Quizá en el futuro

export type MobileTransferImportance = 
  | 'vital_instant'    // Quiere mandar fotos a WhatsApp/Instagram en 30s
  | 'standard';        // No le importa usar cable u ordenador

export interface UserQuizAnswers {
  budget: number; // en euros, ej: 400 a 2500
  budgetTier?: 'budget' | 'mid' | 'enthusiast' | 'pro';
  experience: ExperienceLevel;
  primaryGenres: PhotoGenre[];
  lighting: LightingCondition;
  bodyType: BodyTypePreference;
  filterNeed: FilterNeed;
  mobileTransfer: MobileTransferImportance;
}

export interface CameraModel {
  id: string;
  name: string;
  brand: 'Canon' | 'Sony' | 'Fujifilm' | 'Nikon' | 'Panasonic' | 'Ricoh' | 'OM System';
  price: number; // Precio orientativo con objetivo de kit en euros
  type: 'mirrorless' | 'compact_premium';
  typeLabel: string; // ej: "Cámara sin espejo (Lentes intercambiables)"
  sensorName: string; // ej: "Sensor APS-C grande"
  sensorExplanation: string; // ej: "Capta 3 veces más luz que el mejor móvil"
  weightGrams: number;
  weightLabel: string; // ej: "375 g (Muy ligera para llevar al cuello todo el día)"
  megapixels: number;
  hasViewfinder: boolean; // Si tiene visor ocular para mirar cuando hay mucho sol
  hasArticulatedScreen: boolean; // Pantalla que gira para verse a uno mismo o tomas desde el suelo
  
  // Ratings de 1 a 5 para el público principiante
  easeOfUseRating: number; // 5 = Menús guiados sencillísimos
  lowLightRating: number;  // 5 = Fotos nítidas casi a oscuras sin grano
  actionSpeedRating: number; // 5 = Clava el foco en ojos de perros o niños corriendo
  mobileTransferRating: number; // 5 = App móvil estable y rápida
  
  supportsPhysicalFilters: boolean;
  filterDetails: string; // ej: "Admite filtros de rosca universales estándar (49mm / 52mm)"
  
  recommendedKit: string; // ej: "Cuerpo + Objetivo zoom 18-45mm"
  headline: string; // Frase corta para novatos
  idealForWho: string; // Descripción en lenguaje humano
  pros: string[];
  goodToKnow: string[]; // Cosas a tener en cuenta con honestidad
  
  imageUrl: string;
  tagline: string;
}

export interface RecommendationMatch {
  camera: CameraModel;
  matchScore: number; // 0 - 100%
  highlightReasons: string[];
  whyFitsUser: string;
  role: 'best_match' | 'budget_saver' | 'premium_upgrade';
}
