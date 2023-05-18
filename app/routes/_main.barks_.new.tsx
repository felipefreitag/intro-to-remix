import {
  json,
  type ActionArgs,
  type LoaderArgs,
  redirect,
} from '@remix-run/node'
import { Form, Link, useNavigation } from '@remix-run/react'
import { db } from '~/db.server'
import { getUser } from '~/session.server'

export async function action({ request, params }: ActionArgs) {
  const user = await getUser(request)

  if (!user) {
    return json(
      {
        formError: `User not logged in`,
      },
      { status: 400 },
    )
  }

  const form = await request.formData()
  const content = form.get('content')

  if (typeof content !== 'string') {
    throw new Response('Bad request', {
      status: 400,
    })
  }

  const bark = await db.bark.create({
    data: { content, authorId: user.id },
  })

  return redirect(`/barks/${bark.id}`)
}

export async function loader({ request, params }: LoaderArgs) {
  const user = await getUser(request)

  if (!user) {
    throw redirect('/barks')
  }

  return null
}

function Bark() {
  const navigation = useNavigation()

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-bold text-lg">Novo latido</h1>
        <Link
          to={`/barks`}
          className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
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
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <div className="mt-10 sm:w-full">
          <Form className="space-y-6" method="post">
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Conteúdo
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows={5}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={navigation.state === 'submitting'}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 enabled:hover:bg-indigo-500"
              >
                Salvar
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Bark
