import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/review/book/[bookId] - Get all reviews for a book
export async function GET(
  request: NextRequest,
  context: { params: { bookId: string } }
) {
  try {
    const { bookId } = context.params
    const bookIdParsed = parseInt(bookId)

    if (isNaN(bookIdParsed)) {
      return NextResponse.json(
        errorResponse('ID inválido'),
        { status: 400 }
      )
    }

    const reviews = await prisma.review.findMany({
      where: { bookId: bookIdParsed },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    })

    return NextResponse.json(successResponse(reviews))
  } catch (error) {
    return NextResponse.json(
      errorResponse('Erro ao buscar reviews', error),
      { status: 500 }
    )
  }
}
