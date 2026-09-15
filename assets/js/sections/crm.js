/* CRM · experiência do ambiente com abas (CRMPreview) */
PROPOSTA.register('crm', {
  render: function (C, ui, P) {
    var d = C.crm;
    var inner = ui.head('crm', d) +
      '<div class="rv">' + P.components.CRMPreview.render(C, ui, P) + ui.caption(d.caption) + '</div>';
    return ui.section('crm', 'plain', inner);
  },
  mount: function (el, C, ui, P) {
    P.components.CRMPreview.mount(el.querySelector('.app--crm'), C, ui, P);
  }
});
