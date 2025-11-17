import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/review/user/[userId] - Get all reviews by a user
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId)

    if (isNaN(userId)) {
      return NextResponse.json(
        errorResponse('ID inválido'),
        { status: 400 }
      )
    }

    const reviews = await prisma.review.findMany({
      where: { userId },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            imageUrl: true,
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
