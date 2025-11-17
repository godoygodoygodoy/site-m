# Bookshelve - E-commerce de Livros com Reviews

WebApp completo para comprar livros e postar reviews, desenvolvido com Next.js 15, Prisma ORM e PostgreSQL (Neon).

## 🚀 Tecnologias

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Estilização**: TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Validação**: Zod
- **Autenticação**: bcryptjs (hash de senhas)

## 📁 Estrutura do Projeto

```
site-m/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── login/route.ts          # POST /api/auth/login
│   │   ├── user/
│   │   │   ├── route.ts                # GET, POST /api/user
│   │   │   └── [id]/route.ts           # GET, PUT, DELETE /api/user/[id]
│   │   ├── book/
│   │   │   ├── route.ts                # GET, POST /api/book (com filtros)
│   │   │   └── [id]/route.ts           # GET, PUT, DELETE /api/book/[id]
│   │   └── review/
│   │       ├── route.ts                # POST /api/review
│   │       ├── [id]/route.ts           # DELETE /api/review/[id]
│   │       ├── book/[bookId]/route.ts  # GET /api/review/book/[bookId]
│   │       └── user/[userId]/route.ts  # GET /api/review/user/[userId]
│   ├── book/[id]/page.tsx              # Página de detalhes do livro
│   ├── review/new/page.tsx             # Formulário de novo review
│   ├── login/page.tsx                  # Página de login
│   ├── register/page.tsx               # Página de cadastro
│   ├── profile/page.tsx                # Perfil do usuário
│   ├── page.tsx                        # Homepage (listagem de livros)
│   ├── layout.tsx                      # Layout global
│   └── globals.css                     # Estilos globais
├── components/
│   ├── StarRating.tsx                  # Componente de estrelas (clicável)
│   ├── BookCard.tsx                    # Card de livro
│   ├── ReviewCard.tsx                  # Card de review
│   ├── Navbar.tsx                      # Barra de navegação
│   └── Footer.tsx                      # Rodapé
├── lib/
│   ├── prisma.ts                       # Cliente Prisma (singleton)
│   ├── validations.ts                  # Schemas Zod
│   ├── auth.ts                         # Funções de hash/compare bcrypt
│   └── api-response.ts                 # Helpers de resposta API
├── prisma/
│   └── schema.prisma                   # Schema do banco de dados
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── package.json
```

## 🗄️ Modelos do Banco de Dados

### User
- `id` (Int, autoincrement)
- `name` (String)
- `email` (String, unique)
- `password` (String, hash bcrypt)
- `reviews` (Review[])

### Book
- `id` (Int, autoincrement)
- `title` (String)
- `author` (String)
- `category` (String)
- `description` (String?, opcional)
- `imageUrl` (String?, opcional)
- `reviews` (Review[])

### Review
- `id` (Int, autoincrement)
- `rating` (Int, 1-5)
- `comment` (String?, opcional)
- `userId` (Int, FK → User)
- `bookId` (Int, FK → Book)

## 🔌 API Endpoints

### Usuários
- `POST /api/user` - Criar usuário
- `GET /api/user` - Listar todos os usuários
- `GET /api/user/[id]` - Buscar usuário por ID
- `PUT /api/user/[id]` - Atualizar usuário
- `DELETE /api/user/[id]` - Deletar usuário

### Livros
- `POST /api/book` - Criar livro
- `GET /api/book` - Listar livros (com filtros: search, category, author)
- `GET /api/book/[id]` - Buscar livro por ID
- `PUT /api/book/[id]` - Atualizar livro
- `DELETE /api/book/[id]` - Deletar livro

### Reviews
- `POST /api/review` - Criar review
- `GET /api/review/book/[bookId]` - Listar reviews de um livro
- `GET /api/review/user/[userId]` - Listar reviews de um usuário
- `DELETE /api/review/[id]` - Deletar review

### Autenticação
- `POST /api/auth/login` - Login de usuário

## 📱 Páginas do Frontend

- **Homepage** (`/`) - Lista todos os livros com busca e filtros
- **Detalhes do Livro** (`/book/[id]`) - Exibe livro completo + reviews
- **Novo Review** (`/review/new?bookId=X`) - Formulário de review
- **Login** (`/login`) - Formulário de login
- **Cadastro** (`/register`) - Criação de usuário
- **Perfil** (`/profile`) - Dados do usuário + seus reviews

## ⚙️ Instalação e Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Certifique-se de que o arquivo `.env` contém:

```env
DATABASE_URL="postgresql://usuario:senha@host.neon.tech/neondb?sslmode=require"
```

### 3. Executar migrations

```bash
npx prisma migrate dev
```

### 4. Gerar Prisma Client

```bash
npx prisma generate
```

### 5. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: **http://localhost:3000**

## 🎨 Funcionalidades

✅ CRUD completo de Usuários, Livros e Reviews  
✅ Sistema de autenticação com hash de senha (bcrypt)  
✅ Busca e filtros de livros por categoria/autor  
✅ Sistema de avaliação com estrelas (1-5)  
✅ Interface responsiva com TailwindCSS  
✅ Validação de dados com Zod  
✅ API REST padronizada (JSON responses)  
✅ Componentes reutilizáveis (StarRating, BookCard, ReviewCard)  
✅ Integração completa com PostgreSQL via Prisma  

## 🚀 Deploy na Vercel

1. Push para o GitHub:
```bash
git add .
git commit -m "Complete Next.js app with Prisma"
git push origin main
```

2. Conecte o repositório na Vercel

3. Configure a variável de ambiente `DATABASE_URL` no dashboard da Vercel

4. Deploy automático! 🎉

## 📚 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linter
npx prisma studio    # Interface visual do banco
npx prisma migrate   # Criar migrations
npx prisma generate  # Gerar Prisma Client
```

## 🔒 Segurança

- Senhas são criptografadas com bcrypt (salt rounds: 10)
- Validação de entrada com Zod em todas as rotas
- Respostas de API padronizadas com tratamento de erros
- Email único por usuário (constraint no banco)

## 📄 Licença

MIT

---

**Desenvolvido com Next.js 15 + Prisma + Neon** 🚀📚
