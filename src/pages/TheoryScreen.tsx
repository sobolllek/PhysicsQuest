import { Card } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import PhysicsIcon from "@/components/PhysicsIcon"
import { useState, useEffect } from "react"
import ArticleScreen from "@/components/theory/ArticleScreen"
import articles from "@/components/theory/articles/articles"

interface TheoryScreenProps {
  setIsInSubScreen: (value: boolean) => void;
}

export default function TheoryScreen({ setIsInSubScreen }: TheoryScreenProps) {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)

  useEffect(() => {
    setIsInSubScreen(selectedArticle !== null);
  }, [selectedArticle, setIsInSubScreen]);

  const handleArticleClick = (index: number) => {
    setSelectedArticle(index)
  }

  const handleBack = () => {
    setSelectedArticle(null)
  }

  if (selectedArticle !== null) {
    return (
      <ArticleScreen 
        article={articles[selectedArticle]} 
        onBack={handleBack} 
      />
    )
  }

  return (
    <div className="h-full bg-gradient-space overflow-y-auto pb-20 relative">
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
            <rect x="-3" y="-12" width="586" height="1280" fill="#B4B1FF"/>
            <path d="M582.661 -12H-2.33887V659.098C95.9798 999.993 324.315 1272.03 582.661 1185.93V-12Z" fill="#ABA7FF"/>
            <path d="M582.662 -12H166.5C-18.2482 496.663 157.777 806.94 582.663 665L582.662 -12Z" fill="#A19DFF"/>
            <path d="M582.662 -12H253.162C68.4147 496.663 157.777 575.94 582.662 434V-12Z" fill="#9A96FF"/>
            <path d="M290 -12C56.6168 365.58 60.1739 503.465 582.501 466" stroke="#CBC9FF"/>
            <path d="M-0.5 582.5C-0.500488 725.5 19.34 1234.29 582.602 1162.44" stroke="#CBC9FF"/>
            <path d="M204.926 -12C-96.9995 304.5 157.001 794.5 582.499 705.108" stroke="#CBC9FF"/>
          </g>
          <defs>
            <clipPath id="clip0_1690_3286">
              <rect width="582" height="1269" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="fixed top-24 left-6 right-6 z-20 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            Теория
          </h1>
          <PhysicsIcon className="text-white"/>
        </div>

        <div className="pt-40 px-6 pb-5">
          <div className="w-full max-w-2xl mx-auto">
            <div className="space-y-4">
              {articles.map((article, index) => (
                <div className="flex justify-between items-center gap-4" key={index}>
                  <div className="w-16 h-16 rounded-3xl border-4 border-white bg-gray-100 flex items-center justify-center z-10 shadow-xl shadow-r-md">
                    <BookOpen className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1 flex justify-end">
                    <Card 
                      className="border-0 bg-white rounded-3xl pt-4 pr-4 pb-4 pl-12 flex flex-col cursor-pointer transition w-[120%] -ml-16"
                      onClick={() => handleArticleClick(index)}
                    >
                      <span className="text-xs text-gray-400 font-medium mb-1 leading-none">{article.category}</span>
                      <h3 className="text-[15px] font-bold text-gray-900 leading-none">{article.title}</h3>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
