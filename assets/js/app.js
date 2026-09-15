/* Montagem da página: navegação + seções (na ordem de content.js) + rodapé. */
(function (P) {
  var C = P.content;
  C.config = P.config;
  var ui = P.ui;

  function navHtml() {
    return '<nav class="topnav" id="topnav" aria-label="Navegação da proposta" data-show="0">' +
      '<div class="topnav__in">' +
        '<button type="button" class="topnav__brand" data-goto="topo" aria-label="Voltar ao início">' +
          '<img src="assets/img/cultfit-logo.png" alt="" width="30" height="30"><span>CRM Cult Fit</span>' +
        '</button>' +
        '<div class="topnav__links">' + ui.each(C.nav, function (n) { return '<button type="button" data-goto="' + n.id + '">' + ui.esc(n.label) + '</button>'; }) + '</div>' +
        ui.btn({ label: 'Conversar', href: ui.waLink(), icon: 'wa', variant: 'primary' }) +
      '</div>' +
      '<span class="topnav__progress" aria-hidden="true"><i></i></span>' +
    '</nav>';
  }

  function footerHtml() {
    return '<footer class="foot"><div class="wrap foot__in">' +
      '<div class="foot__by"><span>Uma entrega</span><img src="assets/img/linkeed.svg" alt="Linkeed" width="80" height="24"></div>' +
      '<p>' + ui.esc(C.meta.rodape) + ' · ' + C.meta.ano + '</p>' +
      '<a href="' + ui.waLink() + '" target="_blank" rel="noopener noreferrer">' + ui.icon('wa', 'ic--sm') + ui.esc(C.contato.exibicao) + '</a>' +
    '</div></footer>';
  }

  function mount() {
    var app = document.getElementById('app');
    var html = ui.sprite() + navHtml() + '<main id="conteudo">';

    /* Apoio à revisão: index.html?from=investimento renderiza a partir de uma seção. */
    var from = /[?&]from=([a-z]+)/.exec(location.search);
    if (from && C.ordem.indexOf(from[1]) > 0) C.ordem = C.ordem.slice(C.ordem.indexOf(from[1]));

    C.ordem.forEach(function (name) {
      var s = P.sections[name];
      if (s) html += s.render(C, ui, P);
      else if (window.console) console.warn('[proposta] seção não encontrada:', name);
    });

    html += '</main>' + footerHtml();
    app.innerHTML = html;
    document.title = C.meta.titulo;

    C.ordem.forEach(function (name) {
      var s = P.sections[name];
      if (!s || !s.mount) return;
      var el = document.getElementById(name === 'hero' ? 'topo' : name);
      if (el) s.mount(el, C, ui, P);
    });

    P.behaviors.gotoLinks();
    P.behaviors.nav(document.getElementById('topnav'), document.getElementById('topo'));
    P.behaviors.reveal(app);

    /* Links diretos para seções (ex.: index.html#investimento) */
    var target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) {
      document.documentElement.style.scrollBehavior = 'auto';
      target.scrollIntoView({ block: 'start' });
      document.documentElement.style.scrollBehavior = '';
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})(window.PROPOSTA);
