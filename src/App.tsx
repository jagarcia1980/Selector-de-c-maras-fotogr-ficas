import React, { useState, useMemo } from 'react';
import { UserQuizAnswers, CameraModel } from './types/camera';
import { Header } from './components/Header';
import { QuizStep } from './components/QuizStep';
import { RecommendationView } from './components/RecommendationView';
import { CompareModal } from './components/CompareModal';
import { GlossarySection } from './components/GlossarySection';
import { CatalogSection } from './components/CatalogSection';
import { VisualShowcase } from './components/VisualShowcase';
import { calculateCameraRecommendations } from './utils/recommender';
import { CAMERA_DATABASE } from './data/cameras';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

const INITIAL_ANSWERS: UserQuizAnswers = {
  budget: 850,
  experience: 'beginner_mobile',
  primaryGenres: ['travel_street', 'portraits_bokeh'],
  lighting: 'mixed_lighting',
  bodyType: 'indifferent',
  filterNeed: 'no_built_in',
  mobileTransfer: 'vital_instant'
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<'quiz' | 'catalog' | 'glossary'>('quiz');
  const [quizStep, setQuizStep] = useState<number>(1);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<UserQuizAnswers>(INITIAL_ANSWERS);
  const [comparePair, setComparePair] = useState<{ cameraA: CameraModel; cameraB: CameraModel } | null>(null);

  const totalSteps = 7;

  // Real-time calculated recommendations
  const recommendations = useMemo(() => {
    return calculateCameraRecommendations(answers);
  }, [answers]);

  const handleUpdateAnswers = (updated: Partial<UserQuizAnswers>) => {
    setAnswers(prev => ({ ...prev, ...updated }));
  };

  const handleNextStep = () => {
    if (quizStep < totalSteps) {
      setQuizStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      setIsQuizCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (quizStep > 1) {
      setQuizStep(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleRestartQuiz = () => {
    setQuizStep(1);
    setIsQuizCompleted(false);
    setCurrentTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCompare = (cameraA: CameraModel, cameraB: CameraModel) => {
    setComparePair({ cameraA, cameraB });
  };

  const handleCloseCompare = () => {
    setComparePair(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 flex flex-col font-sans">
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onRestartQuiz={handleRestartQuiz}
        isQuizCompleted={isQuizCompleted}
      />

      <main className="flex-1">
        {currentTab === 'quiz' && (
          <>
            {!isQuizCompleted ? (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-16">
                {/* Hero Introduction for Questionnaire */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 mb-3 bg-zinc-100 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-800" />
                    <span>Test interactivo sin tecnicismos</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                    Encuentra tu cámara ideal según tus necesidades
                  </h1>
                  <p className="mt-4 text-base text-zinc-600 leading-relaxed">
                    Responde a 7 preguntas sencillas sobre tu presupuesto, las fotos que quieres hacer y tu estilo. Sin palabras raras ni complicaciones.
                  </p>
                </div>

                {/* Step Quiz Component */}
                <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
                  <QuizStep
                    currentStep={quizStep}
                    totalSteps={totalSteps}
                    answers={answers}
                    onUpdateAnswers={handleUpdateAnswers}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                  />
                </div>

                {/* Visual photo showcase below quiz */}
                <VisualShowcase />
              </div>
            ) : (
              <div>
                <RecommendationView
                  recommendations={recommendations}
                  answers={answers}
                  onUpdateAnswers={handleUpdateAnswers}
                  onRestartQuiz={handleRestartQuiz}
                  onOpenCompare={handleOpenCompare}
                  onViewCatalog={() => {
                    setCurrentTab('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                  <VisualShowcase />
                </div>
              </div>
            )}
          </>
        )}

        {currentTab === 'catalog' && (
          <CatalogSection
            onOpenCompare={handleOpenCompare}
            onSelectForQuiz={(cam) => {
              handleUpdateAnswers({ budget: cam.price + 100 });
              setIsQuizCompleted(true);
              setCurrentTab('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'glossary' && (
          <GlossarySection />
        )}
      </main>

      {/* Compare Modal */}
      {comparePair && (
        <CompareModal
          cameraA={comparePair.cameraA}
          cameraB={comparePair.cameraB}
          onClose={handleCloseCompare}
        />
      )}

      {/* Footer conforming to design constitution */}
      <footer className="border-t border-zinc-200 bg-white py-10 mt-auto text-xs text-zinc-500">
      </footer>
    </div>
  );
}
