/**
 * Vivenda do Mate - Application Entry Point
 * Arquivo principal que inicializa todos os módulos do site
 */

import Navigation from './modules/navigation.js';
import HeroCarousel from './modules/hero-carousel.js';
import ShoppingCart from './modules/shopping-cart.js';

/**
 * Classe principal da aplicação
 * Responsável por coordenar a inicialização de todos os módulos
 */
class VivendaDoMateApp {
  constructor() {
    this.modules = {};
    this.init();
  }

  /**
   * Inicializa a aplicação
   */
  init() {
    // Aguardar DOM carregar completamente
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeModules());
    } else {
      this.initializeModules();
    }
  }

  /**
   * Inicializa todos os módulos necessários
   */
  initializeModules() {
    try {
      // Navegação (sempre presente)
      this.modules.navigation = new Navigation();

      // Carrinho de compras (sempre presente)
      this.modules.shoppingCart = new ShoppingCart();

      // Hero Carousel (apenas na página inicial)
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

  /**
   * Ajusta o padding-top do main baseado na altura do header
   */
  adjustMainPadding() {
    const header = document.querySelector('header');
    const main = document.querySelector('main.container.main-content') || document.querySelector('main');

    if (!header || !main) return;

    // Se a página tem hero carousel, remove padding para ficar flush com header
    if (main.querySelector('.hero-carousel')) {
      main.style.paddingTop = '0px';
      return;
    }

    // Caso contrário, ajusta baseado na altura do header
    const extraPadding = 18;
    const headerHeight = header.getBoundingClientRect().height || header.offsetHeight || 0;
    main.style.paddingTop = `${headerHeight + extraPadding}px`;
  }

  /**
   * Retorna um módulo específico
   * @param {string} moduleName - Nome do módulo
   * @returns {Object|null} Instância do módulo ou null
   */
  getModule(moduleName) {
    return this.modules[moduleName] || null;
  }
}

// Inicializar aplicação
const app = new VivendaDoMateApp();

// Expor globalmente para compatibilidade com código legado
window.VivendaDoMateApp = app;

export default VivendaDoMateApp;
