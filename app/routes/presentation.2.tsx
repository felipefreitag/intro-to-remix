export default function Index() {
  return (
    <div className="pt-32">
      <div className="flex justify-center gap-40 lg:pt-40">
        <div>
          <h2 className="text-2xl leading-8 text-gray-900">Felipe Freitag</h2>
          <p className="mt-6 text-xl text-gray-900">
            Fundador e DX na seasoned.cc
          </p>
          <ul>
            <li className="pt-6">
              <a
                href="https://dev.to/felipefreitag"
                target="_blank"
                className="mt-6 text-xl text-gray-600"
                rel="noreferrer"
              >
                dev.to
              </a>
            </li>
            <li className="pt-6">
              <a
                href="https://linkedin.com/in/felipefreitag/"
                target="_blank"
                className="mt-6 text-xl text-gray-600"
                rel="noreferrer"
              >
                github felipefreitag
              </a>
            </li>
            <li className="pt-6">
              <a
                href="https://twitter.com/@felipefreitag2"
                target="_blank"
                className="mt-6 text-xl text-gray-600"
                rel="noreferrer"
              >
                twitter @felipefreitag2
              </a>
            </li>
            <li className="pt-6">
              <a
                href="https://linkedin.com/in/felipefreitag/"
                target="_blank"
                className="mt-6 text-xl text-gray-600"
                rel="noreferrer"
              >
                linkedin felipefreitag
              </a>
            </li>
          </ul>
        </div>

        <div>
          <img
            src="/avatar-seasoned.jpeg"
            className="rounded-full leading-none"
            alt="Felipe Freitag"
          />
        </div>
      </div>
    </div>
  )
}
