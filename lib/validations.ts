import { z } from 'zod'

// User validations
export const createUserSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

// Book validations
export const createBookSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  author: z.string().min(1, 'Autor é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
})

export const updateBookSchema = z.object({
  title: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
})

// Review validations
export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5, 'Rating deve ser entre 1 e 5'),
  comment: z.string().optional(),
  userId: z.number().int().positive(),
  bookId: z.number().int().positive(),
})

// Raffle validations
export const createRaffleSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  address: z.string().min(10, 'Endereço deve ter no mínimo 10 caracteres'),
  genre: z.string().min(1, 'Gênero é obrigatório'),
  price: z.number().positive('Preço deve ser maior que zero'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type CreateBookInput = z.infer<typeof createBookSchema>
export type UpdateBookInput = z.infer<typeof updateBookSchema>
export type CreateReviewInput = z.infer<typeof createReviewSchema>
export type CreateRaffleInput = z.infer<typeof createRaffleSchema>
