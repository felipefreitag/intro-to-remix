import ExternalLink from '~/ui/external-link'

export default function Index() {
  return (
    <div className="pt-32">
      <div className="flex justify-center p-4 md:gap-40 lg:pt-40">
        <div>
          <h2 className="text-lg leading-8 text-gray-900 md:text-4xl">
            Felipe{' '}
            <span onClick={() => alert('Fráitag, Freitágui, Freitas, Frei...')}>
              Freitag
            </span>
          </h2>
          <p className="mt-6 text-base text-gray-600 md:text-3xl">
            Fundador e DX na seasoned.cc
          </p>
          <ul className="list-disc pl-6">
            <ExternalLink href="https://dev.to/felipefreitag">
              dev.to
            </ExternalLink>
            <ExternalLink href="https://github.com/felipefreitag">
              github felipefreitag
            </ExternalLink>
            <ExternalLink href="https://linkedin.com/in/felipefreitag/">
              linkedin felipefreitag
            </ExternalLink>
            <ExternalLink href="https://twitter.com/@felipefreitag2">
              twitter @felipefreitag2
            </ExternalLink>
          </ul>
        </div>

        <div>
          <img
            src="/avatar-seasoned.jpeg"
            className="side-img"
            alt="Felipe Freitag"
          />
        </div>
      </div>
    </div>
  )
}
