/**
 * Vivenda do Mate - Aplicação Principal
 * Versão compatível com todos os browsers (sem ES6 modules)
 */

(function() {
  'use strict';

  /* =====================================================
     MÓDULO DE NAVEGAÇÃO
     ===================================================== */

  class Navigation {
    constructor() {
      this.header = document.querySelector('header');
      this.scrollThreshold = 50;
      this.init();
    }

    init() {
      this.markActiveNavigation();
      this.setupScrollHandler();
    }

    markActiveNavigation() {
      const links = document.querySelectorAll('.menu-principal a');
      const currentPage = location.pathname.split('/').pop();

      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkFile = href.split('/').pop();
        const isActive = linkFile === currentPage ||
                        (currentPage === '' && linkFile === 'index.html');

        link.classList.toggle('pagina-ativa', isActive);
      });
    }

    setupScrollHandler() {
      if (!this.header) return;

      window.addEventListener('scroll', () => this.handleScroll());
      this.handleScroll();
    }

    handleScroll() {
      if (window.scrollY > this.scrollThreshold) {
        this.header.classList.add('header-rolando');
      } else {
        this.header.classList.remove('header-rolando');
      }
    }
  }

  /* =====================================================
     MÓDULO DE CARROSSEL HERO
     ===================================================== */

  class HeroCarousel {
    constructor(options = {}) {
      this.slideSelector = options.slideSelector || '.slide';
      this.dotSelector = options.dotSelector || '.dot';
      this.prevBtnId = options.prevBtnId || 'prevBtn';
      this.nextBtnId = options.nextBtnId || 'nextBtn';
      this.carouselSelector = options.carouselSelector || '.hero-carousel';
      this.autoPlayInterval = options.autoPlayInterval || 5000;

      this.slides = document.querySelectorAll(this.slideSelector);
      this.dots = document.querySelectorAll(this.dotSelector);
      this.prevBtn = document.getElementById(this.prevBtnId);
      this.nextBtn = document.getElementById(this.nextBtnId);
      this.carousel = document.querySelector(this.carouselSelector);

      this.currentSlideIndex = 0;
      this.autoPlayTimer = null;

      if (this.slides.length > 0) {
        this.init();
      }
    }

    init() {
      this.setupEventListeners();
      this.showSlide(0);
      this.startAutoPlay();
    }

    setupEventListeners() {
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.nextSlide();
          this.resetAutoPlay();
        });
      }

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.previousSlide();
          this.resetAutoPlay();
        });
      }

      this.dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const index = parseInt(dot.getAttribute('data-slide'), 10);
          if (!isNaN(index)) {
            this.showSlide(index);
            this.resetAutoPlay();
          }
        });
      });

      if (this.carousel) {
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
      }
    }

    showSlide(index) {
      this.slides.forEach(slide => slide.classList.remove('active'));
      this.dots.forEach(dot => dot.classList.remove('active'));

      this.slides[index].classList.add('active');
      if (this.dots[index]) {
        this.dots[index].classList.add('active');
      }

      this.currentSlideIndex = index;
    }

    nextSlide() {
      this.showSlide((this.currentSlideIndex + 1) % this.slides.length);
    }

    previousSlide() {
      this.showSlide((this.currentSlideIndex - 1 + this.slides.length) % this.slides.length);
    }

    startAutoPlay() {
      this.stopAutoPlay();
      this.autoPlayTimer = setInterval(() => this.nextSlide(), this.autoPlayInterval);
    }

    stopAutoPlay() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    }

    resetAutoPlay() {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  /* =====================================================
     MÓDULO DE CARRINHO DE COMPRAS
     ===================================================== */

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

    init() {
      this.setupEventListeners();
      this.updateCartUI();
    }

    setupEventListeners() {
      if (this.elements.cartIcon) {
        this.elements.cartIcon.addEventListener('click', (e) => {
          e.preventDefault();
          this.openCart();
        });
      }

      if (this.elements.closeBtn) {
        this.elements.closeBtn.addEventListener('click', () => this.closeCart());
      }

      if (this.elements.cartOverlay) {
        this.elements.cartOverlay.addEventListener('click', () => this.closeCart());
      }

      if (this.elements.checkoutBtn) {
        this.elements.checkoutBtn.addEventListener('click', () => this.checkout());
      }

      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-adicionar-carrinho')) {
          e.preventDefault();
          this.handleAddToCart(e.target);
        }
      });
    }

    loadCart() {
      try {
        const saved = localStorage.getItem('vivendaCarrinho');
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        return [];
      }
    }

    saveCart() {
      try {
        localStorage.setItem('vivendaCarrinho', JSON.stringify(this.cartItems));
      } catch (error) {
        console.error('Erro ao salvar carrinho:', error);
      }
    }

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
      this.showFeedback(product.name + ' adicionado ao carrinho!');
    }

    removeItem(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
      this.saveCart();
      this.updateCartUI();
    }

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

    calculateTotal() {
      return this.cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    }

    updateCartUI() {
      this.updateCounter();
      this.updateCartContent();
      this.updateTotal();
    }

    updateCounter() {
      const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);

      if (this.elements.counter) {
        this.elements.counter.textContent = totalItems;
        this.elements.counter.style.display = totalItems > 0 ? 'flex' : 'none';
      }
    }

    updateCartContent() {
      if (!this.elements.cartContent) return;

      if (this.cartItems.length === 0) {
        this.showEmptyCart();
      } else {
        this.showCartItems();
      }
    }

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

    showCartItems() {
      if (this.elements.emptyCart) {
        this.elements.emptyCart.style.display = 'none';
      }
      if (this.elements.cartFooter) {
        this.elements.cartFooter.style.display = 'flex';
      }

      const html = this.cartItems.map(item => this.createCartItemHTML(item)).join('');
      this.elements.cartContent.innerHTML = html;

      this.setupCartItemListeners();
    }

    createCartItemHTML(item) {
      return '<div class="carrinho-item" data-id="' + item.id + '">' +
        '<img src="' + item.image + '" alt="' + item.name + '" class="carrinho-item-img">' +
        '<div class="carrinho-item-info">' +
          '<h4>' + item.name + '</h4>' +
          '<p class="carrinho-item-preco">R$ ' + item.price.toFixed(2).replace('.', ',') + '</p>' +
          '<div class="carrinho-item-quantidade">' +
            '<button class="btn-qty" data-action="decrease">-</button>' +
            '<span>' + item.quantity + '</span>' +
            '<button class="btn-qty" data-action="increase">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="carrinho-item-remover" data-id="' + item.id + '">' +
          '<i class="fas fa-times"></i>' +
        '</button>' +
      '</div>';
    }

    setupCartItemListeners() {
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

      const removeButtons = this.elements.cartContent.querySelectorAll('.carrinho-item-remover');
      removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = e.target.closest('.carrinho-item-remover').dataset.id;
          this.removeItem(productId);
        });
      });
    }

    updateTotal() {
      if (!this.elements.totalValue) return;

      const total = this.calculateTotal();
      this.elements.totalValue.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
    }

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

    openCart() {
      if (this.elements.cartSidebar) {
        this.elements.cartSidebar.classList.add('active');
      }
      if (this.elements.cartOverlay) {
        this.elements.cartOverlay.classList.add('active');
      }
      document.body.style.overflow = 'hidden';
    }

    closeCart() {
      if (this.elements.cartSidebar) {
        this.elements.cartSidebar.classList.remove('active');
      }
      if (this.elements.cartOverlay) {
        this.elements.cartOverlay.classList.remove('active');
      }
      document.body.style.overflow = '';
    }

    checkout() {
      if (this.cartItems.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
      }

      alert('Funcionalidade de checkout em desenvolvimento!');
      console.log('Itens do carrinho:', this.cartItems);
    }

    showFeedback(message) {
      console.log(message);

      if (this.elements.cartIcon) {
        this.elements.cartIcon.classList.add('bounce');
        setTimeout(() => {
          this.elements.cartIcon.classList.remove('bounce');
        }, 600);
      }
    }

    clearCart() {
      this.cartItems = [];
      this.saveCart();
      this.updateCartUI();
    }
  }

  /* =====================================================
     CLASSE PRINCIPAL DA APLICAÇÃO
     ===================================================== */

  class VivendaDoMateApp {
    constructor() {
      this.modules = {};
      this.init();
    }

    init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initializeModules());
      } else {
        this.initializeModules();
      }
    }

    initializeModules() {
      try {
        // Navegação
        this.modules.navigation = new Navigation();

        // Carrinho de compras
        this.modules.shoppingCart = new ShoppingCart();

        // Hero Carousel (apenas se existir)
        if (document.querySelector('.hero-carousel')) {
          this.modules.heroCarousel = new HeroCarousel({
            slideSelector: '.slide',
            dotSelector: '.dot',
            prevBtnId: 'prevBtn',
            nextBtnId: 'nextBtn',
            carouselSelector: '.hero-carousel',
            autoPlayInterval: 5000
          });
        }

        // Ajustar padding do main
        this.adjustMainPadding();
        window.addEventListener('resize', () => this.adjustMainPadding());

        console.log('Vivenda do Mate - Aplicação inicializada com sucesso');
      } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
      }
    }

    adjustMainPadding() {
      const header = document.querySelector('header');
      const main = document.querySelector('main.container.main-content') || document.querySelector('main');

      if (!header || !main) return;

      if (main.querySelector('.hero-carousel')) {
        main.style.paddingTop = '0px';
        return;
      }

      const extraPadding = 18;
      const headerHeight = header.getBoundingClientRect().height || header.offsetHeight || 0;
      main.style.paddingTop = (headerHeight + extraPadding) + 'px';
    }

    getModule(moduleName) {
      return this.modules[moduleName] || null;
    }
  }

  // Inicializar aplicação
  const app = new VivendaDoMateApp();

  // Expor globalmente
  window.VivendaDoMateApp = app;

})();
