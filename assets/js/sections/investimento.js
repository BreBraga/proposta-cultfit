/* INVESTIMENTO · Plans + PlanComparison + Implementation */
PROPOSTA.register('investimento', (function () {

  function plans(C, ui) {
    var d = C.investimento;
    return '<div class="packs">' + ui.each(d.planos, function (p) {
      return '<article class="pack' + (p.lead ? ' pack--lead' : '') + ' rv">' +
        (p.flag ? '<span class="pack__flag">' + ui.icon('zap', 'ic--sm') + ui.esc(p.flag) + '</span>' : '') +
        '<p class="pack__kicker">' + ui.esc(p.kicker) + '</p>' +
        '<h3 class="pack__name display">' + ui.esc(p.nome) + '</h3>' +
        '<div class="pack__price"><span class="cur">R$</span><span class="val tnum">' + ui.num(p.preco) + '</span><span class="per">/mês</span></div>' +
        '<p class="pack__note">' + ui.esc(p.resumo) + '</p>' +
        '<div class="seats"><div class="seat"><p class="n tnum">' + C.config.USERS + '</p><p class="l">usuários</p></div><div class="seat"><p class="n tnum">' + C.config.WHATSAPP_NUMBERS + '</p><p class="l">números de WhatsApp</p></div></div>' +
        '<p class="pack__k">Base do CRM</p>' +
        '<ul class="pack__list">' + ui.each(d.base, function (b) { return '<li>' + ui.icon('check', 'ic--sm') + ui.esc(b) + '</li>'; }) + '</ul>' +
        '<p class="pack__k">Recursos adicionais</p>' +
        '<ul class="pack__list pack__list--extras">' + ui.each(p.extras, function (e) {
          return '<li class="' + (e.ok ? 'is-ok' : 'is-no') + '">' + ui.icon(e.ok ? 'check' : 'minus', 'ic--sm') + ui.esc(e.nome) + (e.ok ? '' : '<em>não incluso</em>') + '</li>';
        }) + '</ul>' +
        '<div class="pack__cta">' + ui.btn({ label: p.cta, href: ui.waLink(p.msg), icon: 'wa', variant: p.lead ? 'primary' : 'quiet', cls: 'btn--wide' }) + '</div>' +
      '</article>';
    }) + '</div>';
  }

  function comparison(C, ui) {
    var d = C.investimento;
    var e = d.planos.filter(function (p) { return p.id === 'essencial'; })[0];
    var c = d.planos.filter(function (p) { return p.id === 'completa'; })[0];
    function mark(ok) {
      return ok ? '<span class="mark mark--yes">' + ui.icon('check') + 'Incluso</span>' : '<span class="mark mark--no">' + ui.icon('minus', 'ic--sm') + 'Não incluso</span>';
    }
    return '<div class="tablewrap rv"><table class="table"><caption>' + ui.esc(d.comparativo.titulo) + '</caption>' +
      '<thead><tr><th scope="col">O que entra</th><th scope="col">' + ui.esc(e.nome) + '</th><th scope="col" class="col-lead">' + ui.esc(c.nome) + '</th></tr></thead>' +
      '<tbody>' + ui.each(d.comparativo.linhas, function (l) {
        return '<tr><th scope="row">' + ui.esc(l.item) + '</th><td>' + mark(l.e) + '</td><td class="col-lead">' + mark(l.c) + '</td></tr>';
      }) +
      '<tr class="table__price"><th scope="row">Mensalidade</th><td><b class="tnum">R$ ' + ui.num(e.preco) + '</b>/mês</td><td class="col-lead"><b class="tnum">R$ ' + ui.num(c.preco) + '</b>/mês</td></tr>' +
      '</tbody></table></div>';
  }

  function implementation(C, ui) {
    var d = C.investimento.implementacao;
    return '<div class="impl rv">' +
      '<div class="impl__main">' +
        ui.plate(d.eyebrow, 'plate--eyebrow') +
        '<div class="impl__price"><span class="cur">R$</span><span class="val tnum">' + ui.num(d.valor) + '</span><span class="once">valor único</span></div>' +
        '<p class="impl__t">' + ui.esc(d.texto) + '</p>' +
        '<p class="impl__d">' + ui.esc(d.detalhe) + '</p>' +
      '</div>' +
      '<ol class="impl__line" aria-label="Como a implementação entra nas faturas">' + ui.each(d.linha, function (m, i) {
        return '<li' + (m.b ? '' : ' class="is-plain"') + '><b>' + ui.esc(m.mes) + '</b><span>' + ui.esc(m.a) + '</span>' + (m.b ? '<span class="is-extra">' + ui.icon('plus', 'ic--sm') + ui.esc(m.b) + '</span>' : '<span class="is-none">sem parcela</span>') + '</li>';
      }) + '</ol>' +
    '</div>';
  }

  function addons(C, ui) {
    var d = C.investimento.adicionais;
    function brl(v) { return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
    return '<div class="addons rv">' +
      '<div class="addons__hd">' + ui.plate(d.titulo, 'plate--ink plate--eyebrow') + '<p>' + ui.esc(d.texto) + '</p></div>' +
      '<ul class="addons__list">' + ui.each(d.itens, function (it) {
        var price = it.opcoes
          ? '<div class="addons__opts">' + ui.each(it.opcoes, function (o) {
              return '<p><em>' + ui.esc(o.rotulo) + '</em><strong class="tnum">+ R$ ' + brl(o.valor) + '<small>' + ui.esc(it.unidade) + '</small></strong></p>';
            }) + '</div>'
          : '<strong class="tnum">+ R$ ' + brl(it.valor) + '<small>' + ui.esc(it.unidade) + '</small></strong>';
        return '<li><div><b>' + ui.esc(it.nome) + '</b><span>' + ui.esc(it.desc) + '</span></div>' + price + '</li>';
      }) + '</ul>' +
    '</div>';
  }

  return {
    render: function (C, ui) {
      var d = C.investimento;
      var inner = ui.head('investimento', d) +
        plans(C, ui) +
        '<div class="mt-lg">' + comparison(C, ui) + '</div>' +
        '<div class="mt-lg">' + implementation(C, ui) + '</div>' +
        '<div class="mt">' + addons(C, ui) + '</div>' +
        '<div class="mt">' + ui.note('Valores fechados.', d.nota, 'shield') + '</div>';
      return ui.section('investimento', 'paper', inner, { wrap: 'wrap--mid' });
    }
  };
})());
