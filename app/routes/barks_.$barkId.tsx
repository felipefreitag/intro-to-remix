import type { LoaderArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { db } from '~/db.server'

export async function loader({ params }: LoaderArgs) {
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

  return bark
}

function Bark() {
  const bark = useLoaderData<typeof loader>()

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
        <Link
          to={`/barks`}
          className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Back
        </Link>
      </div>
    </div>
  )
}

export default Bark
