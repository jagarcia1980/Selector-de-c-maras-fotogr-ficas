import { CAMERA_DATABASE } from '../data/cameras';
import { CameraModel, RecommendationMatch, UserQuizAnswers } from '../types/camera';

export function calculateCameraRecommendations(answers: UserQuizAnswers): RecommendationMatch[] {
  const scoredCameras = CAMERA_DATABASE.map(camera => {
    let score = 50; // base score
    const highlights: string[] = [];

    // 1. PRESUPUESTO
    const budgetDiff = answers.budget - camera.price;
    if (budgetDiff >= 0) {
      // Dentro del presupuesto
      if (budgetDiff <= 250) {
        score += 25; // aprovecha bien el presupuesto
        highlights.push(`Aprovecha de forma óptima tu presupuesto (~${camera.price} € con objetivo incluido).`);
      } else {
        score += 20;
        highlights.push(`Ahorro notable: cuesta ${camera.price} €, por debajo de tu tope.`);
      }
    } else {
      // Por encima del presupuesto
      const overBy = Math.abs(budgetDiff);
      if (overBy <= 150) {
        score -= 8;
        highlights.push(`Supera ligeramente tu presupuesto por ${overBy} €, pero la diferencia de calidad merece la pena considerar.`);
      } else if (overBy <= 400) {
        score -= 22;
      } else {
        score -= 40;
      }
    }

    // 2. NIVEL DE EXPERIENCIA
    if (answers.experience === 'beginner_mobile') {
      if (camera.easeOfUseRating >= 5) {
        score += 20;
        highlights.push('Diseñada para quien viene del móvil: menús con ayudas visuales que te guían paso a paso.');
      } else if (camera.easeOfUseRating === 4) {
        score += 12;
      } else if (camera.easeOfUseRating <= 3) {
        score -= 10;
      }
    } else if (answers.experience === 'curious_learner') {
      if (camera.easeOfUseRating >= 4) {
        score += 15;
        highlights.push('Ofrece modo automático impecable pero también diales para aprender manual a tu ritmo.');
      }
    } else if (answers.experience === 'enthusiast') {
      if (camera.brand === 'Fujifilm' || camera.id === 'sony-a6700' || camera.id === 'sony-a7-iv') {
        score += 18;
        highlights.push('Controles físicos directos y opciones avanzadas que satisfacen a cualquier aficionado exigente.');
      }
    }

    // 3. GÉNEROS FOTOGRÁFICOS PREFERIDOS
    if (answers.primaryGenres.includes('travel_street')) {
      if (camera.weightGrams <= 400) {
        score += 16;
        highlights.push(`Extremadamente ligera (${camera.weightGrams} g), ideal para caminar todo el día en viajes.`);
      }
    }

    if (answers.primaryGenres.includes('fast_action_animals')) {
      if (camera.actionSpeedRating >= 5) {
        score += 22;
        highlights.push('Enfoque instantáneo que detecta ojos de animales y niños en plena carrera sin fotos borrosas.');
      } else if (camera.actionSpeedRating <= 3) {
        score -= 15;
      }
    }

    if (answers.primaryGenres.includes('portraits_bokeh')) {
      if (camera.sensorName.includes('APS-C') || camera.sensorName.includes('Full Frame')) {
        score += 18;
        highlights.push('Sensor de gran tamaño que genera ese desenfoque suave (bokeh) natural detrás de las personas.');
      }
    }

    if (answers.primaryGenres.includes('landscapes_nature')) {
      if (camera.id === 'om-system-om5' || camera.id === 'sony-a6700' || camera.brand === 'Fujifilm' || camera.brand === 'Nikon') {
        score += 15;
        highlights.push('Gran fidelidad de tonos verdes y cielos, con excelente nitidez en detalles de naturaleza.');
      }
    }

    if (answers.primaryGenres.includes('vlog_video')) {
      if (camera.hasArticulatedScreen) {
        score += 14;
        highlights.push('Pantalla abatible 100% que gira hacia ti para grabarte y ver el encuadre fácilmente.');
      }
    }

    // 4. CONDICIONES DE LUZ
    if (answers.lighting === 'low_light_night') {
      if (camera.lowLightRating >= 5) {
        score += 22;
        highlights.push('Rendimiento nocturno superior: fotos limpias con poca luz y estabilizador que evita trepidaciones.');
      } else if (camera.lowLightRating >= 4) {
        score += 12;
      } else {
        score -= 15;
      }
    }

    // 5. TIPO DE CUERPO
    if (answers.bodyType === 'compact_pocket') {
      if (camera.type === 'compact_premium') {
        score += 30;
        highlights.push('Cuerpo de bolsillo auténtico: todo en uno sin tener que cargar con mochilas ni comprar lentes.');
      } else if (camera.weightGrams <= 380) {
        score += 8;
      } else {
        score -= 18;
      }
    } else if (answers.bodyType === 'interchangeable') {
      if (camera.type === 'mirrorless') {
        score += 18;
        highlights.push('Lentes intercambiables: puedes cambiar de objetivo según el viaje o la sesión fotográfica.');
      } else {
        score -= 25;
      }
    }

    // 6. FILTROS FÍSICOS
    if (answers.filterNeed === 'yes_important') {
      if (camera.supportsPhysicalFilters) {
        score += 16;
        highlights.push('Admite filtros de rosca estándar (degradados para atardeceres y polarizadores para agua).');
      } else {
        score -= 22;
      }
    }

    // 7. TRANSFERENCIA AL MÓVIL
    if (answers.mobileTransfer === 'vital_instant') {
      if (camera.mobileTransferRating >= 5) {
        score += 14;
        highlights.push('App móvil moderna y fiable: pasa tus mejores capturas al smartphone en cuestión de segundos.');
      }
    }

    // Normalizar score entre 45 y 99%
    const normalizedScore = Math.min(99, Math.max(45, Math.round(score)));

    const result: RecommendationMatch = {
      camera,
      matchScore: normalizedScore,
      highlightReasons: highlights.slice(0, 4),
      whyFitsUser: highlights[0] || 'Excelente equilibrio para tus necesidades fotográficas.',
      role: 'best_match'
    };
    return result;
  });

  // Ordenar por afinidad
  scoredCameras.sort((a, b) => b.matchScore - a.matchScore);

  const bestMatch = scoredCameras[0];
  bestMatch.role = 'best_match';

  // Buscar opción de ahorro (cámara por debajo de precio del bestMatch con buena puntuación)
  let budgetSaver = scoredCameras.find(
    c => c.camera.id !== bestMatch.camera.id && c.camera.price < bestMatch.camera.price - 120
  );
  if (!budgetSaver && scoredCameras.length > 1) {
    budgetSaver = scoredCameras[1];
  }
  if (budgetSaver) {
    budgetSaver.role = 'budget_saver';
  }

  // Buscar opción superior / premium
  let premiumUpgrade = scoredCameras.find(
    c => c.camera.id !== bestMatch.camera.id && 
         c.camera.id !== budgetSaver?.camera.id && 
         c.camera.price > bestMatch.camera.price
  );
  if (!premiumUpgrade && scoredCameras.length > 2) {
    premiumUpgrade = scoredCameras.find(
      c => c.camera.id !== bestMatch.camera.id && c.camera.id !== budgetSaver?.camera.id
    );
  }
  if (premiumUpgrade) {
    premiumUpgrade.role = 'premium_upgrade';
  }

  return scoredCameras;
}
