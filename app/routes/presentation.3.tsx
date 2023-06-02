import ExternalLink from '~/ui/external-link'

export default function Index() {
  return (
    <div className="pt-32 md:px-6 lg:px-8">
      <div className="md:px-10">
        <h2 className="title mb-10">Agenda</h2>
        <ul className="list-disc pl-6">
          <li className="li-primary">Por que</li>
          <li className="li-primary">O que é o Remix</li>
          <li className="li-primary">Principais funcionalidades</li>
          <li className="li-primary">Experiência na Seasoned</li>
          <ExternalLink href="https://github.com/felipefreitag/intro-to-remix">
            https://github.com/felipefreitag/intro-to-remix
          </ExternalLink>
          <ExternalLink href="https://intro-to-remix.vercel.app">
            https://intro-to-remix.vercel.app
          </ExternalLink>
        </ul>
      </div>
    </div>
  )
}
