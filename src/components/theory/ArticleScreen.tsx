import { Card } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { showBackButton, hideBackButton } from "@/lib/telegram"

interface ArticleScreenProps {
  article: {
    title: string;
    category: string;
    content: string;
  };
  onBack: () => void;
}

export default function ArticleScreen({ article, onBack }: ArticleScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    showBackButton(onBack)
    return () => hideBackButton()
  }, [onBack])

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current
        const contentHeight = scrollHeight - clientHeight
        const scrollProgress = contentHeight > 0 ? (scrollTop / contentHeight) * 100 : 0
        setProgress(Math.min(100, Math.max(0, scrollProgress)))
        setIsScrolled(scrollTop > 0)
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 2)
      }
    }

    const content = contentRef.current
    if (content) {
      content.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (content) {
        content.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className="h-full bg-[#9A96FF] pt-24 relative">
      {/* Fixed Header with Progress Bar and Article Title */}
      <div className="fixed top-26 left-6 right-6 z-20">
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/20 rounded-full mb-4 overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-200 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Article Title */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white flex-1 text-center leading-none">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Fixed Content Container */}
      <div className="fixed top-44 left-4 right-4 bottom-5 z-10">
        <Card className="bg-white/95 rounded-3xl p-6 h-full overflow-hidden shadow-lg relative">
          <span className="text-xs text-gray-400 font-medium mb-4 block">{article.category}</span>
          <div 
            ref={contentRef}
            className="article-content prose prose-lg max-w-none leading-relaxed h-[calc(100%-2rem)] overflow-y-auto relative"
            style={{
              WebkitMaskImage: isScrolled
                ? isAtBottom
                  ? "linear-gradient(to bottom, transparent 0%, white 10%, white 100%)"
                  : "linear-gradient(to bottom, transparent 0%, white 10%, white 85%, transparent 100%)"
                : isAtBottom
                  ? "linear-gradient(to bottom, white 0%, white 100%)"
                  : "linear-gradient(to bottom, white 0%, white 85%, transparent 100%)",
              maskImage: isScrolled
                ? isAtBottom
                  ? "linear-gradient(to bottom, transparent 0%, white 10%, white 100%)"
                  : "linear-gradient(to bottom, transparent 0%, white 10%, white 85%, transparent 100%)"
                : isAtBottom
                  ? "linear-gradient(to bottom, white 0%, white 100%)"
                  : "linear-gradient(to bottom, white 0%, white 85%, transparent 100%)"
            }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </Card>
      </div>
    </div>
  )
}