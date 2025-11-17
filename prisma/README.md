# 🗄️ Schema do Banco de Dados - Bookshelve

Este documento descreve a estrutura do banco de dados do projeto Bookshelve usando Prisma ORM.

## 📊 Diagrama de Relações

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   Usuario   │──────<│   Review     │>──────│   Livro     │
│             │       │              │       │             │
│ - id        │       │ - id         │       │ - id        │
│ - nome      │       │ - nota       │       │ - titulo    │
│ - email     │       │ - comentario │       │ - autor     │
│ - senha     │       │ - data       │       │ - preco     │
│ - telefone  │       └──────────────┘       │ - estoque   │
└─────────────┘                              └─────────────┘
      │                                             │
      │                                             │
      │         ┌──────────────┐                    │
      └────────<│   Compra     │                    │
                │              │                    │
                │ - id         │                    │
                │ - total      │                    │
                │ - status     │                    │
                │ - data       │                    │
                └──────────────┘                    │
                      │                             │
                      │                             │
                ┌─────┴─────┐                       │
                │ItemCompra │───────────────────────┘
                │           │
                │ - id      │
                │ - qtd     │
                │ - preco   │
                └───────────┘
```

## 📋 Tabelas

### 1. **usuarios** (User)
Armazena informações dos usuários cadastrados.

| Campo          | Tipo     | Descrição                    |
|----------------|----------|------------------------------|
| id             | String   | ID único (CUID)              |
| nome           | String   | Nome completo                |
| email          | String   | Email (único)                |
| senha          | String   | Senha (hash)                 |
| telefone       | String?  | Telefone (opcional)          |
| foto_perfil    | String?  | URL da foto (opcional)       |
| data_cadastro  | DateTime | Data de cadastro             |
| atualizado_em  | DateTime | Última atualização           |

**Relações:**
- `reviews[]` - Reviews feitas pelo usuário
- `compras[]` - Compras do usuário
- `favoritos[]` - Livros favoritos

---

### 2. **categorias** (Categoria)
Categorias dos livros (Ficção, Fantasia, etc.)

| Campo     | Tipo   | Descrição                    |
|-----------|--------|------------------------------|
| id        | Int    | ID autoincrement             |
| nome      | String | Nome da categoria (único)    |
| icone     | String | Ícone Font Awesome           |
| descricao | String | Descrição da categoria       |

**Relações:**
- `livros[]` - Livros da categoria

---

### 3. **livros** (Livro)
Catálogo de livros disponíveis.

| Campo           | Tipo     | Descrição                    |
|-----------------|----------|------------------------------|
| id              | Int      | ID autoincrement             |
| titulo          | String   | Título do livro              |
| autor           | String   | Autor                        |
| descricao       | Text     | Descrição completa           |
| preco           | Decimal  | Preço atual                  |
| preco_original  | Decimal? | Preço original (desconto)    |
| imagem          | String   | URL da capa                  |
| nota_media      | Decimal  | Média de avaliações (0-5)    |
| total_reviews   | Int      | Número de reviews            |
| estoque         | Int      | Quantidade em estoque        |
| tipo            | String   | "físico" ou "digital"        |
| paginas         | Int?     | Número de páginas            |
| ano             | Int?     | Ano de publicação            |
| editora         | String?  | Editora                      |
| isbn            | String?  | ISBN (único)                 |
| destaque        | Boolean  | Livro em destaque            |
| mais_vendido    | Boolean  | Mais vendido                 |
| categoria_id    | Int      | FK para categoria            |
| criado_em       | DateTime | Data de criação              |
| atualizado_em   | DateTime | Última atualização           |

**Relações:**
- `categoria` - Categoria do livro
- `reviews[]` - Avaliações do livro
- `itens_compra[]` - Itens de compra
- `favoritos[]` - Favoritos

**Índices:**
- `categoria_id`
- `nota_media`
- `preco`

---

### 4. **reviews** (Review)
Avaliações dos livros pelos usuários.

| Campo      | Tipo     | Descrição                    |
|------------|----------|------------------------------|
| id         | Int      | ID autoincrement             |
| nota       | Int      | Nota de 1-5 estrelas         |
| comentario | Text?    | Comentário (opcional)        |
| util       | Int      | Contador de "útil"           |
| data       | DateTime | Data da avaliação            |
| livro_id   | Int      | FK para livro                |
| usuario_id | String   | FK para usuário              |

**Restrições:**
- Um usuário pode avaliar um livro apenas uma vez
- Constraint: `UNIQUE(livro_id, usuario_id)`

**Relações:**
- `livro` - Livro avaliado
- `usuario` - Usuário que avaliou

**Índices:**
- `livro_id`
- `usuario_id`

---

### 5. **compras** (Compra)
Pedidos/compras realizadas.

| Campo      | Tipo     | Descrição                         |
|------------|----------|-----------------------------------|
| id         | Int      | ID autoincrement                  |
| total      | Decimal  | Valor total da compra             |
| status     | String   | Status do pedido*                 |
| data       | DateTime | Data da compra                    |
| usuario_id | String   | FK para usuário                   |

**Status possíveis:**
- `processando` (padrão)
- `pago`
- `enviado`
- `entregue`
- `cancelado`

**Relações:**
- `usuario` - Usuário que fez a compra
- `itens[]` - Itens da compra

**Índices:**
- `usuario_id`
- `data`

---

### 6. **itens_compra** (ItemCompra)
Itens individuais de cada compra.

| Campo      | Tipo    | Descrição                    |
|------------|---------|------------------------------|
| id         | Int     | ID autoincrement             |
| quantidade | Int     | Quantidade comprada          |
| preco      | Decimal | Preço no momento da compra   |
| compra_id  | Int     | FK para compra               |
| livro_id   | Int     | FK para livro                |

**Relações:**
- `compra` - Compra à qual pertence
- `livro` - Livro comprado

**Índices:**
- `compra_id`
- `livro_id`

---

### 7. **favoritos** (Favorito)
Livros favoritos dos usuários.

| Campo      | Tipo     | Descrição                    |
|------------|----------|------------------------------|
| id         | Int      | ID autoincrement             |
| criado_em  | DateTime | Data que foi favoritado      |
| usuario_id | String   | FK para usuário              |
| livro_id   | Int      | FK para livro                |

**Restrições:**
- Um usuário pode favoritar um livro apenas uma vez
- Constraint: `UNIQUE(usuario_id, livro_id)`

**Relações:**
- `usuario` - Usuário
- `livro` - Livro favorito

**Índices:**
- `usuario_id`
- `livro_id`

---

## 🔗 Tipos de Relações

### One-to-Many (1:N)
- Um **usuário** tem muitas **reviews**
- Um **usuário** tem muitas **compras**
- Uma **categoria** tem muitos **livros**
- Um **livro** tem muitas **reviews**
- Uma **compra** tem muitos **itens_compra**

### Many-to-One (N:1)
- Muitas **reviews** pertencem a um **livro**
- Muitas **reviews** pertencem a um **usuário**
- Muitos **livros** pertencem a uma **categoria**

### Many-to-Many (N:N)
- **Usuários** ↔ **Livros** (através de **Favorito**)
- **Compras** ↔ **Livros** (através de **ItemCompra**)

---

## 🔐 Constraints e Validações

### Unique Constraints
- `usuarios.email` - Email único por usuário
- `livros.isbn` - ISBN único por livro
- `reviews(livro_id, usuario_id)` - Usuário pode avaliar livro apenas uma vez
- `favoritos(usuario_id, livro_id)` - Usuário pode favoritar livro apenas uma vez

### Cascade Deletes
- Ao deletar um **usuário**: deleta suas reviews, compras e favoritos
- Ao deletar um **livro**: deleta suas reviews e favoritos
- Ao deletar uma **compra**: deleta seus itens

### Default Values
- `User.data_cadastro` → `now()`
- `Livro.nota_media` → `0`
- `Livro.total_reviews` → `0`
- `Livro.estoque` → `0`
- `Livro.tipo` → `"físico"`
- `Review.util` → `0`
- `Compra.status` → `"processando"`

---

## 📈 Queries Comuns

### Buscar livros com categoria
```prisma
livro.findMany({
  include: {
    categoria: true
  }
})
```

### Buscar livro com reviews e usuários
```prisma
livro.findUnique({
  where: { id: 1 },
  include: {
    reviews: {
      include: {
        usuario: true
      }
    }
  }
})
```

### Buscar compras de um usuário
```prisma
compra.findMany({
  where: { usuario_id: 'user-id' },
  include: {
    itens: {
      include: {
        livro: true
      }
    }
  }
})
```

### Livros mais bem avaliados
```prisma
livro.findMany({
  orderBy: {
    nota_media: 'desc'
  },
  take: 10
})
```

---

## 🎯 Melhores Práticas

1. **Sempre use transações** para operações que afetam múltiplas tabelas
2. **Selecione apenas campos necessários** com `select`
3. **Use includes com cuidado** para evitar N+1 queries
4. **Implemente paginação** em listagens grandes
5. **Use índices** em campos frequentemente consultados
6. **Valide dados** antes de inserir no banco

---

**Documentação oficial:** https://www.prisma.io/docs
