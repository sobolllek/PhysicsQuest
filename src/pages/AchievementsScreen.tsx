import { useRef, useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import PhysicsIcon from "@/components/PhysicsIcon"
import { achievements } from "@/data/achievements"
import { Check, X as XIcon } from "lucide-react"

export default function AchievementsScreen() {
  const weekProgress = [
    0, // чт - completed
    1, // пт - missed
    0, // сб - completed
    2, // вс - current
    3, // пн - future
    3, // вт - future
    3, // ср - future
  ]
  const weekDays = ["чт", "пт", "сб", "вс", "пн", "вт", "ср"]

  const contentRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current
        setIsScrolled(scrollTop > 0)
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1)
      }
    }

    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll)
      return () => contentElement.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e2e9eeff] pb-20">
      <div className="relative z-10">
        {/* Fixed Header with Top-Left Title and Icon on the right side */}
        <div className="fixed top-24 left-6 right-6 z-20 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-600">
            Достижения
          </h1>
          <PhysicsIcon className="text-gray-600" />
        </div>

        {/* Content with padding to avoid overlap with fixed header */}
        <div className="pt-40 px-6">
          {/* Weekly Progress */}
          <div className="mb-6">
            <div className="w-full max-w-full overflow-hidden">
              <div className="grid grid-cols-7 gap-2 w-full mb-2">
                {weekProgress.map((state, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground mb-0">{weekDays[idx]}</span>
                    <div
                      className={
                        [
                          "w-8 h-8 flex items-center justify-center rounded-full mt-1 text-white text-lg",
                          state === 0
                            ? "bg-green-500"
                            : state === 1
                            ? "bg-red-500"
                            : state === 2
                            ? "bg-white border-2 border-green-500 text-green-500"
                            : "bg-gray-300 text-gray-400"
                        ].join(" ")
                      }
                    >
                      {state === 0 && <Check className="w-4 h-4" />}
                      {state === 1 && <XIcon className="w-4 h-4" />}
                      {state === 2 && null}
                      {state === 3 && null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scrollable Achievements with Gradient */}
          <div className="space-y-1">
            <hr className="border-t-2 border-gray-200 mb-4" />
            <div
              ref={contentRef}
              className="max-h-[450px] overflow-y-auto relative"
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
            >
              <div className="space-y-4 pb-10 w-full max-w-2xl mx-auto">
                {achievements.map((achievement, index) => (
                  <div className="flex justify-between items-center gap-2" key={achievement.id}>
                    {/* Left-aligned icon container with XP and progress fill */}
                    <div className={`w-16 h-16 rounded-3xl border-4 border-white flex items-center justify-center z-10 relative overflow-hidden shadow-sm ${
                      achievement.progress <= 50 ? 'bg-gray-100' : 'bg-gray-100'
                    }`}>
                      <div 
                        className={`absolute bottom-0 left-0 w-full transition-all duration-500 ${
                          achievement.progress <= 50 ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ height: `${achievement.progress}%` }}
                      />
                      <div 
                        className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                          achievement.progress <= 50 ? 'bg-red-200' : 'bg-green-200'
                        }`}
                        style={{ height: `${100 - achievement.progress}%` }}
                      />
                      <span className="text-lg font-bold text-white relative z-10">
                        {achievement.xp}
                      </span>
                    </div>

                    {/* Right-aligned card container */}
                    <div className="flex-1 flex justify-end">
                      <Card 
                        className={`border-0 rounded-3xl pt-4 pr-4 pb-4 pl-12 flex flex-col transition w-[120%] -ml-16 ${
                          achievement.unlocked 
                            ? 'bg-white' 
                            : 'bg-white opacity-60'
                        }`}
                      >
                        <h3 className="text-[15px] font-bold text-gray-900 leading-none">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 leading-none">
                          {achievement.description}
                        </p>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}