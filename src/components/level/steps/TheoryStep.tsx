import { Button } from "@/components/ui/button"
import { LevelStep } from "@/types/level"
import { TheorySubtopicStep } from "./TheorySubtopicStep"
import { hapticFeedback } from "@/lib/telegram"

interface TheoryStepProps {
  step: LevelStep
  onComplete: (score: number) => void
}

export function TheoryStep({ step, onComplete }: TheoryStepProps) {
  // Если есть подтемы, используем новый компонент
  if (step.subtopics && step.subtopics.length > 0) {
    return (
      <TheorySubtopicStep
        subtopics={step.subtopics}
        training={step.training}
        onComplete={onComplete}
      />
    )
  }

  const handleContinue = () => {
    hapticFeedback('selection')
    onComplete(100)
  }

  return (
    <div className="space-y-6 relative">
      <div className="relative">
        <div 
          className="prose prose-sm max-w-none text-foreground mt-2 px-4 pb-20"
          dangerouslySetInnerHTML={{ 
            __html: step.content?.replace(/\n/g, '<br/>') || '' 
          }}
        />

        {/* Верхний фиксированный градиент */}
        <div 
          className="fixed top-0 left-0 right-0 h-[170px] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 130px, rgba(255, 255, 255, 0) 200px)',
            zIndex: 10,
          }}
        />

        {/* Нижний фиксированный градиент */}
        <div 
          className="fixed bottom-0 left-0 right-0 h-[170px] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 10px, rgba(255, 255, 255, 0) 130px)',
            zIndex: 10,
          }}
        />
      </div>

      {/* Кнопка "Продолжить" всегда активна */}
      <div className="fixed bottom-5 left-0 right-0 flex justify-center" style={{ zIndex: 20 }}>
        <Button 
          onClick={handleContinue}
          size="lg"
          className="min-w-[150px] bg-gray-500 hover:bg-gray-600 text-white"
        >
          Продолжить к тренировке
        </Button>
      </div>
    </div>
  )
}