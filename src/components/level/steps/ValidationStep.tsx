import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, RotateCcw, ArrowRight } from "lucide-react"
import { hapticFeedback } from "@/lib/telegram"

interface ValidationStepProps {
  practiceScore: number
  onContinue: () => void
  onRetry: () => void
}

export function ValidationStep({ practiceScore, onContinue, onRetry }: ValidationStepProps) {
  const passed = practiceScore >= 80
  
  const handleContinue = () => {
    hapticFeedback('notification')
    onContinue()
  }

  const handleRetry = () => {
    hapticFeedback('selection')
    onRetry()
  }

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
            Валидация практики
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-foreground">
            {practiceScore}%
          </div>
          
          {passed ? (
            <div className="space-y-2">
              <div className="text-lg font-semibold text-success">
                Отлично! Переходим к контрольному тесту
              </div>
              <p className="text-muted-foreground">
                Вы успешно прошли практику с результатом выше 80%. 
                Теперь вас ждет финальный контрольный тест.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-lg font-semibold text-destructive">
                Необходимо повторить материал
              </div>
              <p className="text-muted-foreground">
                Результат ниже 80%. Рекомендуем вернуться к изучению теории 
                и повторить практику.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        {!passed && (
          <Button variant="outline" onClick={handleRetry} className="flex-1">
            <RotateCcw className="w-4 h-4 mr-2" />
            К теории
          </Button>
        )}
        
        {passed && (
          <Button onClick={handleContinue} size="lg" className="flex-1">
            К контрольному тесту
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}