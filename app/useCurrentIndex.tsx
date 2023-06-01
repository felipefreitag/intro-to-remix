import { useMatches } from '@remix-run/react'

const useCurrentIndex = () => {
  const match = useMatches()
  const [currentRoute] = match.slice(-1)
  const currentIndex = Number(currentRoute.id.split('.')[1])

  const MIN_SLIDE = 1
  const MAX_SLIDE = 18
  const previousIndex = Math.max(currentIndex - 1, MIN_SLIDE)
  const nextIndex = Math.min(currentIndex + 1, MAX_SLIDE)

  return { currentIndex: currentIndex, previousIndex, nextIndex }
}

export { useCurrentIndex }
