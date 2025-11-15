// Utilitários gerais
const Utils = {
    // Formatação de preço
    formatPrice(price) {
        return `R$ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
    },
    
    // Formatação de data
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    },
    
    // Calcular desconto percentual
    calculateDiscount(original, current) {
        if (!original || original === current) return 0;
        return Math.round(((original - current) / original) * 100);
    },
    
    // Debounce para buscas
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Gerar iniciais do nome
    getInitials(name) {
        if (!name) return '?';
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    },
    
    // Sanitizar HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Gerar ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Scroll suave para elemento
    scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },
    
    // Copiar para clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            return false;
        }
    },
    
    // Verificar se está em dispositivo móvel
    isMobile() {
        return window.innerWidth < 768;
    },
    
    // Truncar texto
    truncate(text, length) {
        if (text.length <= length) return text;
        return text.substr(0, length) + '...';
    }
};

// Carrinho de compras
const CartService = {
    items: [],
    
    init() {
        const savedCart = localStorage.getItem(CONFIG.STORAGE_KEYS.CART);
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
        this.updateBadge();
    },
    
    add(livroId, quantidade = 1) {
        const livro = DataService.getLivroById(livroId);
        if (!livro) return false;
        
        const existingItem = this.items.find(item => item.livroId === livroId);
        
        if (existingItem) {
            existingItem.quantidade += quantidade;
        } else {
            this.items.push({
                livroId,
                quantidade,
                adicionadoEm: new Date().toISOString()
            });
        }
        
        this.save();
        return true;
    },
    
    remove(livroId) {
        this.items = this.items.filter(item => item.livroId !== livroId);
        this.save();
    },
    
    updateQuantity(livroId, quantidade) {
        const item = this.items.find(item => item.livroId === livroId);
        if (item) {
            item.quantidade = Math.max(1, quantidade);
            this.save();
        }
    },
    
    clear() {
        this.items = [];
        this.save();
    },
    
    getItems() {
        return this.items.map(item => {
            const livro = DataService.getLivroById(item.livroId);
            return {
                ...item,
                livro
            };
        });
    },
    
    getTotal() {
        return this.items.reduce((total, item) => {
            const livro = DataService.getLivroById(item.livroId);
            return total + (livro.preco * item.quantidade);
        }, 0);
    },
    
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantidade, 0);
    },
    
    save() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify(this.items));
        this.updateBadge();
    },
    
    updateBadge() {
        const badge = document.getElementById('cartBadge');
        if (badge) {
            const count = this.getItemCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
};

// Favoritos
const FavoritesService = {
    favorites: [],
    
    init() {
        const savedFavorites = localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES);
        if (savedFavorites) {
            this.favorites = JSON.parse(savedFavorites);
        }
    },
    
    toggle(livroId) {
        const index = this.favorites.indexOf(livroId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(livroId);
        }
        this.save();
    },
    
    isFavorite(livroId) {
        return this.favorites.includes(livroId);
    },
    
    getAll() {
        return this.favorites.map(id => DataService.getLivroById(id)).filter(Boolean);
    },
    
    save() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(this.favorites));
    }
};

// Sistema de notificações toast
const Toast = {
    show(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const id = Utils.generateId();
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-message">${Utils.escapeHtml(message)}</div>
            </div>
            <button class="toast-close" onclick="Toast.hide('${id}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        toast.id = id;
        
        container.appendChild(toast);
        
        // Auto remover
        setTimeout(() => {
            this.hide(id);
        }, duration);
    },
    
    hide(id) {
        const toast = document.getElementById(id);
        if (toast) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }
    },
    
    success(message, duration) {
        this.show(message, 'success', duration);
    },
    
    error(message, duration) {
        this.show(message, 'error', duration);
    },
    
    warning(message, duration) {
        this.show(message, 'warning', duration);
    },
    
    info(message, duration) {
        this.show(message, 'info', duration);
    }
};

// Sistema de tema
const ThemeService = {
    currentTheme: 'light',
    
    init() {
        const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
        if (savedTheme) {
            this.currentTheme = savedTheme;
        }
        this.apply();
    },
    
    toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.apply();
        this.save();
    },
    
    apply() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    },
    
    save() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, this.currentTheme);
    }
};

// Inicializar serviços
CartService.init();
FavoritesService.init();
ThemeService.init();
