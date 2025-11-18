/**
 * Hero Carousel Module
 * Gerencia o carrossel principal da página inicial
 */

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

  /**
   * Inicializa o carrossel
   */
  init() {
    this.setupEventListeners();
    this.showSlide(0);
    this.startAutoPlay();
  }

  /**
   * Configura todos os event listeners
   */
  setupEventListeners() {
    // Botão próximo
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.nextSlide();
        this.resetAutoPlay();
      });
    }

    // Botão anterior
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.previousSlide();
        this.resetAutoPlay();
      });
    }

    // Dots de navegação
    this.dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-slide'), 10);
        if (!isNaN(index)) {
          this.showSlide(index);
          this.resetAutoPlay();
        }
      });
    });

    // Pausar ao passar o mouse
    if (this.carousel) {
      this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
      this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
  }

  /**
   * Mostra um slide específico
   * @param {number} index - Índice do slide a ser mostrado
   */
  showSlide(index) {
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.dots.forEach(dot => dot.classList.remove('active'));

    this.slides[index].classList.add('active');
    if (this.dots[index]) {
      this.dots[index].classList.add('active');
    }

    this.currentSlideIndex = index;
  }

  /**
   * Avança para o próximo slide
   */
  nextSlide() {
    this.showSlide((this.currentSlideIndex + 1) % this.slides.length);
  }

  /**
   * Volta para o slide anterior
   */
  previousSlide() {
    this.showSlide((this.currentSlideIndex - 1 + this.slides.length) % this.slides.length);
  }

  /**
   * Inicia a reprodução automática
   */
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => this.nextSlide(), this.autoPlayInterval);
  }

  /**
   * Para a reprodução automática
   */
  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  /**
   * Reinicia a reprodução automática
   */
  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

export default HeroCarousel;
