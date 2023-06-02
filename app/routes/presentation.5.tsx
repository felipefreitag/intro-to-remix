export default function Index() {
  return (
    <div className="pt-32">
      <div className="flex justify-center gap-40 lg:pt-40">
        <div className="max-w-xl">
          <h2 className="text-4xl leading-8 text-gray-900">Seasoned</h2>
          <ul className="list-disc pl-6">
            <li className="li-primary">Stack legado: CRA + Rails + Postgres</li>
            <li className="li-primary">Melhor DX leva a uma melhor UX</li>
            <li className="li-primary">
              Bastante conservadores com decisões técnicas
            </li>
            <li className="li-primary">
              Para nós, Remix foi uma transformação
            </li>
          </ul>
        </div>

        <div>
          <img
            src="/seasoned-logo.png"
            className="h-48 w-48 rounded-full border p-4 leading-none"
            alt="Felipe Freitag"
          />
        </div>
      </div>
    </div>
  )
}
