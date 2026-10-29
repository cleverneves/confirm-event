# PRD — Reorganizar o card de Meus Eventos

> Tipo: PRD de feature · Data: 2026-10-29
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

O card de cada evento na lista **Meus Eventos** passa a ser lido de cima para baixo nesta ordem: uma linha com a imagem, o título, o total de confirmados e a tag de confirmação; em seguida, uma linha só com a data; uma linha só com o horário; e uma linha só com o local.

Saem do card o texto **criado por** e a identificação do tipo de layout. A data, o horário e os confirmados ganham ícone. O local continua com o ícone de pin e passa a mostrar o nome do espaço e o endereço na mesma linha.

## 2. Problema que resolve

O card mistura, em blocos separados, o tipo de layout, o título, quem criou o evento e o total de confirmados. Data e horário dividem a mesma linha. Quem olha a lista precisa varrer várias linhas para achar o que identifica o evento (imagem, nome e quantas pessoas confirmaram) e o que descreve quando e onde ele acontece.

A reorganização agrupa a identidade do evento numa linha e deixa data, horário e local cada um na sua linha, com ícone, para a leitura ficar estável de um card para o outro.

## 3. Público-alvo

O **organizador** autenticado, ao olhar a lista **Meus Eventos**. Cada card é um evento ao qual ele tem acesso.

O convidado não vê esta lista. Quem só abre a página de um evento no painel, ou a página pública, não é o público deste recorte.

## 4. Objetivo do recorte atual

Cada card da lista **Meus Eventos** fica assim:

1. Uma linha: área da imagem, título, separador, ícone de pessoa com check, total de confirmados e, à direita, a tag **Aberta** ou **Encerrada**.
2. Uma linha: ícone de calendário e a data.
3. Uma linha: ícone de relógio e o horário.
4. Uma linha: ícone de pin e o local.

O card deixa de mostrar **criado por** e o tipo de layout. O clique no card continua abrindo aquele evento.

## 5. Funcionalidades

**Essenciais:**

- Remover do card o texto **criado por** e o nome de quem criou o evento.
- Remover do card o rótulo e o ícone do tipo de layout.
- Manter uma área de imagem à esquerda do título, na mesma linha do título e dos confirmados.
- Quando o evento não tiver imagem visível, mostrar nessa área um retângulo com o ícone de imagem desligada, no mesmo tamanho e na mesma proporção da miniatura daquele card.
- Mostrar o total de confirmados nessa mesma linha, depois do título, com um separador de ponto médio e o ícone de pessoa com check. Exemplo: `[imagem] Título • [ícone] 12 confirmados`.
- Manter a tag **Aberta** ou **Encerrada** à direita dessa primeira linha, com o mesmo texto e as mesmas cores de hoje.
- Separar data e horário em duas linhas, com ícone de calendário na data e ícone de relógio no horário.
- Mostrar o local em uma linha: ícone de pin, nome do espaço, ponto médio e endereço. Sem nome do espaço, a linha fica só com o ícone de pin e o endereço.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mudar a página do evento no painel, inclusive data, horário, local e tag que já aparecem lá.
- Mudar a página pública do convidado.
- Mudar a tela em que o organizador escolhe ou edita o layout, a imagem, a data, o horário, o nome do espaço ou o endereço.
- Apagar do evento o registro de quem criou, o layout salvo ou a imagem. Eles só deixam de aparecer neste card.
- Mudar o texto da data, o texto do horário, o texto dos confirmados ou o texto da tag.
- Mudar o que conta como confirmação, a capacidade máxima ou a regra de confirmação aberta e encerrada.
- Mostrar de outro jeito quem criou o evento ou qual é o layout.
- Unificar a proporção da miniatura entre o layout em faixa e o layout em retrato.
- Alterar o estado vazio da lista, a mensagem de falha ao carregar os eventos, a ordem dos cards ou o destino do clique.
- Incluir busca, filtro, ordenação nova ou ação de editar a partir do card.

## 7. Regras de negócio

- Regra 1: O card não exibe **criado por** nem o nome de quem criou, mesmo quando esse nome existe.
- Regra 2: O card não exibe o nome do layout nem o ícone que identifica o tipo de layout.
- Regra 3: A primeira linha do card contém, da esquerda para a direita, a área da imagem, o título, um ponto médio, o ícone de pessoa com check, o texto dos confirmados e a tag **Aberta** ou **Encerrada**. A tag fica na extremidade direita dessa linha.
- Regra 4: O texto dos confirmados permanece o de hoje: **1 confirmado** quando o total é 1; **N confirmados** quando o total é 0 ou maior que 1; **N confirmados de M** quando o evento tem capacidade máxima. O número e as palavras desse texto ficam em verde, inclusive quando o total é 0. O ícone de pessoa com check acompanha esse texto e usa o mesmo verde.
- Regra 5: Se a lista carregar e o total de um evento não puder ser obtido, esse card continua visível. No lugar do número, depois do ponto médio, aparecem o ícone e o texto **Quantidade indisponível**, no tom secundário já usado hoje para esse aviso. O card não mostra **0 confirmados** nesse caso.
- Regra 6: A tag diz **Aberta** em verde quando a confirmação daquele evento está aberta, e **Encerrada** em cinza em qualquer caso que hoje já é encerrada. O texto e as cores não mudam.
- Regra 7: A data fica sozinha na segunda linha, com ícone de calendário. O horário fica sozinho na terceira linha, com ícone de relógio. Os dois deixam de compartilhar a mesma linha e deixam de ser separados por ponto médio entre si.
- Regra 8: O texto da data e o texto do horário permanecem os que o card já mostra hoje. A data continua por extenso, com a primeira letra maiúscula. O horário continua no formato de horas e minutos.
- Regra 9: A quarta linha é o local. Com nome do espaço, o formato é: ícone de pin, nome do espaço, ponto médio, endereço. Sem nome do espaço, ou só com espaços em branco no nome, o formato é: ícone de pin, endereço. Nome e endereço não ficam em linhas separadas.
- Regra 10: Os ícones acompanham o texto. Eles não substituem a data, o horário, o total, o aviso de quantidade indisponível nem o endereço.
- Regra 11: Cada card continua sendo só o evento daquele item da lista. Um card não mostra imagem, total, data, horário ou local de outro evento.
- Regra 12: Suposição — a miniatura com imagem e o retângulo vazio do mesmo card têm a mesma largura e a mesma altura. Essa medida continua a já usada hoje para o layout daquele evento: faixa no layout personalizado e retrato no layout somente imagem. Este recorte não troca essas duas proporções por um único retângulo para todos os cards.

## 8. Fluxos principais

### Fluxo 1 — Ler um card com imagem e nome do espaço

1. O organizador entra em **Meus Eventos**.
2. O card mostra a miniatura, o título, o ponto médio, o ícone de pessoa com check e o total em verde. A tag **Aberta** ou **Encerrada** fica à direita dessa linha.
3. Abaixo, em linhas separadas, aparecem a data com ícone de calendário, o horário com ícone de relógio e o local no formato `nome do espaço • endereço`, com ícone de pin.
4. O card não mostra **criado por** nem o tipo de layout.
5. O clique em qualquer parte do card abre a página daquele evento.

### Fluxo 2 — Evento sem imagem visível

1. O organizador vê um evento sem imagem salva, ou cuja imagem não carrega.
2. No lugar da miniatura há um retângulo visível, do mesmo tamanho e da mesma proporção que a miniatura daquele card teria.
3. Dentro do retângulo, centralizado, aparece o ícone de imagem desligada.
4. Não há ícone de imagem quebrada nem um buraco vazio onde a imagem estaria.
5. Título, confirmados, tag, data, horário e local seguem as mesmas linhas do card com imagem.

### Fluxo 3 — Evento sem nome do espaço

1. O evento tem endereço e não tem nome do espaço.
2. A linha do local mostra o ícone de pin e o endereço.
3. Não aparece ponto médio sobrando no início da linha.

### Fluxo 4 — Total indisponível

1. A lista de eventos carrega.
2. O total de confirmados de um evento não pode ser obtido.
3. Esse card mostra o restante das informações.
4. Depois do título e do ponto médio, o card indica que a quantidade não está disponível.
5. O card não exibe **0 confirmados** nesse caso.

## 9. Critérios de aceite

- O usuário consegue ver, na mesma linha, a área da imagem, o título e os confirmados com ícone de pessoa com check, separados do título por um ponto médio.
- A tag **Aberta** ou **Encerrada** permanece à direita dessa linha, com o texto e as cores atuais.
- O sistema não deve mostrar **criado por** nem o tipo de layout no card.
- O sistema deve mostrar a data em uma linha, com ícone de calendário, e o horário em outra, com ícone de relógio.
- Com nome do espaço, o usuário consegue ler `nome do espaço • endereço` numa linha, com ícone de pin.
- Sem nome do espaço, o usuário consegue ler só o endereço, com ícone de pin, sem ponto médio sobrando.
- Sem imagem visível, o card mostra um retângulo com o ícone de imagem desligada, no mesmo tamanho e na mesma proporção da miniatura daquele card.
- O texto dos confirmados, da data, do horário e da tag permanece o de hoje, inclusive **1 confirmado**, **N confirmados**, **N confirmados de M** e **Quantidade indisponível**.
- Quando o total não puder ser obtido, o sistema não deve mostrar **0 confirmados**.
- O clique no card deve continuar abrindo o evento.
- A página do evento no painel deve continuar com o local, a data e o horário como estão hoje.

## 10. Stack

Next.js, React, TypeScript, Tailwind CSS e os componentes de interface que o painel já usa, inclusive os ícones já disponíveis no produto. Nenhuma biblioteca nova.

## 11. Justificativa da stack

A lista **Meus Eventos**, a miniatura, o total de confirmados, a tag **Aberta** / **Encerrada**, a data, o horário, o nome do espaço e o endereço já existem. O recorte só muda a composição visual desse card.

## 12. Fases de construção

### Fase 1 — Card da lista

Objetivo: reorganizar cada card de **Meus Eventos** para a leitura em quatro linhas, sem **criado por** e sem tipo de layout.

Specs:

- Spec 01 — Reorganizar o card de Meus Eventos

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Reorganizar o card de Meus Eventos

- **Fase:** Fase 1 — Card da lista
- **Objetivo (o quê):** Recompor o card da lista **Meus Eventos** em quatro linhas: imagem com título e confirmados; data; horário; local. Remover **criado por** e o tipo de layout.
- **Intenção (por quê):** Permitir que o organizador reconheça o evento pela imagem, pelo nome e pelo total numa única linha, e leia quando e onde ele acontece em linhas estáveis, sem informação que não ajuda nessa leitura.
- **Contexto:** A lista **Meus Eventos** já mostra um card por evento. Hoje o card traz a miniatura junto do tipo de layout, o título com a tag à direita, a linha **criado por** quando há nome, o total de confirmados em verde, a data e o horário na mesma linha, e o local com ícone de pin, nome do espaço e endereço em bloco. A tag **Aberta** é verde e a tag **Encerrada** é cinza. O total usa **1 confirmado**, **N confirmados** e, quando há capacidade, **N confirmados de M**. Se o total não puder ser obtido, o card mostra **Quantidade indisponível** e não usa **0 confirmados**. A página do evento no painel tem sua própria data, horário, local e tag, e não entra nesta spec. O estado vazio da lista e o aviso de falha ao carregar os eventos também permanecem.
- **Atores:** O organizador autenticado que visualiza **Meus Eventos**.
- **Descrição do comportamento:** Cada evento da lista é um card clicável. A primeira linha reúne a área da imagem, o título, um ponto médio, o ícone de pessoa com check, o texto dos confirmados e a tag na extremidade direita. As três linhas seguintes são, nesta ordem, data com ícone de calendário, horário com ícone de relógio e local com ícone de pin. O card não reserva linha para o criador nem para o layout. O restante do produto não muda.
- **Entradas e saídas:** Entram os dados que o card já usa: imagem do evento, título, total de confirmados, capacidade máxima quando existir, estado da confirmação, data, horário, nome do espaço e endereço. Também entra o layout já salvo, apenas para definir a proporção da área da imagem. Saem do card o nome de quem criou e o rótulo do layout. A saída visível é o card nas quatro linhas descritas.
- **Dados/entidades envolvidos (conceitual):** Evento da lista: título, imagem, layout salvo, data, horário, nome do espaço, endereço, total de pessoas confirmadas, capacidade máxima de convidados e se a confirmação está aberta ou encerrada. O nome de quem criou pode continuar existindo no evento, mas o card não o apresenta.
- **Estados e transições:** A área da imagem tem dois estados visuais. Com imagem visível, mostra a miniatura. Sem imagem salva, ou quando a imagem não carrega, mostra o retângulo com o ícone de imagem desligada. O total tem dois estados: número conhecido, em verde, ou quantidade indisponível, no tom secundário. A tag tem dois estados: **Aberta** em verde ou **Encerrada** em cinza. O local tem dois estados: com nome do espaço e sem nome do espaço. Não há ação neste card que mude esses estados; eles refletem o evento já salvo.
- **Regras de negócio:** Valem as regras 1 a 12 da seção 7. Em especial: a tag permanece à direita da primeira linha; o texto dos confirmados, da data, do horário e da tag não muda; o retângulo vazio copia o tamanho e a proporção da miniatura daquele card; faixa e retrato continuam distintos conforme o layout já salvo.
- **Validações:** Não há formulário nem dado novo informado pelo usuário nesta spec. O card só exibe o que já está salvo. Nome do espaço vazio ou só com espaços é tratado como ausência de nome. Total desconhecido não pode ser apresentado como zero.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre **Meus Eventos**.
  2. Para cada evento, lê a primeira linha: imagem ou retângulo vazio, título, total de confirmados e tag.
  3. Lê a data na linha seguinte, o horário na outra e o local na última.
  4. Clica no card para abrir o evento, como já faz hoje.
- **Casos de borda e erros:**
  - Evento sem imagem salva: retângulo com ícone de imagem desligada, no tamanho da miniatura daquele card. A primeira linha não começa solta, sem a área da imagem.
  - Imagem que não carrega: o mesmo retângulo, sem ícone de imagem quebrada e sem a área sumir.
  - Título longo: o título pode quebrar dentro da primeira linha. A ordem imagem, título, ponto médio, ícone, total e tag se mantém. A tag continua visível nessa linha, na extremidade direita.
  - Total com capacidade: o texto completo **N confirmados de M** permanece depois do ícone, em verde. Se não couber, quebra junto do grupo dos confirmados, sem ir para outra seção do card.
  - Total indisponível: ícone e **Quantidade indisponível** no lugar do número, sem verde de sucesso e sem **0 confirmados**.
  - Total 0 ou 1: **0 confirmados** e **1 confirmado**, em verde, com o ícone.
  - Sem nome do espaço: ícone de pin e endereço, sem ponto médio.
  - Nome do espaço e endereço longos: continuam na linha do local e podem quebrar. O ícone de pin permanece no início da linha.
  - Lista vazia ou falha ao carregar a lista: permanecem o estado vazio e o aviso atuais. Nenhum card novo aparece no lugar deles.
  - Evento de outra pessoa incluído na lista do organizador: segue o mesmo card. Não mostra **criado por**.
- **Impacto no existente:** Muda só o card da lista **Meus Eventos**. A página do evento no painel conserva data e horário juntos, o local em bloco com nome do espaço e endereço, e a tag ao lado do título. A escolha de layout, a imagem do evento e os dados de criador, capacidade e confirmação permanecem nas telas em que já são editados ou exibidos. O link do card, a ordem da lista, o estado vazio e o aviso de falha permanecem.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com imagem, nome do espaço, total conhecido e confirmação aberta, quando o organizador vê o card, então a primeira linha mostra a miniatura, o título, um ponto médio, o ícone de pessoa com check, o total em verde e a tag **Aberta** em verde à direita; as linhas seguintes mostram a data com calendário, o horário com relógio e `nome do espaço • endereço` com pin; e o card não mostra **criado por** nem o tipo de layout.
  - Dado um evento com confirmação encerrada, quando o organizador vê o card, então a tag diz **Encerrada** e fica em cinza, à direita da primeira linha.
  - Dado um evento sem imagem salva, quando o organizador vê o card, então a área da imagem é um retângulo do mesmo tamanho e da mesma proporção da miniatura daquele card, com o ícone de imagem desligada centralizado.
  - Dado um evento cuja imagem não carrega, quando o organizador vê o card, então aparece o mesmo retângulo com o ícone de imagem desligada, sem imagem quebrada e sem a área desaparecer.
  - Dado um evento sem nome do espaço, quando o organizador vê o card, então a linha do local mostra o ícone de pin e o endereço, sem ponto médio.
  - Dado um evento com nome do espaço formado só por espaços, quando o organizador vê o card, então a linha do local trata o nome como ausente.
  - Dado um total igual a 1, quando o organizador vê o card, então o texto é **1 confirmado**, em verde, com o ícone de pessoa com check.
  - Dado um total igual a 0 ou maior que 1, sem capacidade máxima, quando o organizador vê o card, então o texto é **N confirmados**, em verde, com o ícone.
  - Dado um evento com capacidade máxima, quando o organizador vê o card, então o texto é **N confirmados de M**, em verde, com o ícone.
  - Dado um evento cujo total não pôde ser obtido, quando a lista carrega, então o card mostra **Quantidade indisponível** depois do ponto médio e não mostra **0 confirmados**.
  - Dado qualquer card da lista, quando o organizador clica nele, então abre a página daquele evento.
  - Dado a página de um evento no painel, quando o organizador a abre, então data, horário, local e tag dessa página permanecem como antes desta spec.
- **Definição de pronto:** Na lista **Meus Eventos**, cards com imagem, sem imagem, com e sem nome do espaço, com total conhecido, com capacidade e com total indisponível seguem as quatro linhas e os critérios acima. **Criado por** e tipo de layout não aparecem. A página do evento no painel permanece com data, horário e local atuais. O clique no card abre o evento.
- **Dependências:** Nenhuma. A lista, a miniatura, o total, a tag, a data, o horário e o local já existem.
- **Fora do escopo desta spec:** Qualquer tela que não seja o card da lista **Meus Eventos**. Também ficam de fora mudar os textos já definidos, unificar a proporção de faixa e retrato, e criar outro lugar para exibir o criador ou o layout.

## 14. Ordem recomendada de implementação

1. Spec 01 — Reorganizar o card de Meus Eventos

A entrega é um único ajuste visual no card. Implementar a spec inteira de uma vez evita um card pela metade, com a linha nova do título e as linhas antigas de data, horário e local ao mesmo tempo.
