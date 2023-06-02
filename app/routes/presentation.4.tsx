import ExternalLink from '~/ui/external-link'

export default function Index() {
  return (
    <div className="pt-32">
      <div className="flex justify-center md:gap-40 lg:pt-40">
        <div className="max-w-xl">
          <h2 className="text-lg leading-8 text-gray-900 md:text-4xl">
            <span onClick={() => alert('Sísând, seasonédi, seasonêd...')}>
              Seasoned
            </span>
          </h2>
          <p className="mt-6 text-base text-gray-600 md:text-3xl">
            Dev shop fundada em 2018
          </p>
          <ul className="list-disc pl-6">
            <ExternalLink href="https://seasoned.cc">site</ExternalLink>
            <li className="li-primary">Clientes nos EUA, Brasil</li>
            <li className="li-primary">
              MVPs, apps B2B, de conteúdo, internos...
            </li>
            <li className="li-primary">Apps com ótima UX + DX</li>
            <li className="li-primary">Sempre buscando 10x produtividade</li>
          </ul>
        </div>

        <div>
          <img
            src="/seasoned-logo.png"
            className="side-img md:p-4"
            alt="Seasoned"
          />
        </div>
      </div>
    </div>
  )
}
