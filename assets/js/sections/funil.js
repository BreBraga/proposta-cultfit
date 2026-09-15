/* FUNIL · Kanban animado com oportunidades avançando */
PROPOSTA.register('funil', {
  render: function (C, ui, P) {
    var d = C.funil;
    var inner = ui.head('funil', d) +
      '<div class="rv">' + ui.appWindow({
        url: d.mock.url,
        body: ui.appHead('Funil comercial', '<span class="app__pill">' + ui.icon('sliders', 'ic--sm') + 'Etapas configuráveis</span>' + ui.avatar('LP')) +
          P.components.KanbanBoard.render(C.etapas, d.mock.cards, ui)
      }) + ui.caption(d.caption) + '</div>' +
      '<div class="stages rv mt-lg" aria-hidden="true">' + ui.each(C.etapas, function (e, i) {
        return '<span class="stages__s ' + ui.stageClass(i, C.etapas.length) + '">' + ui.esc(e.nome) + '</span>' + (i < C.etapas.length - 1 ? ui.icon('arrow', 'ic--sm') : '');
      }) + '</div>' +
      '<ul class="grid g3 mt">' + ui.each(d.cards, function (c) {
        return '<li class="card rv">' + ui.chipIco(c.icone) + '<h3>' + ui.esc(c.titulo) + '</h3><p>' + ui.esc(c.texto) + '</p></li>';
      }) + '</ul>';
    return ui.section('funil', 'paper', inner);
  },
  mount: function (el, C, ui, P) {
    P.components.KanbanBoard.animate(el, P);
  }
});
