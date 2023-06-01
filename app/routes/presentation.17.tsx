import ExternalLink from '~/ui/external-link'

export default function Index() {
  return (
    <div className="px-6 pt-32 lg:px-8">
      <h2 className="title">Recursos</h2>

      <ul className="list-disc pl-6">
        <ExternalLink href="https://remix.run">Remix</ExternalLink>
        <ExternalLink href="https://reactrouter.com">React Router</ExternalLink>
        <ExternalLink href="https://github.com/remix-run/remix/releases">
          Releases do Remix
        </ExternalLink>
        <ExternalLink href="https://rmx.as/discord">
          Discord oficial
        </ExternalLink>
      </ul>
    </div>
  )
}
