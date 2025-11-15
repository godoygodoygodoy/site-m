// Banco de dados mockado
const DATABASE = {
    // Categorias
    categorias: [
        { id: 1, nome: 'Ficção', icone: 'fa-book', descricao: 'Romances e histórias fictícias' },
        { id: 2, nome: 'Clássicos', icone: 'fa-landmark', descricao: 'Obras clássicas da literatura' },
        { id: 3, nome: 'Literatura Brasileira', icone: 'fa-flag', descricao: 'Autores nacionais' },
        { id: 4, nome: 'HQs e Mangás', icone: 'fa-book-open', descricao: 'Quadrinhos e mangás' },
        { id: 5, nome: 'Fantasia', icone: 'fa-dragon', descricao: 'Mundos mágicos e fantásticos' },
        { id: 6, nome: 'Suspense', icone: 'fa-mask', descricao: 'Mistério e suspense' },
        { id: 7, nome: 'Romance', icone: 'fa-heart', descricao: 'Histórias de amor' },
        { id: 8, nome: 'Autoajuda', icone: 'fa-lightbulb', descricao: 'Desenvolvimento pessoal' },
        { id: 9, nome: 'Biografias', icone: 'fa-user-tie', descricao: 'Histórias de vida' },
        { id: 10, nome: 'Negócios', icone: 'fa-briefcase', descricao: 'Empreendedorismo e gestão' }
    ],

    // Livros
    livros: [
        {
            id: 1,
            titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
            autor: 'J.R.R. Tolkien',
            categoria_id: 5,
            descricao: 'Uma jornada épica através da Terra Média, onde um grupo improvável de heróis deve destruir um anel poderoso antes que caia nas mãos do mal.',
            preco: 45.90,
            preco_original: 59.90,
            imagem: 'https://m.media-amazon.com/images/I/71jLBXtWJWL._SY425_.jpg',
            nota_media: 4.8,
            total_reviews: 1245,
            estoque: 50,
            tipo: 'físico',
            paginas: 576,
            ano: 2019,
            editora: 'HarperCollins',
            isbn: '9788595084742',
            destaque: true,
            mais_vendido: true
        },
        {
            id: 2,
            titulo: 'Harry Potter e a Pedra Filosofal',
            autor: 'J.K. Rowling',
            categoria_id: 5,
            descricao: 'O primeiro livro da série Harry Potter, onde descobrimos o mundo mágico através dos olhos de um jovem bruxo.',
            preco: 39.90,
            preco_original: 49.90,
            imagem: 'https://m.media-amazon.com/images/I/81ibfYk4qmL._SY425_.jpg',
            nota_media: 4.9,
            total_reviews: 2340,
            estoque: 80,
            tipo: 'físico',
            paginas: 264,
            ano: 2017,
            editora: 'Rocco',
            isbn: '9788532530787',
            destaque: true,
            mais_vendido: true
        },
        {
            id: 3,
            titulo: 'Dom Casmurro',
            autor: 'Machado de Assis',
            categoria_id: 3,
            descricao: 'Um dos maiores clássicos da literatura brasileira, narrando a história de Bentinho e seu ciúme por Capitu.',
            preco: 25.90,
            preco_original: 35.90,
            imagem: 'https://m.media-amazon.com/images/I/71q7y7v7lrL._SY425_.jpg',
            nota_media: 4.5,
            total_reviews: 890,
            estoque: 120,
            tipo: 'físico',
            paginas: 256,
            ano: 2016,
            editora: 'Penguin-Companhia',
            isbn: '9788582850046',
            destaque: false,
            mais_vendido: true
        },
        {
            id: 4,
            titulo: 'Naruto Vol. 1',
            autor: 'Masashi Kishimoto',
            categoria_id: 4,
            descricao: 'O início da jornada de Naruto Uzumaki para se tornar o maior ninja de sua aldeia.',
            preco: 19.90,
            preco_original: 24.90,
            imagem: 'https://m.media-amazon.com/images/I/91WN-vHxR5L._SY425_.jpg',
            nota_media: 4.7,
            total_reviews: 567,
            estoque: 200,
            tipo: 'físico',
            paginas: 192,
            ano: 2020,
            editora: 'Panini',
            isbn: '9786555610093',
            destaque: false,
            mais_vendido: true
        },
        {
            id: 5,
            titulo: '1984',
            autor: 'George Orwell',
            categoria_id: 2,
            descricao: 'Uma distopia sombria sobre um regime totalitário que controla todos os aspectos da vida humana.',
            preco: 32.90,
            preco_original: 42.90,
            imagem: 'https://m.media-amazon.com/images/I/819js3EQwbL._SY425_.jpg',
            nota_media: 4.8,
            total_reviews: 1567,
            estoque: 90,
            tipo: 'físico',
            paginas: 416,
            ano: 2020,
            editora: 'Companhia das Letras',
            isbn: '9788535914849',
            destaque: true,
            mais_vendido: false
        },
        {
            id: 6,
            titulo: 'O Pequeno Príncipe',
            autor: 'Antoine de Saint-Exupéry',
            categoria_id: 2,
            descricao: 'Uma fábula poética sobre amor, amizade e o sentido da vida, contada através dos olhos de um pequeno príncipe.',
            preco: 24.90,
            preco_original: 29.90,
            imagem: 'https://m.media-amazon.com/images/I/71OZY035Q5L._SY425_.jpg',
            nota_media: 4.9,
            total_reviews: 2890,
            estoque: 150,
            tipo: 'físico',
            paginas: 96,
            ano: 2015,
            editora: 'Agir',
            isbn: '9788522008731',
            destaque: true,
            mais_vendido: true
        },
        {
            id: 7,
            titulo: 'A Culpa é das Estrelas',
            autor: 'John Green',
            categoria_id: 7,
            descricao: 'Um romance emocionante entre dois adolescentes que se conhecem em um grupo de apoio para pacientes com câncer.',
            preco: 34.90,
            preco_original: 44.90,
            imagem: 'https://m.media-amazon.com/images/I/71f3sdJG+iL._SY425_.jpg',
            nota_media: 4.6,
            total_reviews: 1890,
            estoque: 75,
            tipo: 'físico',
            paginas: 288,
            ano: 2014,
            editora: 'Intrínseca',
            isbn: '9788580572261',
            destaque: false,
            mais_vendido: true
        },
        {
            id: 8,
            titulo: 'O Poder do Hábito',
            autor: 'Charles Duhigg',
            categoria_id: 8,
            descricao: 'Por que fazemos o que fazemos na vida e nos negócios. Um guia científico para transformar hábitos.',
            preco: 42.90,
            preco_original: 54.90,
            imagem: 'https://m.media-amazon.com/images/I/81Ls35oXApL._SY425_.jpg',
            nota_media: 4.7,
            total_reviews: 1234,
            estoque: 60,
            tipo: 'físico',
            paginas: 408,
            ano: 2012,
            editora: 'Objetiva',
            isbn: '9788539004119',
            destaque: true,
            mais_vendido: false
        },
        {
            id: 9,
            titulo: 'Steve Jobs',
            autor: 'Walter Isaacson',
            categoria_id: 9,
            descricao: 'A biografia definitiva do criador da Apple, baseada em mais de quarenta entrevistas exclusivas.',
            preco: 49.90,
            preco_original: 64.90,
            imagem: 'https://m.media-amazon.com/images/I/81VStYnDGrL._SY425_.jpg',
            nota_media: 4.8,
            total_reviews: 890,
            estoque: 45,
            tipo: 'físico',
            paginas: 624,
            ano: 2011,
            editora: 'Companhia das Letras',
            isbn: '9788535917642',
            destaque: false,
            mais_vendido: false
        },
        {
            id: 10,
            titulo: 'A Garota no Trem',
            autor: 'Paula Hawkins',
            categoria_id: 6,
            descricao: 'Um thriller psicológico envolvente sobre uma mulher que testemunha algo chocante durante seu trajeto diário.',
            preco: 36.90,
            preco_original: 47.90,
            imagem: 'https://m.media-amazon.com/images/I/71OlP3yTJXL._SY425_.jpg',
            nota_media: 4.3,
            total_reviews: 1456,
            estoque: 55,
            tipo: 'físico',
            paginas: 368,
            ano: 2015,
            editora: 'Record',
            isbn: '9788501104120',
            destaque: false,
            mais_vendido: true
        },
        {
            id: 11,
            titulo: 'Sapiens',
            autor: 'Yuval Noah Harari',
            categoria_id: 10,
            descricao: 'Uma breve história da humanidade, desde a Idade da Pedra até a era moderna.',
            preco: 54.90,
            preco_original: 69.90,
            imagem: 'https://m.media-amazon.com/images/I/71Tqu+tlKfL._SY425_.jpg',
            nota_media: 4.8,
            total_reviews: 3456,
            estoque: 85,
            tipo: 'físico',
            paginas: 464,
            ano: 2015,
            editora: 'L&PM',
            isbn: '9788525432629',
            destaque: true,
            mais_vendido: true
        },
        {
            id: 12,
            titulo: 'O Hobbit',
            autor: 'J.R.R. Tolkien',
            categoria_id: 5,
            descricao: 'A aventura de Bilbo Bolseiro que precede os eventos de O Senhor dos Anéis.',
            preco: 38.90,
            preco_original: 49.90,
            imagem: 'https://m.media-amazon.com/images/I/91M9xPIf10L._SY425_.jpg',
            nota_media: 4.9,
            total_reviews: 2134,
            estoque: 95,
            tipo: 'físico',
            paginas: 336,
            ano: 2019,
            editora: 'HarperCollins',
            isbn: '9788595084735',
            destaque: true,
            mais_vendido: true
        }
    ],

    // Reviews (comentários e avaliações)
    reviews: [
        {
            id: 1,
            livro_id: 1,
            usuario_id: 1,
            nota: 5,
            comentario: 'Uma obra-prima da fantasia! A construção do mundo é incrível e os personagens são inesquecíveis.',
            data: '2024-10-15',
            util: 45
        },
        {
            id: 2,
            livro_id: 1,
            usuario_id: 2,
            nota: 5,
            comentario: 'Tolkien criou um universo completo. Cada detalhe é pensado com cuidado.',
            data: '2024-10-20',
            util: 32
        },
        {
            id: 3,
            livro_id: 2,
            usuario_id: 3,
            nota: 5,
            comentario: 'Mágico do início ao fim! Uma leitura obrigatória para todas as idades.',
            data: '2024-11-01',
            util: 67
        },
        {
            id: 4,
            livro_id: 2,
            usuario_id: 1,
            nota: 4,
            comentario: 'Excelente livro, mas a tradução poderia ser melhor em alguns trechos.',
            data: '2024-11-05',
            util: 23
        },
        {
            id: 5,
            livro_id: 3,
            usuario_id: 2,
            nota: 5,
            comentario: 'Machado de Assis é simplesmente genial. Dom Casmurro é uma obra atemporal.',
            data: '2024-10-28',
            util: 41
        },
        {
            id: 6,
            livro_id: 3,
            usuario_id: 3,
            nota: 4,
            comentario: 'Clássico brasileiro imperdível. A narrativa é envolvente.',
            data: '2024-11-10',
            util: 19
        },
        {
            id: 7,
            livro_id: 6,
            usuario_id: 1,
            nota: 5,
            comentario: 'Um livro para ler e reler. Cada vez descubro algo novo.',
            data: '2024-11-12',
            util: 88
        }
    ],

    // Usuários (mockado)
    usuarios: [
        {
            id: 1,
            nome: 'Maria Silva',
            email: 'maria@email.com',
            senha: '123456',
            foto_perfil: null,
            data_cadastro: '2024-01-15',
            telefone: '(11) 98765-4321'
        },
        {
            id: 2,
            nome: 'João Santos',
            email: 'joao@email.com',
            senha: '123456',
            foto_perfil: null,
            data_cadastro: '2024-02-20',
            telefone: '(21) 99876-5432'
        },
        {
            id: 3,
            nome: 'Ana Costa',
            email: 'ana@email.com',
            senha: '123456',
            foto_perfil: null,
            data_cadastro: '2024-03-10',
            telefone: '(31) 97654-3210'
        }
    ],

    // Histórico de compras
    historico: [
        {
            id: 1,
            usuario_id: 1,
            data: '2024-10-01',
            total: 120.70,
            status: 'entregue',
            itens: [
                { livro_id: 1, quantidade: 1, preco: 45.90 },
                { livro_id: 2, quantidade: 2, preco: 39.90 }
            ]
        },
        {
            id: 2,
            usuario_id: 1,
            data: '2024-10-20',
            total: 82.80,
            status: 'entregue',
            itens: [
                { livro_id: 3, quantidade: 1, preco: 25.90 },
                { livro_id: 5, quantidade: 1, preco: 32.90 },
                { livro_id: 6, quantidade: 1, preco: 24.90 }
            ]
        }
    ]
};

// Funções auxiliares para acessar dados
const DataService = {
    // Livros
    getAllLivros() {
        return DATABASE.livros;
    },
    
    getLivroById(id) {
        return DATABASE.livros.find(livro => livro.id === parseInt(id));
    },
    
    getLivrosByCategoria(categoriaId) {
        return DATABASE.livros.filter(livro => livro.categoria_id === parseInt(categoriaId));
    },
    
    getLivrosDestaque() {
        return DATABASE.livros.filter(livro => livro.destaque);
    },
    
    getLivrosMaisVendidos() {
        return DATABASE.livros.filter(livro => livro.mais_vendido);
    },
    
    searchLivros(query) {
        const q = query.toLowerCase();
        return DATABASE.livros.filter(livro => 
            livro.titulo.toLowerCase().includes(q) ||
            livro.autor.toLowerCase().includes(q)
        );
    },
    
    // Categorias
    getAllCategorias() {
        return DATABASE.categorias;
    },
    
    getCategoriaById(id) {
        return DATABASE.categorias.find(cat => cat.id === parseInt(id));
    },
    
    // Reviews
    getReviewsByLivro(livroId) {
        return DATABASE.reviews.filter(review => review.livro_id === parseInt(livroId));
    },
    
    addReview(review) {
        const newReview = {
            id: DATABASE.reviews.length + 1,
            ...review,
            data: new Date().toISOString().split('T')[0],
            util: 0
        };
        DATABASE.reviews.push(newReview);
        
        // Atualizar nota média do livro
        this.updateLivroRating(review.livro_id);
        
        return newReview;
    },
    
    updateLivroRating(livroId) {
        const reviews = this.getReviewsByLivro(livroId);
        const livro = this.getLivroById(livroId);
        
        if (reviews.length > 0) {
            const soma = reviews.reduce((acc, rev) => acc + rev.nota, 0);
            livro.nota_media = (soma / reviews.length).toFixed(1);
            livro.total_reviews = reviews.length;
        }
    },
    
    // Usuários
    getUserByEmail(email) {
        return DATABASE.usuarios.find(user => user.email === email);
    },
    
    getUserById(id) {
        return DATABASE.usuarios.find(user => user.id === parseInt(id));
    },
    
    addUser(userData) {
        const newUser = {
            id: DATABASE.usuarios.length + 1,
            ...userData,
            foto_perfil: null,
            data_cadastro: new Date().toISOString().split('T')[0]
        };
        DATABASE.usuarios.push(newUser);
        return newUser;
    },
    
    // Histórico
    getHistoricoByUser(userId) {
        return DATABASE.historico.filter(hist => hist.usuario_id === parseInt(userId));
    },
    
    addCompra(compra) {
        const novaCompra = {
            id: DATABASE.historico.length + 1,
            ...compra,
            data: new Date().toISOString().split('T')[0],
            status: 'processando'
        };
        DATABASE.historico.push(novaCompra);
        return novaCompra;
    }
};
