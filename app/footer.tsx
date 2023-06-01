import { useCurrentIndex } from './useCurrentIndex'

export default function Footer() {
  const currentIndex = useCurrentIndex()

  return (
    <footer
      className="absolute bottom-0 w-full bg-white"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <div className="flex justify-between border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="leading-5 text-gray-500">
            Felipe Freitag - felipe@seasoned.cc - Junho 2023
          </p>
          <p className="text-gray-500">{currentIndex}</p>
        </div>
      </div>
    </footer>
  )
}
