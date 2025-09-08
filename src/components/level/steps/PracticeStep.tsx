import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { QuestionComponent } from "../QuestionComponent"
import { Question, LevelStep } from "@/types/level"
import { hapticFeedback } from "@/lib/telegram"
import { CheckCircle2, Target } from "lucide-react"

interface PracticeStepProps {
  step: LevelStep
  onComplete: (score: number) => void
}

export function PracticeStep({ step, onComplete }: PracticeStepProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: any }>({})
  const [showResults, setShowResults] = useState(false)

  const questions = step.questions || []
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswer = (questionId: string, answer: any) => {
    hapticFeedback('selection')
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Показать результаты
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach(question => {
      const userAnswer = userAnswers[question.id]
      if (question.type === 'multiple-choice') {
        const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer]
        const isCorrect = Array.isArray(userAnswer) && 
          userAnswer.length === correctAnswers.length &&
          userAnswer.every(answer => correctAnswers.includes(answer))
        if (isCorrect) correct++
      } else {
        if (userAnswer === question.correctAnswer) correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const handleFinish = () => {
    const score = calculateScore()
    hapticFeedback('notification')
    onComplete(score)
  }

  if (showResults) {
    const score = calculateScore()
    const passed = score >= (step.passScore || 80)
    
    return (
      <div className="space-y-6">
        <Card className={`border-2 ${passed ? 'border-success' : 'border-destructive'}`}>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              {passed ? (
                <CheckCircle2 className="w-6 h-6 text-success" />
              ) : (
                <Target className="w-6 h-6 text-destructive" />
              )}
              Результаты практики
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl font-bold text-foreground">
              {score}%
            </div>
            <div className="text-muted-foreground">
              Правильных ответов: {Math.round(questions.length * score / 100)} из {questions.length}
            </div>
            <div className={`text-lg font-semibold ${passed ? 'text-success' : 'text-destructive'}`}>
              {passed ? 'Практика пройдена!' : `Нужно минимум ${step.passScore || 80}%`}
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleFinish} size="lg" className="w-full">
          Продолжить
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Progress */}
      <div className="space-y-2 flex flex-col items-center">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Вопрос {currentQuestionIndex + 1} из {questions.length}</span>
        </div>
        <Progress value={progress} className="h-2 w-1/2" />
      </div>

      <div className="mx-auto max-w-2xl px-4"> {/* Центрирование + отступы */}
  <QuestionComponent
    question={currentQuestion}
    userAnswer={userAnswers[currentQuestion.id]}
    onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
    showExplanation={false}
  />
</div>

      {/* Navigation */}
      <div className="flex flex-col items-center pt-4">
        <Button 
          onClick={handleNext}
          disabled={!userAnswers[currentQuestion.id]}
          size="lg"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Следующий' : 'Завершить'}
        </Button>
      </div>
    </div>
  )
}