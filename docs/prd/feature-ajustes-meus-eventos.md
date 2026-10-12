# PRD — Ajustes na lista Meus Eventos

> Tipo: PRD de feature · Data: 2026-10-12
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

A lista **Meus Eventos** passa a identificar, em cada card, o layout da página pública, o total de confirmados e o estado da confirmação por cor.

A imagem grande que hoje ocupa o topo do card sai. No lugar dela entra uma identificação curta: o nome do layout e, quando o evento tem imagem, uma miniatura dessa imagem. O número de confirmados aparece em verde, com o mesmo total da página do evento. A tag continua dizendo **Aberta** ou **Encerrada**, agora em verde ou cinza, na lista e na página do evento.

## 2. Problema que resolve

Na lista, o organizador vê título, data, horário, local e se a confirmação está aberta ou encerrada. Para saber o layout, ele depende da imagem grande — ou da ausência dela. Para saber quantas pessoas confirmaram, precisa abrir o evento. A tag **Aberta** e a tag **Encerrada** se distinguem pouco, tanto na lista quanto na página do evento.

Estes ajustes deixam a lista responder três perguntas sem abrir o evento: qual layout está salvo, quantas pessoas confirmaram e se a confirmação está aberta. Ao abrir o evento, a tag ao lado do título usa as mesmas cores.

## 3. Público-alvo

O **organizador**, única conta do produto, ao olhar a lista **Meus Eventos** e ao abrir a página de um evento. Cada card é um evento dele.

O convidado não vê esta lista nem a página do evento no painel.

## 4. Objetivo do recorte atual

Cada card da lista **Meus Eventos** mostra:

- o nome do layout salvo (**Personalizado** ou **Somente imagem**) e uma miniatura da imagem quando ela existir;
- o total de confirmados, em verde, no texto **0 confirmados**, **1 confirmado** ou **12 confirmados**;
- a tag **Aberta** em verde ou **Encerrada** em cinza.

A página do evento usa a mesma cor na tag que já fica ao lado do título: **Aberta** em verde e **Encerrada** em cinza.

Título, data, horário, local e o clique que abre o evento permanecem.

## 5. Funcionalidades

**Essenciais:**

- Substituir a imagem grande do card pela identificação do layout.
- Mostrar sempre o nome do layout: **Personalizado** ou **Somente imagem**.
- Mostrar miniatura da imagem quando o evento tiver imagem. No **Personalizado** sem imagem, mostrar só o nome, sem espaço vazio de imagem.
- Mostrar o total de confirmados do evento, igual ao total da página desse evento, em verde.
- Escrever **1 confirmado** quando o total for 1, e **N confirmados** quando o total for 0 ou maior que 1.
- Colorir a tag da lista e a tag da página do evento: **Aberta** em verde e **Encerrada** em cinza, sem mudar o texto.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Colorir outra indicação de confirmação que não seja a tag **Aberta** / **Encerrada** da lista e da página do evento. A página pública do convidado não entra.
- Criar status **Cancelado**, **Aberto** ou qualquer outro texto de status.
- Separar visualmente “ainda não abriu”, “encerrada pelo organizador” e “prazo encerrado”. Tudo o que hoje é **Encerrada** continua **Encerrada**, em cinza.
- Mostrar as confirmações das últimas 24 horas no card.
- Manter a imagem grande no card, na página do evento ou na página pública.
- Mudar o que conta como confirmação, o nome de quem confirmou, ou a lista de presenças.
- Mudar título, data, horário, local, link do card, estado vazio da lista ou a mensagem de falha ao carregar os eventos.
- Criar, editar ou trocar o layout a partir da lista.
- Novo layout além de **Personalizado** e **Somente imagem**.

## 7. Regras de negócio

- Regra 1: A identificação usa o layout já salvo do evento. Os nomes visíveis são exatamente **Personalizado** e **Somente imagem**.
- Regra 2: A imagem grande deixa de aparecer no card. A miniatura só existe quando o evento tem imagem salva.
- Regra 3: **Personalizado** sem imagem mostra o nome do layout e nenhum espaço reservado para imagem.
- Regra 4: **Somente imagem** tem imagem obrigatória ao salvar. O card desse layout mostra o nome e a miniatura. Se a imagem não carregar, o nome permanece e a miniatura some, sem ícone quebrado e sem buraco vazio.
- Regra 5: A miniatura do **Personalizado** usa a imagem em faixa. A miniatura do **Somente imagem** usa a imagem em retrato. As duas são pequenas o bastante para não dominar o card.
- Regra 6: O número de confirmados de um evento na lista é o mesmo total de confirmados da página desse evento. Cada confirmação conta uma pessoa. Não entra a contagem das últimas 24 horas.
- Regra 7: O número e a palavra ao lado ficam em verde, inclusive quando o total é 0.
- Regra 8: O texto é **1 confirmado** somente quando o total é 1. Com 0 ou com 2 ou mais, o texto é **N confirmados** (exemplo: **0 confirmados**, **12 confirmados**).
- Regra 9: A tag da lista e a tag ao lado do título na página do evento dizem **Aberta** quando a confirmação desse evento está aberta, e **Encerrada** em qualquer outro caso já tratado hoje como encerrada. Nas duas telas, **Aberta** é verde e **Encerrada** é cinza. O mesmo evento mostra a mesma cor nas duas tags.
- Regra 10: Cada card continua sendo o evento do organizador autenticado. Um evento não mostra o total nem o layout de outro.
- Regra 11: Se a lista de eventos não carregar, permanece o aviso atual e nenhum card aparece. Se a lista carregar e o total de um evento não puder ser obtido, esse card continua visível e não mostra **0 confirmados** no lugar do número desconhecido.

## 8. Fluxos principais

### Fluxo 1 — Olhar a lista

1. O organizador entra em **Meus Eventos**.
2. Cada evento aparece em um card com a identificação do layout, o título, a tag colorida, o total de confirmados em verde, a data, o horário e o local.
3. O organizador lê o layout, o total e o estado da confirmação sem abrir o evento.
4. O clique no card continua abrindo a página daquele evento.
5. Na página do evento, a tag ao lado do título repete o mesmo texto e a mesma cor do card.

### Fluxo 2 — Card sem imagem no layout Personalizado

1. O organizador vê um evento **Personalizado** que não tem imagem.
2. O card mostra o nome **Personalizado**.
3. Não há miniatura nem área vazia onde a imagem estaria.

### Fluxo 3 — Total indisponível

1. A lista de eventos carrega.
2. O total de confirmados de um evento não pode ser obtido.
3. Esse card mostra o restante das informações e indica que a quantidade não está disponível.
4. O card não exibe **0 confirmados** nesse caso.

## 9. Critérios de aceite

- O usuário consegue ver, em cada card, o nome **Personalizado** ou **Somente imagem**.
- O sistema deve mostrar uma miniatura só quando o evento tiver imagem, e não deve mais mostrar a imagem grande no card.
- O sistema não deve reservar espaço de imagem no **Personalizado** sem imagem.
- O usuário consegue ler o total de confirmados em verde, igual ao total da página do evento.
- O sistema deve escrever **1 confirmado** apenas quando o total for 1, e **N confirmados** quando for 0 ou maior que 1.
- A tag **Aberta** deve aparecer em verde e a tag **Encerrada** em cinza, com esses textos, na lista e na página do evento.
- O mesmo evento deve mostrar a mesma cor de tag na lista e na página do evento.
- Quando o total de um evento não puder ser obtido, o sistema não deve mostrar **0 confirmados** como se ninguém tivesse confirmado.
- O clique no card deve continuar abrindo o evento.

## 10. Stack

Next.js, React, TypeScript, Tailwind CSS e Supabase, com os componentes de interface que o painel já usa. Nenhuma biblioteca nova.

## 11. Justificativa da stack

A lista, a página do evento, os layouts, a imagem do evento, a janela de confirmação e o total de confirmados já existem no produto. O recorte muda o que o card da lista mostra e a cor da tag **Aberta** / **Encerrada** na lista e na página do evento.

## 12. Fases de construção

### Fase 1 — Card da lista

Objetivo: fazer cada card de **Meus Eventos** identificar o layout, o total de confirmados e o estado da confirmação por cor, e usar essa mesma cor na tag da página do evento. A página pública não muda.

Specs:

- Spec 01 — Identificação do layout no card
- Spec 02 — Total de confirmados no card
- Spec 03 — Cor da tag de confirmação

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Identificação do layout no card

- **Fase:** Fase 1 — Card da lista
- **Objetivo (o quê):** Cada card de **Meus Eventos** identifica o layout salvo pelo nome e, quando houver imagem, por uma miniatura pequena. A imagem grande do card deixa de aparecer.
- **Intenção (por quê):** O organizador precisa reconhecer o layout na lista. A imagem grande de hoje ocupa o card e, no **Personalizado** sem imagem, não diz qual layout está salvo.
- **Contexto:** A lista **Meus Eventos** já lista os eventos do organizador. Cada card é um link para a página do evento e mostra título, data, horário, local e a tag **Aberta** ou **Encerrada**. Hoje, se o evento tem imagem, o card mostra essa imagem em tamanho grande: faixa no layout **Personalizado** e retrato no layout **Somente imagem**. Os nomes de layout já usados no produto são **Personalizado** e **Somente imagem**. **Somente imagem** só é salvo com imagem. **Personalizado** pode existir sem imagem.
- **Atores:** Organizador autenticado, na lista **Meus Eventos**.
- **Descrição do comportamento:** No topo de cada card, antes do título, o sistema mostra a identificação do layout. O nome visível é **Personalizado** ou **Somente imagem**, conforme o layout salvo. Se o evento tem imagem, uma miniatura dessa imagem aparece junto do nome. A miniatura do **Personalizado** apresenta a imagem como faixa. A miniatura do **Somente imagem** apresenta a imagem como retrato. As duas são pequenas e não ocupam a largura do card como a imagem atual. A imagem grande some em todos os cards, tenha o evento imagem ou não. Título, data, horário, local, tag e o link do card permanecem.
- **Entradas e saídas:** Entra o layout salvo do evento e a imagem salva, quando existir. Sai, no card, o nome do layout e a miniatura correspondente, ou só o nome.
- **Dados/entidades envolvidos (conceitual):** Evento do organizador: layout da página (**Personalizado** ou **Somente imagem**) e imagem opcional no **Personalizado**, obrigatória no **Somente imagem**.
- **Estados e transições:** Não se aplica. A identificação reflete o layout e a imagem já salvos. Trocar o layout continua acontecendo na criação ou na edição do evento, fora desta spec.
- **Regras de negócio:** Regras 1 a 5 e a Regra 10 da seção 7.
- **Validações:** O nome exibido só pode ser **Personalizado** ou **Somente imagem**. Não inventar outro rótulo. Não mostrar miniatura se não houver imagem salva.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre **Meus Eventos**.
  2. Em cada card, lê o nome do layout no topo.
  3. Se o evento tem imagem, vê uma miniatura pequena ao lado ou junto desse nome, na proporção do layout.
  4. Se o **Personalizado** não tem imagem, vê só o nome.
  5. O restante do card e o clique para abrir o evento seguem como hoje.
- **Casos de borda e erros:**
  - **Personalizado** sem imagem: só o nome **Personalizado**. Nenhum retângulo vazio, ícone de imagem ausente ou miniatura genérica.
  - **Somente imagem:** nome **Somente imagem** e miniatura em retrato.
  - **Personalizado** com imagem: nome **Personalizado** e miniatura em faixa.
  - A imagem falha ao carregar: o nome do layout continua visível, a miniatura some e não fica imagem quebrada nem espaço vazio.
  - Lista vazia: permanece o estado atual de nenhum evento, sem identificação de layout.
  - Falha ao carregar a lista: permanece o aviso atual, sem cards.
- **Impacto no existente:** A imagem grande do card da lista deixa de ser exibida. A página do evento, a prévia de tema e a página pública continuam mostrando a imagem como já fazem. Título, data, horário, local, tag e navegação do card não mudam nesta spec.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento **Somente imagem** com imagem salva, quando o organizador vê o card na lista, então o card mostra o nome **Somente imagem**, uma miniatura pequena em retrato, e não mostra a imagem grande.
  - Dado um evento **Personalizado** com imagem salva, quando o organizador vê o card, então o card mostra o nome **Personalizado**, uma miniatura pequena em faixa, e não mostra a imagem grande.
  - Dado um evento **Personalizado** sem imagem, quando o organizador vê o card, então o card mostra só o nome **Personalizado** e não reserva área de imagem.
  - Dado um evento com imagem que não carrega, quando o card é exibido, então o nome do layout permanece e não aparece imagem quebrada nem espaço vazio.
  - Dado qualquer card da lista, quando o organizador clica nele, então a página daquele evento abre como hoje.
- **Definição de pronto:** Na lista, todo card identifica o layout pelo nome certo; a miniatura só aparece com imagem salva e na proporção do layout; a imagem grande não aparece mais no card; os outros dados do card e o clique continuam iguais.
- **Dependências:** Nenhuma. Usa o layout e a imagem que o evento já possui.
- **Fora do escopo desta spec:** Total de confirmados, cor da tag, qualquer mudança na página do evento ou na página pública, e edição do layout pela lista.

### Spec 02 — Total de confirmados no card

- **Fase:** Fase 1 — Card da lista
- **Objetivo (o quê):** Cada card de **Meus Eventos** mostra quantas pessoas confirmaram presença naquele evento, em verde, com o mesmo total da página do evento.
- **Intenção (por quê):** O organizador hoje só descobre o total depois de abrir o evento. O número na lista evita essa entrada só para consultar a quantidade.
- **Contexto:** A página de cada evento já exibe **Total de confirmados**, que é a quantidade de confirmações daquele evento, e também uma contagem das últimas 24 horas. A lista **Meus Eventos** ainda não mostra nenhum dos dois números. O card continua sendo o link para essa página.
- **Atores:** Organizador autenticado, na lista **Meus Eventos**.
- **Descrição do comportamento:** Em cada card, abaixo do título e da tag e antes da data, o sistema mostra o total de confirmados em verde. O valor é o mesmo **Total de confirmados** da página daquele evento. O texto acompanha o número: **0 confirmados**, **1 confirmado**, **2 confirmados**, **12 confirmados**. Número e palavra ficam verdes também quando o total é 0. A contagem das últimas 24 horas não aparece no card.
- **Entradas e saídas:** Entra a quantidade de confirmações do evento. Sai o texto verde no card. Se essa quantidade não puder ser obtida, sai um aviso curto de quantidade indisponível, sem número.
- **Dados/entidades envolvidos (conceitual):** Confirmação de presença de um evento. O total é a quantidade dessas confirmações, a mesma já usada como total na página do evento. Não inclui a contagem das últimas 24 horas.
- **Estados e transições:** Total conhecido: o card mostra o número e a palavra no singular ou no plural. Total desconhecido: o card não mostra um número e indica que a quantidade não está disponível. Nova confirmação ou exclusão de uma confirmação passa a valer na próxima vez em que a lista for carregada; esta spec não cria atualização ao vivo.
- **Regras de negócio:** Regras 6, 7, 8, 10 e 11 da seção 7.
- **Validações:** O número exibido é inteiro, maior ou igual a zero, e igual ao total da página do mesmo evento. O singular **confirmado** só aparece quando o total é exatamente 1. Um total desconhecido não pode ser apresentado como 0.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre **Meus Eventos**.
  2. Em cada card, lê o total em verde entre o título e a data.
  3. Compara, se quiser, com o **Total de confirmados** ao abrir o evento: os dois números são iguais.
  4. Com uma confirmação, lê **1 confirmado**. Com nenhuma, lê **0 confirmados**. Com várias, lê o número seguido de **confirmados**.
- **Casos de borda e erros:**
  - Total 0: **0 confirmados**, em verde. O zero não fica oculto nem em outra cor.
  - Total 1: **1 confirmado**, em verde.
  - Total maior que 1: **N confirmados**, em verde.
  - A lista inteira falha ao carregar: permanece o aviso atual e nenhum total aparece, porque não há cards.
  - A lista carrega, mas o total de um evento não pode ser obtido: esse card segue visível, com layout, título, tag, data, horário e local, e no lugar do número informa que a quantidade não está disponível. Não mostra **0 confirmados**.
  - Evento de outro organizador: não aparece nesta lista, então não há total a exibir.
- **Impacto no existente:** O card da lista ganha uma linha nova. O **Total de confirmados** e a contagem das últimas 24 horas na página do evento não mudam. A lista de nomes de quem confirmou não muda.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com 12 confirmações na página do evento, quando o organizador vê o card na lista, então o card mostra **12 confirmados** em verde.
  - Dado um evento com 1 confirmação, quando o organizador vê o card, então o card mostra **1 confirmado** em verde.
  - Dado um evento com nenhuma confirmação e o total pôde ser obtido, quando o organizador vê o card, então o card mostra **0 confirmados** em verde.
  - Dado o mesmo evento na lista e na página do evento, quando os dois totais são exibidos, então os números são iguais.
  - Dado que o total de um evento não pôde ser obtido e a lista dos demais dados carregou, quando o card é exibido, então ele não mostra **0 confirmados** e informa que a quantidade não está disponível.
  - Dado qualquer card, quando o organizador o vê, então a contagem das últimas 24 horas não aparece nele.
- **Definição de pronto:** Todo card com total conhecido mostra o número certo, em verde, com singular só no 1. Total desconhecido não vira zero. A página do evento conserva o total que já tinha.
- **Dependências:** Nenhuma para o número em si. Se a Spec 01 já tiver mudado o topo do card, esta linha fica abaixo do título e da tag, antes da data. Se a Spec 01 ainda não existir, a linha entra na mesma posição do card atual.
- **Fora do escopo desta spec:** Identificação do layout, cor da tag, contagem das últimas 24 horas no card, lista de nomes e atualização do número sem recarregar a lista.

### Spec 03 — Cor da tag de confirmação

- **Fase:** Fase 1 — Card da lista
- **Objetivo (o quê):** A tag **Aberta** fica verde e a tag **Encerrada** fica cinza na lista **Meus Eventos** e na página do evento.
- **Intenção (por quê):** As duas tags existem, mas a diferença de cor atual não deixa o estado óbvio. O organizador vê o mesmo estado na lista e de novo ao abrir o evento; as cores precisam coincidir para esse estado não parecer outro.
- **Contexto:** Cada card já mostra **Aberta** quando a confirmação daquele evento está aberta e **Encerrada** quando não está. A página do evento repete esses textos na tag ao lado do título. O encerramento já cobre prazo ainda não iniciado, prazo passado, dia do evento alcançado e encerramento feito pelo organizador. A página pública do convidado não usa essa tag.
- **Atores:** Organizador autenticado, na lista **Meus Eventos** e na página do evento.
- **Descrição do comportamento:** O texto não muda nas duas telas. Confirmação aberta: tag **Aberta**, em verde. Qualquer caso que hoje aparece como **Encerrada**: tag **Encerrada**, em cinza. Na lista, a tag continua ao lado do título do card. Na página do evento, a tag continua ao lado do título. O mesmo evento mostra o mesmo texto e a mesma cor nas duas telas. Não há terceira cor nem terceiro texto.
- **Entradas e saídas:** Entra o estado da confirmação do evento, o mesmo que hoje escolhe **Aberta** ou **Encerrada**. Sai a tag com o texto correspondente e a cor verde ou cinza, na lista e na página do evento.
- **Dados/entidades envolvidos (conceitual):** Estado da confirmação do evento: aberta ou encerrada, pelas regras que o produto já aplica.
- **Estados e transições:** Aberta passa a ser exibida em verde nas duas telas. Encerrada passa a ser exibida em cinza nas duas telas. A passagem de um estado ao outro continua sendo a que o produto já tem (prazo, dia do evento ou ação do organizador). Esta spec não cria transição nova.
- **Regras de negócio:** Regras 9 e 10 da seção 7.
- **Validações:** O texto da tag só pode ser **Aberta** ou **Encerrada**. Verde só acompanha **Aberta**. Cinza só acompanha **Encerrada**. Lista e página do evento não podem divergir para o mesmo evento.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre **Meus Eventos**.
  2. No card de um evento com confirmação aberta, vê a tag **Aberta** em verde.
  3. No card de um evento com confirmação encerrada, vê a tag **Encerrada** em cinza.
  4. Abre o evento e vê, ao lado do título, a mesma palavra na mesma cor do card.
- **Casos de borda e erros:**
  - Confirmação ainda não aberta, prazo encerrado, dia do evento já chegado ou encerramento manual: todos mostram **Encerrada** em cinza, na lista e na página do evento. Nenhum ganha cor ou texto próprio.
  - Lista vazia ou falha ao carregar a lista: nenhuma tag nova; permanece o comportamento atual da lista.
  - A página do evento não carrega: permanece o aviso atual dessa página, sem tag nova.
  - A cor não depende do total de confirmados nem do layout.
- **Impacto no existente:** Muda a cor da tag na lista **Meus Eventos** e a cor da tag ao lado do título na página do evento. As regras que decidem se a confirmação está aberta ou encerrada não mudam. A página pública do convidado não muda.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento cuja confirmação está aberta, quando o organizador vê o card na lista, então a tag diz **Aberta** e é verde.
  - Dado esse mesmo evento aberto na página do evento, quando a tag ao lado do título é exibida, então ela diz **Aberta** e é verde.
  - Dado um evento cuja confirmação está encerrada por prazo, por dia do evento ou pelo organizador, quando o organizador vê o card e a página do evento, então as duas tags dizem **Encerrada** e são cinza.
  - Dado um evento cuja confirmação ainda não abriu, quando o organizador vê o card e a página do evento, então as duas tags dizem **Encerrada** e são cinza.
  - Dado o mesmo evento, quando as duas tags são vistas uma depois da outra, então texto e cor coincidem.
- **Definição de pronto:** Na lista e na página do evento, **Aberta** é verde, **Encerrada** é cinza, os textos continuam esses dois, e o mesmo evento não mostra cores diferentes nas duas telas.
- **Dependências:** Nenhuma. As duas tags já existem. Convive com a Spec 01 e a Spec 02 sem depender delas.
- **Fora do escopo desta spec:** Mudar o texto da tag, criar status **Cancelado**, colorir a página pública do convidado, colorir outra indicação que não seja essa tag, e alterar quando uma confirmação abre ou encerra.

## 14. Ordem recomendada de implementação

1. Spec 01 — Identificação do layout no card
2. Spec 02 — Total de confirmados no card
3. Spec 03 — Cor da tag de confirmação

A Spec 01 mexe na área da imagem, que hoje é o topo do card. Fazê-la primeiro evita encaixar o total e a tag em um card que ainda vai perder a imagem grande. A Spec 02 e a Spec 03 não dependem uma da outra. A Spec 03 aplica a mesma cor na lista e na página do evento.
