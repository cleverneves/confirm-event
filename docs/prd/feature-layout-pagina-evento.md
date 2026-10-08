# PRD — Layout da página do evento

> Tipo: PRD de feature · Data: 2026-10-08
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

Ao criar um evento, e também ao editar um evento já criado, o organizador escolhe como a página pública se apresenta. Há duas opções, com estes nomes:

- **Personalizado** — a página que o produto já tem hoje: faixa opcional, título, detalhes, data, horário e local, e em seguida a confirmação.
- **Somente imagem** — a página pública mostra uma imagem em retrato e, em seguida, a confirmação. Título, detalhes, data, horário e local continuam no painel, para o organizador identificar e administrar o evento, e não aparecem para o convidado.

O botão de confirmação passa a dizer **confirmo** nos dois layouts. Esse texto é o novo padrão de todo evento, inclusive dos que já existem.

**Personalizado** aqui é só o nome do layout. Não substitui o tema de cores (fundo, título e botão), que continua uma escolha à parte.

## 2. Problema que resolve

A página pública tem uma ordem só. O organizador que já desenhou o convite numa arte vertical não tem como publicar essa arte no lugar do bloco de texto. Quem prefere o convite com título, detalhes, data, horário e local também não tem uma escolha explícita: é o único formato.

Esta feature deixa o organizador decidir, na criação e de novo na edição, qual dos dois formatos o convidado vê. Os dados obrigatórios do evento não mudam. Muda o que a página pública exibe.

O botão **Eu vou!** deixa de ser o texto do produto. Os dois layouts usam **confirmo**.

## 3. Público-alvo

- **Organizador** — única conta do produto. Escolhe o layout ao criar o evento e pode trocá-lo na edição. Continua preenchendo título, data, horário e local, e os detalhes se quiser.
- **Convidado** — só vê o resultado na página pública, sem login e sem escolher layout.

## 4. Objetivo do recorte atual

Cada evento tem um layout. Evento novo nasce em **Personalizado**, já selecionado. Evento que já existe também fica em **Personalizado** até o organizador trocar. **Somente imagem** exige uma imagem para ser salvo. A página pública, a lista do painel e a prévia do tema acompanham o layout salvo. O botão de confirmação diz **confirmo** em qualquer evento.

## 5. Funcionalidades

**Essenciais:**

- Duas opções, com os nomes **Personalizado** e **Somente imagem**, na criação e na edição.
- **Personalizado** já vem selecionado na criação. Eventos já existentes permanecem nesse layout até uma troca salva.
- **Personalizado** na página pública: faixa opcional (proporção 4:1, tamanho ideal 1584×396), título, detalhes quando houver texto, data, horário e local, e a confirmação.
- **Somente imagem** na página pública: somente a imagem em retrato (tamanho ideal 700×923) e a confirmação. Título, detalhes, data, horário e local não aparecem nessa página.
- Título, data, horário e local continuam obrigatórios no formulário, nos dois layouts. Detalhes continuam opcionais.
- Imagem de **Somente imagem** obrigatória para salvar. Mesma tolerância da faixa: jpg ou png, até 8 MB, aviso se a proporção fugir, salvamento permitido quando houver arquivo aceito.
- Troca de layout só vale depois de salvar. A imagem já salva não serve para o outro layout: o organizador envia outra. Na ida para **Somente imagem**, sem arquivo novo o salvamento é recusado. Na volta para **Personalizado**, dá para salvar sem imagem.
- Sair sem salvar mantém o layout e a imagem anteriores.
- Botão **confirmo** nos dois layouts, também na prévia do tema, inclusive em eventos que já existiam.
- Card da lista: faixa 4:1 quando o layout salvo é **Personalizado** e há imagem; imagem em retrato quando o layout salvo é **Somente imagem**.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Terceiro layout, ou mais de um layout ao mesmo tempo no mesmo evento.
- Guardar a faixa e o retrato juntos. O evento continua com no máximo uma imagem.
- Reaproveitar a imagem já salva ao trocar de layout.
- Tornar título, data, horário ou local opcionais, ou escondê-los do formulário no layout **Somente imagem**.
- Mostrar título, detalhes, data, horário ou local na página pública de **Somente imagem**.
- Exigir a imagem no layout **Personalizado**.
- Impedir o salvamento só porque a proporção não é a ideal.
- Recortar, filtrar ou editar a imagem dentro do produto.
- Formatos que não sejam jpg ou png, e arquivo maior que 8 MB.
- Texto de botão diferente por layout, ou manter **Eu vou!** em algum evento.
- Convidado escolher o layout.
- Mudar o que a confirmação grava, a janela de confirmação, o campo de nome, os avisos de sucesso e de erro, ou o texto **Confirmação indisponível**.
- Mudar as regras do tema de cores: quais cores existem, o aviso de contraste, a cor do campo de nome e a volta ao tema padrão.
- Escolher o layout dentro da tela de tema. A prévia do tema só reflete o layout já salvo.
- Miniatura em outra tela do painel que não o card da lista.
- Layout na página **Evento indisponível**.

## 7. Regras de negócio

- Regra 1: O layout é **por evento**. Um evento não altera o layout de outro.
- Regra 2: Os nomes visíveis são exatamente **Personalizado** e **Somente imagem**. **Personalizado** é o layout com faixa e textos. **Somente imagem** é o layout em que o convidado vê a imagem e a confirmação. Nenhum dos dois nomes redesigna o tema de cores.
- Regra 3: Evento novo começa com **Personalizado** selecionado. Evento já existente, que nunca teve essa escolha, é **Personalizado** até o organizador salvar a outra opção.
- Regra 4: Título, data, horário e local continuam obrigatórios nos dois layouts, com as regras que o produto já aplica (inclusive data que não pode ser gravada no passado, com a exceção já existente quando a data do evento já passou). Detalhes continuam opcionais. O layout não muda o que o painel guarda nem o que a lista usa para identificar o evento: título, data, horário e local seguem no card.
- Regra 5: **Personalizado** na página pública segue a ordem atual: faixa somente se houver imagem; título; detalhes somente se houver texto; data, horário e local; confirmação. Sem imagem, não há faixa nem espaço vazio.
- Regra 6: **Somente imagem** na página pública mostra a imagem e, em seguida, a confirmação. Título, detalhes, data, horário e local não entram nessa página, mesmo preenchidos. Não há bloco de texto escondido nem espaço reservado para eles.
- Regra 7: A faixa de **Personalizado** continua opcional, jpg ou png, no máximo 8 MB, proporção de referência 4:1, tamanho ideal 1584×396. Fora de 4:1, o organizador vê o aviso de que a imagem pode ficar desconfigurada e pode salvar. Arquivo inválido não é gravado. Um pixel de diferença não dispara o aviso. Na página, a faixa acompanha a largura do conteúdo do convite, mantém 4:1 e a imagem preenche o espaço.
- Regra 8: A imagem de **Somente imagem** é obrigatória para salvar esse layout. Vale a mesma tolerância da faixa: jpg ou png, no máximo 8 MB, aviso se a proporção fugir, salvamento permitido quando o arquivo foi aceito. A proporção de referência é 700:923. O tamanho ideal informado ao organizador é 700×923 pixels. Outro tamanho na mesma proporção é aceito sem aviso. Um pixel de arredondamento não dispara o aviso. **Suposição:** 700×923 é o tamanho ideal do arquivo, não a medida fixa na tela; a imagem acompanha a largura do conteúdo do convite, mantém a proporção 700:923 e preenche essa área. Fora da proporção, ela fica esticada, e é isso que o aviso chama de desconfigurada. O convidado não vê o aviso.
- Regra 9: Continua havendo no máximo uma imagem por evento. Enviar outra substitui a anterior somente depois que o organizador salva.
- Regra 10: A imagem já salva só continua valendo se, ao salvar, o layout escolhido for o mesmo que já estava salvo, o organizador não tiver pedido para removê-la e não tiver escolhido um arquivo novo.
- Regra 11: Se o layout escolhido ao salvar for diferente do layout já salvo, a imagem anterior não é reaproveitada. Para gravar **Somente imagem**, é obrigatório um arquivo novo aceito naquela ação. Para gravar **Personalizado**, um arquivo novo aceito vira a faixa; sem arquivo, o evento fica sem imagem.
- Regra 12: Sair sem salvar não muda o layout nem a imagem já gravados. Arquivo recusado também não muda o que já estava gravado: o salvamento inteiro daquela tentativa não conclui a troca.
- Regra 13: No layout **Personalizado**, remover a imagem e salvar deixa o evento sem imagem, como hoje. No layout **Somente imagem**, salvar sem imagem é recusado, com explicação de que esse layout precisa de uma imagem. A imagem anterior permanece.
- Regra 14: Se o organizador muda a opção e, antes de salvar, volta para o layout que já estava salvo, sem arquivo novo e sem pedido de remoção, a imagem já salva volta a valer.
- Regra 15: O arquivo escolhido nesta visita é julgado pela proporção do layout que estiver selecionado no momento de salvar. Mudar a opção antes de salvar atualiza na hora o texto do campo: opcional e 4:1 em **Personalizado**; obrigatória e 700×923 em **Somente imagem**.
- Regra 16: O botão de confirmação, quando a confirmação está aberta, tem o texto exato **confirmo** nos dois layouts e em todo evento já existente. A prévia do tema usa o mesmo texto.
- Regra 17: **Suposição:** a frase **Confirmação de presença** continua imediatamente acima do campo de nome completo, nos dois layouts, quando a confirmação está aberta. Com a confirmação encerrada, a seção mostra só **Confirmação indisponível**, sem essa frase e sem o campo de nome. Em **Somente imagem**, a imagem continua visível nesse estado.
- Regra 18: **Suposição:** o tema de cores continua valendo no que a página mostra. A cor de fundo pinta a página. A cor do botão pinta o botão **confirmo**, com o texto claro ou escuro como o tema já decide hoje. A cor de título pinta, em **Personalizado**, os textos que o tema já pinta hoje (título, detalhes, data, horário, local e a frase **Confirmação de presença**). Em **Somente imagem**, a cor de título pinta a frase **Confirmação de presença**, porque os outros textos não estão na página. A imagem não é recolorida. Campo de nome, avisos e **Confirmação indisponível** não mudam de cor por causa desta feature.
- Regra 19: Só o organizador autenticado escolhe o layout. O convidado não escolhe.
- Regra 20: Link antigo que redireciona para o trecho atual mostra o layout e a imagem do evento atual.
- Regra 21: Página de evento inexistente ou excluído não usa layout. Continua **Evento indisponível**.
- Regra 22: A prévia do tema e a lista usam o layout e a imagem já salvos. Rascunho ainda não salvo não aparece nelas.
- Regra 23: **Suposição:** o texto alternativo da imagem continua sendo o título do evento, nos dois layouts.
- Regra 24: O título segue gerando e identificando o evento como hoje (lista, edição e link). Em **Somente imagem**, essa identificação é do organizador; o convidado não vê o título como texto da página.

## 8. Fluxos principais

### Fluxo 1 — Criar em Personalizado

1. O organizador abre a criação. **Personalizado** já está selecionado.
2. Preenche título, data, horário e local. Detalhes, imagem e janela de confirmação continuam opcionais.
3. O campo de imagem explica: opcional; jpg ou png; até 8 MB; proporção 4:1; tamanho ideal 1584×396.
4. Se quiser, envia uma imagem. Fora de 4:1, vê o aviso e ainda pode salvar. Arquivo inválido é recusado.
5. Ao salvar, o evento existe em **Personalizado**. A página pública segue a ordem atual, com o botão **confirmo**.

### Fluxo 2 — Criar em Somente imagem

1. O organizador abre a criação, seleciona **Somente imagem** e preenche título, data, horário e local. Detalhes continuam opcionais e não irão para a página pública.
2. O campo de imagem passa a explicar que ela é obrigatória, em jpg ou png, até 8 MB, no ideal 700×923.
3. Sem arquivo, o salvamento é recusado e explica que esse layout precisa de uma imagem. Os outros dados válidos não são gravados nessa tentativa.
4. Com arquivo aceito, se a proporção não for 700:923, vê o aviso e pode salvar.
5. Ao salvar, a página pública mostra a imagem e a confirmação com o botão **confirmo**. A lista mostra essa imagem em retrato no card.

### Fluxo 3 — Trocar o layout na edição

1. O organizador abre a edição e vê o layout e a imagem já salvos.
2. Seleciona o outro layout. A imagem já salva deixa de aparecer como imagem válida dessa nova opção. O texto do campo muda na hora.
3. Para ir a **Somente imagem**, escolhe um arquivo novo. Sem isso, salvar é recusado e o evento continua como estava.
4. Para voltar a **Personalizado**, pode enviar uma faixa nova ou salvar sem imagem. A imagem de retrato anterior não permanece.
5. Se fechar sem salvar, o layout e a imagem anteriores permanecem na página pública e na lista.
6. Se voltar à opção original antes de salvar, sem arquivo novo e sem remoção, a imagem já salva volta a ser a do formulário.

### Fluxo 4 — Convidado abre o link

1. O convidado abre a página do evento.
2. Em **Personalizado**, vê a faixa se houver, o título, os detalhes se houver texto, data, horário e local, e a confirmação.
3. Em **Somente imagem**, vê a imagem em retrato e a confirmação. Não vê título, detalhes, data, horário nem local.
4. Com a confirmação aberta, vê **Confirmação de presença**, o nome completo e o botão **confirmo**.
5. Com a confirmação encerrada, vê **Confirmação indisponível** no lugar do campo. Em **Somente imagem**, a imagem continua acima dessa mensagem.

## 9. Critérios de aceite

- O organizador vê **Personalizado** e **Somente imagem** na criação e na edição. Na criação, **Personalizado** já está selecionado.
- Evento já existente abre em **Personalizado** até o organizador salvar a outra opção.
- Título, data, horário e local continuam obrigatórios nos dois layouts. Detalhes continuam opcionais.
- Em **Personalizado**, a página pública mantém a ordem atual e aceita evento sem imagem, sem espaço vazio.
- Em **Somente imagem**, a página pública mostra a imagem e a confirmação, e não mostra título, detalhes, data, horário nem local.
- **Somente imagem** não é salvo sem uma imagem jpg ou png de até 8 MB.
- Proporção diferente da ideal mostra aviso ao organizador e ainda permite salvar, nos dois layouts, quando o restante da tentativa é válido.
- Arquivo que não seja jpg ou png, ou maior que 8 MB, não é gravado e não troca o layout nem a imagem já salvos.
- Trocar de layout e sair sem salvar mantém o layout e a imagem anteriores.
- Na troca, a imagem anterior não é reaproveitada. A ida para **Somente imagem** exige arquivo novo. A volta para **Personalizado** pode ficar sem imagem.
- O botão, com a confirmação aberta, diz **confirmo** em todo evento e na prévia do tema.
- O card da lista mostra retrato quando o layout salvo é **Somente imagem**, e a faixa 4:1 quando **Personalizado** tem imagem.
- A prévia do tema repete o layout já salvo e o botão **confirmo**.

## 10. Stack

Next.js, TypeScript, Tailwind CSS, Supabase, React Hook Form, Zod e os componentes de interface que o projeto já usa.

Nenhuma biblioteca nova. O layout reutiliza o evento, a imagem única já existente, a página pública, a lista do painel e o tema de cores.

## 11. Justificativa da stack

A escolha é um dado a mais do evento que já é criado, editado e publicado por link. A imagem, a página pública e a lista já existem. O que muda é qual formato essa imagem e esses textos seguem, e o texto do botão. A base atual cobre auth, banco e a página do convidado.

## 12. Fases de construção

### Fase 1 — Escolha do layout e o que cada um exibe

Objetivo: o organizador grava o layout, a página pública obedece a essa escolha, o botão diz **confirmo**, e a lista e a prévia acompanham.

Specs:

- Spec 01 — Escolher e trocar o layout
- Spec 02 — Página pública conforme o layout
- Spec 03 — Lista do painel e prévia do tema

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Escolher e trocar o layout

- **Fase:** Fase 1
- **Objetivo (o quê):** O organizador escolhe **Personalizado** ou **Somente imagem** ao criar o evento e pode trocar essa escolha na edição, com a imagem obrigatória ou opcional conforme o layout que estiver salvando.
- **Intenção (por quê):** O formato que o convidado vê precisa ficar gravado no evento, com regra clara para a imagem, senão a página pública não tem o que obedecer. A troca não pode reaproveitar uma arte feita para o outro formato.
- **Contexto:** A criação e a edição já pedem título, data, horário e local (obrigatórios) e detalhes (opcional). A imagem já existe: uma por evento, opcional, jpg ou png, até 8 MB, proporção de referência 4:1, tamanho ideal 1584×396, aviso se a proporção fugir, recusa se o tipo ou o tamanho forem inválidos. Remover a imagem e salvar deixa o evento sem imagem. Sair sem salvar mantém a imagem anterior. Esta spec acrescenta o layout a esses dois formulários e passa a exigir imagem somente quando o layout salvo for **Somente imagem**. Não altera slug, confirmações gravadas, janela de confirmação nem as cores do tema. A página pública, a lista e a prévia do tema só passam a obedecer ao layout nas specs seguintes; até lá, a prova desta spec é reabrir a edição.
- **Atores:** Organizador autenticado.
- **Descrição do comportamento:** Na criação e na edição há duas opções, nomeadas exatamente **Personalizado** e **Somente imagem**. Cada uma explica, em uma linha, o que o convidado verá: em **Personalizado**, a faixa se houver, o título, os detalhes, a data, o horário e o local, e depois a confirmação; em **Somente imagem**, somente a imagem e depois a confirmação. Na criação, **Personalizado** já vem selecionado. Na edição de um evento que ainda não tinha layout, **Personalizado** também vem selecionado, e a imagem já salva, se houver, continua no campo. Ao mudar a opção, o texto do campo de imagem muda na hora, antes de salvar. Em **Personalizado**, o texto segue o de hoje: opcional, jpg ou png, até 8 MB, proporção 4:1, tamanho ideal 1584×396. Em **Somente imagem**, o texto diz que a imagem é obrigatória, jpg ou png, até 8 MB, tamanho ideal 700×923. A prévia do arquivo no próprio formulário usa a proporção da opção selecionada: faixa 4:1 ou retrato 700:923. Se a proporção do arquivo não for a da opção, o aviso de que a imagem pode ficar desconfigurada aparece, e o salvamento continua permitido quando há arquivo aceito. Arquivo de outro tipo ou maior que 8 MB é recusado na hora e não entra como imagem. A imagem já salva só permanece se o layout salvo nesta ação for o mesmo de antes, sem remoção e sem arquivo novo. Se a opção ao salvar for a outra, essa imagem deixa de ser oferecida como válida: o campo espera um arquivo novo, ou, no caso de voltar para **Personalizado**, aceita seguir vazio. Salvar **Somente imagem** sem arquivo aceito é recusado, com a explicação de que esse layout precisa de uma imagem; layout e imagem anteriores não mudam. Salvar **Personalizado** sem arquivo grava o evento sem imagem, inclusive quando a troca descarta um retrato anterior. Incluir, trocar layout e remover só valem depois de salvar, junto com os outros dados. Se o organizador volta à opção original antes de salvar, sem arquivo novo e sem remoção, a imagem já salva reaparece no campo e segue valendo.
- **Entradas e saídas:** Entram os dados do evento que já existem, a opção de layout e, quando houver, um arquivo ou o pedido de remover a imagem. Saem o evento gravado com um dos dois layouts e com imagem, com outra imagem ou sem imagem, conforme as regras; a prévia no formulário; o aviso de proporção quando couber; a recusa quando o arquivo for inválido ou quando **Somente imagem** estiver sem arquivo. A página pública e a lista ainda não precisam mudar nesta spec. A prova é reabrir a edição e ver a opção salva e a imagem correspondente, ou o campo vazio quando **Personalizado** foi salvo sem imagem.
- **Dados/entidades envolvidos (conceitual):** O evento já existente (título, detalhes, data, horário, local, link, janela de confirmação, cores do tema e, no máximo, uma imagem) passa a ter um layout: **Personalizado** ou **Somente imagem**. A imagem continua sendo um único arquivo, com a proporção usada para o aviso. Não há segunda imagem nem histórico da imagem anterior: a nova substitui a antiga só depois do salvamento.
- **Estados e transições:**
  - Evento novo ou já existente sem layout gravado: **Personalizado**.
  - **Personalizado** sem imagem → **Personalizado** com imagem, quando salva um arquivo aceito sem mudar o layout.
  - **Personalizado** com imagem → **Personalizado** sem imagem, quando pede remoção e salva, ainda nesse layout.
  - **Personalizado** → **Somente imagem**, somente quando salva um arquivo novo aceito. Sem esse arquivo, o estado gravado não muda.
  - **Somente imagem** → **Personalizado** com imagem, quando salva um arquivo novo aceito.
  - **Somente imagem** → **Personalizado** sem imagem, quando salva sem arquivo.
  - **Somente imagem** não tem estado gravado sem imagem.
  - Arquivo recusado, ou saída sem salvar, não muda o layout nem a imagem já gravados.
  - Voltar à opção original antes de salvar, sem arquivo novo e sem remoção, restaura no formulário a imagem já gravada.
- **Regras de negócio:** Regras 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15 e 19.
- **Validações:**
  - Título, data, horário, local e detalhes seguem as validações que o produto já tem. O layout não as afrouxa.
  - **Personalizado** sem arquivo é válido, na criação e na edição.
  - **Somente imagem** sem arquivo aceito é inválido. A mensagem diz que esse layout precisa de uma imagem.
  - jpg e jpeg, e png, até 8 MB inclusive, são aceitos nos dois layouts.
  - Qualquer outro formato é recusado, com explicação.
  - Arquivo acima de 8 MB é recusado, com explicação.
  - Em **Personalizado**, proporção diferente de 4:1 gera aviso e não gera erro. Proporção 4:1, inclusive 1584×396, não gera esse aviso.
  - Em **Somente imagem**, proporção diferente de 700:923 gera aviso e não gera erro. Proporção 700:923, inclusive 700×923, não gera esse aviso. Outro tamanho na mesma proporção também não gera aviso.
  - Um pixel de arredondamento não conta como diferença, nos dois layouts.
  - Arquivo inválido não grava o restante da tentativa: o layout anterior e a imagem anterior permanecem. Dados inválidos do evento também não gravam layout novo nem arquivo novo.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a criação ou a edição.
  2. Vê **Personalizado** selecionado quando o evento é novo ou ainda não tinha layout. Na edição de um evento que já foi salvo em **Somente imagem**, vê essa opção e a imagem salva.
  3. Lê o que cada opção mostra ao convidado e, se quiser, muda a opção.
  4. Lê a instrução da imagem, já ajustada à opção.
  5. Deixa a imagem como está, escolhe um arquivo, ou pede remoção quando o layout permite ficar sem imagem.
  6. Se o arquivo for recusado, lê o motivo. Aquela seleção não será gravada.
  7. Se a proporção fugir da referência da opção, lê o aviso.
  8. Salva, ou sai sem salvar.
  9. Ao reabrir a edição depois de um salvamento concluído, vê o layout gravado e a imagem gravada, ou o campo vazio se **Personalizado** ficou sem imagem.
- **Casos de borda e erros:**
  - Criar em **Personalizado** sem arquivo: válido.
  - Criar em **Somente imagem** sem arquivo: recusar o salvamento; o evento não passa a existir nessa tentativa.
  - Criar em **Somente imagem** com jpg ou png de até 8 MB: gravar, com aviso somente se a proporção não for 700:923.
  - 700×923: aceitar sem aviso. Outro tamanho ainda em 700:923: aceitar sem aviso.
  - Arquivo vazio, corrompido ou que não seja imagem: recusar, como formato inválido. Webp, gif, svg, pdf e outros: recusar.
  - Exatamente 8 MB: aceitar. Acima de 8 MB: recusar.
  - Trocar para **Somente imagem** e salvar sem arquivo novo: recusar; layout e imagem anteriores permanecem.
  - Trocar para **Personalizado** e salvar sem arquivo: gravar **Personalizado** sem imagem; o retrato anterior não permanece.
  - Trocar de layout, escolher um arquivo inválido e salvar: nada do que já estava gravado muda.
  - Mudar a opção, depois voltar à original, e salvar sem outras mudanças de imagem: layout e imagem anteriores permanecem.
  - Pedir remoção em **Somente imagem** e salvar sem escolher outro arquivo: recusar; a imagem anterior permanece.
  - Pedir remoção em **Personalizado** e salvar: evento sem imagem.
  - Sair sem salvar depois de mudar opção ou arquivo: layout e imagem anteriores permanecem.
  - Alterar só título, detalhes, data, horário, local ou janela, sem mudar layout nem imagem: layout e imagem permanecem.
  - Organizador sem sessão: não acessa criação nem edição, como já acontece hoje.
  - Falha ao gravar: layout e imagem anteriores permanecem, e o organizador é informado de que não foi possível salvar.
- **Impacto no existente:** Os formulários de criar e editar ganham a escolha do layout. O campo de imagem deixa de ser sempre opcional e sempre 4:1: isso passa a depender da opção selecionada. Eventos já criados são tratados como **Personalizado**, então a edição deles abre como hoje até que o organizador troque e salve. Título, detalhes, data, horário, local, slug, confirmações, janela e tema continuam com as regras atuais. A página pública e a lista só mudam nas specs seguintes.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado a criação de um evento, quando o formulário abre, então **Personalizado** está selecionado e a imagem é descrita como opcional, em 4:1, tamanho ideal 1584×396.
  - Dado a criação com **Personalizado** e sem arquivo, quando o organizador salva os dados obrigatórios válidos, então o evento existe e a edição abre em **Personalizado** sem imagem.
  - Dado a criação com **Somente imagem** e sem arquivo, quando o organizador tenta salvar, então o sistema explica que a imagem é obrigatória e o evento não é criado.
  - Dado a criação com **Somente imagem** e um jpg ou png de até 8 MB em 700:923, quando o organizador salva os dados obrigatórios válidos, então a edição reaberta mostra **Somente imagem**, essa imagem, e não mostra o aviso de proporção.
  - Dado um arquivo aceito fora da proporção da opção selecionada, quando o organizador o escolhe, então vê o aviso e, se o restante for válido, consegue salvar.
  - Dado um arquivo que não é jpg nem png, ou maior que 8 MB, quando o organizador tenta salvar a troca de layout com esse arquivo, então nada é gravado: layout e imagem anteriores permanecem.
  - Dado um evento em **Personalizado** com faixa salva, quando o organizador seleciona **Somente imagem** e salva um arquivo novo aceito, então a edição mostra só **Somente imagem** e a imagem nova.
  - Dado um evento em **Somente imagem**, quando o organizador seleciona **Personalizado** e salva sem arquivo, então a edição abre em **Personalizado** sem imagem.
  - Dado um evento com layout e imagem salvos, quando o organizador muda a opção ou escolhe outro arquivo e sai sem salvar, então a edição reaberta mostra o layout e a imagem anteriores.
  - Dado um evento em **Somente imagem**, quando o organizador altera só o título e salva, então o layout continua **Somente imagem** e a imagem continua a mesma.
  - Dado um evento já existente antes desta feature, quando o organizador abre a edição, então a opção selecionada é **Personalizado**.
- **Definição de pronto:** Dá para criar nos dois layouts, com **Personalizado** inicial e imagem opcional, e com **Somente imagem** bloqueado sem arquivo. Dá para trocar nos dois sentidos, sem reaproveitar a imagem anterior, mantendo tudo se a tentativa não for salva ou se o arquivo for inválido. Reabrir a edição comprova layout e imagem.
- **Dependências:** Nenhuma. Usa o evento, a imagem única e a conta do organizador que já existem.
- **Fora do escopo desta spec:** Mudar o que a página pública mostra, trocar o texto do botão, miniatura na lista e prévia do tema. Isso é a Spec 02 e a Spec 03.

### Spec 02 — Página pública conforme o layout

- **Fase:** Fase 1
- **Objetivo (o quê):** A página pública obedece ao layout salvo e o botão de confirmação diz **confirmo** em todo evento.
- **Intenção (por quê):** A escolha do organizador só tem valor quando o convidado vê o formato certo. O botão único evita um texto antigo num layout e outro texto no layout novo.
- **Contexto:** A página pública hoje mostra, de cima para baixo: a faixa 4:1 se houver imagem, o título, os detalhes se houver texto, data, horário e local, e a confirmação. Com a confirmação aberta, a seção começa com **Confirmação de presença**, o campo de nome completo e o botão **Eu vou!**. Com a confirmação encerrada, mostra só **Confirmação indisponível**. O tema colore fundo, textos cobertos pela cor de título e o botão. A imagem não é recolorida. Sem imagem, não há faixa nem vão. Evento inexistente ou excluído mostra **Evento indisponível**. Link antigo redireciona para o slug atual. Esta spec passa a ramificar essa página pelo layout gravado na Spec 01 e troca o texto do botão. Não muda o que é gravado numa confirmação nem a janela.
- **Atores:** Convidado, na página pública. O organizador só confere o resultado pelo link; a prévia do tema fica na Spec 03.
- **Descrição do comportamento:** Se o layout salvo é **Personalizado**, ou se o evento ainda é tratado como esse layout, a ordem permanece a atual: faixa somente se existir imagem salva; título; detalhes somente se houver texto; data, horário e local; confirmação. A faixa continua na largura do conteúdo do convite, em 4:1, preenchida pela imagem. Se o layout salvo é **Somente imagem**, o primeiro elemento é a imagem em retrato, na largura do conteúdo do convite, na proporção 700:923, preenchida pela imagem. Em seguida vem só a confirmação. Título, detalhes, data, horário e local não são exibidos e não deixam espaço. Nos dois layouts, com a confirmação aberta, a seção mostra **Confirmação de presença**, o campo de nome completo e o botão com o texto exato **confirmo**. Avisos de sucesso e de erro continuam como hoje e não substituem a frase: o campo permanece para confirmar outra pessoa. Com a confirmação encerrada, a seção mostra somente **Confirmação indisponível**; em **Somente imagem** a imagem continua acima. A cor de fundo e a cor do botão seguem o tema já salvo. A cor de título segue o tema nos textos que estiverem na página. A imagem não muda de cor. O texto alternativo da imagem é o título do evento. Link antigo mostra o layout do evento atual. **Evento indisponível** não ganha layout nem imagem.
- **Entradas e saídas:** Entram o evento público e o layout e a imagem gravados na Spec 01. Evento sem layout gravado entra como **Personalizado**. Saem a página no formato correspondente e o botão **confirmo** quando a confirmação está aberta. Não há escolha do convidado.
- **Dados/entidades envolvidos (conceitual):** Evento (layout, título, detalhes, data, horário, local, tema e uma imagem ou nenhuma). Confirmação de presença já existente (aberta ou encerrada, nome, botão). Em **Somente imagem**, título, detalhes, data, horário e local continuam existindo no evento e só não são desenhados nesta página.
- **Estados e transições:**
  - **Personalizado** sem imagem: a página começa no título.
  - **Personalizado** com imagem: a página começa na faixa.
  - **Somente imagem**: a página começa na imagem em retrato e não mostra o bloco de textos do evento.
  - Confirmação aberta: frase, campo de nome e botão **confirmo**.
  - Confirmação encerrada: **Confirmação indisponível**, com a imagem ainda visível em **Somente imagem**.
  - A página só muda de layout ou de imagem depois que a Spec 01 gravou essa mudança.
- **Regras de negócio:** Regras 3, 5, 6, 7 (exibição da faixa), 8 (exibição do retrato), 16, 17, 18, 20, 21 e 23.
- **Validações:** Não se aplica a um formulário novo. A página só exibe layout e imagem já salvos. Se a imagem não puder ser mostrada, **Personalizado** segue sem a faixa e o restante permanece utilizável. Em **Somente imagem**, a confirmação continua utilizável e o bloco de título, detalhes, data, horário e local não aparece no lugar da imagem. **Suposição:** essa falha não exibe aviso ao convidado.
- **Fluxo do usuário (passo a passo):**
  1. O convidado abre o link atual, ou um link antigo que cai no atual.
  2. Em **Personalizado**, vê a faixa somente se houver imagem, e lê título, detalhes se existirem, data, horário e local.
  3. Em **Somente imagem**, vê a imagem e não lê título, detalhes, data, horário nem local.
  4. Se a confirmação estiver aberta, lê **Confirmação de presença**, escreve o nome e usa **confirmo**.
  5. Se estiver encerrada, lê **Confirmação indisponível**.
- **Casos de borda e erros:**
  - Evento antigo, sem layout gravado: comporta-se como **Personalizado**, com o botão **confirmo**.
  - **Personalizado** sem imagem: nenhuma faixa e nenhum espaço reservado.
  - Detalhes vazios em **Personalizado**: continuam ocultos, como hoje. Em **Somente imagem**, detalhes preenchidos também ficam ocultos.
  - Imagem fora da proporção já salva: a área continua 4:1 ou 700:923, conforme o layout, a imagem preenche o espaço e pode ficar esticada. Sem aviso para o convidado.
  - Confirmação que encerra depois que a página já estava aberta: o comportamento de deixar de aceitar nome continua o atual; a frase some junto com o campo.
  - Sucesso ao confirmar: a frase permanece acima do campo esvaziado, para outra pessoa, e o botão continua **confirmo**.
  - Falha ao carregar a imagem em **Somente imagem**: a confirmação segue na página; título, detalhes, data, horário e local não passam a aparecer por causa da falha.
  - Evento indisponível ou excluído: mensagem atual, sem imagem e sem os dois layouts.
  - Cores do tema: continuam nos textos visíveis e no botão. A imagem não é recolorida. Campo de nome, avisos e **Confirmação indisponível** não ganham cor nova por causa desta spec.
- **Impacto no existente:** Toda página pública de evento com confirmação aberta troca **Eu vou!** por **confirmo**, mesmo as que permanecem em **Personalizado**. Eventos em **Somente imagem** deixam de mostrar o bloco de textos. Confirmar presença, janela e tema guardam as mesmas regras. A lista e a prévia do tema ficam para a Spec 03.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento em **Personalizado** sem imagem e com confirmação aberta, quando o convidado abre o link, então não há faixa, o título é o primeiro texto, **Confirmação de presença** está acima do nome e o botão diz **confirmo**.
  - Dado um evento em **Personalizado** com imagem salva, quando o convidado abre o link, então a faixa 4:1 aparece antes do título, na largura do conteúdo do convite.
  - Dado um evento em **Somente imagem** com confirmação aberta, quando o convidado abre o link, então vê a imagem em retrato 700:923 e a confirmação, e não vê título, detalhes, data, horário nem local.
  - Dado um evento em **Somente imagem** com confirmação encerrada, quando o convidado abre o link, então a imagem continua visível e a seção mostra **Confirmação indisponível**, sem a frase e sem o campo de nome.
  - Dado um evento antigo que ainda não teve layout escolhido, quando o convidado abre o link, então a página é a de **Personalizado** e o botão diz **confirmo**.
  - Dado um evento com tema de cores salvo, quando o convidado abre o link, então fundo e botão usam esse tema, a frase usa a cor de título, e a imagem não é recolorida.
  - Dado um slug antigo do mesmo evento, quando o convidado é levado ao slug atual, então vê o layout e a imagem do evento atual.
  - Dado um evento inexistente ou excluído, quando alguém abre o endereço, então vê **Evento indisponível** sem layout e sem imagem.
  - Dado uma imagem de **Somente imagem** que não carrega, quando o convidado abre o link, então a confirmação continua disponível e os textos do evento não aparecem no lugar da imagem.
- **Definição de pronto:** Cada evento público aparece no layout salvo; evento sem layout salvo aparece como **Personalizado**; o botão diz **confirmo** sempre que a confirmação está aberta; **Somente imagem** não vaza título, detalhes, data, horário nem local; evento indisponível permanece como está.
- **Dependências:** Spec 01 — para existir **Somente imagem** gravado e a imagem obrigatória desse layout. O botão **confirmo** em **Personalizado** pode ser conferido em qualquer evento.
- **Fora do escopo desta spec:** O formulário de escolha (Spec 01), a miniatura da lista, a prévia do tema (Spec 03) e qualquer mudança nas regras de confirmação ou de cor.

### Spec 03 — Lista do painel e prévia do tema

- **Fase:** Fase 1
- **Objetivo (o quê):** O card da lista mostra a imagem na proporção do layout salvo, e a prévia do tema repete a página pública daquele layout, com o botão **confirmo**.
- **Intenção (por quê):** O organizador precisa reconhecer o evento na lista pela mesma arte da página, e conferir as cores em cima do formato que o convidado realmente vê. Uma faixa 4:1 no lugar do retrato, ou um botão **Eu vou!** na prévia, desmentiria a escolha.
- **Contexto:** A lista do painel, quando há eventos, mostra um card por evento com a faixa 4:1 acima do título quando há imagem, o título, se a confirmação está aberta ou encerrada, data, horário e local. Sem imagem, o card não reserva espaço. O card inteiro abre a área daquele evento. A lista vazia explica que ainda não há evento e oferece criar o primeiro. A prévia do tema, na área do evento, repete o miolo da página pública com os dados reais, a imagem já salva e um campo de nome somente leitura; hoje o botão dessa prévia diz **Eu vou!**. A prévia não usa imagem que ainda não foi salva. Esta spec não muda a lista vazia, o destino do card, nem o formulário de cores do tema.
- **Atores:** Organizador autenticado.
- **Descrição do comportamento:** Se o layout salvo é **Personalizado** e há imagem, o card mostra essa imagem numa faixa pequena 4:1, acima do título, como hoje. Se **Personalizado** não tem imagem, o card não tem miniatura nem espaço vazio. Se o layout salvo é **Somente imagem**, o card mostra a mesma imagem em retrato 700:923, acima do título, sem esticá-la para a faixa 4:1. O restante do card permanece nos dois casos: título, estado da confirmação, data, horário e local. Seleção ainda não salva não aparece na lista. Fora da proporção, a miniatura preenche a área daquele layout e pode ficar esticada, sem aviso na lista. A prévia do tema usa o layout e a imagem já salvos, na mesma ordem da Spec 02. Em **Personalizado**, mostra faixa se houver, título, detalhes se houver, data, horário, local e a confirmação de exemplo. Em **Somente imagem**, mostra o retrato e a confirmação de exemplo, sem título, detalhes, data, horário e local. Nos dois, a frase **Confirmação de presença** fica acima do campo de nome somente leitura, e o botão diz **confirmo**. A prévia não mostra layout nem arquivo que ainda estejam só no formulário de edição. O card continua sendo um único acesso à área do evento.
- **Entradas e saídas:** Entram a lista de eventos, cada um com layout e com ou sem imagem salva, e, na prévia, o evento aberto com o tema que o organizador está ajustando. Saem o card com faixa, com retrato ou sem miniatura, e a prévia alinhada à página pública.
- **Dados/entidades envolvidos (conceitual):** Evento da lista (título, data, horário, local, se a confirmação está aberta ou encerrada, layout e a imagem, se houver). A miniatura não é uma segunda imagem: é a mesma da página pública. A prévia usa esses mesmos dados mais as cores do tema.
- **Estados e transições:**
  - **Personalizado** sem imagem: card sem miniatura.
  - **Personalizado** com imagem: card com faixa 4:1 acima do título.
  - **Somente imagem**: card com retrato acima do título.
  - Prévia em **Personalizado** ou em **Somente imagem**, conforme o que já foi salvo.
  - A mudança aparece na lista e na prévia depois do salvamento da Spec 01.
- **Regras de negócio:** Regras 4, 5, 6, 12, 16, 17, 18, 22 e 23.
- **Validações:** Não se aplica. Lista e prévia só mostram imagem e layout já aceitos. Se uma miniatura não carregar, aquele card segue sem a imagem e o título continua visível. **Suposição:** sem aviso extra na lista.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a lista de eventos.
  2. Em cada card de **Personalizado** com imagem, vê a faixa acima do título.
  3. Em cada card de **Somente imagem**, vê o retrato acima do título e ainda lê título, data, horário e local no card.
  4. Em cada card de **Personalizado** sem imagem, vê o card sem miniatura.
  5. Abre o evento pelo card, como já faz.
  6. Abre a prévia do tema e confere o layout salvo, com o botão **confirmo**.
- **Casos de borda e erros:**
  - Lista vazia: permanece o estado vazio atual, sem miniatura.
  - Evento antigo sem layout gravado: card como **Personalizado**.
  - Mistura de layouts: cada card usa a proporção do próprio evento.
  - Imagem fora da proporção: a miniatura preenche a área do layout, sem aviso.
  - Imagem escolhida e ainda não salva: a lista e a prévia não a usam.
  - Troca de layout salva: a lista e a prévia passam a refletir o layout novo e a imagem nova, ou a ausência de imagem se **Personalizado** foi salvo sem arquivo.
  - Falha ao carregar uma miniatura: aquele card aparece sem imagem; os outros não são afetados.
  - Prévia de **Somente imagem**: não mostra título, detalhes, data, horário nem local, embora o card da lista continue mostrando título, data, horário e local.
  - Cores ainda não salvas na prévia: a prévia pode mostrar o rascunho de cores, como já faz hoje; layout e imagem continuam sendo os já salvos.
- **Impacto no existente:** O card da lista passa a variar a proporção da miniatura conforme o layout. Cards de **Personalizado** permanecem como hoje. A prévia do tema deixa de usar sempre o bloco completo de textos e deixa de dizer **Eu vou!**. A escolha do layout não entra na tela de tema. Ordem da lista, badge de confirmação e o caminho até a área do evento continuam iguais.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento em **Personalizado** com imagem salva, quando o organizador abre a lista, então o card mostra a faixa 4:1 acima do título e mantém data, horário, local e o estado da confirmação.
  - Dado um evento em **Personalizado** sem imagem, quando o organizador abre a lista, então o card não tem miniatura nem espaço vazio no lugar dela.
  - Dado um evento em **Somente imagem**, quando o organizador abre a lista, então o card mostra a imagem em retrato 700:923 acima do título, e o título, a data, o horário e o local continuam no card.
  - Dado uma imagem ou um layout ainda não salvos, quando o organizador abre a lista sem salvar, então o card não usa esse rascunho.
  - Dado um evento que voltou para **Personalizado** sem imagem e essa troca foi salva, quando o organizador abre a lista, então o card não tem miniatura.
  - Dado a lista sem eventos, quando o organizador a abre, então continua vendo o estado vazio atual.
  - Dado um card, quando o organizador o aciona, então chega à área daquele evento.
  - Dado a prévia do tema de um evento em **Somente imagem** já salvo, quando o organizador abre a prévia, então vê o retrato e a confirmação de exemplo, o botão diz **confirmo**, e não vê título, detalhes, data, horário nem local.
  - Dado a prévia do tema de um evento em **Personalizado**, quando o organizador abre a prévia, então a ordem é a da página pública desse layout e o botão diz **confirmo**.
- **Definição de pronto:** A lista distingue faixa e retrato conforme o layout salvo, sem miniatura quando **Personalizado** não tem imagem. A prévia do tema coincide com a página pública daquele evento e usa **confirmo**.
- **Dependências:** Spec 01 — layout e imagem gravados. Spec 02 — a prévia repete a página pública; sem a Spec 02, a prévia não tem o formato de referência.
- **Fora do escopo desta spec:** Formulário de escolha e de imagem (Spec 01), regras de confirmação do convidado, e miniatura em qualquer outra tela do painel.

## 14. Ordem recomendada de implementação

1. Spec 01 — Escolher e trocar o layout
2. Spec 02 — Página pública conforme o layout
3. Spec 03 — Lista do painel e prévia do tema

A Spec 01 grava o layout e a imagem que as outras exibem. A Spec 02 entrega o que o convidado vê, inclusive o botão **confirmo** nos eventos que permanecem em **Personalizado**. A Spec 03 alinha lista e prévia a esse resultado e fica por último para não desenhar retrato nem prévia de um layout que ainda não pode ser salvo. Seguir essa ordem evita mostrar um formato que o organizador ainda não consegue gravar.
