import type { ReactNode } from 'react'

const ExternalLink = ({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) => (
  <li className="li-primary">
    <a href={href} target="_blank" rel="noreferrer" className="link">
      {children}
    </a>
  </li>
)

export default ExternalLink
