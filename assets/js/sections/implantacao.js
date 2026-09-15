/* IMPLANTAÇÃO · sete etapas numeradas (a ordem carrega informação) */
PROPOSTA.register('implantacao', {
  render: function (C, ui) {
    var d = C.implantacao;
    var inner = ui.head('implantacao', d) +
      '<ol class="steps">' + ui.each(d.etapas, function (e, i) {
        return '<li class="step rv"><span class="step__n display">' + ui.pad(i + 1) + '</span><div><h3>' + ui.esc(e.nome) + '</h3><p>' + ui.esc(e.texto) + '</p></div></li>';
      }) + '</ol>';
    return ui.section('implantacao', 'plain', inner, { wrap: 'wrap--mid' });
  }
});
