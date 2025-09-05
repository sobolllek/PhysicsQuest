import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { QuestionComponent } from "../QuestionComponent"
import { Question, LevelStep } from "@/types/level"
import { hapticFeedback } from "@/lib/telegram"
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react"

interface ControlTestStepProps {
  step: LevelStep
  onComplete: (score: number) => void
}

export function ControlTestStep({ step, onComplete }: ControlTestStepProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: any }>({})
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(step.timeLimit || 300) // 5 минут по умолчанию

  const questions = step.questions || []
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  // Таймер
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setShowResults(true)
    }
  }, [timeLeft, showResults])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (questionId: string, answer: any) => {
    hapticFeedback('selection')
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
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
    const passed = score >= (step.passScore || 70)
    
    return (
      <div className="space-y-6">
        <Card className={`border-2 ${passed ? 'border-success' : 'border-destructive'}`}>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              {passed ? (
                <CheckCircle2 className="w-6 h-6 text-success" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-destructive" />
              )}
              Результаты контрольного теста
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
              {passed ? 'Уровень пройден!' : `Нужно минимум ${step.passScore || 70}%`}
            </div>
            {timeLeft === 0 && (
              <p className="text-destructive text-sm">Время истекло</p>
            )}
          </CardContent>
        </Card>

        <Button onClick={handleFinish} size="lg" className="w-full">
          {passed ? 'Завершить уровень' : 'Повторить материал'}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Timer and Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Вопрос {currentQuestionIndex + 1} из {questions.length}</span>
          </div>
          <div className={`font-mono text-lg font-bold ${timeLeft < 60 ? 'text-destructive' : 'text-foreground'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Warning about control test */}
      <Card className="border-accent">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-accent-foreground">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">Контрольный тест</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Подсказки недоступны. Время ограничено.
          </p>
        </CardContent>
      </Card>

      {/* Question */}
      <QuestionComponent
        question={currentQuestion}
        userAnswer={userAnswers[currentQuestion.id]}
        onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
        showExplanation={false}
        isControlTest={true}
      />

      {/* Navigation */}
      <div className="flex justify-end pt-4">
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