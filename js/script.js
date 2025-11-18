/* =====================================================
   VIVENDA DO MATE - JAVASCRIPT ORGANIZADO
   ===================================================== */

(function () {
  'use strict';

  /* =====================================================
     1. MENU MOBILE (HAMBURGUER)
     ===================================================== */

  /**
   * Inicializa o menu hamburguer para mobile
   */
  function inicializarMenuMobile() {
    const menuHamburguer = document.getElementById('menuHamburguer');
    const menuPrincipal = document.getElementById('menuPrincipal');
    const body = document.body;

    if (!menuHamburguer || !menuPrincipal) return;

    // Toggle menu ao clicar no hamburguer
    menuHamburguer.addEventListener('click', function() {
      menuHamburguer.classList.toggle('ativo');
      menuPrincipal.classList.toggle('ativo');
      body.classList.toggle('menu-aberto');
    });

    // Fechar menu ao clicar em um link (exceto links com submenu)
    const links = menuPrincipal.querySelectorAll('.menu-principal > li > a');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const parentLi = this.parentElement;
        const submenu = parentLi.querySelector('.submenu');

        // Se tem submenu, apenas toggle o submenu
        if (submenu) {
          e.preventDefault();
          parentLi.classList.toggle('submenu-aberto');
        } else {
          // Se não tem submenu, fechar o menu mobile
          menuHamburguer.classList.remove('ativo');
          menuPrincipal.classList.remove('ativo');
          body.classList.remove('menu-aberto');
        }
      });
    });

    // Fechar menu ao clicar em link do submenu
    const linksSubmenu = menuPrincipal.querySelectorAll('.submenu a');
    linksSubmenu.forEach(link => {
      link.addEventListener('click', function() {
        menuHamburguer.classList.remove('ativo');
        menuPrincipal.classList.remove('ativo');
        body.classList.remove('menu-aberto');
      });
    });

    // Fechar menu ao clicar fora (no overlay)
    menuPrincipal.addEventListener('click', function(e) {
      if (e.target === menuPrincipal) {
        menuHamburguer.classList.remove('ativo');
        menuPrincipal.classList.remove('ativo');
        body.classList.remove('menu-aberto');
      }
    });

    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        menuHamburguer.classList.remove('ativo');
        menuPrincipal.classList.remove('ativo');
        body.classList.remove('menu-aberto');
      }
    });
  }

  /* =====================================================
     2. UTILITÁRIOS
     ===================================================== */

  /**
   * Marca o link ativo no menu principal
   */
  function marcarNavegacaoAtiva() {
    const links = document.querySelectorAll('.menu-principal a');
    const paginaAtual = location.pathname.split('/').pop();

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkArquivo = href.split('/').pop();
      const isAtivo = linkArquivo === paginaAtual || (paginaAtual === '' && linkArquivo === 'index.html');

      link.classList.toggle('pagina-ativa', isAtivo);
    });
  }

  /**
   * Ajusta o padding-top do main baseado na altura do header
   */
  function ajustarPaddingMain() {
    const header = document.querySelector('header');
    const main = document.querySelector('main.container.main-content') || document.querySelector('main');

    // If this page's main contains the hero carousel, ensure we REMOVE the extra
    // top padding so the hero sits flush under the fixed header. We set an
    // inline style (0px) to override the global CSS rule `main { padding-top: 110px; }`.
    // This keeps the change scoped to pages that really have a full-bleed hero
    // (e.g., `index.html`) and avoids touching other pages.
    if (!header || !main) return;
    if (main.querySelector && main.querySelector('.hero-carousel')) {
      // override the global CSS padding so the hero titles sit glued to the menu
      main.style.paddingTop = '0px';
      return;
    }

    const extra = 18;
    const headerHeight = header.getBoundingClientRect().height || header.offsetHeight || 0;
    main.style.paddingTop = (headerHeight + extra) + 'px';
  }

  /**
   * Header transparente ao rolar a página
   * - No topo (scroll = 0): Verde sólido
   * - Ao rolar (scroll > 50px): Transparente com blur
   */
  function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    const scrollY = window.scrollY;

    if (scrollY > 50) {
      // TRANSPARENTE ao rolar
      header.classList.add('header-rolando');
      header.style.setProperty('background-color', 'rgba(0, 51, 0, 0.90)', 'important');
      header.style.setProperty('backdrop-filter', 'blur(6px)', 'important');
      header.style.setProperty('-webkit-backdrop-filter', 'blur(6px)', 'important');
      header.style.setProperty('opacity', '0.96', 'important');
      header.style.setProperty('box-shadow', '0 4px 12px rgba(0, 0, 0, 0.15)', 'important');
      header.style.padding = '20px 0';
    } else {
      // SÓLIDO no topo
      header.classList.remove('header-rolando');
      header.style.setProperty('background-color', '#003300', 'important');
      header.style.removeProperty('backdrop-filter');
      header.style.removeProperty('-webkit-backdrop-filter');
      header.style.setProperty('opacity', '1', 'important');
      header.style.removeProperty('box-shadow');
      header.style.padding = '25px 0';
    }
  }

  /**
   * Garantir que a página tenha altura mínima para scroll
   */
  function garantirAlturaMinima() {
    const alturaJanela = window.innerHeight;
    const alturaPagina = document.documentElement.scrollHeight;

    if (alturaPagina <= alturaJanela) {
      document.body.style.minHeight = (alturaJanela + 200) + 'px';
    }
  }

  /* =====================================================
     2. CARROSSEL HERO
     ===================================================== */

  function inicializarCarrossel() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carousel = document.querySelector('.hero-carousel');

    if (!slides.length) return;

    let slideAtual = 0;
    let intervalo = null;

    function mostrarSlide(indice) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));

      slides[indice].classList.add('active');
      if (dots[indice]) dots[indice].classList.add('active');

      slideAtual = indice;
    }

    function proximoSlide() {
      mostrarSlide((slideAtual + 1) % slides.length);
    }

    function slideAnterior() {
      mostrarSlide((slideAtual - 1 + slides.length) % slides.length);
    }

    function iniciarAutoPlay() {
      pararAutoPlay();
      intervalo = setInterval(proximoSlide, 5000);
    }

    function pararAutoPlay() {
      if (intervalo) clearInterval(intervalo);
      intervalo = null;
    }

    function resetarAutoPlay() {
      pararAutoPlay();
      iniciarAutoPlay();
    }

    // Event Listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', e => {
        e.preventDefault();
        proximoSlide();
        resetarAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', e => {
        e.preventDefault();
        slideAnterior();
        resetarAutoPlay();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const indice = parseInt(dot.getAttribute('data-slide'), 10);
        if (!isNaN(indice)) {
          mostrarSlide(indice);
          resetarAutoPlay();
        }
      });
    });

    // Pausar ao passar o mouse
    if (carousel) {
      carousel.addEventListener('mouseenter', pararAutoPlay);
      carousel.addEventListener('mouseleave', iniciarAutoPlay);
    }

    // Inicializar
    mostrarSlide(0);
    iniciarAutoPlay();
  }

  /* =====================================================
     3. PROCESSO PRODUTIVO
     ===================================================== */

  function inicializarProcesso() {
    const container = document.getElementById('processoTutorial');
    if (!container) return;

    const imagens = container.querySelectorAll('.processo-imagem-item');
    const textoEl = container.querySelector('#processoTexto');
    const contadorEl = container.querySelector('#processoContador');
    const btnAnterior = container.querySelector('#processoAnterior');
    const btnProximo = container.querySelector('#processoProximo');

    if (!imagens.length || !textoEl || !contadorEl) return;

    const etapas = Array.from(imagens).map((img, i) => ({
      texto: img.getAttribute('data-text') || img.getAttribute('alt') || `Etapa ${i + 1}`
    }));

    let indiceAtual = 0;

    function mostrarEtapa(indice) {
      imagens.forEach(img => img.classList.remove('active'));
      if (imagens[indice]) imagens[indice].classList.add('active');

      textoEl.textContent = etapas[indice] ? etapas[indice].texto : '';
      contadorEl.textContent = `${indice + 1} / ${etapas.length}`;

      if (btnAnterior) btnAnterior.disabled = (indice === 0);
      if (btnProximo) btnProximo.disabled = (indice === etapas.length - 1);

      indiceAtual = indice;
    }

    if (btnProximo) {
      btnProximo.addEventListener('click', e => {
        e.preventDefault();
        if (indiceAtual < imagens.length - 1) {
          mostrarEtapa(indiceAtual + 1);
        }
      });
    }

    if (btnAnterior) {
      btnAnterior.addEventListener('click', e => {
        e.preventDefault();
        if (indiceAtual > 0) {
          mostrarEtapa(indiceAtual - 1);
        }
      });
    }

    mostrarEtapa(0);
  }

  /* =====================================================
     4. POPUP DE DESCONTO
     ===================================================== */

  function inicializarPopup() {
    const popup = document.getElementById('popupDesconto');
    const btnFechar = document.getElementById('popupClose');
    const overlay = document.getElementById('popupOverlay');
    const formulario = document.getElementById('popupForm');

    if (!popup) return;

    function fecharPopup() {
      popup.classList.remove('active');
    }

    function abrirPopup() {
      popup.classList.add('active');
    }

    if (btnFechar) btnFechar.addEventListener('click', fecharPopup);
    if (overlay) overlay.addEventListener('click', fecharPopup);

    if (formulario) {
      formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        try {
          localStorage.setItem('vivenda_popup_shown', '1');
        } catch (_) { }
        fecharPopup();
        alert('Obrigado por se cadastrar!');
      });
    }

    // Abrir popup após 3 segundos (apenas se não foi mostrado antes)
    try {
      const jaFoiMostrado = localStorage.getItem('vivenda_popup_shown');
      if (!jaFoiMostrado) {
        setTimeout(abrirPopup, 3000);
      }
    } catch (e) {
      setTimeout(abrirPopup, 3000);
    }
  }

  /* =====================================================
     5. SUBMENU ACESSÍVEL (TOUCH + KEYBOARD)
     ===================================================== */

  function inicializarSubmenu() {
    const itensComSubmenu = document.querySelectorAll('.menu-principal > li.has-submenu');

    itensComSubmenu.forEach(li => {
      const link = li.querySelector('a');
      const submenu = li.querySelector('.submenu');

      if (!link || !submenu) return;

      // Configurar ARIA
      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('aria-expanded', 'false');

      // Toggle para dispositivos touch/click
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const estaAberto = submenu.style.display === 'block' || li.classList.contains('submenu-open');

        if (estaAberto) {
          submenu.style.display = '';
          li.classList.remove('submenu-open');
          link.setAttribute('aria-expanded', 'false');
        } else {
          // Fechar outros submenus abertos
          document.querySelectorAll('.menu-principal li.submenu-open').forEach(outro => {
            outro.classList.remove('submenu-open');
            const a = outro.querySelector('a');
            const sm = outro.querySelector('.submenu');
            if (sm) sm.style.display = '';
            if (a) a.setAttribute('aria-expanded', 'false');
          });

          submenu.style.display = 'block';
          li.classList.add('submenu-open');
          link.setAttribute('aria-expanded', 'true');
        }
      });

      // Fechar ao clicar fora
      document.addEventListener('click', function (ev) {
        if (!li.contains(ev.target)) {
          submenu.style.display = '';
          li.classList.remove('submenu-open');
          link.setAttribute('aria-expanded', 'false');
        }
      });

      // Acessibilidade via teclado
      link.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          link.click();
        } else if (ev.key === 'Escape') {
          submenu.style.display = '';
          li.classList.remove('submenu-open');
          link.setAttribute('aria-expanded', 'false');
          link.focus();
        } else if (ev.key === 'ArrowDown') {
          ev.preventDefault();
          const primeiroItem = submenu.querySelector('a');
          if (primeiroItem) primeiroItem.focus();
        }
      });

      // Permitir Esc nos links do submenu
      submenu.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape') {
          submenu.style.display = '';
          li.classList.remove('submenu-open');
          link.setAttribute('aria-expanded', 'false');
          link.focus();
        }
      });
    });
  }

  /* =====================================================
     Carrinho persistente (localStorage)
     ===================================================== */

  // Estrutura do carrinho: array de objetos {id, nome, preco, imagem, gramagem, quantidade}
  function obterCarrinho() {
    try {
      const data = localStorage.getItem('vivenda_cart_items');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function salvarCarrinho(itens) {
    try {
      localStorage.setItem('vivenda_cart_items', JSON.stringify(itens));
      atualizarContadorCarrinho();
    } catch (e) { /* ignore */ }
  }

  function adicionarAoCarrinho(item) {
    const carrinho = obterCarrinho();
    // Verificar se item já existe (mesmo id e gramagem) - converter para string para comparação segura
    const existente = carrinho.find(i => String(i.id) === String(item.id) && i.gramagem === item.gramagem);

    if (existente) {
      existente.quantidade += item.quantidade || 1;
    } else {
      carrinho.push({
        id: item.id || Date.now(),
        nome: item.nome,
        preco: item.preco,
        imagem: item.imagem || './images/Loja1.png',
        gramagem: item.gramagem || '500g',
        quantidade: item.quantidade || 1
      });
    }

    salvarCarrinho(carrinho);
    renderizarCarrinho();
  }

  function removerDoCarrinho(id, gramagem) {
    let carrinho = obterCarrinho();
    // Converter ambos para string para comparação segura
    carrinho = carrinho.filter(i => !(String(i.id) === String(id) && i.gramagem === gramagem));
    salvarCarrinho(carrinho);
    renderizarCarrinho();
  }

  function atualizarQuantidade(id, gramagem, novaQtd) {
    const carrinho = obterCarrinho();
    // Converter para string para comparação segura
    const item = carrinho.find(i => String(i.id) === String(id) && i.gramagem === gramagem);
    if (item) {
      item.quantidade = Math.max(1, novaQtd);
      salvarCarrinho(carrinho);
      renderizarCarrinho();
    }
  }

  function limparCarrinho() {
    salvarCarrinho([]);
    renderizarCarrinho();
  }

  function calcularTotal() {
    const carrinho = obterCarrinho();
    return carrinho.reduce((total, item) => {
      const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.').trim());
      return total + (preco * item.quantidade);
    }, 0);
  }

  function atualizarContadorCarrinho() {
    const contador = document.querySelector('.carrinho-contador');
    if (!contador) return;
    const carrinho = obterCarrinho();
    const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    contador.textContent = String(total);
  }

  function carregarContadorCarrinho() {
    atualizarContadorCarrinho();
  }

  function renderizarCarrinho() {
    const carrinho = obterCarrinho();
    const carrinhoItens = document.getElementById('carrinhoItens');
    const carrinhoVazio = document.getElementById('carrinhoVazio');
    const carrinhoFooter = document.getElementById('carrinhoFooter');
    const carrinhoTotalValor = document.getElementById('carrinhoTotalValor');

    if (!carrinhoItens) return;

    if (carrinho.length === 0) {
      carrinhoItens.innerHTML = '';
      if (carrinhoVazio) carrinhoVazio.style.display = 'block';
      if (carrinhoFooter) carrinhoFooter.style.display = 'none';
      atualizarContadorCarrinho();
      return;
    }

    if (carrinhoVazio) carrinhoVazio.style.display = 'none';
    if (carrinhoFooter) carrinhoFooter.style.display = 'block';

    carrinhoItens.innerHTML = carrinho.map(item => `
      <div class="carrinho-item">
        <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-imagem">
        <div class="carrinho-item-detalhes">
          <h4 class="carrinho-item-nome">${item.nome}</h4>
          <p class="carrinho-item-info">${item.gramagem}</p>
          <p class="carrinho-item-preco">${item.preco}</p>
          <div class="carrinho-item-acoes">
            <div class="carrinho-qtd-controle">
              <button class="carrinho-qtd-btn" data-id="${item.id}" data-gramagem="${item.gramagem}" data-acao="diminuir">-</button>
              <span class="carrinho-qtd-valor">${item.quantidade}</span>
              <button class="carrinho-qtd-btn" data-id="${item.id}" data-gramagem="${item.gramagem}" data-acao="aumentar">+</button>
            </div>
            <button class="carrinho-remover-btn" data-id="${item.id}" data-gramagem="${item.gramagem}">Remover</button>
          </div>
        </div>
      </div>
    `).join('');

    const total = calcularTotal();
    if (carrinhoTotalValor) {
      carrinhoTotalValor.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    atualizarContadorCarrinho();

    // Event listeners para controles de quantidade
    carrinhoItens.querySelectorAll('.carrinho-qtd-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.dataset.id; // Manter como string
        const gramagem = this.dataset.gramagem;
        const acao = this.dataset.acao;
        const item = carrinho.find(i => String(i.id) === String(id) && i.gramagem === gramagem);

        if (item) {
          const novaQtd = acao === 'aumentar' ? item.quantidade + 1 : item.quantidade - 1;
          if (novaQtd > 0) {
            atualizarQuantidade(id, gramagem, novaQtd);
          }
        }
      });
    });

    // Event listeners para remover
    carrinhoItens.querySelectorAll('.carrinho-remover-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.dataset.id; // Manter como string
        const gramagem = this.dataset.gramagem;
        removerDoCarrinho(id, gramagem);
      });
    });
  }

  function inicializarCarrinhoSidebar() {
    const iconeCarrinho = document.querySelector('.icone-carrinho');
    const carrinhoSidebar = document.getElementById('carrinhoSidebar');
    const carrinhoOverlay = document.getElementById('carrinhoOverlay');
    const carrinhoCloseBtn = document.getElementById('carrinhoCloseBtn');
    const carrinhoFinalizarBtn = document.getElementById('carrinhoFinalizarBtn');

    if (!carrinhoSidebar) return;

    function abrirCarrinho() {
      carrinhoSidebar.classList.add('active');
      carrinhoOverlay.classList.add('active');
      renderizarCarrinho();
    }

    function fecharCarrinho() {
      carrinhoSidebar.classList.remove('active');
      carrinhoOverlay.classList.remove('active');
    }

    if (iconeCarrinho) {
      iconeCarrinho.addEventListener('click', function(e) {
        e.preventDefault();
        abrirCarrinho();
      });
    }

    if (carrinhoCloseBtn) {
      carrinhoCloseBtn.addEventListener('click', fecharCarrinho);
    }

    if (carrinhoOverlay) {
      carrinhoOverlay.addEventListener('click', fecharCarrinho);
    }

    if (carrinhoFinalizarBtn) {
      carrinhoFinalizarBtn.addEventListener('click', function() {
        alert('Redirecionando para finalização da compra...');
        // Aqui você pode redirecionar para uma página de checkout
        // window.location.href = 'checkout.html';
      });
    }

    // Renderizar carrinho inicial
    renderizarCarrinho();
  }

  /* =====================================================
     5.1 QUICK VIEW / SIDE DRAWER (VER DETALHES)
     ===================================================== */
  function inicializarQuickView() {
    const quick = document.getElementById('quickView');
    if (!quick) return;

    const panel = quick.querySelector('.quickview-panel');
    const backdrop = quick.querySelector('.quickview-backdrop');
    const closeBtn = quick.querySelector('.quickview-close');
    const titleEl = quick.querySelector('.qv-title');
    const priceEl = quick.querySelector('.qv-price');
    const imgEl = quick.querySelector('.qv-img');
    const selectGram = quick.querySelector('#qv-gramagem');
    const inputQty = quick.querySelector('#qv-quantidade');
    const btnAdd = quick.querySelector('.qv-addtocart');

    let _prevFocus = null;
    let _onKeyDown = null;

    function abrir(card) {
      if (!card) return;
      const titulo = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : '';
      const preco = card.querySelector('.preco-atual') ? card.querySelector('.preco-atual').textContent.trim() : '';
      const img = card.querySelector('.produto-imagem img') ? card.querySelector('.produto-imagem img').getAttribute('src') : '';
      const pesoTxt = card.querySelector('.produto-peso') ? card.querySelector('.produto-peso').textContent.trim() : '';

      titleEl.textContent = titulo;
      priceEl.textContent = preco;
      if (imgEl && img) imgEl.src = img;

      // popular gramagens: se produto tiver .produto-peso use como única opção, senão opções padrão
      selectGram.innerHTML = '';
      const options = pesoTxt ? [pesoTxt] : ['500g','1kg'];
      options.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o;
        opt.textContent = o;
        selectGram.appendChild(opt);
      });

      inputQty.value = 1;

      // Accessibility: save previously focused element so we can restore it
      _prevFocus = document.activeElement;

      // mark and show
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      panel.setAttribute('aria-hidden', 'false');
      quick.classList.add('open');

      // focus first focusable inside panel after a small delay (let animation start)
      setTimeout(() => {
        const focusable = panel.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length) {
          focusable[0].focus();
        } else if (closeBtn) {
          closeBtn.focus();
        }
      }, 160);

      // key handling: Esc to close, Tab to trap focus
      _onKeyDown = function (e) {
        if (e.key === 'Escape') {
          e.preventDefault();
          fechar();
          return;
        }
        if (e.key === 'Tab') {
          // trap focus inside panel
          const focusable = Array.from(panel.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'));
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', _onKeyDown);
    }

    function fechar() {
      quick.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      panel.removeAttribute('aria-modal');
      panel.removeAttribute('role');
      // remove key listener
      if (typeof _onKeyDown === 'function') document.removeEventListener('keydown', _onKeyDown);
      // restore focus
      try { if (_prevFocus && typeof _prevFocus.focus === 'function') _prevFocus.focus(); } catch (e) {}
      _prevFocus = null;
      _onKeyDown = null;
    }

    // abrir a partir do botão Ver Detalhes
    document.querySelectorAll('.btn-ver-mais').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const card = this.closest('.produto-card');
        abrir(card);
      });
    });

    closeBtn.addEventListener('click', fechar);
    backdrop.addEventListener('click', fechar);

    // botão adicionar: adiciona ao carrinho
    btnAdd.addEventListener('click', function () {
      const qty = Math.max(1, parseInt(inputQty.value || '1', 10));
      const gramagem = selectGram.value;
      const nome = titleEl.textContent;
      const preco = priceEl.textContent;
      const imagem = imgEl ? imgEl.src : '';

      // Obter card original para pegar o ID
      const card = document.querySelector('.produto-card');
      const id = card ? card.dataset.produtoId || Date.now() : Date.now();

      adicionarAoCarrinho({
        id: id,
        nome: nome,
        preco: preco,
        imagem: imagem,
        gramagem: gramagem,
        quantidade: qty
      });

      // feedback rápido
      this.textContent = '✓ Adicionado';
      setTimeout(() => { this.textContent = 'Adicionar ao Carrinho'; }, 1400);
      fechar();
    });
  }

  /* =====================================================
     6. ANIMAÇÃO FADE-IN AO ROLAR
     ===================================================== */

  function inicializarFadeIn() {
    const elementos = document.querySelectorAll('.fade-in');

    if (!('IntersectionObserver' in window)) {
      // Fallback para navegadores antigos
      elementos.forEach(el => el.classList.add('show'));
      return;
    }

    // Assign an index to each element so we can stagger the transition slightly
    elementos.forEach((el, i) => {
      el.dataset.fadeIndex = i;
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.fadeIndex || '0', 10);
            // small stagger: 80ms per item
            entry.target.style.transitionDelay = (idx * 80) + 'ms';
            entry.target.classList.add('show');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elementos.forEach(el => observer.observe(el));
  }

  /* =====================================================
     7. PÁGINA DE PRODUTO (BOX ASSINATURA)
     ===================================================== */

  function inicializarPaginaProduto() {
    // Troca de imagem na galeria
    const imgPrincipal = document.getElementById('imgPrincipal');
    const miniaturaBtns = document.querySelectorAll('.mini-btn');

    if (imgPrincipal && miniaturaBtns.length) {
      miniaturaBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          imgPrincipal.src = this.dataset.src;
        });
      });
    }

    // Seleção de opções (blocos visuais)
    inicializarOpcoesAssinatura();

    // Botão Adicionar ao Carrinho (Assinatura)
    const btnAdicionarCarrinho = document.getElementById('btnAdicionarCarrinho');
    if (btnAdicionarCarrinho && !btnAdicionarCarrinho.dataset.listenerAdded) {
      btnAdicionarCarrinho.dataset.listenerAdded = 'true';
      
      let processando = false;
      
      btnAdicionarCarrinho.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Prevenir múltiplos cliques
        if (processando || this.disabled) return;
        processando = true;
        this.disabled = true;
        
        // Obter valores selecionados
        const pesoAtivo = document.querySelector('.opcoes-linha[data-name="peso"] .opcao-btn.ativo');
        const freqAtiva = document.querySelector('.opcoes-linha[data-name="frequencia"] .opcao-btn.ativo');
        const qtdEl = document.getElementById('quantidade');
        const precoValor = document.getElementById('precoValor');
        const titulo = document.querySelector('.produto-detalhes h1');
        const imgPrincipal = document.getElementById('imgPrincipal');
        
        const peso = pesoAtivo ? pesoAtivo.dataset.value : '500g';
        const frequencia = freqAtiva ? freqAtiva.dataset.value : 'mensal';
        const quantidade = qtdEl ? Math.max(1, parseInt(qtdEl.value || '1', 10)) : 1;
        const preco = precoValor ? 'R$ ' + precoValor.textContent : 'R$ 49,90';
        const nome = titulo ? titulo.textContent + ' - ' + frequencia : 'Assinatura Vivenda do Mate';
        const imagem = imgPrincipal ? imgPrincipal.src : './images/Box-assinatura.png';
        
        // Adicionar ao carrinho
        adicionarAoCarrinho({
          id: 'assinatura-' + peso + '-' + frequencia,
          nome: nome,
          preco: preco,
          imagem: imagem,
          gramagem: peso,
          quantidade: quantidade
        });
        
        // Feedback visual
        const textoOriginal = this.textContent;
        this.textContent = '✓ Adicionado ao Carrinho';
        
        setTimeout(() => {
          this.textContent = textoOriginal;
          this.disabled = false;
          processando = false;
        }, 2000);
      }, { once: false });
    }

    // Botões de ação (antigos - manter compatibilidade)
    const btnAssinar = document.getElementById('btnAssinar');
    const btnAdicionar = document.getElementById('btnAdicionar');

    if (btnAssinar) {
      btnAssinar.addEventListener('click', e => {
        e.preventDefault();
        alert('Fluxo de assinatura iniciado. Integre com seu checkout.');
      });
    }

    if (btnAdicionar) {
      btnAdicionar.addEventListener('click', e => {
        e.preventDefault();
        alert('Produto adicionado ao carrinho (simulação).');
      });
    }
  }

  /**
   * Inicializa os blocos de opções (peso, frequência, moagem) e cálculo de preço
   */
  function inicializarOpcoesAssinatura() {
    const grupos = document.querySelectorAll('.opcoes-linha');
    if (!grupos.length) return;

    grupos.forEach(linha => {
      const botoes = linha.querySelectorAll('.opcao-btn');
      const nome = linha.dataset.name;
      if (!nome) return;

      // Inicializar: marcar primeiro ativo se nenhum estiver
      let encontrado = false;
      botoes.forEach(btn => {
        if (btn.classList.contains('ativo')) {
          btn.setAttribute('aria-checked', 'true');
          encontrado = true;
        } else {
          btn.setAttribute('aria-checked', 'false');
        }

        // Event listeners
        btn.addEventListener('click', () => selecionarOpcao(btn, botoes, nome));
        btn.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selecionarOpcao(btn, botoes, nome);
          }
        });
      });

      if (!encontrado && botoes[0]) {
        botoes[0].classList.add('ativo');
        botoes[0].setAttribute('aria-checked', 'true');
      }
    });

    // Quantidade
    const inputQuantidade = document.getElementById('quantidade');
    if (inputQuantidade) {
      inputQuantidade.addEventListener('input', atualizarPreco);
    }

    // Calcular preço inicial
    atualizarPreco();
  }

  /**
   * Seleciona uma opção e atualiza os campos hidden
   */
  function selecionarOpcao(botao, grupoBotoes, nome) {
    grupoBotoes.forEach(b => {
      b.classList.remove('ativo');
      b.setAttribute('aria-checked', 'false');
    });

    botao.classList.add('ativo');
    botao.setAttribute('aria-checked', 'true');

    // Atualizar campo hidden (se existir)
    const campoHidden = document.getElementById('sel_' + nome);
    if (campoHidden) campoHidden.value = botao.dataset.value || '';

    atualizarPreco();
  }

  /**
   * Calcula e atualiza o preço total
   */
  function atualizarPreco() {
    const precoEl = document.getElementById('precoValor');
    if (!precoEl) return;

    // Preço base (botão de peso ativo)
    const pesoAtivo = document.querySelector('.opcoes-linha[data-name="peso"] .opcao-btn.ativo');
    const precoBase = pesoAtivo ? parseFloat(pesoAtivo.dataset.price || '49.90') : 49.90;

    // Multiplicador de frequência
    const freqAtiva = document.querySelector('.opcoes-linha[data-name="frequencia"] .opcao-btn.ativo');
    const multiplicador = freqAtiva ? parseFloat(freqAtiva.dataset.priceMult || freqAtiva.dataset.price || '1') : 1;

    // Quantidade
    const qtdEl = document.getElementById('quantidade');
    const quantidade = qtdEl ? Math.max(1, parseInt(qtdEl.value || '1', 10)) : 1;

    // Cálculo: base × quantidade × multiplicador
    const total = (precoBase * quantidade) * multiplicador;

    precoEl.textContent = total.toFixed(2);
  }

  /* =====================================================
     8. FAQ ACCORDION (fecha outros ao abrir um)
     ===================================================== */

  function inicializarFAQ() {
    const detalhes = document.querySelectorAll('.faq-produto details');
    if (!detalhes.length) return;

    detalhes.forEach(d => {
      d.addEventListener('toggle', function () {
        if (!d.open) return;

        // Fechar outros
        detalhes.forEach(outro => {
          if (outro !== d && outro.open) {
            outro.removeAttribute('open');
          }
        });
      });
    });
  }

  /* =====================================================
     9. GARANTIR TIPOS CORRETOS NOS BOTÕES
     ===================================================== */

  function corrigirTiposBotoes() {
    document.querySelectorAll('button').forEach(btn => {
      if (!btn.hasAttribute('type')) {
        if (btn.classList.contains('btn-enviar') || btn.classList.contains('submit')) {
          btn.type = 'submit';
        } else {
          btn.type = 'button';
        }
      }
    });
  }

  /* =====================================================
     9.1 GARANTIR PARIDADE VISUAL ENTRE BOTOES (ENVIAR x SABER- MAIS)
     Copia propriedades computadas do botão de formulário para o botão
     "Saber mais" para garantir mesma largura/altura/padding em tempo de execução.
     ===================================================== */

  function igualarEstiloBotaoSaberMais() {
    try {
      const btnEnviar = document.querySelector('.btn-enviar');
      const btnSaber = document.querySelector('.btn-saber-mais');
      if (!btnEnviar || !btnSaber) return;

      const comp = window.getComputedStyle(btnEnviar);

      // Lista de propriedades relevantes para copiar
      const propriedades = [
        'font-size', 'font-family', 'font-weight', 'line-height', 'letter-spacing',
        'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
        'border-radius', 'border', 'box-shadow', 'text-transform'
      ];

      propriedades.forEach(prop => {
        const val = comp.getPropertyValue(prop);
        if (val) btnSaber.style.setProperty(prop, val);
      });

      // Garantir display compatível e comportamento do cursor
      btnSaber.style.display = 'inline-block';
      btnSaber.style.cursor = 'pointer';
      btnSaber.style.whiteSpace = 'nowrap';
    } catch (e) {
      // se algo falhar, simplesmente não quebramos a página
      // console.debug('igualarEstiloBotaoSaberMais falhou', e);
    }
  }

  /* =====================================================
     11. AJUSTAR ALTURA DO VÍDEO PARA DAR PARIDADE COM O TEXTO
     Mede a altura da coluna de texto (.historia-texto) e aplica essa
     altura como max-height no iframe do vídeo para que o bloco do vídeo
     fique alinhado visualmente com o texto ao lado.
  ===================================================== */

  /* ajustarAlturaVideoAoTexto removed: reverting to CSS-controlled sizing for iframe */

  /* =====================================================
     10. INICIALIZAÇÃO PRINCIPAL
     ===================================================== */

  document.addEventListener('DOMContentLoaded', function () {
    // Menu Mobile
    inicializarMenuMobile();

    // Utilitários
    marcarNavegacaoAtiva();
    ajustarPaddingMain();
    corrigirTiposBotoes();
    carregarContadorCarrinho();

    // Componentes
    inicializarCarrossel();
    inicializarProcesso();
    inicializarPopup();
    inicializarSubmenu();
    inicializarFadeIn();
    inicializarPaginaProduto();
    inicializarQuickView();
    inicializarFAQ();
    inicializarCarrinhoSidebar();
    inicializarGaleriasTurismo();
    inicializarBusca();
    inicializarCarrosselVivencias();

    // Garantir altura mínima para scroll
    garantirAlturaMinima();

    // Header transparente ao rolar
    handleHeaderScroll();
    window.addEventListener('scroll', handleHeaderScroll);

    // Eventos de janela
    window.addEventListener('resize', ajustarPaddingMain);
    igualarEstiloBotaoSaberMais();
    window.addEventListener('resize', igualarEstiloBotaoSaberMais);

    // Observer do header para mudanças de classe
    const header = document.querySelector('header');
    if (header && 'MutationObserver' in window) {
      const mo = new MutationObserver(ajustarPaddingMain);
      mo.observe(header, { attributes: true, childList: false, subtree: false });
    }
  });

  // Chamada adicional no load (garante medidas corretas)
  window.addEventListener('load', ajustarPaddingMain);

  /* =====================================================
     GALERIAS DE IMAGENS - PÁGINA TURISMO
     ===================================================== */
  function inicializarGaleriasTurismo() {
    const galerias = document.querySelectorAll('.galeria-experiencia');
    
    galerias.forEach((galeria, index) => {
      const imagens = galeria.querySelectorAll('.img-galeria');
      const controles = galeria.nextElementSibling;
      
      if (!controles || !controles.classList.contains('galeria-controles')) return;
      
      const btnPrev = controles.querySelector('.prev-btn');
      const btnNext = controles.querySelector('.next-btn');
      
      let indiceAtual = 0;
      
      function mostrarImagem(indice) {
        imagens.forEach((img, i) => {
          img.classList.toggle('active', i === indice);
        });
      }
      
      function imagemAnterior() {
        indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
        mostrarImagem(indiceAtual);
      }
      
      function proximaImagem() {
        indiceAtual = (indiceAtual + 1) % imagens.length;
        mostrarImagem(indiceAtual);
      }
      
      if (btnPrev) btnPrev.addEventListener('click', imagemAnterior);
      if (btnNext) btnNext.addEventListener('click', proximaImagem);
      
      // Auto-play (opcional - descomente se quiser)
      // setInterval(proximaImagem, 5000);
    });
  }

  /* =====================================================
     BUSCA DE PRODUTOS
     ===================================================== */
  
  function inicializarBusca() {
    const btnAbrirBusca = document.getElementById('btnAbrirBusca');
    const btnFecharBusca = document.getElementById('btnFecharBusca');
    const buscaContainer = document.getElementById('buscaContainer');
    const campoBusca = document.getElementById('campoBusca');
    
    if (!btnAbrirBusca || !buscaContainer || !campoBusca) return;
    
    // Abrir campo de busca
    btnAbrirBusca.addEventListener('click', (e) => {
      e.preventDefault();
      buscaContainer.classList.add('ativo');
      campoBusca.focus();
    });
    
    // Fechar campo de busca
    if (btnFecharBusca) {
      btnFecharBusca.addEventListener('click', () => {
        buscaContainer.classList.remove('ativo');
        campoBusca.value = '';
        realizarBusca(''); // Mostrar todos os produtos novamente
      });
    }
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && buscaContainer.classList.contains('ativo')) {
        buscaContainer.classList.remove('ativo');
        campoBusca.value = '';
        realizarBusca('');
      }
    });
    
    // Buscar enquanto digita
    campoBusca.addEventListener('input', (e) => {
      realizarBusca(e.target.value);
    });
  }
  
  function realizarBusca(termo) {
    const produtos = document.querySelectorAll('.produto-card');
    const termoBusca = termo.toLowerCase().trim();
    let encontrados = 0;
    
    produtos.forEach(produto => {
      const nome = produto.querySelector('h3')?.textContent.toLowerCase() || '';
      const descricao = produto.querySelector('p')?.textContent.toLowerCase() || '';
      const categoria = produto.dataset.categoria?.toLowerCase() || '';
      
      const encontrou = nome.includes(termoBusca) || 
                       descricao.includes(termoBusca) || 
                       categoria.includes(termoBusca);
      
      if (termoBusca === '' || encontrou) {
        produto.classList.remove('produto-oculto');
        encontrados++;
      } else {
        produto.classList.add('produto-oculto');
      }
    });
    
    // Remover mensagem anterior de "sem resultados"
    const mensagemAnterior = document.querySelector('.sem-resultados');
    if (mensagemAnterior) {
      mensagemAnterior.remove();
    }
    
    // Mostrar mensagem se não encontrou nada
    if (encontrados === 0 && termoBusca !== '') {
      const container = document.querySelector('.produto-grid');
      if (container) {
        const mensagem = document.createElement('div');
        mensagem.className = 'sem-resultados';
        mensagem.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>Nenhum produto encontrado</h3>
          <p>Tente buscar com outros termos</p>
        `;
        container.appendChild(mensagem);
      }
    }
  }

  // Expor funções do carrinho globalmente
  window.VivendaCarrinho = {
    adicionar: adicionarAoCarrinho,
    remover: removerDoCarrinho,
    limpar: limparCarrinho,
    obter: obterCarrinho,
    calcularTotal: calcularTotal
  };

  /* =====================================================
     CARROSSEL DE VIVÊNCIAS (atividades.html)
     ===================================================== */

  /**
   * Inicializa o carrossel de imagens das vivências
   */
  function inicializarCarrosselVivencias() {
    const carousel = document.getElementById('vivencias-carousel');
    if (!carousel) return; // Só executa se o elemento existir

    const totalImages = 3;
    let currentIndex = 0;

    function updateCarousel() {
      const offset = -currentIndex * 33.33;
      carousel.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    }

    // Avança automaticamente a cada 5 segundos
    setInterval(nextSlide, 5000);
  }

})();
