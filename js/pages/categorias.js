// Página de Categorias
const CategoriasPage = {
    render() {
        const mainContent = document.getElementById('mainContent');
        const categorias = DataService.getAllCategorias();
        
        // Contar livros por categoria
        const categoriasComContador = categorias.map(cat => {
            const livros = DataService.getLivrosByCategoria(cat.id);
            return { ...cat, totalLivros: livros.length };
        });
        
        mainContent.innerHTML = `
            <div class="categorias-page fade-in">
                <div class="page-header">
                    <h1>Todas as Categorias</h1>
                    <p>Explore nossa coleção organizada por temas</p>
                </div>
                
                <div class="categories-list">
                    ${categoriasComContador.map(cat => `
                        <div class="category-list-item hover-lift stagger-item"
                             onclick="Router.navigate('compras', null, { categoria: ${cat.id} })">
                            <div class="category-list-icon">
                                <i class="fas ${cat.icone}"></i>
                            </div>
                            <div class="category-list-content">
                                <h3 class="category-list-title">${cat.nome}</h3>
                                <p class="category-list-description">${cat.descricao}</p>
                                <span class="category-list-count">
                                    ${cat.totalLivros} ${cat.totalLivros === 1 ? 'livro' : 'livros'}
                                </span>
                            </div>
                            <i class="fas fa-chevron-right category-list-arrow"></i>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
};
