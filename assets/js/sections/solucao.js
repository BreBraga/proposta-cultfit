/* SOLUÇÃO · cinco frentes convergindo para um único ambiente */
PROPOSTA.register('solucao', {
  render: function (C, ui) {
    var d = C.solucao;
    var inner = ui.head('solucao', d) +
      '<div class="hub rv">' +
        '<ul class="hub__ring">' + ui.each(d.frentes, function (f, i) {
          return '<li class="hub__item" style="--i:' + i + '">' + ui.chipIco(f.icone) + '<div><h3>' + ui.esc(f.nome) + '</h3><p>' + ui.esc(f.texto) + '</p></div></li>';
        }) + '</ul>' +
        '<div class="hub__core" aria-hidden="true">' +
          '<img src="assets/img/cultfit-logo.png" alt="" width="56" height="56">' +
          '<b>' + ui.esc(d.centro) + '</b><span>um único ambiente</span>' +
        '</div>' +
      '</div>' +
      '<p class="hub__fecho rv">' + ui.esc(d.fecho) + '</p>';
    return ui.section('solucao', 'ink', inner);
  }
});
