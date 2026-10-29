# PRD — Reorganizar o card do evento

> Tipo: PRD de feature · Data: 2026-10-29
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

O card de informações na página do evento, no painel, passa a ser lido de cima para baixo nesta ordem: título e status na mesma linha, com Editar e Configurações no mesmo lugar de hoje, só com ícone; em seguida, a data, o horário e o local, cada um na sua linha e com ícone; depois, o link do evento com ícone, o endereço do link e os botões de copiar (só ícone) e visualizar página; por último, o informe de confirmação com ícone de alerta.

Os dados, as ações e as regras de quando a confirmação está aberta ou encerrada continuam os mesmos. Muda a leitura do card e a frase usada quando a confirmação está aberta.

## 2. Problema que resolve

Quem abre um evento no painel vê data e horário juntos, numa linha acima do título, com um único ícone de calendário. O link aparece com o rótulo “Link do evento:” e o botão “Copiar Link” por extenso. Editar e Configurações também repetem no botão um nome que o ícone já indica. O informe de confirmação é só texto, sem um sinal visual de aviso.

A reorganização coloca o nome do evento e o status na primeira leitura, separa quando e onde o evento acontece, e deixa as ações reconhecíveis pelo ícone, sem tirar o que o organizador já consegue fazer nesse card.

## 3. Público-alvo

O **organizador** autenticado, na página de um evento ao qual ele tem acesso.

O convidado não vê este card. Quem só olha a lista Meus Eventos também não é o público deste recorte.

## 4. Objetivo do recorte atual

O card de informações do evento fica assim:

1. Uma linha com o título e a tag de status. No mesmo lugar de hoje, os botões Editar e Configurações, somente com ícone.
2. Abaixo do título, uma linha com ícone de calendário e a data.
3. Uma linha com ícone de relógio e o horário.
4. Uma linha com o local, como hoje: ícone de pin, nome do espaço quando existe, e endereço.
5. A faixa do link, no mesmo lugar de hoje: ícone de link, o endereço do link, o botão de copiar somente com ícone, e o botão Visualizar página como está.
6. O informe de confirmação, com ícone de triângulo de alerta em qualquer estado. Quando está aberta, a frase passa a ser “A confirmação está aberta até {data}.”

## 5. Funcionalidades

**Essenciais:**

- Colocar título e status na mesma linha, como primeira leitura do card.
- Separar data e horário em duas linhas, abaixo do título. A data leva ícone de calendário. O horário leva ícone de relógio. O texto de cada um permanece o de hoje.
- Manter o local abaixo do horário, com ícone de pin, nome do espaço e endereço. Sem nome do espaço, a linha fica só com o ícone de pin e o endereço.
- Manter Editar e Configurações no mesmo lugar. Some o texto do botão; fica o ícone.
- Na faixa do link, trocar o rótulo “Link do evento:” por um ícone de link, manter o endereço do link e deixar o botão de copiar somente com ícone.
- Manter Visualizar página com ícone e texto, no mesmo lugar.
- Exibir o informe de confirmação com ícone de triângulo de alerta em todos os estados.
- Quando a confirmação está aberta, trocar a frase para “A confirmação está aberta até {data}.”

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mudar o card da lista Meus Eventos.
- Mudar a página pública do convidado.
- Mudar o que o organizador edita, configura, copia ou abre ao visualizar a página. Os diálogos e o destino dessas ações continuam os mesmos.
- Mudar o texto, as cores ou o significado da tag Aberta / Encerrada.
- Mudar o texto da data do evento, o texto do horário, o texto do local ou o formato em que a data aparece dentro do informe.
- Mudar as outras frases do informe: encerrada na hora, ainda não abriu, prazo encerrado e dia do evento já chegou.
- Mudar a regra que decide se a confirmação está aberta ou encerrada, nem o último dia em que ela ainda aceita nomes.
- Mudar o aviso que aparece ao encerrar ou reativar a confirmação fora deste card.
- Mover o botão Visualizar página, tirar o texto dele ou trocar o ícone dele.
- Incluir o link na pilha de data, horário e local. A faixa do link continua abaixo do local e acima do informe.
- Alterar o caminho “Meus Eventos / título” que fica acima do card, a lista de confirmados ou os controles de encerrar e reativar.

## 7. Regras de negócio

- Regra 1: A primeira linha de conteúdo do card é o título do evento e a tag de status, na mesma linha. A tag continua **Aberta** em verde quando a confirmação está aberta, e **Encerrada** em cinza quando não está. Texto e cores não mudam.
- Regra 2: Editar e Configurações permanecem no grupo de ações que já ocupa o topo do card: à direita do bloco de informações em tela larga, e no mesmo grupo em tela estreita. Não passam para a faixa do link nem para baixo do informe. O texto some. Editar fica só com o ícone de lápis. Configurações fica só com o ícone de engrenagem. O clique continua abrindo o mesmo diálogo de hoje.
- Regra 3: O texto some da tela, mas cada botão só com ícone continua nomeado com o rótulo que tinha: **Editar**, **Configurações** e **Copiar Link**. Quem usa teclado ou leitor de tela ainda ouve esse nome. **Suposição:** ao passar o mouse ou focar o botão, esse mesmo nome aparece junto dele.
- Regra 4: Abaixo do título, a data fica sozinha numa linha, com ícone de calendário. O horário fica sozinho na linha seguinte, com ícone de relógio. Os dois deixam de compartilhar a linha e deixam de ser separados por ponto médio. O ícone não substitui o texto.
- Regra 5: O texto da data e o texto do horário permanecem os que o card já mostra hoje. A data continua por extenso, com dia da semana e a primeira letra maiúscula. O horário continua em horas e minutos.
- Regra 6: A linha seguinte é o local, no formato já usado nesta página do evento, não no formato da lista Meus Eventos. Com nome do espaço, o bloco mostra o ícone de pin, o nome e, abaixo do nome, o endereço. Sem nome do espaço, ou só com espaços em branco no nome, o bloco mostra o ícone de pin e o endereço. Nome e endereço não passam a dividir a mesma linha.
- Regra 7: A faixa do link continua abaixo do local e acima do informe. O rótulo “Link do evento:” sai. No lugar dele entra um ícone de link, seguido do mesmo endereço de link que a faixa já mostra. O botão de copiar fica nessa faixa, somente com o ícone de copiar, e continua copiando o link completo. O sucesso e a falha da cópia continuam avisando como hoje.
- Regra 8: Visualizar página permanece ao lado de copiar, com o ícone e o texto atuais, e continua abrindo a página pública daquele evento.
- Regra 9: O informe fica abaixo da faixa do link. Em todo estado ele começa com o ícone de triângulo de alerta e, em seguida, a frase. O ícone é o mesmo quando a confirmação está aberta, encerrada na hora, ainda não abriu, com o prazo encerrado ou com o dia do evento já chegado.
- Regra 10: Quando a confirmação está aberta, a frase passa a ser “A confirmação está aberta até {data}.” **Suposição:** {data} continua no formato já usado nesse informe hoje (dia da semana, dia, mês e ano). O exemplo “29 de Outubro de 2026” ilustra a frase, não um formato novo de data.
- Regra 11: Nos outros estados, a frase permanece a de hoje: “Você encerrou a confirmação para o evento. Poderá reativar até {data}.”; “A confirmação ainda não abriu. Ela abre em {data}.”; “O prazo para confirmação do evento está encerrado.”; “A confirmação está encerrada. O prazo é o dia do evento e ele já chegou.” O que muda nesses estados é só a presença do ícone de alerta.
- Regra 12: O card mostra só o evento aberto nessa página. Não mistura título, data, horário, local, link ou informe de outro evento.

## 8. Fluxos principais

### Fluxo 1 — Ler o card

1. O organizador abre um evento no painel.
2. No card, vê o título e a tag Aberta ou Encerrada na primeira linha, e os botões Editar e Configurações só com ícone, no lugar de hoje.
3. Abaixo, lê a data, o horário e o local, cada um na sua linha, com o ícone correspondente.
4. Na faixa seguinte, vê o ícone de link, o endereço do link, o botão de copiar só com ícone e o botão Visualizar página como hoje.
5. Por último, vê o ícone de alerta e a frase do estado atual da confirmação.

### Fluxo 2 — Usar as ações do card

1. O organizador aciona Editar, Configurações, copiar ou Visualizar página.
2. O sistema faz o que já faz hoje: abre o diálogo de edição, abre o diálogo de configurações, copia o link completo ou abre a página pública.
3. O card não ganha ação nova e não perde nenhuma dessas quatro.

## 9. Critérios de aceite

- O usuário consegue ler, nesta ordem: título com status, data, horário, local, link e informe de confirmação.
- O sistema deve mostrar ícone de calendário na data, ícone de relógio no horário, ícone de pin no local, ícone de link na faixa do link e ícone de triângulo de alerta no informe.
- O sistema deve manter Editar e Configurações no lugar atual, somente com ícone, abrindo os mesmos diálogos.
- O sistema deve manter o botão de copiar na faixa do link, somente com ícone, copiando o link completo.
- O sistema deve manter Visualizar página com ícone e texto, no mesmo lugar, abrindo a página pública.
- O sistema não deve juntar data e horário na mesma linha, nem manter o rótulo “Link do evento:”.
- O sistema não deve mudar o card de Meus Eventos nem a página pública.
- Quando a confirmação está aberta, o sistema deve exibir “A confirmação está aberta até {data}.” com o ícone de alerta.
- Quando a confirmação está em outro estado, o sistema deve manter a frase atual desse estado e exibir o mesmo ícone de alerta.
- Quando o evento não tem nome do espaço, o sistema deve exibir ícone de pin e endereço.

## 10. Stack

A stack já usada no Confirm Event: Next.js, React, TypeScript, Tailwind CSS e os componentes de interface já presentes no painel. Os ícones saem do conjunto já usado nas telas do evento. Autenticação, dados do evento e o texto do informe continuam vindo de onde a página do evento já os obtém.

Nenhuma biblioteca nova.

## 11. Justificativa da stack

O card, o local, a tag de status, o link e as frases de confirmação já existem. Este recorte só reorganiza o que essa página mostra e ajusta a frase do estado aberto. Reutilizar a stack e os ícones já adotados evita um conjunto visual diferente do resto do painel.

## 12. Fases de construção

### Fase 1 — Card de informações do evento

Objetivo: o organizador passa a ler o card na ordem nova, com ícones, sem perder as ações nem os dados.

Specs:

- Spec 01 — Ordem do título, da data, do horário e do local
- Spec 02 — Faixa do link e informe de confirmação

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Ordem do título, da data, do horário e do local

- **Fase:** Fase 1 — Card de informações do evento
- **Objetivo (o quê):** Reordenar o bloco principal do card para título e status na primeira linha, data, horário e local em linhas separadas abaixo, e deixar Editar e Configurações somente com ícone no lugar em que já estão.
- **Intenção (por quê):** O nome do evento e se a confirmação está aberta são a primeira leitura. Data, horário e local passam a ser encontrados sempre na mesma posição, cada um com seu ícone, sem uma linha mista acima do título.
- **Contexto:** Na página do evento no painel já existe um card com título, tag Aberta ou Encerrada, data, horário, local, Editar e Configurações. Hoje a data e o horário dividem uma linha acima do título, com um ícone de calendário só nessa linha. O local já usa ícone de pin, nome do espaço e endereço neste card. A lista Meus Eventos tem outro card e outro formato de local; esta spec não mexe nela. A faixa do link e o informe de confirmação ficam para a Spec 02 e devem continuar abaixo deste bloco.
- **Atores:** Organizador autenticado, ao abrir a página de um evento seu.
- **Descrição do comportamento:** O card passa a mostrar, de cima para baixo, o título com a tag de status e, abaixo, três linhas: data, horário e local. Editar e Configurações permanecem no grupo de ações do topo do card. Em tela larga, esse grupo fica à direita do bloco, alinhado ao início dele. Em tela estreita, o grupo continua onde já fica hoje em relação ao bloco, sem ir para a faixa do link. O botão Editar mostra só o ícone de lápis. O botão Configurações mostra só o ícone de engrenagem. O texto de cada um deixa de aparecer no botão, mas o controle continua nomeado Editar ou Configurações. Acionar Editar abre o mesmo diálogo de edição. Acionar Configurações abre o mesmo diálogo de configurações.
- **Entradas e saídas:** Entram o título, a data, o horário, o nome do espaço, o endereço e o estado da confirmação (aberta ou não), já carregados para essa página. Saem o bloco reordenado e os dois botões só com ícone. Não há gravação nem dado novo.
- **Dados/entidades envolvidos (conceitual):** Evento: título, data, horário, nome do espaço, endereço, e se a confirmação está aberta ou encerrada. O nome do espaço pode estar vazio.
- **Estados e transições:** A tag mostra Aberta ou Encerrada conforme o estado que a página já calcula. Esta spec não cria transição. Ela só posiciona a tag ao lado do título. Os botões não ganham estado novo: continuam abrindo o diálogo correspondente.
- **Regras de negócio:** Regras 1, 2, 3, 4, 5, 6 e 12. O nome acessível de Editar e de Configurações é obrigatório. A aparição desse nome ao passar o mouse ou focar é suposição, registrada na regra 3.
- **Validações:** Não se aplica a entrada nova. O card só exibe dados já aceitos do evento. Nome do espaço vazio ou só com espaços é tratado como ausente, como hoje.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre o evento.
  2. Lê o título e a tag na primeira linha.
  3. Lê a data, o horário e o local, cada um na sua linha.
  4. Se precisar corrigir a ocasião, aciona o ícone de lápis e cai no diálogo de edição já existente.
  5. Se precisar ajustar as configurações do evento, aciona o ícone de engrenagem e cai no diálogo de configurações já existente.
- **Casos de borda e erros:**
  - Título longo: o título quebra a linha e a tag continua associada a ele, sem cobrir os botões nem ser coberta por eles.
  - Nome do espaço ausente ou só com espaços: a linha do local mostra o ícone de pin e o endereço, sem uma linha em branco no lugar do nome.
  - Nome do espaço presente: o pin aparece uma vez; o nome fica acima do endereço, não na mesma linha.
  - Tela estreita: Editar e Configurações não migram para a faixa do link. Permanecem no grupo de ações que já existe no topo do card.
  - Falha ao abrir o diálogo: não se aplica um erro novo. O diálogo continua responsável pelo próprio conteúdo, como hoje.
- **Impacto no existente:** Muda a ordem e os ícones do bloco principal deste card, e o rótulo visível de Editar e Configurações. Não muda os diálogos, a tag, o texto de data e horário, o formato do local desta página, o card de Meus Eventos nem a página pública.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com confirmação aberta, quando o organizador abre a página, então a primeira linha do card mostra o título e a tag Aberta, e a data não aparece acima do título.
  - Dado um evento com confirmação encerrada, quando o organizador abre a página, então a tag Encerrada fica na mesma linha do título, com o mesmo texto e o mesmo tom de hoje.
  - Dado um evento com data e horário, quando o card é exibido, então a data aparece sozinha com ícone de calendário, o horário aparece sozinho na linha de baixo com ícone de relógio, e não há ponto médio entre os dois.
  - Dado um evento com nome do espaço, quando o card é exibido, então abaixo do horário aparecem o ícone de pin, o nome do espaço e o endereço, com o nome e o endereço como neste card hoje.
  - Dado um evento sem nome do espaço, quando o card é exibido, então o local mostra o ícone de pin e o endereço, sem linha vazia de nome.
  - Dado o card exibido, quando o organizador olha Editar e Configurações, então vê só o ícone de cada um, no mesmo grupo de ações de hoje, e ao acioná-los abre o mesmo diálogo de hoje.
  - Dado um botão só com ícone, quando o controle é anunciado para leitor de tela, então o nome anunciado é Editar ou Configurações, conforme o botão.
- **Definição de pronto:** Na página do evento, o bloco principal segue a ordem título e status, data, horário, local. Editar e Configurações continuam no lugar de hoje, só com ícone, e abrem os diálogos de hoje. Um evento com nome do espaço e outro sem nome mostram o local como na regra 6. A lista Meus Eventos permanece como está.
- **Dependências:** Nenhuma. A faixa do link e o informe podem continuar temporariamente como estão até a Spec 02, desde que sigam abaixo deste bloco.
- **Fora do escopo desta spec:** Faixa do link, botão de copiar, Visualizar página, ícone e frases do informe, card de Meus Eventos, página pública, conteúdo dos diálogos e controles de encerrar ou reativar.

### Spec 02 — Faixa do link e informe de confirmação

- **Fase:** Fase 1 — Card de informações do evento
- **Objetivo (o quê):** Mostrar o link com ícone e o botão de copiar somente com ícone, manter Visualizar página como está, e colocar o ícone de alerta em todas as frases do informe, trocando só a frase do estado aberto.
- **Intenção (por quê):** O endereço do evento e o aviso de até quando a confirmação vale precisam ser reconhecidos na hora, sem um rótulo extra no link e sem uma frase de “aberta” mais longa do que o necessário. Os outros avisos continuam dizendo o que já dizem.
- **Contexto:** Abaixo do bloco da Spec 01, o card já tem uma faixa com o rótulo “Link do evento:”, o endereço do link, o botão Copiar Link e o botão Visualizar página. Abaixo dela, o card já mostra uma frase conforme o estado da confirmação. Esta spec reaproveita essa faixa e essa frase. Não cria outro link nem outra regra de prazo.
- **Atores:** Organizador autenticado, na página do evento.
- **Descrição do comportamento:** A faixa do link permanece abaixo do local e acima do informe. O rótulo “Link do evento:” é substituído por um ícone de link. O endereço exibido continua o mesmo de hoje, inclusive quando a origem da página ainda não está disponível e a faixa mostra o caminho do evento. O botão de copiar permanece nessa faixa, antes de Visualizar página, e passa a mostrar só o ícone de copiar. O nome do controle continua Copiar Link. Ao acionar, copia o link completo e mostra o aviso de sucesso já usado. Se a cópia falhar, mostra o aviso de falha já usado. Visualizar página permanece ao lado, com o ícone e o texto atuais, e abre a página pública em uma nova visita, como hoje. O informe permanece abaixo da faixa. Ele sempre começa com o ícone de triângulo de alerta, seguido da frase do estado. No estado aberto, a frase é “A confirmação está aberta até {data}.” Nos demais estados, a frase é a atual. O ícone não muda de um estado para outro e não substitui a frase.
- **Entradas e saídas:** Entram o trecho do link do evento, o endereço já montado para exibição, e o estado da confirmação com a data já usada na frase (último dia aberto, ou dia em que a confirmação abre, quando a frase atual cita uma data). Saem a faixa reapresentada e o informe com ícone. Copiar coloca o link completo na área de transferência. Não há gravação.
- **Dados/entidades envolvidos (conceitual):** Evento: trecho público do link e endereço completo do link. Confirmação: estado (aberta, encerrada na hora pelo organizador, ainda não abriu, prazo encerrado, dia do evento já chegou) e a data que a frase atual já cita, quando cita.
- **Estados e transições:** O informe reflete o estado que a página já resolve. Esta spec não abre, encerra nem reativa a confirmação. Se o estado mudar por uma ação que já existe fora deste card, a frase exibida passa a ser a do estado novo, sempre com o mesmo ícone de alerta. Só a frase do estado aberto tem redação nova.
- **Regras de negócio:** Regras 3, 7, 8, 9, 10, 11 e 12. A suposição da regra 3 vale também para Copiar Link. A suposição da regra 10 vale para a data dentro da frase aberta.
- **Validações:** Não se aplica a formulário novo. Copiar só é oferecido para o link daquele evento. O informe só usa um dos cinco estados já existentes; não inventa frase para um estado desconhecido.
- **Fluxo do usuário (passo a passo):**
  1. O organizador olha a faixa abaixo do local e reconhece o link pelo ícone.
  2. Se quiser o endereço, aciona o ícone de copiar e recebe o aviso de que o link foi copiado.
  3. Se quiser ver a página do convidado, aciona Visualizar página, que continua com texto e ícone.
  4. Lê o informe, identificando o aviso pelo ícone de alerta e pela frase do estado.
- **Casos de borda e erros:**
  - Endereço do link longo: continua truncado visualmente como hoje, sem esconder o botão de copiar nem Visualizar página. A cópia leva o link completo, não o texto cortado.
  - Cópia indisponível ou recusada: o sistema mostra o aviso de falha já usado e não indica sucesso.
  - Origem da página ainda não conhecida: a faixa mostra o mesmo fallback de hoje e o ícone de link continua visível.
  - Confirmação aberta: a frase é exatamente “A confirmação está aberta até {data}.”, com {data} no formato já usado no informe. A frase antiga “A confirmação para o evento está aberta até {data}.” não aparece.
  - Confirmação encerrada na hora, ainda não aberta, prazo encerrado ou dia do evento já chegado: a frase permanece a de hoje e ganha o mesmo ícone de alerta.
  - Aviso ao encerrar ou reativar a confirmação, fora do card: permanece o texto atual. Esta spec não reescreve esse aviso, mesmo que a frase do card mude.
- **Impacto no existente:** Muda a apresentação da faixa de link deste card, o rótulo visível de Copiar Link e a frase do estado aberto no informe deste card. Não muda o link em si, a página pública, a lista Meus Eventos, as outras quatro frases nem a conta do prazo.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o card do evento, quando a faixa do link é exibida, então ela mostra ícone de link, o endereço do link, o botão de copiar só com ícone e, ao lado, Visualizar página com ícone e texto, e não mostra “Link do evento:”.
  - Dado a faixa do link, quando o organizador aciona copiar e a cópia funciona, então o link completo vai para a área de transferência e aparece o aviso de sucesso já usado.
  - Dado a faixa do link, quando a cópia falha, então aparece o aviso de falha já usado e o sistema não confirma a cópia.
  - Dado a faixa do link, quando o organizador aciona Visualizar página, então a página pública daquele evento abre como hoje.
  - Dado um evento com confirmação aberta até uma data, quando o informe é exibido, então ele mostra o ícone de triângulo de alerta e o texto “A confirmação está aberta até {data}.”
  - Dado um evento cuja confirmação foi encerrada na hora, ainda não abriu, teve o prazo encerrado ou já chegou no dia do evento, quando o informe é exibido, então a frase continua a de hoje para esse estado e o ícone de triângulo de alerta aparece antes dela.
  - Dado o organizador encerra ou reativa a confirmação pelos controles já existentes, quando o aviso dessa ação aparece, então o texto desse aviso permanece o de hoje.
- **Definição de pronto:** A faixa do link e o informe seguem as regras 7 a 11. Copiar e Visualizar página continuam funcionando. Os cinco estados do informe foram conferidos: só o estado aberto mudou de frase, e todos mostram o ícone de alerta. O aviso das ações de encerrar e reativar não mudou.
- **Dependências:** Spec 01 — o bloco de título, data, horário e local precisa estar acima da faixa do link, para a ordem do card ficar a definida neste PRD. A redação da frase aberta pode ser feita mesmo antes da Spec 01, mas a posição visual depende dela.
- **Fora do escopo desta spec:** Ordem do título, data, horário e local; ícones e rótulos de Editar e Configurações; conteúdo dos diálogos; card de Meus Eventos; página pública; mudança das outras frases; mudança da regra de prazo; mudança do aviso de encerrar e reativar.

## 14. Ordem recomendada de implementação

1. Spec 01 — Ordem do título, da data, do horário e do local
2. Spec 02 — Faixa do link e informe de confirmação

A Spec 01 fixa a leitura de cima do card. A Spec 02 completa a faixa que já fica abaixo desse bloco e o informe. Fazer as duas, nesta ordem, evita deixar data e horário ainda misturados acima do título, ou o link e o aviso fora da ordem combinada.
