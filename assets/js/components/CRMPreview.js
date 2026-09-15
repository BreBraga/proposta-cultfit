/* CRMPreview · janela do CRM com abas: Visão geral · Funil · Atendimento ·
   Contatos · Histórico. Reaproveita KanbanBoard e WhatsAppPreview. */
window.PROPOSTA = window.PROPOSTA || {};
PROPOSTA.components = PROPOSTA.components || {};

PROPOSTA.components.CRMPreview = (function () {

  function dashboard(C, ui) {
    var d = C.crm.dashboard;
    var max = Math.max.apply(null, d.porEtapa.map(function (e) { return e.v; }));
    var equipe = C.equipe;
    var carga = C.estrutura.carga;
    var maxU = Math.max.apply(null, carga);
    return '<div class="dash">' +
      '<div class="dash__kpis">' + ui.each(d.resumo, function (k) {
        return '<div class="kpi"><div class="kpi__top">' + ui.chipIco(k.icone) + '</div><p class="kpi__label">' + ui.esc(k.l) + '</p><p class="kpi__value tnum" data-count="' + k.v + '">' + k.v + '</p></div>';
      }) + '</div>' +
      '<div class="dash__split">' +
        '<div class="panel"><div class="panel__hd"><p class="k">Funil</p><p class="t">Oportunidades por etapa</p></div>' +
          '<div class="bars">' + ui.each(d.porEtapa, function (e, i) {
            return '<div class="bars__g"><div class="bars__track"><span class="' + ui.stageClass(i, d.porEtapa.length) + '" data-h="' + Math.round(e.v / max * 100) + '"></span></div><em>' + ui.esc(e.nome) + '</em><b class="tnum">' + e.v + '</b></div>';
          }) + '</div>' +
        '</div>' +
        '<div class="panel"><div class="panel__hd"><p class="k">Equipe</p><p class="t">' + ui.esc(d.porUsuarioTitulo) + '</p></div>' +
          '<div class="rows">' + ui.each(equipe, function (u, i) {
            return '<div class="row"><div class="row__who">' + ui.avatar(u.ini) + '<b>' + ui.esc(u.nome) + '</b></div><div class="row__track"><i data-w="' + Math.round(carga[i] / maxU * 100) + '"></i></div><span class="tnum">' + carga[i] + '</span></div>';
          }) + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function contatos(C, ui) {
    var d = C.crm.contatos;
    var etapas = C.etapas.map(function (e) { return e.nome; });
    return '<div class="ctbl">' +
      '<div class="ctbl__hd"><div class="convs__search">' + ui.icon('search', 'ic--sm') + ui.esc(d.busca) + '</div><span class="app__pill">' + ui.icon('sliders', 'ic--sm') + 'Filtros</span><span class="app__pill app__pill--red">' + ui.icon('plus', 'ic--sm') + 'Novo contato</span></div>' +
      '<div class="ctbl__scroll"><table class="ctbl__t"><thead><tr>' + ui.each(d.colunas, function (c) { return '<th>' + ui.esc(c) + '</th>'; }) + '</tr></thead><tbody>' +
      ui.each(d.linhas, function (l) {
        var idx = etapas.indexOf(l[2]);
        return '<tr><td><span class="ctbl__who">' + ui.avatar(l[0].split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2)) + ui.esc(l[0]) + '</span></td>' +
          '<td>' + ui.esc(l[1]) + '</td>' +
          '<td><span class="st ' + ui.stageClass(idx, etapas.length) + '">' + ui.esc(l[2]) + '</span></td>' +
          '<td>' + ui.esc(l[3]) + '</td><td><span class="kcard__num">Nº ' + ui.esc(l[4]) + '</span></td><td>' + ui.esc(l[5]) + '</td></tr>';
      }) + '</tbody></table></div>' +
    '</div>';
  }

  function historico(C, ui) {
    var d = C.crm.historico;
    var icons = { conversa: 'wa', registro: 'contact', etapa: 'kanban', nota: 'note' };
    return '<div class="hist">' +
      '<div class="hist__side">' +
        '<div class="cpanel__hd">' + ui.avatar('JS', 'av--red av--lg') + '<div><span>Contato</span><b>' + ui.esc(d.nome) + '</b></div></div>' +
        '<dl class="cpanel__fields">' + ui.each(d.resumo, function (f) { return '<div class="cpanel__f"><dt>' + ui.esc(f.k) + '</dt><dd>' + ui.esc(f.v) + '</dd></div>'; }) + '</dl>' +
      '</div>' +
      '<div class="hist__main"><p class="hist__k">' + ui.icon('history', 'ic--sm') + 'Linha do tempo</p>' +
        '<ol class="tl">' + ui.each(d.eventos, function (e) {
          return '<li class="tl__i tl__i--' + e.tipo + '"><span class="tl__ic">' + ui.icon(icons[e.tipo] || 'dot', 'ic--sm') + '</span><div><b>' + ui.esc(e.quando) + '</b><p>' + ui.esc(e.texto) + '</p></div></li>';
        }) + '</ol>' +
      '</div>' +
    '</div>';
  }

  function render(C, ui, P) {
    var d = C.crm;
    var panels = {
      dashboard: dashboard(C, ui),
      kanban: P.components.KanbanBoard.render(C.etapas, C.funil.mock.cards, ui, { compact: true }),
      atendimento: P.components.WhatsAppPreview.render(C.atendimento.mock, ui, { compact: true }),
      contatos: contatos(C, ui),
      historico: historico(C, ui)
    };
    var body =
      ui.appHead(d.abas[0].label, '<span class="app__pill">' + ui.icon('calendar', 'ic--sm') + ui.esc(d.dashboard.periodo) + '</span>' + ui.avatar('CR')) +
      '<div class="crmtabs" role="tablist" aria-label="Telas do CRM">' + ui.each(d.abas, function (a, i) {
        return '<button type="button" role="tab" id="tab-' + a.id + '" data-tab="' + a.id + '" aria-selected="' + (i === 0) + '" aria-controls="panel-' + a.id + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + ui.icon(a.icone, 'ic--sm') + '<span>' + ui.esc(a.label) + '</span></button>';
      }) + '</div>' +
      ui.each(d.abas, function (a, i) {
        return '<div class="crmpanel" role="tabpanel" id="panel-' + a.id + '" data-panel="' + a.id + '" aria-labelledby="tab-' + a.id + '"' + (i === 0 ? '' : ' hidden') + '>' + panels[a.id] + '</div>';
      });
    return ui.appWindow({ url: d.url, body: body, cls: 'app--crm' });
  }

  function mount(root, C, ui, P) {
    var titleEl = root.querySelector('.app__title');
    var labels = {};
    C.crm.abas.forEach(function (a) { labels[a.id] = a.label; });
    var t = P.behaviors.tabs(root, function (id) {
      titleEl.textContent = labels[id];
      var panel = root.querySelector('[data-panel="' + id + '"]');
      P.behaviors.grow(panel);
    });
    /* animações internas das abas */
    P.components.KanbanBoard.animate(root.querySelector('[data-panel="kanban"]'), P);
    var chatPanel = root.querySelector('[data-panel="atendimento"]');
    var chatShown = false;
    var origSelect = t.select;
    t.select = function (id, focus) {
      origSelect(id, focus);
      if (id === 'atendimento' && !chatShown) { chatShown = true; P.components.WhatsAppPreview.animate(chatPanel, P); }
    };
    /* ciclo automático pelas abas até o usuário interagir */
    var ids = t.ids;
    var cyc = P.behaviors.autoCycle(root, ids.length, function (i) { t.select(ids[i]); }, { interval: 4200, stopOnInteract: true });
    root.querySelector('.crmtabs').addEventListener('click', function () { cyc.stop(); });
    /* Apoio à revisão: index.html?tab=contatos abre uma aba fixa. */
    var fixed = /[?&]tab=([a-z]+)/.exec(location.search);
    if (fixed && ids.indexOf(fixed[1]) >= 0) { cyc.stop(); t.select(fixed[1]); }
  }

  return { render: render, mount: mount };
})();
