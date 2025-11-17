'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ReviewCard from '@/components/ReviewCard'

interface User {
  id: number
  name: string
  email: string
}

interface Review {
  id: number
  rating: number
  comment?: string
  book: {
    id: number
    title: string
    author: string
  }
  user: {
    id: number
    name: string
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    fetchReviews(parsedUser.id)
  }, [])

  const fetchReviews = async (userId: number) => {
    try {
      const response = await fetch(`/api/review/user/${userId}`)
      const data = await response.json()

      if (data.success) {
        setReviews(data.data)
      }
    } catch (error) {
      console.error('Erro ao buscar reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm('Tem certeza que deseja deletar este review?')) {
      return
    }

    try {
      const response = await fetch(`/api/review/${reviewId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success && user) {
        // Refresh reviews
        fetchReviews(user.id)
      }
    } catch (error) {
      console.error('Erro ao deletar review:', error)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">ID: {user.id}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Meus Reviews ({reviews.length})
        </h2>

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Nenhum review ainda
            </h3>
            <p className="mt-2 text-gray-500">
              Comece avaliando seus livros favoritos!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {review.book.title}
                  </h3>
                  <p className="text-sm text-gray-600">por {review.book.author}</p>
                </div>
                <ReviewCard
                  review={review}
                  onDelete={handleDeleteReview}
                  showDelete={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
