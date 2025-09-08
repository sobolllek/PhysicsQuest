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

const FlaskProgress = ({ progress }: { progress: number }) => {
  const fillHeight = (progress / 100) * 580
  const yPos = 580 - fillHeight
  const textY = 560 // can be adjusted
  const textColor = yPos < textY ? "text-white" : "text-green-600"

  return (
    <div className="relative w-8 h-12">
      <svg
        viewBox="0 0 507 580"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Маска по форме колбы */}
          <clipPath id="flask-clip">
            <path d="M494.094 445.078L344.527 241.984V60.1406H346.101C362.63 60.1406 376.016 46.7556 376.016 30.2265C376.016 13.6984 362.631 0.3125 346.101 0.3125H161.117C144.589 0.3125 131.203 13.6975 131.203 30.2265C131.203 46.7547 144.588 60.1406 161.117 60.1406H162.692V241.984L13.1246 445.078C-21.5129 504.905 21.7855 579.691 91.0605 579.691H416.17C485.432 579.691 528.731 504.905 494.094 445.078Z" />
          </clipPath>
        </defs>

        {/* Контур колбы */}
        <path
          d="M494.094 445.078L344.527 241.984V60.1406H346.101C362.63 60.1406 376.016 46.7556 376.016 30.2265C376.016 13.6984 362.631 0.3125 346.101 0.3125H161.117C144.589 0.3125 131.203 13.6975 131.203 30.2265C131.203 46.7547 144.588 60.1406 161.117 60.1406H162.692V241.984L13.1246 445.078C-21.5129 504.905 21.7855 579.691 91.0605 579.691H416.17C485.432 579.691 528.731 504.905 494.094 445.078Z"
          fill="#d7dfe5ff"
        />

        {/* Жидкость с волнами */}
        <g clipPath="url(#flask-clip)">
          {/* Нижняя заливка */}
          <rect
            x="0"
            y={yPos}
            width="507"
            height={fillHeight}
            fill="#22c55e"
            style={{
              transition: "y 0.6s ease, height 0.6s ease",
            }}
          />
        </g>
      </svg>

      {/* Процентик поверх */}
      <span className={`absolute inset-0 flex items-end justify-center mb-2 text-[9px] font-bold ${textColor}`}>
  {Math.round(progress)}%
</span>
    </div>
  )
}

export function LevelScreen({ levelData, onBack, onComplete }: LevelScreenProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [stepScores, setStepScores] = useState<{ [stepId: string]: number }>({})
  const [levelProgress, setLevelProgress] = useState<LevelProgress>({
    levelId: levelData.id,
    currentStep: 0,
    stepScores: {},
    subtopicsProgress: {},
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
            onComplete={(score) => handleStepComplete(currentStep.id, score)}
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
    <div className="h-full bg-white overflow-y-auto pt-24">
      {/* Header */}
      <div className="fixed top-24 left-6 right-6 z-20 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">
          {levelData.title}
        </h1>
        <FlaskProgress progress={progress} />
      </div>

      {/* Step content */}
      <div className="pt-20">
        {renderStep()}
      </div>
    </div>
  )
}