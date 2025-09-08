export interface Question {
  id: string
  type: 'single-choice' | 'multiple-choice' | 'number-input' | 'formula-match'
  question: string
  options?: string[]
  correctAnswer: string | string[] | number
  explanation?: string
  hints?: string[]
}

export interface TheorySubtopic {
  id: string
  title: string
  content: string
}

export interface TrainingQuestions {
  id: string
  questions: Question[]
  passScore?: number // процент для прохождения тренировки (по умолчанию 80%)
}

export interface LevelStep {
  id: string
  type: 'theory' | 'practice' | 'validation' | 'control-test'
  title: string
  content?: string
  subtopics?: TheorySubtopic[] // для теории с подтемами
  training?: TrainingQuestions // тренировка после теории
  questions?: Question[]
  timeLimit?: number // в секундах для контрольного теста
  passScore?: number // процент для прохождения (80% для практики, 70% для контроля)
}

export interface LevelData {
  id: number
  title: string
  description: string
  section: string
  steps: LevelStep[]
  isUnlocked: boolean
  isCompleted: boolean
  isCurrent?: boolean
  bestScore?: number
  attempts?: number
}

export interface SubtopicProgress {
  subtopicId: string
  completed: boolean
  trainingScore?: number
}

export interface LevelProgress {
  levelId: number
  currentStep: number
  stepScores: { [stepId: string]: number }
  subtopicsProgress: { [stepId: string]: SubtopicProgress[] } // прогресс по подтемам
  completed: boolean
  attempts: number
  lastAttempt?: Date
}

export interface UserProgress {
  currentLevel: number
  completedLevels: number[]
  rank: string
  xp: number
  coins: number
  levelProgress: { [levelId: number]: LevelProgress }
}