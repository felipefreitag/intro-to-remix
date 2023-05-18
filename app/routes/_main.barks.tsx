import { json } from '@remix-run/node'
import { Link, useLoaderData, type V2_MetaFunction } from '@remix-run/react'
import { db } from '~/db.server'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'InstaDog' }, { description: 'O app para doguitos' }]
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
          <Link
            to={`/barks/${bark.id}`}
            prefetch="intent"
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
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  )
}
