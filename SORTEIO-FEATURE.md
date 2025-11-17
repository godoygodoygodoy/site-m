# 🎁 Funcionalidade de Sorteio de Livros

## 📋 Visão Geral

Sistema completo de sorteio pago de livros integrado ao Bookshelve, permitindo que usuários participem de sorteios e recebam um livro aleatório do gênero escolhido.

---

## 🗄️ Banco de Dados

### Novo Model: Raffle

```prisma
model Raffle {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  address   String
  genre     String
  price     Float
  bookId    Int
  createdAt DateTime @default(now())

  book      Book     @relation(fields: [bookId], references: [id])
}
```

**Migration aplicada:** `20251117231126_add_raffle_model`

---

## 🔌 API Endpoints

### POST /api/raffle
Cria um novo sorteio e seleciona um livro aleatório.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "address": "Rua das Flores, 123 - São Paulo, SP",
  "genre": "Fantasia",
  "price": 19.90
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "raffle": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com",
      "address": "Rua das Flores, 123 - São Paulo, SP",
      "genre": "Fantasia",
      "price": 19.90,
      "bookId": 3,
      "createdAt": "2025-11-17T23:11:26.000Z",
      "book": { ... }
    },
    "book": { ... }
  },
  "message": "Sorteio realizado com sucesso!"
}
```

**Response (Erro - Sem livros no gênero):**
```json
{
  "success": false,
  "message": "Não há livros disponíveis na categoria \"Terror\". Tente outro gênero!"
}
```

### GET /api/raffle
Lista todos os sorteios realizados.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com",
      "address": "Rua das Flores, 123 - São Paulo, SP",
      "genre": "Fantasia",
      "price": 19.90,
      "bookId": 3,
      "createdAt": "2025-11-17T23:11:26.000Z",
      "book": { ... }
    }
  ]
}
```

### GET /api/raffle/[id]
Busca um sorteio específico por ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "address": "Rua das Flores, 123 - São Paulo, SP",
    "genre": "Fantasia",
    "price": 19.90,
    "bookId": 3,
    "createdAt": "2025-11-17T23:11:26.000Z",
    "book": {
      "id": 3,
      "title": "O Senhor dos Anéis",
      "author": "J.R.R. Tolkien",
      "category": "Fantasia",
      "description": "...",
      "imageUrl": "..."
    }
  }
}
```

---

## 📱 Páginas Frontend

### 1. `/sorteio` - Página de Participação

**Funcionalidades:**
- ✅ Formulário completo com validação
- ✅ Campos: Nome, Email, Endereço (Rua, Número, Cidade, Estado)
- ✅ Seleção de gênero literário (10 opções)
- ✅ Preço fixo exibido: R$ 19,90
- ✅ Botão de pagamento simulado
- ✅ Tratamento de erros
- ✅ Loading state durante processamento

**Campos do formulário:**
- Nome Completo *
- Email *
- Rua *
- Número *
- Cidade *
- Estado * (máx. 2 caracteres)
- Gênero Literário * (select)

**Gêneros disponíveis:**
- Ficção
- Fantasia
- Romance
- Terror
- Suspense
- Aventura
- Biografia
- História
- Infantil
- Autoajuda

### 2. `/sorteio/resultado?id=X` - Página de Resultado

**Funcionalidades:**
- ✅ Exibe mensagem de parabéns personalizada
- ✅ Mostra o livro sorteado (capa, título, autor, categoria, descrição)
- ✅ Informações de confirmação do pedido
- ✅ Endereço de entrega
- ✅ Previsão de entrega
- ✅ Botões de ação (Voltar, Ver Detalhes)
- ✅ Próximos passos para o usuário

**Layout:**
- Banner colorido com emoji de celebração
- Card do livro com imagem e informações
- Box de confirmação verde
- Seção de próximos passos
- Design responsivo

---

## 🎨 Validação (Zod)

```typescript
export const createRaffleSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  address: z.string().min(10, 'Endereço deve ter no mínimo 10 caracteres'),
  genre: z.string().min(1, 'Gênero é obrigatório'),
  price: z.number().positive('Preço deve ser maior que zero'),
})
```

---

## 🔄 Fluxo do Sorteio

1. **Usuário acessa `/sorteio`**
2. **Preenche o formulário** com seus dados e escolhe o gênero
3. **Clica em "Pagar e Sortear"**
4. **Backend recebe a requisição:**
   - Valida os dados com Zod
   - Busca todos os livros do gênero escolhido
   - Se não houver livros, retorna erro amigável
   - Seleciona um livro aleatório
   - Cria registro no banco (tabela `Raffle`)
   - Retorna o livro sorteado
5. **Frontend redireciona** para `/sorteio/resultado?id=X`
6. **Página de resultado:**
   - Busca o sorteio pelo ID
   - Exibe o livro sorteado
   - Mostra confirmação e próximos passos

---

## 🎲 Lógica do Sorteio Aleatório

```typescript
// Buscar livros do gênero
const booksInGenre = await prisma.book.findMany({
  where: {
    category: {
      equals: validatedData.genre,
      mode: 'insensitive', // Case-insensitive
    },
  },
})

// Verificar disponibilidade
if (booksInGenre.length === 0) {
  return error("Não há livros disponíveis...")
}

// Sortear aleatoriamente
const randomIndex = Math.floor(Math.random() * booksInGenre.length)
const selectedBook = booksInGenre[randomIndex]
```

---

## 🎯 Recursos Implementados

### Backend
- ✅ Model Raffle no Prisma
- ✅ Migration aplicada no Neon
- ✅ API POST /api/raffle (criar sorteio)
- ✅ API GET /api/raffle (listar sorteios)
- ✅ API GET /api/raffle/[id] (buscar por ID)
- ✅ Validação com Zod
- ✅ Seleção aleatória de livro por gênero
- ✅ Tratamento de erro quando não há livros
- ✅ Respostas JSON padronizadas

### Frontend
- ✅ Página /sorteio (formulário completo)
- ✅ Página /sorteio/resultado (exibição do resultado)
- ✅ Design responsivo com TailwindCSS
- ✅ Estados de loading e erro
- ✅ Validação de formulário
- ✅ UX/UI moderna e intuitiva
- ✅ Link na Navbar (🎁 Sorteio)
- ✅ Mensagens amigáveis de sucesso/erro

### Integração
- ✅ Totalmente integrado ao sistema existente
- ✅ Usa mesma estrutura de API e componentes
- ✅ Navegação fluida entre páginas
- ✅ Link direto para detalhes do livro

---

## 💰 Configuração de Preço

O preço do sorteio é definido como constante no arquivo:

**`app/sorteio/page.tsx`:**
```typescript
const RAFFLE_PRICE = 19.90
```

Para alterar o preço, basta modificar esta constante.

---

## 🚨 Tratamento de Erros

### Erro: Gênero sem livros
```json
{
  "success": false,
  "message": "Não há livros disponíveis na categoria \"Terror\". Tente outro gênero!"
}
```

### Erro: Validação de dados
```json
{
  "success": false,
  "message": "Dados inválidos",
  "error": [
    {
      "path": ["email"],
      "message": "Email inválido"
    }
  ]
}
```

### Erro: Sorteio não encontrado
```json
{
  "success": false,
  "message": "Sorteio não encontrado"
}
```

---

## 🧪 Como Testar

### 1. Acessar a página de sorteio
```
http://localhost:3000/sorteio
```

### 2. Preencher o formulário
- Nome: João Silva
- Email: joao@example.com
- Rua: Rua das Flores
- Número: 123
- Cidade: São Paulo
- Estado: SP
- Gênero: Fantasia

### 3. Clicar em "Pagar e Sortear"

### 4. Verificar resultado
Será redirecionado para `/sorteio/resultado?id=1` com o livro sorteado.

### 5. Testar erro (sem livros)
Escolha um gênero que não existe no banco (ex: "Terror") e veja a mensagem de erro amigável.

---

## 📊 Dados de Teste

Com o seed atual, você pode testar com os seguintes gêneros que **TÊM** livros:
- ✅ Fantasia (2 livros: Harry Potter, Senhor dos Anéis)
- ✅ Ficção (1 livro: 1984)
- ✅ Romance (2 livros: Dom Casmurro, A Culpa é das Estrelas)
- ✅ Infantil (1 livro: O Pequeno Príncipe)

Gêneros que **NÃO TÊM** livros (para testar erro):
- ❌ Terror
- ❌ Suspense
- ❌ Aventura
- ❌ Biografia
- ❌ História
- ❌ Autoajuda

---

## 🎨 Design e Estilização

- **Paleta de cores:** Gradiente azul-roxo (from-blue-600 to-purple-600)
- **Ícone:** 🎁 (presente)
- **Tipografia:** Font system padrão com hierarquia clara
- **Responsividade:** Mobile-first com breakpoints md: e lg:
- **Animações:** Spinner de loading, transições suaves
- **Feedback visual:** Cores de sucesso (verde) e erro (vermelho)

---

## 🔐 Segurança

- ✅ Validação de entrada com Zod
- ✅ Sanitização de dados no backend
- ✅ Tratamento de erros sem expor stack traces
- ✅ Case-insensitive para busca de gênero
- ✅ Respostas de erro amigáveis

---

## 🚀 Próximas Melhorias Possíveis

- [ ] Integração com gateway de pagamento real (Stripe, PayPal)
- [ ] Histórico de sorteios no perfil do usuário
- [ ] Email de confirmação automático
- [ ] Código de rastreamento de entrega
- [ ] Sistema de cupons de desconto
- [ ] Limite de participações por usuário
- [ ] Dashboard admin para gerenciar sorteios
- [ ] Estatísticas de livros mais sorteados
- [ ] Sistema de reembolso

---

## 📝 Checklist de Implementação

- [x] Model Raffle no schema.prisma
- [x] Migration criada e aplicada
- [x] Validação Zod em lib/validations.ts
- [x] API POST /api/raffle
- [x] API GET /api/raffle
- [x] API GET /api/raffle/[id]
- [x] Página /sorteio (formulário)
- [x] Página /sorteio/resultado
- [x] Link na Navbar
- [x] Tratamento de erros
- [x] Design responsivo
- [x] Teste funcional completo

---

**✅ FUNCIONALIDADE 100% IMPLEMENTADA E FUNCIONAL!**

Acesse: **http://localhost:3000/sorteio** para testar! 🎉
