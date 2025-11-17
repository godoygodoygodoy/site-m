// Exemplo de servidor básico com Express + Prisma
// Este é apenas um exemplo de como usar o Prisma

require('dotenv').config();
const prisma = require('./prisma/client');

// Exemplo de funções assíncronas com Prisma

async function exemplosDeUso() {
  console.log('🔍 Exemplos de uso do Prisma:\n');

  try {
    // 1. Buscar todos os livros
    console.log('📚 Buscando todos os livros...');
    const livros = await prisma.livro.findMany({
      include: {
        categoria: true
      },
      take: 5 // Limitar a 5 resultados
    });
    console.log(`✅ Encontrados ${livros.length} livros`);
    livros.forEach(livro => {
      console.log(`   - ${livro.titulo} (${livro.categoria.nome})`);
    });

    // 2. Buscar livros por categoria
    console.log('\n🏷️ Buscando livros de Fantasia...');
    const livrosFantasia = await prisma.livro.findMany({
      where: {
        categoria: {
          nome: 'Fantasia'
        }
      },
      include: {
        categoria: true
      }
    });
    console.log(`✅ Encontrados ${livrosFantasia.length} livros de Fantasia`);

    // 3. Buscar livro com reviews
    console.log('\n⭐ Buscando livro com reviews...');
    const livroComReviews = await prisma.livro.findFirst({
      include: {
        reviews: {
          include: {
            usuario: {
              select: {
                nome: true,
                email: true
              }
            }
          }
        }
      }
    });
    
    if (livroComReviews) {
      console.log(`✅ ${livroComReviews.titulo}`);
      console.log(`   Reviews: ${livroComReviews.reviews.length}`);
      livroComReviews.reviews.forEach(review => {
        console.log(`   - ${review.usuario.nome}: ${review.nota}/5 estrelas`);
      });
    }

    // 4. Estatísticas
    console.log('\n📊 Estatísticas:');
    const totalLivros = await prisma.livro.count();
    const totalUsuarios = await prisma.user.count();
    const totalReviews = await prisma.review.count();
    const totalCategorias = await prisma.categoria.count();
    
    console.log(`   - Total de livros: ${totalLivros}`);
    console.log(`   - Total de usuários: ${totalUsuarios}`);
    console.log(`   - Total de reviews: ${totalReviews}`);
    console.log(`   - Total de categorias: ${totalCategorias}`);

    // 5. Livros mais bem avaliados
    console.log('\n🌟 Top 3 livros mais bem avaliados:');
    const topLivros = await prisma.livro.findMany({
      orderBy: {
        nota_media: 'desc'
      },
      take: 3,
      select: {
        titulo: true,
        autor: true,
        nota_media: true,
        total_reviews: true
      }
    });
    
    topLivros.forEach((livro, index) => {
      console.log(`   ${index + 1}. ${livro.titulo} - ${livro.nota_media}/5 (${livro.total_reviews} reviews)`);
    });

    console.log('\n✅ Exemplos executados com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar exemplos se o arquivo for executado diretamente
if (require.main === module) {
  exemplosDeUso();
}

module.exports = { exemplosDeUso };
