/* FAQ · acordeão */
PROPOSTA.register('faq', {
  render: function (C, ui) {
    var d = C.faq;
    var inner = ui.head('faq', d) +
      '<div class="faq" id="faq-list">' + ui.each(d.itens, function (it, i) {
        return '<div class="qa rv" data-open="0">' +
          '<button class="qa__q" type="button" aria-expanded="false" aria-controls="faq-a' + i + '"><span>' + ui.esc(it.q) + '</span>' + ui.icon('chevron') + '</button>' +
          '<div class="qa__a" id="faq-a' + i + '" role="region"><div><p>' + ui.esc(it.a) + '</p></div></div>' +
        '</div>';
      }) + '</div>';
    return ui.section('faq', 'paper', inner, { wrap: 'wrap--narrow' });
  },
  mount: function (el) {
    el.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.qa__q');
      if (!btn) return;
      var qa = btn.parentElement;
      var open = qa.getAttribute('data-open') === '1';
      qa.setAttribute('data-open', open ? '0' : '1');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }
});
