import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Target, Zap } from "lucide-react"
import PhysicsIcon from "@/components/PhysicsIcon"

export default function AchievementsScreen() {
  const achievements = [
    {
      id: 1,
      title: "Первые шаги",
      description: "Пройди первый уровень",
      icon: <Target className="w-8 h-8 text-primary-foreground" />,
      progress: 100,
      unlocked: true,
      xp: 50
    },
    {
      id: 2,
      title: "Исследователь",
      description: "Пройди 5 уровней подряд",
      icon: <Star className="w-8 h-8 text-primary-foreground" />,
      progress: 20,
      unlocked: false,
      xp: 150
    },
    {
      id: 3,
      title: "Гений механики",
      description: "Заверши раздел Механика",
      icon: <Trophy className="w-8 h-8 text-primary-foreground" />,
      progress: 0,
      unlocked: false,
      xp: 500
    },
  ]

  const userStats = {
    rank: "Новичок",
    xp: 50,
    nextRankXp: 200,
    level: 1,
    completedLevels: 1,
    totalLevels: 25
  }

  return (
    <div className="min-h-screen bg-gradient-space pb-20">
      <div className="relative z-10">
        {/* Fixed Header with Top-Left Title and Icon on the right side */}
        <div className="fixed top-24 left-6 right-6 z-20 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            Достижения
          </h1>
          <PhysicsIcon />
        </div>

        {/* Content with padding to avoid overlap with fixed header */}
        <div className="pt-40 px-6">
          {/* Progress Card */}
          <div className="mb-6">
            <Card className="p-6 bg-gradient-cosmic border-none text-primary-foreground">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{userStats.rank}</h3>
                  <p className="text-primary-foreground/80">Уровень {userStats.level}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Zap className="w-8 h-8" />
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>XP</span>
                  <span>{userStats.xp}/{userStats.nextRankXp}</span>
                </div>
                <div className="w-full bg-primary-foreground/20 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(userStats.xp / userStats.nextRankXp) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span>Пройдено уровней</span>
                <span>{userStats.completedLevels}/{userStats.totalLevels}</span>
              </div>
            </Card>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-4">Награды</h2>
            
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`p-4 border-border/50 transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'bg-card/80 backdrop-blur-sm' 
                    : 'bg-muted/50 backdrop-blur-sm opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    achievement.unlocked 
                      ? 'bg-gradient-cosmic shadow-glow' 
                      : 'bg-muted'
                  }`}>
                    {achievement.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {achievement.title}
                      </h3>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="text-xs">
                          +{achievement.xp} XP
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    
                    {!achievement.unlocked && (
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}