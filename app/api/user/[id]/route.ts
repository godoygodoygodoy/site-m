import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateUserSchema } from '@/lib/validations'
import { hashPassword } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/user/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id)

    if (isNaN(userId)) {
      return NextResponse.json(
        errorResponse('ID inválido'),
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        reviews: {
          include: {
            book: {
              select: {
                id: true,
                title: true,
                author: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        errorResponse('Usuário não encontrado'),
        { status: 404 }
      )
    }

    return NextResponse.json(successResponse(user))
  } catch (error) {
    return NextResponse.json(
      errorResponse('Erro ao buscar usuário', error),
      { status: 500 }
    )
  }
}

// PUT /api/user/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id)

    if (isNaN(userId)) {
      return NextResponse.json(
        errorResponse('ID inválido'),
        { status: 400 }
      )
    }

    const body = await request.json()
    const validatedData = updateUserSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!existingUser) {
      return NextResponse.json(
        errorResponse('Usuário não encontrado'),
        { status: 404 }
      )
    }

    // If updating email, check if it's already in use
    if (validatedData.email) {
      const emailInUse = await prisma.user.findFirst({
        where: {
          email: validatedData.email,
          NOT: { id: userId },
        },
      })

      if (emailInUse) {
        return NextResponse.json(
          errorResponse('Email já está em uso'),
          { status: 400 }
        )
      }
    }

    // Hash password if updating
    let updateData: any = { ...validatedData }
    if (validatedData.password) {
      updateData.password = await hashPassword(validatedData.password)
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return NextResponse.json(
      successResponse(user, 'Usuário atualizado com sucesso')
    )
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        errorResponse('Dados inválidos', error.errors),
        { status: 400 }
      )
    }

    return NextResponse.json(
      errorResponse('Erro ao atualizar usuário', error),
      { status: 500 }
    )
  }
}

// DELETE /api/user/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id)

    if (isNaN(userId)) {
      return NextResponse.json(
        errorResponse('ID inválido'),
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        errorResponse('Usuário não encontrado'),
        { status: 404 }
      )
    }

    await prisma.user.delete({
      where: { id: userId },
    })

    return NextResponse.json(
      successResponse(null, 'Usuário deletado com sucesso')
    )
  } catch (error) {
    return NextResponse.json(
      errorResponse('Erro ao deletar usuário', error),
      { status: 500 }
    )
  }
}
