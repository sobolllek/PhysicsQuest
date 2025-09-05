export interface Level {
  id: number
  title: string
  isUnlocked: boolean
  isCompleted: boolean
  isCurrent?: boolean
}

export interface PhysicsSection {
  id: string
  title: string
  levels: Level[]
}

// Mock data - will be replaced with JSON files later
export const physicsSections: PhysicsSection[] = [
  {
    id: 'mechanics',
    title: 'Механика',
    levels: [
      { id: 1, title: 'Кинематика', isUnlocked: true, isCompleted: false, isCurrent: true },
      { id: 2, title: 'Динамика', isUnlocked: false, isCompleted: false },
      { id: 3, title: 'Статика', isUnlocked: false, isCompleted: false },
      { id: 4, title: 'Законы сохранения', isUnlocked: false, isCompleted: false },
      { id: 5, title: 'Колебания', isUnlocked: false, isCompleted: false },
    ]
  },
  {
    id: 'thermodynamics',
    title: 'Термодинамика',
    levels: [
      { id: 6, title: 'Молекулярная теория', isUnlocked: false, isCompleted: false },
      { id: 7, title: 'Идеальный газ', isUnlocked: false, isCompleted: false },
      { id: 8, title: 'Первый закон', isUnlocked: false, isCompleted: false },
      { id: 9, title: 'Второй закон', isUnlocked: false, isCompleted: false },
      { id: 10, title: 'Энтропия', isUnlocked: false, isCompleted: false },
    ]
  },
  {
    id: 'electrodynamics',
    title: 'Электродинамика',
    levels: [
      { id: 11, title: 'Электростатика', isUnlocked: false, isCompleted: false },
      { id: 12, title: 'Постоянный ток', isUnlocked: false, isCompleted: false },
      { id: 13, title: 'Магнетизм', isUnlocked: false, isCompleted: false },
      { id: 14, title: 'Индукция', isUnlocked: false, isCompleted: false },
      { id: 15, title: 'Переменный ток', isUnlocked: false, isCompleted: false },
    ]
  },
  {
    id: 'waves',
    title: 'Колебания и Волны',
    levels: [
      { id: 16, title: 'Механические колебания', isUnlocked: false, isCompleted: false },
      { id: 17, title: 'Звуковые волны', isUnlocked: false, isCompleted: false },
      { id: 18, title: 'Электромагнитные волны', isUnlocked: false, isCompleted: false },
      { id: 19, title: 'Оптика', isUnlocked: false, isCompleted: false },
      { id: 20, title: 'Интерференция', isUnlocked: false, isCompleted: false },
    ]
  },
  {
    id: 'quantum',
    title: 'Квантовая физика',
    levels: [
      { id: 21, title: 'Фотоэффект', isUnlocked: false, isCompleted: false },
      { id: 22, title: 'Атом Бора', isUnlocked: false, isCompleted: false },
      { id: 23, title: 'Квантовая механика', isUnlocked: false, isCompleted: false },
      { id: 24, title: 'Ядерная физика', isUnlocked: false, isCompleted: false },
      { id: 25, title: 'Элементарные частицы', isUnlocked: false, isCompleted: false },
    ]
  },
]

export const userProgress = {
  currentLevel: 1,
  completedLevels: [],
  rank: 'Новичок',
  xp: 0,
  coins: 0,
}