import { useState, useEffect } from "react"
import { ArrowLeft, Clock, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TheoryStep } from "./steps/TheoryStep"
import { PracticeStep } from "./steps/PracticeStep"
import { ValidationStep } from "./steps/ValidationStep"
import { ControlTestStep } from "./steps/ControlTestStep"
import { LevelData, LevelStep, LevelProgress } from "@/types/level"
import { toast } from "@/hooks/use-toast"
import { hapticFeedback, showBackButton, hideBackButton } from "@/lib/telegram"

interface LevelScreenProps {
  levelData: LevelData
  onBack: () => void
  onComplete: (score: number) => void
}

export function LevelScreen({ levelData, onBack, onComplete }: LevelScreenProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [stepScores, setStepScores] = useState<{ [stepId: string]: number }>({})
  const [levelProgress, setLevelProgress] = useState<LevelProgress>({
    levelId: levelData.id,
    currentStep: 0,
    stepScores: {},
    completed: false,
    attempts: 0
  })

  const currentStep = levelData.steps[currentStepIndex]
  const progress = ((currentStepIndex + 1) / levelData.steps.length) * 100

  useEffect(() => {
    showBackButton(onBack)
    return () => hideBackButton()
  }, [onBack])

  const handleStepComplete = (stepId: string, score: number) => {
    hapticFeedback('notification')
    
    const newStepScores = { ...stepScores, [stepId]: score }
    setStepScores(newStepScores)

    // Логика валидации
    if (currentStep.type === 'practice') {
      if (score < (currentStep.passScore || 80)) {
        toast({
          title: "Практика не пройдена",
          description: `Результат ${score}%. Нужно минимум ${currentStep.passScore || 80}%. Повторите теорию.`,
          variant: "destructive"
        })
        setCurrentStepIndex(0) // Возврат к теории
        return
      }
    }

    if (currentStep.type === 'control-test') {
      if (score < (currentStep.passScore || 70)) {
        toast({
          title: "Контрольный тест не пройден",
          description: `Результат ${score}%. Нужно минимум ${currentStep.passScore || 70}%. Повторите материал.`,
          variant: "destructive"
        })
        setCurrentStepIndex(0) // Возврат к теории
        return
      } else {
        // Уровень пройден
        toast({
          title: "Уровень пройден!",
          description: `Отличный результат: ${score}%!`,
        })
        onComplete(score)
        return
      }
    }

    // Переход к следующему шагу
    if (currentStepIndex < levelData.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const renderStep = () => {
    switch (currentStep.type) {
      case 'theory':
        return (
          <TheoryStep 
            step={currentStep} 
            onComplete={() => handleStepComplete(currentStep.id, 100)}
          />
        )
      case 'practice':
        return (
          <PracticeStep 
            step={currentStep} 
            onComplete={(score) => handleStepComplete(currentStep.id, score)}
          />
        )
      case 'validation':
        return (
          <ValidationStep 
            practiceScore={stepScores['practice'] || 0}
            onContinue={() => handleStepComplete(currentStep.id, 100)}
            onRetry={() => setCurrentStepIndex(0)}
          />
        )
      case 'control-test':
        return (
          <ControlTestStep 
            step={currentStep} 
            onComplete={(score) => handleStepComplete(currentStep.id, score)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-space">
      {/* Header */}
      <div className="sticky top-0 bg-card/80 backdrop-blur-lg border-b border-border z-50">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          
          <div className="text-center">
            <h1 className="font-bold text-foreground">{levelData.title}</h1>
            <p className="text-sm text-muted-foreground">{currentStep.title}</p>
          </div>

          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Шаг {currentStepIndex + 1} из {levelData.steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="p-4">
        {renderStep()}
      </div>
    </div>
  )
}