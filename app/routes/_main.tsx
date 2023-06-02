import type { LoaderArgs } from '@remix-run/node'
import { Form, Link, Outlet, useLoaderData } from '@remix-run/react'
import { getUser } from '~/session.server'
import { useHydrated } from 'remix-utils'

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request)

  return { user }
}

export default () => {
  const data = useLoaderData<typeof loader>()
  const isHydrated = useHydrated()

  let latestSlide = '1'
  if (isHydrated) {
    const cookies = Object.fromEntries(
      document.cookie.split('; ').map((x) => x.split('=')),
    )
    latestSlide = cookies.latest_slide || '1'
  }

  const user = data?.user

  return (
    <>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-baseline justify-between border-b p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-baseline gap-4">
            <Link to="/" className="">
              <span className="sr-only">InstaDog</span>
              <img
                className="-mb-2 w-8 leading-none"
                src="/dog.png"
                alt="logo"
              />
            </Link>
            <Link
              to={`/presentation/${latestSlide}`}
              className="ml-8 rounded border px-4 py-2 text-lg text-gray-600"
            >
              <button>SLIDES</button>
            </Link>
          </div>

          <div className="lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
                <p>{user.likesGiven}</p>
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={user.imageUrl || undefined}
                  alt="avatar"
                />
                <Form action="/auth/logout" method="post">
                  <button
                    type="submit"
                    className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </Form>
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 md:py-10">
        <Outlet />
      </div>
    </>
  )
}
