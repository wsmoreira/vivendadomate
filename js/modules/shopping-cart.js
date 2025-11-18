/**
 * Shopping Cart Module
 * Gerencia o carrinho de compras do site
 */

class ShoppingCart {
  constructor() {
    this.cartItems = this.loadCart();

    this.elements = {
      cartIcon: document.querySelector('.icone-carrinho'),
      cartSidebar: document.getElementById('carrinhoSidebar'),
      cartOverlay: document.getElementById('carrinhoOverlay'),
      closeBtn: document.getElementById('carrinhoCloseBtn'),
      cartContent: document.getElementById('carrinhoItens'),
      emptyCart: document.getElementById('carrinhoVazio'),
      cartFooter: document.getElementById('carrinhoFooter'),
      totalValue: document.getElementById('carrinhoTotalValor'),
      counter: document.querySelector('.carrinho-contador'),
      checkoutBtn: document.getElementById('carrinhoFinalizarBtn')
    };

    this.init();
  }

  /**
   * Inicializa o módulo do carrinho
   */
  init() {
    this.setupEventListeners();
    this.updateCartUI();
  }

  /**
   * Configura todos os event listeners
   */
  setupEventListeners() {
    // Abrir carrinho
    if (this.elements.cartIcon) {
      this.elements.cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCart();
      });
    }

    // Fechar carrinho
    if (this.elements.closeBtn) {
      this.elements.closeBtn.addEventListener('click', () => this.closeCart());
    }

    if (this.elements.cartOverlay) {
      this.elements.cartOverlay.addEventListener('click', () => this.closeCart());
    }

    // Botão de finalizar compra
    if (this.elements.checkoutBtn) {
      this.elements.checkoutBtn.addEventListener('click', () => this.checkout());
    }

    // Listener para botões "Adicionar ao Carrinho"
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-adicionar-carrinho')) {
        e.preventDefault();
        this.handleAddToCart(e.target);
      }
    });
  }

  /**
   * Carrega o carrinho do localStorage
   * @returns {Array} Array de items do carrinho
   */
  loadCart() {
    try {
      const saved = localStorage.getItem('vivendaCarrinho');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      return [];
    }
  }

  /**
   * Salva o carrinho no localStorage
   */
  saveCart() {
    try {
      localStorage.setItem('vivendaCarrinho', JSON.stringify(this.cartItems));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }

  /**
   * Adiciona um produto ao carrinho
   * @param {Object} product - Objeto com dados do produto
   */
  addItem(product) {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      this.cartItems.push({
        ...product,
        quantity: product.quantity || 1
      });
    }

    this.saveCart();
    this.updateCartUI();
    this.showFeedback(`${product.name} adicionado ao carrinho!`);
  }

  /**
   * Remove um produto do carrinho
   * @param {string} productId - ID do produto a ser removido
   */
  removeItem(productId) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartUI();
  }

  /**
   * Atualiza a quantidade de um produto
   * @param {string} productId - ID do produto
   * @param {number} quantity - Nova quantidade
   */
  updateQuantity(productId, quantity) {
    const item = this.cartItems.find(item => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartUI();
      }
    }
  }

  /**
   * Calcula o total do carrinho
   * @returns {number} Valor total
   */
  calculateTotal() {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  /**
   * Atualiza toda a interface do carrinho
   */
  updateCartUI() {
    this.updateCounter();
    this.updateCartContent();
    this.updateTotal();
  }

  /**
   * Atualiza o contador de itens no ícone
   */
  updateCounter() {
    const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);

    if (this.elements.counter) {
      this.elements.counter.textContent = totalItems;
      this.elements.counter.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  }

  /**
   * Atualiza o conteúdo do carrinho
   */
  updateCartContent() {
    if (!this.elements.cartContent) return;

    if (this.cartItems.length === 0) {
      this.showEmptyCart();
    } else {
      this.showCartItems();
    }
  }

  /**
   * Mostra mensagem de carrinho vazio
   */
  showEmptyCart() {
    if (this.elements.emptyCart) {
      this.elements.emptyCart.style.display = 'flex';
    }
    if (this.elements.cartFooter) {
      this.elements.cartFooter.style.display = 'none';
    }
    if (this.elements.cartContent) {
      this.elements.cartContent.innerHTML = '';
    }
  }

  /**
   * Mostra os itens do carrinho
   */
  showCartItems() {
    if (this.elements.emptyCart) {
      this.elements.emptyCart.style.display = 'none';
    }
    if (this.elements.cartFooter) {
      this.elements.cartFooter.style.display = 'flex';
    }

    const html = this.cartItems.map(item => this.createCartItemHTML(item)).join('');
    this.elements.cartContent.innerHTML = html;

    // Adicionar listeners aos botões
    this.setupCartItemListeners();
  }

  /**
   * Cria o HTML para um item do carrinho
   * @param {Object} item - Item do carrinho
   * @returns {string} HTML do item
   */
  createCartItemHTML(item) {
    return `
      <div class="carrinho-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="carrinho-item-img">
        <div class="carrinho-item-info">
          <h4>${item.name}</h4>
          <p class="carrinho-item-preco">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
          <div class="carrinho-item-quantidade">
            <button class="btn-qty" data-action="decrease">-</button>
            <span>${item.quantity}</span>
            <button class="btn-qty" data-action="increase">+</button>
          </div>
        </div>
        <button class="carrinho-item-remover" data-id="${item.id}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  }

  /**
   * Configura listeners para botões dentro dos itens
   */
  setupCartItemListeners() {
    // Botões de quantidade
    const qtyButtons = this.elements.cartContent.querySelectorAll('.btn-qty');
    qtyButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const item = e.target.closest('.carrinho-item');
        const productId = item.dataset.id;
        const currentItem = this.cartItems.find(i => i.id === productId);

        if (currentItem) {
          const newQty = e.target.dataset.action === 'increase'
            ? currentItem.quantity + 1
            : currentItem.quantity - 1;

          this.updateQuantity(productId, newQty);
        }
      });
    });

    // Botões de remover
    const removeButtons = this.elements.cartContent.querySelectorAll('.carrinho-item-remover');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.closest('.carrinho-item-remover').dataset.id;
        this.removeItem(productId);
      });
    });
  }

  /**
   * Atualiza o valor total
   */
  updateTotal() {
    if (!this.elements.totalValue) return;

    const total = this.calculateTotal();
    this.elements.totalValue.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  /**
   * Manipula o clique no botão "Adicionar ao Carrinho"
   * @param {HTMLElement} button - Botão clicado
   */
  handleAddToCart(button) {
    const productCard = button.closest('[data-product-id]');

    if (!productCard) {
      console.error('Elemento pai com data-product-id não encontrado');
      return;
    }

    const product = {
      id: productCard.dataset.productId,
      name: productCard.dataset.productName || 'Produto',
      price: parseFloat(productCard.dataset.productPrice) || 0,
      image: productCard.dataset.productImage || '',
      quantity: 1
    };

    this.addItem(product);
  }

  /**
   * Abre o carrinho lateral
   */
  openCart() {
    if (this.elements.cartSidebar) {
      this.elements.cartSidebar.classList.add('active');
    }
    if (this.elements.cartOverlay) {
      this.elements.cartOverlay.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  }

  /**
   * Fecha o carrinho lateral
   */
  closeCart() {
    if (this.elements.cartSidebar) {
      this.elements.cartSidebar.classList.remove('active');
    }
    if (this.elements.cartOverlay) {
      this.elements.cartOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  /**
   * Processa o checkout
   */
  checkout() {
    if (this.cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    // Aqui você pode implementar a lógica de checkout
    alert('Funcionalidade de checkout em desenvolvimento!');
    console.log('Itens do carrinho:', this.cartItems);
  }

  /**
   * Mostra feedback visual ao adicionar item
   * @param {string} message - Mensagem a ser exibida
   */
  showFeedback(message) {
    // Implementação simples com alert - pode ser melhorado com toast notification
    console.log(message);

    // Adicionar animação ao ícone do carrinho
    if (this.elements.cartIcon) {
      this.elements.cartIcon.classList.add('bounce');
      setTimeout(() => {
        this.elements.cartIcon.classList.remove('bounce');
      }, 600);
    }
  }

  /**
   * Limpa o carrinho
   */
  clearCart() {
    this.cartItems = [];
    this.saveCart();
    this.updateCartUI();
  }
}

export default ShoppingCart;
