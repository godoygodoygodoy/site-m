'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'

interface Book {
  id: number
  title: string
  author: string
  category: string
  description?: string
  imageUrl?: string
  reviews: Array<{
    id: number
    rating: number
    comment?: string
    user: {
      id: number
      name: string
    }
  }>
}

export default function BookPage() {
  const params = useParams()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchBook()
    }
  }, [params.id])

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/book/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setBook(data.data)
      }
    } catch (error) {
      console.error('Erro ao buscar livro:', error)
    } finally {
      setLoading(false)
    }
  }

  const averageRating =
    book && book.reviews.length > 0
      ? book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length
      : 0

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Livro não encontrado</h2>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            {book.imageUrl ? (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-white opacity-50"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
            )}
          </div>

          <div className="md:w-2/3 p-8">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {book.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">por {book.author}</p>

            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={Math.round(averageRating)} readonly size="lg" />
              <span className="text-lg text-gray-600">
                {averageRating.toFixed(1)} ({book.reviews.length}{' '}
                {book.reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {book.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Descrição
                </h2>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
            )}

            <button
              onClick={() => router.push(`/review/new?bookId=${book.id}`)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Adicionar Review
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h2>

        {book.reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Ainda não há reviews para este livro. Seja o primeiro!
          </p>
        ) : (
          <div className="space-y-4">
            {book.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
