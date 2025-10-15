import { useState } from "react"
import { PhysicsSection } from "@/components/ui/physics-section"
import { physicsSections } from "@/data/physics-data"
import { Atom, Zap, Waves, Thermometer, Orbit } from "lucide-react"
import { cn } from "@/lib/utils"
import PhysicsIcon from "@/components/PhysicsIcon"

const sectionIcons = {
  mechanics: <Atom className="w-8 h-8 text-primary-foreground" />,
  thermodynamics: <Thermometer className="w-8 h-8 text-primary-foreground" />,
  electrodynamics: <Zap className="w-8 h-8 text-primary-foreground" />,
  waves: <Waves className="w-8 h-8 text-primary-foreground" />,
  quantum: <Orbit className="w-8 h-8 text-primary-foreground" />,
}

interface MainScreenProps {
  onLevelClick: (levelId: number) => void
  levelProgress: { [levelId: number]: any }
}

export default function MainScreen({ onLevelClick, levelProgress }: MainScreenProps) {
  const [selectedSection, setSelectedSection] = useState(physicsSections[0].id)
  const [displayedSectionTitle, setDisplayedSectionTitle] = useState(physicsSections[0].title)

  // Собираем ВСЕ уровни из ВСЕХ разделов в один массив
  const allLevels = physicsSections.flatMap(section => 
    section.levels.map(level => ({
      ...level,
      sectionId: section.id,
      sectionTitle: section.title
    }))
  )

  // Находим текущий выбранный раздел
  const currentSection = physicsSections.find(section => section.id === selectedSection)

  // Callback to update displayed section title when a level is clicked
  const handleLevelClick = (levelId: number) => {
    const level = allLevels.find(l => l.id === levelId)
    console.log("Clicked level:", levelId, "Found level:", level) // Debug log
    if (level) {
      setDisplayedSectionTitle(level.sectionTitle)
      setSelectedSection(level.sectionId);
      console.log("Updating section title to:", level.sectionTitle) // Debug log
    } else {
      console.log("Level not found for ID:", levelId) // Debug log
    }
    if (onLevelClick) {
      onLevelClick(levelId)
    }
  }

  return (
    <div className="h-full bg-gradient-space overflow-y-auto pb-20 relative">
      {/* Fixed SVG Background */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 582 1269" 
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1690_3286)">
            <rect width="582" height="1269" fill="white"/>
            <rect x="-3" y="-12" width="586" height="1280" fill="#78ABFA"/>
            <path d="M582.661 -12H-2.33887V659.098C95.9798 999.993 324.315 1272.03 582.661 1185.93V-12Z" fill="#71A6F8"/>
            <path d="M582.662 -12H166.5C-18.2482 496.663 157.777 806.94 582.663 665L582.662 -12Z" fill="#6A9EEF"/>
            <path d="M582.662 -12H253.162C68.4147 496.663 157.777 575.94 582.662 434V-12Z" fill="#6699E9"/>
            <path d="M290 -12C56.6163 365.58 60.1734 503.465 582.5 466" stroke="#B8D4FF"/>
            <path d="M-0.499512 582.5C-0.5 725.5 19.3405 1234.29 582.602 1162.44" stroke="#B8D4FF"/>
            <path d="M204.925 -12C-97 304.5 157.001 794.5 582.499 705.108" stroke="#B8D4FF"/>
          </g>
          <defs>
            <clipPath id="clip0_1690_3286">
              <rect width="582" height="1269" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Fixed Header with Top-Left Title and Icon on the right side */}
        <div className="fixed top-24 left-6 right-6 z-20 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            {displayedSectionTitle || "Physics Quest"}
          </h1>
          <PhysicsIcon className="text-white"/>
        </div>

        {/* Content with padding to avoid overlap with fixed header */}
        <div className="pt-20 px-6 pb-[calc(7rem+env(safe-area-inset-bottom))]">
          <PhysicsSection
            title=""
            icon={null}
            levels={allLevels.map(level => ({
              ...level,
              icon: level.icon,
            }))}
            levelProgress={levelProgress}
            onLevelClick={handleLevelClick}
          />
        </div>
      </div>
    </div>
  )
}

