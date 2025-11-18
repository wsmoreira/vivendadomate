# Arquitetura CSS - Vivenda do Mate

## 📋 Visão Geral

Este documento descreve a arquitetura CSS modular implementada no site Vivenda do Mate, seguindo princípios de **Clean Code** e **Separação de Responsabilidades**.

## 🎯 Objetivos

- **Manutenibilidade**: Fácil localizar e modificar estilos específicos
- **Escalabilidade**: Adicionar novos módulos sem afetar os existentes
- **Reusabilidade**: Componentes podem ser reutilizados em todo o site
- **Organização**: Código limpo e bem estruturado
- **Performance**: Arquitetura preparada para otimização com bundlers
- **Colaboração**: Múltiplos desenvolvedores podem trabalhar simultaneamente

## 📁 Estrutura de Arquivos

```
css/
├── main.css                    # Arquivo principal (importa todos os módulos)
│
├── base/                       # Fundamentos e configurações base
│   ├── variables.css          # Variáveis CSS (cores, espaçamentos, fontes)
│   ├── reset.css              # Reset e normalização
│   └── typography.css         # Estilos de tipografia
│
├── layout/                     # Estrutura da página
│   ├── header.css             # Cabeçalho e navegação
│   └── footer.css             # Rodapé
│
├── components/                 # Componentes reutilizáveis
│   ├── buttons.css            # Todos os estilos de botões
│   ├── cards.css              # Todos os tipos de cards
│   ├── forms.css              # Formulários e inputs
│   ├── carousel.css           # Carrosséis e galerias
│   └── modals.css             # Popups, sidebars e overlays
│
└── utilities/                  # Classes auxiliares
    ├── animations.css         # Animações e keyframes
    └── helpers.css            # Classes utilitárias (spacing, display, etc)
```

## 📦 Módulos Detalhados

### 1️⃣ BASE - Fundamentos

#### `base/variables.css`
**Responsabilidade**: Centralizar todas as variáveis CSS do projeto

**Conteúdo**:
- Paleta de cores (principal, secundária, estados)
- Tipografia (fontes, tamanhos, pesos, line-heights)
- Sistema de espaçamento (xs, sm, md, lg, xl, 2xl, 3xl, 4xl)
- Valores de layout (max-width, z-indexes)
- Bordas e raios (border-radius)
- Sombras (box-shadow)
- Transições (durations e easings)
- Breakpoints responsivos

**Exemplo de uso**:
```css
.meu-componente {
  color: var(--cor-principal);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  transition: all var(--transition-base) var(--ease-out);
}
```

#### `base/reset.css`
**Responsabilidade**: Normalização e configuração inicial do documento

**Conteúdo**:
- Reset básico de margin/padding
- Configuração do layout flexbox para sticky footer
- Gestão de scrollbar persistente (evita layout shift)
- Padding do main content
- Overflow control

#### `base/typography.css`
**Responsabilidade**: Estilos de texto e hierarquia tipográfica

**Conteúdo**:
- Estilos de títulos (h1-h6)
- Parágrafos e texto base
- Links
- Texto introdutório
- Ajustes responsivos de tamanhos

---

### 2️⃣ LAYOUT - Estrutura da Página

#### `layout/header.css`
**Responsabilidade**: Todo o cabeçalho, navegação e busca

**Conteúdo**:
- Header fixo com estado de scroll
- Container com grid de 3 colunas
- Logo
- Menu principal e submenu
- Ícones (busca, carrinho, usuário)
- Contador do carrinho
- Overlay de busca
- Resultados de busca

**Seletores principais**:
- `header`, `.header-rolando`
- `.largura-limitada`, `.header-container`
- `.header-logo`, `.menu-principal`, `.submenu`
- `.header-icones`, `.icone-carrinho`, `.carrinho-contador`
- `.busca-container`, `.campo-busca`

#### `layout/footer.css`
**Responsabilidade**: Rodapé do site

**Conteúdo**:
- Container do footer
- Ícones sociais
- Copyright

**Seletores principais**:
- `.site-footer`
- `.social-icones`
- `.copyright-texto`

---

### 3️⃣ COMPONENTS - Componentes Reutilizáveis

#### `components/buttons.css`
**Responsabilidade**: Todos os estilos de botões do site

**Variantes disponíveis**:
- `.btn-slide` - Botão geral/carousel
- `.btn-saber-mais` - Botão de call-to-action
- `.btn-enviar` - Botão de formulários
- `.btn-popup` - Botão de popup/modal
- `.btn-produto`, `.btn-adicionar-carrinho` - Adicionar ao carrinho
- `.btn-plano` - Planos de assinatura
- `.btn-primary` - Ação principal
- `.btn-experiencia` - Turismo/experiências
- `.btn-conhecer` - Clube fidelidade
- `.btn-cadastrar-clube` - Cadastro clube
- `.btn-qty` - Botões de quantidade (+ e -)

**Padrão consistente**:
- Hover: `translateY(-2px)` + aumento de sombra
- Transições suaves
- Estados disabled

#### `components/cards.css`
**Responsabilidade**: Todos os tipos de cards do site

**Variantes disponíveis**:
- `.categoria-card` - Categorias da loja
- `.produto-card` - Produtos
- `.plano-card` - Planos de assinatura
- `.receita-card` - Receitas
- `.experiencia-card` - Experiências turísticas
- `.beneficio-card` - Benefícios clube fidelidade
- `.plano-item` - Planos clube fidelidade
- `.atividade-card` - Atividades camping

**Padrão consistente**:
- Border-radius arredondado
- Box-shadow com hover lift
- Estrutura flex para conteúdo
- Imagens com object-fit: cover

#### `components/forms.css`
**Responsabilidade**: Formulários, inputs e validação

**Conteúdo**:
- Containers de formulário
- Labels (incluindo required)
- Inputs (text, email, tel, password, number, date)
- Textareas
- Selects (com seta customizada)
- Checkboxes e radios
- Mensagens de erro/sucesso/info
- Form grid (2 colunas)
- Formulários específicos (contato, popup, clube)

**Recursos**:
- Estados de focus com outline colorido
- Validação visual (`.input-error`, `.error-text`)
- Responsive (colapsa grid em mobile)

#### `components/carousel.css`
**Responsabilidade**: Carrosséis e galerias de imagens

**Tipos**:
- **Hero Carousel**: Carousel principal da homepage
  - `.hero-carousel`, `.slide`, `.slide-overlay`
  - Controles de navegação (`.carousel-btn`)
  - Dots indicadores (`.carousel-dots`, `.dot`)

- **Image Gallery**: Galerias de produtos/experiências
  - `.image-carousel`, `.carousel-image`
  - Controles de galeria (`.gallery-btn`)
  - Indicadores (`.gallery-indicator`)

- **Processo Carousel**: Processo produtivo
  - `.processo-carousel`, `.processo-image`

**Animações**:
- Fade in/out com opacity
- Transições suaves
- Auto-play support (gerenciado por JS)

#### `components/modals.css`
**Responsabilidade**: Modais, sidebars, popups e overlays

**Componentes**:

1. **Overlay Base**
   - `.overlay` - Backdrop genérico
   - Estados active/inactive

2. **Popup/Modal Newsletter**
   - `.popup-container`, `.popup-box`
   - `.popup-close`, `.popup-content`
   - Animação scale in

3. **Shopping Cart Sidebar**
   - `#carrinhoOverlay`, `#carrinhoSidebar`
   - `.carrinho-header`, `.carrinho-content`, `#carrinhoFooter`
   - `.carrinho-item` com grid layout
   - Estados vazio/preenchido
   - Botões de quantidade e remoção

4. **Quick View Sidebar**
   - `.quick-view-overlay`, `.quick-view-sidebar`
   - Preview rápido de produtos

**Padrão**:
- Slide in/out animations
- Z-index hierarchy (backdrop < modal)
- Scroll lock (gerenciado por JS)

---

### 4️⃣ UTILITIES - Classes Auxiliares

#### `utilities/animations.css`
**Responsabilidade**: Animações e efeitos visuais

**Keyframes disponíveis**:
- `fadeIn` - Fade in com translateY
- `slideInLeft`, `slideInRight`, `slideInUp`, `slideInDown`
- `scaleIn`, `pulse`
- `bounce` - Para feedback de carrinho
- `rotate`, `rotateIn`
- `shake` - Para erros
- `spin` - Loading spinner

**Classes de animação**:
- `.fade-in`, `.fade-in-delay-1` até `.fade-in-delay-5`
- `.slide-in-left`, `.slide-in-right`, `.slide-in-up`, `.slide-in-down`
- `.scale-in`, `.pulse`, `.bounce`
- `.loading-spinner`

**Hover utilities**:
- `.hover-lift` - Eleva elemento no hover
- `.hover-scale` - Aumenta escala no hover
- `.hover-opacity` - Reduz opacidade no hover

**Transition utilities**:
- `.transition-all`, `.transition-fast`, `.transition-slow`, `.transition-slower`

**Acessibilidade**:
- `@media (prefers-reduced-motion)` - Respeita preferências do usuário

#### `utilities/helpers.css`
**Responsabilidade**: Classes utilitárias para uso geral

**Categorias**:

1. **Display**
   - `.hidden`, `.visible`, `.invisible`

2. **Spacing**
   - Margins: `.m-*`, `.mt-*`, `.mb-*`
   - Padding: `.p-*`, `.pt-*`, `.pb-*`
   - Tamanhos: `0`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`

3. **Text**
   - Alinhamento: `.text-left`, `.text-center`, `.text-right`
   - Peso: `.font-light` até `.font-bold`
   - Tamanho: `.text-xs` até `.text-4xl`

4. **Colors**
   - Texto: `.text-primary`, `.text-secondary`, `.text-white`, etc.
   - Background: `.bg-primary`, `.bg-secondary`, `.bg-white`, `.bg-light`

5. **Flexbox**
   - `.flex`, `.flex-column`, `.flex-row`
   - `.justify-*`, `.items-*`
   - `.gap-*`

6. **Grid**
   - `.grid`, `.grid-cols-1` até `.grid-cols-4`

7. **Width & Height**
   - `.w-full`, `.w-auto`, `.h-full`, `.h-auto`

8. **Position**
   - `.relative`, `.absolute`, `.fixed`, `.sticky`

9. **Overflow**
   - `.overflow-hidden`, `.overflow-visible`, `.overflow-auto`

10. **Border Radius**
    - `.rounded-none` até `.rounded-full`

11. **Shadows**
    - `.shadow-none` até `.shadow-2xl`

12. **Opacity**
    - `.opacity-0` até `.opacity-100`

13. **Cursor**
    - `.cursor-pointer`, `.cursor-not-allowed`, `.cursor-default`

14. **Responsive**
    - `.mobile-hidden`, `.mobile-visible`
    - `.desktop-hidden`, `.desktop-visible`

---

## 🚀 Como Usar

### Implementação Inicial

**1. Atualizar HTML**

Substitua a referência ao CSS antigo:

```html
<!-- ANTES -->
<link rel="stylesheet" href="css/style.css">

<!-- DEPOIS -->
<link rel="stylesheet" href="css/main.css">
```

**2. Testar a Migração**

Teste cada página para garantir que todos os estilos carregaram corretamente.

### Trabalhando com os Módulos

**Modificar estilos existentes**:
1. Identifique o componente (botão, card, header, etc.)
2. Abra o arquivo do módulo correspondente
3. Localize o seletor específico
4. Faça as alterações necessárias

**Adicionar novos componentes**:
1. Identifique a categoria (layout, component, utility)
2. Crie ou edite o arquivo apropriado
3. Use as variáveis CSS existentes
4. Mantenha o padrão de nomenclatura

**Usar variáveis CSS**:
```css
/* BOM - Usa variáveis */
.meu-elemento {
  color: var(--cor-principal);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

/* EVITAR - Valores hardcoded */
.meu-elemento {
  color: #003300;
  padding: 1.5rem;
  border-radius: 8px;
}
```

**Usar classes utilitárias no HTML**:
```html
<!-- Exemplo: Card com classes utilitárias -->
<div class="flex flex-column gap-md p-lg rounded-lg shadow-md">
  <h3 class="text-2xl font-bold text-primary">Título</h3>
  <p class="text-base text-dark mb-md">Descrição</p>
  <button class="btn-primary">Ação</button>
</div>
```

---

## 📊 Comparação: Antes vs Depois

### ANTES (style.css monolítico)

```
❌ 4794 linhas em um único arquivo
❌ Difícil localizar estilos específicos
❌ Risco de conflitos ao editar
❌ Impossível trabalhar em paralelo
❌ Sem padrão de nomenclatura
❌ Valores hardcoded repetidos
❌ Difícil manutenção e escalabilidade
```

### DEPOIS (Arquitetura Modular)

```
✅ Múltiplos arquivos organizados por responsabilidade
✅ Fácil localização (header.css, buttons.css, etc)
✅ Módulos independentes sem conflito
✅ Equipe pode trabalhar simultaneamente
✅ Nomenclatura consistente e descritiva
✅ Variáveis CSS centralizadas e reutilizáveis
✅ Manutenção simplificada e escalável
```

---

## 🔧 Manutenção e Boas Práticas

### Princípios de Clean Code

1. **Responsabilidade Única**
   - Cada módulo tem apenas uma responsabilidade
   - Exemplo: `buttons.css` só contém estilos de botões

2. **Nomenclatura Descritiva**
   - Nomes claros indicam a função
   - `.btn-adicionar-carrinho` é melhor que `.btn-ac`

3. **DRY (Don't Repeat Yourself)**
   - Use variáveis CSS para valores repetidos
   - Reutilize classes utilitárias

4. **Consistência**
   - Mesmos padrões de hover em todos os botões
   - Mesmo sistema de espaçamento em todo o site

### Convenções de Nomenclatura

**BEM-like (Block Element Modifier)**:
```css
/* Block */
.produto-card { }

/* Element */
.produto-card img { }
.produto-info { }
.produto-preco { }

/* Modifier */
.produto-card.destaque { }
```

**Variáveis CSS**:
```css
/* Padrão: --categoria-nome-variacao */
--cor-principal
--spacing-lg
--font-size-xl
--shadow-md
--transition-slow
```

### Diretrizes de Edição

**✅ FAZER**:
- Usar variáveis CSS para cores, tamanhos e espaçamentos
- Adicionar comentários em seções complexas
- Manter consistência com estilos existentes
- Testar em mobile e desktop
- Usar classes utilitárias quando apropriado

**❌ EVITAR**:
- Hardcoded values (usar variáveis)
- !important (exceto em utilities)
- IDs para estilos (usar classes)
- Seletores muito específicos
- Duplicação de código

---

## 🎨 Sistema de Design

### Paleta de Cores

Definidas em [base/variables.css](css/base/variables.css:8-20)

```css
--cor-principal: #003300
--cor-secundaria: #002400
--cor-texto: #373435
--cor-branca: white

/* Clube Fidelidade */
--bege-claro: #F5F1E8
--marrom-escuro: #8B6F47
--dourado: #D4AF37
```

### Sistema de Espaçamento

```css
--spacing-xs: 0.25rem    (4px)
--spacing-sm: 0.5rem     (8px)
--spacing-md: 1rem       (16px)
--spacing-lg: 1.5rem     (24px)
--spacing-xl: 2rem       (32px)
--spacing-2xl: 3rem      (48px)
--spacing-3xl: 4rem      (64px)
--spacing-4xl: 6rem      (96px)
```

### Escala Tipográfica

```css
--font-size-xs: 0.75rem    (12px)
--font-size-sm: 0.875rem   (14px)
--font-size-base: 1rem     (16px)
--font-size-lg: 1.125rem   (18px)
--font-size-xl: 1.25rem    (20px)
--font-size-2xl: 1.5rem    (24px)
--font-size-3xl: 1.875rem  (30px)
--font-size-4xl: 2.25rem   (36px)
```

### Sombras

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15)
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25)
```

---

## 🔄 Roadmap e Próximos Passos

### Fase 1: ✅ Completa
- [x] Criar módulos base (variables, reset, typography)
- [x] Criar módulos de layout (header, footer)
- [x] Criar módulos de componentes (buttons, cards, forms, carousel, modals)
- [x] Criar utilities (animations, helpers)
- [x] Criar main.css
- [x] Documentação completa

### Fase 2: 📋 Recomendado (Futuro)

1. **Criar módulos específicos de página**
   - `pages/home.css` - Estilos específicos da homepage
   - `pages/loja.css` - Grid de produtos, filtros
   - `pages/turismo.css` - Experiências e galerias
   - `pages/camping.css` - Navegação camping, atividades
   - `pages/clube.css` - Clube fidelidade

2. **Otimização**
   - Implementar bundler (Vite, Webpack ou PostCSS)
   - Minificação automática
   - Purge de CSS não utilizado
   - Critical CSS inline

3. **Melhorias**
   - Dark mode support
   - Temas customizáveis
   - Print stylesheet
   - Acessibilidade (WCAG 2.1)

---

## 📚 Referências

- **Metodologias**: BEM, SMACSS, ITCSS
- **Clean Code**: Robert C. Martin
- **CSS Architecture**: Jonathan Snook
- **Modern CSS**: Kevin Powell, Josh W. Comeau

---

## 🤝 Contribuindo

Ao adicionar ou modificar estilos:

1. **Identifique o módulo correto**
2. **Use as convenções existentes**
3. **Teste responsividade**
4. **Documente se necessário**
5. **Mantenha consistência**

---

## ✅ Status da Migração

| Item | Status | Notas |
|------|--------|-------|
| Variáveis CSS | ✅ Completo | Todas centralizadas |
| Reset e Base | ✅ Completo | Normalização aplicada |
| Tipografia | ✅ Completo | Sistema consistente |
| Header | ✅ Completo | Navegação modularizada |
| Footer | ✅ Completo | Simples e organizado |
| Botões | ✅ Completo | Todas variantes |
| Cards | ✅ Completo | Todos os tipos |
| Formulários | ✅ Completo | Inputs e validação |
| Carrosséis | ✅ Completo | Hero e galerias |
| Modais | ✅ Completo | Popups e sidebars |
| Animações | ✅ Completo | Keyframes e utilities |
| Helpers | ✅ Completo | Classes utilitárias |
| Pages CSS | ⏳ Futuro | Estilos específicos de página ainda no style.css |

---

**Documentação criada**: 2025-11-11
**Última atualização**: 2025-11-11
**Versão**: 1.0.0
