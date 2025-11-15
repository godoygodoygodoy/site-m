// Inicialização da aplicação
const App = {
    init() {
        console.log('🚀 Iniciando Bookshelve...');
        
        // Inicializar serviços
        this.setupEventListeners();
        this.initRouter();
        this.hideLoading();
        
        console.log('✅ Bookshelve carregado com sucesso!');
    },
    
    setupEventListeners() {
        // Menu lateral
        const menuToggle = document.getElementById('menuToggle');
        const closeMenu = document.getElementById('closeMenu');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleSideMenu());
        }
        
        if (closeMenu) {
            closeMenu.addEventListener('click', () => this.toggleSideMenu());
        }
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                ThemeService.toggle();
            });
        }
        
        // Atualizar informações do usuário no menu
        this.updateSideMenuUser();
    },
    
    toggleSideMenu() {
        const sideMenu = document.getElementById('sideMenu');
        const isActive = sideMenu.classList.contains('active');
        
        if (isActive) {
            // Fechar menu
            sideMenu.classList.remove('active');
            const overlay = document.querySelector('.side-menu-overlay');
            if (overlay) overlay.remove();
        } else {
            // Abrir menu
            sideMenu.classList.add('active');
            
            // Criar overlay
            const overlay = document.createElement('div');
            overlay.className = 'side-menu-overlay active';
            overlay.addEventListener('click', () => this.toggleSideMenu());
            document.body.appendChild(overlay);
        }
    },
    
    updateSideMenuUser() {
        const container = document.getElementById('sideMenuUser');
        if (!container) return;
        
        const user = AuthService.getCurrentUser();
        
        if (user) {
            container.innerHTML = `
                <div class="side-menu-user-card">
                    <div class="side-menu-user-avatar">
                        ${Utils.getInitials(user.nome)}
                    </div>
                    <div class="side-menu-user-info">
                        <h3>${user.nome}</h3>
                        <p>${user.email}</p>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <button class="btn btn-primary btn-block" onclick="Router.navigate('login')">
                    <i class="fas fa-sign-in-alt"></i>
                    Fazer Login
                </button>
            `;
        }
    },
    
    initRouter() {
        Router.init();
    },
    
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 500);
        }
    }
};

// Iniciar aplicação quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Atualizar badge do carrinho periodicamente
setInterval(() => {
    CartService.updateBadge();
}, 1000);
