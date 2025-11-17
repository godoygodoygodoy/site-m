import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createBookSchema } from '@/lib/validations'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/book - List all books with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const author = searchParams.get('author')

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (category) {
      where.category = category
    }

    if (author) {
      where.author = { contains: author, mode: 'insensitive' }
    }

    const books = await prisma.book.findMany({
      where,
      include: {
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    })

    return NextResponse.json(successResponse(books))
  } catch (error) {
    return NextResponse.json(
      errorResponse('Erro ao buscar livros', error),
      { status: 500 }
    )
  }
}

// POST /api/book - Create new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createBookSchema.parse(body)

    const book = await prisma.book.create({
      data: validatedData,
      include: {
        reviews: true,
      },
    })

    return NextResponse.json(
      successResponse(book, 'Livro criado com sucesso'),
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
      errorResponse('Erro ao criar livro', error),
      { status: 500 }
    )
  }
}
