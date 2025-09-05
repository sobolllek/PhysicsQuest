import { PhysicsSection } from "@/components/ui/physics-section"
import { physicsSections } from "@/data/physics-data"
import { Atom, Zap, Waves, Thermometer, Orbit } from "lucide-react"

const sectionIcons = {
  mechanics: <Atom className="w-8 h-8 text-primary-foreground" />,
  thermodynamics: <Thermometer className="w-8 h-8 text-primary-foreground" />,
  electrodynamics: <Zap className="w-8 h-8 text-primary-foreground" />,
  waves: <Waves className="w-8 h-8 text-primary-foreground" />,
  quantum: <Orbit className="w-8 h-8 text-primary-foreground" />,
}

interface MainScreenProps {
  onLevelClick: (levelId: number) => void
}

export default function MainScreen({ onLevelClick }: MainScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-space pb-20">
      {/* Header */}
      <div className="relative pt-12 pb-8 text-center">
        <div className="absolute inset-0 bg-gradient-cosmic opacity-20" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Physics Quest
          </h1>
          <p className="text-muted-foreground">
            Изучай физику пошагово
          </p>
        </div>
      </div>

      {/* Physics Sections */}
      <div className="px-6 space-y-12">
        {physicsSections.map((section) => (
          <PhysicsSection
            key={section.id}
            title={section.title}
            icon={sectionIcons[section.id as keyof typeof sectionIcons]}
            levels={section.levels}
            onLevelClick={onLevelClick}
          />
        ))}
      </div>

      {/* Bottom padding for tab navigation */}
      <div className="h-20" />
    </div>
  )
}