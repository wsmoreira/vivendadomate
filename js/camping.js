/**
 * Camping Navigation Module
 * Gerencia o posicionamento dinâmico da navegação do camping
 * e efeitos de scroll para as páginas de camping
 */

class CampingNavigation {
  constructor() {
    this.header = document.querySelector('header');
    this.campingNav = document.querySelector('.camping-nav');
    this.scrollThreshold = 50;
    this.isScrolling = false;

    this.init();
  }

  /**
   * Inicializa os event listeners para a navegação do camping
   */
  init() {
    if (!this.header || !this.campingNav) {
      console.warn('Header ou camping-nav não encontrados');
      return;
    }

    // Ajustar posição inicial
    this.adjustNavigationPosition();

    // Event listeners
    window.addEventListener('load', () => this.adjustNavigationPosition());
    window.addEventListener('resize', () => this.adjustNavigationPosition());
    window.addEventListener('scroll', () => this.handleScroll());
  }

  /**
   * Ajusta a posição do camping-nav baseado na altura do header
   * e adiciona/remove classe 'scrolled' do body
   */
  adjustNavigationPosition() {
    const headerHeight = this.header.offsetHeight;
    this.campingNav.style.top = `${headerHeight}px`;

    this.toggleScrolledClass();
  }

  /**
   * Adiciona ou remove classe 'scrolled' baseado na posição do scroll
   */
  toggleScrolledClass() {
    if (window.scrollY > this.scrollThreshold) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }

  /**
   * Gerencia eventos de scroll com requestAnimationFrame
   * para melhor performance
   */
  handleScroll() {
    if (!this.isScrolling) {
      window.requestAnimationFrame(() => {
        this.adjustNavigationPosition();
        this.isScrolling = false;
      });
      this.isScrolling = true;
    }
  }
}

/**
 * Carousel Module
 * Gerencia carrosséis de imagens nas páginas de camping
 */
class ImageCarousel {
  constructor(carouselId, options = {}) {
    this.carousel = document.getElementById(carouselId);
    this.totalImages = options.totalImages || 3;
    this.intervalTime = options.intervalTime || 4000;
    this.currentIndex = 0;
    this.intervalId = null;

    this.init();
  }

  /**
   * Inicializa o carrossel e inicia a rotação automática
   */
  init() {
    if (!this.carousel) {
      console.warn(`Carrossel ${this.carousel} não encontrado`);
      return;
    }

    this.startAutoRotation();
  }

  /**
   * Atualiza a posição visual do carrossel
   */
  updateCarouselPosition() {
    const offsetPercentage = -this.currentIndex * 33.33;
    this.carousel.style.transform = `translateX(${offsetPercentage}%)`;
  }

  /**
   * Avança para o próximo slide
   */
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalImages;
    this.updateCarouselPosition();
  }

  /**
   * Inicia a rotação automática do carrossel
   */
  startAutoRotation() {
    this.intervalId = setInterval(() => this.nextSlide(), this.intervalTime);
  }

  /**
   * Para a rotação automática do carrossel
   */
  stopAutoRotation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Exportar para uso global se necessário
window.CampingNavigation = CampingNavigation;
window.ImageCarousel = ImageCarousel;
