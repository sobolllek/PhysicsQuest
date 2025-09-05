import { LevelData } from "@/types/level"

// Dynamic level data loader
export const loadLevelData = async (section: string, levelId: number): Promise<LevelData | null> => {
  try {
    const module = await import(`@/data/${section}/level_${levelId}.json`)
    return module.default
  } catch (error) {
    console.error(`Failed to load level ${levelId} from section ${section}:`, error)
    return null
  }
}

// Get all available levels for a section
export const getSectionLevels = async (section: string): Promise<LevelData[]> => {
  const levels: LevelData[] = []
  
  // Try to load levels 1-5 for each section
  for (let i = 1; i <= 5; i++) {
    try {
      const module = await import(`@/data/${section}/level_${i}.json`)
      levels.push(module.default)
    } catch {
      // Level doesn't exist, skip
      continue
    }
  }
  
  return levels
}

// Section mapping
export const sectionMapping = {
  'mechanics': 'mechanics',
  'thermodynamics': 'thermodynamics', 
  'electrodynamics': 'electrodynamics',
  'waves': 'waves',
  'quantum': 'quantum'
} as const

export type SectionKey = keyof typeof sectionMapping