import type { V2_MetaFunction } from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Latidor' }, { description: 'O app para doguitos' }]
}

export default function Index() {
  const dogs = [
    {
      name: 'Pistache',
      email: 'leslie.alexander@example.com',
      imageUrl: 'https://source.unsplash.com/random/250×250/?dog',
      href: '#',
      content:
        'Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.',
    },
    {
      name: 'Bolinha',
      email: 'michael.foster@example.com',
      imageUrl: 'https://source.unsplash.com/random/250×250/?dog',
      href: '#',
      content:
        'Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.',
    },
    {
      name: 'Caju',
      email: 'dries.vincent@example.com',
      imageUrl: 'https://source.unsplash.com/random/250×250/?dog',
      href: '#',
      content:
        'Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.',
    },
  ]

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 md:py-16">
      <ul className="divide-y divide-gray-100">
        {dogs.map((dog) => (
          <li
            key={dog.email}
            className="flex items-start justify-between gap-x-6 py-5"
          >
            <div className="flex gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={dog.imageUrl}
                alt="avatar"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {dog.name}
                </p>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
                  {dog.content}
                </p>
              </div>
            </div>
            <a
              href={dog.href}
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
