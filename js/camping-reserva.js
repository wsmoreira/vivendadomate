/**
 * Camping Reservation Module
 * Gerencia o cálculo de preços e processamento de reservas de camping
 */

class CampingReservation {
  constructor() {
    this.priceConfig = {
      adultPrice: 30
    };

    this.elements = {
      adultsInput: document.getElementById('adultos'),
      childrenInput: document.getElementById('criancas'),
      totalDisplay: document.getElementById('total-value'),
      selectedDate: document.getElementById('selected-date')
    };

    this.init();
  }

  /**
   * Inicializa o módulo de reservas
   */
  init() {
    this.calculateTotal();
    this.setupEventListeners();
  }

  /**
   * Configura os event listeners para mudanças nos inputs
   */
  setupEventListeners() {
    if (this.elements.adultsInput) {
      this.elements.adultsInput.addEventListener('change', () => this.calculateTotal());
    }
    if (this.elements.childrenInput) {
      this.elements.childrenInput.addEventListener('change', () => this.calculateTotal());
    }
  }

  /**
   * Calcula o custo total da reserva baseado no número de hóspedes
   * e adiciona custos adicionais por hóspede (add-ons)
   */
  calculateTotal() {
    let adults = parseInt(this.elements.adultsInput?.value || 0);
    let children = parseInt(this.elements.childrenInput?.value || 0);

    // Obtém preço adicional por hóspede se um add-on foi selecionado
    const selectedAddOn = document.querySelector('.add-on-option:checked');
    const additionalPerGuestPrice = selectedAddOn
      ? parseInt(selectedAddOn.getAttribute('data-price'))
      : 0;

    // Garante pelo menos 1 adulto
    if (adults < 1 && children < 1) {
      this.elements.adultsInput.value = 1;
      adults = 1;
    }

    const accommodationCost = adults * this.priceConfig.adultPrice;
    const totalGuests = adults + children;
    const totalAdditionalCost = additionalPerGuestPrice * totalGuests;
    const total = accommodationCost + totalAdditionalCost;

    this.updateTotalDisplay(total);
  }

  /**
   * Atualiza a exibição do valor total
   * @param {number} total - Valor total a ser exibido
   */
  updateTotalDisplay(total) {
    if (this.elements.totalDisplay) {
      const formattedTotal = total.toFixed(2).replace('.', ',');
      this.elements.totalDisplay.textContent = `R$ ${formattedTotal}`;
    }
  }

  /**
   * Obtém os dados da reserva selecionada
   * @returns {Object} Objeto contendo todos os dados da reserva
   */
  getReservationData() {
    const selectedOption = document.querySelector('.add-on-option:checked');

    return {
      date: this.elements.selectedDate?.textContent || 'Nenhuma',
      total: this.elements.totalDisplay?.textContent || 'R$ 0,00',
      adults: this.elements.adultsInput?.value || '0',
      children: this.elements.childrenInput?.value || '0',
      addOnName: selectedOption?.getAttribute('data-name') || 'Nenhum Adicional',
      addOnPrice: selectedOption
        ? `R$ ${selectedOption.getAttribute('data-price')},00 (por hóspede)`
        : 'R$ 0,00'
    };
  }

  /**
   * Valida se os dados da reserva são válidos
   * @param {Object} reservationData - Dados da reserva a serem validados
   * @returns {boolean} True se válido, false caso contrário
   */
  isValidReservation(reservationData) {
    return reservationData.date !== 'Nenhuma' &&
           reservationData.total !== 'R$ 0,00';
  }

  /**
   * Salva os dados da reserva no localStorage
   * @param {Object} reservationData - Dados da reserva a serem salvos
   */
  saveReservation(reservationData) {
    localStorage.setItem('reservaData', reservationData.date);
    localStorage.setItem('reservaTotal', reservationData.total);
    localStorage.setItem('reservaAdultos', reservationData.adults);
    localStorage.setItem('reservaCriancas', reservationData.children);
    localStorage.setItem('reservaOpcionalNome', reservationData.addOnName);
    localStorage.setItem('reservaOpcionalPreco', reservationData.addOnPrice);
  }

  /**
   * Processa o pagamento da reserva
   * Valida os dados, salva no localStorage e exibe feedback ao usuário
   */
  processPayment() {
    const reservationData = this.getReservationData();

    if (this.isValidReservation(reservationData)) {
      this.saveReservation(reservationData);
      alert('Reserva registrada! Em breve teremos um sistema de pagamento integrado.');
    } else {
      alert('Selecione uma data e/ou o número de hóspedes válidos primeiro!');
    }
  }
}

// Expor globalmente
window.CampingReservation = CampingReservation;
