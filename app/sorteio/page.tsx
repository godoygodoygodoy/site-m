'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const RAFFLE_PRICE = 19.90

const GENRES = [
  'Ficção',
  'Fantasia',
  'Romance',
  'Terror',
  'Suspense',
  'Aventura',
  'Biografia',
  'História',
  'Infantil',
  'Autoajuda',
]

export default function SorteioPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    number: '',
    city: '',
    state: '',
    genre: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate form
    if (!formData.name || !formData.email || !formData.street || !formData.number || !formData.city || !formData.state || !formData.genre) {
      setError('Por favor, preencha todos os campos')
      setLoading(false)
      return
    }

    // Combine address
    const fullAddress = `${formData.street}, ${formData.number} - ${formData.city}, ${formData.state}`

    try {
      const response = await fetch('/api/raffle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          address: fullAddress,
          genre: formData.genre,
          price: RAFFLE_PRICE,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to result page with raffle ID
        router.push(`/sorteio/resultado?id=${data.data.raffle.id}`)
      } else {
        setError(data.message || 'Erro ao realizar sorteio')
      }
    } catch (error) {
      setError('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎁 Sorteio de Livros
          </h1>
          <p className="text-gray-600 text-lg">
            Participe do sorteio e ganhe um livro do gênero que você mais gosta!
          </p>
          <div className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-2xl font-bold">
            R$ {RAFFLE_PRICE.toFixed(2)}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="João Silva"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Endereço de Entrega
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rua *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Rua das Flores"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número *
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="São Paulo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="SP"
                  maxLength={2}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gênero Literário Preferido *
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Selecione um gênero</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Como funciona:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✓ Escolha seu gênero literário favorito</li>
              <li>✓ Realize o pagamento de R$ {RAFFLE_PRICE.toFixed(2)}</li>
              <li>✓ Receba um livro aleatório do gênero escolhido</li>
              <li>✓ Entrega em até 7 dias úteis</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processando...' : '🎲 Pagar e Sortear'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            * Pagamento simulado. Em produção, seria integrado com gateway de pagamento real.
          </p>
        </form>
      </div>
    </div>
  )
}
