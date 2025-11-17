'use client'

import Link from 'next/link'
import StarRating from './StarRating'

interface Book {
  id: number
  title: string
  author: string
  category: string
  description?: string
  imageUrl?: string
  reviews?: Array<{ rating: number }>
}

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const averageRating =
    book.reviews && book.reviews.length > 0
      ? book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length
      : 0

  return (
    <Link href={`/book/${book.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        {book.imageUrl ? (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg
              className="w-24 h-24 text-white opacity-50"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
        )}

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">por {book.author}</p>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-3 w-fit">
            {book.category}
          </span>

          {book.description && (
            <p className="text-sm text-gray-700 line-clamp-3 mb-3">
              {book.description}
            </p>
          )}

          <div className="mt-auto flex items-center gap-2">
            <StarRating rating={Math.round(averageRating)} readonly size="sm" />
            {book.reviews && book.reviews.length > 0 && (
              <span className="text-sm text-gray-500">
                ({book.reviews.length} {book.reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
