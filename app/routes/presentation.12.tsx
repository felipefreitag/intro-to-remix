export default function Index() {
  return (
    <div className="pt-4 md:pt-32">
      <div className="text-center">
        <h1 className="title">Rotas aninhadas</h1>
        <p className="subtitle">Nested routes</p>
        <div className="flex w-full flex-col gap-4 pt-4 md:flex-row md:gap-0 md:pt-8">
          <img
            className="mx-auto w-full rounded border md:max-w-xl"
            src="/nested-routes.png"
            alt="nested routes"
          />
          <img
            className="mx-auto w-2/3 rounded border  md:max-w-lg"
            src="/nested-routes-files.png"
            alt="nested routes"
          />
        </div>
      </div>
    </div>
  )
}
