import ExternalLink from '~/ui/external-link'

export default function Index() {
  return (
    <div className="px-6 pt-32 lg:px-8">
      <div className="px-10 lg:pt-40">
        <h2 className="title">Na Seasoned</h2>
        <ul className="list-disc pl-6">
          <li className="li-primary">Migração para Remix</li>
          <li className="li-primary">Migração para React Router</li>
          <li className="li-primary">Construção de um framework</li>
          <li className="li-primary">Novos projetos em Remix</li>
          <ExternalLink href="https://remix-forms.seasoned.cc/">
            Open source: Remix forms
          </ExternalLink>
        </ul>
      </div>
    </div>
  )
}
