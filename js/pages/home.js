// Página Home
const HomePage = {
    render() {
        const mainContent = document.getElementById('mainContent');
        const destaques = DataService.getLivrosDestaque();
        const maisVendidos = DataService.getLivrosMaisVendidos().slice(0, 8);
        const categorias = DataService.getAllCategorias().slice(0, 6);
        
        mainContent.innerHTML = `
            <div class="home-page fade-in">
                <!-- Hero Section -->
                <section class="hero-section">
                    <div class="hero-content">
                        <h1 class="hero-title">Bem-vindo ao Bookshelve</h1>
                        <p class="hero-subtitle">Descubra seu próximo livro favorito</p>
                        <div class="hero-search">
                            <input type="text" 
                                   placeholder="Buscar por título, autor..." 
                                   id="heroSearch"
                                   class="hero-search-input">
                            <button class="btn btn-primary" onclick="HomePage.search()">
                                <i class="fas fa-search"></i>
                                Buscar
                            </button>
                        </div>
                    </div>
                </section>
                
                <!-- Categorias em Destaque -->
                <section class="home-section">
                    <div class="section-header">
                        <h2 class="section-title">Categorias</h2>
                        <a href="#categorias" class="section-link">
                            Ver todas <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div class="categories-grid">
                        ${categorias.map(cat => Components.categoryCard(cat)).join('')}
                    </div>
                </section>
                
                <!-- Livros em Destaque -->
                <section class="home-section">
                    <div class="section-header">
                        <h2 class="section-title">
                            <i class="fas fa-star"></i>
                            Destaques
                        </h2>
                    </div>
                    <div class="books-grid">
                        ${destaques.map(livro => Components.bookCard(livro)).join('')}
                    </div>
                </section>
                
                <!-- Mais Vendidos -->
                <section class="home-section">
                    <div class="section-header">
                        <h2 class="section-title">
                            <i class="fas fa-fire"></i>
                            Mais Vendidos
                        </h2>
                        <a href="#compras" class="section-link">
                            Ver todos <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div class="books-grid">
                        ${maisVendidos.map(livro => Components.bookCard(livro)).join('')}
                    </div>
                </section>
                
                <!-- Banner Promocional -->
                <section class="promo-banner">
                    <div class="promo-content">
                        <h3 class="promo-title">Aproveite nossos descontos!</h3>
                        <p class="promo-text">Até 40% OFF em livros selecionados</p>
                        <button class="btn btn-secondary" onclick="Router.navigate('compras')">
                            Conferir ofertas
                        </button>
                    </div>
                </section>
            </div>
        `;
        
        // Event listener para busca com Enter
        const searchInput = document.getElementById('heroSearch');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.search();
                }
            });
        }
    },
    
    search() {
        const input = document.getElementById('heroSearch');
        if (input && input.value.trim()) {
            Router.navigate('compras', null, { q: input.value.trim() });
        }
    }
};
