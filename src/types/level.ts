export interface Question {
  id: string
  type: 'single-choice' | 'multiple-choice' | 'number-input' | 'formula-match'
  question: string
  options?: string[]
  correctAnswer: string | string[] | number
  explanation?: string
  hints?: string[]
}

export interface LevelStep {
  id: string
  type: 'theory' | 'practice' | 'validation' | 'control-test'
  title: string
  content?: string
  questions?: Question[]
  timeLimit?: number 
  passScore?: number 
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

export interface LevelProgress {
  levelId: number
  currentStep: number
  stepScores: { [stepId: string]: number }
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