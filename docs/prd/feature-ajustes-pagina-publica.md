# PRD — Ajustes na página pública do evento

> Tipo: PRD de feature · Data: 2026-10-12
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

A página pública do evento ganha dois ajustes de leitura, sem mudar o que o evento guarda nem quem pode confirmar.

No layout **Personalizado**, a linha do dia da semana, da data e do horário continua uma só, no formato que o convite já usa (`Sábado | 07/11 | às 14h`). A fonte dessa linha fica maior e o espaço entre os três trechos aumenta. O local continua na linha de baixo, no tamanho de hoje.

A confirmação de presença passa a viver num card, nos dois layouts. Dentro dele ficam o título **Confirmação de presença**, o campo de nome completo e o botão **confirmo**, agora com um ícone de check. Aviso de erro e o texto **Confirmação indisponível** também ficam nesse card. Depois de uma confirmação bem-sucedida, o formulário sai e o card mostra um check grande, verde, com a frase **Agradecemos pela sua confirmação.**

A prévia do tema acompanha o que o convidado vê em repouso: a linha maior e o card com o botão e o check. A prévia não simula sucesso, erro nem confirmação encerrada.

## 2. Problema que resolve

A linha de dia e horário está pequena e apertada para o peso que tem no convite. Dia da semana, data e horário competem pouco com o restante e ficam difíceis de separar no olhar.

A confirmação aparece solta na página, sem um bloco próprio. O botão **confirmo** não tem um sinal visual de que a ação é uma confirmação. Depois de confirmar, o convidado vê um aviso de “Presença confirmada.” e o formulário continua na tela, com o convite para confirmar outra pessoa. O agradecimento que o produto quer mostrar é outro: um check grande, verde, e a frase **Agradecemos pela sua confirmação.**, no lugar do formulário.

## 3. Público-alvo

- **Convidado** — abre a página pública, sem login. Lê o dia e o horário, preenche o nome e confirma. É quem vê o card, o check do botão e o agradecimento.
- **Organizador** — vê, na prévia do tema, a linha maior e o card em repouso, para o convite que ele aprova ser o mesmo que o convidado abre. Não confirma presença por essa prévia.

## 4. Objetivo do recorte atual

Deixar a linha de dia e horário mais legível no layout **Personalizado**, e transformar a confirmação num card único nos dois layouts. O botão **confirmo** ganha um ícone de check. Uma confirmação aceita substitui o formulário, naquela visita, pelo check verde e pela frase de agradecimento. Erro e confirmação indisponível permanecem dentro do mesmo card. Os dados gravados, a capacidade, a janela de confirmação e a tela de convites esgotados não mudam.

## 5. Funcionalidades

**Essenciais:**

- Linha de dia da semana, data curta e horário continua na mesma linha, na mesma ordem e com o mesmo texto de hoje, com fonte maior e mais espaço entre os três trechos.
- O local permanece na linha de baixo, no tamanho e na posição atuais.
- Um card único para a confirmação, no layout **Personalizado** e no layout **Somente imagem**.
- Dentro do card, com a confirmação aberta: o título **Confirmação de presença**, o campo **Nome completo** e o botão **confirmo** com ícone de check.
- Aviso de erro da confirmação dentro do card, com o formulário ainda visível.
- Texto **Confirmação indisponível** dentro do card, sem o formulário.
- Depois de confirmar com sucesso, o card deixa de mostrar o formulário e mostra um ícone de check grande, em verde, e a frase exata **Agradecemos pela sua confirmação.**
- A prévia do tema repete a linha maior e o card em repouso, com o check no botão **confirmo**.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mudar o texto da linha de dia e horário: dia da semana, barras `|`, data `DD/MM` e horário `às 14h` / `às 14h30` continuam como já estão.
- Mostrar dia, horário ou local no layout **Somente imagem**.
- Aumentar a fonte do título do evento, dos detalhes ou do local.
- Mudar a lista de eventos, a ficha do evento ou qualquer data longa do painel.
- Alterar o que uma confirmação grava, o campo de nome, a validação do nome ou o texto do botão **confirmo**.
- Limitar uma confirmação por navegador, por aparelho ou por pessoa. Abrir a página de novo, com a confirmação aberta e com vaga, mostra o formulário outra vez.
- Oferecer, na mesma visita e depois do sucesso, um segundo envio ou a frase “Você pode confirmar outra pessoa neste mesmo evento.”
- Manter o aviso “Presença confirmada.”
- Simular sucesso, erro ou confirmação encerrada na prévia do tema.
- Mudar a tela **Convites esgotados**, a tela **Evento indisponível**, a capacidade máxima ou a janela de confirmação.
- Mudar cores do tema, o aviso de contraste, a cor do botão ou a cor do texto do convite.
- Terceiro layout, ou um card diferente para cada layout.

## 7. Regras de negócio

- Regra 1: A linha maior vale só onde o convite já mostra dia e horário: página pública e prévia do tema, no layout **Personalizado**.
- Regra 2: Os três trechos continuam na mesma linha, centralizados, nesta ordem: dia da semana, data curta, horário. As barras `|` permanecem entre eles. O que muda é o tamanho da fonte e o espaço entre os trechos, que fica maior do que o de hoje.
- Regra 3: O nome do local continua sozinho, centralizado, imediatamente abaixo dessa linha, no tamanho atual. Não entra na linha de dia e horário e não aumenta de fonte.
- Regra 4: A linha de dia e horário fica claramente maior do que está hoje e continua menor do que o nome do evento, para o título seguir sendo o texto principal do convite.
- Regra 5: A cor que já pinta essa linha e o local continua pintando os três trechos, as barras e o local. Esta feature não cria cor nova para a data.
- Regra 6: A confirmação fica num único card nos dois layouts, na página pública. No modo de fundo desfocado do layout **Somente imagem**, esse card é a superfície da confirmação: não aparece um segundo card dentro do que já envolve a confirmação.
- Regra 7: Com a confirmação aberta e com vaga, o card contém, nesta ordem: o título **Confirmação de presença**, o campo **Nome completo** e o botão **confirmo**. O título segue a cor que já tem hoje: a cor de texto do tema no layout **Personalizado**; no layout **Somente imagem**, o visual atual dessa frase, sem usar a cor de texto.
- Regra 8: O botão continua com o texto **confirmo** e com a cor de botão do tema. O ícone de check fica no botão, junto do texto, na mesma cor do texto do botão, para continuar legível. O check grande e verde é só o do agradecimento, não o do botão.
- Regra 9: Enquanto o envio está em andamento, o botão mostra o indicador de espera que já existe e não precisa exibir o check ao mesmo tempo.
- Regra 10: Nome vazio ou inválido continua recusado como hoje. O erro do campo aparece no card, o formulário permanece, e nada é gravado.
- Regra 11: Falha ao confirmar que não seja nome inválido, confirmação encerrada nem convites esgotados mostra o aviso de erro dentro do card. O formulário permanece para uma nova tentativa.
- Regra 12: Se a confirmação está encerrada ao abrir a página, ou passa a estar encerrada no momento do envio, o card mostra somente **Confirmação indisponível**. Não há campo, botão nem agradecimento.
- Regra 13: Confirmação aceita substitui, naquela visita, o conteúdo do card pelo check grande verde e pela frase exata **Agradecemos pela sua confirmação.** Não aparecem o título **Confirmação de presença**, o campo, o botão, o aviso “Presença confirmada.” nem a frase sobre confirmar outra pessoa.
- Regra 14: O agradecimento vale só para a visita em que o envio deu certo. Recarregar ou abrir o link de novo, com a confirmação ainda aberta e com vaga, mostra de novo o card com o formulário. Esta feature não memoriza que aquele navegador já confirmou.
- Regra 15: Se o envio for aceito e, com isso, o evento esgotar as vagas, a página segue a regra que já existe de convites esgotados. O agradecimento desta feature é o que o convidado vê quando a confirmação foi aceita e a página do evento continua sendo a página do evento.
- Regra 16: A prévia do tema mostra o card em repouso e, no layout **Personalizado**, a linha maior. O campo de nome da prévia continua só de leitura. O botão da prévia não envia confirmação e leva o mesmo ícone de check. A prévia não mostra o agradecimento, o erro nem **Confirmação indisponível**.
- Regra 17: Nada nesta feature altera título, detalhes, imagem, layout, tema, capacidade, janela de confirmação, lista, ficha ou o que fica gravado numa confirmação.

## 8. Fluxos principais

### Fluxo 1 — Convidado lê o dia e o horário

1. O convidado abre a página pública de um evento no layout **Personalizado**.
2. Vê a linha de dia da semana, data e horário na mesma linha de hoje, com fonte maior e mais espaço entre os três trechos.
3. Vê o local abaixo, no tamanho atual.
4. Em seguida, vê o card da confirmação.

### Fluxo 2 — Convidado confirma presença

1. O convidado abre um evento com confirmação aberta e com vaga, em qualquer layout.
2. Vê o card com **Confirmação de presença**, o campo **Nome completo** e o botão **confirmo** com o ícone de check.
3. Informa o nome e aciona **confirmo**.
4. O envio é aceito.
5. O card passa a mostrar o check grande verde e a frase **Agradecemos pela sua confirmação.** O formulário não está mais nessa visita.

### Fluxo 3 — Confirmação indisponível ou erro

1. Se a confirmação está encerrada, o convidado vê o card só com **Confirmação indisponível**.
2. Se o nome é inválido ou o envio falha por um motivo que ainda permite tentar de novo, o aviso fica dentro do card e o formulário continua.
3. Se não há mais vaga, a página segue a tela de convites esgotados que o produto já tem, fora deste card.

### Fluxo 4 — Organizador confere a prévia

1. O organizador abre a prévia do tema.
2. Em **Personalizado**, a linha de dia e horário aparece maior, com mais espaço entre os trechos, e o local permanece como está.
3. Nos dois layouts, a prévia mostra o card em repouso, com o título, o campo de nome e o botão **confirmo** com o check.
4. A prévia não mostra o agradecimento.

## 9. Critérios de aceite

- O convidado, no layout **Personalizado**, vê dia da semana, data e horário na mesma linha, com o mesmo texto de hoje, em fonte maior e com mais espaço entre os trechos.
- O local continua abaixo, no tamanho atual.
- O layout **Somente imagem** continua sem dia, horário e local.
- Nos dois layouts, a confirmação aberta aparece num card com o título **Confirmação de presença**, o campo **Nome completo** e o botão **confirmo** com um ícone de check.
- O check do botão usa a cor do texto do botão. O botão continua na cor do tema e com o texto **confirmo**.
- Nome vazio não confirma. O erro fica no card e o formulário continua.
- Confirmação encerrada mostra **Confirmação indisponível** dentro do card, sem formulário.
- Confirmação aceita substitui o formulário, naquela visita, por um check grande verde e pela frase **Agradecemos pela sua confirmação.**
- Essa visita não mostra “Presença confirmada.” nem oferece confirmar outra pessoa.
- Abrir a página de novo, com confirmação aberta e com vaga, mostra o formulário outra vez.
- A prévia do tema repete a linha maior e o card em repouso, com o check no botão, e não simula o agradecimento.
- Lista, ficha, dados gravados, capacidade e janela de confirmação permanecem como já estão.

## 10. Stack

Next.js, TypeScript e Tailwind, na página pública do evento e na prévia do tema que o produto já tem. A confirmação continua sendo enviada pelo fluxo atual, com o mesmo campo de nome. Nenhuma biblioteca, banco ou serviço novo.

## 11. Justificativa da stack

Os ajustes são de apresentação e de estado da tela que o convidado já usa. A página pública, a prévia, o tema, os dois layouts e a confirmação já existem. Não há informação nova para guardar.

## 12. Fases de construção

### Fase 1 — Convite público

Objetivo: a página pública fica mais legível na data e passa a tratar a confirmação como um card, com check no botão e agradecimento no lugar do formulário. A prévia acompanha o estado em repouso.

Specs:

- Spec 01 — Linha de dia e horário mais legível
- Spec 02 — Card da confirmação, check no botão e agradecimento

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Linha de dia e horário mais legível

- **Fase:** Fase 1 — Convite público
- **Objetivo (o quê):** Aumentar a fonte da linha de dia da semana, data e horário e aumentar o espaço entre esses três trechos, mantendo-os na mesma linha. O local abaixo não muda de tamanho.
- **Intenção (por quê):** O convidado precisa enxergar com facilidade que dia é, qual a data e que horas começa, sem transformar essa linha num segundo título. O espaço maior separa os três trechos no olhar. A prévia precisa mostrar o mesmo, para o organizador não aprovar uma linha e o convidado ver outra.
- **Contexto:** No layout **Personalizado**, a página pública e a prévia do tema já mostram uma linha centralizada no formato `Sábado | 07/11 | às 14h`, com uma barra entre o dia da semana e a data e outra entre a data e o horário. O nome do local fica sozinho, centralizado, imediatamente abaixo. Uma cor de texto do tema, quando existe, pinta essa linha, as barras e o local. O layout **Somente imagem** não mostra dia, horário nem local. A lista e a ficha do painel usam a data longa e o horário `14:00`. O card da confirmação é a Spec 02 e não faz parte daqui.
- **Atores:** O convidado, ao abrir a página pública. O organizador, ao abrir a prévia do tema.
- **Descrição do comportamento:** Quando o layout é **Personalizado**, a linha de dia da semana, data curta e horário permanece uma única linha, centralizada, com o mesmo texto e as mesmas barras de hoje. A fonte dessa linha fica claramente maior do que a atual e menor do que o nome do evento. O espaço entre os três trechos fica maior do que o atual, de modo que dia da semana, data e horário se separem sem deixar de ser uma frase só. O local continua na linha de baixo, centralizado, no tamanho de hoje. A prévia do tema em **Personalizado** usa a mesma fonte, o mesmo espaço e o mesmo texto. Em **Somente imagem**, a linha e o local continuam ausentes.
- **Entradas e saídas:** Entram a data do evento, o horário, o local, o layout e a cor de texto já gravados. Sai, em **Personalizado**, a mesma linha de hoje em fonte maior e com mais espaço entre os trechos, e o local abaixo inalterado em tamanho. Exemplo, sendo o dia um sábado: `Sábado | 07/11 | às 14h`, com os três trechos mais afastados entre si do que hoje. Em **Somente imagem**, essa saída não existe.
- **Dados/entidades envolvidos (conceitual):** O evento já tem data de calendário, horário com hora e minuto, nome do local, layout (**Personalizado** ou **Somente imagem**) e, se o organizador personalizou, uma cor de texto. Esta spec não cria informação nova.
- **Estados e transições:** Não se aplica. Não há estado novo. A linha aparece ou não conforme o layout já salvo.
- **Regras de negócio:**
  - Vale só para **Personalizado**, na página pública e na prévia do tema.
  - **Somente imagem** não passa a mostrar a linha.
  - Ordem e texto permanecem: dia da semana por extenso com a primeira letra maiúscula, barra, data `DD/MM`, barra, horário `às 14h` ou `às 14h30` / `às 14h05`, como o convite já formata hoje.
  - Os três trechos ficam na mesma linha, no centro. O espaço entre um trecho e o seguinte é maior do que o de hoje. As barras continuam entre eles.
  - A fonte da linha é maior do que a atual e menor do que o nome do evento.
  - O local não muda de tamanho, de posição nem de alinhamento.
  - A cor de texto que já pinta a linha continua pintando os trechos, as barras e o local.
  - Lista, ficha e avisos do painel que usam a data longa não mudam.
  - Evento já existente passa a ser lido assim sem nova gravação.
- **Validações:** Não se aplica. A data e o horário exibidos já foram aceitos quando o evento foi salvo.
- **Fluxo do usuário (passo a passo):**
  1. O convidado abre a página pública de um evento **Personalizado**.
  2. Depois do título e dos detalhes, se houver, lê a linha de dia e horário maior, ainda numa linha só, com mais espaço entre os trechos.
  3. Logo abaixo, lê o local no tamanho de hoje.
  4. Segue para a confirmação.
  5. O organizador, na prévia do tema desse evento, vê a mesma linha e o mesmo local.
- **Casos de borda e erros:**
  - Horário em ponto, minutos com um dígito, dia ou mês com um dígito: o texto continua o que o convite já produz hoje. Esta spec não reformata.
  - Local longo: continua quebrando centralizado, separado da linha de dia e horário.
  - Evento sem imagem e sem detalhes, em **Personalizado**: a linha maior e o local continuam abaixo do título.
  - Largura estreita: a intenção é uma linha só. Se a largura não comportar a fonte maior, a linha pode quebrar, sem mudar a ordem, sem omitir trecho e sem perder o espaço maior entre eles.
  - Layout **Somente imagem**: a linha e o local não aparecem.
  - Prévia antes de salvar uma edição: continua mostrando o conteúdo já salvo, como a prévia já faz, agora com a linha maior.
  - Página de evento inexistente ou excluído: continua **Evento indisponível**, sem esta linha.
- **Impacto no existente:** A linha de dia e horário na página pública e na prévia de **Personalizado** fica maior e mais espaçada. O texto, o local, o título, os detalhes, a imagem, o tema, a lista, a ficha e os dados gravados permanecem. A confirmação não muda nesta spec.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento **Personalizado** cuja linha hoje seria `Sábado | 07/11 | às 14h`, quando o convidado abre a página pública, então vê esses mesmos trechos na mesma ordem, na mesma linha, em fonte maior do que a atual e com mais espaço entre eles, e o local abaixo no tamanho atual.
  - Dado esse evento com cor de texto, quando o convidado abre a página, então a linha, as barras e o local usam essa cor.
  - Dado um evento **Personalizado**, quando o organizador abre a prévia do tema, então a prévia mostra a linha maior, com o mesmo texto e o mesmo espaço da página pública, e o local no tamanho atual.
  - Dado um evento **Somente imagem**, quando o convidado abre a página ou o organizador abre a prévia, então dia, horário e local não aparecem.
  - Dado qualquer evento, quando o organizador olha a lista ou a ficha, então a data continua longa e o horário continua `14:00`.
  - Dado a linha e o nome do evento na mesma página, quando o convidado lê o convite, então o nome do evento continua visualmente maior do que a linha de dia e horário.
- **Definição de pronto:** Página pública e prévia em **Personalizado** mostram a linha maior e mais espaçada, com o texto atual, e o local no tamanho atual. **Somente imagem**, lista e ficha não ganham essa linha. O texto formatado da data não foi reescrito.
- **Dependências:** Nenhuma. Usa a linha, o local, o layout e a prévia que o produto já tem.
- **Fora do escopo desta spec:** Card da confirmação, ícone do botão, agradecimento, erros e **Confirmação indisponível** (Spec 02). Também ficam de fora reformular o texto da data, aumentar título, detalhes ou local, e exibir a linha em **Somente imagem**.

### Spec 02 — Card da confirmação, check no botão e agradecimento

- **Fase:** Fase 1 — Convite público
- **Objetivo (o quê):** Colocar a confirmação de presença num card único, nos dois layouts, com o campo de nome e o botão **confirmo** dentro. O botão ganha um ícone de check. Depois de uma confirmação aceita, o formulário sai e o card mostra um check grande verde com a frase **Agradecemos pela sua confirmação.**
- **Intenção (por quê):** A confirmação precisa parecer um bloco próprio do convite, não um formulário solto. O check no botão antecipa a ação. O agradecimento precisa ser claro e ocupar o lugar do formulário, em vez do aviso atual que ainda convida a confirmar outra pessoa na mesma visita. Erro e confirmação encerrada continuam no mesmo bloco, para o convidado não procurar a resposta fora do card.
- **Contexto:** A página pública já tem os layouts **Personalizado** e **Somente imagem**. Nos dois, a confirmação aberta mostra a frase **Confirmação de presença**, o campo **Nome completo** e o botão **confirmo**, na cor de botão do tema. No layout **Personalizado**, essa frase usa a cor de texto. No layout **Somente imagem**, a frase fica no visual atual, sem a cor de texto. No modo de fundo desfocado, a confirmação já fica sobre uma superfície clara; no gradiente, ela fica direto sobre o fundo. Nome vazio é recusado. Confirmação encerrada substitui o formulário por **Confirmação indisponível**. Sucesso hoje mostra o aviso “Presença confirmada.”, a frase sobre confirmar outra pessoa quando ainda há vaga, e mantém o formulário. Sem vaga, a página inteira mostra a mensagem de convites esgotados, com o título do evento, sem formulário. A prévia do tema repete a frase, o campo somente leitura e o botão **confirmo**, sem enviar. A Spec 01 muda só a linha de dia e horário e não é necessária para este card.
- **Atores:** O convidado, na página pública. O organizador, só na prévia em repouso.
- **Descrição do comportamento:** A confirmação passa a ser um único card, nos dois layouts. Com a confirmação aberta, o card mostra o título **Confirmação de presença**, o campo **Nome completo** e o botão **confirmo** com um ícone de check na cor do texto do botão. O convidado informa o nome e aciona o botão. Enquanto envia, o botão mostra o indicador de espera já existente. Se o nome é inválido ou o envio falha e ainda dá para tentar, o aviso fica dentro do card e o formulário continua. Se a confirmação está indisponível, o card mostra só **Confirmação indisponível**. Se o envio é aceito e a página do evento continua na tela, o card substitui o formulário por um ícone de check grande, verde, e a frase **Agradecemos pela sua confirmação.** Se não há vaga, vale a tela de convites esgotados que já existe, no lugar da página do evento. No fundo desfocado, a confirmação continua numa superfície só: o card desta spec, sem um card extra por dentro. A prévia mostra esse card em repouso, com o check no botão, e não envia nem mostra o agradecimento.
- **Entradas e saídas:** Entram o nome digitado, o estado da confirmação (aberta, encerrada ou sem vaga), o layout, o modo de fundo e as cores de botão e de texto já resolvidas pelo tema. Sai o card em um destes conteúdos: formulário; formulário com erro; só **Confirmação indisponível**; ou check grande verde com **Agradecemos pela sua confirmação.** A confirmação aceita continua gravando a presença como hoje. A prévia não produz gravação.
- **Dados/entidades envolvidos (conceitual):** O evento tem layout, tema, estado da confirmação e, quando há teto, vagas restantes. Uma confirmação de presença tem o nome completo de quem confirmou. O agradecimento não é um dado novo: é a resposta visual de uma confirmação aceita naquela visita.
- **Estados e transições:**
  - **Formulário:** confirmação aberta e com vaga, antes de um sucesso nesta visita. Mostra título, campo e botão com check.
  - **Enviando:** o botão está em espera. O card continua no formulário.
  - **Erro recuperável:** volta ao formulário, com o aviso dentro do card.
  - **Indisponível:** a confirmação está encerrada. O card mostra só **Confirmação indisponível**.
  - **Agradecimento:** o envio foi aceito e a página do evento segue visível. O card mostra o check grande verde e a frase. Não volta ao formulário nessa visita.
  - **Esgotado:** a página deixa de ser a do evento e mostra a mensagem de convites esgotados já existente. O card não aparece.
- **Regras de negócio:**
  - Um único card nos dois layouts. No fundo desfocado, ele é a superfície da confirmação, sem segundo card interno.
  - Ordem no estado de formulário: título **Confirmação de presença**, campo **Nome completo**, botão **confirmo** com check.
  - A cor do título segue a regra atual de cada layout. O botão segue a cor do tema. O check do botão usa a cor do texto do botão.
  - O texto do botão continua **confirmo**.
  - Durante o envio, o indicador de espera substitui a necessidade de mostrar o check.
  - Erro de nome e falha que permite nova tentativa ficam dentro do card, com o formulário visível.
  - **Confirmação indisponível** fica dentro do card, sem título de seção, sem campo e sem botão.
  - Sucesso nesta visita: só o check grande, em verde, e a frase exata **Agradecemos pela sua confirmação.** Sem “Presença confirmada.”, sem convite para confirmar outra pessoa, sem campo e sem botão.
  - O check do agradecimento é claramente maior do que o check do botão.
  - Recarregar a página com confirmação aberta e com vaga volta ao estado de formulário. Não há memória de confirmação no navegador.
  - Esgotar as vagas continua levando à tela de convites esgotados já existente.
  - A prévia mostra o estado de formulário, com campo somente leitura e botão que não envia, já com o check. Não mostra agradecimento, erro nem indisponível.
- **Validações:** O nome continua obrigatório, sem só espaços, com a mesma recusa de hoje. Confirmação encerrada e evento sem vaga continuam impedindo a gravação, como já impedem. Esta spec não cria regra nova de nome, de capacidade nem de prazo.
- **Fluxo do usuário (passo a passo):**
  1. O convidado abre a página com confirmação aberta e com vaga.
  2. Lê o card, informa o nome completo e aciona **confirmo**, que mostra o check.
  3. O envio é aceito.
  4. O card mostra o check grande verde e **Agradecemos pela sua confirmação.**
  5. Se o nome está vazio, o card explica o erro e mantém o campo e o botão.
  6. Se a confirmação está encerrada, o card mostra só **Confirmação indisponível**.
  7. O organizador, na prévia, vê o card em repouso com o check no botão e não consegue confirmar por ali.
- **Casos de borda e erros:**
  - Nome vazio ou só com espaços: nada é gravado; o erro fica no card; o formulário continua.
  - Falha de envio que não encerra a confirmação nem esgota as vagas: o aviso de erro fica no card e o convidado pode tentar de novo.
  - A confirmação encerra entre a abertura da página e o envio: o card passa a **Confirmação indisponível** e não mostra o agradecimento.
  - O envio é aceito e as vagas se esgotam: segue a tela de convites esgotados já existente, não o card de agradecimento, se essa já for a resposta da página quando não há vaga.
  - O envio é aceito e ainda há vaga: o card mostra o agradecimento e não oferece outro formulário nessa visita. Outra pessoa confirma abrindo a página de novo.
  - Recarregar depois do agradecimento, com vaga e confirmação aberta: o formulário volta. O agradecimento não fica guardado no navegador.
  - Fundo desfocado: uma superfície só em volta da confirmação. Fundo em gradiente: o card existe mesmo sem a superfície do desfoque.
  - Layout **Somente imagem** e **Personalizado**: o mesmo conteúdo de card. A frase **Confirmação de presença** não passa a usar a cor de texto no layout **Somente imagem**.
  - Prévia: não envia, não mostra agradecimento e não mostra erro. O check do botão aparece mesmo assim.
  - Evento inexistente ou excluído: continua **Evento indisponível**, sem card.
- **Impacto no existente:** A confirmação deixa de aparecer solta e o sucesso deixa de manter o formulário com o aviso “Presença confirmada.” e a frase de confirmar outra pessoa. O que é gravado, a validação do nome, o botão **confirmo**, as cores do tema, a tela de convites esgotados e a possibilidade de várias pessoas confirmarem em visitas diferentes permanecem. A linha de dia e horário não muda nesta spec.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com confirmação aberta e com vaga, em qualquer layout, quando o convidado abre a página, então vê um card com **Confirmação de presença**, o campo **Nome completo** e o botão **confirmo** com um ícone de check na cor do texto do botão.
  - Dado esse card, quando o convidado envia um nome válido e a confirmação é aceita sem levar à tela de convites esgotados, então o card mostra um check grande verde e a frase **Agradecemos pela sua confirmação.**, e não mostra o campo, o botão, “Presença confirmada.” nem a frase sobre confirmar outra pessoa.
  - Dado o agradecimento já exibido, quando o convidado recarrega a página e ainda há vaga e a confirmação está aberta, então o formulário volta.
  - Dado o campo de nome vazio, quando o convidado aciona **confirmo**, então nada é gravado, o erro aparece no card e o formulário continua.
  - Dado um evento com confirmação encerrada, quando o convidado abre a página, então o card mostra **Confirmação indisponível** e não mostra campo nem botão.
  - Dado o layout **Somente imagem** com fundo desfocado, quando a confirmação está visível, então existe uma única superfície de card em volta dela, não duas.
  - Dado a prévia do tema, quando o organizador a abre, então vê o card em repouso com o check no botão **confirmo**, e não vê o agradecimento.
  - Dado um evento sem vaga, quando o convidado abre a página, então vê a mensagem de convites esgotados já existente, sem este card.
- **Definição de pronto:** Nos dois layouts, a confirmação aberta é um card com título, nome e botão com check. Erro e **Confirmação indisponível** ficam nesse card. Sucesso na visita troca o formulário pelo check verde e pela frase exata. Recarregar com vaga devolve o formulário. A prévia mostra o card em repouso com o check e não envia. Convites esgotados, dados gravados e cores do tema seguem as regras que já existiam.
- **Dependências:** Nenhuma. A Spec 01 pode ser feita antes, depois ou em paralelo: ela não altera este card.
- **Fora do escopo desta spec:** Fonte e espaçamento da linha de dia e horário (Spec 01). Também ficam de fora mudar a validação do nome, o texto **confirmo**, a capacidade, a janela de confirmação, a tela de convites esgotados, memorizar a confirmação no navegador e simular sucesso na prévia.

## 14. Ordem recomendada de implementação

1. Spec 01 — Linha de dia e horário mais legível
2. Spec 02 — Card da confirmação, check no botão e agradecimento

A Spec 01 vem primeiro porque o convidado lê o dia e o horário antes da confirmação, e ela não depende do card. A Spec 02 pode ser implementada em seguida sem refazer a linha. Fazer as duas deixa a página pública e a prévia em repouso coerentes: a prévia não pode ficar com a linha antiga nem com a confirmação solta, sem o check no botão.
