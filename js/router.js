// Sistema de roteamento SPA
const Router = {
    currentPage: 'home',
    currentParams: null,
    
    init() {
        // Event listener para links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const page = link.getAttribute('href').substring(1);
                this.navigate(page);
            }
        });
        
        // Event listener para voltar/avançar do navegador
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.render(e.state.page, e.state.params, false);
            }
        });
        
        // Carregar página inicial
        const hash = window.location.hash.substring(1);
        this.navigate(hash || 'home', null, null, false);
    },
    
    navigate(page, params = null, queryParams = null, pushState = true) {
        this.currentPage = page;
        this.currentParams = params;
        
        // Atualizar URL
        let url = `#${page}`;
        if (params) url += `/${params}`;
        if (queryParams) {
            const query = new URLSearchParams(queryParams).toString();
            url += `?${query}`;
        }
        
        if (pushState) {
            history.pushState({ page, params }, '', url);
        }
        
        this.render(page, params, queryParams);
    },
    
    render(page, params = null, queryParams = null) {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;
        
        // Scroll para o topo
        window.scrollTo(0, 0);
        
        // Atualizar navegação ativa
        this.updateActiveLinks(page);
        
        // Fechar menu lateral se estiver aberto
        this.closeSideMenu();
        
        // Renderizar página
        switch(page) {
            case 'home':
                HomePage.render();
                break;
            case 'compras':
                ComprasPage.render(queryParams);
                break;
            case 'livro':
                LivroPage.render(params);
                break;
            case 'categorias':
                CategoriasPage.render();
                break;
            case 'perfil':
                PerfilPage.render();
                break;
            case 'carrinho':
                CarrinhoPage.render();
                break;
            case 'login':
                LoginPage.render();
                break;
            case 'favoritos':
                this.renderFavoritos();
                break;
            default:
                HomePage.render();
        }
    },
    
    renderFavoritos() {
        const mainContent = document.getElementById('mainContent');
        const favoritos = FavoritesService.getAll();
        
        if (favoritos.length === 0) {
            mainContent.innerHTML = Components.emptyState(
                'fa-heart-broken',
                'Nenhum favorito ainda',
                'Adicione livros aos favoritos para vê-los aqui',
                {
                    text: 'Explorar livros',
                    onClick: "Router.navigate('compras')"
                }
            );
            return;
        }
        
        mainContent.innerHTML = `
            <div class="page-header">
                <h1>Meus Favoritos</h1>
                <p>${favoritos.length} ${favoritos.length === 1 ? 'livro' : 'livros'}</p>
            </div>
            <div class="books-grid">
                ${favoritos.map(livro => Components.bookCard(livro)).join('')}
            </div>
        `;
    },
    
    updateActiveLinks(page) {
        // Atualizar menu lateral
        document.querySelectorAll('.side-menu-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
        
        // Atualizar menu inferior
        document.querySelectorAll('.bottom-nav-item').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
        
        // Atualizar título da navbar
        const pageTitle = document.getElementById('pageTitle');
        const titles = {
            home: 'BOOKSHELVE',
            compras: 'COMPRAS',
            categorias: 'CATEGORIAS',
            perfil: 'PERFIL',
            carrinho: 'CARRINHO',
            livro: 'DETALHES',
            login: 'LOGIN',
            favoritos: 'FAVORITOS'
        };
        if (pageTitle) {
            pageTitle.textContent = titles[page] || 'BOOKSHELVE';
        }
    },
    
    closeSideMenu() {
        const sideMenu = document.getElementById('sideMenu');
        const overlay = document.querySelector('.side-menu-overlay');
        if (sideMenu) sideMenu.classList.remove('active');
        if (overlay) overlay.remove();
    },
    
    requireAuth() {
        if (!AuthService.isAuthenticated()) {
            Toast.warning('Você precisa estar logado para acessar esta página');
            this.navigate('login');
            return false;
        }
        return true;
    }
};
