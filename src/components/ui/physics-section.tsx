import { cn } from "@/lib/utils"
import { LevelNode } from "./level-node"

interface Level {
  id: number
  title: string
  isUnlocked: boolean
  isCompleted: boolean
  isCurrent?: boolean
}

interface LevelProgress {
  theory: boolean
  practice: boolean
  validation: boolean
  controlTest: boolean
}

interface PhysicsSectionProps {
  title: string
  icon: React.ReactNode
  levels: Level[]
  levelProgress: { [levelId: number]: LevelProgress }
  onLevelClick: (levelId: number) => void
  className?: string
}

export function PhysicsSection({ 
  title, 
  icon, 
  levels, 
  levelProgress,
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

      {/* Winding levels path with connecting curves */}
      <div className="relative min-h-[600px]">
        {/* Curved connecting path */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ zIndex: -1 }}
          viewBox="0 0 300 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern 
              id={`dots-${title.replace(/\s+/g, '-')}`}
              x="0" 
              y="0" 
              width="8" 
              height="8" 
              patternUnits="userSpaceOnUse"
            >
              <circle cx="4" cy="4" r="1.5" fill="hsl(var(--primary-glow))" opacity="0.6" />
            </pattern>
          </defs>
          
          {/* Winding S-curve path connecting all levels */}
          <path
            d="M150,50 C200,80 200,120 150,150 C100,180 100,220 150,250 C200,280 200,320 150,350 C100,380 100,420 150,450 C200,480 200,520 150,550"
            stroke={`url(#dots-${title.replace(/\s+/g, '-')})`}
            strokeWidth="4"
            strokeDasharray="8,6"
            fill="none"
            className="animate-pulse"
            style={{ 
              animation: 'pulse 4s ease-in-out infinite',
              strokeLinecap: 'round'
            }}
          />
        </svg>

        {/* Levels positioned along winding path */}
        <div className="relative">
          {levels.map((level, index) => {
            // Calculate position along the winding path
            const positions = [
              { x: '50%', y: '60px', transform: 'translateX(-50%)' },
              { x: '75%', y: '140px', transform: 'translateX(-50%)' },
              { x: '50%', y: '220px', transform: 'translateX(-50%)' },
              { x: '25%', y: '300px', transform: 'translateX(-50%)' },
              { x: '50%', y: '380px', transform: 'translateX(-50%)' }
            ];
            
            const position = positions[index] || positions[positions.length - 1];
            
            return (
              <div
                key={level.id}
                className="absolute"
                style={{
                  left: position.x,
                  top: position.y,
                  transform: position.transform
                }}
              >
                <LevelNode
                  title={level.title}
                  isUnlocked={level.isUnlocked}
                  isCompleted={level.isCompleted}
                  isCurrent={level.isCurrent}
                  progress={levelProgress[level.id]}
                  onClick={() => onLevelClick(level.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}