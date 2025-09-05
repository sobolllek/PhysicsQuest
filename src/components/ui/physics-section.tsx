import { cn } from "@/lib/utils"
import { LevelNode } from "./level-node"

interface Level {
  id: number
  title: string
  isUnlocked: boolean
  isCompleted: boolean
  isCurrent?: boolean
}

interface PhysicsSectionProps {
  title: string
  icon: React.ReactNode
  levels: Level[]
  onLevelClick: (levelId: number) => void
  className?: string
}

export function PhysicsSection({ 
  title, 
  icon, 
  levels, 
  onLevelClick,
  className 
}: PhysicsSectionProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Section header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-cosmic shadow-cosmic mb-4">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>

      {/* Levels grid with connecting paths */}
      <div className="relative">
        {/* Connecting path */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ zIndex: -1 }}
        >
          <defs>
            <pattern 
              id="dots" 
              x="0" 
              y="0" 
              width="20" 
              height="20" 
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="2" fill="hsl(var(--primary-glow))" opacity="0.5" />
            </pattern>
          </defs>
          {levels.slice(0, -1).map((_, index) => (
            <line
              key={index}
              x1="50%"
              y1={`${20 + index * 25}%`}
              x2="50%"
              y2={`${45 + index * 25}%`}
              stroke="url(#dots)"
              strokeWidth="2"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          ))}
        </svg>

        {/* Levels */}
        <div className="flex flex-col items-center space-y-8">
          {levels.map((level) => (
            <LevelNode
              key={level.id}
              title={level.title}
              isUnlocked={level.isUnlocked}
              isCompleted={level.isCompleted}
              isCurrent={level.isCurrent}
              onClick={() => onLevelClick(level.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}