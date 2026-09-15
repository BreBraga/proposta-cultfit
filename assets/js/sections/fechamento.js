/* FECHAMENTO · resumo da proposta + CTA final */
PROPOSTA.register('fechamento', {
  render: function (C, ui) {
    var d = C.fechamento;
    var inner =
      '<div class="final">' +
        '<div class="final__copy rv">' +
          ui.plate(d.eyebrow, 'plate--white') +
          '<h2 id="fechamento-t">' + ui.rich(d.titulo) + '</h2>' +
          '<p class="final__t">' + ui.esc(d.texto) + '</p>' +
          '<div class="final__cta">' +
            ui.btn({ label: d.cta1.label, href: ui.waLink(), icon: 'wa', variant: 'white', arrow: true }) +
            ui.btn({ label: d.cta2.label, goto: d.cta2.goto, variant: 'ghost' }) +
          '</div>' +
        '</div>' +
        '<div class="final__sum rv">' +
          '<ul class="final__blocks">' + ui.each(d.blocos, function (b) {
            return '<li><b class="display">' + ui.esc(b.n) + '</b><span>' + ui.esc(b.l) + '</span></li>';
          }) + '</ul>' +
          '<ul class="final__opts">' + ui.each(d.opcoes, function (o) {
            return '<li class="' + (o.lead ? 'is-lead' : '') + '"><div><b>' + ui.esc(o.nome) + '</b><span>' + ui.esc(o.desc) + '</span></div><strong class="tnum">R$ ' + ui.num(o.preco) + '<small>/mês</small></strong></li>';
          }) + '</ul>' +
          '<p class="final__impl">' + ui.icon('wrench', 'ic--sm') + ui.esc(d.implementacao) + '</p>' +
        '</div>' +
      '</div>';
    return ui.section('fechamento', 'red', inner);
  }
});
