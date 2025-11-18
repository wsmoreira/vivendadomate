# Arquitetura do Módulo de Camping - Vivenda do Mate

## Visão Geral

O sistema de camping foi refatorado seguindo princípios de **Clean Code** e **Separação de Responsabilidades**. O código foi modularizado em componentes reutilizáveis e bem documentados.

## Estrutura de Arquivos

```
vivenda_mate/
├── js/
│   ├── camping.js              # Navegação e carrosséis
│   ├── camping-reserva.js      # Sistema de reservas
│   └── script.js               # Script principal do site
├── camping-vivencias.html      # Página de vivências
├── camping-plantio.html        # Página de plantio
├── camping-fogueira.html       # Página de fogueira
├── camping-reserva.html        # Página de reservas
└── atividades.html             # Página principal de camping
```

## Módulos JavaScript

### 1. camping.js

Responsável por gerenciar a navegação do camping e carrosséis de imagens.

#### Classes:

**CampingNavigation**
- **Responsabilidade**: Gerenciar o posicionamento dinâmico da navegação sticky
- **Métodos principais**:
  - `init()`: Inicializa os event listeners
  - `adjustNavigationPosition()`: Ajusta posição baseada na altura do header
  - `toggleScrolledClass()`: Adiciona/remove classe de scroll
  - `handleScroll()`: Gerencia eventos de scroll com requestAnimationFrame

**ImageCarousel**
- **Responsabilidade**: Gerenciar carrosséis de imagens automáticos
- **Métodos principais**:
  - `init()`: Inicializa o carrossel
  - `updateCarouselPosition()`: Atualiza a posição visual
  - `nextSlide()`: Avança para o próximo slide
  - `startAutoRotation()`: Inicia rotação automática
  - `stopAutoRotation()`: Para a rotação

**Uso**:
```javascript
// Inicializar navegação
new CampingNavigation();

// Inicializar carrossel
new ImageCarousel('carousel-id', {
  totalImages: 3,
  intervalTime: 4000
});
```

### 2. camping-reserva.js

Responsável por gerenciar cálculos de preços e processamento de reservas.

#### Classes:

**CampingReservation**
- **Responsabilidade**: Gerenciar todo o fluxo de reservas
- **Configuração de preços**:
  - `adultPrice`: 30 reais por adulto
  - Add-ons: Valores dinâmicos baseados em seleção do usuário
- **Métodos principais**:
  - `init()`: Inicializa o módulo
  - `setupEventListeners()`: Configura listeners para inputs
  - `calculateTotal()`: Calcula custo total incluindo add-ons
  - `updateTotalDisplay()`: Atualiza exibição do total
  - `getReservationData()`: Obtém todos os dados da reserva
  - `isValidReservation()`: Valida dados da reserva
  - `saveReservation()`: Salva no localStorage
  - `processPayment()`: Processa o pagamento

**Uso**:
```javascript
// Inicializar gerenciador de reservas
const reservationManager = new CampingReservation();

// Processar pagamento
reservationManager.processPayment();
```

## Princípios Aplicados

### Clean Code

1. **Nomes Descritivos**: Todas as variáveis e funções têm nomes auto-explicativos
   - `adjustNavigationPosition()` em vez de `ajustar()`
   - `calculateTotal()` em vez de `calc()`
   - `isValidReservation()` em vez de `valid()`

2. **Funções Pequenas**: Cada função tem uma única responsabilidade
   - Separação entre cálculo (`calculateTotal`) e exibição (`updateTotalDisplay`)
   - Validação em função dedicada (`isValidReservation`)

3. **Documentação Clara**: JSDoc para funções complexas
   ```javascript
   /**
    * Calcula o custo total da reserva baseado no número de hóspedes
    * e adiciona custos adicionais por hóspede (add-ons)
    */
   ```

### Separação de Responsabilidades

1. **Camada de Apresentação (HTML)**
   - Estrutura e conteúdo
   - Eventos chamam funções wrapper quando necessário

2. **Camada de Lógica (JavaScript)**
   - **camping.js**: UI/UX (navegação, carrosséis)
   - **camping-reserva.js**: Lógica de negócios (preços, validação, persistência)

3. **Camada de Estilo (CSS)**
   - **camping-styles.css**: Estilos específicos do camping
   - **style.css**: Estilos globais do site

## Benefícios da Refatoração

1. **Manutenibilidade**: Código mais fácil de entender e modificar
2. **Reutilização**: Módulos podem ser usados em outras páginas
3. **Testabilidade**: Classes isoladas facilitam testes
4. **Performance**: Uso de requestAnimationFrame para scroll suave
5. **Escalabilidade**: Fácil adicionar novas features sem quebrar código existente

## Como Adicionar Nova Página de Camping

```html
<!-- No HTML -->
<script src="js/script.js"></script>
<script src="js/camping.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    new CampingNavigation();

    // Se tiver carrossel
    new ImageCarousel('seu-carousel-id', {
      totalImages: 3,
      intervalTime: 5000
    });
  });
</script>
```

## Compatibilidade

Todos os módulos foram testados e são compatíveis com:
- Código legado existente através de funções wrapper
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Sistema de carrinho do site principal

## Próximos Passos Sugeridos

1. Implementar sistema de pagamento real
2. Adicionar validação de formulários mais robusta
3. Criar testes automatizados para os módulos
4. Implementar sistema de feedback visual (loading states)
5. Adicionar suporte a internacionalização (i18n)
