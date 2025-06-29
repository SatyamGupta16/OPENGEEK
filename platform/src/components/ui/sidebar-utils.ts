import { useMemo } from "react"

// Random width between 50 to 90%.
export const generateRandomWidth = () => {
  return `${Math.floor(Math.random() * 40) + 50}%`
} 