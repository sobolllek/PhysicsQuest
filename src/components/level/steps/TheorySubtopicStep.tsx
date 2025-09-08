import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { QuestionComponent } from "../QuestionComponent"
import { TheorySubtopic, Question } from "@/types/level"
import { hapticFeedback } from "@/lib/telegram"
import { CheckCircle2, Target, BookOpen } from "lucide-react"

interface TheorySubtopicStepProps {
  subtopics: TheorySubtopic[]
  onComplete: (score: number) => void
}

export function TheorySubtopicStep({ subtopics, onComplete }: TheorySubtopicStepProps) {
  const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(0)
  const [isShowingTraining, setIsShowingTraining] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: any }>({})
  const [showResults, setShowResults] = useState(false)
  const [completedSubtopics, setCompletedSubtopics] = useState<Set<number>>(new Set())

  const currentSubtopic = subtopics[currentSubtopicIndex]
  const currentTraining = currentSubtopic.training
  const isLastSubtopic = currentSubtopicIndex === subtopics.length - 1
  const questions = currentTraining?.questions || []
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentSubtopicIndex + 1) / subtopics.length) * 100

  const handleSubtopicComplete = () => {
    // После прочтения подтопика переходим к тренировке
    setIsShowingTraining(true)
  }

  const handleTrainingComplete = () => {
    // Отмечаем подтопик как пройденный
    setCompletedSubtopics(prev => new Set([...prev, currentSubtopicIndex]))
    
    if (isLastSubtopic) {
      // Если это последний подтопик, завершаем всю теорию
      onComplete(100)
    } else {
      // Переходим к следующему подтопику
      setCurrentSubtopicIndex(currentSubtopicIndex + 1)
      setIsShowingTraining(false)
      setCurrentQuestionIndex(0)
      setUserAnswers({})
      setShowResults(false)
    }
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
    const passed = score >= (currentTraining?.passScore || 80)
    
    if (passed) {
      hapticFeedback('notification')
      handleTrainingComplete()
    }
  }

  if (isShowingTraining) {
    if (showResults) {
      const score = calculateScore()
      const passed = score >= (currentTraining?.passScore || 80)
      
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
                Тренировка завершена
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-success/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-success">
                    {Math.round(questions.length * score / 100)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Правильных ответов
                  </div>
                </div>
                <div className="bg-destructive/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-destructive">
                    {questions.length - Math.round(questions.length * score / 100)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Допущено ошибок
                  </div>
                </div>
              </div>
              
              <div className={`text-lg font-semibold ${passed ? 'text-success' : 'text-destructive'}`}>
                {passed ? 'Тренировка пройдена!' : `Нужно минимум ${currentTraining?.passScore || 80}%`}
              </div>
              
              {!passed && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowResults(false)
                    setCurrentQuestionIndex(0)
                    setUserAnswers({})
                  }}
                  className="w-full"
                >
                  Ещё раз?
                </Button>
              )}
            </CardContent>
          </Card>

          {passed ? (
            <Button onClick={handleFinish} size="lg" className="w-full">
              {isLastSubtopic ? 'Завершить теорию' : 'К следующему параграфу'}
            </Button>
          ) : (
            <Button onClick={handleFinish} size="lg" className="w-full" disabled>
              Нужно набрать минимум {currentTraining?.passScore || 80}%
            </Button>
          )}
        </div>
      )
    }

    const questionProgress = ((currentQuestionIndex + 1) / questions.length) * 100

    return (
      <div className="space-y-6 pt-4">
        {/* Training Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Тренировка</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {currentSubtopic.title}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2 flex flex-col items-center">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Вопрос {currentQuestionIndex + 1} из {questions.length}</span>
          </div>
          <Progress value={questionProgress} className="h-2 w-1/2" />
        </div>

        <div className="mx-auto max-w-2xl px-4">
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

  return (
    <div className="space-y-6 relative">
      {/* Progress indicator */}
      <div className="fixed top-24 left-6 right-6 z-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">
            {currentSubtopicIndex + 1} из {subtopics.length}
          </span>
        </div>
        <Progress value={progress} className="h-2 w-32" />
      </div>

      <div className="relative pt-12">
        <div 
          className="prose prose-sm max-w-none text-foreground mt-2 px-4 pb-20"
          dangerouslySetInnerHTML={{ 
            __html: currentSubtopic.content?.replace(/\n/g, '<br/>') || '' 
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

      {/* Кнопка продолжить */}
      <div className="fixed bottom-5 left-0 right-0 flex justify-center" style={{ zIndex: 20 }}>
        <Button 
          onClick={handleSubtopicComplete}
          size="lg"
          className="min-w-[150px] bg-gray-500 hover:bg-gray-600 text-white"
        >
          К тренировке
        </Button>
      </div>
    </div>
  )
}