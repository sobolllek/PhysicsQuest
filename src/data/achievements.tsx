import { Trophy, Star, Target, Book, Rocket, Brain, Zap, CheckCircle, Award, Lightbulb, Clock, BookOpen, TestTube } from "lucide-react"
import { ReactNode } from "react"

interface Achievement {
  id: number
  title: string
  description: string
  icon: ReactNode
  progress: number
  unlocked: boolean
  xp: number
}

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "Первые шаги",
    description: "Пройди первый уровень игры Physics Quest",
    icon: <Target className="w-8 h-8 text-primary-foreground" />,
    progress: 100,
    unlocked: true,
    xp: 50
  },
  {
    id: 2,
    title: "Новичок теории",
    description: "Прочитай 3 теоретических урока в любом разделе",
    icon: <Book className="w-8 h-8 text-primary-foreground" />,
    progress: 56,
    unlocked: false,
    xp: 100
  },
  {
    id: 3,
    title: "Гений механики",
    description: "Заверши все уровни раздела Механика",
    icon: <Trophy className="w-8 h-8 text-primary-foreground" />,
    progress: 34,
    unlocked: false,
    xp: 400
  },
  {
    id: 4,
    title: "Мастер теории",
    description: "Прочитай 10 теоретических уроков в любом разделе",
    icon: <BookOpen className="w-8 h-8 text-primary-foreground" />,
    progress: 10,
    unlocked: false,
    xp: 200
  },
  {
    id: 5,
    title: "Скоростной решатель",
    description: "Заверши практику уровня за 2 минуты",
    icon: <Rocket className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 100
  },
  {
    id: 6,
    title: "Эрудит физики",
    description: "Ответь правильно на 10 вопросов практики подряд",
    icon: <Brain className="w-8 h-8 text-primary-foreground" />,
    progress: 20,
    unlocked: false,
    xp: 250
  },
  {
    id: 7,
    title: "Звезда физики",
    description: "Достигни уровня 10",
    icon: <Star className="w-8 h-8 text-primary-foreground" />,
    progress: 10,
    unlocked: false,
    xp: 300
  },
  {
    id: 8,
    title: "Мастер точности",
    description: "Пройди контрольный тест с точностью 90% и выше",
    icon: <Target className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 200
  },
  {
    id: 9,
    title: "Электрический гений",
    description: "Заверши все уровни раздела Электродинамика",
    icon: <Zap className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 400
  },
  {
    id: 10,
    title: "Практик физики",
    description: "Реши 30 практических задач",
    icon: <CheckCircle className="w-8 h-8 text-primary-foreground" />,
    progress: 10,
    unlocked: false,
    xp: 200
  },
  {
    id: 11,
    title: "Ас контрольного теста",
    description: "Пройди 5 контрольных тестов с результатом 80% и выше",
    icon: <Award className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 250
  },
  {
    id: 12,
    title: "Волновой эксперт",
    description: "Заверши все уровни раздела Колебания и волны",
    icon: <Trophy className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 300
  },
  {
    id: 13,
    title: "Знаток оптики",
    description: "Заверши все уровни раздела Оптика",
    icon: <Lightbulb className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 300
  },
  {
    id: 14,
    title: "Теоретик физики",
    description: "Прочитай все теоретические уроки в двух разделах",
    icon: <Book className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 300
  },
  {
    id: 15,
    title: "Практик механики",
    description: "Реши 10 практических задач в разделе Механика",
    icon: <CheckCircle className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 150
  },
  {
    id: 16,
    title: "Современный физик",
    description: "Заверши все уровни раздела Современная физика",
    icon: <Brain className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 350
  },
  {
    id: 17,
    title: "Термодинамический мастер",
    description: "Заверши все уровни раздела Молекулярная физика и термодинамика",
    icon: <Trophy className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 400
  },
  {
    id: 18,
    title: "Скоростной теоретик",
    description: "Прочитай 5 теоретических уроков за один день",
    icon: <Rocket className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 150
  },
  {
    id: 19,
    title: "Искры гениальности",
    description: "Пройди 3 контрольных теста подряд с результатом 100%",
    icon: <Award className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 300
  },
  {
    id: 20,
    title: "Мастер электродинамики",
    description: "Реши 15 практических задач в разделе Электродинамика",
    icon: <Zap className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 200
  },
  {
    id: 21,
    title: "Знаток колебаний",
    description: "Пройди все контрольные тесты в разделе Колебания и волны с результатом 80% и выше",
    icon: <CheckCircle className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 200
  },
  {
    id: 22,
    title: "Оптический гений",
    description: "Прочитай все теоретические уроки в разделе Оптика",
    icon: <Lightbulb className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 150
  },
  {
    id: 23,
    title: "Точный практик",
    description: "Реши 20 практических задач с точностью 95% и выше",
    icon: <Target className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 250
  },
  {
    id: 24,
    title: "Мастер физики",
    description: "Заверши все 20 уровней",
    icon: <Trophy className="w-8 h-8 text-primary-foreground" />,
    progress: 5,
    unlocked: false,
    xp: 1000
  },
  {
    id: 25,
    title: "Быстрый ум",
    description: "Пройди 5 контрольных тестов за один день",
    icon: <Clock className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 200
  },
  {
    id: 26,
    title: "Ученый-теоретик",
    description: "Прочитай все теоретические уроки во всех разделах",
    icon: <BookOpen className="w-8 h-8 text-primary-foreground" />,
    progress: 5,
    unlocked: false,
    xp: 500
  },
  {
    id: 27,
    title: "Лабораторный мастер",
    description: "Реши 50 практических задач во всех разделах",
    icon: <TestTube className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 400
  },
  {
    id: 28,
    title: "Искры точности",
    description: "Пройди 10 контрольных тестов с результатом 90% и выше",
    icon: <Award className="w-8 h-8 text-primary-foreground" />,
    progress: 0,
    unlocked: false,
    xp: 350
  }
]