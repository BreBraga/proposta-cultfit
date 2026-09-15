/* JORNADA · do WhatsApp ao Kanban, com linha de progresso ligada ao scroll */
PROPOSTA.register('jornada', {
  render: function (C, ui) {
    var d = C.jornada;
    var lastGroup = '';
    var inner = ui.head('jornada', d) +
      '<div class="journey">' +
        '<div class="journey__line" aria-hidden="true"><i></i></div>' +
        '<ol class="journey__list">' + ui.each(d.passos, function (p, i) {
          var g = p.grupo !== lastGroup ? '<span class="journey__group">' + ui.esc(p.grupo) + '</span>' : '';
          lastGroup = p.grupo;
          return '<li class="jstep' + (p.final ? ' jstep--final' : '') + '" style="--i:' + i + '">' +
            '<span class="jstep__n">' + ui.pad(i + 1) + '</span>' +
            '<div class="jstep__card">' + g + '<div class="jstep__row">' + ui.chipIco(p.icone, p.icone === 'wa' ? 'chip-ico--wa' : '') +
              '<div><h3>' + ui.esc(p.nome) + '</h3><p>' + ui.esc(p.texto) + '</p></div></div></div>' +
          '</li>';
        }) + '</ol>' +
      '</div>' +
      ui.note('Atendimento feito pela equipe.', d.nota, 'users');
    return ui.section('jornada', 'ink', inner, { wrap: 'wrap--mid' });
  },
  mount: function (el, C, ui, P) {
    var line = el.querySelector('.journey__line i');
    var items = [].slice.call(el.querySelectorAll('.jstep'));
    P.behaviors.scrollLine(el.querySelector('.journey'), line, items);
  }
});
