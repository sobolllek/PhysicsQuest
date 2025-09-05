import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, ArrowRight } from "lucide-react"
import { LevelStep } from "@/types/level"
import { hapticFeedback } from "@/lib/telegram"

interface TheoryStepProps {
  step: LevelStep
  onComplete: () => void
}

export function TheoryStep({ step, onComplete }: TheoryStepProps) {
  const [isRead, setIsRead] = useState(false)

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setIsRead(true)
    }
  }

  const handleContinue = () => {
    hapticFeedback('selection')
    onComplete()
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            {step.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea 
            className="h-[60vh] pr-4" 
            onScrollCapture={handleScroll}
          >
            <div 
              className="prose prose-sm max-w-none text-foreground"
              dangerouslySetInnerHTML={{ 
                __html: step.content?.replace(/\n/g, '<br/>') || '' 
              }}
            />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Continue button */}
      <div className="flex justify-center pt-4">
        <Button 
          onClick={handleContinue}
          disabled={!isRead}
          size="lg"
          className="min-w-[200px]"
        >
          {isRead ? (
            <>
              Продолжить
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            "Прочитайте до конца"
          )}
        </Button>
      </div>

      {!isRead && (
        <p className="text-center text-sm text-muted-foreground">
          Прокрутите до конца, чтобы продолжить
        </p>
      )}
    </div>
  )
}