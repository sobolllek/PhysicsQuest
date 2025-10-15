import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Settings, HelpCircle, BookOpen, Trophy, Zap } from "lucide-react"
import PhysicsIcon from "@/components/PhysicsIcon"

export default function ProfileScreen() {
  const userProfile = {
    name: "Юный физик",
    rank: "Новичок", 
    xp: 50,
    level: 1,
    joinDate: "Январь 2025",
    streak: 3,
    coins: 125
  }

  const stats = [
    { label: "Уровней пройдено", value: "1", icon: <Trophy className="w-4 h-4" /> },
    { label: "Общий XP", value: "50", icon: <Zap className="w-4 h-4" /> },
    { label: "Дней подряд", value: "3", icon: <BookOpen className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e2e9eeff] pb-20">
      <div className="relative z-10">
        {/* Fixed Header with Top-Left Title and Icon on the right side */}
        <div className="fixed top-24 left-6 right-6 z-20 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-600">
            Профиль
          </h1>
          <PhysicsIcon className="text-gray-600"/>
        </div>

        {/* Content with padding to avoid overlap with fixed header */}
        <div className="pt-40 px-6">
          {/* Profile Card */}
          <div className="mb-6">
            <Card className="p-6 bg-gray-400 border-none text-primary-foreground">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16 bg-primary-foreground/20 lex items-center justify-center">
                  <User className="w-8 h-8 text-primary-foreground" />
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{userProfile.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
                      {userProfile.rank}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userProfile.level}</div>
                  <div className="text-xs text-primary-foreground/80">Уровень</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userProfile.coins}</div>
                  <div className="text-xs text-primary-foreground/80">Монеты</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userProfile.streak}</div>
                  <div className="text-xs text-primary-foreground/80">Дней</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Статистика</h3>
            <div className="grid grid-cols-1 gap-3">
              {stats.map((stat, index) => (
                <Card key={index} className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {stat.icon}
                      </div>
                      <span className="text-foreground font-medium">{stat.label}</span>
                    </div>
                    <span className="text-xl font-bold text-primary">{stat.value}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}