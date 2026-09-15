/* CONTEXTO · onde a operação perde ritmo hoje */
PROPOSTA.register('contexto', {
  render: function (C, ui) {
    var d = C.contexto;
    var inner = ui.head('contexto', d) +
      '<ul class="grid g4">' + ui.each(d.cards, function (c) {
        return '<li class="card rv">' + ui.chipIco(c.icone) + '<h3>' + ui.esc(c.titulo) + '</h3><p>' + ui.esc(c.texto) + '</p></li>';
      }) + '</ul>';
    return ui.section('contexto', 'paper', inner);
  }
});
