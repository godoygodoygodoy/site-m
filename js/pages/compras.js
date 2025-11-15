// Página Compras (listagem com filtros)
const ComprasPage = {
    currentFilters: {
        categoria: null,
        autor: null,
        precoMin: null,
        precoMax: null,
        notaMin: null,
        ordenacao: 'relevancia',
        query: ''
    },
    
    render(queryParams = {}) {
        const mainContent = document.getElementById('mainContent');
        
        // Atualizar filtros com query params
        if (queryParams) {
            if (queryParams.categoria) this.currentFilters.categoria = parseInt(queryParams.categoria);
            if (queryParams.q) this.currentFilters.query = queryParams.q;
        }
        
        // Obter livros filtrados
        const livros = this.getFilteredBooks();
        const categorias = DataService.getAllCategorias();
        const autores = this.getUniqueAuthors();
        
        mainContent.innerHTML = `
            <div class="compras-page fade-in">
                <!-- Barra de Busca -->
                <div class="search-bar">
                    <div class="search-input-wrapper">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" 
                               placeholder="Buscar livros..." 
                               id="searchInput"
                               value="${this.currentFilters.query}"
                               class="search-input">
                    </div>
                    <button class="btn-filter" onclick="ComprasPage.toggleFilters()">
                        <i class="fas fa-filter"></i>
                        Filtrar
                    </button>
                </div>
                
                <!-- Painel de Filtros -->
                <div class="filters-panel" id="filtersPanel">
                    <div class="filters-header">
                        <h3>Filtros</h3>
                        <button class="btn-text" onclick="ComprasPage.clearFilters()">
                            Limpar
                        </button>
                    </div>
                    
                    <div class="filters-content">
                        <!-- Categoria -->
                        <div class="filter-group">
                            <label class="filter-label">Categoria</label>
                            <select class="filter-select" id="filterCategoria" 
                                    onchange="ComprasPage.updateFilter('categoria', this.value)">
                                <option value="">Todas</option>
                                ${categorias.map(cat => `
                                    <option value="${cat.id}" 
                                            ${this.currentFilters.categoria === cat.id ? 'selected' : ''}>
                                        ${cat.nome}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        
                        <!-- Ordenação -->
                        <div class="filter-group">
                            <label class="filter-label">Ordenar por</label>
                            <select class="filter-select" id="filterOrdenacao"
                                    onchange="ComprasPage.updateFilter('ordenacao', this.value)">
                                <option value="relevancia">Relevância</option>
                                <option value="menor-preco">Menor preço</option>
                                <option value="maior-preco">Maior preço</option>
                                <option value="mais-vendidos">Mais vendidos</option>
                                <option value="melhor-avaliacao">Melhor avaliação</option>
                            </select>
                        </div>
                        
                        <!-- Faixa de Preço -->
                        <div class="filter-group">
                            <label class="filter-label">Preço</label>
                            <div class="price-inputs">
                                <input type="number" 
                                       placeholder="Mín" 
                                       id="filterPrecoMin"
                                       class="filter-input-small"
                                       onchange="ComprasPage.updateFilter('precoMin', this.value)">
                                <span>até</span>
                                <input type="number" 
                                       placeholder="Máx" 
                                       id="filterPrecoMax"
                                       class="filter-input-small"
                                       onchange="ComprasPage.updateFilter('precoMax', this.value)">
                            </div>
                        </div>
                        
                        <!-- Avaliação Mínima -->
                        <div class="filter-group">
                            <label class="filter-label">Avaliação mínima</label>
                            <div class="rating-filter">
                                ${[5, 4, 3, 2, 1].map(nota => `
                                    <label class="rating-option">
                                        <input type="radio" 
                                               name="notaMin" 
                                               value="${nota}"
                                               onchange="ComprasPage.updateFilter('notaMin', ${nota})">
                                        ${Components.starRating(nota, { size: 'sm' })}
                                        <span>ou mais</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-block" onclick="ComprasPage.applyFilters()">
                        Aplicar Filtros
                    </button>
                </div>
                
                <!-- Filtros Ativos -->
                ${this.renderActiveFilters()}
                
                <!-- Resultados -->
                <div class="results-header">
                    <p class="results-count">
                        ${livros.length} ${livros.length === 1 ? 'livro encontrado' : 'livros encontrados'}
                    </p>
                </div>
                
                <!-- Grid de Livros -->
                <div class="books-grid">
                    ${livros.length > 0 
                        ? livros.map(livro => Components.bookCard(livro)).join('')
                        : Components.emptyState(
                            'fa-search',
                            'Nenhum livro encontrado',
                            'Tente ajustar os filtros ou buscar por outros termos',
                            {
                                text: 'Limpar filtros',
                                onClick: 'ComprasPage.clearFilters()'
                            }
                        )
                    }
                </div>
            </div>
        `;
        
        // Event listener para busca
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                this.currentFilters.query = e.target.value;
                this.applyFilters();
            }, 500));
        }
    },
    
    renderActiveFilters() {
        const active = [];
        
        if (this.currentFilters.categoria) {
            const cat = DataService.getCategoriaById(this.currentFilters.categoria);
            active.push({
                label: cat.nome,
                remove: () => this.updateFilter('categoria', null)
            });
        }
        
        if (this.currentFilters.query) {
            active.push({
                label: `"${this.currentFilters.query}"`,
                remove: () => {
                    this.updateFilter('query', '');
                    document.getElementById('searchInput').value = '';
                }
            });
        }
        
        if (this.currentFilters.notaMin) {
            active.push({
                label: `${this.currentFilters.notaMin}+ estrelas`,
                remove: () => this.updateFilter('notaMin', null)
            });
        }
        
        if (active.length === 0) return '';
        
        return `
            <div class="active-filters">
                <span class="active-filters-label">Filtros ativos:</span>
                ${active.map((filter, index) => `
                    <span class="filter-chip">
                        ${filter.label}
                        <button onclick="ComprasPage.removeActiveFilter(${index})">
                            <i class="fas fa-times"></i>
                        </button>
                    </span>
                `).join('')}
            </div>
        `;
    },
    
    getFilteredBooks() {
        let livros = DataService.getAllLivros();
        
        // Filtrar por categoria
        if (this.currentFilters.categoria) {
            livros = livros.filter(l => l.categoria_id === this.currentFilters.categoria);
        }
        
        // Filtrar por busca
        if (this.currentFilters.query) {
            const q = this.currentFilters.query.toLowerCase();
            livros = livros.filter(l => 
                l.titulo.toLowerCase().includes(q) ||
                l.autor.toLowerCase().includes(q)
            );
        }
        
        // Filtrar por preço
        if (this.currentFilters.precoMin) {
            livros = livros.filter(l => l.preco >= parseFloat(this.currentFilters.precoMin));
        }
        if (this.currentFilters.precoMax) {
            livros = livros.filter(l => l.preco <= parseFloat(this.currentFilters.precoMax));
        }
        
        // Filtrar por avaliação
        if (this.currentFilters.notaMin) {
            livros = livros.filter(l => l.nota_media >= this.currentFilters.notaMin);
        }
        
        // Ordenar
        switch(this.currentFilters.ordenacao) {
            case 'menor-preco':
                livros.sort((a, b) => a.preco - b.preco);
                break;
            case 'maior-preco':
                livros.sort((a, b) => b.preco - a.preco);
                break;
            case 'mais-vendidos':
                livros.sort((a, b) => b.total_reviews - a.total_reviews);
                break;
            case 'melhor-avaliacao':
                livros.sort((a, b) => b.nota_media - a.nota_media);
                break;
        }
        
        return livros;
    },
    
    getUniqueAuthors() {
        const livros = DataService.getAllLivros();
        return [...new Set(livros.map(l => l.autor))].sort();
    },
    
    updateFilter(key, value) {
        this.currentFilters[key] = value || null;
    },
    
    applyFilters() {
        this.render(this.currentFilters);
    },
    
    clearFilters() {
        this.currentFilters = {
            categoria: null,
            autor: null,
            precoMin: null,
            precoMax: null,
            notaMin: null,
            ordenacao: 'relevancia',
            query: ''
        };
        this.render();
    },
    
    toggleFilters() {
        const panel = document.getElementById('filtersPanel');
        if (panel) {
            panel.classList.toggle('active');
        }
    },
    
    removeActiveFilter(index) {
        // Implementação simplificada - limpar todos
        this.clearFilters();
    }
};
