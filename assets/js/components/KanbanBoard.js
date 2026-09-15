/* KanbanBoard · mockup do funil em colunas, com animação de cards avançando
   entre as etapas. Usado na seção "funil" e na aba "Funil" do CRMPreview. */
window.PROPOSTA = window.PROPOSTA || {};
PROPOSTA.components = PROPOSTA.components || {};

PROPOSTA.components.KanbanBoard = (function () {

  function card(c, ui) {
    return '<div class="kcard' + (c.hot ? ' kcard--hot' : '') + (c.won ? ' kcard--won' : '') + '" data-card>' +
      '<div class="kcard__top"><span class="kcard__name">' + ui.esc(c.nome) + '</span><span class="kcard__num">Nº ' + ui.esc(c.num) + '</span></div>' +
      '<div class="kcard__int">' + ui.icon('tag') + ui.esc(c.interesse) + '</div>' +
      '<div class="kcard__foot">' + ui.avatar(c.resp) + '<span>' + ui.esc(c.tempo) + '</span></div>' +
    '</div>';
  }

  /* opts: { compact:boolean, label:string } */
  function render(etapas, cards, ui, opts) {
    opts = opts || {};
    var total = etapas.length;
    return '<div class="kan' + (opts.compact ? ' kan--compact' : '') + '" role="img" aria-label="' + ui.esc(opts.label || 'Funil Kanban ilustrativo com oportunidades organizadas em etapas.') + '">' +
      ui.each(etapas, function (e, i) {
        var list = cards[e.id] || [];
        var cls = i === total - 1 ? ' kan__col--won' : i === 0 ? ' kan__col--new' : ' kan__col--mid';
        return '<div class="kan__col' + cls + '" data-col="' + e.id + '">' +
          '<div class="kan__hd"><b>' + ui.esc(e.nome) + '</b><i data-count-col>' + list.length + '</i></div>' +
          '<div class="kan__cards">' + ui.each(list, function (c) { return card(c, ui); }) + '</div>' +
        '</div>';
      }) +
    '</div>';
  }

  /* Move um card para a coluna seguinte com animação FLIP; recicla do fim para o início. */
  function animate(root, P) {
    var kan = root.querySelector('.kan');
    if (!kan) return;
    P.behaviors.dragScroll(kan);
    if (P.reduceMotion) return;

    var cols = [].slice.call(kan.querySelectorAll('.kan__col'));
    var step = 0;

    function refreshCounts() {
      cols.forEach(function (col) {
        col.querySelector('[data-count-col]').textContent = col.querySelectorAll('[data-card]').length;
      });
    }

    function move(card, target) {
      var first = card.getBoundingClientRect();
      var list = target.querySelector('.kan__cards');
      list.classList.add('is-target');
      list.insertBefore(card, list.firstChild);
      card.classList.remove('kcard--hot', 'kcard--won');
      if (target === cols[cols.length - 1]) card.classList.add('kcard--won');
      var last = card.getBoundingClientRect();
      var dx = first.left - last.left;
      var dy = first.top - last.top;
      card.classList.add('kcard--moving');
      card.style.transition = 'none';
      card.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.04)';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          card.style.transition = 'transform .75s cubic-bezier(.22,.8,.2,1)';
          card.style.transform = 'translate(0,0) scale(1)';
        });
      });
      setTimeout(function () {
        card.classList.remove('kcard--moving');
        card.style.transition = '';
        card.style.transform = '';
        list.classList.remove('is-target');
      }, 800);
      refreshCounts();
    }

    /* sequência: uma oportunidade avança uma etapa por vez, alternando as colunas de origem */
    var order = [1, 0, 2, 3, 1, 2, 0, 3];
    function tick() {
      var from = order[step % order.length];
      step++;
      var src = cols[from];
      var target = cols[from + 1];
      var cards = src.querySelectorAll('[data-card]');
      if (!cards.length || !target) return;
      var card = cards[cards.length - 1];
      move(card, target);
      /* mantém a última coluna enxuta: recicla um card para o início do funil */
      var won = cols[cols.length - 1].querySelectorAll('[data-card]');
      if (won.length > 2) {
        var back = won[won.length - 1];
        back.style.opacity = '0';
        setTimeout(function () {
          back.classList.remove('kcard--won');
          cols[0].querySelector('.kan__cards').appendChild(back);
          back.querySelector('.kcard__foot span').textContent = 'agora';
          back.style.transition = 'opacity .5s';
          back.style.opacity = '1';
          refreshCounts();
        }, 700);
      }
    }

    P.behaviors.autoCycle(kan, 1e9, function (i) { if (i > 0) tick(); }, { interval: 2600, stopOnInteract: true });
  }

  return { render: render, animate: animate };
})();
