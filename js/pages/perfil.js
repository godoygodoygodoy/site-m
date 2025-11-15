// Página de Perfil
const PerfilPage = {
    render() {
        const mainContent = document.getElementById('mainContent');
        
        if (!AuthService.isAuthenticated()) {
            mainContent.innerHTML = `
                <div class="perfil-page fade-in">
                    ${Components.emptyState(
                        'fa-user-circle',
                        'Você não está logado',
                        'Faça login para acessar seu perfil',
                        {
                            text: 'Fazer Login',
                            onClick: "Router.navigate('login')"
                        }
                    )}
                </div>
            `;
            return;
        }
        
        const user = AuthService.getCurrentUser();
        const historico = DataService.getHistoricoByUser(user.id);
        const reviews = DATABASE.reviews.filter(r => r.usuario_id === user.id);
        const favoritos = FavoritesService.getAll();
        
        mainContent.innerHTML = `
            <div class="perfil-page fade-in">
                <!-- Cabeçalho do Perfil -->
                <div class="perfil-header">
                    <div class="perfil-avatar-large">
                        ${Utils.getInitials(user.nome)}
                    </div>
                    <div class="perfil-info">
                        <h1 class="perfil-name">${user.nome}</h1>
                        <p class="perfil-email">${user.email}</p>
                        ${user.telefone ? `<p class="perfil-phone">${user.telefone}</p>` : ''}
                    </div>
                    <button class="btn btn-secondary" onclick="PerfilPage.editProfile()">
                        <i class="fas fa-edit"></i>
                        Editar Perfil
                    </button>
                </div>
                
                <!-- Estatísticas -->
                <div class="perfil-stats">
                    <div class="perfil-stat-card">
                        <i class="fas fa-shopping-bag stat-icon"></i>
                        <span class="stat-value">${historico.length}</span>
                        <span class="stat-label">Compras</span>
                    </div>
                    <div class="perfil-stat-card">
                        <i class="fas fa-star stat-icon"></i>
                        <span class="stat-value">${reviews.length}</span>
                        <span class="stat-label">Avaliações</span>
                    </div>
                    <div class="perfil-stat-card">
                        <i class="fas fa-heart stat-icon"></i>
                        <span class="stat-value">${favoritos.length}</span>
                        <span class="stat-label">Favoritos</span>
                    </div>
                </div>
                
                <!-- Abas de Conteúdo -->
                <div class="perfil-tabs">
                    <button class="perfil-tab active" onclick="PerfilPage.showTab('historico')">
                        Histórico de Compras
                    </button>
                    <button class="perfil-tab" onclick="PerfilPage.showTab('reviews')">
                        Minhas Avaliações
                    </button>
                    <button class="perfil-tab" onclick="PerfilPage.showTab('favoritos')">
                        Meus Favoritos
                    </button>
                </div>
                
                <!-- Conteúdo das Abas -->
                <div class="perfil-tab-content">
                    <div id="tab-historico" class="tab-pane active">
                        ${this.renderHistorico(historico)}
                    </div>
                    <div id="tab-reviews" class="tab-pane">
                        ${this.renderReviews(reviews)}
                    </div>
                    <div id="tab-favoritos" class="tab-pane">
                        ${this.renderFavoritos(favoritos)}
                    </div>
                </div>
                
                <!-- Botão de Logout -->
                <div class="perfil-actions">
                    <button class="btn btn-danger" onclick="PerfilPage.logout()">
                        <i class="fas fa-sign-out-alt"></i>
                        Sair da Conta
                    </button>
                </div>
            </div>
        `;
    },
    
    renderHistorico(historico) {
        if (historico.length === 0) {
            return '<p class="empty-tab">Você ainda não realizou nenhuma compra.</p>';
        }
        
        return `
            <div class="historico-list">
                ${historico.map(compra => `
                    <div class="historico-card">
                        <div class="historico-header">
                            <div>
                                <span class="historico-id">Pedido #${compra.id}</span>
                                <span class="historico-date">${Utils.formatDate(compra.data)}</span>
                            </div>
                            <span class="historico-status status-${compra.status}">
                                ${compra.status}
                            </span>
                        </div>
                        <div class="historico-items">
                            ${compra.itens.map(item => {
                                const livro = DataService.getLivroById(item.livro_id);
                                return `
                                    <div class="historico-item">
                                        <img src="${livro.imagem}" alt="${livro.titulo}">
                                        <div class="historico-item-info">
                                            <p class="historico-item-title">${livro.titulo}</p>
                                            <p class="historico-item-qty">Quantidade: ${item.quantidade}</p>
                                        </div>
                                        <p class="historico-item-price">
                                            ${Utils.formatPrice(item.preco * item.quantidade)}
                                        </p>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        <div class="historico-footer">
                            <span class="historico-total">
                                Total: <strong>${Utils.formatPrice(compra.total)}</strong>
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    renderReviews(reviews) {
        if (reviews.length === 0) {
            return '<p class="empty-tab">Você ainda não fez nenhuma avaliação.</p>';
        }
        
        return `
            <div class="reviews-list">
                ${reviews.map(review => {
                    const livro = DataService.getLivroById(review.livro_id);
                    return `
                        <div class="my-review-card">
                            <div class="my-review-book">
                                <img src="${livro.imagem}" alt="${livro.titulo}" 
                                     onclick="Router.navigate('livro', ${livro.id})">
                                <div>
                                    <h4 onclick="Router.navigate('livro', ${livro.id})">${livro.titulo}</h4>
                                    <p>${livro.autor}</p>
                                </div>
                            </div>
                            <div class="my-review-content">
                                ${Components.starRating(review.nota)}
                                <p class="my-review-date">${Utils.formatDate(review.data)}</p>
                                <p class="my-review-comment">${review.comentario}</p>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },
    
    renderFavoritos(favoritos) {
        if (favoritos.length === 0) {
            return '<p class="empty-tab">Você não tem livros favoritos ainda.</p>';
        }
        
        return `
            <div class="books-grid">
                ${favoritos.map(livro => Components.bookCard(livro)).join('')}
            </div>
        `;
    },
    
    showTab(tabName) {
        // Atualizar botões
        document.querySelectorAll('.perfil-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Atualizar conteúdo
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(`tab-${tabName}`).classList.add('active');
    },
    
    editProfile() {
        Toast.info('Funcionalidade de edição em desenvolvimento');
    },
    
    logout() {
        if (confirm('Deseja realmente sair da sua conta?')) {
            AuthService.logout();
            Toast.success('Logout realizado com sucesso');
            Router.navigate('home');
        }
    }
};
