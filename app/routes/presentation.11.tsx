export default function Index() {
  return (
    <div className="px-6 pt-4 md:pt-32 lg:px-8">
      <div className="px-10">
        <h2 className="title mb-4 md:mb-10">Principais funcionalidades</h2>
        <ul className="list-disc pl-6">
          <li className="li-primary">Rotas aninhadas</li>
          <li className="li-primary">
            Leitura, escrita e revalidação de dados
          </li>
          <li className="li-primary">Melhoria progressiva</li>
          <li className="li-primary">Padrões web</li>
          <li className="li-primary">Cliente + servidor (Remix)</li>
          <li className="li-primary">Apenas cliente (React Router)</li>
          <li className="li-primary">Deploy em qualquer lugar</li>
        </ul>
      </div>
    </div>
  )
}
