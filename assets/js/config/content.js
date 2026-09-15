/* ==========================================================================
   CONTEÚDO DA PROPOSTA · CRM Cult Fit
   --------------------------------------------------------------------------
   Toda a copy, todas as listas e todos os valores comerciais da página vivem
   aqui. Para alterar um texto, uma etapa, um valor ou um nome de mockup,
   edite somente este arquivo.

   Convenções de texto:
     *trecho*  → destaque em vermelho (vira <em>)
     \n        → quebra de linha
   ========================================================================== */
window.PROPOSTA = window.PROPOSTA || {};

/* ---------- DADOS COMERCIAIS (edite aqui) ---------- */
PROPOSTA.config = {
  USERS: 6,                       // usuários com acesso ao CRM
  WHATSAPP_NUMBERS: 2,            // números de WhatsApp conectados
  ESSENTIAL_PRICE: 999,           // R$/mês · plano Essencial
  COMPLETE_PRICE: 1099,           // R$/mês · plano Completa
  IMPLEMENTATION_PRICE: 1100,     // R$ · valor único de implementação
  IMPLEMENTATION_INSTALLMENTS: 3, // parcelas da implementação (junto às primeiras mensalidades)
  EXTRA_USER_PRICE: 87,           // R$/mês · usuário adicional
  EXTRA_NUMBER_PRICE: 139.9       // R$/mês · número de WhatsApp adicional (conexão via API não oficial)
};

PROPOSTA.content = (function (cfg) {
  var U = cfg.USERS;
  var N = cfg.WHATSAPP_NUMBERS;

  return {
    meta: {
      titulo: 'Proposta · CRM Cult Fit',
      cliente: 'Cult Fit',
      ano: 2026,
      rodape: 'Proposta comercial elaborada para a rede de academias Cult Fit'
    },

    /* Contato comercial usado em todos os botões de WhatsApp. */
    contato: {
      whatsapp: '5521973531732',
      exibicao: '+55 21 97353-1732',
      mensagem: 'Olá! Vi a proposta do CRM para a Cult Fit e gostaria de conversar.',
      mensagemCompleta: 'Olá! Vi a proposta do CRM para a Cult Fit e quero seguir com o plano Completa.',
      mensagemEssencial: 'Olá! Vi a proposta do CRM para a Cult Fit e quero seguir com o plano Essencial.'
    },

    /* Ordem das seções na página. */
    ordem: [
      'hero', 'contexto', 'solucao', 'atendimento', 'funil',
      'crm', 'jornada', 'transformacao',
      'investimento', 'implantacao', 'faq', 'fechamento'
    ],

    nav: [
      { id: 'atendimento', label: 'Atendimento' },
      { id: 'funil', label: 'Funil' },
      { id: 'crm', label: 'CRM' },
      { id: 'jornada', label: 'Jornada' },
      { id: 'investimento', label: 'Investimento' },
      { id: 'faq', label: 'Dúvidas' }
    ],

    /* Etapas ilustrativas do funil (configuráveis na implantação). */
    etapas: [
      { id: 'novo', nome: 'Novo contato' },
      { id: 'atendimento', nome: 'Em atendimento' },
      { id: 'interessado', nome: 'Interessado' },
      { id: 'negociacao', nome: 'Negociação' },
      { id: 'matricula', nome: 'Matrícula', final: true }
    ],

    /* Equipe fictícia (6 usuários). */
    equipe: [
      { nome: 'Camila R.', papel: 'Atendimento', ini: 'CR' },
      { nome: 'Diego M.', papel: 'Atendimento', ini: 'DM' },
      { nome: 'Larissa P.', papel: 'Comercial', ini: 'LP' },
      { nome: 'Bruno T.', papel: 'Comercial', ini: 'BT' },
      { nome: 'Fernanda A.', papel: 'Recepção', ini: 'FA' },
      { nome: 'Thiago N.', papel: 'Gestão', ini: 'TN' }
    ],

    /* ================= HERO ================= */
    hero: {
      tag: 'Proposta comercial · CRM Cult Fit',
      titulo: 'Seu atendimento também precisa de *performance*.',
      lede: 'CRM, WhatsApp e funil comercial em uma única operação para organizar contatos, acompanhar oportunidades e dar mais controle ao time Cult Fit.',
      sub: 'Do WhatsApp ao fechamento. Tudo em um só lugar.',
      numeros: [
        { n: N, l: 'números de WhatsApp' },
        { n: U, l: 'usuários no CRM' },
        { n: 1, l: 'ambiente de atendimento' }
      ],
      cta1: { label: 'Ver a solução', goto: 'atendimento' },
      cta2: { label: 'Ver investimento', goto: 'investimento' },
      /* Cena animada: mensagem → contato → funil */
      cena: {
        msg: { de: 'Ana Beatriz', hora: '08:41', texto: 'Oi! Quero saber os planos da unidade. Quanto fica o mensal?' },
        card: { nome: 'Ana Beatriz', interesse: 'Plano mensal', responsavel: 'Camila R.', origem: 'Número 01' },
        etapaAtiva: 1
      }
    },

    /* ================= CONTEXTO ================= */
    contexto: {
      eyebrow: 'O cenário',
      titulo: 'Muita conversa chegando.\nPouca visão do que acontece com *cada uma*.',
      lede: 'A Cult Fit recebe contatos todos os dias pelo WhatsApp. O desafio não é a demanda: é acompanhar cada conversa até a matrícula sem perder o fio.',
      cards: [
        { icone: 'phone', titulo: 'Conversas em aparelhos diferentes', texto: 'Cada número atende por conta própria. Quem está com o celular sabe o que foi combinado; o resto do time precisa perguntar.' },
        { icone: 'funnel', titulo: 'Sem visão de etapa', texto: 'Quem já pediu valores, quem visitou a unidade e quem só perguntou o horário ficam na mesma lista de conversas.' },
        { icone: 'history', titulo: 'Retomar exige memória', texto: 'Quando um contato volta a falar dias depois, é preciso rolar a conversa inteira para lembrar o contexto.' },
        { icone: 'target', titulo: 'Oportunidade sem responsável', texto: 'Sem um responsável definido e um registro central, o retorno depende de quem lembrou de fazer o acompanhamento.' }
      ]
    },

    /* ================= SOLUÇÃO ================= */
    solucao: {
      eyebrow: 'A solução',
      titulo: 'Um único ambiente para *conversar, registrar e acompanhar*.',
      lede: 'O CRM passa a ser o centro da operação comercial: os ' + N + ' números de WhatsApp entram nele, os ' + U + ' usuários atendem por ele e cada contato vira uma oportunidade no funil.',
      centro: 'CRM Cult Fit',
      frentes: [
        { icone: 'grid', nome: 'CRM', texto: 'Ambiente central com cadastro de contatos, responsáveis, etapas e histórico.' },
        { icone: 'wa', nome: 'WhatsApp integrado', texto: 'Os ' + N + ' números conectados ao CRM. A equipe responde sem sair do ambiente.' },
        { icone: 'kanban', nome: 'Funil Kanban', texto: 'Oportunidades em colunas, movidas pela equipe conforme avançam.' },
        { icone: 'contact', nome: 'Gestão de contatos', texto: 'Quem é, o que quer, quem atende e quando falou pela última vez.' },
        { icone: 'users', nome: 'Atendimento da equipe', texto: U + ' usuários trabalhando no mesmo lugar, com visibilidade do que cada um acompanha.' }
      ],
      fecho: 'Sem módulos extras, sem inteligência artificial. Uma operação de atendimento e vendas organizada de ponta a ponta.'
    },

    /* ================= WHATSAPP + CRM ================= */
    atendimento: {
      eyebrow: 'WhatsApp dentro do CRM',
      titulo: 'Conversa, contato e funil.\n*Na mesma tela.*',
      lede: 'O atendente responde o WhatsApp pelo CRM e, ao lado da conversa, vê quem é o contato, qual o interesse, quem é o responsável e em que etapa ele está.',
      mock: {
        url: 'crm.cultfit.app/atendimento',
        conversas: [
          { ini: 'JS', nome: 'João Silva', prev: 'Pode sim!', hora: '09:14', numero: '01', ativo: true, naoLidas: 0 },
          { ini: 'AB', nome: 'Ana Beatriz', prev: 'Quanto fica o mensal?', hora: '08:41', numero: '01', naoLidas: 2 },
          { ini: 'CM', nome: 'Carla Mendes', prev: 'Tem aula experimental?', hora: '08:20', numero: '02', naoLidas: 1 },
          { ini: 'RS', nome: 'Rafael Souza', prev: 'Fechado, vou passar aí hoje.', hora: 'Ontem', numero: '02' },
          { ini: 'MV', nome: 'Marcos Vinícius', prev: 'Obrigado pelas informações.', hora: 'Ontem', numero: '01' },
          { ini: 'JP', nome: 'Juliana Prado', prev: 'Qual o horário de sábado?', hora: 'Seg', numero: '02' }
        ],
        chat: {
          nome: 'João Silva',
          numero: 'Número 01',
          atendente: 'Camila R.',
          mensagens: [
            { de: 'cliente', texto: 'Oi! Vi o Instagram de vocês. Quanto fica o plano mensal?', hora: '09:02' },
            { de: 'equipe', texto: 'Oi, João! Aqui é a Camila, da Cult Fit. Temos plano mensal, trimestral e anual. Você prefere treinar em qual horário?', hora: '09:05' },
            { de: 'cliente', texto: 'De manhã cedo, antes do trabalho.', hora: '09:09' },
            { de: 'equipe', texto: 'Perfeito. Posso agendar uma aula experimental amanhã às 7h para você conhecer a unidade?', hora: '09:11' },
            { de: 'cliente', texto: 'Pode sim!', hora: '09:14' },
            { de: 'sistema', texto: 'Etapa alterada: Em atendimento → Interessado · por Camila R.' }
          ]
        },
        contato: {
          nome: 'João Silva',
          campos: [
            { k: 'Contato', v: 'João Silva' },
            { k: 'Telefone', v: '+55 (••) •••••-4821' },
            { k: 'Origem', v: 'WhatsApp · Número 01' },
            { k: 'Interesse', v: 'Plano Academia' },
            { k: 'Responsável', v: 'Camila R.' },
            { k: 'Etapa', v: 'Em atendimento', etapa: true },
            { k: 'Último contato', v: 'Hoje, 09:14' }
          ],
          anotacao: 'Prefere treinar de manhã. Aula experimental sugerida para amanhã, 7h.',
          acoes: ['Mover etapa', 'Adicionar anotação']
        }
      },
      cards: [
        { icone: 'inbox', titulo: 'Lista de conversas dos ' + N + ' números', texto: 'As conversas dos dois números chegam na mesma lista, com indicação de qual número recebeu cada uma.' },
        { icone: 'wa', titulo: 'Janela do WhatsApp', texto: 'A equipe lê e responde dentro do CRM. Cada mensagem enviada fica registrada no contato.' },
        { icone: 'contact', titulo: 'Dados do contato ao lado', texto: 'Interesse, responsável, etapa e último contato visíveis enquanto a conversa acontece.' }
      ],
      caption: 'Interface ilustrativa com nomes e dados fictícios.'
    },

    /* ================= FUNIL KANBAN ================= */
    funil: {
      eyebrow: 'Funil Kanban',
      titulo: 'Cada oportunidade em uma etapa.\nCada etapa *à vista*.',
      lede: 'Os contatos viram cards que a equipe move pelas etapas do funil. Quem olha o quadro entende em segundos onde cada oportunidade está e o que falta para avançar.',
      mock: {
        url: 'crm.cultfit.app/funil',
        cards: {
          novo: [
            { nome: 'Ana Beatriz', interesse: 'Plano mensal', resp: 'CR', tempo: 'há 4 min', num: '01' },
            { nome: 'Pedro Lima', interesse: 'Plano anual', resp: 'DM', tempo: 'há 18 min', num: '02' },
            { nome: 'Sofia Martins', interesse: 'Aula experimental', resp: 'FA', tempo: 'há 32 min', num: '01' }
          ],
          atendimento: [
            { nome: 'João Silva', interesse: 'Plano Academia', resp: 'CR', tempo: 'hoje, 09:14', num: '01', hot: true },
            { nome: 'Carla Mendes', interesse: 'Aula experimental', resp: 'DM', tempo: 'hoje, 08:20', num: '02' }
          ],
          interessado: [
            { nome: 'Juliana Prado', interesse: 'Plano trimestral', resp: 'LP', tempo: 'ontem', num: '02' },
            { nome: 'Marcos Vinícius', interesse: 'Plano mensal', resp: 'BT', tempo: 'ontem', num: '01' }
          ],
          negociacao: [
            { nome: 'Rafael Souza', interesse: 'Plano anual', resp: 'LP', tempo: 'hoje, 10:02', num: '02' }
          ],
          matricula: [
            { nome: 'Beatriz Nunes', interesse: 'Plano trimestral', resp: 'BT', tempo: 'ontem', num: '01', won: true }
          ]
        }
      },
      caption: 'Etapas ilustrativas. O funil é configurado conforme o processo comercial da Cult Fit durante a implantação.',
      cards: [
        { icone: 'move', titulo: 'Arrastar e soltar', texto: 'A equipe move o card de uma etapa para a outra conforme a conversa avança. O quadro reflete a operação em tempo real.' },
        { icone: 'usercheck', titulo: 'Responsável em cada card', texto: 'Cada oportunidade mostra quem está cuidando dela, o interesse e quando foi o último contato.' },
        { icone: 'sliders', titulo: 'Etapas configuráveis', texto: 'As colunas seguem o processo comercial da Cult Fit. Nomes e quantidade de etapas são definidos na implantação.' }
      ]
    },

    /* ================= ESTRUTURA: 2 NÚMEROS + 6 USUÁRIOS ================= */
    estrutura: {
      eyebrow: 'Estrutura contratada',
      titulo: N + ' números. 1 CRM. *' + U + ' usuários.*',
      lede: 'Os ' + N + ' números de WhatsApp da Cult Fit entram no mesmo ambiente. A equipe atende, registra e acompanha com ' + U + ' acessos individuais.',
      numeros: [
        { rotulo: 'Número 01', desc: 'WhatsApp conectado ao CRM' },
        { rotulo: 'Número 02', desc: 'WhatsApp conectado ao CRM' }
      ],
      centro: { rotulo: 'CRM Cult Fit', desc: 'Conversas, contatos e funil no mesmo ambiente' },
      usuariosRotulo: U + ' usuários',
      usuariosDesc: 'atendendo, registrando e acompanhando',
      equipeTitulo: 'Uma equipe. Um ambiente.',
      equipeTexto: 'Cada usuário tem seu acesso ao CRM. Todos veem as conversas, os contatos e o funil no mesmo lugar, e cada contato mostra quem é o responsável por ele.',
      principios: [
        { icone: 'grid', nome: 'Organização', texto: 'Contatos, conversas e etapas com lugar definido.' },
        { icone: 'share', nome: 'Distribuição', texto: 'Cada contato com um responsável no time.' },
        { icone: 'eye', nome: 'Acompanhamento', texto: 'Quem acompanha cada oportunidade, visível para todos.' },
        { icone: 'history', nome: 'Histórico', texto: 'O que foi conversado fica registrado no contato.' },
        { icone: 'layers', nome: 'Visibilidade', texto: 'O funil inteiro à vista, não só a própria fila.' },
        { icone: 'target', nome: 'Centralização', texto: 'Os ' + N + ' números e os ' + U + ' usuários no mesmo CRM.' }
      ],
      /* conversas em andamento por usuário (ilustrativo) */
      carga: [3, 2, 4, 2, 3, 1]
    },

    /* ================= EXPERIÊNCIA DO CRM ================= */
    crm: {
      eyebrow: 'Experiência do CRM',
      titulo: 'Uma aplicação real,\ncom a *identidade Cult Fit*.',
      lede: 'Navegue pelas telas principais do ambiente: visão geral, funil, atendimento, contatos e histórico. Tudo dentro do que um CRM comercial e de atendimento faz.',
      url: 'crm.cultfit.app',
      abas: [
        { id: 'dashboard', label: 'Visão geral', icone: 'grid' },
        { id: 'kanban', label: 'Funil', icone: 'kanban' },
        { id: 'atendimento', label: 'Atendimento', icone: 'wa' },
        { id: 'contatos', label: 'Contatos', icone: 'contact' },
        { id: 'historico', label: 'Histórico', icone: 'history' }
      ],
      dashboard: {
        titulo: 'Visão geral da operação',
        periodo: 'Hoje',
        resumo: [
          { l: 'Conversas em aberto', v: 14, icone: 'inbox' },
          { l: 'Novos contatos hoje', v: 9, icone: 'plus' },
          { l: 'Oportunidades no funil', v: 38, icone: 'kanban' },
          { l: 'Matrículas na semana', v: 6, icone: 'check' }
        ],
        porEtapa: [
          { nome: 'Novo contato', v: 12 },
          { nome: 'Em atendimento', v: 9 },
          { nome: 'Interessado', v: 8 },
          { nome: 'Negociação', v: 5 },
          { nome: 'Matrícula', v: 4 }
        ],
        porUsuarioTitulo: 'Conversas por responsável'
      },
      contatos: {
        titulo: 'Contatos',
        busca: 'Buscar contato, telefone ou interesse',
        colunas: ['Contato', 'Interesse', 'Etapa', 'Responsável', 'Número', 'Último contato'],
        linhas: [
          ['Ana Beatriz', 'Plano mensal', 'Novo contato', 'Camila R.', '01', 'Hoje, 08:41'],
          ['João Silva', 'Plano Academia', 'Em atendimento', 'Camila R.', '01', 'Hoje, 09:14'],
          ['Carla Mendes', 'Aula experimental', 'Em atendimento', 'Diego M.', '02', 'Hoje, 08:20'],
          ['Juliana Prado', 'Plano trimestral', 'Interessado', 'Larissa P.', '02', 'Ontem'],
          ['Rafael Souza', 'Plano anual', 'Negociação', 'Larissa P.', '02', 'Hoje, 10:02'],
          ['Beatriz Nunes', 'Plano trimestral', 'Matrícula', 'Bruno T.', '01', 'Ontem'],
          ['Marcos Vinícius', 'Plano mensal', 'Interessado', 'Bruno T.', '01', 'Ontem']
        ]
      },
      historico: {
        nome: 'João Silva',
        resumo: [
          { k: 'Interesse', v: 'Plano Academia' },
          { k: 'Etapa', v: 'Interessado' },
          { k: 'Responsável', v: 'Camila R.' },
          { k: 'Origem', v: 'WhatsApp · Número 01' }
        ],
        eventos: [
          { tipo: 'conversa', quando: 'Hoje, 09:02', texto: 'Primeira mensagem recebida pelo Número 01.' },
          { tipo: 'registro', quando: 'Hoje, 09:03', texto: 'Contato registrado no CRM · Responsável: Camila R.' },
          { tipo: 'etapa', quando: 'Hoje, 09:03', texto: 'Oportunidade criada em Novo contato → Em atendimento.' },
          { tipo: 'nota', quando: 'Hoje, 09:12', texto: 'Anotação: prefere treinar de manhã. Aula experimental sugerida.' },
          { tipo: 'etapa', quando: 'Hoje, 09:14', texto: 'Etapa alterada: Em atendimento → Interessado.' },
          { tipo: 'conversa', quando: 'Hoje, 09:14', texto: 'Última mensagem: "Pode sim!"' }
        ]
      },
      caption: 'Telas ilustrativas com dados fictícios. Os nomes das etapas e os campos do contato são configurados na implantação.'
    },

    /* ================= HISTÓRICO CENTRALIZADO ================= */
    historico: {
      eyebrow: 'Histórico centralizado',
      titulo: 'A conversa deixa de ser\numa *mensagem solta*.',
      lede: 'Cada contato passa a ter uma linha do tempo dentro do CRM: conversas, anotações, etapa do funil e responsável. Quando ele volta a falar, a equipe continua de onde parou.',
      cadeia: [
        { icone: 'contact', nome: 'Contato', texto: 'Um cadastro para cada pessoa que fala com a Cult Fit.' },
        { icone: 'wa', nome: 'Conversas', texto: 'Tudo o que foi trocado pelos ' + N + ' números, registrado no contato.' },
        { icone: 'note', nome: 'Anotações', texto: 'O que a equipe observou e combinou, escrito onde todos veem.' },
        { icone: 'kanban', nome: 'Etapa do funil', texto: 'Em que ponto da jornada a oportunidade está.' },
        { icone: 'usercheck', nome: 'Responsável', texto: 'Quem, entre os ' + U + ' usuários, cuida desse contato.' },
        { icone: 'history', nome: 'Histórico', texto: 'A linha do tempo completa, do primeiro "oi" à matrícula.' }
      ],
      fecho: { titulo: 'Continuidade comercial', texto: 'Se o atendente de hoje não for o de amanhã, o contato não recomeça do zero. O CRM guarda o contexto para a equipe inteira.' }
    },

    /* ================= JORNADA ================= */
    jornada: {
      eyebrow: 'Do WhatsApp ao Kanban',
      titulo: 'O caminho de uma mensagem\naté a *matrícula*.',
      lede: 'Quem atende, registra e avança cada contato é a equipe Cult Fit. O CRM organiza o caminho e mantém tudo visível.',
      passos: [
        { icone: 'message', nome: 'Cliente manda mensagem', texto: 'Uma pessoa interessada escreve para um dos ' + N + ' números da Cult Fit.', grupo: 'Chegada' },
        { icone: 'wa', nome: 'WhatsApp', texto: 'A mensagem chega pelo número conectado ao CRM.', grupo: 'Chegada' },
        { icone: 'grid', nome: 'CRM', texto: 'A conversa aparece na lista de atendimento do ambiente.', grupo: 'Chegada' },
        { icone: 'headset', nome: 'Atendente responde', texto: 'Um dos ' + U + ' usuários assume e responde pelo próprio CRM.', grupo: 'Atendimento' },
        { icone: 'contact', nome: 'Contato é registrado', texto: 'Nome, interesse, origem e responsável ficam salvos no cadastro.', grupo: 'Atendimento' },
        { icone: 'kanban', nome: 'Oportunidade entra no Kanban', texto: 'O contato vira um card na primeira etapa do funil.', grupo: 'Funil' },
        { icone: 'users', nome: 'Equipe acompanha', texto: 'Todos veem em que ponto a oportunidade está e quem cuida dela.', grupo: 'Funil' },
        { icone: 'move', nome: 'Contato avança pelo funil', texto: 'A equipe move o card conforme a conversa evolui.', grupo: 'Funil' },
        { icone: 'check', nome: 'Conversão', texto: 'A oportunidade chega à etapa final: matrícula.', grupo: 'Resultado', final: true }
      ],
      nota: 'Não existe nenhuma etapa automática de decisão nesse caminho. Cada passo é dado pela equipe, com o CRM registrando e organizando.'
    },

    /* ================= ANTES X COM CRM ================= */
    transformacao: {
      eyebrow: 'Evolução do processo',
      titulo: 'Da conversa solta\nà *operação acompanhada*.',
      lede: 'O mesmo time, os mesmos números, a mesma demanda. O que muda é o ambiente em que tudo acontece.',
      antes: {
        rotulo: 'Hoje',
        itens: [
          'Atendimentos separados por aparelho',
          'Conversas difíceis de acompanhar',
          'Informações espalhadas',
          'Pouca visualização do funil',
          'Dificuldade para acompanhar cada oportunidade'
        ]
      },
      depois: {
        rotulo: 'Com o CRM',
        itens: [
          'Atendimento centralizado',
          'Histórico organizado',
          'Funil visual',
          'Responsáveis definidos',
          'WhatsApp integrado',
          'Gestão das oportunidades',
          'Visão da operação'
        ]
      }
    },

    /* ================= RECURSOS DO PLANO COMPLETA ================= */
    recursos: {
      eyebrow: 'Recursos do plano Completa',
      titulo: 'Dois recursos a mais\npara a *comunicação da Cult Fit*.',
      lede: 'O plano Completa adiciona à mesma base do CRM um chatbot para fluxos automáticos de atendimento e a função de disparos. Ambos ficam disponíveis apenas nessa opção.',
      chatbot: {
        nome: 'Chatbot para fluxos automáticos de atendimento',
        selo: 'Sem inteligência artificial',
        texto: 'O chatbot segue um fluxo de opções definido pela Cult Fit: apresenta um menu, entende a escolha do contato pelo botão selecionado e direciona a conversa para a equipe. Não interpreta texto livre nem responde por conta própria.',
        fluxo: {
          abertura: 'Olá! Aqui é a Cult Fit. Como podemos ajudar?',
          opcoes: ['Conhecer planos', 'Falar com atendimento', 'Informações', 'Outros assuntos'],
          escolha: 'Conhecer planos',
          resposta: 'Ótimo! Vou direcionar você para o time que cuida dos planos. Um momento.',
          destino: 'Direcionamento → Atendente'
        },
        pontos: ['Menu de opções definido pela Cult Fit', 'Direcionamento para a equipe', 'Funciona nos ' + N + ' números conectados']
      },
      disparos: {
        nome: 'Disparos',
        selo: 'Comunicação ativa',
        texto: 'Envio de mensagens a partir do CRM para os contatos cadastrados. Um recurso para a Cult Fit falar com sua base de forma ativa, a partir do mesmo ambiente em que atende.',
        exemplo: {
          titulo: 'Novo disparo',
          campos: [
            { k: 'Destinatários', v: 'Contatos selecionados no CRM' },
            { k: 'Número de envio', v: 'Número 01' },
            { k: 'Mensagem', v: 'Oi! Aqui é a Cult Fit. Esta semana temos horários novos de manhã. Quer conhecer?' }
          ]
        },
        pontos: ['Envio a partir do CRM', 'Seleção de contatos cadastrados', 'Registro no histórico de cada contato']
      }
    },

    /* ================= INVESTIMENTO ================= */
    investimento: {
      eyebrow: 'Investimento',
      titulo: 'Escolha a estrutura ideal\npara a *operação*.',
      lede: 'Duas opções com a mesma base: CRM, ' + U + ' usuários, ' + N + ' números, WhatsApp integrado, funil Kanban, gestão de contatos, histórico e atendimento pelo CRM. A Completa adiciona disparos e chatbot.',
      base: [
        'CRM como ambiente central',
        U + ' usuários',
        N + ' números de WhatsApp',
        'WhatsApp integrado ao CRM',
        'Funil Kanban',
        'Gestão de contatos',
        'Histórico centralizado',
        'Atendimento pelo CRM'
      ],
      planos: [
        {
          id: 'completa',
          kicker: 'Opção 01',
          nome: 'Completa',
          preco: cfg.COMPLETE_PRICE,
          flag: 'Mais completa',
          lead: true,
          resumo: 'Toda a base do CRM, mais disparos e chatbot para fluxos automáticos de atendimento.',
          extras: [
            { nome: 'Disparos', ok: true },
            { nome: 'Chatbot sem inteligência artificial', ok: true }
          ],
          cta: 'Quero a Completa',
          msg: 'mensagemCompleta'
        },
        {
          id: 'essencial',
          kicker: 'Opção 02',
          nome: 'Essencial',
          preco: cfg.ESSENTIAL_PRICE,
          lead: false,
          resumo: 'A base do CRM para centralizar o atendimento e trabalhar o funil com a equipe.',
          extras: [
            { nome: 'Disparos', ok: false },
            { nome: 'Chatbot', ok: false }
          ],
          cta: 'Quero a Essencial',
          msg: 'mensagemEssencial'
        }
      ],
      comparativo: {
        titulo: 'Comparativo',
        linhas: [
          { item: 'CRM', e: true, c: true },
          { item: U + ' usuários', e: true, c: true },
          { item: N + ' números de WhatsApp', e: true, c: true },
          { item: 'WhatsApp integrado', e: true, c: true },
          { item: 'Funil Kanban', e: true, c: true },
          { item: 'Histórico', e: true, c: true },
          { item: 'Gestão de contatos', e: true, c: true },
          { item: 'Atendimento pelo CRM', e: true, c: true },
          { item: 'Disparos', e: false, c: true },
          { item: 'Chatbot sem IA', e: false, c: true }
        ]
      },
      implementacao: {
        eyebrow: 'Implementação',
        valor: cfg.IMPLEMENTATION_PRICE,
        parcelas: cfg.IMPLEMENTATION_INSTALLMENTS,
        titulo: 'Valor único de implementação',
        texto: 'R$ ' + cfg.IMPLEMENTATION_PRICE.toLocaleString('pt-BR') + ' parcelados em ' + cfg.IMPLEMENTATION_INSTALLMENTS + 'x junto às primeiras mensalidades.',
        detalhe: 'Não é um valor mensal. É a implantação do ambiente, cobrada uma única vez e dividida nas ' + cfg.IMPLEMENTATION_INSTALLMENTS + ' primeiras faturas.',
        linha: [
          { mes: 'Mês 1', a: 'Mensalidade', b: 'Parcela 1/3 da implementação' },
          { mes: 'Mês 2', a: 'Mensalidade', b: 'Parcela 2/3 da implementação' },
          { mes: 'Mês 3', a: 'Mensalidade', b: 'Parcela 3/3 da implementação' },
          { mes: 'Mês 4 em diante', a: 'Mensalidade', b: null }
        ]
      },
      adicionais: {
        titulo: 'Adicionais',
        texto: 'A estrutura contratada é de ' + U + ' usuários e ' + N + ' números. Se a operação crescer, é possível ampliar com os valores abaixo.',
        itens: [
          { nome: 'Usuário adicional', valor: cfg.EXTRA_USER_PRICE, unidade: '/mês', desc: 'por acesso além dos ' + U + ' incluídos' },
          { nome: 'Número de WhatsApp adicional', valor: cfg.EXTRA_NUMBER_PRICE, unidade: '/mês', desc: 'por número além dos ' + N + ' incluídos, conectado via API' }
        ]
      },
      nota: 'Os valores acima cobrem tudo o que está descrito nesta proposta. Os adicionais só se aplicam se a Cult Fit optar por ampliar a estrutura de usuários ou números.'
    },

    /* ================= IMPLANTAÇÃO ================= */
    implantacao: {
      eyebrow: 'Implantação',
      titulo: 'Sete etapas até a\n*operação rodar*.',
      lede: 'A implantação monta o ambiente, conecta os números, organiza o funil e valida tudo com a equipe antes da entrada em operação.',
      etapas: [
        { nome: 'Configuração do ambiente', texto: 'Criação do CRM da Cult Fit com identidade e estrutura inicial.' },
        { nome: 'Configuração dos usuários', texto: 'Criação dos ' + U + ' acessos individuais da equipe.' },
        { nome: 'Conexão dos ' + N + ' números', texto: 'Os números de WhatsApp da Cult Fit passam a operar dentro do CRM.' },
        { nome: 'Configuração do funil', texto: 'Definição das etapas conforme o processo comercial da Cult Fit.' },
        { nome: 'Organização inicial do CRM', texto: 'Campos do contato, responsáveis e organização das conversas.' },
        { nome: 'Configuração dos recursos do plano contratado', texto: 'Na Completa, montagem do fluxo do chatbot e habilitação dos disparos.' },
        { nome: 'Validação e entrada em operação', texto: 'Conferência com a equipe e início do atendimento pelo CRM.' }
      ]
    },

    /* ================= FAQ ================= */
    faq: {
      eyebrow: 'Dúvidas',
      titulo: 'Perguntas *diretas*,\nrespostas diretas.',
      itens: [
        { q: 'O CRM possui Inteligência Artificial?', a: 'Não. Esta proposta não contempla Inteligência Artificial. Todo o atendimento é realizado pela equipe da Cult Fit dentro do CRM.' },
        { q: 'Quantos usuários estão incluídos?', a: U + ' usuários, com acessos individuais, nas duas opções de plano.' },
        { q: 'Quantos números de WhatsApp serão conectados?', a: N + ' números, conectados ao ambiente do CRM, nas duas opções de plano.' },
        { q: 'O WhatsApp utiliza a API oficial?', a: 'A conexão prevista nesta proposta será realizada via API, não pela API oficial do WhatsApp/Meta.' },
        { q: 'O plano de R$ ' + cfg.COMPLETE_PRICE.toLocaleString('pt-BR') + ' possui chatbot?', a: 'Sim. Possui chatbot tradicional para fluxos automáticos de atendimento, com menu de opções e direcionamento para a equipe, sem Inteligência Artificial.' },
        { q: 'Qual plano possui disparos?', a: 'O plano Completa, de R$ ' + cfg.COMPLETE_PRICE.toLocaleString('pt-BR') + '/mês. O plano Essencial não inclui disparos nem chatbot.' },
        { q: 'Como funciona a implementação?', a: 'Existe um investimento único de R$ ' + cfg.IMPLEMENTATION_PRICE.toLocaleString('pt-BR') + ', parcelado em ' + cfg.IMPLEMENTATION_INSTALLMENTS + 'x junto às primeiras mensalidades. Não é um valor mensal.' },
        { q: 'E se a Cult Fit precisar de mais usuários ou números?', a: 'É possível ampliar: usuário adicional por R$ ' + cfg.EXTRA_USER_PRICE.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + '/mês e número de WhatsApp adicional por R$ ' + cfg.EXTRA_NUMBER_PRICE.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + '/mês.' },
        { q: 'As etapas do funil já vêm definidas?', a: 'As etapas mostradas nesta proposta são ilustrativas. O funil é configurado conforme o processo comercial da Cult Fit durante a implantação.' }
      ]
    },

    /* ================= FECHAMENTO ================= */
    fechamento: {
      eyebrow: 'Resumo da proposta',
      titulo: 'Atendimento centralizado,\norganizado e *acompanhado*.',
      texto: 'O atendimento da Cult Fit passa a acontecer dentro de um CRM, com WhatsApp integrado e um funil visual para a equipe trabalhar as oportunidades.',
      blocos: [
        { n: N, l: 'números de WhatsApp' },
        { n: U, l: 'usuários' },
        { n: 'CRM', l: 'ambiente central' },
        { n: 'Kanban', l: 'funil visual' }
      ],
      opcoes: [
        { nome: 'Essencial', preco: cfg.ESSENTIAL_PRICE, desc: 'CRM sem disparos e sem chatbot' },
        { nome: 'Completa', preco: cfg.COMPLETE_PRICE, desc: 'CRM + disparos + chatbot sem IA', lead: true }
      ],
      implementacao: 'Implementação: R$ ' + cfg.IMPLEMENTATION_PRICE.toLocaleString('pt-BR') + ' parcelados em ' + cfg.IMPLEMENTATION_INSTALLMENTS + 'x nas primeiras mensalidades.',
      cta1: { label: 'Falar com a Linkeed' },
      cta2: { label: 'Rever os planos', goto: 'investimento' }
    }
  };
})(PROPOSTA.config);
