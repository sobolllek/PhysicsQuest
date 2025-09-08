export interface Level {
  id: number
  title: string
  isUnlocked: boolean
  isCompleted: boolean
  isCurrent?: boolean
  icon: string // путь к svg
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
      { id: 4, title: 'Статика', isUnlocked: false, isCompleted: false, icon: '/icons/statics.svg' },
      { id: 5, title: 'Гравитация', isUnlocked: false, isCompleted: false, icon: '/icons/gravity.svg' },
    ]
  },
  {
    id: 'molecular',
    title: 'Молекулярная физика',
    levels: [
      { id: 6, title: 'Молекулярно-кинетическая теория', isUnlocked: false, isCompleted: false, icon: '/icons/molecular-kinetic-theory.svg' },
      { id: 7, title: 'Идеальный газ', isUnlocked: false, isCompleted: false, icon: '/icons/ideal-gas.svg' },
      { id: 8, title: 'Теплоёмкость и теплопередача', isUnlocked: false, isCompleted: false, icon: '/icons/heat-capacity.svg' },
    ]
  },
  {
    id: 'thermodynamics',
    title: 'Термодинамика',
    levels: [
      { id: 9, title: 'Первый закон термодинамики', isUnlocked: false, isCompleted: false, icon: '/icons/first-law-thermodynamics.svg' },
      { id: 10, title: 'Второй закон термодинамики', isUnlocked: false, isCompleted: false, icon: '/icons/second-law-thermodynamics.svg' },
      { id: 11, title: 'Энтропия и тепловые машины', isUnlocked: false, isCompleted: false, icon: '/icons/entropy-thermal-machines.svg' },
    ]
  },
  {
    id: 'electrodynamics',
    title: 'Электродинамика',
    levels: [
      { id: 12, title: 'Электростатика', isUnlocked: false, isCompleted: false, icon: '/icons/electrostatics.svg' },
      { id: 13, title: 'Постоянный ток', isUnlocked: false, isCompleted: false, icon: '/icons/direct-current.svg' },
      { id: 14, title: 'Магнетизм', isUnlocked: false, isCompleted: false, icon: '/icons/magnetism.svg' },
      { id: 15, title: 'Электромагнитная индукция', isUnlocked: false, isCompleted: false, icon: '/icons/electromagnetic-induction.svg' },
      { id: 16, title: 'Переменный ток', isUnlocked: false, isCompleted: false, icon: '/icons/alternating-current.svg' },
    ]
  },
  {
    id: 'waves',
    title: 'Колебания и волны',
    levels: [
      { id: 17, title: 'Механические колебания', isUnlocked: false, isCompleted: false, icon: '/icons/mechanical-oscillations.svg' },
      { id: 18, title: 'Звуковые волны', isUnlocked: false, isCompleted: false, icon: '/icons/sound-waves.svg' },
      { id: 19, title: 'Электромагнитные волны', isUnlocked: false, isCompleted: false, icon: '/icons/electromagnetic-waves.svg' },
      { id: 20, title: 'Оптика', isUnlocked: false, isCompleted: false, icon: '/icons/optics.svg' },
    ]
  },
  {
    id: 'relativity',
    title: 'Элементы теории относительности',
    levels: [
      { id: 21, title: 'Принципы относительности', isUnlocked: false, isCompleted: false, icon: '/icons/relativity-principles.svg' },
      { id: 22, title: 'Связь массы и энергии', isUnlocked: false, isCompleted: false, icon: '/icons/mass-energy.svg' },
    ]
  },
  {
    id: 'quantum',
    title: 'Квантовая физика и атомное ядро',
    levels: [
      { id: 23, title: 'Фотоэффект', isUnlocked: false, isCompleted: false, icon: '/icons/photoeffect.svg' },
      { id: 24, title: 'Модель атома Бора', isUnlocked: false, isCompleted: false, icon: '/icons/bohr-model.svg' },
      { id: 25, title: 'Элементы квантовой механики', isUnlocked: false, isCompleted: false, icon: '/icons/quantum-mechanics.svg' },
      { id: 26, title: 'Физика атомного ядра', isUnlocked: false, isCompleted: false, icon: '/icons/nuclear-physics.svg' },
      { id: 27, title: 'Элементарные частицы', isUnlocked: false, isCompleted: false, icon: '/icons/elementary-particles.svg' },
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