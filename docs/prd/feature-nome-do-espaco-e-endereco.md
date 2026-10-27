# PRD — Nome do espaço e endereço

> Tipo: PRD de feature · Data: 2026-10-27
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

O local do evento deixa de ser um texto só. Quem cria ou edita o evento informa duas coisas: o **nome do espaço** e o **endereço**.

O nome do espaço é opcional. Exemplo: Casa Praia Eventos. O endereço é obrigatório. Exemplo: Rua João alguma coisa, 832, Centro - Rio das Ostras - RJ.

Na página pública, no layout **Personalizado**, e na prévia do tema desse layout, o nome fica acima e o endereço abaixo, os dois centralizados. Se não houver nome, aparece só o endereço, sem linha vazia no lugar do nome.

Na lista de eventos e na ficha do evento, o endereço sempre aparece. Se houver nome, ele entra na linha de cima e o endereço na de baixo.

O texto que hoje está gravado em Local vira o endereço. O nome do espaço desses eventos fica vazio até alguém editar.

## 2. Problema que resolve

Hoje o organizador tem um único campo, **Local**, obrigatório. Nesse texto cabem, misturados, o nome do lugar e a rua. O convite mostra essa mistura numa linha só, centralizada, abaixo do dia e do horário.

O convidado precisa ler o nome do espaço e, embaixo, o endereço, como duas informações. O organizador precisa poder omitir o nome quando o evento só tem endereço.

## 3. Público-alvo

- **Organizador** — preenche o nome do espaço e o endereço ao criar e ao editar o evento, e confere os dois na prévia do tema, na lista e na ficha.
- **Convidado** — lê o nome e o endereço na página pública do layout **Personalizado**, sem login.

## 4. Objetivo do recorte atual

Separar o local em nome do espaço e endereço, gravar os dois, e mostrá-los na página pública, na prévia, na lista e na ficha. Eventos já existentes continuam exibindo o texto atual, agora como endereço, sem o organizador precisar editar.

## 5. Funcionalidades

**Essenciais:**

- No lugar do campo **Local**, na criação e na edição, dois campos nesta ordem: **Nome do espaço** e **Endereço**.
- Nome do espaço opcional. Endereço obrigatório.
- Texto já gravado em Local passa a ser o endereço. O nome desses eventos começa vazio.
- Página pública no layout **Personalizado**: nome acima, endereço abaixo, os dois centralizados. Sem nome, só o endereço, sem linha em branco.
- Prévia do tema no layout **Personalizado**: a mesma disposição da página pública.
- Lista e ficha: endereço sempre visível; se houver nome, nome acima e endereço abaixo.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mostrar nome ou endereço no layout **Somente imagem**, na página pública ou na prévia.
- Centralizar o local na lista ou na ficha. Essas telas mantêm o alinhamento que já têm.
- Rótulos **Nome do espaço** ou **Endereço** na página pública, na prévia, na lista ou na ficha. Nessas telas só aparecem os textos informados.
- Um título de grupo **Local** acima dos dois campos. Os rótulos dos campos substituem o rótulo **Local**.
- Mapa, link para mapa, geolocalização ou sugestão automática de endereço.
- Separar o endereço em rua, número, bairro, cidade e estado. O endereço continua um texto livre.
- Tornar o endereço opcional ou o nome obrigatório.
- Mudar a linha de dia, data e horário, o título, os detalhes, a imagem, a confirmação, o tema, a capacidade, a janela ou o trecho do link.
- Exigir um formato de endereço (vírgula, CEP, UF). O exemplo com rua, número, bairro, cidade e UF é só um exemplo de texto.
- Página **Evento indisponível**.

## 7. Regras de negócio

- Regra 1: Onde o formulário pede o local — criar evento e editar evento já criado — passam a existir **Nome do espaço** e **Endereço**, nessa ordem. Não há mais um campo cujo rótulo seja só **Local**.
- Regra 2: **Nome do espaço** pode ficar vazio. **Endereço** não pode ficar vazio nem só com espaços.
- Regra 3: Espaços no começo e no fim dos dois campos não contam. Nome só com espaços vale como nome vazio. Endereço só com espaços é recusado.
- Regra 4: Qualquer endereço com algum texto, depois de tirar os espaços das pontas, é aceito. Não há máscara nem obrigatoriedade de rua, número, bairro, cidade ou UF.
- Regra 5: O texto que já estava em Local vira o endereço. O nome do espaço desse evento fica vazio. A página pública, a prévia, a lista e a ficha passam a ler assim sem o organizador salvar de novo.
- Regra 6: **Configurações** não grava nem apaga nome do espaço nem endereço. Salvar nome e endereço não apaga layout, imagem, capacidade, janela, trecho do link nem tema.
- Regra 7: Na página pública e na prévia, a disposição nova vale só no layout **Personalizado**. No layout **Somente imagem**, nome e endereço continuam fora da página e da prévia.
- Regra 8: No **Personalizado**, o nome fica imediatamente acima do endereço. Os dois ficam centralizados. O nome não entra na linha de dia e horário.
- Regra 9: Sem nome, a página pública e a prévia mostram só o endereço, centralizado. Não reservam uma linha vazia para o nome.
- Regra 10: **Suposição:** na página pública e na prévia, nome e endereço usam o mesmo tamanho e a mesma cor que a linha de local usa hoje. Nenhum dos dois fica maior, em negrito ou com rótulo. Se o texto quebrar, cada linha continua centralizada.
- Regra 11: A cor que já pinta o local continua pintando o nome e o endereço. A linha de dia e horário não muda de texto, tamanho nem cor.
- Regra 12: Na lista e na ficha, o bloco de local continua no lugar e no alinhamento de hoje, com o ícone de local. O endereço é a linha desse bloco. Se houver nome, ele é a linha de cima e o endereço a de baixo. Sem nome, o bloco tem uma linha só: o endereço.
- Regra 13: Lista e ficha mostram nome e endereço de qualquer evento, inclusive os de layout **Somente imagem**. A ausência desses textos vale só para a página pública e a prévia desse layout.
- Regra 14: A prévia mostra o nome e o endereço já salvos, no mesmo critério da página pública. Edição ainda não salva não entra na prévia.

## 8. Fluxos principais

### Fluxo 1 — Organizador cria o evento

1. Abre a tela de criar evento.
2. No lugar de **Local**, vê **Nome do espaço** e, abaixo, **Endereço**.
3. Pode deixar o nome vazio. Preenche o endereço, por exemplo `Rua João alguma coisa, 832, Centro - Rio das Ostras - RJ`.
4. Se o endereço estiver vazio, o evento não é criado e o campo de endereço explica que falta o endereço. O que foi digitado no nome permanece no formulário.
5. Se o endereço for válido, o evento é criado. O nome, se houver, fica gravado junto.

### Fluxo 2 — Organizador edita um evento que já existia

1. Abre **Editar** num evento cujo local antigo era um texto só.
2. **Nome do espaço** vem vazio. **Endereço** vem com esse texto antigo.
3. Pode preencher o nome, por exemplo `Casa Praia Eventos`, e salvar.
4. A ficha, a lista, a página pública em **Personalizado** e a prévia desse layout passam a mostrar o nome acima do endereço.

### Fluxo 3 — Convidado abre o convite

1. O convidado abre a página pública de um evento **Personalizado**.
2. Vê a linha de dia e horário como já está hoje.
3. Se houver nome, lê o nome centralizado e, logo abaixo, o endereço centralizado.
4. Se não houver nome, lê só o endereço centralizado.
5. Em **Somente imagem**, não vê nome nem endereço.

### Fluxo 4 — Organizador confere a prévia

1. Abre a prévia do tema de um evento **Personalizado** já salvo.
2. Vê o nome e o endereço na mesma disposição da página pública.
3. A prévia de um evento **Somente imagem** continua sem esse bloco.

## 9. Critérios de aceite

- O organizador, ao criar ou editar, vê **Nome do espaço** e **Endereço** no lugar de **Local**.
- Dá para criar e para salvar a edição sem nome do espaço, desde que o endereço tenha texto.
- Sem endereço, ou com endereço só de espaços, a ação não grava e o campo de endereço pede o endereço.
- Um evento que já tinha Local preenchido mostra esse texto como endereço, com o nome vazio, sem alguém editar.
- Na página pública **Personalizado**, com nome e endereço, o nome fica acima e o endereço abaixo, os dois centralizados, sem rótulos.
- Na mesma página, sem nome, só o endereço aparece, sem linha em branco.
- A prévia **Personalizado** repete essa disposição com os valores salvos.
- A página pública e a prévia **Somente imagem** não mostram nome nem endereço.
- Na lista e na ficha, o endereço aparece. Com nome, o nome fica acima do endereço. Sem nome, só o endereço.
- Salvar **Configurações** não apaga nome nem endereço. Salvar a edição do local não apaga layout, imagem, capacidade, janela, trecho nem tema.

## 10. Stack

Next.js, TypeScript, Tailwind, formulários com validação no servidor, e o evento já gravado no banco que o produto usa. A página pública, a prévia do tema, a lista e a ficha já leem o local. Esta feature troca esse texto único por nome do espaço e endereço, nos mesmos pontos.

## 11. Justificativa da stack

O local já entra na criação, na edição e na leitura do convite e do painel. A feature divide essa informação em dois textos e define onde cada um aparece. Não pede mapa, serviço externo nem autenticação nova.

## 12. Fases de construção

### Fase 1 — Local em duas informações

Objetivo: o organizador grava nome e endereço, eventos antigos passam a tratar o local atual como endereço, e convidado e painel leem os dois textos na disposição definida.

Specs:

- Spec 01 — Nome do espaço e endereço na criação e na edição
- Spec 02 — Nome e endereço na página pública, na prévia, na lista e na ficha

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Nome do espaço e endereço na criação e na edição

- **Fase:** Fase 1 — Local em duas informações
- **Objetivo (o quê):** Substituir o campo único **Local** por **Nome do espaço** (opcional) e **Endereço** (obrigatório) na criação e na edição, e fazer o texto de local já gravado valer como endereço.
- **Intenção (por quê):** O convite precisa das duas informações separadas. Sem gravar as duas, a página pública não tem o que mostrar em duas linhas. Eventos já criados não podem perder o texto que o organizador já informou: esse texto é o endereço até alguém incluir o nome.
- **Contexto:** Criar evento pede, entre outros, título, detalhes, data, horário e um local obrigatório, com a mensagem **Informe o local** quando o local vem vazio. **Editar**, na ficha de um evento já criado, grava título, detalhes, data, horário e local, e não grava layout, imagem, capacidade, janela, trecho nem tema. **Configurações** grava o grupo de publicação e não deve apagar o local. O produto já recusa local só com espaços. Não existe, hoje, nome de espaço separado do endereço.
- **Atores:** O organizador, ao criar um evento e ao editar um evento que já pode editar.
- **Descrição do comportamento:** Na criação e em **Editar**, o campo **Local** sai. Entram **Nome do espaço** e, logo abaixo, **Endereço**. O nome aceita vazio. O endereço exige texto. Ao salvar com sucesso, os dois valores ficam no evento: nome ausente quando o campo veio vazio ou só com espaços, e endereço com os espaços das pontas removidos. Na criação, o restante do formulário continua sendo salvo junto, como hoje. Em **Editar**, continuam sendo salvos só os dados da ocasião; layout, imagem, capacidade, janela, trecho e tema permanecem. **Configurações** não altera nome nem endereço. Para um evento que já existia, o endereço inicial é o texto que estava em Local e o nome inicial é ausente, mesmo que ninguém abra **Editar**.
- **Entradas e saídas:** Entram o nome do espaço e o endereço digitados, mais os outros campos que a criação ou a edição já pedem. Sai o evento gravado com nome ausente ou preenchido e com endereço preenchido, ou a recusa sem gravar. Exemplo válido: nome `Casa Praia Eventos` e endereço `Rua João alguma coisa, 832, Centro - Rio das Ostras - RJ`. Exemplo válido sem nome: endereço `Rua das Flores, 10` e nome vazio. Num evento antigo cujo local era `Salão Azul`, a leitura passa a ser endereço `Salão Azul` e nome ausente.
- **Dados/entidades envolvidos (conceitual):** O evento passa a ter nome do espaço, opcional, e endereço, obrigatório. O local único de antes deixa de ser a informação editável: o texto dele permanece como endereço. Título, detalhes, data, horário, layout, imagem, capacidade, janela, trecho e tema continuam no evento e não são redefinidos por esta spec.
- **Estados e transições:** Não se aplica um estado novo do evento. O nome está ausente ou preenchido. O endereço está sempre preenchido depois de um salvamento válido. Um evento antigo nasce, para esta feature, com nome ausente e endereço igual ao local anterior. Preencher o nome e salvar leva o nome de ausente para preenchido. Apagar o nome e salvar leva de preenchido para ausente, sem apagar o endereço.
- **Regras de negócio:**
  - Os dois campos substituem **Local** na criação e em **Editar**, nesta ordem: nome, endereço.
  - Nome vazio é permitido. Endereço vazio não é.
  - Espaços nas pontas são ignorados. Nome só com espaços fica ausente. Endereço só com espaços é recusado.
  - Não há formato obrigatório de endereço.
  - Evento já gravado: endereço = texto atual de Local; nome = ausente; sem novo salvamento.
  - **Editar** não apaga layout, imagem, capacidade, janela, trecho nem tema.
  - **Configurações** não apaga nome nem endereço.
  - Quem não pode editar aquele evento não grava, com o mesmo aviso de falta de acesso que a edição já usa.
- **Validações:** O endereço é conferido antes de gravar. Vazio ou só espaços não grava. **Suposição:** a mensagem no campo de endereço é **Informe o endereço**, no lugar de **Informe o local**. O nome não tem mensagem de obrigatoriedade. Título, data, horário e as demais regras da criação e da edição continuam valendo, inclusive data nova no passado recusada e data já salva no passado mantida quando o restante é salvo sem trocá-la.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre criar evento ou **Editar**.
  2. Vê **Nome do espaço** e **Endereço** onde antes via **Local**.
  3. Em um evento antigo, vê o nome vazio e o endereço igual ao local que já estava salvo.
  4. Preenche ou limpa o nome, confere o endereço e salva.
  5. Com endereço válido, a gravação conclui. Na edição, o diálogo fecha. Na criação, o evento passa a existir.
  6. Com endereço inválido, nada é gravado e o aviso fica no endereço.
- **Casos de borda e erros:**
  - Nome vazio e endereço preenchido: grava, nome ausente.
  - Nome `Casa Praia Eventos` com espaços nas pontas: grava `Casa Praia Eventos`.
  - Nome só com espaços: grava como nome ausente, se o endereço for válido.
  - Endereço vazio na criação: o evento não nasce; o nome digitado continua no formulário.
  - Endereço vazio na edição: o evento permanece com o nome e o endereço anteriores; o aviso fica no campo.
  - Endereço `  Rua das Flores, 10  `: grava `Rua das Flores, 10`.
  - Texto livre, sem vírgula e sem cidade: é aceito se não estiver vazio.
  - Falha inesperada ao gravar: o aviso genérico que criar ou editar já mostra; nome e endereço não ficam pela metade.
  - Salvar **Configurações** depois desta feature: nome e endereço continuam os que estavam.
  - Salvar **Editar** mudando só o nome: endereço, data, horário, título e detalhes seguem o que foi enviado nesse formulário; layout e o restante da publicação não mudam.
  - Sem permissão para o evento: não grava.
- **Impacto no existente:** O campo **Local** some da criação e de **Editar**. A mensagem **Informe o local** deixa de ser a mensagem desse campo. Eventos já criados passam a ser lidos com o antigo local no endereço e sem nome. **Configurações**, a confirmação de presença, o tema e o link não ganham campo novo.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado a tela de criar evento, quando ela abre, então há **Nome do espaço** e **Endereço**, nessa ordem, e não há campo com rótulo **Local**.
  - Dado um endereço `Rua João alguma coisa, 832, Centro - Rio das Ostras - RJ` e o nome vazio, quando o organizador cria o evento, então o evento existe com esse endereço e sem nome do espaço.
  - Dado o nome `Casa Praia Eventos` e esse endereço, quando o organizador cria o evento, então os dois ficam gravados.
  - Dado o endereço vazio, quando o organizador tenta criar ou salvar a edição, então nada é gravado e o endereço mostra **Informe o endereço**.
  - Dado um evento cujo local já era `Salão Azul`, quando ninguém o edita, então o endereço lido é `Salão Azul` e o nome está ausente.
  - Dado esse evento em **Editar**, quando o diálogo abre, então o nome vem vazio e o endereço vem `Salão Azul`.
  - Dado um nome preenchido, quando o organizador apaga o nome e salva com o endereço ainda válido, então o nome fica ausente e o endereço permanece.
  - Dado um evento, quando o organizador salva **Configurações**, então nome e endereço permanecem. Quando salva **Editar**, então layout, imagem, capacidade, janela, trecho e tema permanecem.
- **Definição de pronto:** Criar e editar gravam nome opcional e endereço obrigatório. Evento antigo é lido com o local anterior no endereço e sem nome. Endereço vazio não grava. **Configurações** e os dados de publicação não são apagados por engano.
- **Dependências:** Nenhuma. Usa a criação, a edição e o evento que o produto já tem.
- **Fora do escopo desta spec:** Desenhar a página pública, a prévia, a lista e a ficha (Spec 02). Mapa, endereço em partes, layout **Somente imagem** e rótulos na leitura do convidado.

### Spec 02 — Nome e endereço na página pública, na prévia, na lista e na ficha

- **Fase:** Fase 1 — Local em duas informações
- **Objetivo (o quê):** Mostrar o nome do espaço acima do endereço na página pública e na prévia do layout **Personalizado**, centralizados, e na lista e na ficha, no alinhamento que essas telas já usam. Sem nome, mostrar só o endereço.
- **Intenção (por quê):** O convidado precisa achar o lugar pelo nome e, embaixo, saber o endereço, sem rótulos no meio. O organizador precisa ver o mesmo convite na prévia e reconhecer o lugar na lista e na ficha. Um nome vazio não pode virar um buraco em branco no convite.
- **Contexto:** A Spec 01 já deixa o evento com nome do espaço opcional e endereço obrigatório. No layout **Personalizado**, a página pública e a prévia já mostram, abaixo da linha de dia e horário, uma linha centralizada com o local, sem o rótulo Local, dentro do bloco que também contém essa linha de dia e horário. A cor de texto do tema, quando existe, pinta essa linha de local. No layout **Somente imagem**, esse bloco não aparece, nem na página nem na prévia. A lista e a ficha mostram o local numa linha, com ícone de local, alinhado como o resto do card, para qualquer layout. A página de evento inexistente ou excluído é **Evento indisponível**.
- **Atores:** O convidado, na página pública. O organizador, na prévia, na lista e na ficha.
- **Descrição do comportamento:** No **Personalizado**, a linha única de local é trocada por até duas linhas, no mesmo bloco, imediatamente abaixo da linha de dia e horário. Se o nome existe, a primeira é o nome e a segunda é o endereço; as duas centralizadas; sem os rótulos **Nome do espaço** e **Endereço**. Se o nome está ausente, só o endereço aparece, centralizado, e o bloco não guarda espaço de uma linha vazia. A prévia **Personalizado** usa os valores salvos e a mesma regra. Em **Somente imagem**, página e prévia continuam sem nome e sem endereço. Na lista e na ficha, o bloco de local continua onde está, com o ícone e o alinhamento atuais. A linha do endereço está sempre lá. Se o nome existe, ele fica na linha de cima desse bloco e o endereço na de baixo. Se não existe, o bloco fica com a linha do endereço apenas. Não há rótulos nessas telas.
- **Entradas e saídas:** Entram o nome do espaço (presente ou ausente), o endereço, o layout e a cor de texto já usada no local. Sai, no **Personalizado**, o par centralizado ou só o endereço. Exemplo: nome `Casa Praia Eventos` e endereço `Rua João alguma coisa, 832, Centro - Rio das Ostras - RJ` produzem essas duas linhas, nome em cima, endereço embaixo. Sem nome, sai só o endereço. Na lista e na ficha, sai o mesmo par ou só o endereço, no bloco que já mostra o local. Em **Somente imagem**, a página e a prévia não têm essa saída.
- **Dados/entidades envolvidos (conceitual):** Nome do espaço, endereço, layout (**Personalizado** ou **Somente imagem**) e a cor de texto que já pinta o local. A linha de dia e horário continua sendo lida da data e do horário, sem mudança de texto.
- **Estados e transições:** Não se aplica. Não há estado novo. O que muda é a leitura: com nome, duas linhas; sem nome, uma linha. O layout já salvo decide se a página pública e a prévia mostram o bloco.
- **Regras de negócio:**
  - Página pública e prévia: só **Personalizado** mostra nome e endereço.
  - **Somente imagem:** não mostra nenhum dos dois, na página nem na prévia.
  - Ordem fixa quando há nome: nome, depois endereço.
  - Os dois centralizados na página e na prévia. Sem rótulo.
  - Sem nome: só o endereço, sem linha vazia e sem espaço reservado para o nome.
  - **Suposição:** tamanho e cor iguais aos da linha de local atual; texto que quebra continua centralizado; nome e endereço não ficam maiores nem em negrito.
  - A linha de dia e horário permanece como já está, inclusive tamanho, barras e texto. O nome não entra nessa linha.
  - O bloco que já reúne dia, horário e local continua reunindo a linha de dia e horário e as linhas de local.
  - Lista e ficha: ícone e alinhamento atuais; endereço sempre; nome por cima só quando existe; vale também para evento **Somente imagem**.
  - Prévia usa o que está salvo. Rascunho de **Editar** ainda não salvo não muda a prévia.
  - **Evento indisponível** não mostra este bloco.
- **Validações:** Não se aplica validar de novo. A Spec 01 já garante endereço preenchido e nome ausente ou preenchido. Esta spec só lê.
- **Fluxo do usuário (passo a passo):**
  1. O convidado abre um evento **Personalizado** com nome e endereço.
  2. Depois da linha de dia e horário, lê o nome centralizado e o endereço centralizado embaixo.
  3. Se o nome estiver ausente, lê só o endereço, no mesmo lugar.
  4. O organizador abre a prévia **Personalizado** e vê as mesmas linhas, com o que está salvo.
  5. Na lista ou na ficha, vê o endereço e, se houver nome, o nome na linha de cima.
  6. Em **Somente imagem**, a página e a prévia não mostram essas linhas. A lista e a ficha desse evento continuam mostrando.
- **Casos de borda e erros:**
  - Nome ausente: uma linha só, o endereço, sem vão no lugar do nome.
  - Nome longo ou endereço longo na página e na prévia: quebra em linhas centralizadas e não sobe para a linha de dia e horário.
  - Nome longo na lista ou na ficha: quebra dentro do bloco de local, com o endereço na sequência, sem cobrir o título nem o selo.
  - Evento antigo, nome ausente e endereço igual ao local anterior: a página **Personalizado** mostra só esse endereço, como a linha de local de hoje, só que já é o endereço.
  - Evento sem imagem e sem detalhes, em **Personalizado**: as linhas de local continuam abaixo do título e da linha de dia e horário.
  - **Somente imagem** com nome e endereço preenchidos: a página e a prévia não os mostram.
  - Prévia aberta com **Editar** ainda não salvo: continua o valor salvo.
  - Evento inexistente ou excluído: **Evento indisponível**, sem nome e sem endereço.
  - Cor de texto definida: nome e endereço usam essa cor na página e na prévia **Personalizado**. Sem cor específica, seguem a aparência que o local já segue.
- **Impacto no existente:** A linha única de local na página pública e na prévia **Personalizado** passa a ter até duas linhas. A linha de dia e horário, o título, os detalhes, a imagem, a confirmação e o tema permanecem. Lista e ficha ganham a segunda linha só quando há nome. **Somente imagem** permanece sem o bloco na página e na prévia.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento **Personalizado** com nome `Casa Praia Eventos` e endereço `Rua João alguma coisa, 832, Centro - Rio das Ostras - RJ`, quando o convidado abre a página pública, então vê o nome centralizado e, imediatamente abaixo, o endereço centralizado, sem os rótulos **Nome do espaço** e **Endereço**, e a linha de dia e horário continua acima, inalterada.
  - Dado esse evento sem nome, quando o convidado abre a página, então vê só o endereço centralizado, sem linha em branco acima dele.
  - Dado esse evento com cor de texto, quando o convidado abre a página, então o nome, se houver, e o endereço usam essa cor.
  - Dado um evento **Personalizado** salvo, quando o organizador abre a prévia, então a prévia mostra as mesmas linhas, na mesma ordem e no mesmo alinhamento da página pública.
  - Dado um evento **Somente imagem** com nome e endereço, quando o convidado abre a página ou o organizador abre a prévia, então nome e endereço não aparecem.
  - Dado um evento com nome e endereço, quando o organizador olha a lista ou a ficha, então o nome aparece acima do endereço, no bloco de local, com o ícone e o alinhamento que esse bloco já tem.
  - Dado um evento sem nome, quando o organizador olha a lista ou a ficha, então o bloco de local mostra só o endereço.
  - Dado um evento antigo cujo local era `Salão Azul`, quando o convidado abre a página **Personalizado** sem ninguém ter editado, então vê só `Salão Azul` centralizado.
- **Definição de pronto:** Página pública e prévia **Personalizado** mostram nome acima de endereço, centralizados, ou só o endereço quando não há nome. **Somente imagem** não mostra o bloco. Lista e ficha mostram o endereço e, se houver, o nome acima, sem centralizar o card. A linha de dia e horário não muda.
- **Dependências:** Spec 01 — o evento precisa ter nome do espaço opcional e endereço obrigatório, e o local antigo já lido como endereço.
- **Fora do escopo desta spec:** Criar ou validar os campos (Spec 01). Mudar dia e horário, título, detalhes, imagem, confirmação, tema, mapa, ou exibir o bloco em **Somente imagem**. Centralizar a lista ou a ficha.

## 14. Ordem recomendada de implementação

1. Spec 01 — Nome do espaço e endereço na criação e na edição
2. Spec 02 — Nome e endereço na página pública, na prévia, na lista e na ficha

A Spec 02 só tem o que exibir depois que o nome e o endereço existem e o local antigo já é o endereço. Fazer a página pública antes deixaria o convite sem a informação separada. Dentro da Spec 02, página, prévia, lista e ficha devem sair juntas: a prévia precisa bater com a página, e a lista e a ficha precisam deixar de mostrar um local único quando o nome já existe.
