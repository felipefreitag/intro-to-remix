import { json } from '@remix-run/node'
import { useLoaderData, type V2_MetaFunction } from '@remix-run/react'
import { db } from '~/db.server'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Latidor' }, { description: 'O app para doguitos' }]
}

export async function loader() {
  const barks = await db.bark.findMany({
    include: {
      author: true,
    },
  })
  return json({ barks })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 md:py-16">
      <ul className="divide-y divide-gray-100">
        {data.barks.map((bark) => (
          <li
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
            <a
              href={`/bark/${bark.id}`}
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
