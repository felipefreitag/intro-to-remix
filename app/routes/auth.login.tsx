import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, Link, useNavigation } from '@remix-run/react'
import { createUserSession, login } from '~/session.server'

const badRequest = (data: ActionData) => json(data, { status: 400 })

type ActionData = {
  formError?: string
  fieldErrors?: {
    email: string | undefined
    password: string | undefined
  }
  fields?: {
    email: string
    password: string
  }
}

function validateEmail(email: unknown) {
  if (typeof email !== 'string' || email.length < 3) {
    return `Emails must be at least 3 characters long`
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 6) {
    return `Passwords must be at least 6 characters long`
  }
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData()
  const email = form.get('email')
  const password = form.get('password')
  const redirectTo = form.get('redirectTo') || '/barks'

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    console.log('types error')
    return badRequest({
      formError: `Form not submitted correctly.`,
    })
  }

  const fields = { email, password }
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields })

  const user = await login({ email, password })

  if (!user) {
    return badRequest({
      fields,
      formError: `Email/Password combination is incorrect`,
    })
  }
  return createUserSession(user.id, redirectTo)
}

export default function Login() {
  const navigation = useNavigation()

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="/dog.png" alt="InstaDog" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" method="post">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
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
                Fazer login
              </button>
            </div>
          </Form>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Voltar para home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
