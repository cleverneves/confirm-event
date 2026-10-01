# PRD — Janela de confirmação do evento

> Tipo: PRD de feature · Data: 2026-10-01
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

O organizador passa a controlar **até quando** o link público de um evento aceita novos nomes.

A confirmação pode ficar aberta até a véspera do dia do evento ou, se o organizador quiser, dentro de uma **janela opcional** com data de início e data de fim. Fora desse período, ou quando o organizador encerra na hora, a página do evento continua visível, mas não aceita nova confirmação. Os nomes já confirmados permanecem na lista do painel.

Reativar só volta a aceitar nomes se o prazo ainda não tiver chegado.

## 2. Problema que resolve

Hoje o link aceita confirmação enquanto o evento existir, inclusive no próprio dia e depois que a data já passou. O organizador não tem como abrir a confirmação só num intervalo, nem encerrar antes do dia do evento sem apagar o evento ou o link.

Quem confirma fora da hora em que o organizador ainda quer nomes entra na lista do mesmo jeito. O organizador precisa controlar isso à mão, fora do sistema.

## 3. Público-alvo

- **Organizador** — a mesma conta que já entra no painel, cria eventos e acompanha a lista de nomes.
- **Convidado** — quem abre o link público, sem login. Passa a ver quando não dá mais para confirmar.

## 4. Objetivo do recorte atual

Permitir que cada evento tenha um prazo de confirmação: automático na data do evento, ou antecipado por uma janela opcional, com encerramento manual e reativação enquanto o prazo ainda valer. A página pública deixa de gravar nomes quando a confirmação está encerrada e continua mostrando os dados do evento.

## 5. Funcionalidades

**Essenciais:**

- Janela opcional de início e fim, na criação e na edição do evento.
- Sem janela, a confirmação encerra à 00:00 do dia do evento (fuso já usado pelo produto, São Paulo).
- Com janela, a confirmação só fica aberta do dia de início (inclusive) até o dia anterior ao dia de fim.
- O organizador encerra a confirmação na hora, antes do prazo.
- O organizador pede para reativar. Se o prazo ainda permitir, a confirmação volta a aceitar nomes. Se o prazo já passou, ou se o início ainda não chegou, ela continua encerrada e o painel explica o motivo.
- A página pública mantém título, detalhes, data, horário e local, e não aceita novo nome enquanto estiver encerrada.
- Nomes já confirmados continuam na lista. O organizador segue podendo editar ou remover cada nome.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Reabrir a confirmação no dia do evento ou em qualquer dia posterior.
- Janela cujo fim seja o dia do evento ou um dia depois dele.
- Encerrar ou abrir por horário. O horário do evento não entra nessa conta. A virada é sempre à 00:00 da data.
- Avisar convidados por e-mail, WhatsApp ou outro canal quando a confirmação abre ou encerra.
- O convidado cancelar ou editar a própria confirmação.
- Textos diferentes para o convidado conforme o motivo do encerramento (manual, prazo ou ainda não abriu).
- Apagar confirmações já feitas quando a confirmação encerra.
- Mudar a regra já existente de que uma data nova do evento não pode ficar no passado.

## 7. Regras de negócio

- Regra 1: A janela é opcional. O organizador informa **as duas datas** ou **nenhuma**. Não existe janela só com início ou só com fim.
- Regra 2: As datas são dias de calendário no fuso já usado pelo produto (São Paulo). “Hoje” é a data civil nesse fuso. À 00:00, o dia já vale por inteiro.
- Regra 3: **Sem janela** e sem encerramento manual, a confirmação fica aberta enquanto hoje é **anterior** ao dia do evento. À 00:00 do dia do evento, encerra. O último dia que ainda aceita nome é a véspera.
- Regra 4: **Com janela** e sem encerramento manual, a confirmação fica aberta quando hoje é o dia de início ou um dia posterior, e ainda é **anterior** ao dia de fim. À 00:00 do dia de início, pode abrir. À 00:00 do dia de fim, encerra. O dia de fim **não** aceita nome.
- Regra 5: A data inicial da janela tem de ser **anterior** à data final da janela. A data inicial tem de ser **anterior** à data do evento. A data final tem de ser **anterior** ao dia do evento.
- Regra 6: Por causa da regra 5 e da regra 4, a janela sempre encerra **pelo menos um dia antes** do fechamento padrão. Exemplo confirmado: evento no sábado, dia 10. Sem janela, aceita nomes até sexta, dia 9, e fecha no sábado à 00:00. A data final mais tarde possível é sexta, dia 9; essa janela fecha na sexta à 00:00, então o último dia que ainda aceita nome é a quinta, dia 8. A data inicial tem de ser anterior a essa sexta.
- Regra 7: No dia do evento, e em qualquer dia seguinte, a confirmação está encerrada. Não há janela válida que cubra esse dia ou um dia depois.
- Regra 8: O organizador pode encerrar na hora somente quando a confirmação está aberta. **Suposição:** esse encerramento pede uma confirmação explícita antes de valer, para não fechar o link por um clique acidental.
- Regra 9: Encerrada manualmente, a confirmação permanece encerrada mesmo que o calendário ainda permitisse nomes. Os nomes já gravados continuam na lista.
- Regra 10: Reativar remove só o encerramento manual e aplica de novo as regras 3 e 4. Se o calendário disser que ainda está no período aberto, volta a aceitar nomes. Se o início ainda não chegou, ou se o prazo (dia de fim da janela, ou dia do evento quando não há janela) já chegou, continua encerrada. O painel diz o motivo.
- Regra 11: Limpar a janela (apagar as duas datas) devolve o evento à regra 3. Se houver encerramento manual, ele continua até o organizador reativar.
- Regra 12: Ajustar as datas, sem encerramento manual, reavalia na hora. Se hoje passar a cair no período aberto, a confirmação abre. Se deixar de cair, encerra.
- Regra 13: Com encerramento manual ativo, mudar a janela ou a data do evento **não** reabre. Só reativar reavalia.
- Regra 14: Se a nova data do evento deixar a janela inválida pela regra 5, o sistema não grava essa alteração até o organizador ajustar a janela ou limpá-la.
- Regra 15: Evento cuja data é hoje nasce, ou fica, encerrado para novos nomes. Criar o evento para o próprio dia não abre confirmação. Mover a data do evento para um dia futuro pode reabrir, se não houver encerramento manual e se a janela (quando existir) incluir hoje.
- Regra 16: Com a confirmação encerrada, a página pública mostra os dados do evento e não grava nome novo, seja pelo botão, seja por um envio direto. **Suposição:** o convidado vê o texto “Confirmação indisponível”, igual antes do início, depois do prazo ou no encerramento manual, sem explicar o motivo.
- Regra 17: **Suposição:** na lista de eventos do painel, cada evento indica se a confirmação está aberta ou encerrada.
- Regra 18: Só o organizador autenticado define a janela, encerra na hora ou reativa. O convidado não faz isso.
- Regra 19: Encerrar a confirmação não apaga o evento, não muda o link e não remove os nomes já confirmados. Editar nome, remover uma linha, editar os outros dados do evento, copiar o link e excluir o evento continuam como já funcionam hoje.

## 8. Fluxos principais

### Fluxo 1 — Criar evento sem janela

1. O organizador cria o evento com título, data, horário e local, e deixa a janela vazia.
2. Se a data do evento é um dia futuro, a confirmação fica aberta até a véspera.
3. À 00:00 do dia do evento, a confirmação encerra sozinha.
4. Se a data do evento é hoje, a confirmação já fica encerrada.

### Fluxo 2 — Definir ou editar a janela

1. Na criação ou na edição, o organizador informa início e fim, ou limpa os dois.
2. O sistema valida a regra 5 contra a data do evento.
3. Se estiver válido, grava e recalcula se a confirmação está aberta ou encerrada.
4. Se estiver inválido, não grava e explica o que corrigir.

### Fluxo 3 — Encerrar na hora e reativar ainda no prazo

1. Com a confirmação aberta, o organizador escolhe encerrar agora e confirma a ação.
2. O link deixa de aceitar nomes. A lista de quem já confirmou permanece.
3. Antes do prazo, o organizador pede para reativar.
4. A confirmação volta a aceitar nomes até o prazo (véspera do dia de fim, ou véspera do dia do evento se não houver janela).

### Fluxo 4 — Reativar quando o calendário não permite

1. A confirmação está encerrada porque o início ainda não chegou, porque chegou o dia de fim, ou porque chegou o dia do evento.
2. O organizador pede para reativar.
3. A confirmação continua encerrada.
4. O painel informa o motivo: ainda não abriu, ou o prazo já passou.

### Fluxo 5 — Convidado abre o link com a confirmação encerrada

1. O convidado abre o link atual (ou um trecho antigo, que segue redirecionando para o atual).
2. Vê título, detalhes (se houver), data, horário e local.
3. Não consegue enviar um nome. Vê que a confirmação está indisponível.
4. Nenhum nome novo entra na lista.

## 9. Critérios de aceite

- O organizador consegue criar e editar um evento sem janela, e a confirmação permanece aberta só até a véspera do dia do evento.
- O organizador consegue gravar uma janela só quando o início é anterior ao fim, e o início e o fim são anteriores ao dia do evento.
- O sistema não grava janela pela metade.
- No exemplo do evento no dia 10, sem janela o último dia aberto é o dia 9; com fim no dia 9, o último dia aberto é o dia 8.
- Antes do dia de início, no dia de fim, no dia do evento e depois dele, o convidado vê os dados do evento e não consegue confirmar.
- O organizador consegue encerrar na hora enquanto está aberta. Nomes já confirmados continuam na lista.
- Se o organizador reativa e o período ainda está aberto, o convidado volta a conseguir confirmar.
- Se o organizador reativa e o período não está aberto, nada novo é gravado e o painel explica por quê.
- Um envio feito com a confirmação encerrada não cria confirmação.
- Evento criado para hoje não aceita nome nesse dia.

## 10. Stack

A stack já existente do Confirm Event: Next.js, TypeScript, Tailwind, painel e página pública atuais, Supabase para autenticação e dados, formulários com validação no servidor. Nenhuma biblioteca nova é exigida por esta feature. As datas seguem o fuso já usado para decidir se a data do evento é anterior a hoje (São Paulo).

## 11. Justificativa da stack

A janela, o encerramento e a reativação são regras em cima do evento e da confirmação que o produto já tem. O painel já edita o evento e a página pública já recebe o nome. Reusar isso evita um fluxo paralelo de link ou de lista.

## 12. Fases de construção

### Fase 1 — Prazo no painel

Objetivo: o organizador define o prazo e o sistema sabe, a cada momento, se aquele evento aceita nome novo.
Specs:

- Spec 01 — Janela opcional e encerramento pelo calendário
- Spec 02 — Encerrar na hora e reativar

### Fase 2 — Link público

Objetivo: o convidado deixa de confirmar quando o evento está encerrado e continua vendo o convite.
Specs:

- Spec 03 — Página pública com confirmação indisponível

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Janela opcional e encerramento pelo calendário

- **Fase:** Fase 1 — Prazo no painel
- **Objetivo (o quê):** O organizador informa, ou não, o início e o fim da confirmação ao criar ou editar um evento, e o sistema passa a tratar a confirmação como aberta ou encerrada só pelo calendário.
- **Intenção (por quê):** O link não deve aceitar nomes fora do intervalo em que o organizador ainda quer a lista. Sem uma data de corte, a confirmação segue aberta no dia do evento e depois dele.
- **Contexto:** O produto já tem eventos com título, detalhes opcionais, data, horário e local, link próprio e lista de nomes por evento. A data do evento não pode ser gravada no passado; se o dia já passou sozinho, o evento continua editável sem obrigar uma data nova. Esta spec acrescenta a janela opcional e o estado aberto/encerrado derivado das datas. O encerramento manual fica na Spec 02. A apresentação ao convidado fica na Spec 03, mas a regra de não gravar nome novo quando estiver encerrada já vale aqui.
- **Atores:** Organizador autenticado. O convidado ainda não é o foco desta spec, exceto no fato de que um nome novo não pode ser gravado com a confirmação encerrada.
- **Descrição do comportamento:** Na criação e na edição do evento, a janela começa vazia. O organizador pode deixar vazia ou preencher início e fim juntos. Vazia, a confirmação fica aberta somente enquanto a data de hoje, em São Paulo, é anterior à data do evento, e encerra à 00:00 do dia do evento. Preenchida, fica aberta da 00:00 do dia de início até antes da 00:00 do dia de fim. O dia de início aceita nome. O dia de fim não aceita. O painel do evento mostra se está aberta ou encerrada e qual é o último dia que ainda aceita nome, ou o motivo de estar encerrada. **Suposição:** a lista de eventos também mostra, em cada item, se a confirmação está aberta ou encerrada. Mudar a data do evento revalida a janela. Limpar as duas datas volta à regra da data do evento. Enquanto esta spec estiver sozinha, não existe encerramento manual: o estado vem só das datas.
- **Entradas e saídas:** Entram a data do evento (já existente) e, opcionalmente, a data inicial e a data final da janela, vindas do organizador na criação ou na edição. Saem o evento gravado com ou sem janela, o estado atual (aberta ou encerrada pelo calendário), o último dia que ainda aceita nome quando estiver aberta, e a mensagem de erro quando a janela for inválida. Se estiver encerrada, uma tentativa de gravar nome novo não cria confirmação.
- **Dados/entidades envolvidos (conceitual):** Evento já existente (título, detalhes, data, horário, local, link) passa a poder ter também início e fim da janela de confirmação, ambos presentes ou ambos ausentes. Confirmação já existente (um nome naquele evento) não muda de formato. O estado aberto ou encerrado é calculado a partir de hoje, da data do evento e da janela. Não há, nesta spec, um marcador de encerramento feito pelo organizador.
- **Estados e transições:**
  - **Aberta** — hoje é anterior ao dia do evento (sem janela) ou hoje está no intervalo do dia de início inclusive até o dia anterior ao fim (com janela). Aceita nome novo.
  - **Encerrada pelo calendário** — hoje é o dia do evento ou posterior (sem janela); ou hoje é anterior ao início; ou hoje é o dia de fim ou posterior (com janela). Não aceita nome novo.
  - Passa de aberta para encerrada quando o relógio chega à 00:00 do dia de corte, ou quando o organizador grava datas que deixam hoje fora do período.
  - Passa de encerrada para aberta quando o organizador grava uma data de evento futura e/ou uma janela que passem a incluir hoje, dentro das validações. Chegar no dia de início também abre, se esse dia ainda for anterior ao dia de fim e ao dia do evento.
- **Regras de negócio:**
  - As duas datas da janela ou nenhuma.
  - Início anterior ao fim. Início anterior à data do evento. Fim anterior ao dia do evento.
  - Sem janela: último dia aberto = véspera do evento. Com janela: último dia aberto = véspera do dia de fim.
  - Exemplo: evento no dia 10. Sem janela, último dia aberto = dia 9. Com fim no dia 9, último dia aberto = dia 8, e o início tem de ser anterior ao dia 9.
  - No dia do evento a confirmação está encerrada, com ou sem janela, enquanto essa continuar sendo a data do evento.
  - Evento criado para hoje já fica encerrado.
  - Limpar a janela restaura a regra da data do evento.
  - Alterar a data do evento para um dia futuro pode reabrir, se a janela estiver vazia ou se o intervalo passar a incluir hoje.
  - A nova data do evento continua não podendo estar no passado, como já vale hoje.
  - Nomes já confirmados permanecem.
- **Validações:**
  - Data inicial ou data final isolada: recusar e não gravar.
  - Início que não seja anterior ao fim: recusar.
  - Início ou fim que não seja anterior ao dia do evento: recusar.
  - Data ilegível ou inexistente: recusar.
  - Janela que ficaria inválida por causa de uma nova data de evento: recusar a alteração inteira (data do evento e janela não mudam) até o organizador corrigir a janela ou limpá-la.
  - Horário do evento não é validado para esta regra.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a criação de evento ou a edição de um evento que já existe.
  2. Preenche os dados já conhecidos do evento.
  3. Deixa a janela vazia ou informa início e fim.
  4. Salva.
  5. Se as datas da janela forem inválidas, vê o erro e o evento permanece como estava (na edição) ou não é criado (na criação).
  6. Se forem válidas, vê se a confirmação está aberta e até qual dia, ou encerrada e por qual motivo de calendário (ainda não chegou o início, chegou o dia de fim, ou chegou o dia do evento).
- **Casos de borda e erros:**
  - Evento para hoje, sem janela: nasce encerrado. O painel diz que o prazo é o dia do evento e que ele já chegou.
  - Evento para hoje, com tentativa de janela: o fim teria de ser anterior a hoje, então o intervalo já passou. Se a janela obedecer à ordem, pode ser gravada e o estado fica encerrado. Se não obedecer, nada é gravado.
  - Início hoje, fim amanhã, evento depois de amanhã: hoje está aberto; amanhã à 00:00 encerra.
  - Organizador apaga só uma das duas datas: o sistema recusa e mantém o par anterior.
  - Organizador apaga as duas: grava sem janela e aplica a data do evento.
  - Data do evento é antecipada e a janela deixa de ser anterior a ela: a edição não é salva e o painel explica que a janela precisa ser ajustada ou removida.
  - Data do evento é adiada para um dia futuro, janela vazia, sem que o dia novo seja no passado: a confirmação abre se hoje for anterior a essa nova data.
  - À meia-noite, um envio que chega já no dia de corte não gera nome novo.
  - Eventos que já existem, sem janela, passam a seguir a data do evento. Os que já estão no dia do evento ou depois ficam encerrados para nomes novos; a lista antiga permanece.
  - Tentativa de confirmar com o estado encerrado: nenhum nome é acrescentado.
- **Impacto no existente:** A criação e a edição do evento ganham a janela opcional. A lista do painel passa a indicar aberta ou encerrada (suposição da regra 17). Eventos já criados não têm janela e ficam sujeitos ao corte na data do evento, inclusive os que já ocorreram. Título, detalhes, horário, local, link, totais e a lista de nomes continuam existindo. A página pública só muda de fato na Spec 03; até lá, a regra de não gravar nome com confirmação encerrada já precisa valer para o estado não ser só visual.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento no dia 10 sem janela e hoje no dia 9, quando o organizador abre o evento no painel, então a confirmação está aberta e o último dia informado é o dia 9.
  - Dado esse mesmo evento e hoje no dia 10, quando o dia começa, então a confirmação está encerrada e um nome novo não é gravado.
  - Dado um evento no dia 10, quando o organizador define fim no dia 9 e início anterior ao dia 9, então o último dia aberto é o dia 8 e no dia 9 a confirmação está encerrada.
  - Dado um evento no dia 10, quando o organizador informa só a data inicial, ou um fim no dia 10 ou depois, ou um início que não seja anterior ao fim, então nada disso é gravado e o painel explica o erro.
  - Dado um evento criado com data de hoje e sem janela, quando a criação termina, então a confirmação está encerrada.
  - Dado um evento encerrado só porque o dia do evento chegou, quando o organizador muda a data do evento para um dia futuro permitido e não há janela, então a confirmação passa a aberta.
  - Dado um evento com janela e uma nova data de evento que tornaria a janela inválida, quando o organizador tenta salvar, então a data do evento e a janela permanecem as anteriores.
  - Dado um evento que já tinha nomes confirmados e que ficou encerrado pelo calendário, quando o organizador abre a lista, então esses nomes continuam lá.
- **Definição de pronto:** Dá para criar e editar a janela com as validações acima, ver no painel se a confirmação está aberta ou encerrada pelo calendário, e comprovar que nome novo não entra fora do período, usando o exemplo do dia 10 e o caso do evento criado para hoje.
- **Dependências:** Nenhuma. Usa o evento, a lista de confirmações e a conta do organizador que já existem.
- **Fora do escopo desta spec:** Botão de encerrar na hora, reativar, texto e formulário da página pública, e qualquer aviso externo ao convidado.

### Spec 02 — Encerrar na hora e reativar

- **Fase:** Fase 1 — Prazo no painel
- **Objetivo (o quê):** O organizador encerra a confirmação antes do prazo e pode pedir para reativar. Reativar só abre de novo se o calendário da Spec 01 ainda permitir.
- **Intenção (por quê):** O prazo automático não cobre o caso em que a lista já está fechada antes da data, por exemplo porque o organizador já tem o número que queria. Reativar existe para desfazer esse gesto, não para furar o dia do evento nem o fim da janela.
- **Contexto:** Depende do estado aberto/encerrado pelo calendário da Spec 01, inclusive da janela opcional e do corte à 00:00. O painel do evento já mostra esse estado. Esta spec acrescenta o encerramento decidido pelo organizador e a reativação.
- **Atores:** Organizador autenticado.
- **Descrição do comportamento:** Quando a confirmação está aberta, o organizador pode encerrar agora. **Suposição:** o sistema pede uma confirmação explícita e só então marca o encerramento manual. A partir daí o evento não aceita nome novo, mesmo dentro do período do calendário. Os nomes já feitos permanecem, assim como o link e os dados do evento. Quando está encerrada (pelo organizador ou pelo calendário), o organizador pode pedir para reativar. Reativar tira apenas o marcador manual e calcula de novo o calendário da Spec 01. Se o resultado for aberta, volta a aceitar nomes e o painel diz até qual dia. Se o resultado for encerrada, continua encerrada e o painel diz se ainda não chegou o dia de início ou se o prazo já passou. Mudar janela ou data do evento com o marcador manual ligado não reabre.
- **Entradas e saídas:** Entram o pedido de encerrar (com a confirmação explícita da suposição) e o pedido de reativar, feitos pelo organizador naquele evento. Saem o estado atualizado e uma explicação visível: aberta até qual dia, encerrada por ação do organizador (e até quando ainda daria para reativar com sucesso), ou encerrada pelo calendário com o motivo. Nome novo continua não sendo gravado enquanto o estado final for encerrado.
- **Dados/entidades envolvidos (conceitual):** O evento passa a poder estar com um encerramento manual ligado ou desligado, além da janela opcional e da data do evento já tratadas na Spec 01. A confirmação (o nome) não é apagada por encerrar nem por reativar.
- **Estados e transições:**
  - **Aberta** — calendário permite e não há encerramento manual. Ação disponível: encerrar agora.
  - **Encerrada manualmente** — o organizador encerrou e o calendário ainda permitiria nomes. Ação disponível: reativar. Reativar com sucesso volta para aberta.
  - **Encerrada pelo calendário** — início ainda não chegou, ou chegou o dia de fim, ou chegou o dia do evento. Pode existir ou não um encerramento manual antigo. Reativar remove o manual, mas o estado permanece encerrado pelo calendário.
  - Encerrar agora só existe a partir de aberta. Não é oferecido quando já está encerrada.
  - Reativar não é oferecido quando está aberta.
- **Regras de negócio:**
  - Encerrar agora não altera a janela nem a data do evento.
  - O encerramento manual tem prioridade sobre um calendário que ainda estaria aberto.
  - Reativar não cria uma janela nova e não empurra o prazo.
  - Se, ao reativar, hoje ainda está no período aberto da Spec 01, a confirmação abre.
  - Se, ao reativar, hoje é anterior ao início, continua encerrada até esse dia, e só abre nesse dia se o marcador manual continuar desligado.
  - Se, ao reativar, hoje já é o dia de fim, o dia do evento ou posterior, continua encerrada. Não há como reabrir nesse dia.
  - Com o marcador manual ligado, editar a janela ou adiar a data do evento não reabre. O organizador precisa reativar depois, e aí o calendário novo é que decide.
  - Limpar a janela com o marcador manual ligado continua encerrada até reativar. Depois de reativar, vale a data do evento.
  - Nomes já confirmados permanecem nos dois sentidos (encerrar e reativar).
- **Validações:**
  - Encerrar com a confirmação já encerrada: a ação não é oferecida. Se o pedido chegar mesmo assim, o estado não muda e nada é apagado.
  - Reativar com a confirmação aberta: a ação não é oferecida. Se o pedido chegar mesmo assim, permanece aberta.
  - **Suposição:** encerrar sem a confirmação explícita do organizador não encerra.
  - Reativar não exige uma janela preenchida.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre o evento no painel e vê o estado.
  2. Se estiver aberta, escolhe encerrar agora e confirma.
  3. Vê que ficou encerrada por ação dele e que os nomes antigos seguem na lista.
  4. Se ainda está dentro do prazo, pede para reativar.
  5. Vê a confirmação aberta de novo, com o último dia que ainda aceita nome.
  6. Se o prazo já passou, ou se o início ainda não chegou, pede para reativar e vê que continua encerrada, com o motivo.
- **Casos de borda e erros:**
  - Organizador encerra e, antes de reativar, o relógio passa do prazo: reativar não abre. O painel diz que o prazo já passou.
  - Organizador encerra no último dia aberto, reativa nesse mesmo dia, antes da meia-noite: volta a aceitar nomes até o fim desse dia.
  - Evento sem janela, encerrado à mão na véspera, reativado na véspera: abre. Reativado no dia do evento: continua encerrado.
  - Janela com início amanhã: não está aberta, então não há “encerrar agora”. Reativar não abre. O painel diz que a confirmação só abre no dia de início.
  - Havia encerramento manual e o organizador muda o início para um dia que já inclui hoje: continua encerrada até ele reativar. Ao reativar, se hoje estiver no intervalo, abre.
  - Havia encerramento manual e o organizador limpa a janela, com a data do evento ainda futura e hoje anterior a ela: continua encerrada até reativar. Ao reativar, abre.
  - Evento no dia 10, fim da janela no dia 9, hoje no dia 8 ou depois: reativar não abre, porque o dia 8 já é o dia de fim ou posterior. No dia 7, se tiver sido encerrada à mão, reativar abre.
  - Falha ao gravar o pedido: o estado anterior permanece e o organizador é informado de que não deu para concluir.
- **Impacto no existente:** O painel do evento ganha encerrar e reativar em cima do estado da Spec 01. A lista de nomes, a edição de cada nome, a remoção, o link e a exclusão do evento não mudam de regra. Um encerramento manual faz o corte da Spec 01 valer mais cedo.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com confirmação aberta, quando o organizador encerra agora e confirma a ação, então a confirmação fica encerrada, os nomes antigos continuam na lista e um nome novo não é gravado.
  - Dado esse evento ainda dentro do período do calendário, quando o organizador reativa, então a confirmação volta a aberta e um nome novo pode ser gravado.
  - Dado um evento cuja data é hoje, ou cujo dia de fim da janela é hoje ou já passou, quando o organizador reativa, então a confirmação continua encerrada e o painel informa que o prazo já passou.
  - Dado um evento com início de janela no futuro e sem encerramento manual, quando o organizador pede para reativar, então continua encerrada e o painel informa que ainda não chegou o dia de início.
  - Dado um encerramento manual ativo, quando o organizador só altera a janela ou a data do evento para um período que incluiria hoje, então a confirmação continua encerrada até ele reativar.
  - Dado uma confirmação já encerrada pelo calendário, quando se procura a ação de encerrar agora, então ela não está disponível.
- **Definição de pronto:** No painel, encerrar agora fecha a confirmação antes do prazo, reativar reabre só dentro do prazo da Spec 01, e reativar fora do prazo deixa o evento encerrado com o motivo visível. A lista de nomes antiga permanece nos dois casos.
- **Dependências:** Spec 01 — o cálculo de aberto/encerrado pelo calendário, a janela opcional e a regra de não gravar nome novo quando encerrado.
- **Fora do escopo desta spec:** Mudar o formulário público, definir o texto visto pelo convidado, apagar nomes ao encerrar, e estender o prazo para além das regras da Spec 01.

### Spec 03 — Página pública com confirmação indisponível

- **Fase:** Fase 2 — Link público
- **Objetivo (o quê):** Com a confirmação encerrada, o convidado continua vendo o convite e não consegue enviar um nome. Com a confirmação aberta, o envio segue como já funciona hoje.
- **Intenção (por quê):** Encerrar no painel não resolve se o link ainda grava quem tenta confirmar. O convidado precisa entender que não dá para confirmar, sem perder as informações do evento.
- **Contexto:** A página pública do evento já mostra título, detalhes (somente se houver texto), data, horário e local, pede o nome completo e oferece “Eu vou!”. Cada envio válido grava uma confirmação. Trecho antigo do link redireciona para o atual. Evento inexistente ou excluído mostra que está indisponível e não aceita confirmação. Esta spec usa o estado definido nas Specs 01 e 02: aberta, encerrada pelo calendário ou encerrada manualmente.
- **Atores:** Convidado, sem login. O organizador só entra como quem já definiu o estado no painel.
- **Descrição do comportamento:** Se o estado está aberto, a página permanece a de hoje: o convidado informa o nome, confirma, vê o sucesso e pode confirmar outra pessoa. Se o estado está encerrado por qualquer motivo, a página mostra os mesmos dados do evento e não oferece um envio que grave nome. **Suposição:** aparece o texto “Confirmação indisponível”, o mesmo antes do início, depois do prazo e no encerramento manual. O convidado não vê se foi o organizador ou o calendário, nem a data em que voltaria a abrir. Um envio que chegue mesmo assim não cria confirmação e não altera a lista. Evento inexistente ou excluído continua na mensagem de evento indisponível, distinta desta. Quando o estado volta a aberto (reativação com sucesso ou virada do dia de início), a página volta a aceitar nome sem o organizador publicar outro link.
- **Entradas e saídas:** Entra a visita ao link do evento e, se alguém tentar, o nome informado. Sai a página com os dados do evento. Se aberta, sai também uma confirmação gravada para um nome válido. Se encerrada, sai a indicação de confirmação indisponível e nenhuma confirmação nova.
- **Dados/entidades envolvidos (conceitual):** Evento (dados já exibidos no convite, janela opcional, data do evento, encerramento manual) e confirmação (nome). O estado usado na página é o mesmo do painel. Nenhuma informação nova é pedida ao convidado.
- **Estados e transições:** A página não tem estado próprio. Ela reflete o estado do evento:
  - Aberta: formulário de nome disponível.
  - Encerrada (manual ou calendário): convite visível, envio indisponível.
  - A transição acontece quando o estado do evento muda (meia-noite, edição da janela, encerrar, reativar ou mudança da data do evento), inclusive para quem já estava com a página aberta no momento em que tenta enviar: vale o estado na hora do envio.
- **Regras de negócio:**
  - Encerrada: não grava nome, não aumenta o total e não cria linha na lista.
  - Aberta: seguem as regras já existentes (nome completo, um nome por envio, nomes repetidos permitidos, outro envio depois do sucesso).
  - O mesmo texto de indisponível vale para todos os motivos de encerramento.
  - Link antigo do mesmo evento leva ao comportamento do link atual.
  - Evento excluído ou slug inexistente não usa esta mensagem de confirmação encerrada. Continua como evento indisponível.
  - Horário, local, título e detalhes continuam visíveis nos dois estados, com detalhes omitidos quando vazios, como hoje.
- **Validações:**
  - Nome vazio ou inválido com a confirmação aberta: recusar como já é feito hoje, sem gravar.
  - Qualquer nome, válido ou não, com a confirmação encerrada: não gravar. O convidado permanece na situação de confirmação indisponível.
  - Envio simultâneo à virada das 00:00: vale o estado no momento em que o sistema decide gravar. Se já encerrou, não grava.
- **Fluxo do usuário (passo a passo):**
  1. O convidado abre o link recebido.
  2. Vê os dados do evento.
  3. Se a confirmação está aberta, informa o nome e confirma, como hoje.
  4. Se está encerrada, vê que a confirmação está indisponível e não tem como enviar o nome.
  5. Se o organizador reativa com sucesso e o convidado abre de novo (ou tenta de novo depois da reabertura), o envio volta a funcionar.
- **Casos de borda e erros:**
  - Página aberta no navegador antes da meia-noite e envio depois da meia-noite do dia de corte: o nome não entra e o convidado vê a confirmação indisponível.
  - Página aberta enquanto encerrada manualmente e o organizador reativa antes do envio, ainda no prazo: o envio seguinte pode gravar.
  - Convidado tenta repetir o envio várias vezes com a confirmação encerrada: a lista não ganha linhas.
  - Confirmação encerrada e nome já existente na lista: a lista do organizador não muda.
  - Slug antigo: redireciona e a página de destino obedece ao estado atual.
  - Evento sem detalhes: a página não inventa texto no lugar, como hoje, esteja aberta ou encerrada.
  - Evento excluído: mensagem de evento indisponível, sem formulário e sem o texto de confirmação encerrada.
- **Impacto no existente:** A página pública deixa de oferecer confirmação o tempo todo em que o evento existe. O restante do convite e o fluxo de sucesso, quando aberta, permanecem. O redirecionamento de trechos antigos permanece. O painel não muda nesta spec, mas a lista dele deixa de receber nomes enquanto estiver encerrada.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com confirmação aberta, quando o convidado informa um nome válido e confirma, então esse nome entra na lista daquele evento.
  - Dado um evento encerrado pelo dia do evento, pela janela ou manualmente, quando o convidado abre o link, então vê os dados do evento, vê “Confirmação indisponível” e não consegue gravar um nome.
  - Dado um evento encerrado, quando um envio de nome chega mesmo assim, então nenhuma confirmação nova é criada e o total não muda.
  - Dado um evento reativado com sucesso ainda no prazo, quando o convidado abre o link de novo, então volta a conseguir confirmar.
  - Dado um trecho antigo do link de um evento encerrado, quando o convidado o abre, então cai no endereço atual e a confirmação continua indisponível.
  - Dado um evento que não existe ou foi excluído, quando alguém abre o endereço, então vê que o evento está indisponível, e não a mensagem de confirmação encerrada.
- **Definição de pronto:** Com a confirmação encerrada por cada um dos motivos (antes do início, dia de fim, dia do evento, encerramento manual), o convite aparece e nenhum nome novo entra. Com a confirmação aberta, “Eu vou!” segue gravando o nome. O caso do link antigo e o de evento inexistente continuam distintos.
- **Dependências:** Spec 01 — corte pelo calendário e janela. Spec 02 — encerramento manual e reativação, porque a página precisa obedecer também a esses estados.
- **Fora do escopo desta spec:** Explicar ao convidado a data em que a confirmação abre ou o motivo do encerramento, permitir que ele cancele um nome, e alterar os dados do evento pela página pública.

## 14. Ordem recomendada de implementação

1. Spec 01 — Janela opcional e encerramento pelo calendário
2. Spec 02 — Encerrar na hora e reativar
3. Spec 03 — Página pública com confirmação indisponível

A Spec 01 estabelece o prazo e o que significa aberta ou encerrada. A Spec 02 só faz sentido em cima desse cálculo: reativar não inventa um prazo novo. A Spec 03 precisa dos dois estados, manual e calendário, para o link não aceitar nome cedo demais nem deixar um furo quando o organizador encerra na hora.
