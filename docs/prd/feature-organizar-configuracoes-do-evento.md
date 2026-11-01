# PRD — Organizar as configurações do evento

> Tipo: PRD de feature · Data: 2026-11-01
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

A página **Configurações** de um evento já criado passa a mostrar as decisões em quatro seções, nesta ordem: **Geral**, **Visual**, **Organizadores** e **Excluir evento**. Cada seção é um card na largura da área de configurações, ao lado do menu lateral. Em tela menor, o card usa a largura disponível e o conteúdo interno de **Geral** e **Visual** quebra dentro do card.

**Geral** reúne o link, a capacidade máxima e o período de confirmação, e grava só capacidade e período. **Encerrar período** e **Reativar** ficam nesse card e continuam ações próprias. **Visual** reúne o layout, a imagem e **Personalizar**, e grava só layout e imagem. **Personalizar** continua com o salvar do tema. **Organizadores** e **Excluir evento** permanecem os cards que já são, só mudam de lugar na página.

**Suposição:** o título **Configurações do evento** permanece acima das seções. Os rótulos que os campos já usam permanecem (por exemplo, **Capacidade máxima de convidados (opcional)** e **Período de confirmação (opcional)**). **Geral** e **Visual** não ganham um texto novo de descrição do card. O aviso de sucesso de cada **Salvar** continua **Configurações gravadas.**

## 2. Problema que resolve

Quem administra o evento encontra, numa coluna estreita, link, capacidade, período, layout, imagem e personalização misturados, com um único **Salvar** para capacidade, período, layout e imagem. **Organizadores** e **Excluir evento** já estão em cards, no fim. A mistura faz o ajuste do convite parecer a mesma tarefa que o ajuste da página pública, e a coluna estreita não usa a área que a página já tem.

Esta feature separa essas tarefas em seções legíveis, na largura da área, sem mudar quem pode fazer cada ação nem as regras que cada campo já exige.

## 3. Público-alvo

- **Quem já administra o evento no painel** — criador, organizador incluído pelo criador, e conta autenticada num evento antigo ainda aberto a qualquer conta do painel. É a mesma pessoa que hoje abre **Configurações** e altera link, capacidade, período, layout, imagem, tema, encerramento e organizadores.
- **Quem pode excluir** — criador, e conta num evento antigo sem criador. Vê **Excluir evento**. O organizador incluído não vê essa seção.
- **Convidado** — não entra no painel e não vê **Configurações**. Continua só na página pública, que reflete o que foi salvo.

## 4. Objetivo do recorte atual

Reorganizar a página **Configurações** do evento já criado. As seções aparecem na ordem **Geral**, **Visual**, **Organizadores**, **Excluir evento**. O que ainda não está em card passa a estar. O que já está em card permanece um card. **Geral** e **Visual** passam a gravar cada um só os próprios campos. A tela de criar evento, a ficha, a área de convidados e a página pública não mudam de regra.

## 5. Funcionalidades

**Essenciais:**

- Quatro seções, nesta ordem: **Geral**, **Visual**, **Organizadores**, **Excluir evento**.
- Cada seção dentro de um card. **Organizadores** e **Excluir evento** continuam os cards atuais, sem um segundo card em volta.
- Cards um abaixo do outro, cada um na largura toda da área de configurações. Em tela menor, o card acompanha a largura disponível e o conteúdo de **Geral** e **Visual** quebra dentro dele.
- **Geral**, nesta ordem: link, capacidade máxima, período de confirmação, **Salvar**, e **Encerrar período** ou **Reativar** quando a regra atual mostrar um deles.
- **Visual**, nesta ordem: layout da página, imagem, **Salvar**, **Personalizar**.
- **Salvar** de **Geral** grava só capacidade e período. **Salvar** de **Visual** grava só layout e imagem.
- Link, tema, encerrar, reativar, organizadores e exclusão continuam com a ação própria que já têm.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mudar a tela de criar evento. Ela continua pedindo, de uma vez, os campos de hoje, inclusive capacidade, layout, imagem e período.
- Mudar **Editar** da ficha (título, detalhes, data, horário e local) ou a frase que já aparece quando a data nova deixa o período inválido.
- Mudar o card da ficha, **Copiar Link**, **Visualizar Página**, métricas, lista de convidados ou a área de convidados.
- Mudar quem inclui, remove ou sai dos organizadores, o que cada pessoa mostra, ou os textos dessa seção.
- Mudar o que a exclusão apaga, a confirmação dela, quem pode excluir, ou a frase e o botão dentro do card **Excluir evento**.
- Mudar as regras já vigentes de link, capacidade, período, layout, imagem, tema, encerrar e reativar. Muda o lugar do controle e, para capacidade, período, layout e imagem, qual **Salvar** grava o quê.
- Levar **Copiar Link** ou **Visualizar Página** para **Configurações**.
- Juntar o salvar do tema, o **Alterar trecho** ou o encerrar ao **Salvar** de **Geral** ou de **Visual**.
- Criar outro layout, outro tipo de imagem, aviso por e-mail ou uma página nova além da **Configurações** que já existe.
- Renomear campos. **Suposição:** os rótulos atuais permanecem.

## 7. Regras de negócio

- Regra 1: A página **Configurações** de um evento já criado mostra, de cima para baixo, o título **Configurações do evento** e os cards **Geral**, **Visual**, **Organizadores** e, para quem pode excluir, **Excluir evento**. Quem não pode excluir não vê esse último card. O restante da ordem não muda.
- Regra 2: Quem já tem acesso ao evento abre a página e usa **Geral** e **Visual**. Quem não tem acesso não vê a página e não conclui essas ações por tentativa direta. A resposta continua **Você não tem acesso a este evento.** O convidado não vê **Configurações**.
- Regra 3: **Salvar** de **Geral** grava só a capacidade e as duas datas do período. Não altera layout, imagem, trecho do link, tema, título, detalhes, data, horário, local, organizadores nem a exclusão. Não encerra nem reativa a confirmação.
- Regra 4: **Salvar** de **Visual** grava só o layout e a imagem. Não altera capacidade, período, trecho do link, tema, título, detalhes, data, horário, local, organizadores nem a exclusão. Não encerra nem reativa a confirmação.
- Regra 5: Um rascunho ainda não salvo num card permanece na tela quando o outro card grava com sucesso, quando **Alterar trecho** conclui, quando o tema é gravado e quando **Encerrar período** ou **Reativar** conclui. A página pública só reflete o que já foi salvo.
- Regra 6: Dado inválido num card impede só o **Salvar** daquele card. O outro card continua podendo gravar o que for válido nele.
- Regra 7: Capacidade, período, layout e imagem continuam com as regras já vigentes, só separadas por card. Capacidade vazia significa sem limite. Capacidade preenchida é um inteiro a partir de 1. O período leva as duas datas ou nenhuma. As duas datas, quando existem, são dias válidos, o início é anterior ao fim, e as duas são anteriores à data do evento já salva. Layout é **Personalizado** ou **Imagem**. **Imagem** como layout exige uma imagem. Arquivo aceito é jpg ou png de até 8 MB. O aviso de proporção não impede o salvamento quando o arquivo é aceito.
- Regra 8: O link continua com **Alterar trecho**. Não depende de nenhum dos dois **Salvar**. O trecho usa letras, números e hífen, e precisa estar livre no sistema. **Cancelar**, quando o trecho foi editado e ainda não foi confirmado, restaura só o trecho.
- Regra 9: **Encerrar período** só aparece quando a confirmação está aberta, pede confirmação explícita e, se concluído, deixa de aceitar nomes novos. Quem já confirmou permanece na lista. **Reativar** só aparece quando a confirmação está encerrada e remove só o encerramento manual. Se o calendário ainda não abriu ou já fechou, a confirmação continua encerrada e a frase que o painel já usa explica o motivo. Essas ações não gravam o rascunho de capacidade, período, layout ou imagem.
- Regra 10: **Personalizar** abre o diálogo de tema que já existe. O salvar desse diálogo grava só cores, modo de fundo e desfoque. A prévia desse diálogo usa o layout e a imagem escolhidos em **Visual** nesta visita, mesmo que esse **Salvar** ainda não tenha sido usado. Fechar o diálogo sem gravar o tema descarta só o rascunho do tema.
- Regra 11: **Organizadores** e **Excluir evento** mantêm conteúdo, textos, permissões e ações atuais. **Excluir evento** continua com a frase à esquerda e o botão **Excluir** à direita; a frase quebra antes do botão.
- Regra 12: Mudar a data em **Editar** continua não apagando o período. Se a data nova deixar o período inválido, o sistema não grava a data e pede para ajustar ou limpar o período em **Configurações**. O período usado nessa verificação é o já salvo, não um rascunho ainda aberto em **Geral**.

## 8. Fluxos principais

### Fluxo 1 — Ver as configurações

1. Quem tem acesso abre **Configurações** daquele evento.
2. Vê o título e, em cards na largura da área, **Geral**, **Visual** e **Organizadores**.
3. Quem pode excluir vê **Excluir evento** por último. Quem não pode, não vê essa seção.
4. Em tela menor, os mesmos cards continuam nessa ordem, na largura disponível, com o conteúdo de **Geral** e **Visual** quebrando dentro do card.

### Fluxo 2 — Gravar capacidade e período

1. Em **Geral**, a pessoa ajusta a capacidade, o início, o fim, ou deixa o período vazio.
2. Usa o **Salvar** desse card.
3. Se estiver válido, capacidade e período ficam gravados. O aviso é **Configurações gravadas.** Layout, imagem, link e tema ficam como estavam. Um rascunho ainda não salvo em **Visual** continua na tela.
4. A página pública passa a usar a capacidade e o período gravados.

### Fluxo 3 — Gravar layout e imagem

1. Em **Visual**, a pessoa escolhe **Personalizado** ou **Imagem** e, se quiser, troca ou remove a imagem.
2. Usa o **Salvar** desse card.
3. Se estiver válido, layout e imagem ficam gravados. O aviso é **Configurações gravadas.** Capacidade, período, link e tema ficam como estavam. Um rascunho ainda não salvo em **Geral** continua na tela.
4. A página pública passa a usar o layout e a imagem gravados.

### Fluxo 4 — Alterar o trecho do link

1. Em **Geral**, a pessoa vê o endereço atual e o trecho.
2. Informa outro trecho e usa **Alterar trecho**.
3. Se o trecho estiver livre, o endereço passa a ser o novo. Capacidade, período, layout, imagem e tema não mudam por essa ação. O rascunho desses campos continua na tela.

### Fluxo 5 — Encerrar ou reativar

1. Em **Geral**, se a confirmação está aberta, a pessoa vê **Encerrar período**.
2. Confirma. A confirmação encerra. Quem já confirmou permanece na lista. O botão passa a ser **Reativar** quando a regra atual permitir reativar.
3. **Reativar** remove só o encerramento manual. Se o prazo não permitir confirmações, a confirmação continua encerrada e a frase explica o motivo.
4. Capacidade, período, layout e imagem já salvos não mudam. O rascunho ainda não salvo desses campos continua na tela.

### Fluxo 6 — Personalizar o tema

1. Em **Visual**, a pessoa clica em **Personalizar**.
2. Abre o diálogo de tema que já existe. A prévia usa o layout e a imagem escolhidos em **Visual** nesta visita, salvos ou ainda em rascunho.
3. Gravar o tema grava só cores, modo de fundo e desfoque, e fecha só o diálogo.
4. **Geral** e **Visual** continuam com o rascunho que ainda não foi salvo.

## 9. Critérios de aceite

- O usuário com acesso vê, nesta ordem, os cards **Geral**, **Visual** e **Organizadores**, cada um na largura da área de configurações.
- Quem pode excluir vê **Excluir evento** como último card. Quem não pode excluir não vê essa seção.
- Em tela menor, os cards continuam nessa ordem, na largura disponível, e o conteúdo de **Geral** e **Visual** permanece dentro do card.
- **Geral** mostra, nesta ordem, link, capacidade, período, **Salvar** e, quando a regra atual exigir, **Encerrar período** ou **Reativar**.
- **Visual** mostra, nesta ordem, layout, imagem, **Salvar** e **Personalizar**.
- O **Salvar** de **Geral** grava capacidade e período e deixa layout, imagem, link e tema como estavam.
- O **Salvar** de **Visual** grava layout e imagem e deixa capacidade, período, link e tema como estavam.
- Dado inválido num card impede só o **Salvar** daquele card.
- **Alterar trecho**, **Personalizar**, **Encerrar período**, **Reativar**, organizadores e exclusão continuam com o efeito que já têm.
- A tela de criar evento, **Editar** da ficha, a área de convidados e a página pública não ganham esta divisão de seções.
- Quando um card grava, o rascunho ainda não salvo do outro card permanece na tela.

## 10. Stack

A página **Configurações** já existe no painel do evento, no mesmo aplicativo web do projeto: Next.js, React, TypeScript e Tailwind, com autenticação e dados no Supabase. Os controles de link, capacidade, período, layout, imagem, tema, encerramento, organizadores e exclusão já existem nessa página. Esta feature reorganiza essa página e separa o que cada **Salvar** grava. Não pede serviço, biblioteca nem armazenamento novo.

## 11. Justificativa da stack

O recorte muda a organização de uma página que o projeto já tem e o recorte do que cada gravação persiste. A stack atual já cobre formulário, validação, autenticação e a página pública. Introduzir outra ferramenta não ajuda essa entrega.

## 12. Fases de construção

### Fase 1 — Seções da página de configurações

Objetivo: a página **Configurações** passa a exibir as quatro seções em cards na largura da área, e **Geral** e **Visual** passam a gravar cada um só os próprios campos.

Specs:

- Spec 01 — Seções em cards na largura da página
- Spec 02 — Gravação separada de Geral e de Visual

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Seções em cards na largura da página

- **Fase:** Fase 1 — Seções da página de configurações
- **Objetivo (o quê):** Mostrar a página **Configurações** em quatro cards, na ordem **Geral**, **Visual**, **Organizadores** e **Excluir evento**, cada um na largura da área e legível em tela menor.
- **Intenção (por quê):** Quem administra o evento precisa achar link, prazo, aparência, organizadores e exclusão como tarefas separadas, ocupando a área que a página já oferece, em vez de uma coluna estreita com tudo misturado.
- **Contexto:** A página **Configurações** do evento já existe, com o título **Configurações do evento**, o menu lateral do evento e os controles de link, capacidade, período, layout, imagem, tema, encerrar, reativar, organizadores e exclusão. Hoje esses controles ficam numa coluna estreita. **Organizadores** e **Excluir evento** já são cards. Link, capacidade, período, layout, imagem e **Personalizar** ainda não estão num card de seção. **Excluir evento** só aparece para quem já pode excluir. A ficha, a área de convidados, a tela de criar evento e a página pública continuam existindo e não são o alvo desta spec.
- **Atores:** Quem tem acesso ao evento no painel. Quem pode excluir também vê o último card. O organizador incluído vê até **Organizadores**. O convidado não entra nesta página.
- **Descrição do comportamento:** Ao abrir **Configurações**, a pessoa vê o título **Configurações do evento** e, abaixo, um card por seção. A ordem é **Geral**, **Visual**, **Organizadores** e, para quem pode excluir, **Excluir evento**. Não há um card em volta de outro. **Organizadores** e **Excluir evento** continuam um card cada, com o conteúdo, os textos e as ações que já têm. **Geral** e **Visual** são cards novos.
  Dentro de **Geral**, de cima para baixo: o bloco do link (endereço atual, campo **Trecho do link**, **Alterar trecho** e **Cancelar** quando o trecho foi editado e ainda não foi confirmado); a capacidade máxima; o período de confirmação, com início e fim; o **Salvar** desse card; e, por último, **Encerrar período** ou **Reativar** somente quando a regra já vigente mostrar um deles. Se nenhum dos dois se aplicar, esse espaço não mostra botão.
  Dentro de **Visual**, de cima para baixo: a escolha **Layout da página**, com **Personalizado** e **Imagem**; o campo da imagem, obrigatório ou opcional conforme o layout escolhido nesta visita; o **Salvar** desse card; **Personalizar**, que continua abrindo o diálogo **Personalizar a página do evento**.
  Cada card ocupa a largura da área de configurações, ao lado do menu lateral, não por baixo dele. Os cards ficam um abaixo do outro, com separação visível. Em tela menor, cada card usa a largura disponível. Em **Geral** e **Visual**, campos, textos e botões quebram dentro do card e continuam utilizáveis; nada fica cortado fora da tela. As duas opções de layout continuam escolhíveis; quando o card é estreito, uma fica abaixo da outra. O card **Excluir evento** mantém a frase à esquerda e o botão **Excluir** à direita, com a frase quebrando antes do botão. O que cada **Salvar** persiste está na Spec 02. Esta spec já deixa os dois botões nos cards certos e não deixa um **Salvar** único para capacidade, período, layout e imagem.
- **Entradas e saídas:** A entrada é o evento aberto por quem tem acesso, na página **Configurações**. A saída é a página com o título e os cards na ordem e na largura descritas. Para quem não pode excluir, a saída não inclui **Excluir evento**. Sem acesso, a saída continua **Você não tem acesso a este evento.** e a página de configurações não é exibida.
- **Dados/entidades envolvidos (conceitual):** O evento já criado. O papel de quem vê: criador, organizador incluído ou conta de evento antigo sem criador. O link atual do evento. A capacidade máxima. O início e o fim do período de confirmação. O layout da página. A imagem da página. O tema. A lista de organizadores. A possibilidade de excluir o evento.
- **Estados e transições:** A página está carregada com os valores já salvos preenchidos nos campos. **Cancelar** do link só aparece depois que o trecho foi editado e ainda não foi confirmado; ao usá-lo, o trecho volta ao valor salvo e **Cancelar** some. **Encerrar período** aparece com a confirmação aberta; **Reativar** aparece com a confirmação encerrada por ação manual, nas mesmas condições de hoje; nenhum dos dois aparece quando a regra atual não oferece a ação. Não há um estado novo de seção aberta ou fechada: as quatro seções ficam visíveis ao mesmo tempo, salvo **Excluir evento** para quem não pode excluir.
- **Regras de negócio:** Vale a Regra 1, a Regra 2 e a Regra 11. **Geral** e **Visual** mostram os próprios títulos. Não ganham um parágrafo novo de descrição. Os rótulos dos campos permanecem os atuais. **Organizadores** mantém o texto que já explica a seção. **Excluir evento** mantém o título e a frase **Apaga o evento por completo (convidados, configurações e página pública).**
- **Validações:** Esta spec não cria validação nova. O link, a capacidade, o período, a imagem, o tema, o encerrar e a exclusão continuam recusando o que já recusam hoje. O detalhe do que cada **Salvar** valida está na Spec 02.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa abre **Configurações** do evento.
  2. Lê o título e percorre **Geral**, **Visual** e **Organizadores**.
  3. Se puder excluir, encontra **Excluir evento** no fim.
  4. Em uma tela estreita, percorre os mesmos cards e usa os campos sem sair da largura da tela.
- **Casos de borda e erros:**
  - Sem acesso ao evento: a pessoa não vê a página e a tentativa direta responde **Você não tem acesso a este evento.**
  - Organizador incluído: vê **Geral**, **Visual** e **Organizadores**. Não vê **Excluir evento**.
  - Lista de organizadores indisponível: o card **Organizadores** mostra o aviso que já usa hoje, **Organizadores indisponíveis** e **Não foi possível carregar os organizadores.** Os outros cards continuam na página.
  - Confirmação sem ação de encerrar nem de reativar: **Geral** não mostra esses botões e o **Salvar** continua no card.
  - Tela estreita: as opções de layout ficam uma abaixo da outra; botões do link quebram a linha; o endereço longo não empurra a página para o lado.
  - **Excluir evento** em tela estreita: a frase quebra e o botão **Excluir** permanece no fim da mesma linha.
- **Impacto no existente:** A coluna estreita some. Os controles que estavam soltos passam para **Geral** e **Visual**. **Organizadores** deixa de ser a primeira seção em card e passa a ficar depois de **Visual**. **Excluir evento** continua imediatamente depois de **Organizadores**. Ficha, área de convidados, criar evento, menu lateral, cabeçalho do painel e página pública permanecem. O efeito de gravar capacidade, período, layout e imagem muda na Spec 02.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado quem tem acesso ao evento, quando abre **Configurações**, então vê o título **Configurações do evento** e, abaixo, os cards **Geral**, **Visual** e **Organizadores**, nessa ordem, cada um na largura da área ao lado do menu.
  - Dado o criador, quando a página é exibida, então **Excluir evento** é o último card, com a frase à esquerda e o botão **Excluir** à direita.
  - Dado o organizador incluído, quando a página é exibida, então **Excluir evento** não aparece e **Organizadores** é o último card.
  - Dado **Geral**, quando o card é exibido, então a ordem interna é link, capacidade, período, **Salvar** e, só se a regra atual exigir, **Encerrar período** ou **Reativar**.
  - Dado **Visual**, quando o card é exibido, então a ordem interna é layout, imagem, **Salvar** e **Personalizar**.
  - Dado uma tela mais estreita que a área larga, quando a página é exibida, então os cards continuam empilhados na largura disponível e os campos de **Geral** e **Visual** permanecem dentro do card, utilizáveis.
  - Dado **Organizadores** ou **Excluir evento**, quando a página é exibida, então cada um continua um único card, com os textos e as ações que já tinha.
- **Definição de pronto:** A página mostra as seções na ordem, na largura e com o conteúdo descritos. Não existe um **Salvar** único cobrindo capacidade, período, layout e imagem. **Alterar trecho**, **Personalizar**, **Encerrar período**, **Reativar**, organizadores e exclusão continuam concluindo a ação que já concluem. A feature só está aceita quando a Spec 02 também estiver concluída.
- **Dependências:** Nenhuma para montar a página. O aceite da feature depende da Spec 02.
- **Fora do escopo desta spec:** Definir quais campos cada **Salvar** persiste, as mensagens de validação dessa gravação e a preservação do rascunho entre os cards. Isso é a Spec 02. Também ficam de fora criar evento, **Editar** da ficha, a área de convidados e qualquer mudança de regra dentro de organizadores ou da exclusão.

### Spec 02 — Gravação separada de Geral e de Visual

- **Fase:** Fase 1 — Seções da página de configurações
- **Objetivo (o quê):** Fazer o **Salvar** de **Geral** persistir só capacidade e período, e o **Salvar** de **Visual** persistir só layout e imagem, cada um com as validações que esses campos já têm.
- **Intenção (por quê):** Separar as seções na tela sem um **Salvar** único deixaria a pessoa em dúvida sobre o que foi gravado. Cada card precisa confirmar só a tarefa daquela seção, sem apagar o que a outra seção ainda não salvou e sem afrouxar as regras que já protegem a página pública.
- **Contexto:** A Spec 01 coloca em **Geral** o link, a capacidade, o período, o **Salvar** e o encerrar ou reativar, e em **Visual** o layout, a imagem, o **Salvar** e **Personalizar**. Hoje um único gravar persiste juntos capacidade, período, layout e imagem, com o aviso **Configurações gravadas.** O link já grava com **Alterar trecho**. O tema já grava no diálogo **Personalizar a página do evento**. Encerrar e reativar já são ações imediatas. A data do evento continua vindo de **Editar**, não desta página. A tela de criar evento continua gravando esses campos juntos.
- **Atores:** Quem tem acesso ao evento e usa **Salvar** em **Geral** ou em **Visual**. Quem altera o trecho, o tema, o encerramento, os organizadores ou a exclusão continua nas ações que já existem.
- **Descrição do comportamento:** O **Salvar** de **Geral** lê a capacidade e as duas datas do período que estão na tela e tenta gravar só isso. Se forem válidos, o evento fica com essa capacidade e esse período. Layout, imagem, trecho, tema e os demais dados do evento permanecem os já salvos. O aviso é **Configurações gravadas.** A página pública passa a usar a capacidade e o período novos. O rascunho de layout e imagem que ainda não foi salvo em **Visual** continua preenchido na tela. Enquanto **Geral** grava, esse **Salvar** não aceita outro clique. **Visual** continua editável.
  O **Salvar** de **Visual** lê o layout escolhido e a imagem desta visita (arquivo novo, imagem já salva ou remoção) e tenta gravar só isso. Se forem válidos, o evento fica com esse layout e essa imagem. Capacidade, período, trecho, tema e os demais dados permanecem os já salvos. O aviso é **Configurações gravadas.** A página pública passa a usar o layout e a imagem novos. O rascunho de capacidade e período que ainda não foi salvo em **Geral** continua preenchido na tela. Enquanto **Visual** grava, esse **Salvar** não aceita outro clique. **Geral** continua editável.
  Se a validação de um card falha, nada daquele **Salvar** é gravado. O campo com problema mostra a mensagem que já existe hoje. O outro card não é limpo nem gravado por essa falha. Uma falha de gravação sem erro de campo avisa **Não foi possível salvar. Tente de novo.** e mantém os dois rascunhos.
  **Alterar trecho** continua gravando só o trecho, com as mensagens que já usa: **Link atualizado.**, **Não foi possível alterar o link.** e **Esse endereço não está disponível.** **Cancelar** restaura só o trecho. Nenhum dos dois envia capacidade, período, layout ou imagem.
  **Encerrar período** e **Reativar** continuam mudando só o encerramento manual, com a confirmação e as mensagens que já usam. Não gravam capacidade, período, layout nem imagem. O rascunho desses campos permanece na tela. **Personalizar** continua gravando só o tema (**Tema gravado.** ou **Tema padrão restaurado.**). A prévia usa o layout e a imagem escolhidos em **Visual** nesta visita, mesmo ainda não salvos. Fechar o diálogo sem gravar descarta só o rascunho do tema.
- **Entradas e saídas:** A entrada do **Salvar** de **Geral** é a capacidade e as duas datas do período que estão na tela, mais o evento e a data do evento já salva. A saída, no sucesso, é capacidade e período gravados, o aviso **Configurações gravadas.**, a página pública atualizada nesses dois pontos e o rascunho de **Visual** ainda na tela. A entrada do **Salvar** de **Visual** é o layout escolhido e a imagem desta visita. A saída, no sucesso, é layout e imagem gravados, o mesmo aviso, a página pública atualizada nesses dois pontos e o rascunho de **Geral** ainda na tela. A saída de validação é o campo marcado com a mensagem já vigente e nada gravado por aquele **Salvar**. A saída sem acesso é **Você não tem acesso a este evento.**, sem gravação.
- **Dados/entidades envolvidos (conceitual):** Capacidade máxima do evento: vazia para sem limite, ou um inteiro a partir de 1. Período de confirmação: início e fim, ou os dois vazios. Data do evento já salva, usada só para validar o período. Layout da página: **Personalizado** ou **Imagem**. Imagem da página: arquivo jpg ou png de até 8 MB, imagem já salva, ou ausência. Trecho do link, tema, encerramento manual e lista de confirmações, que esta spec não regrava pelo **Salvar** dos cards.
- **Estados e transições:** Antes do **Salvar**, os campos mostram o valor salvo ou o rascunho editado na visita. **Geral** gravado com sucesso passa a mostrar a capacidade e o período salvos; o rascunho de **Visual** não volta ao valor antigo. **Visual** gravado com sucesso passa a mostrar o layout e a imagem salvos; o rascunho de **Geral** não volta ao valor antigo. Falha deixa o rascunho dos dois cards como estava no clique. Capacidade vazia gravada tira o limite. Período com as duas datas vazias, gravado, tira a janela. O encerramento manual não sai por causa desse gravar: só **Reativar** remove o encerramento manual, como hoje. Se, depois de gravar o período, o calendário deixar a confirmação aberta ou fechada, a frase que o painel já mostra acompanha esse resultado, sem apagar o encerramento manual.
- **Regras de negócio:** Valem as Regras 3, 4, 5, 6, 7, 8, 9, 10 e 12. Capacidade que não é inteiro a partir de 1 mostra **Informe um número inteiro a partir de 1**. Período com só uma data mostra **Informe o início e o fim da janela, ou deixe os dois vazios.** e o aviso **Ajuste a janela de confirmação ou deixe as duas datas vazias.** Dia inválido mostra **Informe um dia válido**. Início que não é anterior ao fim mostra **A data inicial tem de ser anterior à data final.** Início ou fim que não é anterior à data do evento mostra **A data inicial tem de ser anterior à data do evento.** ou **A data final tem de ser anterior à data do evento.** Layout **Imagem** sem imagem mostra **Esse layout precisa de uma imagem.** Arquivo que não é jpg ou png mostra **Use um arquivo jpg ou png.** Arquivo acima de 8 MB mostra **O arquivo pode ter no máximo 8 MB.** Proporção fora do ideal mostra o aviso que já existe e não impede o **Salvar** de **Visual**.
- **Validações:** **Geral** valida capacidade e período antes de gravar, com a data do evento já salva. Não valida layout, imagem nem trecho. **Visual** valida layout e imagem antes de gravar. Não valida capacidade, período nem trecho. Dado inválido no outro card não bloqueia o card válido. Sem acesso, nenhum dos dois grava.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa edita capacidade ou período em **Geral** e usa o **Salvar** desse card.
  2. Se estiver válido, vê **Configurações gravadas.** e a página pública usa os valores novos. O que estava em **Visual** sem salvar continua lá.
  3. A pessoa edita layout ou imagem em **Visual** e usa o **Salvar** desse card.
  4. Se estiver válido, vê **Configurações gravadas.** Capacidade e período já salvos não mudam. Um rascunho ainda aberto em **Geral** continua lá.
  5. Se quiser, altera o trecho, personaliza o tema ou encerra a confirmação. Cada uma dessas ações grava só o que já grava hoje.
- **Casos de borda e erros:**
  - Capacidade inválida e **Visual** válido: **Geral** não grava e mostra **Informe um número inteiro a partir de 1**. **Visual** grava layout e imagem se a pessoa usar o **Salvar** de **Visual**.
  - Período com uma data só: nada do período é gravado. O aviso é **Ajuste a janela de confirmação ou deixe as duas datas vazias.**
  - Período com as duas datas vazias: a janela salva é removida. A capacidade informada nesse mesmo **Salvar** é gravada junto, se for válida.
  - Layout **Imagem** sem imagem: **Visual** não grava e mostra **Esse layout precisa de uma imagem.** Capacidade e período já salvos permanecem.
  - Aviso de proporção com arquivo aceito: **Visual** grava. O aviso continua visível como hoje.
  - Remover a imagem e salvar em **Personalizado**: a imagem salva sai. Em **Imagem**, remover e salvar falha com **Esse layout precisa de uma imagem.**
  - **Salvar** de **Geral** com trecho editado e ainda não confirmado: capacidade e período gravam se válidos. O trecho em edição não é confirmado nem descartado.
  - **Alterar trecho** com capacidade inválida na tela: o trecho grava se for válido. A capacidade inválida continua na tela, sem ser gravada.
  - **Encerrar período** com período editado e não salvo: o encerramento manual acontece. O rascunho do período continua na tela e não é gravado por essa ação.
  - **Personalizar** com layout ainda não salvo: a prévia usa essa escolha. Gravar o tema não grava layout nem imagem. O **Salvar** de **Visual**, depois, grava layout e imagem sem alterar o tema já gravado.
  - Falha ao gravar: **Não foi possível salvar. Tente de novo.** Os valores já salvos e os dois rascunhos permanecem.
  - Sem acesso: **Você não tem acesso a este evento.** Nada é gravado.
  - Data do evento alterada em **Editar** deixando o período já salvo inválido: a data não grava e o pedido para ajustar ou limpar o período em **Configurações** continua o que já existe. O rascunho aberto em **Geral** não entra nessa verificação.
- **Impacto no existente:** Deixa de existir um gravar único de capacidade, período, layout e imagem. Criar evento continua gravando esses campos juntos, na mesma ação de hoje. **Editar** continua gravando só título, detalhes, data, horário e local. Link, tema, encerrar, reativar, organizadores e exclusão continuam nas ações próprias. A página pública passa a poder receber capacidade e período sem mudança de layout e imagem, e o contrário.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado capacidade e período válidos e um layout ainda não salvo em **Visual**, quando a pessoa usa o **Salvar** de **Geral**, então capacidade e período ficam gravados, o aviso é **Configurações gravadas.**, o layout já salvo permanece e o rascunho de **Visual** continua na tela.
  - Dado um layout válido com imagem aceita e uma capacidade ainda não salva em **Geral**, quando a pessoa usa o **Salvar** de **Visual**, então layout e imagem ficam gravados, a capacidade já salva permanece e o rascunho de **Geral** continua na tela.
  - Dado a capacidade **abc** em **Geral** e um layout válido em **Visual**, quando a pessoa salva **Visual**, então o layout grava e **Geral** continua mostrando **abc** sem gravar essa capacidade.
  - Dado o layout **Imagem** sem imagem, quando a pessoa usa o **Salvar** de **Visual**, então nada é gravado e a pessoa vê **Esse layout precisa de uma imagem.**
  - Dado só a data de início preenchida, quando a pessoa usa o **Salvar** de **Geral**, então o período não muda e o aviso é **Ajuste a janela de confirmação ou deixe as duas datas vazias.**
  - Dado o trecho editado e ainda não confirmado, quando o **Salvar** de **Geral** conclui com dados válidos, então o trecho em edição continua sem ser confirmado.
  - Dado o período editado e ainda não salvo, quando a pessoa confirma **Encerrar período**, então a confirmação encerra e o rascunho do período continua na tela.
  - Dado um layout escolhido e ainda não salvo, quando a pessoa grava o tema em **Personalizar**, então o tema fica gravado e o layout salvo do evento permanece o anterior até o **Salvar** de **Visual**.
  - Dado quem não tem acesso, quando tenta qualquer um dos dois **Salvar**, então recebe **Você não tem acesso a este evento.** e o evento não muda.
- **Definição de pronto:** Cada **Salvar** grava só os campos do próprio card, com as mensagens já vigentes. O outro rascunho sobrevive. Link, tema, encerrar e reativar não passaram a gravar capacidade, período, layout ou imagem. Criar evento e **Editar** continuam com o recorte que já têm. Os critérios desta spec e os da Spec 01 passam juntos.
- **Dependências:** Spec 01 — os campos e os dois **Salvar** já estão nos cards **Geral** e **Visual**.
- **Fora do escopo desta spec:** Reorganizar de novo a ordem ou a largura dos cards. Mudar organizadores, exclusão, criar evento, a ficha, a área de convidados ou as regras de quem pode excluir. Renomear campos. Criar um terceiro **Salvar** que grave tudo junto.

## 14. Ordem recomendada de implementação

1. Spec 01 — Seções em cards na largura da página
2. Spec 02 — Gravação separada de Geral e de Visual

A Spec 01 coloca cada controle no card certo e tira o **Salvar** único da tela. A Spec 02 faz cada **Salvar** persistir só o que é daquele card, com o rascunho do outro card preservado. Seguir essa ordem evita gravar capacidade, período, layout e imagem juntos depois que a tela já os separou. As duas specs fecham a mesma entrega: a página não está aceita só com o visual, nem só com a gravação separada fora dos cards.
