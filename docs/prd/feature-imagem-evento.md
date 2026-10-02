# PRD — Imagem ilustrativa do evento

> Tipo: PRD de feature · Data: 2026-10-02
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

O organizador pode enviar **uma imagem opcional** para ilustrar o evento. Na página pública, essa imagem é uma **faixa horizontal** no topo, antes do título e do restante do convite.

A proporção de referência é **4:1** (quatro vezes mais larga do que alta). O tamanho ideal do arquivo é **1584×396** pixels. Formatos aceitos: **jpg** ou **png**, até **8 MB**.

A mesma imagem aparece, pequena, no card daquele evento na lista do painel.

Esta feature também reorganiza a página pública de **todo** evento, com ou sem imagem. A frase **“Confirmação de presença”** deixa de ficar acima do título e passa para a seção em que o convidado escreve o nome.

O pedido inicial falava em imagem em retrato. Isso foi corrigido: a imagem é faixa horizontal, não retrato.

## 2. Problema que resolve

A página pública descreve o evento só com texto. O organizador não tem como mostrar uma imagem da ocasião (um convite, uma foto do lugar, uma arte) no próprio link.

Quem recebe o link vê título, detalhes, data, horário e local, mas nada que ilustre o evento. A imagem fecha essa lacuna sem obrigar quem não quer imagem a enviar uma.

A frase “Confirmação de presença” hoje fica no topo, acima do título, longe do campo de nome. Ela passa a identificar a seção em que o convidado de fato confirma.

## 3. Público-alvo

- **Organizador** — única conta do produto. Envia, troca ou remove a imagem ao criar ou editar o evento. Vê a miniatura na lista.
- **Convidado** — só vê o resultado na página pública, sem login e sem enviar imagem.

## 4. Objetivo do recorte atual

Cada evento pode ter uma imagem ou nenhuma. O organizador define isso na criação e pode trocar ou remover depois. A página pública mostra a faixa no topo quando houver imagem, na nova ordem das seções. A lista do painel mostra a miniatura quando houver imagem. Evento sem imagem continua sem faixa e sem espaço vazio.

## 5. Funcionalidades

**Essenciais:**

- Imagem opcional, uma por evento, na criação e na edição.
- Faixa horizontal 4:1, tamanho ideal 1584×396, jpg ou png, no máximo 8 MB.
- Aviso quando a proporção não for 4:1, sem impedir o salvamento.
- Recusa de arquivo que não seja jpg ou png, ou que passe de 8 MB.
- Trocar a imagem por outra, ou remover e deixar o evento sem imagem.
- Página pública, com ou sem imagem, nesta ordem: imagem (se houver), informações do evento, confirmação de presença.
- Frase “Confirmação de presença” acima do campo de nome completo.
- Miniatura da mesma imagem no card do evento na lista do painel.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Imagem em retrato, imagem de fundo, logo no lugar do título ou mais de uma imagem por evento.
- Recortar, filtrar ou editar a imagem dentro do produto.
- Obrigar o envio da imagem.
- Impedir o salvamento só porque a proporção não é 4:1.
- Formatos que não sejam jpg ou png (webp, gif, svg, pdf e outros).
- Miniatura em outro lugar do painel que não o card da lista. A tela do evento mostra a imagem atual só no formulário de edição.
- Imagem na página “Evento indisponível”.
- Convidado enviar ou remover imagem.
- Mudar o que a confirmação grava, a janela de confirmação, as cores do tema ou o texto do botão “Eu vou!”.
- Mudar a cor do campo de nome, dos avisos de sucesso e de erro, e do texto “Confirmação indisponível”.

## 7. Regras de negócio

- Regra 1: A imagem é **por evento** e é **opcional**. Um evento não altera a imagem de outro.
- Regra 2: Há no máximo **uma** imagem. Enviar outra substitui a anterior, depois que o organizador salva.
- Regra 3: Sem imagem, a página pública e o card da lista não reservam espaço vazio para ela.
- Regra 4: A proporção de referência é **4:1**. O tamanho ideal informado ao organizador é **1584×396** pixels. Outro tamanho na mesma proporção é aceito. Na tela, a faixa acompanha a largura do conteúdo do convite e mantém 4:1. **Suposição:** 1584×396 é o tamanho ideal do arquivo, não a largura fixa na tela; a faixa não cobre a janela inteira do navegador.
- Regra 5: Se a proporção não for 4:1, o sistema avisa o organizador que a imagem pode ficar desconfigurada e **permite salvar**. O convidado não vê esse aviso. **Suposição:** a imagem preenche a faixa inteira; fora de 4:1 ela fica esticada, e é isso que o aviso chama de desconfigurada. Diferença de arredondamento de um pixel não dispara o aviso.
- Regra 6: Arquivo que não seja jpg ou png, ou maior que 8 MB, é recusado. Não é gravado e não substitui nem apaga a imagem já salva. **Suposição:** arquivo .jpeg conta como jpg.
- Regra 7: Trocar, incluir ou remover só passa a valer na página pública e na lista **depois de salvar**. Sair sem salvar mantém a imagem anterior. **Suposição:** remover não pede um diálogo extra; se o organizador não salvar, a remoção não acontece.
- Regra 8: Só o organizador autenticado envia, troca ou remove. O convidado não faz isso.
- Regra 9: A página pública, com ou sem imagem, segue esta ordem: imagem enviada (somente se existir); informações do evento (título, detalhes, data, horário e local); confirmação de presença.
- Regra 10: A frase “Confirmação de presença” fica na seção de confirmação, imediatamente acima do campo de nome completo, quando esse campo está na página. A cor do título do tema continua valendo para essa frase, no lugar novo.
- Regra 11: Com a confirmação encerrada, a seção continua mostrando só “Confirmação indisponível”, como hoje. A frase “Confirmação de presença” não aparece nesse estado, porque não há campo de nome.
- Regra 12: A miniatura da lista é a mesma imagem salva, em faixa pequena 4:1, acima do título do card. Sem imagem, o card permanece como está hoje.
- Regra 13: Link antigo que redireciona para o trecho atual mostra a imagem do evento atual.
- Regra 14: Página de evento inexistente ou excluído não mostra imagem. **Suposição:** excluir o evento apaga a imagem junto com o evento.
- Regra 15: A imagem não é recolorida pelo tema. O fundo da página continua sendo a cor de fundo do tema (ou o padrão).
- Regra 16: **Suposição:** o texto alternativo da imagem é o título do evento.

## 8. Fluxos principais

### Fluxo 1 — Criar evento com imagem

1. O organizador abre a criação do evento e preenche título, data, horário e local. Detalhes continuam opcionais.
2. Se quiser, escolhe uma imagem. O formulário explica que ela é opcional, em jpg ou png, até 8 MB, no ideal 1584×396 (4:1).
3. Se a proporção não for 4:1, vê o aviso de que a imagem pode ficar desconfigurada e ainda pode salvar.
4. Se o arquivo for inválido, o sistema recusa aquele arquivo. O organizador tira a seleção ou escolhe outro. Pode também criar o evento sem imagem.
5. Ao salvar, o evento passa a existir com ou sem imagem. A página pública e a lista usam o que foi salvo.

### Fluxo 2 — Criar ou editar sem imagem

1. O organizador cria o evento, ou abre um evento que já existe, e não mexe na imagem.
2. Salva os outros dados.
3. O evento continua sem imagem, ou com a imagem que já estava salva.

### Fluxo 3 — Trocar ou remover

1. Na edição, o organizador vê a imagem atual, se houver.
2. Escolhe outra imagem, ou pede para remover.
3. Salva.
4. A página pública e a miniatura da lista passam a mostrar a nova imagem, ou ficam sem imagem se ele removeu.

### Fluxo 4 — Convidado abre o link

1. O convidado abre a página do evento.
2. Se houver imagem, vê a faixa no topo.
3. Em seguida vê título, detalhes (se houver texto), data, horário e local.
4. Na seção de confirmação, se ela estiver aberta, vê “Confirmação de presença”, o campo de nome completo e o botão “Eu vou!”.
5. Se a confirmação estiver encerrada, vê “Confirmação indisponível” no lugar do campo, sem a frase acima de um campo que não existe.

## 9. Critérios de aceite

- O organizador consegue criar e editar um evento sem imagem, e a página pública desse evento não mostra faixa nem espaço vazio.
- O organizador consegue enviar uma imagem jpg ou png de até 8 MB na criação e na edição.
- O organizador consegue trocar a imagem e consegue removê-la. Depois de salvar, a página pública e a lista acompanham.
- Se o organizador escolhe uma imagem e sai sem salvar, a página pública e a lista continuam com a imagem anterior (ou sem imagem, se não havia).
- Arquivo que não seja jpg ou png, ou maior que 8 MB, não é gravado e não apaga a imagem já salva.
- Imagem fora de 4:1 mostra aviso ao organizador e ainda pode ser salva.
- Imagem em 4:1, inclusive no tamanho ideal 1584×396, é salva sem esse aviso.
- Na página pública, a ordem é: imagem (se houver), informações do evento, confirmação.
- A frase “Confirmação de presença” não aparece mais acima do título. Com a confirmação aberta, ela fica imediatamente acima do campo de nome completo.
- Com a confirmação encerrada, o convidado vê “Confirmação indisponível” e não vê a frase acima de um campo ausente.
- O card da lista mostra a miniatura acima do título quando há imagem, e não mostra miniatura quando não há.
- A prévia do tema do evento segue a mesma ordem e mostra a imagem já salva.
- A página “Evento indisponível” não mostra imagem.
- O convidado não consegue enviar imagem.

## 10. Stack

A feature usa o que o projeto já tem: Next.js, React, TypeScript, Tailwind, shadcn, React Hook Form, Zod e Supabase (autenticação do organizador e persistência do evento). A criação, a edição, a lista, a página pública e a prévia do tema já existem.

A novidade é guardar **um arquivo de imagem opcional** ligado ao evento e exibi-lo. Não entra serviço novo de armazenamento nem biblioteca de plataforma além do que o projeto já usa para o evento.

## 11. Justificativa da stack

A imagem é um complemento opcional do evento que já é criado, editado e publicado por link. Autenticação, lista, página pública e tema já estão resolvidos. Guardar o arquivo junto do evento, na mesma base, evita um segundo produto só para uma faixa ilustrativa.

## 12. Fases de construção

### Fase 1 — Imagem do evento e ordem da página pública

Objetivo: o organizador consegue definir a imagem, e convidado e lista passam a vê-la na ordem nova da página.

Specs:

- Spec 01 — Enviar, trocar e remover a imagem
- Spec 02 — Página pública na nova ordem
- Spec 03 — Miniatura na lista de eventos

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Enviar, trocar e remover a imagem

- **Fase:** Fase 1
- **Objetivo (o quê):** O organizador inclui uma imagem opcional ao criar o evento e, num evento já criado, troca ou remove essa imagem.
- **Intenção (por quê):** A ilustração precisa existir no evento antes de aparecer para o convidado. Sem um jeito claro de enviar, trocar e apagar, a faixa da página pública não tem origem.
- **Contexto:** A criação do evento já pede título, data, horário e local (obrigatórios) e detalhes (opcional). A edição altera esses mesmos dados. A data não pode ser gravada no passado, com a exceção já existente para evento cuja data já passou. Esta spec acrescenta a imagem a esses dois formulários. Não altera slug, confirmações, janela de confirmação nem cores do tema.
- **Atores:** Organizador autenticado.
- **Descrição do comportamento:** Nos formulários de criar e de editar, a imagem é um campo opcional. O texto do campo explica: opcional; jpg ou png; no máximo 8 MB; proporção 4:1; tamanho ideal 1584×396. Ao escolher um arquivo válido, o organizador vê aquela imagem numa faixa 4:1 antes de salvar. Se a proporção não for 4:1, um aviso diz que a imagem pode ficar desconfigurada, e o salvamento continua permitido. Arquivo de outro tipo ou maior que 8 MB é recusado na hora: não entra como imagem do evento. Na edição, se já houver imagem salva, ela aparece nesse campo. O organizador pode substituí-la por outro arquivo ou marcar remoção. Incluir, trocar e remover só valem depois de salvar, junto com os outros dados do evento. Salvar sem mexer na imagem mantém a que já estava. Criar sem escolher imagem grava o evento sem imagem. Um arquivo recusado não bloqueia o restante para sempre: o organizador descarta aquela seleção e pode salvar sem imagem, ou escolher outro arquivo.
- **Entradas e saídas:** Entram, além dos dados do evento que já existem, um arquivo opcional escolhido pelo organizador, ou o pedido de remover a imagem atual. Saem o evento gravado com imagem, com outra imagem, ou sem imagem; a faixa de prévia no próprio formulário; o aviso de proporção quando couber; a mensagem de recusa quando o arquivo for inválido. A página pública e a lista ainda não precisam exibir a imagem nesta spec — isso é a Spec 02 e a Spec 03. A prova de que gravou é reabrir a edição e ver a imagem salva, ou ver o campo vazio depois de remover e salvar.
- **Dados/entidades envolvidos (conceitual):** O evento já existente (título, detalhes, data, horário, local, link, janela de confirmação e cores do tema) passa a poder ter uma imagem ilustrativa, ou nenhuma. A imagem tem o arquivo em si e a proporção largura por altura, usada só para decidir o aviso. Não há galeria nem histórico de imagens anteriores: a nova substitui a antiga.
- **Estados e transições:**
  - Sem imagem → com imagem, quando o organizador salva um arquivo aceito.
  - Com imagem → com outra imagem, quando salva um novo arquivo aceito.
  - Com imagem → sem imagem, quando marca remoção e salva.
  - Arquivo recusado não muda o estado já salvo.
  - Seleção ainda não salva não muda a página pública nem a lista.
- **Regras de negócio:** Regras 1, 2, 4, 5, 6, 7 e 8.
- **Validações:**
  - Ausência de arquivo na criação é válida.
  - jpg e jpeg, e png, até 8 MB inclusive, são aceitos.
  - Qualquer outro formato é recusado, com explicação.
  - Arquivo acima de 8 MB é recusado, com explicação.
  - Proporção diferente de 4:1 gera aviso e não gera erro. Proporção 4:1 não gera esse aviso. Um pixel de arredondamento não conta como diferença.
  - As validações já existentes de título, data, horário, local e detalhes continuam valendo. Uma imagem inválida não serve de desculpa para gravar o restante com dados inválidos, nem o contrário: dados válidos não gravam um arquivo recusado.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a criação ou a edição.
  2. Lê que a imagem é opcional e qual é o formato, o tamanho e a proporção esperados.
  3. Não escolhe imagem, ou escolhe um arquivo, ou, na edição, pede para remover a atual.
  4. Se o arquivo for recusado, lê o motivo e decide outro arquivo ou segue sem aquela seleção.
  5. Se a proporção fugir de 4:1, lê o aviso.
  6. Salva.
  7. Ao reabrir a edição, vê a imagem salva ou o campo vazio, conforme o que gravou.
- **Casos de borda e erros:**
  - Arquivo vazio, corrompido ou que não seja imagem: recusar, como formato inválido.
  - Webp, gif, svg, pdf e outros: recusar.
  - Exatamente 8 MB: aceitar. Acima de 8 MB: recusar.
  - 1584×396: aceitar sem aviso de proporção.
  - Outro tamanho ainda em 4:1 (por exemplo, metade de cada lado): aceitar sem aviso.
  - Proporção diferente: aviso, e salvar se o organizador confirmar o formulário.
  - Trocar por um arquivo inválido: a imagem anterior permanece.
  - Marcar remoção e sair sem salvar: a imagem anterior permanece.
  - Organizador sem sessão: não acessa criação nem edição, como já acontece hoje.
  - Falha ao gravar: a imagem anterior permanece e o organizador é informado de que não foi possível salvar.
- **Impacto no existente:** Os formulários de criar e editar ganham o campo de imagem. Título, detalhes, data, horário, local, slug, confirmações e tema continuam com as regras atuais. A página pública e a lista só passam a mostrar a imagem nas specs seguintes; até lá, gravar a imagem não precisa mudar o que o convidado vê.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado a criação de um evento sem arquivo, quando o organizador salva os dados obrigatórios válidos, então o evento existe e a edição abre sem imagem.
  - Dado um jpg ou png de até 8 MB em 4:1, quando o organizador salva, então a edição reaberta mostra essa imagem e não mostra o aviso de proporção.
  - Dado um jpg ou png de até 8 MB fora de 4:1, quando o organizador seleciona o arquivo, então vê o aviso de que pode ficar desconfigurada e, ao salvar, a imagem fica gravada.
  - Dado um arquivo que não é jpg nem png, ou maior que 8 MB, quando o organizador seleciona, então o sistema explica a recusa, não grava esse arquivo e não apaga uma imagem já salva.
  - Dado um evento com imagem, quando o organizador escolhe outra imagem válida e salva, então a edição mostra só a nova.
  - Dado um evento com imagem, quando o organizador pede para remover e salva, então a edição abre sem imagem.
  - Dado um evento com imagem, quando o organizador escolhe outra imagem ou pede remoção e sai sem salvar, então a imagem anterior continua gravada.
  - Dado um evento com imagem, quando o organizador altera só título ou local e salva, então a imagem continua a mesma.
- **Definição de pronto:** Dá para criar sem imagem, criar com imagem válida, receber aviso sem bloqueio fora de 4:1, ser impedido de gravar tipo ou tamanho inválidos, trocar, remover, e manter a imagem quando o restante do formulário é salvo sem mexer nela. Reabrir a edição comprova o resultado.
- **Dependências:** Nenhuma. Usa o evento e a conta do organizador que já existem.
- **Fora do escopo desta spec:** Exibir a faixa na página pública, mover a frase “Confirmação de presença”, miniatura na lista, prévia do tema e ferramenta de recorte.

### Spec 02 — Página pública na nova ordem

- **Fase:** Fase 1
- **Objetivo (o quê):** A página pública passa a mostrar, nesta ordem, a faixa da imagem (se existir), as informações do evento e a confirmação, com a frase “Confirmação de presença” acima do campo de nome.
- **Intenção (por quê):** A imagem ilustra o evento no primeiro olhar, e a frase de confirmação fica junto do campo em que o convidado age. A ordem vale para todos os eventos, para não existir um layout antigo e outro novo.
- **Contexto:** A página pública hoje mostra, de cima para baixo: a frase “Confirmação de presença”, o título, os detalhes (se houver), data, horário e local, e então o campo de nome com o botão “Eu vou!”, ou “Confirmação indisponível” se a confirmação estiver encerrada. O tema do evento colore o fundo, a frase, o título, os detalhes, os rótulos e os valores de data, horário e local, e o botão. A prévia do tema repete esse miolo com os dados reais do evento e um campo de nome somente leitura. Evento inexistente ou excluído mostra “Evento indisponível”. Link antigo redireciona para o slug atual.
- **Atores:** Convidado, na página pública. Organizador, na prévia do tema, só como quem confere o resultado.
- **Descrição do comportamento:** Com imagem salva, o primeiro elemento do convite é a faixa horizontal 4:1, na largura do conteúdo do convite, não da janela inteira. Sem imagem, esse lugar não existe e não sobra vão. Em seguida vêm o título, os detalhes quando houver texto, e data, horário e local, na mesma ordem e com as mesmas regras de hoje. A frase “Confirmação de presença” sai de cima do título. Quando a confirmação está aberta, a seção de confirmação começa com essa frase, imediatamente acima do rótulo e do campo de nome completo, e segue com o botão “Eu vou!”. Avisos de sucesso e de erro continuam como hoje e não substituem a frase: o campo permanece para confirmar outra pessoa, e a frase continua acima dele. Quando a confirmação está encerrada, a seção mostra somente “Confirmação indisponível”, sem a frase e sem o campo. A cor de título do tema continua pintando a frase no lugar novo, além do título, dos detalhes e de data, horário e local. A imagem em si não muda de cor. A prévia do tema usa a mesma ordem, mostra a imagem já salva (ou nenhuma) e coloca a frase acima do campo de nome somente leitura. A prévia não mostra uma imagem que ainda não foi salva no formulário de edição.
- **Entradas e saídas:** Entram o evento público já existente e, se a Spec 01 tiver gravado, a imagem. Saem a página na ordem nova e a prévia do tema equivalente. Não há entrada do convidado nesta spec além de abrir o link.
- **Dados/entidades envolvidos (conceitual):** Evento (título, detalhes, data, horário, local, tema e, opcionalmente, a imagem). Confirmação de presença já existente (aceita ou não nome novo; campo de nome; botão). A imagem é só exibida.
- **Estados e transições:**
  - Sem imagem: página começa no título.
  - Com imagem: página começa na faixa.
  - Confirmação aberta: frase, campo de nome e botão.
  - Confirmação encerrada: só “Confirmação indisponível”.
  - Passar a ter, trocar ou perder imagem só muda a faixa depois que a Spec 01 gravou essa mudança.
- **Regras de negócio:** Regras 3, 4, 5 (a parte de preencher a faixa), 9, 10, 11, 13, 15 e 16.
- **Validações:** Não se aplica a um formulário novo. A página só exibe imagem que já tenha sido aceita e salva. Se a imagem não puder ser mostrada (arquivo ausente ou falha ao carregar), a página segue sem a faixa e o restante permanece utilizável. **Suposição:** essa falha não exibe aviso ao convidado.
- **Fluxo do usuário (passo a passo):**
  1. O convidado abre o link atual, ou um link antigo que cai no atual.
  2. Vê a faixa somente se o evento tiver imagem salva.
  3. Lê título, detalhes se existirem, data, horário e local.
  4. Se a confirmação estiver aberta, lê “Confirmação de presença”, escreve o nome e usa “Eu vou!”.
  5. Se estiver encerrada, lê “Confirmação indisponível”.
- **Casos de borda e erros:**
  - Evento sem imagem: nenhuma faixa e nenhum espaço reservado; a frase mesmo assim não volta para cima do título.
  - Detalhes vazios: continuam ocultos, como hoje.
  - Imagem fora de 4:1 já salva: a faixa continua 4:1 e a imagem preenche o espaço, podendo ficar esticada. Sem aviso para o convidado.
  - Confirmação que encerra depois que a página já estava aberta: o comportamento de deixar de aceitar nome continua o atual; a frase some junto com o campo, no estado “Confirmação indisponível”.
  - Sucesso ao confirmar: a frase permanece acima do campo esvaziado, para outra pessoa.
  - Evento indisponível ou excluído: mensagem atual, sem imagem e sem a nova estrutura do convite.
  - Prévia do tema com imagem ainda não salva no formulário ao lado: a prévia mostra a última imagem salva, ou nenhuma.
  - Cores do tema: continuam valendo nos textos já cobertos pelo tema, inclusive na frase no lugar novo. Campo de nome, avisos e “Confirmação indisponível” não ganham cor nova por causa desta spec.
- **Impacto no existente:** Toda página pública de evento muda de ordem, mesmo as que nunca terão imagem. A prévia do tema acompanha. O painel, fora dessa prévia, não muda nesta spec. Confirmar presença, janela e tema guardam e aplicam as mesmas regras; só a posição da frase muda.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento sem imagem e com confirmação aberta, quando o convidado abre o link, então não há faixa, o título é o primeiro texto do convite, e “Confirmação de presença” está imediatamente acima do campo de nome completo.
  - Dado um evento com imagem salva, quando o convidado abre o link, então a faixa 4:1 aparece antes do título e ocupa a largura do conteúdo do convite.
  - Dado um evento com imagem fora de 4:1, quando o convidado abre o link, então a faixa permanece 4:1, a imagem a preenche, e não há aviso de proporção.
  - Dado um evento com confirmação encerrada, com ou sem imagem, quando o convidado abre o link, então a seção mostra “Confirmação indisponível” e não mostra a frase nem o campo de nome.
  - Dado um evento com tema personalizado, quando o convidado abre o link, então a frase no lugar novo usa a cor de título, e a imagem não é recolorida.
  - Dado a prévia do tema de um evento com imagem já salva, quando o organizador abre a prévia, então a ordem é a mesma da página pública, com a faixa e com a frase acima do campo de nome somente leitura.
  - Dado um slug antigo do mesmo evento, quando o convidado é levado ao slug atual, então vê a imagem e a ordem do evento atual.
  - Dado um evento inexistente ou excluído, quando alguém abre o endereço, então vê “Evento indisponível” sem imagem.
- **Definição de pronto:** Qualquer evento público, com ou sem imagem, está na ordem nova; a frase só aparece com o campo de nome; a prévia do tema coincide com essa página; evento indisponível permanece sem imagem.
- **Dependências:** Spec 01 — para existir imagem salva a exibir. A ordem sem imagem pode ser conferida mesmo antes, mas a faixa no topo só fica demonstrável com a Spec 01.
- **Fora do escopo desta spec:** O formulário de enviar e remover (Spec 01), a miniatura da lista (Spec 03), recorte da imagem e mudança das regras de confirmação ou de cor.

### Spec 03 — Miniatura na lista de eventos

- **Fase:** Fase 1
- **Objetivo (o quê):** O card de cada evento na lista do painel mostra uma miniatura da imagem salva, acima do título.
- **Intenção (por quê):** O organizador reconhece o evento pela mesma ilustração da página pública, sem abrir o link.
- **Contexto:** A lista do painel, quando há eventos, mostra um card por evento com título, se a confirmação está aberta ou encerrada, data, horário e local. O card inteiro abre a área daquele evento. A lista vazia explica que ainda não há evento e oferece criar o primeiro. Esta spec não muda essa lista vazia nem o destino do card.
- **Atores:** Organizador autenticado.
- **Descrição do comportamento:** Se o evento tem imagem salva, o card mostra essa imagem numa faixa pequena 4:1, acima do título. O restante do card permanece: título, estado da confirmação, data, horário e local. Se não tem imagem, o card é o de hoje, sem faixa e sem espaço vazio. A miniatura usa a imagem já salva. Seleção ainda não salva no formulário não aparece na lista. Fora de 4:1, a miniatura também preenche a faixa e pode ficar esticada, sem aviso na lista. O card continua sendo um único acesso à área do evento.
- **Entradas e saídas:** Entra a lista de eventos do organizador, cada um com ou sem imagem salva. Sai o card com miniatura ou o card atual, se não houver imagem.
- **Dados/entidades envolvidos (conceitual):** Evento da lista (título, data, horário, local, se a confirmação está aberta ou encerrada, e a imagem opcional). A miniatura não é uma segunda imagem: é a mesma da página pública.
- **Estados e transições:**
  - Sem imagem: card sem miniatura.
  - Com imagem: card com faixa acima do título.
  - A mudança aparece na lista depois do salvamento da Spec 01.
- **Regras de negócio:** Regras 3, 7 e 12.
- **Validações:** Não se aplica. A lista só mostra imagem já aceita. Se a imagem não carregar, o card segue sem a faixa e o título continua visível. **Suposição:** sem aviso extra na lista.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a lista de eventos.
  2. Em cada card com imagem, vê a miniatura acima do título.
  3. Em cada card sem imagem, vê o card como antes.
  4. Abre o evento pelo card, como já faz.
- **Casos de borda e erros:**
  - Lista vazia: permanece o estado vazio atual, sem miniatura.
  - Todos sem imagem: nenhum card ganha faixa.
  - Mistura: só os eventos com imagem mostram miniatura.
  - Imagem fora de 4:1: miniatura em faixa 4:1, preenchida, sem aviso.
  - Evento recém-salvo: a lista passa a refletir inclusão, troca ou remoção.
  - Falha ao carregar uma miniatura: aquele card aparece sem faixa; os outros não são afetados.
- **Impacto no existente:** Só o card da lista, e só quando há imagem. Ordem da lista, badge de confirmação aberta ou encerrada, e o caminho até a área do evento continuam iguais.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com imagem salva, quando o organizador abre a lista, então o card mostra a faixa 4:1 acima do título e mantém data, horário, local e o estado da confirmação.
  - Dado um evento sem imagem, quando o organizador abre a lista, então o card não tem miniatura nem espaço vazio no lugar dela.
  - Dado uma imagem escolhida e ainda não salva, quando o organizador abre a lista sem salvar, então o card não usa essa seleção.
  - Dado um evento cuja imagem acabou de ser removida e salva, quando o organizador volta à lista, então o card não tem miniatura.
  - Dado a lista sem eventos, quando o organizador a abre, então continua vendo o estado vazio atual.
  - Dado um card com miniatura, quando o organizador o aciona, então chega à área daquele evento.
- **Definição de pronto:** A lista mostra a miniatura só nos eventos com imagem salva, acima do título, e o card sem imagem permanece o atual.
- **Dependências:** Spec 01 — a imagem precisa estar gravada no evento. Não depende da Spec 02 para funcionar, embora as duas exibam o mesmo arquivo.
- **Fora do escopo desta spec:** Página pública, prévia do tema, envio e remoção no formulário, e miniatura em qualquer outra tela do painel.

## 14. Ordem recomendada de implementação

1. Spec 01 — Enviar, trocar e remover a imagem
2. Spec 02 — Página pública na nova ordem
3. Spec 03 — Miniatura na lista de eventos

A Spec 01 grava a imagem que as outras exibem. A Spec 02 entrega o que o convidado vê e a ordem nova, inclusive nos eventos sem imagem. A Spec 03 é o complemento no painel e pode vir por último sem impedir a página pública. Seguir essa ordem evita mostrar uma faixa que ainda não tem como ser gravada, e evita tratar a miniatura antes de existir imagem no evento.
