import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/raffle/[id] - Get raffle by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params
    const raffleId = parseInt(id)

    if (isNaN(raffleId)) {
      return NextResponse.json(
        errorResponse('ID inválido'),
        { status: 400 }
      )
    }

    const raffle = await prisma.raffle.findUnique({
      where: { id: raffleId },
      include: {
        book: true,
      },
    })

    if (!raffle) {
      return NextResponse.json(
        errorResponse('Sorteio não encontrado'),
        { status: 404 }
      )
    }

    return NextResponse.json(successResponse(raffle))
  } catch (error) {
    return NextResponse.json(
      errorResponse('Erro ao buscar sorteio', error),
      { status: 500 }
    )
  }
}
