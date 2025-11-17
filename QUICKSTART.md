# 🚀 Guia Rápido - Bookshelve

## Inicialização do Projeto

### 1️⃣ Instalar dependências e configurar banco

```bash
# Instalar dependências
npm install

# Gerar Prisma Client
npx prisma generate

# Criar tabelas no banco (já feito)
npx prisma migrate deploy
```

### 2️⃣ Popular o banco com dados de exemplo

```bash
npm run prisma:seed
```

Isso criará:
- **3 usuários** (joao@example.com, maria@example.com, pedro@example.com)
- **6 livros** (Harry Potter, 1984, Senhor dos Anéis, Dom Casmurro, O Pequeno Príncipe, A Culpa é das Estrelas)
- **6 reviews**

**Senha para todos os usuários**: `123456`

### 3️⃣ Iniciar o servidor

```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

## 🎯 Testando a Aplicação

### Homepage
1. Acesse `http://localhost:3000`
2. Veja a lista de livros
3. Use os filtros de busca, categoria e autor

### Ver detalhes de um livro
1. Clique em qualquer livro
2. Veja as informações completas e reviews

### Fazer login
1. Acesse `/login`
2. Use: `joao@example.com` / `123456`
3. Será redirecionado para o perfil

### Criar novo usuário
1. Acesse `/register`
2. Preencha os dados
3. Faça login

### Adicionar review
1. Faça login primeiro
2. Acesse um livro
3. Clique em "Adicionar Review"
4. Informe seu User ID (você vê no perfil)
5. Selecione as estrelas e escreva um comentário

### Ver perfil
1. Acesse `/profile` (após login)
2. Veja seus dados e reviews
3. Delete reviews se quiser

---

## 🔧 Ferramentas Úteis

### Prisma Studio (Interface visual do banco)
```bash
npm run prisma:studio
```

Abre em: `http://localhost:5555`

### Ver estrutura do banco
```bash
npx prisma db pull
```

### Criar nova migration
```bash
npx prisma migrate dev --name nome_da_migration
```

---

## 📡 Testando as APIs Direto

### Criar um livro
```bash
curl -X POST http://localhost:3000/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Novo Livro",
    "author": "Autor Teste",
    "category": "Ficção",
    "description": "Descrição do livro",
    "imageUrl": "https://example.com/image.jpg"
  }'
```

### Listar todos os livros
```bash
curl http://localhost:3000/api/book
```

### Buscar livros por categoria
```bash
curl "http://localhost:3000/api/book?category=Fantasia"
```

### Criar review
```bash
curl -X POST http://localhost:3000/api/review \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "Excelente livro!",
    "userId": 1,
    "bookId": 1
  }'
```

---

## 🐛 Troubleshooting

### Erro: "Property 'book' does not exist"
```bash
# Regenerar o Prisma Client
npx prisma generate
```

### Erro: "Cannot find module @prisma/client"
```bash
# Reinstalar dependências
rm -rf node_modules
npm install
npx prisma generate
```

### Banco de dados vazio
```bash
# Popular novamente
npm run prisma:seed
```

### Build falhando
```bash
# Limpar cache do Next.js
rm -rf .next
npm run build
```

---

## 📦 Deploy na Vercel

1. Faça push para o GitHub
2. Conecte no Vercel
3. Configure a variável `DATABASE_URL` nas settings
4. Deploy automático! 🎉

---

## ✅ Checklist de Funcionalidades

- [x] CRUD de Usuários
- [x] CRUD de Livros  
- [x] CRUD de Reviews
- [x] Sistema de login
- [x] Busca e filtros
- [x] Avaliação com estrelas
- [x] Design responsivo
- [x] Validação com Zod
- [x] Hash de senhas com bcrypt
- [x] API REST completa
- [x] Integração com PostgreSQL

---

**Pronto para usar! 🚀** Se tiver dúvidas, consulte o `README-NEXTJS.md`.
