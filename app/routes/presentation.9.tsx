export default function Index() {
  return (
    <div className="px-6 pt-32 lg:px-8">
      <div className="flex justify-center gap-0">
        <div className="max-w-xl">
          <div className="px-10">
            <h2 className="title">O que é</h2>
            <ul className="list-disc pl-6">
              <li className="li-primary">Compilador</li>
              <li className="li-primary">Server-side HTTP handler</li>
              <li className="li-primary">Server framework</li>
              <li className="li-primary">Browser framework</li>
            </ul>
          </div>
        </div>
        <img
          className="max-w-2xl rounded border"
          src="/what-is-remix.png"
          alt="what is remix schematics"
        />
      </div>
    </div>
  )
}
