// Página do Carrinho
const CarrinhoPage = {
    render() {
        const mainContent = document.getElementById('mainContent');
        const items = CartService.getItems();
        const total = CartService.getTotal();
        
        if (items.length === 0) {
            mainContent.innerHTML = `
                <div class="carrinho-page fade-in">
                    ${Components.emptyState(
                        'fa-shopping-cart',
                        'Seu carrinho está vazio',
                        'Adicione livros ao carrinho para continuar',
                        {
                            text: 'Explorar livros',
                            onClick: "Router.navigate('compras')"
                        }
                    )}
                </div>
            `;
            return;
        }
        
        const frete = 15.90;
        const subtotal = total;
        const totalComFrete = subtotal + frete;
        
        mainContent.innerHTML = `
            <div class="carrinho-page fade-in">
                <div class="page-header">
                    <h1>Meu Carrinho</h1>
                    <p>${items.length} ${items.length === 1 ? 'item' : 'itens'}</p>
                </div>
                
                <div class="carrinho-layout">
                    <!-- Lista de Itens -->
                    <div class="carrinho-items-section">
                        ${items.map(item => Components.cartItemCard(item)).join('')}
                        
                        <button class="btn btn-text" onclick="CarrinhoPage.clearCart()">
                            <i class="fas fa-trash"></i>
                            Limpar carrinho
                        </button>
                    </div>
                    
                    <!-- Resumo do Pedido -->
                    <div class="carrinho-summary">
                        <h2 class="carrinho-summary-title">Resumo do Pedido</h2>
                        
                        <div class="carrinho-summary-item">
                            <span>Subtotal</span>
                            <span>${Utils.formatPrice(subtotal)}</span>
                        </div>
                        
                        <div class="carrinho-summary-item">
                            <span>Frete</span>
                            <span>${Utils.formatPrice(frete)}</span>
                        </div>
                        
                        <div class="carrinho-summary-divider"></div>
                        
                        <div class="carrinho-summary-total">
                            <span>Total</span>
                            <span>${Utils.formatPrice(totalComFrete)}</span>
                        </div>
                        
                        <!-- Cupom de Desconto -->
                        <div class="carrinho-coupon">
                            <input type="text" 
                                   placeholder="Código do cupom" 
                                   class="coupon-input"
                                   id="couponInput">
                            <button class="btn btn-secondary" onclick="CarrinhoPage.applyCoupon()">
                                Aplicar
                            </button>
                        </div>
                        
                        <!-- Botão de Finalizar -->
                        <button class="btn btn-primary btn-large btn-block" 
                                onclick="CarrinhoPage.finalizarCompra()">
                            <i class="fas fa-check-circle"></i>
                            Finalizar Compra
                        </button>
                        
                        <button class="btn btn-secondary btn-block" 
                                onclick="Router.navigate('compras')">
                            Continuar Comprando
                        </button>
                        
                        <!-- Informações de Segurança -->
                        <div class="carrinho-security">
                            <div class="security-item">
                                <i class="fas fa-lock"></i>
                                <span>Pagamento Seguro</span>
                            </div>
                            <div class="security-item">
                                <i class="fas fa-truck"></i>
                                <span>Frete Grátis acima de R$ 100</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    clearCart() {
        if (confirm('Deseja realmente limpar o carrinho?')) {
            CartService.clear();
            Toast.success('Carrinho limpo com sucesso');
            this.render();
        }
    },
    
    applyCoupon() {
        const input = document.getElementById('couponInput');
        const code = input.value.trim();
        
        if (!code) {
            Toast.warning('Digite um código de cupom');
            return;
        }
        
        // Simulação de cupom válido
        if (code.toUpperCase() === 'PRIMEIRACOMPRA') {
            Toast.success('Cupom aplicado! 10% de desconto');
        } else {
            Toast.error('Cupom inválido ou expirado');
        }
    },
    
    finalizarCompra() {
        if (!AuthService.isAuthenticated()) {
            Toast.warning('Faça login para finalizar a compra');
            Router.navigate('login');
            return;
        }
        
        const items = CartService.getItems();
        const total = CartService.getTotal() + 15.90; // Com frete
        const currentUser = AuthService.getCurrentUser();
        
        // Criar compra
        const compra = {
            usuario_id: currentUser.id,
            total: total,
            itens: items.map(item => ({
                livro_id: item.livroId,
                quantidade: item.quantidade,
                preco: item.livro.preco
            }))
        };
        
        DataService.addCompra(compra);
        CartService.clear();
        
        Toast.success('Compra realizada com sucesso!');
        
        // Redirecionar para perfil após 2 segundos
        setTimeout(() => {
            Router.navigate('perfil');
        }, 2000);
    }
};
