export default function Index() {
  return (
    <div className="p-8 px-6 md:pt-32 lg:px-8">
      <div className="flex flex-col justify-center gap-0 md:flex-row">
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
          className="mt-4 w-full rounded border md:mt-0 md:max-w-2xl"
          src="/what-is-remix.png"
          alt="what is remix schematics"
        />
      </div>
    </div>
  )
}
