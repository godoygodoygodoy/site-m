import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// DELETE /api/review/[id] - Delete review
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params
    const reviewId = parseInt(id)

    if (isNaN(reviewId)) {
      return NextResponse.json(
        errorResponse('ID inválido'),
        { status: 400 }
      )
    }

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    })

    if (!review) {
      return NextResponse.json(
        errorResponse('Review não encontrado'),
        { status: 404 }
      )
    }

    await prisma.review.delete({
      where: { id: reviewId },
    })

    return NextResponse.json(
      successResponse(null, 'Review deletado com sucesso')
    )
  } catch (error) {
    return NextResponse.json(
      errorResponse('Erro ao deletar review', error),
      { status: 500 }
    )
  }
}
