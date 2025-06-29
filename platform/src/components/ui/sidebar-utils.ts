import { useEffect, useState } from "react"

// Random width between 50 to 90%.
export const generateRandomWidth = () => {
  return `${Math.floor(Math.random() * 40) + 50}%`
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
} 