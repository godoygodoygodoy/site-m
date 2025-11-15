// Sistema de autenticação
const AuthService = {
    currentUser: null,
    
    init() {
        // Carregar usuário do localStorage
        const savedUser = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    },
    
    login(email, senha) {
        const user = DataService.getUserByEmail(email);
        
        if (!user) {
            return { success: false, message: 'Usuário não encontrado' };
        }
        
        if (user.senha !== senha) {
            return { success: false, message: 'Senha incorreta' };
        }
        
        // Remover senha antes de salvar
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.senha;
        
        this.currentUser = userWithoutPassword;
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(userWithoutPassword));
        
        return { success: true, user: userWithoutPassword };
    },
    
    register(nome, email, senha, telefone) {
        // Verificar se email já existe
        if (DataService.getUserByEmail(email)) {
            return { success: false, message: 'Este email já está cadastrado' };
        }
        
        // Validações
        if (!nome || nome.length < 3) {
            return { success: false, message: 'Nome deve ter pelo menos 3 caracteres' };
        }
        
        if (!this.validateEmail(email)) {
            return { success: false, message: 'Email inválido' };
        }
        
        if (!senha || senha.length < 6) {
            return { success: false, message: 'Senha deve ter pelo menos 6 caracteres' };
        }
        
        // Criar novo usuário
        const newUser = DataService.addUser({ nome, email, senha, telefone });
        
        // Fazer login automático
        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.senha;
        
        this.currentUser = userWithoutPassword;
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(userWithoutPassword));
        
        return { success: true, user: userWithoutPassword };
    },
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
    },
    
    isAuthenticated() {
        return this.currentUser !== null;
    },
    
    getCurrentUser() {
        return this.currentUser;
    },
    
    updateProfile(updates) {
        if (!this.isAuthenticated()) {
            return { success: false, message: 'Usuário não autenticado' };
        }
        
        this.currentUser = { ...this.currentUser, ...updates };
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(this.currentUser));
        
        return { success: true, user: this.currentUser };
    },
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// Inicializar auth ao carregar
AuthService.init();
