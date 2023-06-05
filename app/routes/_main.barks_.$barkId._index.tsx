import { json, type ActionArgs, type LoaderArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, useNavigation } from '@remix-run/react'
import { db } from '~/db.server'
import { getUser } from '~/session.server'
import BackIcon from '~/ui/back-icon'
import EditIcon from '~/ui/edit-icon'
import LikeIcon from '~/ui/like-icon'

export async function action({ request, params }: ActionArgs) {
  const user = await getUser(request)
  const { barkId } = params

  if (barkId === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  if (!user) {
    return json(
      {
        formError: `User not logged in`,
      },
      { status: 400 },
    )
  }

  const like = await db.like.findFirst({
    where: {
      barkId: parseInt(barkId),
      userId: user.id,
    },
  })

  if (like !== null) {
    await db.like.delete({
      where: { id: like.id },
    })
    await db.user.update({
      where: { id: user.id },
      data: {
        likesGiven: user?.likesGiven - 1,
      },
    })

    return json({ success: true }, { status: 200 })
  }

  await db.like.create({
    data: {
      barkId: parseInt(barkId),
      userId: user.id,
    },
  })

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

  const like = await db.like.findFirst({
    where: {
      barkId: parseInt(barkId),
      userId: user?.id,
    },
  })

  return { bark, user, liked: like !== null }
}

function Bark() {
  const data = useLoaderData<typeof loader>()
  const navigation = useNavigation()

  const { bark, user, liked } = data

  let optimisticLike = liked

  if (navigation.formData) {
    optimisticLike = navigation.formData.get('liked') === 'true'
  }

  const buttonCollor = optimisticLike
    ? 'bg-indigo-600 text-white hover:bg-indigo-800'
    : ''

  return (
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
          <p className="mt-1 text-sm leading-6 text-gray-600">{bark.content}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {user && (
          <>
            {user.id === bark.authorId ? (
              <Link
                to={`edit`}
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <EditIcon />
              </Link>
            ) : (
              <Form method="post">
                <button
                  className={`w-full rounded-full px-2.5 py-1 text-xs font-semibold  shadow-sm ring-1 ring-inset ${buttonCollor}`}
                >
                  <LikeIcon />
                  <input type="hidden" value={bark.id} name="barkId" />
                  <input type="hidden" value={String(!liked)} name="liked" />
                </button>
              </Form>
            )}
          </>
        )}
        <Link
          to={`/barks`}
          preventScrollReset={true}
          className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <BackIcon />
        </Link>
      </div>
    </div>
  )
}

export default Bark
