import type { LoaderArgs } from '@remix-run/node'
import { Form, Link, Outlet, useLoaderData } from '@remix-run/react'
import { getUser } from '~/session.server'
import { useHydrated } from 'remix-utils'
import LikeIcon from '~/ui/like-icon'

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
              className="ml-2 rounded border px-4 py-2 text-sm text-gray-600 md:ml-8 md:text-lg"
            >
              <button>SLIDES</button>
            </Link>
          </div>

          <div className="lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <div className="flex items-center gap-3">
                <LikeIcon />
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
