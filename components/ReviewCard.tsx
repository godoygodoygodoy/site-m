'use client'

import StarRating from './StarRating'

interface Review {
  id: number
  rating: number
  comment?: string
  user: {
    id: number
    name: string
  }
}

interface ReviewCardProps {
  review: Review
  onDelete?: (id: number) => void
  showDelete?: boolean
}

export default function ReviewCard({
  review,
  onDelete,
  showDelete = false,
}: ReviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {review.user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{review.user.name}</p>
            <StarRating rating={review.rating} readonly size="sm" />
          </div>
        </div>

        {showDelete && onDelete && (
          <button
            onClick={() => onDelete(review.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Deletar review"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>

      {review.comment && (
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      )}
    </div>
  )
}
