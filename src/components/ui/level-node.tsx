import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"
import { useState } from "react"

interface LevelProgress {
  theory: boolean
  practice: boolean
  validation: boolean
  controlTest: boolean
}

interface LevelNodeProps {
  isUnlocked: boolean
  isCompleted: boolean
  isCurrent?: boolean
  icon: string
  progress?: LevelProgress
  onClick?: () => void
  className?: string
}

export function LevelNode({ 
  isUnlocked, 
  isCompleted, 
  isCurrent = false,
  icon,
  progress,
  onClick,
  className 
}: LevelNodeProps) {
  const hasProgress = progress && (progress.theory || progress.practice || progress.validation || progress.controlTest)
  const [isWobbling, setIsWobbling] = useState(false)
  const [isScaling, setIsScaling] = useState(false)

  const calculateProgress = () => {
    if (!progress || isCompleted) return 100;
    const totalSteps = 4;
    const completedSteps = Object.values(progress).filter(Boolean).length;
    return (completedSteps / totalSteps) * 100;
  };

  const progressPercentage = calculateProgress();

  const handleClick = () => {
    if (!isUnlocked) {
      setIsWobbling(true);
      setTimeout(() => setIsWobbling(false), 1500);
    } else {
      setIsScaling(true);
      setTimeout(() => setIsScaling(false), 500);
    }
    if (onClick) onClick();
  };

  return (
    <div className={cn("relative group", className)}>
      <button
        onClick={handleClick}
        className={cn(
          "relative w-20 h-20 rounded-full border-8 border-white transition-all duration-500",
          "flex items-center justify-center",
          "hover:scale-110 active:scale-95",
          {
            "bg-gradient-cosmic shadow-glow cursor-pointer": isCompleted,
            "bg-gradient-blue shadow-cosmic cursor-pointer":
              isCurrent && isUnlocked && !isCompleted,
            "bg-gradient-blue shadow-level cursor-pointer hover:shadow-glow":
              isUnlocked && !isCompleted && !isCurrent,
            "bg-muted cursor-default": !isUnlocked,
            "scale-110": isScaling,
          }
        )}
      >
        {/* Always show the icon */}
        <img 
          src={icon} 
          alt="icon" 
          className="w-24 h-24 opacity-100"
        />

        {/* Lock Icon */}
        {!isUnlocked && (
          <div className="absolute -bottom-3 -right-3 flex items-center justify-center rounded-full border-4 border-white bg-gray-500 w-9 h-9">
            <svg 
              width="18" height="25" viewBox="0 0 18 25" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn("w-5 h-5", { "animate-wobble": isWobbling })}
            >
              <style>
                {`
                  @keyframes wobble {
                    0% { transform: rotate(0deg); }
                    25% { transform: rotate(-15deg); }
                    50% { transform: rotate(15deg); }
                    75% { transform: rotate(-15deg); }
                    100% { transform: rotate(0deg); }
                  }
                  .animate-wobble {
                    animation: wobble 1.5s ease-in-out;
                  }
                `}
              </style>
              <path 
                d="M2.71997 10.3603C2.16769 10.3603 1.71997 10.808 1.71997 11.3603V20.3603C1.71997 20.9126 2.16769 21.3603 2.71997 21.3603H15.22C15.7723 21.3603 16.22 20.9126 16.22 20.3603V11.3603C16.22 10.808 15.7723 10.3603 15.22 10.3603H13.72H4.21997H2.71997Z" 
                fill="white"
              />
              <path 
                d="M4.21997 10.3603H2.71997C2.16769 10.3603 1.71997 10.808 1.71997 11.3603V20.3603C1.71997 20.9126 2.16769 21.3603 2.71997 21.3603H15.22C15.7723 21.3603 16.22 20.9126 16.22 20.3603V11.3603C16.22 10.808 15.7723 10.3603 15.22 10.3603H13.72M4.21997 10.3603C4.21997 10.3603 4.21997 12.5007 4.21997 6C4.21997 0.00107431 13.72 0.000996113 13.72 6C13.72 12.5004 13.72 10.3603 13.72 10.3603M4.21997 10.3603H13.72" 
                stroke="white" strokeWidth="2" strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </button>

      {/* Progress indicator */}
      {isUnlocked && !isCompleted && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center rounded-full border-4 border-white bg-white w-7 h-7">
          {progressPercentage === 100 ? (
            <Check className="w-4 h-4 text-white" />
          ) : (
            <div className="relative w-7 h-7">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" className="fill-none stroke-gray-300" strokeWidth="7" />
                <circle
                  cx="18" cy="18" r="14"
                  className="fill-none stroke-green-500"
                  strokeWidth="7"
                  strokeDasharray={`${progressPercentage} 100`}
                  transform="rotate(-90 18 18)"
                />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Progress popup */}
      {hasProgress && !isCompleted && (
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-border min-w-32 z-50">
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span>Теория</span>
              {progress.theory ? <Check className="w-3 h-3 text-success" /> : <X className="w-3 h-3 text-destructive" />}
            </div>
            <div className="flex items-center justify-between">
              <span>Практика</span>
              {progress.practice ? <Check className="w-3 h-3 text-success" /> : <X className="w-3 h-3 text-destructive" />}
            </div>
            <div className="flex items-center justify-between">
              <span>Контроль</span>
              {progress.controlTest ? <Check className="w-3 h-3 text-success" /> : <X className="w-3 h-3 text-destructive" />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}