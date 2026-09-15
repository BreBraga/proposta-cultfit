# Proposta · CRM Cult Fit

Landing page de proposta comercial (Linkeed → Cult Fit) para implantação de CRM com WhatsApp integrado, funil Kanban, gestão de contatos e atendimento da equipe.

Página estática, sem build: abra `index.html` no navegador ou publique a pasta inteira (Vercel, Netlify, qualquer hospedagem estática).

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Valores comerciais (usuários, números, preços, implementação) | `assets/js/config/content.js` → bloco `PROPOSTA.config` no topo |
| Toda a copy, listas, FAQ, etapas, dados fictícios dos mockups | `assets/js/config/content.js` |
| Número de WhatsApp dos botões de contato | `content.js` → `contato.whatsapp` |
| Ordem das seções e itens da navegação | `content.js` → `ordem` e `nav` |
| Cores, tipografia e escala | `assets/css/base.css` (tokens em `:root`) |

```js
PROPOSTA.config = {
  USERS: 6,
  WHATSAPP_NUMBERS: 2,
  ESSENTIAL_PRICE: 999,
  COMPLETE_PRICE: 1099,
  IMPLEMENTATION_PRICE: 1100,
  IMPLEMENTATION_INSTALLMENTS: 3
};
```

Os textos que citam esses valores são montados a partir deles, então alterar o bloco acima atualiza a página inteira.

## Estrutura

```
index.html
assets/
  css/   fonts.css (Barlow Condensed + Manrope embutidas) · base.css · components.css · sections.css
  img/   cultfit-logo.png · linkeed.svg
  js/
    config/content.js        conteúdo e valores
    core/                    icons.js · ui.js (helpers) · behaviors.js (reveal, ciclos, abas, nav)
    components/              KanbanBoard.js · WhatsAppPreview.js · CRMPreview.js (mockups reutilizáveis)
    sections/                uma seção por arquivo, na ordem de content.js
    app.js                   montagem da página
```

## Apoio à revisão

- `index.html?from=investimento` renderiza a página a partir de uma seção (útil para capturas).
- `index.html?tab=contatos` abre uma aba fixa no mockup do CRM (`dashboard`, `kanban`, `atendimento`, `contatos`, `historico`).
