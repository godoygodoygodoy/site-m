// Componentes reutilizáveis
const Components = {
    // Card de livro
    bookCard(livro, options = {}) {
        const { showAddToCart = true, showFavorite = true } = options;
        const discount = Utils.calculateDiscount(livro.preco_original, livro.preco);
        const isFavorite = FavoritesService.isFavorite(livro.id);
        
        return `
            <div class="book-card hover-lift stagger-item" data-livro-id="${livro.id}">
                ${discount > 0 ? `<div class="book-card-badge">-${discount}%</div>` : ''}
                ${showFavorite ? `
                    <button class="book-card-favorite ${isFavorite ? 'active' : ''}" 
                            onclick="Components.toggleFavorite(event, ${livro.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                ` : ''}
                <div class="book-card-image" onclick="Router.navigate('livro', ${livro.id})">
                    <img src="${livro.imagem}" alt="${livro.titulo}" 
                         onerror="this.src='https://via.placeholder.com/200x300?text=Sem+Imagem'">
                </div>
                <div class="book-card-content">
                    <h3 class="book-card-title" onclick="Router.navigate('livro', ${livro.id})">
                        ${Utils.truncate(livro.titulo, 50)}
                    </h3>
                    <p class="book-card-author">${livro.autor}</p>
                    <div class="book-card-rating">
                        ${this.starRating(livro.nota_media)}
                        <span class="book-card-rating-text">
                            ${livro.nota_media} (${livro.total_reviews})
                        </span>
                    </div>
                    <div class="book-card-price">
                        ${discount > 0 ? `
                            <span class="book-card-price-original">${Utils.formatPrice(livro.preco_original)}</span>
                        ` : ''}
                        <span class="book-card-price-current">${Utils.formatPrice(livro.preco)}</span>
                    </div>
                    ${showAddToCart ? `
                        <button class="btn btn-primary btn-block" 
                                onclick="Components.addToCart(event, ${livro.id})">
                            <i class="fas fa-shopping-cart"></i>
                            Adicionar ao carrinho
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    },
    
    // Sistema de estrelas
    starRating(rating, options = {}) {
        const { interactive = false, size = 'md' } = options;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += `<i class="fas fa-star star-filled"></i>`;
        }
        
        if (hasHalfStar) {
            stars += `<i class="fas fa-star-half-alt star-filled"></i>`;
        }
        
        for (let i = 0; i < emptyStars; i++) {
            stars += `<i class="far fa-star star-empty"></i>`;
        }
        
        return `<div class="star-rating star-rating-${size}">${stars}</div>`;
    },
    
    // Estrelas interativas para review
    interactiveStars(currentRating = 0) {
        let html = '<div class="interactive-stars">';
        for (let i = 1; i <= 5; i++) {
            html += `
                <button type="button" class="star-btn ${i <= currentRating ? 'active' : ''}" 
                        data-rating="${i}" onclick="Components.setRating(${i})">
                    <i class="fas fa-star"></i>
                </button>
            `;
        }
        html += '</div>';
        return html;
    },
    
    setRating(rating) {
        const stars = document.querySelectorAll('.star-btn');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
        
        // Armazenar rating selecionado
        window.selectedRating = rating;
    },
    
    // Card de categoria
    categoryCard(categoria) {
        return `
            <div class="category-card hover-lift stagger-item" 
                 onclick="Router.navigate('compras', null, { categoria: ${categoria.id} })">
                <div class="category-card-icon">
                    <i class="fas ${categoria.icone}"></i>
                </div>
                <div class="category-card-content">
                    <h3 class="category-card-title">${categoria.nome}</h3>
                    <p class="category-card-description">${categoria.descricao}</p>
                </div>
            </div>
        `;
    },
    
    // Card de review
    reviewCard(review) {
        const usuario = DataService.getUserById(review.usuario_id);
        const currentUser = AuthService.getCurrentUser();
        const isOwner = currentUser && currentUser.id === review.usuario_id;
        
        return `
            <div class="review-card">
                <div class="review-card-header">
                    <div class="review-card-avatar">
                        ${Utils.getInitials(usuario.nome)}
                    </div>
                    <div class="review-card-info">
                        <h4 class="review-card-author">${usuario.nome}</h4>
                        <div class="review-card-meta">
                            ${this.starRating(review.nota, { size: 'sm' })}
                            <span class="review-card-date">${Utils.formatDate(review.data)}</span>
                        </div>
                    </div>
                    ${isOwner ? `
                        <div class="review-card-actions">
                            <button class="btn-icon" onclick="Components.editReview(${review.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon" onclick="Components.deleteReview(${review.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    ` : ''}
                </div>
                <p class="review-card-comment">${Utils.escapeHtml(review.comentario)}</p>
                <div class="review-card-footer">
                    <button class="review-card-helpful">
                        <i class="fas fa-thumbs-up"></i>
                        Útil (${review.util})
                    </button>
                </div>
            </div>
        `;
    },
    
    // Botão de carregamento
    loadingButton(text = 'Carregando...') {
        return `
            <button class="btn btn-primary" disabled>
                <span class="spinner-sm"></span>
                ${text}
            </button>
        `;
    },
    
    // Card de item do carrinho
    cartItemCard(item) {
        const { livro, quantidade } = item;
        const subtotal = livro.preco * quantidade;
        
        return `
            <div class="cart-item" data-livro-id="${livro.id}">
                <div class="cart-item-image">
                    <img src="${livro.imagem}" alt="${livro.titulo}"
                         onerror="this.src='https://via.placeholder.com/100x150?text=Sem+Imagem'">
                </div>
                <div class="cart-item-content">
                    <h3 class="cart-item-title">${livro.titulo}</h3>
                    <p class="cart-item-author">${livro.autor}</p>
                    <p class="cart-item-price">${Utils.formatPrice(livro.preco)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="Components.updateCartQuantity(${livro.id}, ${quantidade - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" value="${quantidade}" min="1" max="99" 
                           onchange="Components.updateCartQuantity(${livro.id}, this.value)">
                    <button class="qty-btn" onclick="Components.updateCartQuantity(${livro.id}, ${quantidade + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-subtotal">
                    <p class="cart-item-subtotal-value">${Utils.formatPrice(subtotal)}</p>
                    <button class="btn-icon btn-remove" onclick="Components.removeFromCart(${livro.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    },
    
    // Estado vazio
    emptyState(icon, title, message, action = null) {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <h2 class="empty-state-title">${title}</h2>
                <p class="empty-state-message">${message}</p>
                ${action ? `
                    <button class="btn btn-primary" onclick="${action.onClick}">
                        ${action.text}
                    </button>
                ` : ''}
            </div>
        `;
    },
    
    // Skeleton loading
    bookCardSkeleton() {
        return `
            <div class="book-card skeleton-card">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text" style="width: 60%"></div>
            </div>
        `;
    },
    
    // Funções de ação
    addToCart(event, livroId) {
        event.stopPropagation();
        if (CartService.add(livroId)) {
            Toast.success('Livro adicionado ao carrinho!');
        }
    },
    
    removeFromCart(livroId) {
        CartService.remove(livroId);
        Toast.success('Livro removido do carrinho');
        // Recarregar página do carrinho
        if (Router.currentPage === 'carrinho') {
            CarrinhoPage.render();
        }
    },
    
    updateCartQuantity(livroId, newQuantity) {
        const qty = parseInt(newQuantity);
        if (qty < 1) {
            this.removeFromCart(livroId);
        } else {
            CartService.updateQuantity(livroId, qty);
            if (Router.currentPage === 'carrinho') {
                CarrinhoPage.render();
            }
        }
    },
    
    toggleFavorite(event, livroId) {
        event.stopPropagation();
        FavoritesService.toggle(livroId);
        const btn = event.currentTarget;
        btn.classList.toggle('active');
        
        if (FavoritesService.isFavorite(livroId)) {
            Toast.success('Adicionado aos favoritos!');
        } else {
            Toast.info('Removido dos favoritos');
        }
    },
    
    editReview(reviewId) {
        Toast.info('Funcionalidade em desenvolvimento');
    },
    
    deleteReview(reviewId) {
        if (confirm('Deseja realmente excluir esta avaliação?')) {
            Toast.success('Avaliação excluída');
        }
    }
};
