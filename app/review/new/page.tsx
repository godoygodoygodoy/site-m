'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import StarRating from '@/components/StarRating'

function ReviewForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookId = searchParams.get('bookId')

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!bookId) {
      setError('ID do livro não fornecido')
      return
    }

    if (!userId) {
      setError('Por favor, informe seu ID de usuário')
      return
    }

    if (rating === 0) {
      setError('Por favor, selecione uma avaliação')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          comment: comment || undefined,
          userId: parseInt(userId),
          bookId: parseInt(bookId),
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/book/${bookId}`)
      } else {
        setError(data.message || 'Erro ao criar review')
      }
    } catch (error) {
      setError('Erro ao criar review')
    } finally {
      setLoading(false)
    }
  }

  if (!bookId) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">ID do livro não fornecido</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Adicionar Review
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seu ID de Usuário *
            </label>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite seu ID"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Você pode encontrar seu ID na página de perfil
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avaliação *
            </label>
            <StarRating rating={rating} onRatingChange={setRating} size="lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentário (opcional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Compartilhe sua opinião sobre o livro..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400"
            >
              {loading ? 'Enviando...' : 'Enviar Review'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function NewReviewPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Carregando...</div>}>
      <ReviewForm />
    </Suspense>
  )
}
