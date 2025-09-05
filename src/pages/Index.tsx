import { useState, useEffect } from "react"
import { TabNavigation } from "@/components/layout/tab-navigation"
import MainScreen from "./MainScreen"
import TheoryScreen from "./TheoryScreen"
import AchievementsScreen from "./AchievementsScreen"
import ProfileScreen from "./ProfileScreen"
import { LevelScreen } from "@/components/level/LevelScreen"
import { toast } from "@/hooks/use-toast"
import { initTelegram } from "@/lib/telegram"
import { LevelData } from "@/types/level"

const Index = () => {
  const [activeTab, setActiveTab] = useState('main')
  const [currentLevel, setCurrentLevel] = useState<LevelData | null>(null)
  const [levelProgress, setLevelProgress] = useState<{ [levelId: number]: any }>({
    1: { theory: true, practice: false, validation: false, controlTest: false },
    2: { theory: false, practice: false, validation: false, controlTest: false }
  })

  useEffect(() => {
    // Initialize Telegram Web App
    initTelegram()
  }, [])

  const handleLevelClick = async (levelId: number) => {
    try {
      // Load level data from JSON
      const levelModule = await import(`@/data/mechanics/level_${levelId}.json`)
      setCurrentLevel(levelModule.default)
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить уровень",
        variant: "destructive"
      })
    }
  }

  const handleLevelComplete = (score: number) => {
    toast({
      title: "Уровень завершен!",
      description: `Результат: ${score}%`,
    })
    setCurrentLevel(null)
    setActiveTab('main')
  }

  const handleBackFromLevel = () => {
    setCurrentLevel(null)
  }

  const renderScreen = () => {
    // If level is selected, show level screen
    if (currentLevel) {
      return (
        <LevelScreen 
          levelData={currentLevel}
          onBack={handleBackFromLevel}
          onComplete={handleLevelComplete}
        />
      )
    }

    // Otherwise show tab content
    switch (activeTab) {
      case 'main':
        return <MainScreen onLevelClick={handleLevelClick} levelProgress={levelProgress} />
      case 'theory':
        return <TheoryScreen />
      case 'achievements':
        return <AchievementsScreen />
      case 'profile':
        return <ProfileScreen />
      default:
        return <MainScreen onLevelClick={handleLevelClick} levelProgress={levelProgress} />
    }
  }

  return (
    <div className="h-full bg-background">
      {renderScreen()}
      {/* Hide tab navigation when in level */}
      {!currentLevel && (
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
};

export default Index;
