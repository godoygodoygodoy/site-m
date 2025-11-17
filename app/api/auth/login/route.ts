import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/lib/validations'
import { comparePassword } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api-response'

// POST /api/auth/login - User login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        errorResponse('Email ou senha inválidos'),
        { status: 401 }
      )
    }

    const isPasswordValid = await comparePassword(
      validatedData.password,
      user.password
    )

    if (!isPasswordValid) {
      return NextResponse.json(
        errorResponse('Email ou senha inválidos'),
        { status: 401 }
      )
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(
      successResponse(userWithoutPassword, 'Login realizado com sucesso')
    )
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        errorResponse('Dados inválidos', error.errors),
        { status: 400 }
      )
    }

    return NextResponse.json(
      errorResponse('Erro ao fazer login', error),
      { status: 500 }
    )
  }
}
