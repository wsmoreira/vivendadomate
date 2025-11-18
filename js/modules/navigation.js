/**
 * Navigation Module
 * Gerencia a navegação principal do site, incluindo menu ativo e scroll
 */

class Navigation {
  constructor() {
    this.header = document.querySelector('header');
    this.scrollThreshold = 50;

    this.init();
  }

  /**
   * Inicializa o módulo de navegação
   */
  init() {
    this.markActiveNavigation();
    this.setupScrollHandler();
  }

  /**
   * Marca o link ativo no menu principal baseado na URL atual
   */
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

  /**
   * Configura o handler de scroll para adicionar classe ao header
   */
  setupScrollHandler() {
    if (!this.header) return;

    window.addEventListener('scroll', () => {
      this.handleScroll();
    });

    // Executar uma vez ao carregar
    this.handleScroll();
  }

  /**
   * Adiciona ou remove classe 'header-rolando' baseado na posição do scroll
   */
  handleScroll() {
    if (window.scrollY > this.scrollThreshold) {
      this.header.classList.add('header-rolando');
    } else {
      this.header.classList.remove('header-rolando');
    }
  }
}

export default Navigation;
