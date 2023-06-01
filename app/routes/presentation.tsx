import { Outlet, useMatches, useNavigate } from '@remix-run/react'

export default () => {
  const navigate = useNavigate()
  const match = useMatches()
  const [currentRoute] = match.slice(-1)
  const currentIndex = currentRoute.id.split('.')[1]
  const MIN_SLIDE = 1
  const MAX_SLIDE = 2
  const prevIndex = Math.max(Number(currentIndex) - 1, MIN_SLIDE)
  const nextIndex = Math.min(Number(currentIndex) + 1, MAX_SLIDE)

  return (
    <div
      tabIndex={0}
      aria-label="Left navigates back, right navigates to the next slide"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          navigate(`/presentation/${prevIndex}`)
        } else if (event.key === 'ArrowRight') {
          navigate(`/presentation/${nextIndex}`)
        } else return
      }}
      className="relative min-h-screen bg-white"
    >
      <Outlet />
    </div>
  )
}
