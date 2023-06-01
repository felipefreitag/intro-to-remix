import { useMatches } from '@remix-run/react'

const useCurrentIndex = () => {
  const match = useMatches()
  const [currentRoute] = match.slice(-1)
  const currentIndex = currentRoute.id.split('.')[1]
  return Number(currentIndex)
}

export { useCurrentIndex }
