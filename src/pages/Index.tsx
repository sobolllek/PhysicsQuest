import { useState } from "react"
import { TabNavigation } from "@/components/layout/tab-navigation"
import MainScreen from "./MainScreen"
import TheoryScreen from "./TheoryScreen"
import AchievementsScreen from "./AchievementsScreen"
import ProfileScreen from "./ProfileScreen"
import { toast } from "@/hooks/use-toast"

const Index = () => {
  const [activeTab, setActiveTab] = useState('main')

  const handleLevelClick = (levelId: number) => {
    toast({
      title: "Уровень выбран",
      description: `Готовимся к прохождению уровня ${levelId}`,
    })
    // TODO: Navigate to level screen
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'main':
        return <MainScreen onLevelClick={handleLevelClick} />
      case 'theory':
        return <TheoryScreen />
      case 'achievements':
        return <AchievementsScreen />
      case 'profile':
        return <ProfileScreen />
      default:
        return <MainScreen onLevelClick={handleLevelClick} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
