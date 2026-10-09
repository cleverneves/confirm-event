# PRD — Gradiente, cor de texto e botão do tema

> Tipo: PRD de feature · Data: 2026-10-08
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

A personalização visual da página pública do evento deixa de usar um fundo de uma cor só e uma cor de botão escolhida à parte.

O fundo passa a ser um gradiente: **cor 1 em cima**, **cor 2 embaixo**. O botão **confirmo** usa sempre a cor 1, em qualquer layout. Entra um campo novo, **Texto**, para as informações que não são o título. A cor de **Título** passa a pintar só o nome do evento.

Título e texto valem apenas no layout **Personalizado**. Fundo e botão valem nos dois layouts: **Personalizado** e **Somente imagem**.

Todo evento passa a nascer nesse gradiente padrão, inclusive os que já tinham uma cor de fundo salva. A cor de título já salva continua salva, mas só no título.

## 2. Problema que resolve

O fundo de uma cor só e o botão independente não acompanham o que o organizador quer no convite. A cor chamada Título ainda pinta detalhes, data, horário, local e a frase “Confirmação de presença”, então não dá para destacar o nome do evento sem mudar o resto.

Esta feature separa o título do restante do texto, troca o fundo sólido por um gradiente com padrão definido e faz o botão seguir a cor de cima, nos dois layouts da página.

## 3. Público-alvo

- **Organizador** — única conta do produto. Ajusta o tema na área de um evento já criado.
- **Convidado** — só vê o resultado na página pública, sem login e sem escolher cores.

## 4. Objetivo do recorte atual

Na área do evento, o organizador define as duas cores do gradiente, a cor do título e a cor do texto, vê a prévia, é avisado se título ou texto ficarem difíceis de ler, salva ou volta ao padrão. A página pública usa o gradiente e o botão na cor 1 em qualquer layout. Título e texto personalizados aparecem só no layout **Personalizado**.

## 5. Funcionalidades

**Essenciais:**

- Fundo em gradiente, cor 1 em cima e cor 2 embaixo, com padrão definido.
- Cor de título aplicada só ao nome do evento, só no layout **Personalizado**.
- Cor de texto aplicada aos detalhes, à linha de data e horário, ao local e à frase “Confirmação de presença”, só no layout **Personalizado**.
- Botão **confirmo** sempre na cor 1 do fundo, nos dois layouts. O texto do botão continua claro ou escuro, o que ficar legível sobre a cor 1.
- Prévia na hora, com os dados reais do evento e com o layout já salvo.
- Aviso, sem impedir o salvamento, quando o título não contrasta com a cor 1, ou quando o texto não contrasta com a cor 1 ou com a cor 2.
- Volta de cada cor ao padrão, e volta de todas de uma vez.
- Página pública no último tema salvo.
- Eventos que já existem deixam de usar a cor de fundo antiga e a cor de botão antiga.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Cor de botão escolhida separada da cor 1.
- Aviso porque a cor 1 e a cor 2 estão parecidas. O padrão confirmado é um par próximo de propósito, e esse aviso apareceria em todo evento.
- Impedir o salvamento por contraste baixo.
- Aplicar cor de título ou cor de texto no layout **Somente imagem**.
- Pedir cores na criação do evento.
- Colorir o painel do organizador.
- Colorir o campo de nome (rótulo, caixa, placeholder e erro).
- Colorir avisos de sucesso ou de erro da confirmação, o texto “Confirmação indisponível” e a página “Evento indisponível”.
- Colorir bordas e divisórias.
- Recolorir a imagem do evento.
- Paletas prontas, imagem de fundo, logo ou troca de fonte.
- Terceiro layout, ou mais de um layout ao mesmo tempo.
- Tema diferente por convidado.
- Modo escuro próprio do evento.

## 7. Regras de negócio

- Regra 1: O tema é **por evento**. Um evento não altera o visual de outro.
- Regra 2: O fundo publicado é um gradiente vertical. A cor 1 ocupa o topo. A cor 2 ocupa a base. A transição vai da cor 1 para a cor 2.
- Regra 3: O padrão do fundo é cor 1 `#F3F5F7` e cor 2 `#E0E1DD`. O padrão do título é `#0D1B2A`. O padrão do texto é `#0D1B2A`. Evento novo nasce nesse padrão, sem pedir cores na criação.
- Regra 4: Ao entrar esta feature, a cor de fundo de uma cor só que já estava salva deixa de valer. A cor de botão que já estava salva também deixa de valer. Todo evento passa a exibir o gradiente padrão até o organizador salvar outra combinação. A cor de título já salva permanece e passa a pintar só o nome do evento.
- Regra 5: A cor de texto é nova. Nenhum evento tem cor de texto personalizada ao entrar esta feature. Os textos que ela cobre nascem em `#0D1B2A`, mesmo que antes acompanhassem a cor do título ou um tom mais suave.
- Regra 6: Cor 1, cor 2, título e texto são independentes. Dá para personalizar uma e deixar as outras no padrão.
- Regra 7: O botão **confirmo**, quando estiver visível, usa a cor 1 efetiva (personalizada ou padrão). Não existe escolha separada de cor de botão. O texto desse botão é claro ou escuro, o que tiver melhor leitura sobre a cor 1. Se os dois empatarem, o texto é claro, como o produto já faz hoje.
- Regra 8: Fundo e botão valem no layout **Personalizado** e no layout **Somente imagem**.
- Regra 9: Título e texto valem só no layout **Personalizado**. No layout **Somente imagem**, o nome do evento, os detalhes, a data, o horário e o local não estão na página. A frase “Confirmação de presença” permanece no visual atual do produto, sem usar a cor de texto.
- Regra 10: No layout **Personalizado**, a cor de título pinta somente o nome do evento. A cor de texto pinta: os detalhes, quando existirem; a linha de data e horário; o local; a frase “Confirmação de presença”.
- Regra 11: O campo de nome, os avisos de sucesso e de erro, “Confirmação indisponível”, “Evento indisponível”, bordas e divisórias não mudam de cor por causa do tema. A imagem não é recolorida.
- Regra 12: A prévia mostra o rascunho e o layout já salvo. A página pública, a lista e a prévia não usam um layout ainda não salvo. A página pública só muda depois que o tema é salvo, ou quando o organizador restaura tudo ao padrão.
- Regra 13: O aviso de contraste não bloqueia o salvamento. Ele usa as cores efetivas (personalizada ou padrão). Referência verificável: razão de contraste inferior a 4,5:1. Os casos são: título contra a cor 1; texto contra a cor 1; texto contra a cor 2. Não há aviso entre a cor 1 e a cor 2.
- Regra 14: Os avisos de título e de texto só aparecem quando o layout já salvo é **Personalizado**, porque só nesse layout essas cores estão na página.
- Regra 15: “Redefinir tema” restaura cor 1, cor 2, título e texto de uma vez, grava essa restauração e passa a valer na página pública. Não pede uma segunda confirmação. O botão acompanha a cor 1 restaurada.
- Regra 16: Cada uma das quatro cores pode voltar ao padrão sozinha, sem desfazer as outras. Essa volta individual só entra na página pública quando o organizador salva.
- Regra 17: Só o organizador autenticado altera o tema. O convidado não edita cores.
- Regra 18: Link antigo que redireciona para o trecho atual mostra o tema do evento atual.
- Regra 19: Página de evento inexistente ou excluído não tem tema. Continua “Evento indisponível” no visual atual.
- Regra 20: Trocar o layout do evento não apaga as cores já salvas. No **Somente imagem** elas ficam guardadas e sem efeito visual de título e texto. Ao voltar para **Personalizado** e salvar o layout, título e texto voltam a aparecer.

## 8. Fluxos principais

### Fluxo 1 — Evento no tema padrão

1. O organizador cria o evento como já faz hoje, sem escolher cores.
2. O evento fica no gradiente padrão: `#F3F5F7` em cima, `#E0E1DD` embaixo.
3. No layout **Personalizado**, o nome do evento, os detalhes, a data e o horário, o local e a frase “Confirmação de presença” nascem em `#0D1B2A`.
4. O botão **confirmo** nasce na cor 1, com texto escuro, porque a cor 1 padrão é clara.
5. O convidado vê esse visual no link.

### Fluxo 2 — Organizador personaliza o tema

1. Na área do evento já criado, o organizador abre a personalização do tema, separada da edição dos dados.
2. Vê cor 1, cor 2 e, se o layout salvo for **Personalizado**, também título e texto. Vê a prévia com os dados reais daquele evento.
3. Altera as cores que quiser. A prévia atualiza na hora. O botão da prévia usa a cor 1 do rascunho.
4. Se o layout salvo for **Personalizado** e o título ou o texto ficarem difíceis de ler nas cores indicadas na regra 13, o sistema avisa e continua permitindo salvar.
5. O organizador salva.
6. A página pública daquele evento passa a usar o tema salvo. O painel continua no visual do produto.

### Fluxo 3 — Layout Somente imagem

1. O organizador abre a personalização de um evento cujo layout salvo é **Somente imagem**.
2. Ajusta cor 1 e cor 2. Não há escolha de título nem de texto nessa tela, porque essas cores não entram nesse layout.
3. A prévia mostra a imagem, o gradiente e a confirmação. A frase “Confirmação de presença” fica no visual atual. O botão usa a cor 1.
4. Ao salvar, a página pública segue esse gradiente e esse botão. Título e texto que já estivessem salvos permanecem guardados, sem aparecer.

### Fluxo 4 — Volta ao padrão

1. Na personalização, o organizador aciona “Redefinir tema”.
2. Cor 1, cor 2, título e texto voltam ao padrão. A prévia e a página pública acompanham. O botão volta a usar a cor 1 padrão.
3. Não é preciso salvar de novo.

### Fluxo 5 — Convidado abre a página

1. O convidado abre o link do evento.
2. Vê o gradiente do tema salvo, ou o gradiente padrão.
3. Se o layout for **Personalizado**, vê o título na cor de título e as demais informações na cor de texto.
4. Se o layout for **Somente imagem**, vê a imagem, o gradiente e a confirmação no visual de texto atual do produto.
5. O botão **confirmo**, quando a confirmação está aberta, está na cor 1.

## 9. Critérios de aceite

- O organizador consegue criar um evento sem escolher cores, e a página pública nasce no gradiente padrão, com título e texto em `#0D1B2A` no layout **Personalizado**, e com o botão na cor 1.
- Um evento que já tinha fundo ou botão personalizados deixa de exibir essas cores antigas e passa a exibir o gradiente padrão até um novo salvamento.
- Uma cor de título já salva continua valendo, e pinta só o nome do evento no layout **Personalizado**.
- O organizador consegue escolher cor 1, cor 2, título e texto, ver a prévia na hora e salvar.
- O organizador consegue personalizar só algumas dessas cores; as demais ficam no padrão.
- O botão **confirmo** usa a cor 1 nos dois layouts. Não há campo separado de cor de botão.
- O texto do botão permanece legível sobre a cor 1.
- No layout **Somente imagem**, a página não usa cor de título nem cor de texto. A frase “Confirmação de presença” permanece no visual atual.
- O sistema avisa, sem bloquear, quando o título não contrasta com a cor 1, ou quando o texto não contrasta com a cor 1 ou com a cor 2, no layout **Personalizado**.
- O sistema não avisa só porque a cor 1 e a cor 2 estão parecidas.
- O organizador consegue voltar uma cor ao padrão e consegue redefinir as quatro de uma vez, com a página pública acompanhando a redefinição geral.
- O campo de nome, os avisos de confirmação e o painel não mudam de cor por causa do tema.
- Quando o organizador altera cores e sai sem salvar, a página pública continua no último tema salvo.

## 10. Stack

A feature usa o que o projeto já tem: Next.js, React, TypeScript, Tailwind, shadcn, React Hook Form, Zod e Supabase (autenticação do organizador e persistência do evento). A página pública por link, os layouts **Personalizado** e **Somente imagem**, e a personalização de tema na área do evento já existem. Não entra serviço, banco ou biblioteca de plataforma novos.

## 11. Justificativa da stack

O tema já é um dado do evento e uma variação da página pública. Autenticação, evento, layout, link e confirmação já estão resolvidos. Esta feature muda quais cores existem, onde cada uma aparece e como o fundo é pintado. Incluir outra stack não muda o que o organizador ou o convidado conseguem fazer.

## 12. Fases de construção

### Fase 1 — Tema em gradiente

Objetivo: o organizador define o gradiente, o título e o texto, com prévia e avisos, e o convidado vê esse tema na página pública conforme o layout.
Specs:

- Spec 01 — Personalizar gradiente, título e texto
- Spec 02 — Aplicar o tema na página pública

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Personalizar gradiente, título e texto

- **Fase:** Fase 1 — Tema em gradiente
- **Objetivo (o quê):** Permitir que o organizador, num evento já criado, defina a cor 1, a cor 2, a cor do título e a cor do texto, veja a prévia, seja avisado se título ou texto ficarem difíceis de ler, salve ou volte ao padrão.
- **Intenção (por quê):** O organizador precisa experimentar o convite antes de publicar, separar a cor do nome do evento da cor das outras informações, e contar com um gradiente padrão sem ser obrigado a configurar nada.
- **Contexto:** O produto já personaliza o tema na área do evento, separado dos dados, do link e da janela de confirmação. Hoje existem três escolhas: fundo de uma cor só, título (que também pinta os outros textos) e botão. Existem dois layouts, **Personalizado** e **Somente imagem**. A prévia já usa o layout e a imagem já salvos, e o botão da prévia já diz **confirmo**. A criação do evento não ganha campos de cor. Esta spec substitui aquele conjunto de escolhas.
- **Atores:** Organizador autenticado.
- **Descrição do comportamento:** Na área do evento, o organizador abre a personalização do tema. Vê a cor 1 e a cor 2, cada uma na cor efetiva: a personalizada, se existir, ou a do padrão. Se o layout já salvo for **Personalizado**, vê também título e texto, do mesmo modo. Se o layout já salvo for **Somente imagem**, título e texto não aparecem como escolha; as cores de título e de texto que já estiverem salvas permanecem guardadas. A prévia redesenha na hora. O fundo da prévia é o gradiente do rascunho, cor 1 em cima e cor 2 embaixo. O botão **confirmo** da prévia usa a cor 1 do rascunho, com texto claro ou escuro conforme a regra 7. No layout **Personalizado**, a prévia pinta só o nome do evento com a cor de título e pinta detalhes, linha de data e horário, local e “Confirmação de presença” com a cor de texto. O campo de nome da prévia permanece no visual atual. Se os detalhes estiverem vazios, a prévia não inventa texto. No layout **Somente imagem**, a prévia mostra a imagem já salva, o gradiente e a confirmação; “Confirmação de presença” fica no visual atual. Os avisos da regra 13 aparecem só no layout **Personalizado** e não bloqueiam salvar. Salvar grava cor 1, cor 2, título e texto e confirma o sucesso. “Redefinir tema” zera as quatro, grava na hora e atualiza a prévia. Fechar ou sair sem salvar descarta o rascunho.
- **Entradas e saídas:** Entradas: evento já existente; cor 1, cor 2, cor de título e cor de texto, cada uma opcional; ação de salvar; ação de restaurar uma cor ao padrão; ação de restaurar as quatro. Saídas: prévia do rascunho; avisos de contraste, quando couberem; tema salvo; confirmação de sucesso ou mensagem de falha; página pública inalterada até um salvamento ou até a restauração geral.
- **Dados/entidades envolvidos (conceitual):** O tema visual do evento passa a ter quatro informações opcionais: cor 1 do fundo, cor 2 do fundo, cor do título e cor do texto. “Ausente” significa o padrão daquela posição. Não há cor de botão armazenada: o botão é a cor 1 efetiva. O rascunho da tela não é o tema publicado. A cor de fundo antiga, de uma cor só, e a cor de botão antiga não fazem mais parte do tema publicado.
- **Estados e transições:** Cada uma das quatro cores está em **padrão** ou **personalizada**. O conjunto publicado muda para o rascunho quando o organizador salva com sucesso. A restauração geral coloca as quatro em **padrão**, grava e publica nesse momento. Falha ao salvar ou ao restaurar mantém o último conjunto publicado. Sair sem salvar mantém o publicado e descarta o rascunho. Trocar o layout não muda essas quatro cores.
- **Regras de negócio:** Valem as regras 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17 e 20 da seção 7. A criação do evento não coleta cores. A edição dos dados do evento não é o lugar das cores. Textos sugeridos dos avisos, cada um só quando aquele par falhar: “O título pode ficar difícil de ler sobre a cor de cima. Você ainda pode salvar.” “O texto pode ficar difícil de ler sobre a cor de cima. Você ainda pode salvar.” “O texto pode ficar difícil de ler sobre a cor de baixo. Você ainda pode salvar.” Mais de um aviso pode aparecer ao mesmo tempo.
- **Validações:** Só o organizador autenticado salva ou restaura. O evento precisa existir e ser um evento do organizador. Cada valor enviado precisa ser uma cor utilizável; valor vazio ou ausente significa “padrão” naquela posição, não um erro. Cor inválida não é gravada: a tela informa o problema e mantém o último valor válido daquela escolha. No layout **Somente imagem**, salvar não exige título nem texto; se esses valores já existirem, continuam guardados.
- **Fluxo do usuário (passo a passo):**
  1. O organizador entra na área de um evento já criado.
  2. Abre a personalização do tema, fora do formulário de dados do evento.
  3. Vê a prévia e as cores efetivas que aquele layout permite editar.
  4. Ajusta as cores. A prévia acompanha. Os avisos aparecem ou somem conforme a regra 13.
  5. Salva, ou aciona a volta de tudo ao padrão, ou sai sem salvar.
- **Casos de borda e erros:**
  - Evento sem nenhuma cor personalizada: a tela abre no gradiente padrão e, no layout **Personalizado**, título e texto no padrão, sem aviso de contraste.
  - Evento que tinha fundo de uma cor só ou cor de botão: a tela abre como se essas duas não existissem. Vale o gradiente padrão, até o organizador salvar outra coisa. A cor de título antiga, se houver, continua preenchida.
  - Só algumas cores personalizadas: a prévia mistura essas cores com o padrão das demais. O botão usa a cor 1 efetiva, não uma cor de botão antiga.
  - Layout **Somente imagem**: não há campos de título e de texto, nem aviso desses pares. A prévia não pinta “Confirmação de presença” com a cor de texto.
  - Contraste baixo de título ou de texto, no layout **Personalizado**: o aviso correspondente aparece e o salvamento é aceito.
  - Cor 1 igual ou muito próxima da cor 2: não há aviso por isso. O botão fica na cor 1 mesmo assim.
  - Restaurar só uma cor ao padrão: as outras permanecem; a página pública só muda quando salvar.
  - Restaurar as quatro: grava na hora; se a gravação falhar, a tela explica e o publicado continua o anterior até uma nova tentativa bem-sucedida.
  - Sair com rascunho não salvo: nada é publicado.
  - Falha ao salvar: mensagem clara, rascunho preservado na tela, tema publicado intacto.
  - Sem sessão: a personalização não abre e nada é gravado.
  - Evento inexistente ou que o organizador não administra: a ação não grava tema.
- **Impacto no existente:** A criação de evento, a edição de dados, o link, a janela de confirmação e a troca de layout continuam iguais. A personalização deixa de oferecer fundo sólido e cor de botão. A cor de título deixa de representar os outros textos. Eventos já criados perdem o uso da cor de fundo antiga e da cor de botão antiga. A cor de título já salva permanece, com alcance menor. O painel não muda de cor.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento sem cores personalizadas no layout **Personalizado**, quando o organizador abre a personalização, então cor 1 é `#F3F5F7`, cor 2 é `#E0E1DD`, título e texto são `#0D1B2A`, a prévia mostra esse gradiente, o botão está na cor 1 e não há aviso de contraste.
  - Dado um evento que tinha fundo ou botão personalizados, quando o organizador abre a personalização pela primeira vez depois desta feature, então o fundo exibido é o gradiente padrão e não há cor de botão independente.
  - Dado um evento com cor de título já salva, quando o organizador abre a personalização no layout **Personalizado**, então essa cor continua no título e os outros textos da prévia usam a cor de texto, que nasce no padrão se nunca foi salva.
  - Dado a tela no layout **Personalizado**, quando o organizador muda só a cor 1, então a prévia muda o topo do gradiente e o botão na hora, e cor 2, título e texto continuam como estavam.
  - Dado título e cor 1 com contraste inferior a 4,5:1, quando a tela atualiza no layout **Personalizado**, então o aviso do título é exibido e o salvamento permanece disponível.
  - Dado texto e cor 2 com contraste inferior a 4,5:1, quando a tela atualiza no layout **Personalizado**, então o aviso do texto sobre a cor de baixo é exibido e o salvamento permanece disponível.
  - Dado cor 1 e cor 2 com contraste inferior a 4,5:1 e título e texto legíveis, quando a tela atualiza, então nenhum aviso é exibido só por causa desse par.
  - Dado o layout salvo **Somente imagem**, quando o organizador abre a personalização, então não há escolha de título nem de texto, a prévia usa o gradiente e o botão na cor 1, e “Confirmação de presença” permanece no visual atual.
  - Dado um rascunho válido, quando o organizador salva com sucesso, então aquele tema fica publicado e a tela confirma o sucesso.
  - Dado alterações ainda não salvas, quando o organizador sai da personalização, então o tema publicado permanece o último salvo.
  - Dado um tema personalizado publicado, quando o organizador redefine o tema, então as quatro cores ficam no padrão, a prévia mostra esse padrão e isso fica publicado sem um segundo salvamento.
  - Dado uma cor inválida, quando o organizador tenta salvar, então o sistema não grava essa cor e informa o problema.
  - Dado um visitante sem sessão, quando tenta personalizar o tema, então o sistema não grava nada.
- **Definição de pronto:** Na área de um evento existente, o organizador pré-visualiza e salva cor 1, cor 2, título e texto conforme o layout, vê aviso só nos pares da regra 13, e restaura o padrão com um clique. O botão da prévia é a cor 1. Criar evento não pede cores. Fundo antigo e botão antigo não voltam a aparecer. Falha de gravação não publica o rascunho.
- **Dependências:** Nenhuma. A página pública passar a refletir o tema salvo é a Spec 02; esta spec entrega o tema publicado e a prévia.
- **Fora do escopo desta spec:** Renderizar o tema para o convidado no link público. Colorir o painel. Incluir cores na criação do evento. Oferecer cor de botão independente. Avisar semelhança entre cor 1 e cor 2. Alterar o campo de nome.

### Spec 02 — Aplicar o tema na página pública

- **Fase:** Fase 1 — Tema em gradiente
- **Objetivo (o quê):** A página pública usa o tema salvo: gradiente no fundo, botão na cor 1 em qualquer layout, e título e texto só no layout **Personalizado**, caindo no padrão em cada cor que não foi personalizada.
- **Intenção (por quê):** A personalização só tem valor quando o convidado vê o convite com essas cores. Quem não personalizou vê o gradiente padrão, não o fundo sólido antigo.
- **Contexto:** A página pública já mostra, no layout **Personalizado**, o nome do evento, os detalhes se houver, a linha de data e horário, o local, a frase “Confirmação de presença”, o campo de nome e o botão **confirmo**. No layout **Somente imagem**, mostra a imagem e a confirmação, sem o bloco de título, detalhes, data e local. Também já trata link antigo, confirmação encerrada (“Confirmação indisponível”) e evento inexistente (“Evento indisponível”). O tema publicado vem da Spec 01. O campo de nome, os alertas e as mensagens de indisponibilidade permanecem no visual atual.
- **Atores:** Convidado, sem login. O organizador também vê essa página se abrir o link.
- **Descrição do comportamento:** Ao abrir o link atual do evento, a página pinta o fundo inteiro com o gradiente: cor 1 no topo, cor 2 na base, ou o padrão de cada ponta que não foi personalizada. O botão **confirmo**, quando estiver visível, usa a cor 1 efetiva. O texto do botão é claro ou escuro, o que for mais legível sobre essa cor; em empate, claro. No layout **Personalizado**, o nome do evento usa a cor de título efetiva e os detalhes, a linha de data e horário, o local e “Confirmação de presença” usam a cor de texto efetiva. No layout **Somente imagem**, a imagem permanece sem recolorir, o gradiente e o botão seguem o tema, e “Confirmação de presença” fica no visual atual, sem a cor de texto. O restante — campo de nome, bordas, divisórias, alertas e “Confirmação indisponível” — fica no visual atual. Se a confirmação estiver encerrada, o gradiente continua; no layout **Personalizado**, as cores de título e de texto continuam nos textos que ainda estão na página; não há botão para colorir. Link antigo redireciona e a página de destino usa o tema do evento. Evento inexistente ou excluído mostra “Evento indisponível” no visual atual, sem tema.
- **Entradas e saídas:** Entrada: o evento aberto pelo link, o layout salvo e o tema publicado (cada cor personalizada ou padrão). Saída: a página pública com gradiente, botão e, no layout **Personalizado**, título e texto conforme esse tema. Não há saída editável para o convidado.
- **Dados/entidades envolvidos (conceitual):** As quatro cores opcionais do evento descritas na Spec 01, mais o layout já salvo. Ausência de personalização em qualquer posição significa o padrão daquela posição. A cor 1 efetiva também é a cor do botão. Nenhum dado novo é gravado nesta spec. A cor de fundo antiga e a cor de botão antiga não são lidas para pintar a página.
- **Estados e transições:** Não se aplica como fluxo de status. A página reflete o último tema publicado e o layout já salvo. Enquanto um rascunho da Spec 01 não foi salvo, esta página não muda. A restauração geral da Spec 01, por já publicar, passa a ser o que esta página mostra.
- **Regras de negócio:** Valem as regras 1 a 11, 18 e 19 da seção 7, mais a regra 12 no que diz respeito a só o publicado aparecer aqui. O texto do botão não é uma cor escolhida pelo organizador. Detalhes vazios continuam omitidos. A imagem não muda de cor.
- **Validações:** Se alguma cor publicada estiver inutilizável, aquela posição é exibida no padrão e as outras cores válidas continuam valendo. A página pública não oferece controle para o convidado corrigir ou escolher cor.
- **Fluxo do usuário (passo a passo):**
  1. O convidado abre o link recebido.
  2. Se o trecho for antigo, chega ao link atual.
  3. Vê a página com o gradiente publicado, ou o gradiente padrão, e o botão na cor 1 quando a confirmação está aberta.
  4. No layout **Personalizado**, vê o nome do evento na cor de título e as outras informações na cor de texto.
  5. Informa o nome no campo que continua no visual atual e usa o botão **confirmo** quando a confirmação está aberta.
- **Casos de borda e erros:**
  - Nenhuma cor personalizada: gradiente padrão, título e texto padrão no layout **Personalizado**, botão na cor 1 padrão.
  - Fundo ou botão antigos ainda guardados de antes desta feature: a página não os usa. Mostra o gradiente padrão até um tema novo ser salvo.
  - Só a cor de título personalizada, layout **Personalizado**: só o nome do evento muda; detalhes, data, horário, local e “Confirmação de presença” ficam na cor de texto padrão.
  - Layout **Somente imagem** com título e texto personalizados: essas cores não aparecem. Gradiente e botão aparecem. “Confirmação de presença” fica no visual atual.
  - Cor 1 clara: o texto do botão fica escuro. Cor 1 escura: o texto fica claro.
  - Confirmação encerrada: o gradiente aparece; no layout **Personalizado**, título e texto do tema aparecem nos textos que continuam na página; “Confirmação indisponível” permanece no visual atual; não há botão.
  - Sucesso ou erro ao confirmar: os alertas permanecem no visual atual, sobre a página já tematizada.
  - Cor publicada inválida numa posição: só essa posição cai no padrão.
  - Evento indisponível: sem tema do evento.
- **Impacto no existente:** O fluxo de confirmar presença, a janela de confirmação, o redirecionamento de link antigo, a imagem e a mensagem de evento indisponível continuam iguais. Muda o fundo, de sólido para gradiente; o botão passa a seguir a cor 1; a cor de título deixa de pintar os outros textos; esses outros textos passam a ter cor própria no layout **Personalizado**.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento sem cores personalizadas no layout **Personalizado**, quando o convidado abre o link, então o fundo vai de `#F3F5F7` em cima a `#E0E1DD` embaixo, o nome do evento e as informações de texto estão em `#0D1B2A`, e o botão **confirmo** está na cor 1.
  - Dado um evento que só tinha a cor de fundo antiga ou a cor de botão antiga, quando o convidado abre o link, então essas cores não aparecem e a página usa o gradiente padrão, com o botão na cor 1 padrão.
  - Dado cor 1 e cor 2 personalizadas, quando o convidado abre o link em qualquer layout, então o topo usa a cor 1, a base usa a cor 2 e o botão **confirmo** usa a cor 1.
  - Dado cor de título e cor de texto personalizadas no layout **Personalizado**, quando o convidado abre o link, então só o nome do evento usa a cor de título, e detalhes, linha de data e horário, local e “Confirmação de presença” usam a cor de texto.
  - Dado o layout **Somente imagem** e cores de título e de texto salvas, quando o convidado abre o link, então a imagem não é recolorida, o gradiente e o botão seguem o tema, e “Confirmação de presença” permanece no visual atual.
  - Dado uma cor 1 clara, quando a página mostra o botão, então o texto do botão é escuro e legível. Dado uma cor 1 escura, então o texto é claro e legível.
  - Dado um tema personalizado, quando o convidado olha o campo de nome, então rótulo, caixa e texto do campo permanecem no visual atual.
  - Dado um tema personalizado e a confirmação encerrada no layout **Personalizado**, quando o convidado abre o link, então o gradiente e as cores de título e de texto aparecem, e “Confirmação indisponível” permanece no visual atual.
  - Dado um link antigo do evento, quando o convidado o abre, então chega à página atual já com o tema daquele evento.
  - Dado um link de evento inexistente, quando o visitante abre, então vê “Evento indisponível” no visual atual.
  - Dado um rascunho ainda não salvo na área do organizador, quando o convidado abre a página, então vê o último tema publicado, não o rascunho.
- **Definição de pronto:** A página pública mostra o gradiente e o botão na cor 1; no layout **Personalizado**, separa cor de título e cor de texto; no layout **Somente imagem**, não aplica essas duas cores. Campo de nome, alertas e estados de indisponibilidade não herdam cor nova. Fundo antigo e botão antigo não aparecem.
- **Dependências:** Spec 01 — é necessário o tema publicado do evento (cada cor personalizada ou padrão), incluindo a restauração geral já gravada, e o layout já salvo.
- **Fora do escopo desta spec:** A tela em que o organizador escolhe as cores, a prévia e os avisos de contraste. Qualquer mudança de cor no painel. Novos campos na confirmação de presença. Cor de botão independente.

## 14. Ordem recomendada de implementação

1. Spec 01 — Personalizar gradiente, título e texto
2. Spec 02 — Aplicar o tema na página pública

A Spec 01 publica o tema e já permite validar prévia, avisos e restauração, inclusive o descarte do fundo antigo e da cor de botão antiga. A Spec 02 só tem o que mostrar ao convidado depois que esse tema publicado existe. Seguir essa ordem evita pintar a página pública sem a regra do que é rascunho, do que é padrão e do que já foi salvo.
