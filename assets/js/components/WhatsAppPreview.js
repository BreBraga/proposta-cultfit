/* WhatsAppPreview · mockup de atendimento: lista de conversas | janela do
   WhatsApp | dados do contato (CRM). As mensagens aparecem em sequência
   quando o bloco entra na tela. */
window.PROPOSTA = window.PROPOSTA || {};
PROPOSTA.components = PROPOSTA.components || {};

PROPOSTA.components.WhatsAppPreview = (function () {

  function convList(d, ui) {
    return '<aside class="convs" aria-label="Lista de conversas">' +
      '<div class="convs__hd"><div class="convs__search">' + ui.icon('search', 'ic--sm') + 'Buscar conversa</div></div>' +
      '<div class="convs__filters"><span class="is-on">Todas</span><span>Nº 01</span><span>Nº 02</span></div>' +
      '<div class="convs__list">' + ui.each(d.conversas, function (c) {
        return '<div class="conv' + (c.ativo ? ' is-active' : '') + '">' + ui.avatar(c.ini, c.ativo ? 'av--red' : '') +
          '<div class="conv__txt"><b>' + ui.esc(c.nome) + '<small>' + ui.esc(c.hora) + '</small></b><span>' + ui.esc(c.prev) + '</span></div>' +
          '<div class="conv__meta"><span class="conv__num">Nº ' + ui.esc(c.numero) + '</span>' + (c.naoLidas ? '<span class="conv__badge">' + c.naoLidas + '</span>' : '') + '</div>' +
        '</div>';
      }) + '</div>' +
    '</aside>';
  }

  function bubble(m, ui) {
    if (m.de === 'sistema') return '<div class="bub bub--sistema" data-msg>' + ui.icon('kanban') + ui.esc(m.texto) + '</div>';
    return '<div class="bub bub--' + m.de + '" data-msg>' + ui.esc(m.texto) +
      '<div class="bub__t">' + ui.esc(m.hora) + (m.de === 'equipe' ? ui.icon('check') : '') + '</div></div>';
  }

  function chat(d, ui) {
    var c = d.chat;
    return '<div class="chat" aria-label="Janela do WhatsApp dentro do CRM">' +
      '<div class="chat__hd">' + ui.avatar('JS', 'av--red') +
        '<div class="who"><b>' + ui.esc(c.nome) + '</b><span><i aria-hidden="true"></i>WhatsApp · ' + ui.esc(c.numero) + ' · atendido por ' + ui.esc(c.atendente) + '</span></div>' +
        '<span class="app__pill app__pill--red">' + ui.icon('wa', 'ic--sm') + 'Conectado</span>' +
      '</div>' +
      '<div class="chat__body" data-chat>' + ui.each(c.mensagens, function (m) { return bubble(m, ui); }) + '</div>' +
      '<div class="chat__foot"><div class="fake">Responder pelo CRM…</div><div class="send">' + ui.icon('send') + '</div></div>' +
    '</div>';
  }

  function panel(d, ui) {
    var c = d.contato;
    return '<aside class="cpanel" aria-label="Dados do contato no CRM">' +
      '<div class="cpanel__hd">' + ui.avatar('JS', 'av--soft') + '<div><span>Contato · CRM</span><b>' + ui.esc(c.nome) + '</b></div></div>' +
      '<dl class="cpanel__fields">' + ui.each(c.campos, function (f) {
        return '<div class="cpanel__f"><dt>' + ui.esc(f.k) + '</dt><dd>' + (f.etapa ? '<span class="cpanel__sel">' + ui.esc(f.v) + ui.icon('chevron') + '</span>' : ui.esc(f.v)) + '</dd></div>';
      }) + '</dl>' +
      '<div class="cpanel__note"><b>' + ui.icon('note', 'ic--sm') + 'Anotação</b>' + ui.esc(c.anotacao) + '</div>' +
      '<div class="cpanel__acts">' + ui.each(c.acoes, function (a) { return '<span>' + ui.esc(a) + '</span>'; }) + '</div>' +
    '</aside>';
  }

  /* opts: { compact:boolean } — compacto esconde a lista de conversas */
  function render(d, ui, opts) {
    opts = opts || {};
    return '<div class="inbox' + (opts.compact ? ' inbox--compact' : '') + '">' +
      (opts.compact ? '' : convList(d, ui)) + chat(d, ui) + panel(d, ui) +
    '</div>';
  }

  /* Mensagens aparecem uma a uma, com indicador de digitação antes das respostas da equipe. */
  function animate(root, P) {
    var body = root.querySelector('[data-chat]');
    if (!body) return;
    var msgs = [].slice.call(body.querySelectorAll('[data-msg]'));
    if (P.reduceMotion || !msgs.length) return;
    msgs.forEach(function (m) { m.style.display = 'none'; });

    var typing = document.createElement('div');
    typing.className = 'bub bub--equipe is-typing';
    typing.innerHTML = '<i></i><i></i><i></i>';
    typing.style.display = 'none';
    body.appendChild(typing);

    function show(i) {
      if (i >= msgs.length) return;
      var m = msgs[i];
      var isTeam = m.classList.contains('bub--equipe');
      var delay = isTeam ? 900 : 500;
      if (isTeam) { typing.style.display = 'inline-flex'; body.appendChild(typing); }
      setTimeout(function () {
        typing.style.display = 'none';
        m.style.display = '';
        m.style.animation = 'bubIn .35s cubic-bezier(.22,.8,.2,1)';
        show(i + 1);
      }, delay);
    }
    P.behaviors.onceVisible(root, function () { show(0); }, 0.35);
  }

  return { render: render, animate: animate };
})();
