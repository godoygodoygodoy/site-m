import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateBookSchema } from '@/lib/validations'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/book/[id] - Get book by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = parseInt(params.id)

    if (isNaN(bookId)) {
      return NextResponse.json(
        errorResponse('ID inválido'),
        { status: 400 }
      )
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        reviews: {
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
        },
      },
    })

    if (!book) {
      return NextResponse.json(
        errorResponse('Livro não encontrado'),
        { status: 404 }
      )
    }

    return NextResponse.json(successResponse(book))
  } catch (error) {
    return NextResponse.json(
      errorResponse('Erro ao buscar livro', error),
      { status: 500 }
    )
  }
}

// PUT /api/book/[id] - Update book
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = parseInt(params.id)

    if (isNaN(bookId)) {
      return NextResponse.json(
        errorResponse('ID inválido'),
        { status: 400 }
      )
    }

    const body = await request.json()
    const validatedData = updateBookSchema.parse(body)

    const existingBook = await prisma.book.findUnique({
      where: { id: bookId },
    })

    if (!existingBook) {
      return NextResponse.json(
        errorResponse('Livro não encontrado'),
        { status: 404 }
      )
    }

    const book = await prisma.book.update({
      where: { id: bookId },
      data: validatedData,
      include: {
        reviews: true,
      },
    })

    return NextResponse.json(
      successResponse(book, 'Livro atualizado com sucesso')
    )
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        errorResponse('Dados inválidos', error.errors),
        { status: 400 }
      )
    }

    return NextResponse.json(
      errorResponse('Erro ao atualizar livro', error),
      { status: 500 }
    )
  }
}

// DELETE /api/book/[id] - Delete book
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = parseInt(params.id)

    if (isNaN(bookId)) {
      return NextResponse.json(
        errorResponse('ID inválido'),
        { status: 400 }
      )
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    })

    if (!book) {
      return NextResponse.json(
        errorResponse('Livro não encontrado'),
        { status: 404 }
      )
    }

    await prisma.book.delete({
      where: { id: bookId },
    })

    return NextResponse.json(
      successResponse(null, 'Livro deletado com sucesso')
    )
  } catch (error) {
    return NextResponse.json(
      errorResponse('Erro ao deletar livro', error),
      { status: 500 }
    )
  }
}
