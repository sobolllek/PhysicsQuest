import { cn } from "@/lib/utils"
import { Home, Book, Trophy, User } from "lucide-react"

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'main', label: 'Главная', icon: Home },
  { id: 'theory', label: 'Теория', icon: Book },
  { id: 'achievements', label: 'Достижения', icon: Trophy },
  { id: 'profile', label: 'Профиль', icon: User },
]

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around px-4 py-2 max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300",
              "hover:bg-primary/10",
              activeTab === id 
                ? "text-primary" 
                : "text-muted-foreground"
            )}
          >
            <Icon className={cn(
              "w-5 h-5 transition-transform duration-300",
              activeTab === id && "scale-110"
            )} />
            <span className={cn(
              "text-xs font-medium transition-all duration-300",
              activeTab === id && "font-semibold"
            )}>
              {label}
            </span>
            
            {/* Active indicator */}
            {activeTab === id && (
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}