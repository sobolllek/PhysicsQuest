import { cn } from "@/lib/utils"
import { LevelNode } from "./level-node"

interface Level {
  id: number
  title: string
  isUnlocked: boolean
  isCompleted: boolean
  isCurrent?: boolean
  sectionId?: string
  sectionTitle?: string
  icon: string
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
  // Calculate positions: 1 centered, 2 side-by-side, relative to container
  const calculatePositions = (levelCount: number) => {
    const positions: { x: string; y: string; transform: string }[] = [];
    let currentY = 70; // Starting Y position
    const yStep = 150; // Vertical spacing between levels

    for (let i = 0, levelIndex = 0; levelIndex < levelCount; i++) {
      if (i % 2 === 0) {
        // Single centered node
        if (levelIndex < levelCount) {
          positions.push({ x: '50%', y: `${currentY}px`, transform: 'translateX(-50%)' });
          levelIndex++;
        }
        currentY += yStep;
      } else {
        // Two nodes at same vertical level
        if (levelIndex < levelCount) {
          positions.push({ x: '25%', y: `${currentY}px`, transform: 'translateX(-50%)' });
          levelIndex++;
        }
        if (levelIndex < levelCount) {
          positions.push({ x: '75%', y: `${currentY}px`, transform: 'translateX(-50%)' });
          levelIndex++;
        }
        currentY += yStep;
      }
    }
    return positions;
  };

  const positions = calculatePositions(levels.length);
  const containerHeight = 60 + Math.ceil(levels.length / 1.5) * 120;

  // Function to render connecting lines between levels
  const renderConnectingLines = () => {
    const lines = [];
    let verticalCurveIndex = 0; // Track vertical connections separately
    const mirroredOffsetX = -100; // Adjust this value to move mirrored curves left (negative) or right (positive)
    
    for (let i = 0; i < levels.length - 1; i++) {
      const currentPos = positions[i];
      const nextPos = positions[i + 1];
      
      // Skip if positions are not available
      if (!currentPos || !nextPos) continue;
      
      // Calculate line coordinates
      const currentX = currentPos.x === '50%' ? 150 : (currentPos.x === '25%' ? 75 : 225);
      const nextX = nextPos.x === '50%' ? 150 : (nextPos.x === '25%' ? 75 : 225);
      
      const currentY = parseInt(currentPos.y);
      const nextY = parseInt(nextPos.y);
      
      // Draw lines between nodes on different rows (vertical connections)
      if (currentY !== nextY) {
        const midX = (currentX + nextX) / 2;
        const midY = (currentY + nextY) / 2;
        
        // Raise the SVG higher by adjusting the translateY offset
        const verticalOffset = -30;
        
        // Alternate between mirrored and non-mirrored curves for vertical connections
        const isMirrored = (verticalCurveIndex % 2) === 0;
        const curvePath = isMirrored 
          ? "M70.7764 250C-47.7236 184.5 -11.7236 3 185.776 3" // Mirrored (left) curve, flipped upside down
          : "M118 3C236.5 68.5 200.5 250 3 250"; // Non-mirrored (right) curve
        
        lines.push(
          <svg
            key={`line-${i}`}
            className="absolute"
            style={{
              left: `${midX - 40 + (isMirrored ? mirroredOffsetX : 0)}px`,
              top: `${currentY}px`,
              width: '180',
              height: '150',
              transform: `translateY(${midY - currentY + verticalOffset}px)`,
            }}
            viewBox="0 0 188 255"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={curvePath} stroke="white" strokeWidth="6" strokeLinecap="round" strokeDasharray="26 26"/>
          </svg>
        );
        verticalCurveIndex++; // Increment only for vertical connections
      } else {
        // Horizontal line for same row levels
        const midX = (currentX + nextX) / 2;
        const midY = currentY;
        
        lines.push(
          <svg
            key={`line-${i}`}
            className="absolute"
            style={{
              left: `${midX - 69}px`,
              top: `${midY}px`,
              transform: 'translateY(1100%)',
            }}
            width="138"
            height="3.5"
            viewBox="0 0 138 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.5 3H134.5" stroke="white" strokeWidth="6" strokeLinecap="round" strokeDasharray="26 26"/>
          </svg>
        );
      }
    }
    
    return lines;
  };

  return (
    <div className={cn("flex flex-col items-center space-y-8", className)}>
      {/* Winding levels path with connecting curves */}
      <div className="relative w-full flex justify-center">
        <div className="relative" style={{ minHeight: `${containerHeight}px`, width: '300px' }}>
          {/* Connecting lines between levels */}
          {renderConnectingLines()}
          
          {/* Levels positioned along winding path */}
          <div className="relative w-full">
            {levels.map((level, index) => {
              const position = positions[index] || positions[positions.length - 1];
              
              return (
                <div
                  key={level.id}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: position.x,
                    top: position.y,
                    transform: position.transform,
                  }}
                >
                  <LevelNode
                    isUnlocked={level.isUnlocked}
                    isCompleted={level.isCompleted}
                    isCurrent={level.isCurrent}
                    progress={levelProgress[level.id]}
                    onClick={() => onLevelClick(level.id)}
                    icon={level.icon}
                  />
                  <span className="mt-1 text-sm text-white font-bold text-center break-words whitespace-normal max-w-[140px]">
                    {level.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}