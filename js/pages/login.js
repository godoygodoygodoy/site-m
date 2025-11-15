// Página de Login/Cadastro
const LoginPage = {
    mode: 'login', // 'login' ou 'register'
    
    render() {
        const mainContent = document.getElementById('mainContent');
        
        if (AuthService.isAuthenticated()) {
            Router.navigate('perfil');
            return;
        }
        
        mainContent.innerHTML = `
            <div class="login-page fade-in">
                <div class="login-container">
                    <div class="login-header">
                        <h1 class="login-title">Bookshelve</h1>
                        <p class="login-subtitle">Sua livraria online favorita</p>
                    </div>
                    
                    <!-- Abas -->
                    <div class="login-tabs">
                        <button class="login-tab ${this.mode === 'login' ? 'active' : ''}" 
                                onclick="LoginPage.switchMode('login')">
                            Entrar
                        </button>
                        <button class="login-tab ${this.mode === 'register' ? 'active' : ''}" 
                                onclick="LoginPage.switchMode('register')">
                            Criar Conta
                        </button>
                    </div>
                    
                    <!-- Formulário de Login -->
                    <div id="loginForm" class="login-form ${this.mode === 'login' ? 'active' : ''}">
                        <form onsubmit="LoginPage.handleLogin(event)">
                            <div class="form-group">
                                <label for="loginEmail">Email</label>
                                <input type="email" 
                                       id="loginEmail" 
                                       class="form-input" 
                                       placeholder="seu@email.com"
                                       required>
                            </div>
                            
                            <div class="form-group">
                                <label for="loginPassword">Senha</label>
                                <input type="password" 
                                       id="loginPassword" 
                                       class="form-input" 
                                       placeholder="••••••••"
                                       required>
                            </div>
                            
                            <div class="form-footer">
                                <label class="checkbox-label">
                                    <input type="checkbox">
                                    <span>Lembrar de mim</span>
                                </label>
                                <a href="#" class="form-link" onclick="LoginPage.forgotPassword(); return false;">
                                    Esqueceu a senha?
                                </a>
                            </div>
                            
                            <button type="submit" class="btn btn-primary btn-large btn-block">
                                Entrar
                            </button>
                        </form>
                        
                        <!-- Login Rápido para Teste -->
                        <div class="quick-login">
                            <p class="quick-login-text">Para testar, use:</p>
                            <div class="quick-login-credentials">
                                <code>Email: maria@email.com</code>
                                <code>Senha: 123456</code>
                            </div>
                            <button class="btn btn-secondary btn-sm" onclick="LoginPage.quickLogin()">
                                Login Rápido
                            </button>
                        </div>
                    </div>
                    
                    <!-- Formulário de Registro -->
                    <div id="registerForm" class="login-form ${this.mode === 'register' ? 'active' : ''}">
                        <form onsubmit="LoginPage.handleRegister(event)">
                            <div class="form-group">
                                <label for="registerName">Nome Completo</label>
                                <input type="text" 
                                       id="registerName" 
                                       class="form-input" 
                                       placeholder="Seu nome"
                                       required>
                            </div>
                            
                            <div class="form-group">
                                <label for="registerEmail">Email</label>
                                <input type="email" 
                                       id="registerEmail" 
                                       class="form-input" 
                                       placeholder="seu@email.com"
                                       required>
                            </div>
                            
                            <div class="form-group">
                                <label for="registerPhone">Telefone (opcional)</label>
                                <input type="tel" 
                                       id="registerPhone" 
                                       class="form-input" 
                                       placeholder="(11) 99999-9999">
                            </div>
                            
                            <div class="form-group">
                                <label for="registerPassword">Senha</label>
                                <input type="password" 
                                       id="registerPassword" 
                                       class="form-input" 
                                       placeholder="Mínimo 6 caracteres"
                                       required>
                            </div>
                            
                            <div class="form-group">
                                <label for="registerPasswordConfirm">Confirmar Senha</label>
                                <input type="password" 
                                       id="registerPasswordConfirm" 
                                       class="form-input" 
                                       placeholder="Repita a senha"
                                       required>
                            </div>
                            
                            <label class="checkbox-label">
                                <input type="checkbox" required>
                                <span>Aceito os termos de uso e política de privacidade</span>
                            </label>
                            
                            <button type="submit" class="btn btn-primary btn-large btn-block">
                                Criar Conta
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },
    
    switchMode(mode) {
        this.mode = mode;
        this.render();
    },
    
    handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const senha = document.getElementById('loginPassword').value;
        
        const result = AuthService.login(email, senha);
        
        if (result.success) {
            Toast.success(`Bem-vindo, ${result.user.nome}!`);
            Router.navigate('home');
        } else {
            Toast.error(result.message);
        }
    },
    
    handleRegister(event) {
        event.preventDefault();
        
        const nome = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const telefone = document.getElementById('registerPhone').value.trim();
        const senha = document.getElementById('registerPassword').value;
        const senhaConfirm = document.getElementById('registerPasswordConfirm').value;
        
        if (senha !== senhaConfirm) {
            Toast.error('As senhas não coincidem');
            return;
        }
        
        const result = AuthService.register(nome, email, senha, telefone);
        
        if (result.success) {
            Toast.success(`Conta criada com sucesso! Bem-vindo, ${result.user.nome}!`);
            Router.navigate('home');
        } else {
            Toast.error(result.message);
        }
    },
    
    quickLogin() {
        document.getElementById('loginEmail').value = 'maria@email.com';
        document.getElementById('loginPassword').value = '123456';
        Toast.info('Credenciais preenchidas! Clique em "Entrar"');
    },
    
    forgotPassword() {
        Toast.info('Funcionalidade de recuperação de senha em desenvolvimento');
    }
};
