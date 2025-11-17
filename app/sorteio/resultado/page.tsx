'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Raffle {
  id: number
  name: string
  email: string
  address: string
  genre: string
  price: number
  createdAt: string
  book: {
    id: number
    title: string
    author: string
    category: string
    description?: string
    imageUrl?: string
  }
}

function ResultadoContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const raffleId = searchParams.get('id')

  const [raffle, setRaffle] = useState<Raffle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!raffleId) {
      setError('ID do sorteio não fornecido')
      setLoading(false)
      return
    }

    fetchRaffle()
  }, [raffleId])

  const fetchRaffle = async () => {
    try {
      const response = await fetch(`/api/raffle/${raffleId}`)
      const data = await response.json()

      if (data.success) {
        setRaffle(data.data)
      } else {
        setError(data.message || 'Sorteio não encontrado')
      }
    } catch (error) {
      setError('Erro ao buscar resultado do sorteio')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        <p className="text-gray-600 mt-4 text-lg">Carregando resultado...</p>
      </div>
    )
  }

  if (error || !raffle) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <svg
            className="mx-auto h-16 w-16 text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Ops!</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <Link
            href="/sorteio"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Tentar Novamente
          </Link>
        </div>
      </div>
    )
  }

  const book = raffle.book

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-4xl font-bold mb-2">Parabéns, {raffle.name.split(' ')[0]}!</h1>
        <p className="text-xl opacity-90">Este é o livro sorteado para você!</p>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-100">
            {book.imageUrl ? (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
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
              <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                {book.category}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {book.title}
            </h2>

            <p className="text-xl text-gray-600 mb-6">
              por <span className="font-semibold">{book.author}</span>
            </p>

            {book.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Sobre o livro:
                </h3>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
            )}

            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Pedido Confirmado!
              </h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✓ Pagamento processado com sucesso</li>
                <li>✓ Livro será enviado para: {raffle.address}</li>
                <li>✓ Confirmação enviada para: {raffle.email}</li>
                <li>✓ Previsão de entrega: 7 dias úteis</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Link
                href="/"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-center font-semibold"
              >
                Voltar para Home
              </Link>
              <Link
                href={`/book/${book.id}`}
                className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors text-center font-semibold"
              >
                Ver Detalhes do Livro
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-3">📬 Próximos Passos:</h3>
        <ol className="text-sm text-blue-700 space-y-2">
          <li>1. Você receberá um email de confirmação em breve</li>
          <li>2. O livro será enviado para o endereço informado</li>
          <li>3. Acompanhe o código de rastreamento no seu email</li>
          <li>4. Aproveite sua leitura! 📚</li>
        </ol>
      </div>
    </div>
  )
}

export default function ResultadoPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      }
    >
      <ResultadoContent />
    </Suspense>
  )
}
