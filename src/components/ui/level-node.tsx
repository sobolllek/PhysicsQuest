import { cn } from "@/lib/utils"
import { Lock, CheckCircle2, Play, Check, X } from "lucide-react"

interface LevelProgress {
  theory: boolean
  practice: boolean
  validation: boolean
  controlTest: boolean
}

interface LevelNodeProps {
  title: string
  isUnlocked: boolean
  isCompleted: boolean
  isCurrent?: boolean
  progress?: LevelProgress
  onClick?: () => void
  className?: string
}

export function LevelNode({ 
  title, 
  isUnlocked, 
  isCompleted, 
  isCurrent = false,
  progress,
  onClick,
  className 
}: LevelNodeProps) {
  const hasProgress = progress && (progress.theory || progress.practice || progress.validation || progress.controlTest)

  return (
    <div className={cn("relative group", className)}>
      <button
        onClick={onClick}
        disabled={!isUnlocked}
        className={cn(
          "relative w-20 h-20 rounded-full border-4 transition-all duration-500",
          "flex items-center justify-center",
          "hover:scale-110 active:scale-95",
          {
            // Completed state
            "bg-gradient-cosmic border-success shadow-glow cursor-pointer": isCompleted,
            
            // Current/active state
            "bg-gradient-energy border-accent-bright shadow-cosmic animate-pulse cursor-pointer": 
              isCurrent && isUnlocked && !isCompleted,
            
            // Available but not started
            "bg-gradient-space border-primary-glow shadow-level cursor-pointer hover:shadow-glow": 
              isUnlocked && !isCompleted && !isCurrent,
            
            // Locked state
            "bg-muted border-muted-foreground/30 cursor-not-allowed": !isUnlocked,
          }
        )}
      >
        {!isUnlocked && (
          <Lock className="w-8 h-8 text-muted-foreground" />
        )}
        {isCompleted && (
          <CheckCircle2 className="w-8 h-8 text-success-foreground" />
        )}
        {isUnlocked && !isCompleted && (
          <Play className="w-6 h-6 text-primary-foreground" />
        )}
        
        {/* Glow effect for current level */}
        {isCurrent && isUnlocked && !isCompleted && (
          <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
        )}
      </button>
      
      {/* Level title */}
      <div className="mt-3 text-center">
        <p className={cn(
          "text-sm font-medium transition-colors",
          isUnlocked ? "text-foreground" : "text-muted-foreground"
        )}>
          {title}
        </p>
      </div>

      {/* Progress indicator */}
      {hasProgress && !isCompleted && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-border min-w-32 z-10">
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span>Теория</span>
              {progress.theory ? 
                <Check className="w-3 h-3 text-success" /> : 
                <X className="w-3 h-3 text-destructive" />
              }
            </div>
            <div className="flex items-center justify-between">
              <span>Практика</span>
              {progress.practice ? 
                <Check className="w-3 h-3 text-success" /> : 
                <X className="w-3 h-3 text-destructive" />
              }
            </div>
            <div className="flex items-center justify-between">
              <span>Контроль</span>
              {progress.controlTest ? 
                <Check className="w-3 h-3 text-success" /> : 
                <X className="w-3 h-3 text-destructive" />
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}