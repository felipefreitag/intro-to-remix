import { Link } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useHydrated } from 'remix-utils'
import { useCurrentIndex } from '~/useCurrentIndex'

export default function Footer() {
  const { currentIndex, previousIndex, nextIndex } = useCurrentIndex()
  const [isFullScreen, setIsFullScreen] = useState(false)
  const isHydrated = useHydrated()

  useEffect(() => {
    if (isHydrated) {
      const handleResize = () => {
        if (window.innerHeight == screen.height) {
          setIsFullScreen(true)
        } else {
          setIsFullScreen(false)
        }
      }
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [isHydrated])

  useEffect(() => {
    if (isHydrated) {
      const handleResize = () => {
        if (window.innerHeight == screen.height) {
          setIsFullScreen(true)
        } else {
          setIsFullScreen(false)
        }
      }
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [isHydrated])

  return (
    <footer
      className="absolute bottom-0 w-full bg-white"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="relative mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        {!isFullScreen && (
          <>
            <Link
              className="absolute -top-10 left-8 text-gray-500"
              to={`/presentation/${previousIndex}`}
              aria-label="Slide anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                />
              </svg>
            </Link>
            <Link
              className="absolute -top-10 right-8 text-gray-500"
              to={`/presentation/${nextIndex}`}
              aria-label="Próximo slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                />
              </svg>
            </Link>
          </>
        )}
        <div className="flex justify-between border-t border-gray-900/10 pt-8">
          <p className="leading-5 text-gray-500">
            Felipe Freitag - felipe@seasoned.cc - Junho 2023
          </p>
          <p className="text-gray-500">{currentIndex}</p>
        </div>
      </div>
    </footer>
  )
}
