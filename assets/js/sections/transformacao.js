/* TRANSFORMAÇÃO · antes x com o CRM (BeforeAfter) */
PROPOSTA.register('transformacao', {
  render: function (C, ui) {
    var d = C.transformacao;
    var inner = ui.head('transformacao', d) +
      '<div class="ba">' +
        '<div class="ba__col ba__col--before rv">' +
          '<p class="ba__k">' + ui.esc(d.antes.rotulo) + '</p>' +
          '<ul>' + ui.each(d.antes.itens, function (t, i) { return '<li style="--i:' + i + '">' + ui.icon('circle', 'ic--sm') + '<span>' + ui.esc(t) + '</span></li>'; }) + '</ul>' +
        '</div>' +
        '<div class="ba__mid rv" aria-hidden="true"><span class="ba__arrow">' + ui.icon('arrow') + '</span></div>' +
        '<div class="ba__col ba__col--after rv">' +
          ui.plate(d.depois.rotulo, 'plate--big') +
          '<ul>' + ui.each(d.depois.itens, function (t, i) { return '<li style="--i:' + i + '">' + ui.icon('check', 'ic--sm') + '<span>' + ui.esc(t) + '</span></li>'; }) + '</ul>' +
        '</div>' +
      '</div>';
    return ui.section('transformacao', 'paper', inner, { wrap: 'wrap--mid' });
  }
});
