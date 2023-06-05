import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData, type V2_MetaFunction } from '@remix-run/react'
import { db } from '~/db.server'
import { getUser } from '~/session.server'
import NewIcon from '~/ui/new-icon'
import ViewIcon from '~/ui/view-icon'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'InstaDog' }, { description: 'O app para doguitos' }]
}

export async function loader({ request, params }: LoaderArgs) {
  const user = await getUser(request)

  const barks = await db.bark.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return json({ barks, user })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  const { user, barks } = data

  return (
    <>
      <div className="mb-10 flex justify-between">
        <h1 className="text-bold text-lg">Latidos</h1>
        {user && (
          <Link
            to={`/barks/new`}
            className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 enabled:hover:bg-indigo-800"
          >
            <NewIcon />
          </Link>
        )}
      </div>
      <ul className="divide-y divide-gray-100 overflow-y-scroll">
        {barks.map((bark) => (
          <li
            key={bark.id}
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
            <Link
              to={`/barks/${bark.id}`}
              preventScrollReset={true}
              prefetch="intent"
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <ViewIcon />
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
