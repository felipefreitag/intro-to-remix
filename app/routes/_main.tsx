import type { LoaderArgs } from '@remix-run/node'
import { Form, Link, Outlet, useLoaderData } from '@remix-run/react'
import { getUser } from '~/session.server'

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request)

  return { user }
}

export default () => {
  const data = useLoaderData<typeof loader>()

  const user = data?.user

  return (
    <>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">InstaDog</span>
              <img className="h-8 w-auto" src="/dog.png" alt="" />
            </Link>
          </div>

          <div className="lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <div className="flex items-center gap-2">
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
      <Outlet />
    </>
  )
}
