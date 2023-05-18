import { json, type ActionArgs, type LoaderArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, useNavigation } from '@remix-run/react'
import { db } from '~/db.server'
import { getUser } from '~/session.server'

export async function action({ request }: ActionArgs) {
  const user = await getUser(request)

  if (!user) {
    return json(
      {
        formError: `User not logged in`,
      },
      { status: 400 },
    )
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      likesGiven: user?.likesGiven + 1,
    },
  })

  return json({ liked: true }, { status: 200 })
}

export async function loader({ request, params }: LoaderArgs) {
  const user = await getUser(request)

  const { barkId } = params

  if (barkId === undefined) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const bark = await db.bark.findUnique({
    where: { id: parseInt(barkId) },
    include: { author: true },
  })

  if (!bark) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  return { bark, user }
}

function Bark() {
  const data = useLoaderData<typeof loader>()
  const navigation = useNavigation()

  const { bark, user } = data

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 md:py-16">
      <div
        key={bark.author.email}
        className="flex items-start justify-between gap-x-6 py-5"
      >
        <div className="flex gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={bark.author.imageUrl || undefined}
            alt="avatar"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {bark.author.name}
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {bark.content}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {user && (
            <Form method="post">
              <button
                disabled={navigation.state === 'submitting'}
                className="w-full rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-inset enabled:hover:bg-indigo-800 disabled:opacity-50"
              >
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
              </button>
            </Form>
          )}
          <Link
            to={`/barks`}
            className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
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
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Bark
