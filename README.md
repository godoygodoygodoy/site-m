# 📘 Bookshelve - WebApp de Compras e Reviews de Livros

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Uma livraria online moderna e responsiva desenvolvida com HTML, CSS e JavaScript puro (Vanilla JS). O projeto implementa um sistema completo de e-commerce de livros com funcionalidades de reviews, favoritos, carrinho de compras e gerenciamento de perfil.

## ✨ Funcionalidades

### 📚 Sistema de Livros
- Catálogo completo com mais de 10 livros
- Detalhes completos: título, autor, descrição, preço, avaliações
- Imagens de capa dos livros
- Sistema de categorias (Ficção, Clássicos, HQs, etc.)
- Indicação de descontos e ofertas

### 🔍 Busca e Filtros
- Busca por título e autor
- Filtros por categoria
- Filtros por faixa de preço
- Filtros por avaliação mínima
- Ordenação (preço, popularidade, avaliação)

### ⭐ Sistema de Reviews
- Avaliações com notas de 1 a 5 estrelas
- Comentários dos usuários
- Cálculo automático de média de notas
- Edição e exclusão de reviews próprias
- Contador de reviews úteis

### 🛒 Carrinho de Compras
- Adicionar/remover livros
- Ajustar quantidades
- Cálculo automático de totais
- Sistema de cupons de desconto
- Persistência no localStorage

### ❤️ Favoritos
- Adicionar livros aos favoritos
- Visualizar lista de favoritos
- Persistência no localStorage

### 👤 Sistema de Usuário
- Cadastro de novos usuários
- Login com validação
- Gerenciamento de perfil
- Histórico de compras
- Lista de reviews feitas
- Logout

### 🎨 Interface e UX
- Design moderno e responsivo
- Tema claro/escuro
- Animações suaves
- Notificações toast
- Menu lateral e inferior
- Skeleton loading
- Empty states

## 🚀 Como Usar

### Instalação

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` em seu navegador
3. Pronto! O sistema está funcionando

### Não é necessário:
- ❌ Instalação de dependências
- ❌ Configuração de servidor
- ❌ Build ou compilação
- ❌ Node.js ou npm

## 🧪 Testando o Sistema

### Login Rápido
Para facilitar os testes, use estas credenciais:

**Email:** `maria@email.com`  
**Senha:** `123456`

Ou clique no botão "Login Rápido" na página de login.

### Criar Nova Conta
1. Vá para a página de Login
2. Clique em "Criar Conta"
3. Preencha o formulário
4. O login será feito automaticamente

## 📁 Estrutura do Projeto

```
site-m/
├── index.html              # Página principal
├── css/
│   ├── styles.css         # Estilos base e componentes
│   ├── pages.css          # Estilos específicos das páginas
│   ├── responsive.css     # Media queries para responsividade
│   └── animations.css     # Animações e transições
├── js/
│   ├── config.js          # Configurações da aplicação
│   ├── data.js            # Banco de dados mockado
│   ├── auth.js            # Sistema de autenticação
│   ├── utils.js           # Funções utilitárias
│   ├── components.js      # Componentes reutilizáveis
│   ├── router.js          # Sistema de rotas SPA
│   ├── app.js             # Inicialização da aplicação
│   └── pages/
│       ├── home.js        # Página inicial
│       ├── compras.js     # Página de listagem/compras
│       ├── livro.js       # Página de detalhes do livro
│       ├── categorias.js  # Página de categorias
│       ├── perfil.js      # Página de perfil do usuário
│       ├── carrinho.js    # Página do carrinho
│       └── login.js       # Página de login/cadastro
└── README.md              # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com variáveis CSS
- **JavaScript ES6+** - Lógica da aplicação
- **Font Awesome** - Ícones
- **LocalStorage API** - Persistência de dados

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- 📱 **Mobile** (< 768px) - Menu inferior, layout vertical
- 📱 **Tablet** (768px - 1023px) - Layout intermediário
- 💻 **Desktop** (> 1024px) - Layout completo com todas as features

## 🎨 Tema Claro/Escuro

O sistema possui alternância de tema que:
- Salva a preferência do usuário
- Atualiza automaticamente todos os componentes
- Usa variáveis CSS para transições suaves

## 💾 Persistência de Dados

Os seguintes dados são salvos no localStorage:
- Usuário logado
- Itens do carrinho
- Livros favoritos
- Preferência de tema
- Histórico de compras

## 🔐 Sistema de Autenticação

O sistema de autenticação implementa:
- Cadastro com validação de dados
- Login com verificação de credenciais
- Sessão persistente
- Proteção de rotas (perfil requer login)
- Logout seguro

## 📊 Banco de Dados Mockado

O projeto usa um banco de dados em memória (JavaScript) com:
- 12 livros de exemplo
- 10 categorias
- 3 usuários pré-cadastrados
- Reviews de exemplo
- Histórico de compras mockado

## 🚧 Funcionalidades Simuladas

Algumas funcionalidades são simuladas para demonstração:
- Processamento de pagamento
- Envio de emails
- Integração com APIs externas
- Upload de imagens
- Recuperação de senha

## 🎯 Fluxos de Uso

### Fluxo 1: Comprar um Livro
1. Navegue até "Compras" ou busque um livro
2. Clique no livro desejado
3. Veja os detalhes e reviews
4. Clique em "Adicionar ao Carrinho"
5. Acesse o carrinho
6. Finalize a compra (requer login)

### Fluxo 2: Avaliar um Livro
1. Faça login
2. Acesse um livro
3. Role até a seção de avaliações
4. Selecione a quantidade de estrelas
5. Escreva um comentário (opcional)
6. Envie a avaliação

### Fluxo 3: Gerenciar Favoritos
1. Clique no ícone de coração em qualquer livro
2. Acesse "Favoritos" no menu
3. Veja todos os seus livros favoritos

## 🎓 Conceitos de Programação Utilizados

- **SPA (Single Page Application)** - Navegação sem recarregar a página
- **Componentização** - Componentes reutilizáveis
- **Estado da Aplicação** - Gerenciamento de estado
- **LocalStorage** - Persistência de dados
- **Event Delegation** - Otimização de eventos
- **Debounce** - Otimização de busca
- **Módulos** - Organização do código
- **Arrow Functions** - Sintaxe moderna
- **Template Strings** - Interpolação de HTML
- **Spread Operator** - Manipulação de objetos
- **Array Methods** - map, filter, reduce, etc.

## 🔮 Possíveis Melhorias Futuras

- [ ] Backend real com API REST
- [ ] Banco de dados real (MySQL, MongoDB)
- [ ] Sistema de pagamento integrado
- [ ] Upload de fotos de perfil
- [ ] Chat de suporte
- [ ] Notificações push
- [ ] Wishlist compartilhável
- [ ] Sistema de recomendações por IA
- [ ] Integração com redes sociais
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] CI/CD

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido como um projeto educacional de WebApp moderno com JavaScript puro.

## 🙏 Agradecimentos

- Font Awesome pelos ícones
- Google Fonts pela tipografia
- Comunidade open source

---

**Desenvolvido com ❤️ e ☕**
