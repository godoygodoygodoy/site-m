import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createUserSchema } from '@/lib/validations'
import { hashPassword } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/user - List all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            bookId: true,
          },
        },
      },
    })

    return NextResponse.json(successResponse(users))
  } catch (error) {
    return NextResponse.json(
      errorResponse('Erro ao buscar usuários', error),
      { status: 500 }
    )
  }
}

// POST /api/user - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createUserSchema.parse(body)

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        errorResponse('Email já está em uso'),
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return NextResponse.json(
      successResponse(user, 'Usuário criado com sucesso'),
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
      errorResponse('Erro ao criar usuário', error),
      { status: 500 }
    )
  }
}
