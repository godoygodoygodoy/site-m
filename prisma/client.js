// Configuração do Prisma Client
// Use este arquivo para importar o Prisma Client em todo o projeto

const { PrismaClient } = require('@prisma/client');

// Instância global do Prisma Client para evitar múltiplas conexões
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
