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
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
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
                Like
              </button>
            </Form>
          )}
          <Link
            to={`/barks`}
            className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Bark
