export default function Index() {
  return (
    <div className="pt-32">
      <div className="flex justify-center gap-40 lg:pt-40">
        <div className="max-w-xl">
          <h2 className="text-4xl leading-8 text-gray-900">Por que o Remix?</h2>

          <ul className="list-disc pl-6">
            <li className="li-primary">Faz tudo que a web pode fazer</li>
            <li className="li-primary">Histórico do React Router</li>
            <li className="li-primary">Fundação sólida</li>
            <li className="li-primary">Stack simplificada</li>
            <li className="li-primary">Produtividade</li>
          </ul>
        </div>

        <div>
          <img
            src="/remix-logo.png"
            className="h-48 w-48 rounded-full border leading-none"
            alt="Remix logo"
          />
        </div>
      </div>
    </div>
  )
}
