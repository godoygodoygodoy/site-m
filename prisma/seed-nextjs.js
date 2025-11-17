const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.review.deleteMany()
  await prisma.book.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Dados existentes removidos')

  // Criar usuários
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'João Silva',
        email: 'joao@example.com',
        password: await bcrypt.hash('123456', 10),
      },
    }),
    prisma.user.create({
      data: {
        name: 'Maria Santos',
        email: 'maria@example.com',
        password: await bcrypt.hash('123456', 10),
      },
    }),
    prisma.user.create({
      data: {
        name: 'Pedro Oliveira',
        email: 'pedro@example.com',
        password: await bcrypt.hash('123456', 10),
      },
    }),
  ])

  console.log(`✅ ${users.length} usuários criados`)

  // Criar livros
  const books = await Promise.all([
    prisma.book.create({
      data: {
        title: 'Harry Potter e a Pedra Filosofal',
        author: 'J.K. Rowling',
        category: 'Fantasia',
        description:
          'Harry Potter é um garoto órfão que vive infeliz com seus tios. Até que, repentinamente, ele se encontra em uma escola de magia chamada Hogwarts.',
        imageUrl: 'https://m.media-amazon.com/images/I/81ibfYk4qmL._SY466_.jpg',
      },
    }),
    prisma.book.create({
      data: {
        title: '1984',
        author: 'George Orwell',
        category: 'Ficção',
        description:
          'Winston Smith trabalha para o Ministério da Verdade em Londres, capital da Oceânia. Sua vida é controlada pelo Partido, que proíbe pensamentos contrários ao governo.',
        imageUrl: 'https://m.media-amazon.com/images/I/819js3EQwbL._SY466_.jpg',
      },
    }),
    prisma.book.create({
      data: {
        title: 'O Senhor dos Anéis',
        author: 'J.R.R. Tolkien',
        category: 'Fantasia',
        description:
          'Numa cidadezinha indolente do Condado, um jovem hobbit é encarregado de uma imensa tarefa: destruir o Anel do Poder de Sauron.',
        imageUrl: 'https://m.media-amazon.com/images/I/71V6yLA+-BL._SY466_.jpg',
      },
    }),
    prisma.book.create({
      data: {
        title: 'Dom Casmurro',
        author: 'Machado de Assis',
        category: 'Romance',
        description:
          'A história de Bentinho e Capitu, uma das mais famosas da literatura brasileira, repleta de dúvidas e ciúmes.',
        imageUrl: 'https://m.media-amazon.com/images/I/71UNXfNaZpL._SY466_.jpg',
      },
    }),
    prisma.book.create({
      data: {
        title: 'O Pequeno Príncipe',
        author: 'Antoine de Saint-Exupéry',
        category: 'Infantil',
        description:
          'Um piloto cai com seu avião no deserto e encontra um pequeno príncipe, que lhe conta sobre sua jornada por diferentes planetas.',
        imageUrl: 'https://m.media-amazon.com/images/I/71OZY035QKL._SY466_.jpg',
      },
    }),
    prisma.book.create({
      data: {
        title: 'A Culpa é das Estrelas',
        author: 'John Green',
        category: 'Romance',
        description:
          'Hazel Grace Lancaster é uma paciente terminal. Quando conhece Augustus Waters em um Grupo de Apoio, sua vida muda completamente.',
        imageUrl: 'https://m.media-amazon.com/images/I/71R5sS-RzYL._SY466_.jpg',
      },
    }),
  ])

  console.log(`✅ ${books.length} livros criados`)

  // Criar reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment:
          'Livro incrível! A história de Harry Potter é envolvente do início ao fim. Recomendo muito!',
        userId: users[0].id,
        bookId: books[0].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment:
          'Um clássico da literatura que todos deveriam ler. A visão de Orwell sobre o futuro é assustadoramente atual.',
        userId: users[1].id,
        bookId: books[1].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment:
          'Épico! A construção do mundo de Tolkien é magistral. Única crítica: um pouco longo em alguns momentos.',
        userId: users[2].id,
        bookId: books[2].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'Machado de Assis é genial! A dúvida sobre Capitu me persegue até hoje.',
        userId: users[0].id,
        bookId: books[3].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment:
          'Leitura obrigatória para todas as idades. Simples, profundo e emocionante.',
        userId: users[1].id,
        bookId: books[4].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment:
          'História linda e emocionante. Prepare os lenços! Me fez refletir muito sobre a vida.',
        userId: users[2].id,
        bookId: books[5].id,
      },
    }),
  ])

  console.log(`✅ ${reviews.length} reviews criados`)

  console.log('\n🎉 Seed concluído com sucesso!\n')
  console.log('📊 Resumo:')
  console.log(`   - ${users.length} usuários`)
  console.log(`   - ${books.length} livros`)
  console.log(`   - ${reviews.length} reviews`)
  console.log('\n💡 Credenciais de teste:')
  console.log('   Email: joao@example.com | Senha: 123456')
  console.log('   Email: maria@example.com | Senha: 123456')
  console.log('   Email: pedro@example.com | Senha: 123456')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
