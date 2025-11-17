import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createReviewSchema } from '@/lib/validations'
import { successResponse, errorResponse } from '@/lib/api-response'

// POST /api/review - Create new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createReviewSchema.parse(body)

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: validatedData.userId },
    })

    if (!user) {
      return NextResponse.json(
        errorResponse('Usuário não encontrado'),
        { status: 404 }
      )
    }

    // Verify book exists
    const book = await prisma.book.findUnique({
      where: { id: validatedData.bookId },
    })

    if (!book) {
      return NextResponse.json(
        errorResponse('Livro não encontrado'),
        { status: 404 }
      )
    }

    const review = await prisma.review.create({
      data: validatedData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        book: {
          select: {
            id: true,
            title: true,
            author: true,
          },
        },
      },
    })

    return NextResponse.json(
      successResponse(review, 'Review criado com sucesso'),
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
      errorResponse('Erro ao criar review', error),
      { status: 500 }
    )
  }
}
