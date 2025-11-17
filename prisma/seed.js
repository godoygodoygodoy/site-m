// Script para popular o banco de dados com dados de exemplo
// Execute com: npm run prisma:seed

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes (cuidado em produção!)
  await prisma.favorito.deleteMany();
  await prisma.itemCompra.deleteMany();
  await prisma.compra.deleteMany();
  await prisma.review.deleteMany();
  await prisma.livro.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.user.deleteMany();

  // Criar Categorias
  console.log('📂 Criando categorias...');
  const categorias = await Promise.all([
    prisma.categoria.create({
      data: {
        nome: 'Ficção',
        icone: 'fa-book',
        descricao: 'Romances e histórias fictícias'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Clássicos',
        icone: 'fa-landmark',
        descricao: 'Obras clássicas da literatura'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Literatura Brasileira',
        icone: 'fa-flag',
        descricao: 'Autores nacionais'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'HQs e Mangás',
        icone: 'fa-book-open',
        descricao: 'Quadrinhos e mangás'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Fantasia',
        icone: 'fa-dragon',
        descricao: 'Mundos mágicos e fantásticos'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Suspense',
        icone: 'fa-mask',
        descricao: 'Mistério e suspense'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Romance',
        icone: 'fa-heart',
        descricao: 'Histórias de amor'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Autoajuda',
        icone: 'fa-lightbulb',
        descricao: 'Desenvolvimento pessoal'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Biografias',
        icone: 'fa-user-tie',
        descricao: 'Histórias de vida'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Negócios',
        icone: 'fa-briefcase',
        descricao: 'Empreendedorismo e gestão'
      }
    })
  ]);

  // Criar Usuários
  console.log('👥 Criando usuários...');
  const usuarios = await Promise.all([
    prisma.user.create({
      data: {
        nome: 'Maria Silva',
        email: 'maria@email.com',
        senha: '123456', // Em produção, use hash!
        telefone: '(11) 98765-4321'
      }
    }),
    prisma.user.create({
      data: {
        nome: 'João Santos',
        email: 'joao@email.com',
        senha: '123456',
        telefone: '(21) 99876-5432'
      }
    }),
    prisma.user.create({
      data: {
        nome: 'Ana Costa',
        email: 'ana@email.com',
        senha: '123456',
        telefone: '(31) 97654-3210'
      }
    })
  ]);

  // Criar Livros
  console.log('📚 Criando livros...');
  const livros = await Promise.all([
    prisma.livro.create({
      data: {
        titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
        autor: 'J.R.R. Tolkien',
        descricao: 'Uma jornada épica através da Terra Média, onde um grupo improvável de heróis deve destruir um anel poderoso antes que caia nas mãos do mal.',
        preco: 45.90,
        preco_original: 59.90,
        imagem: 'https://m.media-amazon.com/images/I/71jLBXtWJWL._SY425_.jpg',
        nota_media: 4.8,
        total_reviews: 0,
        estoque: 50,
        paginas: 576,
        ano: 2019,
        editora: 'HarperCollins',
        isbn: '9788595084742',
        destaque: true,
        mais_vendido: true,
        categoria_id: categorias[4].id
      }
    }),
    prisma.livro.create({
      data: {
        titulo: 'Harry Potter e a Pedra Filosofal',
        autor: 'J.K. Rowling',
        descricao: 'O primeiro livro da série Harry Potter, onde descobrimos o mundo mágico através dos olhos de um jovem bruxo.',
        preco: 39.90,
        preco_original: 49.90,
        imagem: 'https://m.media-amazon.com/images/I/81ibfYk4qmL._SY425_.jpg',
        nota_media: 4.9,
        total_reviews: 0,
        estoque: 80,
        paginas: 264,
        ano: 2017,
        editora: 'Rocco',
        isbn: '9788532530787',
        destaque: true,
        mais_vendido: true,
        categoria_id: categorias[4].id
      }
    }),
    prisma.livro.create({
      data: {
        titulo: 'Dom Casmurro',
        autor: 'Machado de Assis',
        descricao: 'Um dos maiores clássicos da literatura brasileira, narrando a história de Bentinho e seu ciúme por Capitu.',
        preco: 25.90,
        preco_original: 35.90,
        imagem: 'https://m.media-amazon.com/images/I/71q7y7v7lrL._SY425_.jpg',
        nota_media: 4.5,
        total_reviews: 0,
        estoque: 120,
        paginas: 256,
        ano: 2016,
        editora: 'Penguin-Companhia',
        isbn: '9788582850046',
        mais_vendido: true,
        categoria_id: categorias[2].id
      }
    })
  ]);

  // Criar Reviews
  console.log('⭐ Criando reviews...');
  await prisma.review.create({
    data: {
      nota: 5,
      comentario: 'Uma obra-prima da fantasia! A construção do mundo é incrível e os personagens são inesquecíveis.',
      util: 45,
      livro_id: livros[0].id,
      usuario_id: usuarios[0].id
    }
  });

  await prisma.review.create({
    data: {
      nota: 5,
      comentario: 'Mágico do início ao fim! Uma leitura obrigatória para todas as idades.',
      util: 67,
      livro_id: livros[1].id,
      usuario_id: usuarios[1].id
    }
  });

  // Atualizar contadores de reviews
  await prisma.livro.update({
    where: { id: livros[0].id },
    data: { total_reviews: 1 }
  });

  await prisma.livro.update({
    where: { id: livros[1].id },
    data: { total_reviews: 1 }
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log(`📊 Resumo:`);
  console.log(`   - ${categorias.length} categorias criadas`);
  console.log(`   - ${usuarios.length} usuários criados`);
  console.log(`   - ${livros.length} livros criados`);
  console.log(`   - 2 reviews criadas`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
