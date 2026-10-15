# PRD — Imagem do perfil do organizador

> Tipo: PRD de feature · Data: 2026-10-15
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

O organizador passa a poder enviar **uma imagem** do próprio perfil em **Meu perfil**. Essa imagem aparece em círculo no menu do painel, ao lado do nome. Se o nome ainda não foi gravado, o menu mostra o e-mail da conta no lugar do nome.

A mesma imagem aparece em tamanho menor na lista **Organizadores** da ficha do evento, uma para cada pessoa daquela lista. Quem ainda não enviou imagem vê um círculo com um ícone genérico de pessoa.

A página pública do evento não mostra essa imagem.

## 2. Problema que resolve

No menu, a conta aparece só pelo e-mail, e apenas em tela larga. Na lista **Organizadores**, as pessoas se distinguem por nome e e-mail, sem um retrato. Quem organiza o evento junto com outras contas não reconhece o colega de um olhar.

A imagem fecha isso no painel, sem obrigar quem não quer foto a enviar uma, e sem levar o perfil do organizador para o convidado.

## 3. Público-alvo

O **organizador autenticado** no painel: ao enviar, trocar ou remover a própria imagem, e ao ver a própria imagem e o próprio nome (ou e-mail) no menu.

O **criador** e o **organizador incluído**, ao verem a imagem pequena de cada pessoa na lista **Organizadores** de um evento que eles organizam.

O convidado da página pública não usa esta feature e não vê a imagem.

## 4. Objetivo do recorte atual

Cada conta pode ter uma imagem de perfil ou nenhuma. O organizador define isso em **Meu perfil**. O menu do painel mostra essa imagem com o nome, ou com o e-mail se o nome não estiver gravado. A lista **Organizadores** repete a imagem de cada conta, em tamanho pequeno. Sem imagem, os dois lugares mostram o círculo com o ícone genérico de pessoa.

## 5. Funcionalidades

**Essenciais:**

- Enviar, trocar e remover uma imagem opcional em **Meu perfil**.
- Aceitar jpg ou png de até 2 MB. Mostrar a imagem em círculo, enquadrando o centro quando o arquivo não for quadrado.
- Sem imagem, mostrar um círculo com ícone genérico de pessoa.
- No menu do painel, mostrar a imagem da conta logada e o nome (nome e sobrenome). Sem nome gravado, mostrar o e-mail.
- Na lista **Organizadores** da ficha, mostrar a imagem pequena de cada organizador, criador e incluídos.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Exibir a imagem, o nome ou o e-mail do organizador na página pública do evento.
- Miniatura na linha **criado por:** dos cards de **Meus Eventos**.
- Iniciais no lugar do ícone genérico.
- Obrigar o envio da imagem para usar o painel ou para gravar nome, telefone e empresa.
- Recortar, filtrar ou reposicionar a imagem dentro do produto. O enquadramento é automático, a partir do centro.
- Mais de uma imagem por conta.
- Uma imagem diferente por evento. A imagem é da conta e se repete em todo evento em que a pessoa organiza.
- Trocar a imagem de outra conta.
- Formatos que não sejam jpg ou png (webp, gif, svg, pdf e outros).
- Mostrar telefone ou empresa no menu ou na lista.
- Alterar as regras já existentes de nome, sobrenome, telefone, empresa e e-mail de login.
- Cadastro de conta, convite e aviso por e-mail.

## 7. Regras de negócio

- Regra 1: A imagem é da conta do organizador, não do evento. Há no máximo uma. Enviar outra substitui a anterior depois que a gravação da imagem dá certo.
- Regra 2: A imagem é opcional. Conta sem imagem continua podendo usar o painel, gravar o perfil e organizar eventos.
- Regra 3: Sem imagem salva, o menu, **Meu perfil** e a lista **Organizadores** mostram um círculo com ícone genérico de pessoa. O círculo ocupa o lugar da imagem; não fica um espaço vazio sem nada dentro.
- Regra 4: A imagem é mostrada em círculo. Ela preenche o círculo e o que passa da borda fica de fora, a partir do centro. Arquivo que não é quadrado é aceito. Não há aviso por causa da proporção e não há ferramenta de recorte.
- Regra 5: O arquivo precisa ser jpg ou png e ter no máximo 2 MB. **Suposição:** arquivo .jpeg conta como jpg. Arquivo maior que 2 MB, ou que não seja jpg nem png, é recusado: não é gravado e não substitui nem apaga a imagem já salva.
- Regra 6: Gravar ou remover a imagem não exige nome nem sobrenome e não altera nome, sobrenome, telefone, empresa nem e-mail. Uma conta sem nome pode ter imagem. Uma tentativa inválida de salvar nome, sobrenome, telefone ou empresa não troca nem apaga a imagem já salva.
- Regra 7: A imagem nova, ou a remoção, só passa a valer no menu e na lista **Organizadores** depois da gravação bem-sucedida. Sair de **Meu perfil** sem gravar mantém a imagem anterior, ou a ausência dela.
- Regra 8: Só o dono da conta envia, troca ou remove a própria imagem. Outro organizador vê a imagem na lista, mas não a altera.
- Regra 9: No menu, o texto ao lado da imagem é o nome e o sobrenome gravados em **Meu perfil**, nesta ordem, separados por espaço. Faltando um dos dois, o texto é o e-mail da conta. O menu não mostra os dois ao mesmo tempo. Telefone e empresa não entram no menu.
- Regra 10: O bloco do menu (círculo e texto) aparece em tela larga e em tela estreita, no lugar em que hoje o e-mail da conta aparece ao lado de **Sair**. Nome ou e-mail longo é cortado para **Sair**, **Novo Evento** e os links do menu continuarem utilizáveis.
- Regra 11: Na lista **Organizadores**, cada pessoa (criador e incluídos) tem um círculo menor que o do menu, à esquerda do nome. A imagem é a da conta daquela pessoa. O nome, o e-mail, a marca de criador, incluir, remover e sair continuam como já são.
- Regra 12: Atualizar ou remover a imagem atualiza o menu da própria conta e a lista de todo evento em que essa conta organiza, na próxima vez em que essas telas são mostradas.
- Regra 13: Quem não organiza o evento não vê a lista nem as imagens dela. A página pública não mostra a imagem do organizador.
- Regra 14: Se a imagem salva não puder ser exibida, o círculo volta ao ícone genérico e o texto (nome ou e-mail) permanece. A falha de exibição não apaga a imagem salva.

## 8. Fluxos principais

### Fluxo 1 — Enviar a primeira imagem

1. O organizador autenticado abre **Meu perfil**.
2. Vê o círculo com o ícone genérico de pessoa.
3. Escolhe um jpg ou png de até 2 MB.
4. O círculo em **Meu perfil** mostra a imagem escolhida, já em círculo, para ele conferir.
5. Ele confirma a gravação da imagem.
6. O sistema grava. **Meu perfil** confirma o sucesso.
7. O menu passa a mostrar essa imagem. O texto do menu é o nome, ou o e-mail se o nome ainda não foi gravado.

### Fluxo 2 — Trocar ou remover

1. Em **Meu perfil**, o organizador vê a imagem já salva.
2. Escolhe outra imagem válida e confirma, ou pede para remover.
3. Depois da gravação, o menu e as listas **Organizadores** em que ele aparece usam a imagem nova, ou voltam ao ícone genérico se ele removeu.

### Fluxo 3 — Arquivo recusado

1. O organizador escolhe um arquivo que não é jpg nem png, ou que passa de 2 MB.
2. O sistema recusa aquele arquivo e explica o limite.
3. A imagem já salva, se houver, permanece. O menu não muda.

### Fluxo 4 — Ver os organizadores do evento

1. O criador ou um organizador incluído abre a ficha do evento.
2. Na lista **Organizadores**, cada pessoa aparece com um círculo pequeno: a imagem da conta, ou o ícone genérico se aquela conta não tiver imagem.
3. O nome e o e-mail de cada pessoa continuam visíveis, como hoje.

## 9. Critérios de aceite

- O organizador consegue enviar uma imagem jpg ou png de até 2 MB em **Meu perfil**, e depois trocá-la ou removê-la.
- Sem imagem, o menu, **Meu perfil** e a lista **Organizadores** mostram um círculo com ícone genérico de pessoa.
- O menu mostra a imagem da conta logada e o nome e o sobrenome. Se o nome ainda não foi gravado, mostra o e-mail. Isso vale em tela larga e em tela estreita.
- A lista **Organizadores** mostra a imagem pequena de cada organizador do evento.
- O sistema não deve gravar arquivo que não seja jpg ou png, nem arquivo maior que 2 MB, e não deve apagar a imagem anterior nesses casos.
- O sistema não deve exigir nome para gravar a imagem, nem apagar a imagem quando uma gravação de nome, telefone ou empresa falha.
- A página pública não deve mostrar a imagem do organizador.
- A linha **criado por:** dos cards de **Meus Eventos** não deve ganhar essa imagem.

## 10. Stack

A feature usa o que o Confirm Event já tem: Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, formulários com validação no cliente e no servidor, e Supabase (Auth para a sessão; Postgres para os dados da conta). O produto já aceita imagem jpg ou png no evento. Não exige serviço externo novo.

## 11. Justificativa da stack

**Meu perfil**, o menu do painel e a lista **Organizadores** já existem nessa stack. A imagem é mais um dado opcional da mesma conta. O nome exibido já segue a regra de usar nome e sobrenome ou, na falta deles, o e-mail. A entrega reutiliza isso.

## 12. Fases de construção

### Fase 1 — Imagem do organizador

Objetivo: a conta ter uma imagem opcional, o menu mostrar essa imagem com o nome ou o e-mail, e a lista **Organizadores** repetir a imagem em tamanho pequeno.

Specs:

- Spec 01 — Imagem em Meu perfil e no menu
- Spec 02 — Imagem pequena na lista de organizadores

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Imagem em Meu perfil e no menu

- **Fase:** Fase 1 — Imagem do organizador
- **Objetivo (o quê):** O organizador envia, troca ou remove a própria imagem em **Meu perfil**, e o menu do painel passa a mostrar essa imagem junto do nome ou, se o nome não existir, do e-mail.
- **Intenção (por quê):** A pessoa precisa se reconhecer no painel sem depender só do e-mail, e precisa fazer isso num lugar que já é dela. A imagem sem o nome ao lado não diz quem é; o nome sem um retrato continua anônimo quando há várias contas no mesmo evento.
- **Contexto:** **Meu perfil** já mostra o e-mail de login bloqueado e já grava nome, sobrenome, telefone e empresa. Nome e sobrenome são obrigatórios para gravar esses dados; telefone e empresa são opcionais. O menu já tem **Meus Eventos**, **Meu perfil**, **Novo Evento** e **Sair**. Hoje o e-mail da conta aparece ao lado de **Sair** só em tela larga. Não existe imagem de perfil. A página pública, a lista de eventos e a lista **Organizadores** não mudam nesta spec. A imagem pequena da lista é a Spec 02.
- **Atores:** O organizador autenticado, sobre a própria conta. O convidado não participa.
- **Descrição do comportamento:** Em **Meu perfil**, acima ou junto dos dados já existentes, há um círculo da conta. Sem imagem salva, o círculo contém um ícone genérico de pessoa. O organizador pode escolher um arquivo. Se o arquivo for jpg ou png e tiver até 2 MB, o círculo de **Meu perfil** passa a mostrar essa escolha, preenchendo o círculo a partir do centro, para ele conferir antes de gravar. Ele confirma a gravação. Se der certo, a imagem fica salva, a área confirma **Imagem salva.** e o menu de todas as páginas do painel mostra essa imagem. Se já houver imagem, escolher outra válida e gravar substitui a anterior. Se houver imagem salva, existe a ação de remover. Remover, depois de confirmada a gravação, apaga a imagem, confirma **Imagem removida.** e o círculo volta ao ícone genérico. Essa gravação não pede nome nem sobrenome e não mexe em nome, sobrenome, telefone, empresa nem e-mail. O formulário que já existe para esses campos continua com as regras atuais. Falhar nele não altera a imagem. No menu, o círculo fica ao lado de **Sair**, visível em tela larga e em tela estreita. Ao lado do círculo, o texto é o nome e o sobrenome, se os dois estiverem gravados; senão, é o e-mail. O texto longo é cortado. **Meus Eventos**, **Meu perfil**, **Novo Evento** e **Sair** continuam no menu. Enquanto a imagem nova não for gravada, o menu segue com a imagem anterior ou com o ícone. Arquivo inválido não entra no círculo como escolha pendente: a área avisa e mantém o que já estava salvo. Se a imagem salva não puder ser desenhada, o círculo mostra o ícone genérico e o texto do menu continua.
- **Entradas e saídas:**
  - Entrada ao abrir **Meu perfil**: a conta autenticada, a imagem já salva ou a ausência dela, e o nome, o sobrenome e o e-mail já conhecidos.
  - Entrada ao gravar a imagem: o arquivo escolhido, ou o pedido de remover.
  - Saída em sucesso: a imagem da conta atualizada ou removida; confirmação **Imagem salva.** ou **Imagem removida.**; o menu reexibe o círculo correspondente e o nome ou o e-mail.
  - Saída com arquivo inválido: imagem anterior intacta; aviso **Envie uma imagem jpg ou png de até 2 MB.**
  - Saída com falha ao gravar: imagem anterior intacta; aviso **Não foi possível salvar a imagem. Tente de novo.**
  - Saída com falha ao remover: imagem anterior intacta; aviso **Não foi possível remover a imagem. Tente de novo.**
- **Dados/entidades envolvidos (conceitual):** A conta do organizador passa a ter uma imagem de perfil opcional, além do e-mail de login e do perfil já existente (nome, sobrenome, telefone, empresa). Uma imagem por conta. Ausência de imagem é o estado inicial, não um erro.
- **Estados e transições:**
  - **Sem imagem:** círculo com ícone genérico. É o estado das contas que já existem quando a feature entra no ar, e o estado depois de uma remoção bem-sucedida.
  - **Com imagem:** círculo com a imagem salva.
  - Ir para **com imagem:** gravar um jpg ou png de até 2 MB.
  - Voltar para **sem imagem:** remover com sucesso.
  - Permanecer no estado anterior: arquivo inválido, sair sem gravar, ou falha ao gravar ou ao remover. A tela de **Meu perfil** pode mostrar a escolha ainda não gravada só enquanto o arquivo for válido e a pessoa não tiver saído; o menu só muda depois do sucesso.
- **Regras de negócio:** Regras 1 a 10, 12 e 14 da seção 7, no que diz respeito à própria conta e ao menu. A lista **Organizadores** não entra aqui.
- **Validações:**
  - Arquivo ausente não é uma gravação. Não há o que salvar se a pessoa não escolheu arquivo nem pediu para remover.
  - Jpg ou png, incluindo .jpeg como jpg. Até 2 MB, inclusive o arquivo que tem exatamente 2 MB. Acima de 2 MB é inválido.
  - Qualquer outro formato é inválido, mesmo que o nome do arquivo termine em .jpg ou .png e o conteúdo não seja essa imagem.
  - Proporção e tamanho em pixels não bloqueiam. O círculo corta a partir do centro.
  - Nome, sobrenome, telefone e empresa não são validados de novo por causa da imagem. A validação deles, já existente, continua só no formulário deles.
  - Remover só se aplica quando existe imagem salva. Sem imagem, a ação de remover não aparece.
- **Fluxo do usuário (passo a passo):**
  1. O organizador entra no painel e abre **Meu perfil**.
  2. Vê o círculo com a imagem salva ou com o ícone genérico.
  3. Escolhe um arquivo válido e confere o círculo, ou pede para remover se já houver imagem.
  4. Confirma.
  5. Se der certo, vê a confirmação e, no menu, o círculo novo e o nome ou o e-mail. Se o arquivo for inválido ou a gravação falhar, corrige ou tenta de novo; o menu não muda.
- **Casos de borda e erros:**
  - Conta antiga, sem nome e sem imagem: **Meu perfil** abre com o ícone; o menu mostra o ícone e o e-mail. O restante do painel continua utilizável.
  - Conta sem nome, com imagem válida: a gravação da imagem funciona; o menu mostra a imagem e o e-mail.
  - Conta com nome e sobrenome: o menu mostra a imagem (ou o ícone) e o nome seguido do sobrenome, não o e-mail.
  - Só o nome ou só o sobrenome gravado: o menu usa o e-mail, como a regra de exibição que o produto já usa.
  - Arquivo .jpeg, .jpg ou .png dentro de 2 MB: aceito.
  - Webp, gif, svg, pdf, arquivo vazio ou arquivo acima de 2 MB: recusado com **Envie uma imagem jpg ou png de até 2 MB.** A imagem salva permanece.
  - Imagem muito larga ou muito alta, porém válida e dentro de 2 MB: aceita; o círculo mostra o centro.
  - Escolher um arquivo válido e sair sem gravar: o menu e a próxima abertura de **Meu perfil** mostram a imagem anterior, ou o ícone se não havia imagem.
  - Falha ao gravar ou ao remover: a mensagem correspondente da seção de entradas e saídas; reabrir **Meu perfil** mostra a última imagem válida.
  - Gravação de nome, telefone ou empresa inválida: esses dados não mudam e a imagem também não muda.
  - Atualizar o nome em **Meu perfil** depois da imagem: o menu passa a usar o nome novo e mantém a imagem.
  - Sessão ausente ou expirada ao abrir ou ao gravar: não altera a imagem e segue o retorno ao login já usado no painel.
  - Convidado e página pública: não veem o menu nem a imagem.
  - Imagem salva que não carrega: ícone genérico no círculo; o texto do menu permanece; a imagem não é apagada por isso.
- **Impacto no existente:** **Meu perfil** ganha o círculo e as ações de enviar, trocar e remover a imagem. O e-mail bloqueado e o formulário de nome, sobrenome, telefone e empresa permanecem. O menu deixa de mostrar só o e-mail em tela larga: passa a mostrar o círculo e o nome ou o e-mail em tela larga e em tela estreita. **Sair**, **Novo Evento** e os links **Meus Eventos** e **Meu perfil** permanecem. A página pública, os cards de **Meus Eventos** e a lista **Organizadores** não mudam nesta spec. Esta feature passa a permitir imagem de perfil e a mostrar o nome no menu, o que os recortes anteriores de **Meu perfil** tinham deixado de fora.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o organizador autenticado sem imagem, quando abre **Meu perfil** e olha o menu, então os dois mostram um círculo com ícone genérico de pessoa e o menu mostra o e-mail se o nome não estiver gravado.
  - Dado um jpg ou png de até 2 MB, quando o organizador confirma a gravação em **Meu perfil**, então a imagem fica salva, aparece **Imagem salva.** e o menu mostra essa imagem em círculo.
  - Dado a conta ainda sem nome e sobrenome, quando a imagem é gravada, então a gravação conclui e o menu mostra a imagem seguida do e-mail.
  - Dado nome e sobrenome já gravados, quando o menu é exibido, então o texto ao lado da imagem é o nome e o sobrenome, e o e-mail não aparece nesse bloco.
  - Dado o menu em tela estreita, quando o organizador está no painel, então o círculo e o nome ou o e-mail continuam visíveis, e **Sair** continua utilizável.
  - Dado uma imagem já salva, quando o organizador grava outra imagem válida, então o menu passa a mostrar a nova e a anterior deixa de aparecer.
  - Dado uma imagem já salva, quando o organizador confirma a remoção, então aparece **Imagem removida.** e o menu volta ao ícone genérico.
  - Dado não haver imagem salva, quando o organizador olha **Meu perfil**, então não há ação de remover.
  - Dado um arquivo que não é jpg nem png, ou maior que 2 MB, quando o organizador tenta usá-lo, então aparece **Envie uma imagem jpg ou png de até 2 MB.** e a imagem já salva permanece no menu.
  - Dado um arquivo válido ainda não gravado, quando o organizador sai de **Meu perfil** sem confirmar, então o menu mantém a imagem anterior.
  - Dado uma falha ao salvar a imagem, quando o organizador reabre **Meu perfil**, então vê a última imagem válida, ou o ícone se nunca houve imagem.
  - Dado uma tentativa inválida de salvar nome, sobrenome, telefone ou empresa, quando ela é recusada, então a imagem de perfil permanece como estava.
  - Dado a página pública de um evento, quando o convidado a abre, então a imagem do organizador não aparece.
- **Definição de pronto:** O organizador grava, troca e remove a própria imagem em **Meu perfil**, com as mensagens de sucesso, de arquivo inválido e de falha. O menu mostra o círculo e o nome ou o e-mail em tela larga e estreita. Sem imagem, o ícone genérico aparece. Nome, telefone, empresa, e-mail de login e a página pública seguem as regras já existentes.
- **Dependências:** Nenhuma spec deste PRD. Depende de **Meu perfil** e do menu do painel já existentes, inclusive da regra de exibir nome e sobrenome ou, na falta de um deles, o e-mail.
- **Fora do escopo desta spec:** A lista **Organizadores**, a linha **criado por:**, a página pública, recorte manual da imagem e imagem de outra conta.

### Spec 02 — Imagem pequena na lista de organizadores

- **Fase:** Fase 1 — Imagem do organizador
- **Objetivo (o quê):** A lista **Organizadores** da ficha do evento mostra, em círculo pequeno, a imagem de perfil de cada organizador.
- **Intenção (por quê):** O menu identifica só quem está logado. Na ficha, o criador e quem foi incluído precisam distinguir as outras contas daquele evento sem ler o e-mail inteiro primeiro. A imagem pequena repete o retrato que a pessoa escolheu, no tamanho de uma lista.
- **Contexto:** A Spec 01 já grava a imagem na conta e já a mostra no menu de quem é dono dela. A ficha do evento já tem a lista **Organizadores**, visível para o criador e para os organizadores incluídos. Cada linha mostra o nome (ou o e-mail, se o nome não estiver gravado), o e-mail da conta, a marca **Criador** na conta criadora, remover para o criador agir sobre um incluído, e sair para o incluído. Quem não organiza o evento não vê essa lista. A página pública não tem essa lista. A linha **criado por:** dos cards não entra aqui.
- **Atores:** O criador e o organizador incluído, ao olharem a lista de um evento que organizam. Nenhum deles altera a imagem de outra pessoa por esta spec. O convidado não participa.
- **Descrição do comportamento:** Em cada linha da lista **Organizadores**, à esquerda do nome, há um círculo menor que o círculo do menu. Se aquela conta tem imagem salva pela Spec 01, o círculo mostra essa imagem, com o mesmo enquadramento a partir do centro. Se não tem, o círculo mostra o mesmo ícone genérico de pessoa. O criador e cada organizador incluído recebem o próprio círculo. O nome, o e-mail abaixo, a marca **Criador**, incluir, remover e sair permanecem. A imagem não substitui o e-mail da linha: a lista continua mostrando o e-mail para conferir quem é a conta. Quando a pessoa grava ou remove a imagem em **Meu perfil**, a próxima abertura da ficha mostra o círculo atualizado em todo evento em que ela organiza. Quem está fora do evento não recebe a lista nem as imagens. A página pública não mostra esses círculos. Se a imagem de uma conta não puder ser exibida, a linha dela cai no ícone genérico e o nome e o e-mail continuam.
- **Entradas e saídas:** Entra a lista de organizadores do evento já visível para quem organiza, e a imagem ou a ausência de imagem de cada conta. Sai a mesma lista, com um círculo pequeno em cada linha. Não há formulário nesta spec.
- **Dados/entidades envolvidos (conceitual):** Cada organizador do evento é uma conta com nome, sobrenome, e-mail e imagem de perfil opcional. A imagem usada é a da conta, a mesma do menu. O evento só reúne essas contas; não tem imagem de organizador própria.
- **Estados e transições:** A linha acompanha o estado da Spec 01 daquela conta: sem imagem, ícone; com imagem, a foto. Não há estado de imagem só neste evento. Trocar ou remover em **Meu perfil** muda a linha na próxima exibição. Não há transição disparada de dentro da lista.
- **Regras de negócio:** Regras 3, 4, 8, 11, 12, 13 e 14 da seção 7. O texto da linha continua o que a lista já usa: nome e sobrenome, ou e-mail se faltar um dos dois, e o e-mail da conta sempre visível na linha.
- **Validações:** Não há envio de arquivo nesta spec. O círculo não fica sem conteúdo: ou mostra a imagem da conta, ou mostra o ícone genérico.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a ficha de um evento que ele cria ou no qual foi incluído.
  2. Na lista **Organizadores**, vê o círculo pequeno de cada pessoa.
  3. Reconhece quem tem foto pela imagem e quem não tem pelo ícone, e continua lendo o nome e o e-mail.
  4. Incluir, remover ou sair segue como já funciona, sem passar pela imagem.
- **Casos de borda e erros:**
  - Todas as contas sem imagem: cada linha tem o ícone genérico, e o restante da linha permanece.
  - Só o criador tem imagem: a linha dele mostra a foto e as outras mostram o ícone.
  - A própria conta logada na lista: o círculo dela é a mesma imagem do menu, em tamanho menor.
  - A pessoa atualiza a imagem e outro organizador abre a ficha depois: vê a imagem nova.
  - A pessoa remove a imagem: a próxima abertura da lista mostra o ícone na linha dela.
  - Conta sem nome: a linha segue mostrando o e-mail como nome de exibição, e o círculo segue a imagem ou o ícone. A falta de nome não esconde o círculo.
  - Imagem que não carrega: ícone genérico naquela linha; nome e e-mail permanecem.
  - Quem não organiza o evento, ou quem não tem sessão: não vê a lista. Sem sessão, o caminho é o login do painel.
  - Lista com o criador e vários incluídos: cada um com o próprio círculo, sem repetir a imagem de outra conta.
  - Página pública e cards de **Meus Eventos**: sem este círculo.
- **Impacto no existente:** Cada linha da lista **Organizadores** ganha o círculo à esquerda do nome. Nome, e-mail, marca **Criador**, inclusão, remoção e saída permanecem. O menu não é redefinido aqui. A página pública e a linha **criado por:** permanecem sem a imagem de perfil.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com criador e organizadores incluídos, quando quem organiza abre a lista **Organizadores**, então cada pessoa tem um círculo pequeno à esquerda do nome.
  - Dado uma dessas contas com imagem salva, quando a lista é exibida, então o círculo dela mostra essa imagem, menor que a do menu.
  - Dado uma conta sem imagem, quando a lista é exibida, então o círculo dela mostra o ícone genérico de pessoa.
  - Dado o organizador logado também está na lista, quando ele compara com o menu, então a imagem é a mesma, em tamanho menor na lista.
  - Dado a pessoa grava ou remove a imagem em **Meu perfil**, quando outro organizador abre a ficha desse evento, então a linha mostra a imagem nova ou o ícone, conforme o que foi gravado.
  - Dado a lista, quando o organizador lê a linha, então o nome, o e-mail e a marca **Criador** continuam visíveis, e telefone e empresa não aparecem.
  - Dado alguém que não organiza o evento, quando tenta ver os organizadores, então não vê a lista nem as imagens.
  - Dado a página pública, quando o convidado a abre, então não há círculo de organizador.
  - Dado um card de **Meus Eventos**, quando a lista de eventos é exibida, então a linha **criado por:** não ganha esta imagem.
- **Definição de pronto:** Toda linha da lista **Organizadores** mostra a imagem da conta ou o ícone genérico, em círculo pequeno, e o restante da ficha, do menu e da página pública segue como já estava depois da Spec 01.
- **Dependências:** Spec 01 — a imagem precisa existir na conta, ou estar ausente de propósito, para a lista saber o que desenhar. Também depende da lista **Organizadores** já existente e de quem pode vê-la.
- **Fora do escopo desta spec:** Enviar, trocar ou remover a imagem; alterar o menu; colocar a imagem em **criado por:** ou na página pública; mudar incluir, remover e sair.

## 14. Ordem recomendada de implementação

1. Spec 01 — Imagem em Meu perfil e no menu
2. Spec 02 — Imagem pequena na lista de organizadores

A Spec 01 vem primeiro porque a lista só repete uma imagem que a conta já sabe gravar e remover. Sem isso, a Spec 02 não tem o que mostrar além do ícone genérico, e o organizador não teria onde enviar a foto. Seguir essa ordem evita uma miniatura na ficha sem origem no perfil.
