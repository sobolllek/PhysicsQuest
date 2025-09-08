import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Question } from "@/types/level"
import { hapticFeedback } from "@/lib/telegram"
import { HelpCircle, CheckCircle2, XCircle } from "lucide-react"

interface QuestionComponentProps {
  question: Question
  userAnswer: any
  onAnswer: (answer: any) => void
  showExplanation?: boolean
  isControlTest?: boolean
}

export function QuestionComponent({ 
  question, 
  userAnswer, 
  onAnswer, 
  showExplanation = false,
  isControlTest = false
}: QuestionComponentProps) {
  const [showHint, setShowHint] = useState(false)

  const handleSingleChoice = (value: string) => {
    hapticFeedback('selection')
    onAnswer(value)
  }

  const handleMultipleChoice = (value: string, checked: boolean) => {
    hapticFeedback('selection')
    const currentAnswers = Array.isArray(userAnswer) ? userAnswer : []
    
    if (checked) {
      onAnswer([...currentAnswers, value])
    } else {
      onAnswer(currentAnswers.filter((answer: string) => answer !== value))
    }
  }

  const handleNumberInput = (value: string) => {
    const numValue = parseFloat(value)
    onAnswer(isNaN(numValue) ? null : numValue)
  }

  const handleFormulaMatch = (value: string) => {
    hapticFeedback('selection')
    const currentAnswers = Array.isArray(userAnswer) ? userAnswer : []
    
    if (currentAnswers.includes(value)) {
      onAnswer(currentAnswers.filter((answer: string) => answer !== value))
    } else {
      onAnswer([...currentAnswers, value])
    }
  }

  const isCorrect = () => {
    if (question.type === 'multiple-choice' || question.type === 'formula-match') {
      const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer]
      return Array.isArray(userAnswer) && 
        userAnswer.length === correctAnswers.length &&
        userAnswer.every(answer => correctAnswers.includes(answer))
    }
    return userAnswer === question.correctAnswer
  }

  const renderAnswerOptions = () => {
    switch (question.type) {
      case 'single-choice':
        return (
          <RadioGroup value={userAnswer || ""} onValueChange={handleSingleChoice}>
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )

      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox 
                  id={`option-${index}`}
                  checked={Array.isArray(userAnswer) && userAnswer.includes(option)}
                  onCheckedChange={(checked) => handleMultipleChoice(option, checked as boolean)}
                />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        )

      case 'number-input':
        return (
          <Input
            type="number"
            value={userAnswer || ""}
            onChange={(e) => handleNumberInput(e.target.value)}
            placeholder="Введите ответ"
            className="text-center text-lg"
          />
        )

      case 'formula-match':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all ${
                  Array.isArray(userAnswer) && userAnswer.includes(option) 
                    ? 'border-primary bg-primary/10' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => handleFormulaMatch(option)}
              >
                <CardContent className="p-4">
                  <p className="text-sm">{option}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg leading-relaxed text-center">
          {question.question}
          {showExplanation && (
            <span className={`ml-2 inline-flex items-center gap-1 text-sm ${
              isCorrect() ? 'text-success' : 'text-destructive'
            }`}>
              {isCorrect() ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {isCorrect() ? 'Верно' : 'Неверно'}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderAnswerOptions()}

        {/* Hints (only for practice, not for control test) */}
        {!isControlTest && question.hints && question.hints.length > 0 && (
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowHint(!showHint)}
              className="w-full"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              {showHint ? 'Скрыть подсказку' : 'Показать подсказку'}
            </Button>
            
            {showHint && (
              <Card className="border-accent/50 bg-accent/5">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {question.hints.map((hint, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        💡 {hint}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Explanation (shown after answering) */}
        {showExplanation && question.explanation && (
          <Card className={`border-2 ${isCorrect() ? 'border-success/50 bg-success/5' : 'border-destructive/50 bg-destructive/5'}`}>
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-2">Объяснение:</p>
              <p className="text-sm text-muted-foreground">{question.explanation}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}