/* HERO · headline + cena animada: mensagem → contato registrado → funil */
PROPOSTA.register('hero', (function () {

  function cena(C, ui) {
    var s = C.hero.cena;
    var etapas = C.etapas;
    return '<div class="scene" aria-label="Uma mensagem de WhatsApp vira um contato no CRM e entra no funil Kanban.">' +
      /* 1 · mensagem chega */
      '<div class="scene__msg" data-s="1">' +
        '<div class="scene__wa">' + ui.icon('wa') + '<span>Número 01</span><em>' + ui.esc(s.msg.hora) + '</em></div>' +
        '<div class="bub bub--cliente"><b>' + ui.esc(s.msg.de) + '</b>' + ui.esc(s.msg.texto) + '</div>' +
      '</div>' +
      '<div class="scene__link" data-s="2" aria-hidden="true"><i></i>' + ui.icon('arrow') + '</div>' +
      /* 2 · contato registrado */
      '<div class="scene__card" data-s="3">' +
        '<div class="scene__card-hd">' + ui.avatar('AB', 'av--red') + '<div><span>Contato registrado</span><b>' + ui.esc(s.card.nome) + '</b></div>' + ui.icon('checkcircle', 'ic--lg') + '</div>' +
        '<dl>' +
          '<div><dt>Interesse</dt><dd>' + ui.esc(s.card.interesse) + '</dd></div>' +
          '<div><dt>Responsável</dt><dd>' + ui.esc(s.card.responsavel) + '</dd></div>' +
          '<div><dt>Origem</dt><dd>WhatsApp · ' + ui.esc(s.card.origem) + '</dd></div>' +
        '</dl>' +
      '</div>' +
      '<div class="scene__link scene__link--down" data-s="4" aria-hidden="true"><i></i>' + ui.icon('down') + '</div>' +
      /* 3 · funil */
      '<div class="scene__funnel" data-s="5">' +
        '<div class="scene__funnel-hd">' + ui.icon('kanban', 'ic--sm') + 'Funil Kanban</div>' +
        '<ol>' + ui.each(etapas, function (e, i) {
          return '<li class="' + (i === s.etapaAtiva ? 'is-on' : '') + (i === etapas.length - 1 ? ' is-final' : '') + '"><span>' + ui.pad(i + 1) + '</span>' + ui.esc(e.nome) + '</li>';
        }) + '</ol>' +
      '</div>' +
    '</div>';
  }

  return {
    render: function (C, ui) {
      var h = C.hero;
      return '<header class="hero" id="topo">' +
        '<div class="hero__bg" aria-hidden="true"><div class="hero__glow"></div><div class="hero__grid"></div><div class="hero__slash"></div></div>' +
        '<div class="wrap hero__in">' +
          '<div class="hero__copy">' +
            '<img class="hero__logo" src="assets/img/cultfit-logo.png" alt="Cult Fit" width="64" height="64">' +
            ui.plate(h.tag, 'plate--white') +
            '<h1>' + ui.rich(h.titulo) + '</h1>' +
            '<p class="hero__lede">' + ui.rich(h.lede) + '</p>' +
            '<p class="hero__sub">' + ui.esc(h.sub) + '</p>' +
            '<div class="hero__cta">' +
              ui.btn({ label: h.cta1.label, goto: h.cta1.goto, arrow: true }) +
              ui.btn({ label: h.cta2.label, goto: h.cta2.goto, variant: 'ghost', icon: 'dollar' }) +
            '</div>' +
            '<ul class="hero__nums">' + ui.each(h.numeros, function (n) {
              return '<li><b class="tnum">' + n.n + '</b><span>' + ui.esc(n.l) + '</span></li>';
            }) + '</ul>' +
          '</div>' +
          '<div class="hero__stage">' + cena(C, ui) + '</div>' +
        '</div>' +
        '<div class="hero__marquee" aria-hidden="true"><div>' +
          '<span>CRM</span><i></i><span>WhatsApp integrado</span><i></i><span>Funil Kanban</span><i></i><span>Gestão de contatos</span><i></i><span>Atendimento da equipe</span><i></i>' +
          '<span>CRM</span><i></i><span>WhatsApp integrado</span><i></i><span>Funil Kanban</span><i></i><span>Gestão de contatos</span><i></i><span>Atendimento da equipe</span><i></i>' +
        '</div></div>' +
      '</header>';
    },
    mount: function (el, C, ui, P) {
      /* entrada orquestrada da cena */
      var steps = [].slice.call(el.querySelectorAll('[data-s]'));
      if (P.reduceMotion) { steps.forEach(function (s) { s.classList.add('in'); }); return; }
      steps.forEach(function (s) {
        setTimeout(function () { s.classList.add('in'); }, 500 + (+s.dataset.s) * 320);
      });
      /* a etapa ativa do funil avança em ciclo */
      var lis = [].slice.call(el.querySelectorAll('.scene__funnel li'));
      var start = C.hero.cena.etapaAtiva;
      P.behaviors.autoCycle(el.querySelector('.scene__funnel'), lis.length, function (i) {
        var k = (start + i) % lis.length;
        lis.forEach(function (li, j) { li.classList.toggle('is-on', j === k); li.classList.toggle('is-done', j < k); });
      }, { interval: 1800, stopOnInteract: false });
    }
  };
})());
