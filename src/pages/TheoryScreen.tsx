import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Star, TrendingUp } from "lucide-react"

export default function TheoryScreen() {
  const articles = [
    {
      title: "История физики",
      description: "От Аристотеля до квантовой механики",
      difficulty: "Легко",
      readTime: "5 мин",
      category: "История"
    },
    {
      title: "Физика в повседневной жизни",
      description: "Как физические законы работают вокруг нас",
      difficulty: "Средне", 
      readTime: "8 мин",
      category: "Практика"
    },
    {
      title: "Занимательные факты",
      description: "Удивительные открытия в физике",
      difficulty: "Легко",
      readTime: "3 мин",
      category: "Факты"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-space pb-20">
      {/* Header */}
      <div className="pt-12 pb-8 px-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Теория
        </h1>
        <p className="text-muted-foreground">
          Интересные статьи и факты по физике
        </p>
      </div>

      {/* Articles */}
      <div className="px-6 space-y-4">
        {articles.map((article, index) => (
          <Card key={index} className="p-6 border-border/50 bg-card/80 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground font-medium">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {article.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {article.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="cosmic" size="sm" className="w-full">
              Читать
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}