# PRD — Tema visual da página do evento

> Tipo: PRD de feature · Data: 2026-10-01
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

O organizador pode personalizar o visual da **página pública de um evento** com até três cores: o fundo da página, a cor do título e a cor do botão **“Eu vou!”**.

Se ele não escolher nada, a página continua no **tema padrão** — o visual que a página pública já tem hoje. A personalização é de cada evento e não altera o painel do organizador.

A cor do título também pinta os outros textos da página pública (a frase “Confirmação de presença”, os detalhes e data, horário e local). O campo de nome não muda. O texto do botão se ajusta sozinho para continuar legível sobre a cor escolhida.

## 2. Problema que resolve

A página pública é igual para todos os eventos. O organizador não consegue aproximar o convite da identidade da ocasião (uma festa, uma reunião, um encontro) sem sair do produto.

Hoje a única saída seria montar o convite em outra ferramenta. Esta feature permite ajustar as três cores no próprio evento, com uma prévia, sem obrigar quem prefere o visual atual a configurar nada.

## 3. Público-alvo

- **Organizador** — única conta do produto. Cria o evento, e depois, se quiser, ajusta as cores na área daquele evento.
- **Convidado** — só vê o resultado na página pública, sem login e sem escolher cores.

## 4. Objetivo do recorte atual

Cada evento nasce no tema padrão. Na área do evento já criado, o organizador pode definir, pré-visualizar, salvar e restaurar as três cores. A página pública daquele evento passa a usar o tema salvo. Eventos sem personalização permanecem visualmente como estão hoje.

## 5. Funcionalidades

**Essenciais:**

- Tema padrão aplicado sozinho na criação do evento, sem pedir cores.
- Na área do evento, escolha independente de até três cores: fundo, título e botão de confirmação.
- Cor do título aplicada também aos outros textos definidos nesta feature.
- Texto do botão claro ou escuro, o que ficar legível sobre a cor do botão.
- Prévia na própria tela de edição, atualizada na hora.
- Aviso quando fundo e título ficam parecidos demais, sem impedir o salvamento.
- Volta ao tema padrão com um clique.
- Página pública exibe o último tema salvo daquele evento.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Cores no painel do organizador (lista, métricas, edição de dados, link, confirmações).
- Pedir cores no formulário de criação do evento.
- Mais de três cores, paletas prontas, imagem de fundo, logo ou troca de fonte.
- Mudar a cor do campo de nome (rótulo, caixa, placeholder e erro de validação).
- Mudar avisos de sucesso ou de erro da confirmação, o texto “Confirmação indisponível” e a página “Evento indisponível”.
- Mudar bordas e divisórias da página pública.
- Aviso de contraste entre fundo e botão, ou entre botão e título.
- Impedir o salvamento por contraste baixo.
- Tema diferente por convidado.
- Modo escuro próprio do evento. O tema é o que o organizador salvou (ou o padrão), independente de preferência de claro/escuro do aparelho.

## 7. Regras de negócio

- Regra 1: O tema é **por evento**. Um evento não altera o visual de outro.
- Regra 2: Evento novo, e evento já existente sem cores personalizadas, usam o **tema padrão**.
- Regra 3: O tema padrão é o visual atual da página pública: fundo em canvas claro, textos principais em azul-marinho e botão **“Eu vou!”** em azul-marinho com texto claro.
- Regra 4: As três cores são opcionais e independentes. Dá para personalizar uma, duas ou as três. A que não for personalizada permanece no padrão.
- Regra 5: A cor do título vale para: o título do evento, a frase “Confirmação de presença”, os detalhes (quando existirem), os rótulos “Data”, “Horário” e “Local”, e os valores de data, horário e local. Rótulos e valores ficam na mesma cor — não há tom mais suave neste recorte.
- Regra 6: A cor do botão vale só para o botão **“Eu vou!”**. O texto desse botão é escolhido automaticamente entre claro e escuro, o que tiver melhor leitura sobre a cor do botão. **Suposição:** se os dois empatarem, usa texto claro, como no botão padrão.
- Regra 7: O campo de nome permanece no visual atual, mesmo com tema personalizado.
- Regra 8: A prévia mostra o rascunho. A página pública só muda depois que o tema é salvo.
- Regra 9: O aviso de contraste aparece quando a cor de fundo e a cor de título **que serão publicadas** (personalizada ou padrão) não se distinguem o bastante para leitura confortável do título. Referência verificável: razão de contraste inferior a 4,5:1. O aviso não bloqueia o salvamento.
- Regra 10: O aviso não cobre outras combinações. Botão parecido com o fundo, ou botão parecido com o título, pode ser salvo sem aviso.
- Regra 11: “Voltar ao tema padrão” restaura as três cores de uma vez, grava essa restauração e passa a valer na página pública. Não pede uma segunda confirmação.
- Regra 12: Cada cor também pode voltar ao padrão sozinha, sem desfazer as outras. Essa volta individual só entra na página pública quando o organizador salva.
- Regra 13: Só o organizador autenticado altera o tema. O convidado não edita cores.
- Regra 14: Link antigo que redireciona para o trecho atual mostra o tema do evento, não um tema do link antigo.
- Regra 15: Página de evento inexistente ou excluído não tem tema personalizado; continua a mensagem de evento indisponível no visual atual.

## 8. Fluxos principais

### Fluxo 1 — Evento nasce no tema padrão

1. O organizador cria o evento com os dados de sempre (título, data, horário, local e detalhes opcional).
2. O sistema não pede cores.
3. O evento fica no tema padrão.
4. O convidado que abre o link vê a página pública como ela é hoje.

### Fluxo 2 — Organizador personaliza as cores

1. Na área do evento já criado, o organizador abre a personalização do tema, separada da edição dos dados do evento.
2. Vê as três escolhas (fundo, título e botão), cada uma no padrão ou na cor já salva, e uma prévia com os dados reais daquele evento.
3. Altera uma ou mais cores. A prévia atualiza na hora.
4. Se o fundo e o título que estão na prévia ficarem parecidos demais, o sistema avisa e continua permitindo salvar.
5. O organizador salva.
6. A página pública daquele evento passa a usar o tema salvo. O painel continua no visual do produto.

### Fluxo 3 — Organizador volta ao tema padrão

1. Na personalização do tema, o organizador aciona “voltar ao tema padrão”.
2. As três cores voltam ao padrão, a prévia mostra o visual atual do produto e a página pública também volta a esse visual.
3. Não é preciso salvar de novo.

### Fluxo 4 — Convidado abre a página

1. O convidado abre o link do evento.
2. Vê fundo, textos definidos nesta feature e botão conforme o tema salvo, ou o tema padrão se não houver personalização.
3. Preenche o nome no campo que continua no visual atual e confirma, como já faz hoje.

## 9. Critérios de aceite

- O organizador consegue criar um evento sem escolher cores, e a página pública desse evento permanece no tema padrão.
- O organizador consegue, na área de um evento já criado, escolher fundo, título e botão, ver a prévia na hora e salvar.
- O organizador consegue personalizar só uma ou duas cores; as demais ficam no padrão.
- O sistema avisa quando fundo e título ficam difíceis de ler juntos, e mesmo assim permite salvar.
- O sistema não avisa só porque o botão está parecido com o fundo.
- O organizador consegue voltar ao tema padrão com um clique, e a página pública acompanha.
- O convidado vê, na página pública, o fundo, os textos definidos nesta feature e o botão do último tema salvo.
- O texto do botão permanece legível sobre a cor do botão.
- O campo de nome, os avisos de sucesso e erro, e o painel do organizador não mudam de cor por causa do tema.
- Quando o organizador altera cores e sai sem salvar, a página pública continua no último tema salvo.

## 10. Stack

A feature usa o que o projeto já tem: Next.js, React, TypeScript, Tailwind, shadcn, React Hook Form, Zod e Supabase (autenticação do organizador e persistência do evento). A página pública por link e a área do evento no painel já existem e são o lugar desta feature. Não entra serviço, banco ou biblioteca de plataforma novos.

## 11. Justificativa da stack

O tema é um dado opcional do evento e uma variação visual da página pública que já existe. Autenticação, evento, link e confirmação já estão resolvidos. Incluir outra stack só para escolher três cores aumentaria o recorte sem mudar o que o organizador ou o convidado conseguem fazer.

## 12. Fases de construção

### Fase 1 — Tema do evento

Objetivo: o organizador define o tema com prévia e o convidado vê esse tema na página pública, com o padrão preservado quando não houver personalização.
Specs:

- Spec 01 — Personalizar o tema na área do evento
- Spec 02 — Aplicar o tema na página pública

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Personalizar o tema na área do evento

- **Fase:** Fase 1 — Tema do evento
- **Objetivo (o quê):** Permitir que o organizador, num evento já criado, defina até três cores, veja uma prévia, seja avisado se o título ficar difícil de ler no fundo, salve o tema ou volte ao padrão com um clique.
- **Intenção (por quê):** O organizador precisa experimentar o convite antes de publicar a cor, sem ser obrigado a personalizar e sem perder o visual atual quando não quiser mudar nada.
- **Contexto:** O produto já tem criação de evento (título, detalhes opcionais, data, horário e local) e a área do evento no painel, onde hoje se editam os dados, o link e a janela de confirmação. A criação não ganha campos de cor. A personalização fica nessa área do evento, separada da edição dos dados. Eventos já criados entram nesta spec como “sem cores personalizadas”, ou seja, no tema padrão.
- **Atores:** Organizador autenticado.
- **Descrição do comportamento:** Na área do evento, o organizador abre a personalização do tema. Vê três escolhas — fundo, título e botão — e uma prévia. Cada escolha mostra a cor efetiva: a personalizada, se existir, ou a do tema padrão. Ao mudar uma cor, só aquela escolha muda; a prévia redesenha na hora com os dados reais do evento (título, detalhes se houver, data, horário e local) e com o botão **“Eu vou!”**. A prévia também mostra o campo de nome no visual atual, para ficar claro que ele não acompanha o tema. Se os detalhes estiverem vazios, a prévia não inventa um texto no lugar. Se o contraste entre o fundo e o título exibidos na prévia for insuficiente, um aviso aparece na tela de edição e o botão de salvar continua disponível. Salvar grava o tema e confirma o sucesso ao organizador. “Voltar ao tema padrão” zera as três personalizações, grava isso na hora, atualiza a prévia para o visual padrão e dispensa um segundo salvamento. Fechar ou sair sem salvar descarta o rascunho; o tema publicado permanece o último salvo.
- **Entradas e saídas:** Entradas: evento já existente; cor de fundo, cor de título e cor de botão, cada uma opcional; ação de salvar; ação de restaurar uma cor ao padrão; ação de restaurar as três. Saídas: prévia do rascunho; aviso de contraste, quando couber; tema salvo (três cores, cada uma personalizada ou padrão); confirmação de sucesso ou mensagem de falha; página pública inalterada até um salvamento ou até a restauração geral.
- **Dados/entidades envolvidos (conceitual):** O evento passa a ter um tema visual com três informações opcionais: cor de fundo, cor do título e cor do botão. “Ausente” significa tema padrão naquela posição. O tema padrão não é uma quarta paleta configurável: é o visual atual da página pública (fundo canvas claro, textos em azul-marinho, botão azul-marinho com texto claro). O rascunho da tela de edição não é o tema publicado.
- **Estados e transições:** Cada cor está em **padrão** ou **personalizada**. O conjunto publicado muda para o rascunho quando o organizador salva com sucesso. A restauração geral coloca as três em **padrão**, grava e publica nesse momento. Falha ao salvar ou ao restaurar mantém o último conjunto publicado. Sair sem salvar mantém o publicado e descarta o rascunho.
- **Regras de negócio:** Valem as regras 1, 2, 3, 4, 8, 9, 10, 11, 12 e 13 da seção 7. A criação do evento não coleta cores. A edição dos dados do evento (título, detalhes, data, horário, local, link, janela de confirmação) não é o lugar das cores. O aviso usa as cores efetivas da prévia, inclusive quando uma delas ainda é a padrão. Referência do aviso: contraste entre fundo e título inferior a 4,5:1. Texto sugerido do aviso: “O título pode ficar difícil de ler neste fundo. Você ainda pode salvar.”
- **Validações:** Só o organizador autenticado salva ou restaura. O evento precisa existir e ser um evento do organizador. Cada valor enviado precisa ser uma cor utilizável; valor vazio ou ausente significa “padrão” naquela posição, não um erro. Cor inválida não é gravada: a tela informa o problema e mantém o último valor válido daquela escolha.
- **Fluxo do usuário (passo a passo):**
  1. O organizador entra na área de um evento já criado.
  2. Abre a personalização do tema, fora do formulário de dados do evento.
  3. Vê prévia e as três cores efetivas.
  4. Ajusta as cores que quiser. A prévia acompanha. O aviso aparece ou some conforme o contraste entre fundo e título.
  5. Salva, ou aciona a volta de tudo ao padrão, ou sai sem salvar.
- **Casos de borda e erros:**
  - Evento sem nenhuma cor personalizada: a tela abre no tema padrão, sem aviso de contraste.
  - Só uma ou duas cores personalizadas: a prévia mistura essas cores com o padrão das demais.
  - Contraste baixo: o aviso aparece e o salvamento é aceito. A página pública, depois do salvamento, usa essas cores mesmo assim.
  - Botão da mesma cor do fundo, com título legível: não há aviso.
  - Restaurar só uma cor ao padrão: as outras duas permanecem; a página pública só muda quando salvar.
  - Restaurar as três: grava na hora; se a gravação falhar, a tela explica, a prévia pode mostrar a intenção de voltar ao padrão, e o publicado continua o anterior até uma nova tentativa bem-sucedida.
  - Sair com rascunho não salvo: nada é publicado.
  - Falha ao salvar: mensagem clara, rascunho preservado na tela, tema publicado intacto.
  - Sem sessão: a personalização não abre e nada é gravado.
  - Evento inexistente ou de outro contexto que o organizador não administra: a ação não grava tema.
- **Impacto no existente:** A criação de evento e a edição de dados, link e janela de confirmação continuam iguais. Eventos já criados passam a ser tratados como tema padrão até alguém personalizar. O painel em si não muda de cor.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento recém-criado, quando o organizador abre a personalização, então as três cores estão no padrão, a prévia corresponde ao visual atual da página pública e não há aviso de contraste.
  - Dado a tela de personalização, quando o organizador muda só a cor de fundo, então a prévia muda o fundo na hora e título e botão continuam no padrão até que ele os altere.
  - Dado fundo e título com contraste inferior a 4,5:1 na prévia, quando a tela atualiza, então o aviso é exibido e o salvamento permanece disponível.
  - Dado fundo e título com contraste de pelo menos 4,5:1, quando a tela atualiza, então o aviso não é exibido.
  - Dado um botão da mesma cor do fundo e um título legível sobre o fundo, quando a tela atualiza, então nenhum aviso de contraste é exibido.
  - Dado um rascunho válido, quando o organizador salva com sucesso, então aquele tema fica publicado e a tela confirma o sucesso.
  - Dado alterações ainda não salvas, quando o organizador sai da personalização, então o tema publicado permanece o último salvo.
  - Dado um tema personalizado publicado, quando o organizador volta ao tema padrão, então as três cores ficam no padrão, a prévia mostra o visual atual e esse padrão fica publicado sem um segundo salvamento.
  - Dado uma cor inválida, quando o organizador tenta salvar, então o sistema não grava essa cor e informa o problema.
  - Dado um visitante sem sessão, quando tenta personalizar o tema, então o sistema não grava nada.
- **Definição de pronto:** Na área de um evento existente, o organizador pré-visualiza, salva uma, duas ou três cores, vê o aviso só no par fundo/título e restaura o padrão com um clique. Criar evento não pede cores. Falha de gravação não publica o rascunho.
- **Dependências:** Nenhuma. A página pública passar a refletir o tema salvo é a Spec 02; esta spec entrega o tema publicado e a prévia.
- **Fora do escopo desta spec:** Renderizar o tema para o convidado no link público. Colorir o painel. Incluir cores na criação do evento. Avisar contraste de outras duplas além de fundo e título. Alterar o campo de nome.

### Spec 02 — Aplicar o tema na página pública

- **Fase:** Fase 1 — Tema do evento
- **Objetivo (o quê):** A página pública do evento usa o tema salvo: fundo, textos definidos nesta feature e botão de confirmação, caindo no tema padrão em cada cor que não foi personalizada.
- **Intenção (por quê):** A personalização só tem valor quando o convidado vê o convite com as cores escolhidas. Quem não personalizou não pode ver a página mudar.
- **Contexto:** A página pública já mostra a frase “Confirmação de presença”, o título, os detalhes se houver, data, horário, local, o campo de nome e o botão **“Eu vou!”**. Também já trata link antigo (redireciona para o atual), confirmação encerrada (“Confirmação indisponível”) e evento inexistente (“Evento indisponível”). O tema publicado vem da Spec 01. O campo de nome, os alertas de sucesso e erro e as duas mensagens de indisponibilidade permanecem no visual atual.
- **Atores:** Convidado, sem login. O organizador também vê essa página se abrir o link.
- **Descrição do comportamento:** Ao abrir o link atual do evento, a página pinta o fundo inteiro com a cor de fundo do tema, ou com o canvas claro padrão. O título, a frase “Confirmação de presença”, os detalhes (se houver), os rótulos “Data”, “Horário” e “Local” e os valores correspondentes usam a cor do título do tema, ou o azul-marinho padrão. O botão **“Eu vou!”**, quando estiver visível, usa a cor de botão do tema, ou o azul-marinho padrão. O texto do botão é claro ou escuro, o que for mais legível sobre essa cor; em empate, claro. O restante da página — campo de nome, bordas, divisórias, alertas e “Confirmação indisponível” — fica no visual atual. Se a confirmação estiver encerrada, fundo e textos do tema continuam valendo; só não há botão para colorir. Link antigo redireciona e a página de destino usa o tema do evento. Evento inexistente ou excluído mostra “Evento indisponível” no visual atual, sem tentar aplicar tema.
- **Entradas e saídas:** Entrada: o evento aberto pelo link e o tema publicado (cada cor personalizada ou padrão). Saída: a página pública com fundo, textos definidos e botão conforme esse tema. Não há saída editável para o convidado.
- **Dados/entidades envolvidos (conceitual):** As mesmas três cores opcionais do evento descritas na Spec 01. Ausência de personalização em qualquer posição significa o padrão daquela posição. Nenhum dado novo é gravado nesta spec.
- **Estados e transições:** Não se aplica como fluxo de status. A página reflete o último tema publicado. Enquanto um rascunho da Spec 01 não foi salvo, esta página não muda. A restauração geral da Spec 01, por já publicar, passa a ser o que esta página mostra.
- **Regras de negócio:** Valem as regras 1 a 7, 14 e 15 da seção 7, mais a regra 8 (só o publicado aparece aqui). O texto do botão não é uma quarta cor escolhida pelo organizador. Rótulos e valores de data, horário e local usam a cor do título por completo, sem variação mais suave. Detalhes vazios continuam omitidos, não ganham texto padrão.
- **Validações:** Se alguma cor publicada estiver inutilizável, aquela posição é exibida no tema padrão e as outras cores válidas continuam valendo. A página pública não oferece controle para o convidado corrigir ou escolher cor.
- **Fluxo do usuário (passo a passo):**
  1. O convidado abre o link recebido.
  2. Se o trecho for antigo, chega ao link atual.
  3. Vê a página com o tema publicado, ou o tema padrão.
  4. Informa o nome no campo de visual atual e usa o botão **“Eu vou!”** quando a confirmação estiver aberta.
- **Casos de borda e erros:**
  - Nenhuma cor personalizada: a página é visualmente a atual.
  - Só o fundo personalizado: textos e botão permanecem no padrão; o fundo muda.
  - Título personalizado: a frase inicial, o título, os detalhes e data, horário e local acompanham essa cor; rótulos não ficam num tom reduzido.
  - Botão claro: o texto do botão fica escuro. Botão escuro: o texto fica claro.
  - Confirmação encerrada: fundo e textos do tema aparecem; o texto “Confirmação indisponível” permanece no visual atual; não há botão temático.
  - Sucesso ou erro ao confirmar: os alertas permanecem no visual atual, sobre a página já tematizada.
  - Cor publicada inválida numa posição: só essa posição cai no padrão.
  - Evento indisponível: sem tema do evento.
- **Impacto no existente:** O fluxo de confirmar presença, a janela de confirmação, o redirecionamento de link antigo e a mensagem de evento indisponível continuam iguais. Muda apenas a cor dos elementos listados quando existe tema publicado diferente do padrão.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento sem cores personalizadas, quando o convidado abre o link, então fundo, textos e botão permanecem os do tema padrão.
  - Dado um tema salvo com as três cores, quando o convidado abre o link, então o fundo usa a cor de fundo, os textos definidos nesta feature usam a cor do título e o botão **“Eu vou!”** usa a cor do botão.
  - Dado só a cor do título personalizada, quando o convidado abre o link, então a frase “Confirmação de presença”, o título, os detalhes (se houver) e data, horário e local usam essa cor, e fundo e botão permanecem no padrão.
  - Dado um botão de cor clara, quando a página renderiza o botão, então o texto do botão é escuro e legível. Dado um botão de cor escura, então o texto é claro e legível.
  - Dado um tema personalizado, quando o convidado olha o campo de nome, então rótulo, caixa e texto do campo permanecem no visual atual.
  - Dado um tema personalizado e a confirmação encerrada, quando o convidado abre o link, então fundo e textos do tema aparecem e “Confirmação indisponível” permanece no visual atual.
  - Dado um link antigo do evento, quando o convidado o abre, então chega à página atual já com o tema daquele evento.
  - Dado um link de evento inexistente, quando o visitante abre, então vê “Evento indisponível” no visual atual.
  - Dado um rascunho ainda não salvo na área do organizador, quando o convidado abre a página, então vê o último tema publicado, não o rascunho.
- **Definição de pronto:** A página pública de um evento com tema salvo mostra fundo, textos definidos e botão conforme esse tema; o texto do botão permanece legível; campo de nome, alertas e estados de indisponibilidade não herdam cor nova; evento sem personalização permanece idêntico ao visual atual.
- **Dependências:** Spec 01 — é necessário o tema publicado do evento (cada cor personalizada ou padrão), incluindo a restauração geral já gravada.
- **Fora do escopo desta spec:** A tela em que o organizador escolhe as cores, a prévia e o aviso de contraste. Qualquer mudança de cor no painel. Novos campos na confirmação de presença.

## 14. Ordem recomendada de implementação

1. Spec 01 — Personalizar o tema na área do evento
2. Spec 02 — Aplicar o tema na página pública

A Spec 01 publica o tema e já permite validar prévia, aviso e restauração. A Spec 02 só tem o que mostrar ao convidado depois que esse tema publicado existe. Seguir essa ordem evita aplicar cor na página pública sem a regra do que é rascunho, do que é padrão e do que já foi salvo.
