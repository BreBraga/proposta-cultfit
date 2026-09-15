/* Helpers e componentes de interface compartilhados entre as seções. */
window.PROPOSTA = window.PROPOSTA || {};

(function (P) {
  var ENT = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ENT[c]; });
  }

  /* *destaque* → <em>, \n → <br> */
  function rich(s) {
    return esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
  }

  function plain(s) {
    return String(s == null ? '' : s).replace(/\*/g, '').replace(/\n/g, ' ');
  }

  function each(arr, fn) {
    return (arr || []).map(fn).join('');
  }

  function icon(name, cls) {
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  function sprite() {
    var defs = Object.keys(P.icons).map(function (k) { return '<g id="i-' + k + '">' + P.icons[k] + '</g>'; }).join('');
    return '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' + defs + '</defs></svg>';
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function waLink(msgKey) {
    var c = P.content.contato;
    var msg = (msgKey && c[msgKey]) || c.mensagem;
    return 'https://wa.me/' + c.whatsapp + '?text=' + encodeURIComponent(msg);
  }

  /* 1099 → "1.099" */
  function num(v) { return Number(v).toLocaleString('pt-BR'); }

  /* Motivo gráfico: o balão da logo Cult Fit, em placa inclinada. */
  function plate(text, cls) {
    return '<span class="plate' + (cls ? ' ' + cls : '') + '"><span>' + esc(text) + '</span></span>';
  }

  function head(id, d, opts) {
    opts = opts || {};
    return '<header class="head rv' + (opts.left ? ' head--left' : '') + '">' +
      plate(d.eyebrow, 'plate--eyebrow') +
      '<h2 id="' + id + '-t">' + rich(d.titulo) + '</h2>' +
      (d.lede ? '<p class="lede">' + rich(d.lede) + '</p>' : '') +
      '</header>';
  }

  function section(id, band, inner, opts) {
    opts = opts || {};
    var glow = band === 'ink' || band === 'red' ? '<div class="band__glow" aria-hidden="true"></div>' : '';
    return '<section class="band band--' + band + (opts.cls ? ' ' + opts.cls : '') + '" id="' + id + '" aria-labelledby="' + id + '-t">' + glow +
      '<div class="wrap' + (opts.wrap ? ' ' + opts.wrap : '') + '">' + inner + '</div></section>';
  }

  function btn(o) {
    var cls = 'btn btn--' + (o.variant || 'primary') + (o.cls ? ' ' + o.cls : '');
    var inner = (o.icon ? icon(o.icon, 'ic--sm') : '') + '<span>' + esc(o.label) + '</span>' + (o.arrow ? icon('arrow', 'ic--sm ic--arrow') : '');
    if (o.goto) return '<button class="' + cls + '" type="button" data-goto="' + o.goto + '">' + inner + '</button>';
    return '<a class="' + cls + '" href="' + o.href + '" target="_blank" rel="noopener noreferrer">' + inner + '</a>';
  }

  function chipIco(name, cls) {
    return '<span class="chip-ico' + (cls ? ' ' + cls : '') + '">' + icon(name) + '</span>';
  }

  function caption(text) {
    return '<p class="caption">' + icon('info', 'ic--sm') + '<span>' + esc(text) + '</span></p>';
  }

  function note(forte, texto, ico) {
    return '<div class="note rv">' + icon(ico || 'info') + '<p><strong>' + esc(forte) + '</strong> ' + esc(texto) + '</p></div>';
  }

  /* Avatar com iniciais (equipe fictícia). */
  function avatar(ini, cls) {
    return '<span class="av' + (cls ? ' ' + cls : '') + '" aria-hidden="true">' + esc(ini) + '</span>';
  }

  /* Janela de aplicativo (mockups do CRM). */
  function appWindow(o) {
    return '<div class="app' + (o.cls ? ' ' + o.cls : '') + '">' +
      '<div class="app__bar"><div class="app__dots"><span></span><span></span><span></span></div>' +
      '<div class="app__url"><span>' + icon('lock', 'ic--sm') + esc(o.url) + '</span></div>' +
      '<span class="app__demo">Dados fictícios</span></div>' +
      o.body + '</div>';
  }

  /* Cabeçalho interno das telas do CRM (marca + título + área do usuário). */
  function appHead(titulo, extra) {
    return '<div class="app__head">' +
      '<div class="app__brand"><img src="assets/img/cultfit-logo.png" alt="" width="26" height="26"><span>CRM Cult Fit</span></div>' +
      '<p class="app__title">' + esc(titulo) + '</p>' +
      '<div class="app__tools">' + (extra || '') + '</div>' +
    '</div>';
  }

  /* Cor de etapa por índice (0..4). */
  function stageClass(i, total) {
    if (i === total - 1) return 'st--won';
    if (i === 0) return 'st--new';
    return 'st--mid';
  }

  P.ui = {
    esc: esc, rich: rich, plain: plain, each: each, icon: icon, sprite: sprite, pad: pad,
    waLink: waLink, num: num, plate: plate, head: head, section: section, btn: btn,
    chipIco: chipIco, caption: caption, note: note, avatar: avatar, appWindow: appWindow,
    appHead: appHead, stageClass: stageClass
  };

  /* Registro de seções: cada arquivo em /sections chama PROPOSTA.register(). */
  P.sections = P.sections || {};
  P.register = function (name, def) { P.sections[name] = def; };

  P.reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
})(window.PROPOSTA);
