/* Comportamentos reutilizáveis: revelação no scroll, contadores, ciclos
   automáticos, arraste horizontal, abas e navegação. */
window.PROPOSTA = window.PROPOSTA || {};

(function (P) {
  var reduce = function () { return P.reduceMotion; };

  /* Anima números [data-count] de 0 até o valor final. */
  function countUp(el) {
    var end = +el.dataset.count;
    if (reduce() || !end) { el.textContent = end; return; }
    var t0 = null;
    var dur = 900;
    function frame(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(frame);
    }
    el.textContent = '0';
    requestAnimationFrame(frame);
  }

  /* Faz crescer barras [data-w] (largura) e [data-h] (altura) e anima contadores. */
  function grow(root) {
    root.querySelectorAll('[data-w]').forEach(function (s) { s.style.width = s.dataset.w + '%'; });
    root.querySelectorAll('[data-h]').forEach(function (s) { s.style.height = s.dataset.h + '%'; });
    if (root.matches && root.matches('[data-count]')) countUp(root);
    root.querySelectorAll('[data-count]').forEach(countUp);
  }

  function reveal(scope) {
    var targets = scope.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window) || reduce()) {
      targets.forEach(function (el) { el.classList.add('in'); });
      grow(scope);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        grow(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* Executa fn uma única vez quando o elemento entra na tela. */
  function onceVisible(el, fn, threshold) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      fn();
    }, { threshold: threshold || 0.3 });
    io.observe(el);
  }

  /* Executa onStep(i) em ciclo enquanto o elemento está visível.
     Pausa com o mouse em cima e para de vez ao receber foco. */
  function autoCycle(el, count, onStep, opts) {
    opts = opts || {};
    var interval = opts.interval || 4000;
    var i = 0;
    var timer = null;
    var stopped = false;
    var visible = false;

    function tick() { i = (i + 1) % count; onStep(i); }
    function start() { if (!timer && !stopped && visible && !reduce() && !document.hidden) timer = setInterval(tick, interval); }
    function pause() { clearInterval(timer); timer = null; }
    function stop() { stopped = true; pause(); }

    onStep(0);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        visible ? start() : pause();
      }, { threshold: 0.3 }).observe(el);
    } else { visible = true; start(); }
    document.addEventListener('visibilitychange', function () { document.hidden ? pause() : start(); });
    if (opts.stopOnInteract !== false) {
      el.addEventListener('mouseenter', pause);
      el.addEventListener('mouseleave', start);
      el.addEventListener('focusin', stop);
    }
    return { stop: stop, pause: pause, start: start, set: function (n) { i = n; onStep(i); } };
  }

  /* Arrastar com o mouse para rolar horizontalmente (kanban). */
  function dragScroll(el) {
    var down = false, x0 = 0, s0 = 0, moved = false;
    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; x0 = e.clientX; s0 = el.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - x0;
      if (Math.abs(dx) > 4) { moved = true; el.classList.add('is-drag'); }
      el.scrollLeft = s0 - dx;
    });
    window.addEventListener('pointerup', function () { down = false; el.classList.remove('is-drag'); });
    el.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  }

  /* Abas acessíveis: [role=tab][data-tab] + [role=tabpanel][data-panel]. */
  function tabs(root, onChange) {
    var tabsEls = [].slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = [].slice.call(root.querySelectorAll('[role="tabpanel"]'));
    function select(id, focus) {
      tabsEls.forEach(function (t) {
        var on = t.dataset.tab === id;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      panels.forEach(function (p) { p.hidden = p.dataset.panel !== id; });
      if (onChange) onChange(id);
    }
    tabsEls.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t.dataset.tab); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        select(tabsEls[(i + d + tabsEls.length) % tabsEls.length].dataset.tab, true);
      });
    });
    return { select: select, ids: tabsEls.map(function (t) { return t.dataset.tab; }) };
  }

  /* Botões [data-goto] rolam até a seção. */
  function gotoLinks() {
    document.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-goto]');
      if (!b) return;
      var el = document.getElementById(b.getAttribute('data-goto'));
      if (el) el.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'start' });
    });
  }

  /* Navegação fixa: aparece após o hero, marca a seção atual e o progresso. */
  function nav(navEl, hero) {
    var links = [].slice.call(navEl.querySelectorAll('.topnav__links [data-goto]'));
    var ids = links.map(function (b) { return b.getAttribute('data-goto'); });
    var bar = navEl.querySelector('.topnav__progress i');
    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY;
      var limit = hero ? hero.offsetHeight * 0.55 : 400;
      navEl.dataset.show = y > limit ? '1' : '0';
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
      var current = '';
      for (var i = ids.length - 1; i >= 0; i--) {
        var el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 140) { current = ids[i]; break; }
      }
      links.forEach(function (b) {
        if (b.getAttribute('data-goto') === current) b.setAttribute('aria-current', 'location');
        else b.removeAttribute('aria-current');
      });
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* Linha de progresso vertical ligada ao scroll: preenche [data-progress] conforme o elemento cruza a tela. */
  function scrollLine(section, line, items) {
    var ticking = false;
    function update() {
      ticking = false;
      var r = section.getBoundingClientRect();
      var vh = window.innerHeight;
      var k = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height));
      line.style.transform = 'scaleY(' + k + ')';
      if (items) {
        items.forEach(function (it) {
          var ir = it.getBoundingClientRect();
          it.classList.toggle('is-on', ir.top + ir.height * 0.4 < vh * 0.7);
        });
      }
    }
    if (reduce()) { line.style.transform = 'scaleY(1)'; if (items) items.forEach(function (it) { it.classList.add('is-on'); }); return; }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  P.behaviors = {
    reveal: reveal, grow: grow, countUp: countUp, onceVisible: onceVisible, autoCycle: autoCycle,
    dragScroll: dragScroll, tabs: tabs, gotoLinks: gotoLinks, nav: nav, scrollLine: scrollLine
  };
})(window.PROPOSTA);
