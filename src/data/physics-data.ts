export interface Level {
  id: number
  title: string
  isUnlocked: boolean
  isCompleted: boolean
  isCurrent?: boolean
  icon: string
}

export interface PhysicsSection {
  id: string
  title: string
  levels: Level[]
}

export const physicsSections: PhysicsSection[] = [
  {
    id: 'mechanics',
    title: 'Механика',
    levels: [
      { id: 1, title: 'Кинематика', isUnlocked: true, isCompleted: false, isCurrent: true, icon: '/icons/kinematics.svg' },
      { id: 2, title: 'Динамика', isUnlocked: false, isCompleted: false, icon: '/icons/dynamics.svg' },
      { id: 3, title: 'Законы сохранения', isUnlocked: false, isCompleted: false, icon: '/icons/conservation-laws.svg' },
      { id: 4, title: 'Статика и жидкости', isUnlocked: false, isCompleted: false, icon: '/icons/statics-fluids.svg' },
    ]
  },
  {
    id: 'electrodynamics',
    title: 'Электродинамика',
    levels: [
      { id: 5, title: 'Электростатика', isUnlocked: false, isCompleted: false, icon: '/icons/electrostatics.svg' },
      { id: 6, title: 'Конденсаторы', isUnlocked: false, isCompleted: false, icon: '/icons/capacitors.svg' },
      { id: 7, title: 'Постоянный ток', isUnlocked: false, isCompleted: false, icon: '/icons/direct-current.svg' },
      { id: 8, title: 'Мощность тока', isUnlocked: false, isCompleted: false, icon: '/icons/current-power.svg' },
      { id: 9, title: 'Магнитное поле', isUnlocked: false, isCompleted: false, icon: '/icons/magnetism.svg' },
      { id: 10, title: 'Электромагнитная индукция', isUnlocked: false, isCompleted: false, icon: '/icons/electromagnetic-induction.svg' },
    ]
  },
  {
    id: 'oscillations-waves',
    title: 'Колебания и волны',
    levels: [
      { id: 11, title: 'Колебания', isUnlocked: false, isCompleted: false, icon: '/icons/oscillations.svg' },
      { id: 12, title: 'Переменный ток', isUnlocked: false, isCompleted: false, icon: '/icons/alternating-current.svg' },
    ]
  },
  {
    id: 'optics',
    title: 'Оптика',
    levels: [
      { id: 13, title: 'Волновая оптика', isUnlocked: false, isCompleted: false, icon: '/icons/wave-optics.svg' },
      { id: 14, title: 'Геометрическая оптика', isUnlocked: false, isCompleted: false, icon: '/icons/geometric-optics.svg' },
      { id: 15, title: 'Линзы', isUnlocked: false, isCompleted: false, icon: '/icons/lenses.svg' },
    ]
  },
  {
    id: 'modern-physics',
    title: 'Современная физика',
    levels: [
      { id: 16, title: 'Относительность и кванты', isUnlocked: false, isCompleted: false, icon: '/icons/relativity-quantum.svg' },
      { id: 17, title: 'Атом и ядро', isUnlocked: false, isCompleted: false, icon: '/icons/atom-nucleus.svg' },
    ]
  },
  {
    id: 'molecular-thermodynamics',
    title: 'Молекулярная физика и термодинамика',
    levels: [
      { id: 18, title: 'МКТ и газы', isUnlocked: false, isCompleted: false, icon: '/icons/mkt-gas-laws.svg' },
      { id: 19, title: 'Термодинамика', isUnlocked: false, isCompleted: false, icon: '/icons/thermodynamics.svg' },
      { id: 20, title: 'Агрегатные состояния', isUnlocked: false, isCompleted: false, icon: '/icons/states-of-matter.svg' },
    ]
  },
];

export const userProgress = {
  currentLevel: 1,
  completedLevels: [],
  rank: 'Новичок',
  xp: 0,
  coins: 0,
}