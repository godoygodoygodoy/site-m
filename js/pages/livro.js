// Página de detalhes do livro
const LivroPage = {
    render(livroId) {
        const mainContent = document.getElementById('mainContent');
        const livro = DataService.getLivroById(livroId);
        
        if (!livro) {
            mainContent.innerHTML = Components.emptyState(
                'fa-book',
                'Livro não encontrado',
                'O livro que você procura não existe ou foi removido',
                {
                    text: 'Voltar para compras',
                    onClick: "Router.navigate('compras')"
                }
            );
            return;
        }
        
        const reviews = DataService.getReviewsByLivro(livro.id);
        const categoria = DataService.getCategoriaById(livro.categoria_id);
        const livrosRelacionados = DataService.getLivrosByCategoria(livro.categoria_id)
            .filter(l => l.id !== livro.id)
            .slice(0, 4);
        const discount = Utils.calculateDiscount(livro.preco_original, livro.preco);
        const isFavorite = FavoritesService.isFavorite(livro.id);
        
        mainContent.innerHTML = `
            <div class="livro-page fade-in">
                <!-- Botão Voltar -->
                <button class="btn-back" onclick="history.back()">
                    <i class="fas fa-arrow-left"></i>
                    Voltar
                </button>
                
                <!-- Informações Principais -->
                <div class="livro-main">
                    <div class="livro-image-section">
                        <div class="livro-image-wrapper">
                            ${discount > 0 ? `<div class="livro-badge">-${discount}%</div>` : ''}
                            <img src="${livro.imagem}" alt="${livro.titulo}" class="livro-image"
                                 onerror="this.src='https://via.placeholder.com/400x600?text=Sem+Imagem'">
                        </div>
                        <button class="btn btn-secondary btn-block" 
                                onclick="Components.toggleFavorite(event, ${livro.id})">
                            <i class="fas fa-heart ${isFavorite ? 'active' : ''}"></i>
                            ${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                        </button>
                    </div>
                    
                    <div class="livro-info-section">
                        <div class="livro-category-badge">
                            <i class="fas ${categoria.icone}"></i>
                            ${categoria.nome}
                        </div>
                        
                        <h1 class="livro-title">${livro.titulo}</h1>
                        <p class="livro-author">por <strong>${livro.autor}</strong></p>
                        
                        <div class="livro-rating-summary">
                            ${Components.starRating(livro.nota_media, { size: 'lg' })}
                            <span class="livro-rating-text">
                                ${livro.nota_media} (${livro.total_reviews} avaliações)
                            </span>
                        </div>
                        
                        <div class="livro-description">
                            <p>${livro.descricao}</p>
                        </div>
                        
                        <div class="livro-details-grid">
                            <div class="livro-detail-item">
                                <i class="fas fa-book"></i>
                                <span>${livro.paginas} páginas</span>
                            </div>
                            <div class="livro-detail-item">
                                <i class="fas fa-calendar"></i>
                                <span>${livro.ano}</span>
                            </div>
                            <div class="livro-detail-item">
                                <i class="fas fa-building"></i>
                                <span>${livro.editora}</span>
                            </div>
                            <div class="livro-detail-item">
                                <i class="fas fa-barcode"></i>
                                <span>ISBN: ${livro.isbn}</span>
                            </div>
                        </div>
                        
                        <div class="livro-purchase-section">
                            <div class="livro-price-wrapper">
                                ${discount > 0 ? `
                                    <span class="livro-price-original">
                                        ${Utils.formatPrice(livro.preco_original)}
                                    </span>
                                ` : ''}
                                <span class="livro-price-current">
                                    ${Utils.formatPrice(livro.preco)}
                                </span>
                            </div>
                            
                            ${livro.estoque > 0 ? `
                                <p class="livro-stock">
                                    <i class="fas fa-check-circle"></i>
                                    ${livro.estoque} unidades disponíveis
                                </p>
                                <button class="btn btn-primary btn-large" 
                                        onclick="LivroPage.addToCart(${livro.id})">
                                    <i class="fas fa-shopping-cart"></i>
                                    Adicionar ao Carrinho
                                </button>
                            ` : `
                                <p class="livro-out-of-stock">
                                    <i class="fas fa-times-circle"></i>
                                    Fora de estoque
                                </p>
                            `}
                        </div>
                    </div>
                </div>
                
                <!-- Seção de Avaliações -->
                <div class="livro-reviews-section">
                    <div class="section-header">
                        <h2 class="section-title">
                            <i class="fas fa-star"></i>
                            Avaliações dos Leitores
                        </h2>
                    </div>
                    
                    <!-- Formulário de Avaliação -->
                    ${AuthService.isAuthenticated() ? `
                        <div class="review-form-card">
                            <h3>Escreva sua avaliação</h3>
                            <form id="reviewForm" onsubmit="LivroPage.submitReview(event, ${livro.id})">
                                <div class="form-group">
                                    <label>Sua nota</label>
                                    ${Components.interactiveStars(0)}
                                </div>
                                <div class="form-group">
                                    <label for="reviewComment">Seu comentário (opcional)</label>
                                    <textarea id="reviewComment" 
                                              rows="4" 
                                              class="form-textarea"
                                              placeholder="Conte o que achou deste livro..."></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-paper-plane"></i>
                                    Enviar Avaliação
                                </button>
                            </form>
                        </div>
                    ` : `
                        <div class="review-login-prompt">
                            <i class="fas fa-user-circle"></i>
                            <p>Faça login para avaliar este livro</p>
                            <button class="btn btn-primary" onclick="Router.navigate('login')">
                                Fazer Login
                            </button>
                        </div>
                    `}
                    
                    <!-- Lista de Avaliações -->
                    <div class="reviews-list">
                        ${reviews.length > 0 
                            ? reviews.map(review => Components.reviewCard(review)).join('')
                            : '<p class="no-reviews">Ainda não há avaliações para este livro. Seja o primeiro!</p>'
                        }
                    </div>
                </div>
                
                <!-- Livros Relacionados -->
                ${livrosRelacionados.length > 0 ? `
                    <div class="livro-related-section">
                        <div class="section-header">
                            <h2 class="section-title">
                                <i class="fas fa-book"></i>
                                Livros Similares
                            </h2>
                        </div>
                        <div class="books-grid">
                            ${livrosRelacionados.map(l => Components.bookCard(l)).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    },
    
    addToCart(livroId) {
        if (CartService.add(livroId)) {
            Toast.success('Livro adicionado ao carrinho!');
        }
    },
    
    submitReview(event, livroId) {
        event.preventDefault();
        
        if (!window.selectedRating) {
            Toast.warning('Por favor, selecione uma nota');
            return;
        }
        
        const comentario = document.getElementById('reviewComment').value.trim();
        const currentUser = AuthService.getCurrentUser();
        
        const review = {
            livro_id: livroId,
            usuario_id: currentUser.id,
            nota: window.selectedRating,
            comentario: comentario || 'Sem comentário'
        };
        
        DataService.addReview(review);
        Toast.success('Avaliação enviada com sucesso!');
        
        // Recarregar página
        setTimeout(() => {
            this.render(livroId);
        }, 1000);
    }
};
