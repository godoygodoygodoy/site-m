import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createRaffleSchema } from '@/lib/validations'
import { successResponse, errorResponse } from '@/lib/api-response'

// POST /api/raffle - Create new raffle and pick random book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createRaffleSchema.parse(body)

    // Find all books in the selected genre
    const booksInGenre = await prisma.book.findMany({
      where: {
        category: {
          equals: validatedData.genre,
          mode: 'insensitive',
        },
      },
    })

    // Check if there are books available
    if (booksInGenre.length === 0) {
      return NextResponse.json(
        errorResponse(
          `Não há livros disponíveis na categoria "${validatedData.genre}". Tente outro gênero!`
        ),
        { status: 404 }
      )
    }

    // Pick a random book
    const randomIndex = Math.floor(Math.random() * booksInGenre.length)
    const selectedBook = booksInGenre[randomIndex]

    // Create raffle entry in database
    const raffle = await prisma.raffle.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        address: validatedData.address,
        genre: validatedData.genre,
        price: validatedData.price,
        bookId: selectedBook.id,
      },
      include: {
        book: true,
      },
    })

    return NextResponse.json(
      successResponse(
        {
          raffle,
          book: selectedBook,
        },
        'Sorteio realizado com sucesso!'
      ),
      { status: 201 }
    )
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        errorResponse('Dados inválidos', error.errors),
        { status: 400 }
      )
    }

    return NextResponse.json(
      errorResponse('Erro ao realizar sorteio', error),
      { status: 500 }
    )
  }
}

// GET /api/raffle - List all raffles
export async function GET() {
  try {
    const raffles = await prisma.raffle.findMany({
      include: {
        book: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(successResponse(raffles))
  } catch (error) {
    return NextResponse.json(
      errorResponse('Erro ao buscar sorteios', error),
      { status: 500 }
    )
  }
}
