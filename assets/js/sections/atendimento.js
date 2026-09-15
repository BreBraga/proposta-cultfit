/* ATENDIMENTO · WhatsApp dentro do CRM (lista | conversa | contato) */
PROPOSTA.register('atendimento', {
  render: function (C, ui, P) {
    var d = C.atendimento;
    var inner = ui.head('atendimento', d) +
      '<div class="rv">' + ui.appWindow({
        url: d.mock.url,
        cls: 'app--inbox',
        body: ui.appHead('Atendimento', '<span class="app__pill app__pill--red">' + ui.icon('wa', 'ic--sm') + C.config.WHATSAPP_NUMBERS + ' números conectados</span>' + ui.avatar('CR')) +
          P.components.WhatsAppPreview.render(d.mock, ui)
      }) + ui.caption(d.caption) + '</div>' +
      '<div class="tri mt-lg" aria-hidden="true"><span>Lista de conversas</span><i></i><span>Janela do WhatsApp</span><i></i><span>Dados do contato · CRM</span></div>' +
      '<ul class="grid g3 mt">' + ui.each(d.cards, function (c) {
        return '<li class="card rv">' + ui.chipIco(c.icone, c.icone === 'wa' ? 'chip-ico--wa' : '') + '<h3>' + ui.esc(c.titulo) + '</h3><p>' + ui.esc(c.texto) + '</p></li>';
      }) + '</ul>';
    return ui.section('atendimento', 'plain', inner);
  },
  mount: function (el, C, ui, P) {
    P.components.WhatsAppPreview.animate(el, P);
  }
});
