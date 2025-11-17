# 🗄️ Guia de Configuração do Prisma + PostgreSQL (Neon)

## 📋 Pré-requisitos

1. **Node.js** instalado (versão 18 ou superior)
   - Download: https://nodejs.org/
   - Verifique: `node --version`

2. **Conta no Neon** (PostgreSQL serverless)
   - Criar conta: https://neon.tech/
   - Gratuito para começar!

---

## 🚀 Passo a Passo

### 1️⃣ Instalar Node.js (se ainda não tiver)

Baixe e instale o Node.js de: https://nodejs.org/

Reinicie o PowerShell depois da instalação.

### 2️⃣ Instalar Dependências

No terminal (PowerShell), dentro da pasta do projeto:

```powershell
npm install
```

Isso irá instalar:
- `@prisma/client` - Cliente do Prisma
- `prisma` - CLI do Prisma
- `dotenv` - Para carregar variáveis de ambiente

### 3️⃣ Configurar Banco de Dados no Neon

1. **Acesse:** https://neon.tech/
2. **Faça login** ou crie uma conta
3. **Crie um novo projeto:**
   - Nome: `bookshelve` (ou o que preferir)
   - Região: Escolha a mais próxima (ex: US East)
4. **Copie a Connection String:**
   - Vá em: **Dashboard → Connection Details**
   - Copie a string que começa com `postgresql://...`
   - Exemplo: `postgresql://user:pass@ep-xyz.us-east-1.aws.neon.tech/neondb?sslmode=require`

### 4️⃣ Configurar o .env

Abra o arquivo `.env` e cole sua connection string:

```env
DATABASE_URL="postgresql://seu-usuario:sua-senha@seu-endpoint.neon.tech/sua-database?sslmode=require"
```

**Exemplo real:**
```env
DATABASE_URL="postgresql://neondb_owner:npg_ABC123XYZ@ep-cool-voice-123456.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### 5️⃣ Executar Migrations

Criar as tabelas no banco de dados:

```powershell
npx prisma migrate dev --name init
```

Isso irá:
- ✅ Criar todas as tabelas definidas no `schema.prisma`
- ✅ Gerar o Prisma Client
- ✅ Criar a pasta `prisma/migrations`

### 6️⃣ Popular o Banco (Seed)

Adicionar dados de exemplo:

```powershell
npm run prisma:seed
```

Isso irá criar:
- 10 categorias
- 3 usuários
- 3 livros
- 2 reviews

### 7️⃣ Visualizar Dados (Prisma Studio)

Abrir interface gráfica para ver os dados:

```powershell
npm run prisma:studio
```

Isso abrirá uma interface web em `http://localhost:5555`

---

## 📝 Comandos Úteis

### Gerar Cliente do Prisma
Sempre que modificar o `schema.prisma`:
```powershell
npx prisma generate
```

### Ver o Banco de Dados
```powershell
npm run prisma:studio
```

### Criar Nova Migration
```powershell
npx prisma migrate dev --name nome_da_migration
```

### Resetar Banco (Cuidado!)
```powershell
npx prisma migrate reset
```

### Push do Schema (sem migrations)
```powershell
npm run prisma:push
```

### Formatar Schema
```powershell
npx prisma format
```

---

## 🔧 Como Usar o Prisma no Código

### Importar o Cliente

```javascript
const prisma = require('./prisma/client');

// Buscar todos os livros
const livros = await prisma.livro.findMany({
  include: {
    categoria: true,
    reviews: true
  }
});

// Criar um novo usuário
const usuario = await prisma.user.create({
  data: {
    nome: 'João Silva',
    email: 'joao@email.com',
    senha: 'senha123',
    telefone: '(11) 99999-9999'
  }
});

// Buscar livro por ID
const livro = await prisma.livro.findUnique({
  where: { id: 1 },
  include: {
    categoria: true,
    reviews: {
      include: {
        usuario: true
      }
    }
  }
});

// Criar review
const review = await prisma.review.create({
  data: {
    nota: 5,
    comentario: 'Excelente livro!',
    livro_id: 1,
    usuario_id: 'user-id-aqui'
  }
});
```

---

## 📊 Estrutura do Banco de Dados

### Tabelas Criadas:

1. **usuarios** - Dados dos usuários
2. **categorias** - Categorias de livros
3. **livros** - Catálogo de livros
4. **reviews** - Avaliações dos livros
5. **compras** - Pedidos/compras
6. **itens_compra** - Itens de cada compra
7. **favoritos** - Livros favoritos dos usuários

### Relações:

- Um usuário pode ter **muitas reviews**
- Um livro pertence a **uma categoria**
- Um livro pode ter **muitas reviews**
- Uma compra pertence a **um usuário**
- Uma compra tem **muitos itens**
- Um usuário pode ter **muitos favoritos**

---

## 🐛 Problemas Comuns

### Erro: "Can't reach database server"
- ✅ Verifique se a `DATABASE_URL` está correta
- ✅ Verifique sua conexão com a internet
- ✅ Verifique se o banco Neon está ativo

### Erro: "Environment variable not found: DATABASE_URL"
- ✅ Certifique-se que o arquivo `.env` existe
- ✅ Verifique se está na pasta correta

### Erro ao executar migrations
- ✅ Verifique se o banco está acessível
- ✅ Tente: `npx prisma migrate reset`
- ✅ Depois: `npx prisma migrate dev`

---

## 📚 Documentação

- **Prisma Docs:** https://www.prisma.io/docs
- **Neon Docs:** https://neon.tech/docs
- **Prisma Client API:** https://www.prisma.io/docs/reference/api-reference/prisma-client-reference

---

## 🎯 Próximos Passos

1. ✅ Instalar Node.js
2. ✅ Criar conta no Neon
3. ✅ Configurar `.env`
4. ✅ Executar `npm install`
5. ✅ Executar `npx prisma migrate dev`
6. ✅ Executar `npm run prisma:seed`
7. ✅ Abrir `npm run prisma:studio`

---

**🎉 Pronto! Seu banco de dados está configurado e funcionando!**
