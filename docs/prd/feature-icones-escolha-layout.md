# PRD — Ícones e cards da escolha de layout

> Tipo: PRD de feature · Data: 2026-10-27
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

A escolha do layout da página do evento deixa de ser duas opções só com texto e passa a ser dois cards lado a lado. Cada card mostra um ícone médio dentro de um quadrado, o nome do layout e a frase de apoio que já existe.

O layout que hoje se chama **Somente imagem** passa a se chamar **Imagem** nessa escolha. Na lista de eventos, a linha do layout passa a ser o texto **Layout:**, um ícone pequeno e o nome.

Em **Configurações**, a personalização da página acompanha o card marcado na hora, mesmo antes de salvar o layout. Com **Personalizado** marcado, somem os controles que só servem à página **Imagem**. Com **Imagem** marcado, somem os controles que só servem à página **Personalizado**. A prévia mostra o layout do card marcado. A página pública só muda depois que o organizador salva o layout.

## 2. Problema que resolve

A escolha do layout é um par de textos. O organizador não reconhece as duas páginas por um sinal visual, e o nome **Somente imagem** é mais longo do que a opção precisa ser.

Na lista, o layout aparece só como um nome, sem o mesmo sinal visual da escolha.

Em **Personalizar a página do evento**, os controles e a prévia seguem o layout já salvo. Se o organizador marca o outro card e ainda não salvou, continua vendo a configuração e a prévia do layout anterior. Esta feature faz a personalização mostrar, na hora, a página do card marcado.

## 3. Público-alvo

- **Organizador** — única conta do produto. Escolhe o layout na criação e de novo em **Configurações**, e vê o layout na lista de eventos.
- **Convidado** — não escolhe layout e não vê esses nomes nem esses ícones. Continua vendo a página pública do layout já salvo.

## 4. Objetivo do recorte atual

O organizador distingue **Personalizado** e **Imagem** por um card com ícone, nome e frase de apoio, na criação e em **Configurações**. A lista identifica o layout salvo com **Layout:**, um ícone pequeno e o nome. A personalização e a prévia acompanham o card marcado na hora. A página que o convidado abre só muda quando o layout é salvo.

## 5. Funcionalidades

**Essenciais:**

- Dois cards na mesma linha, na criação do evento e em **Configurações do evento**. **Personalizado** à esquerda. **Imagem** à direita.
- Em cada card, de cima para baixo: um quadrado com o ícone médio, o nome e a frase de apoio.
- Ícone **layout list** no card **Personalizado**. Ícone **image** no card **Imagem**.
- Nome visível **Imagem** no lugar de **Somente imagem**. A frase de apoio de cada opção permanece a que o produto já mostra.
- Um card está sempre marcado. O card marcado é visualmente a opção ativa. O outro não tem esse destaque.
- Na lista de eventos, a linha do layout salvo é **Layout:**, o ícone pequeno daquele layout e o nome **Personalizado** ou **Imagem**.
- Com o card **Personalizado** marcado, a personalização esconde o fundo (desfoque ou gradiente) e o nível do desfoque, e mostra as cores de título e de texto.
- Com o card **Imagem** marcado, a personalização esconde as cores de título e de texto, e mostra o fundo. Cor 1 e cor 2 continuam visíveis nos dois layouts, e somem quando o desfoque está ativo, como já acontece.
- A prévia dentro de **Personalizar** mostra o layout do card marcado na hora, antes de salvar.
- A página pública continua no layout já salvo até o organizador salvar a troca.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Terceiro layout, ou mais de um layout ao mesmo tempo no mesmo evento.
- Mudar o que a página pública de cada layout mostra ao convidado.
- Mudar a obrigatoriedade da imagem, os formatos aceitos, o limite de 8 MB, o aviso de proporção ou a regra de não reaproveitar a imagem do outro layout.
- Apagar cor, modo de fundo ou nível de desfoque só porque o controle ficou escondido.
- Colocar o ícone da lista dentro de um quadrado, ou usar nele o tamanho médio da escolha.
- Trocar as frases de apoio dos dois layouts.
- Tirar o rótulo do grupo **Layout da página**.
- Mudar os textos **Configurações**, **Personalizar** e **Personalizar a página do evento**.
- Mudar capacidade, janela de confirmação, trecho do link, confirmação manual ou o que **Redefinir tema** grava.
- Mostrar o nome do layout ao convidado.
- Layout na página **Evento indisponível**.

## 7. Regras de negócio

- Regra 1: A escolha continua exclusiva e por evento. Um card está sempre marcado. Marcar um card desmarca o outro. Evento novo abre com **Personalizado** marcado. Evento já criado abre com o layout já salvo marcado.
- Regra 2: Os nomes visíveis da escolha são **Personalizado** e **Imagem**. **Imagem** é o mesmo layout que o produto chamava de **Somente imagem**. **Personalizado** continua sendo a página com faixa e textos. **Imagem** continua sendo a página em que o convidado vê a imagem e a confirmação.
- Regra 3: A frase de apoio de **Personalizado** continua **Exibe todas as informações editáveis.** A frase de apoio de **Imagem** continua **Exibe a imagem do evento.**
- Regra 4: O ícone de **Personalizado** é o **layout list**. O ícone de **Imagem** é o **image**. Na escolha, os dois ícones têm tamanho médio e ficam centralizados cada um dentro de um quadrado do mesmo tamanho. Na lista, o ícone é pequeno, sem quadrado, e é o mesmo desenho do layout daquela linha.
- Regra 5: Os dois cards ficam na mesma linha, com a mesma largura, **Personalizado** à esquerda e **Imagem** à direita. Isso vale na criação, em **Configurações** e numa tela estreita. O texto pode quebrar dentro do card. Tocar em qualquer parte do card marca aquela opção.
- Regra 6: O card marcado tem um destaque visível de opção ativa. O outro card não tem esse destaque. O nome continua sendo o que identifica a opção; o ícone não substitui o nome.
- Regra 7: Sair da criação ou de **Configurações** sem salvar não troca o layout já gravado. A lista e a página pública continuam no layout salvo.
- Regra 8: Na lista, a linha do layout salvo lê-se, nesta ordem, **Layout:**, o ícone pequeno e o nome. Para o layout **Imagem**, isso é **Layout:**, o ícone **image** e **Imagem**. **Suposição:** o layout **Personalizado** usa o mesmo molde: **Layout:**, o ícone **layout list** e **Personalizado**. A miniatura da imagem do evento, quando existe, permanece onde já está e não substitui esse ícone.
- Regra 9: A lista mostra o layout salvo. Um card marcado e ainda não salvo não muda a linha da lista.
- Regra 10: Em **Personalizar a página do evento**, os controles e a prévia seguem o card marcado em **Configurações**, inclusive quando esse card ainda não foi salvo. Se o card muda com a personalização aberta, controles e prévia atualizam na hora.
- Regra 11: Com **Personalizado** marcado, ficam escondidos o fundo (os dois ícones, desfoque e gradiente) e o nível do desfoque. Ficam visíveis cor 1, cor 2, a cor do título e a cor do texto. A prévia é a página **Personalizado**, em gradiente, com título, detalhes quando houver, data, horário, nome do espaço e endereço, e a faixa só se houver imagem válida para esse layout nesta visita.
- Regra 12: Com **Imagem** marcado, ficam escondidas a cor do título e a cor do texto. Fica visível a escolha de fundo. No gradiente, cor 1 e cor 2 ficam visíveis. No desfoque, cor 1 e cor 2 ficam escondidas e o nível do desfoque fica visível. A prévia é a página **Imagem**: arte e confirmação, com o fundo do modo que estiver ativo nesta visita.
- Regra 13: Esconder um controle não apaga o valor. Salvar a personalização com um controle escondido mantém o valor que já estava guardado para ele. Voltar ao card que usa esse controle mostra o valor de novo. Trocar o card não zera cores, modo de fundo nem nível de desfoque.
- Regra 14: A imagem da prévia é a que o campo de imagem considera válida para o layout marcado nesta visita. A imagem já salva só entra se o card marcado for o layout já salvo, a imagem existir e não houver pedido de remoção. Um arquivo novo escolhido nesta visita entra na prévia, no enquadramento do card marcado: faixa em **Personalizado**, retrato em **Imagem**. Se o card marcado for o outro layout e não houver arquivo novo, a prévia não reaproveita a imagem do layout anterior.
- Regra 15: Sem imagem válida para o card **Imagem**, a prévia não inventa uma arte. A confirmação aparece sobre o gradiente. O desfoque, nesse caso, não tem foto para mostrar e também não cobre a prévia: ela permanece no gradiente, sem arte. Sem imagem válida para o card **Personalizado**, a prévia não mostra faixa nem um espaço vazio no lugar dela.
- Regra 16: Salvar a personalização grava cores, modo de fundo e nível de desfoque. Não grava o layout. Salvar **Configurações** é o que grava o layout, com as regras que o produto já aplica, inclusive a imagem obrigatória de **Imagem**. A página pública usa o layout salvo, não o card ainda não salvo.
- Regra 17: Enquanto o layout salvo for **Personalizado**, a página pública continua a página personalizada, mesmo que a prévia esteja em **Imagem** porque o card foi marcado. Enquanto o layout salvo for **Imagem**, a página pública continua a página de imagem. O modo de fundo e o desfoque só aparecem para o convidado quando o layout salvo é **Imagem**, como já vale hoje.
- Regra 18: O aviso de contraste continua só quando as cores de título e de texto estão visíveis, isto é, com **Personalizado** marcado. Não bloqueia o salvamento. Com **Imagem** marcado, esse aviso não aparece.
- Regra 19: **Redefinir tema** continua disponível nos dois cards, grava o que já grava hoje e não muda o card marcado nem o layout salvo.
- Regra 20: Título, data, horário, local, detalhes, capacidade e janela de confirmação continuam no formulário nos dois layouts, com as regras que o produto já aplica. O campo de imagem continua mudando o rótulo e a ajuda conforme o card marcado, como já faz.

## 8. Fluxos principais

### Fluxo 1 — Escolher o layout na criação

1. O organizador abre a criação. Vê o grupo **Layout da página** com dois cards na mesma linha.
2. O card **Personalizado** já está marcado: quadrado com o ícone **layout list**, o nome **Personalizado** e a frase **Exibe todas as informações editáveis.**
3. O card **Imagem** mostra o quadrado com o ícone **image**, o nome **Imagem** e a frase **Exibe a imagem do evento.**
4. Se marcar **Imagem**, esse card passa a ser o ativo e **Personalizado** perde o destaque. O campo de imagem passa a tratar a imagem como obrigatória, como já faz.
5. Ao salvar em **Personalizado**, o evento existe nesse layout. Na lista, a linha é **Layout:**, o ícone pequeno **layout list** e **Personalizado**.
6. Ao salvar em **Imagem**, com uma imagem aceita, a lista mostra **Layout:**, o ícone pequeno **image** e **Imagem**.

### Fluxo 2 — Trocar o card e olhar a personalização antes de salvar

1. O organizador abre **Configurações** de um evento. O card do layout já salvo está marcado.
2. Marca o outro card. Ainda não salva.
3. Abre **Personalizar a página do evento**. Os controles do layout do card anterior estão escondidos. Os controles do card marcado estão visíveis. A prévia mostra a página desse card.
4. A página pública e a lista continuam no layout salvo.
5. Se fechar **Configurações** sem salvar, o layout salvo permanece. Na próxima abertura, o card marcado volta a ser o layout salvo.

### Fluxo 3 — Salvar o tema com o outro card marcado

1. O organizador marca **Imagem** num evento cujo layout salvo é **Personalizado**, abre **Personalizar**, ajusta o fundo e salva a personalização.
2. O fundo fica guardado. O layout salvo continua **Personalizado**. A página pública não passa a ser **Imagem**.
3. A prévia, enquanto o card **Imagem** seguir marcado, mostra a página **Imagem** com esse fundo.
4. Se o organizador salvar **Configurações** em **Imagem**, com uma imagem válida para esse layout, a página pública passa a usar **Imagem** e o fundo guardado.
5. Se voltar o card para **Personalizado** antes de salvar o layout, a personalização esconde o fundo e a prévia volta à página **Personalizado**. O fundo guardado permanece para quando **Imagem** for marcado de novo.

## 9. Critérios de aceite

- Na criação e em **Configurações**, o organizador vê dois cards lado a lado, **Personalizado** e **Imagem**, com ícone médio dentro de um quadrado, nome e frase de apoio.
- O ícone de **Personalizado** é o **layout list**. O ícone de **Imagem** é o **image**.
- O nome **Somente imagem** não aparece nessa escolha nem na lista.
- Na criação, **Personalizado** começa marcado. Na edição, o layout salvo começa marcado. Só um card fica com o destaque de opção ativa.
- Na lista, o layout **Imagem** salvo aparece como **Layout:**, ícone pequeno **image** e **Imagem**. O layout **Personalizado** salvo aparece como **Layout:**, ícone pequeno **layout list** e **Personalizado**.
- Marcar **Personalizado** esconde, na hora, o fundo e o nível do desfoque, e mostra cor 1, cor 2, título e texto. A prévia passa a ser a página **Personalizado**.
- Marcar **Imagem** esconde, na hora, título e texto, e mostra o fundo. No desfoque, cor 1 e cor 2 somem e o nível aparece. A prévia passa a ser a página **Imagem**.
- A prévia não usa a imagem do outro layout quando o card marcado ainda não é o layout salvo e não há arquivo novo.
- Salvar a personalização não troca o layout da página pública. A página pública muda quando o layout é salvo.
- Esconder um controle não apaga o valor. Voltar ao card mostra o valor de novo.
- Fechar sem salvar mantém o layout da lista e da página pública.

## 10. Stack

Next.js, React, TypeScript e Tailwind, no painel que o produto já tem. A escolha de layout já existe na criação e em **Configurações**. A personalização da página, a prévia e a lista de eventos já existem. Os ícones **layout list** e **image** saem do conjunto de ícones que o projeto já usa.

Nada de biblioteca, banco ou serviço novo.

## 11. Justificativa da stack

A feature muda o que o organizador vê numa escolha e numa personalização que o produto já tem. O conjunto de ícones atual já contém os dois desenhos pedidos. Uma stack nova não entra neste recorte.

## 12. Fases de construção

### Fase 1 — Escolha visível e personalização alinhada ao card

Objetivo: o organizador reconhece o layout pelo card, a lista nomeia o layout salvo com ícone, e a personalização mostra a página do card marcado.

Specs:

- Spec 01 — Cards da escolha de layout
- Spec 02 — Rótulo do layout na lista
- Spec 03 — Personalização e prévia conforme o card marcado

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Cards da escolha de layout

- **Fase:** Fase 1
- **Objetivo (o quê):** Trocar as duas opções de texto da escolha de layout por dois cards lado a lado, com ícone, nome e frase de apoio, e renomear **Somente imagem** para **Imagem**.
- **Intenção (por quê):** O organizador precisa reconhecer as duas páginas de relance. O ícone e o card cumprem isso. O nome **Imagem** é o nome curto dessa opção.
- **Contexto:** A escolha já existe na criação do evento e em **Configurações do evento**, sob o rótulo **Layout da página**. Hoje cada opção tem uma marcação, o nome e uma frase de apoio. **Personalizado** diz **Exibe todas as informações editáveis.** **Somente imagem** diz **Exibe a imagem do evento.** Evento novo começa em **Personalizado**. Evento já criado abre no layout salvo. Continua sendo uma escolha única. O campo de imagem já muda o rótulo, a ajuda e a obrigatoriedade conforme a opção marcada. Esta spec não muda essas regras do campo de imagem.
- **Atores:** Organizador autenticado, na criação e em **Configurações**.
- **Descrição do comportamento:** No lugar das duas opções empilhadas só com texto, o grupo **Layout da página** mostra dois cards na mesma linha. O da esquerda é **Personalizado**. O da direita é **Imagem**. Cada card, de cima para baixo, tem um quadrado igual nos dois, com um ícone médio centralizado, depois o nome, depois a frase de apoio. O ícone de **Personalizado** é o **layout list**. O ícone de **Imagem** é o **image**. Tocar qualquer parte do card marca aquela opção e tira o destaque do outro. O card marcado é visualmente a opção ativa. Na criação, **Personalizado** abre marcado. Em **Configurações**, o layout já salvo abre marcado. O nome visível da opção da direita é **Imagem**, não **Somente imagem**.
- **Entradas e saídas:** Entra o layout já marcado (o padrão **Personalizado** na criação, ou o layout salvo na edição) e o toque num card. Sai a escolha marcada, os dois cards e o destaque só no card marcado. O valor gravado continua sendo um dos dois layouts que o produto já conhece. O nome **Imagem** é só o texto da tela.
- **Dados/entidades envolvidos (conceitual):** O layout do evento, com dois valores: **Personalizado** e **Imagem**. Cada opção tem ícone, nome e frase de apoio. Não há layout novo.
- **Estados e transições:**
  - **Personalizado marcado:** card da esquerda ativo; card da direita sem o destaque.
  - **Imagem marcado:** card da direita ativo; card da esquerda sem o destaque.
  - Sempre há exatamente um card marcado. Não existe estado sem layout.
- **Regras de negócio:** Valem as Regras 1, 2, 3, 4, 5 e 6 deste PRD.
- **Validações:** A escolha só aceita **Personalizado** ou **Imagem**. Não há como deixar os dois marcados nem os dois desmarcados. O salvamento do layout, da imagem e dos outros campos continua com as validações que o produto já tem. Esta spec não cria validação nova.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a criação ou **Configurações**.
  2. Vê **Layout da página** e os dois cards lado a lado.
  3. Lê o ícone, o nome e a frase de cada um. O card do layout atual está ativo.
  4. Toca o outro card. Esse card fica ativo e o anterior perde o destaque.
  5. Se salvar, o layout gravado é o do card ativo. Se sair sem salvar, o layout gravado não muda.
- **Casos de borda e erros:** Numa tela estreita, os cards continuam na mesma linha, cada um com metade da largura, e o texto quebra dentro do card. Os quadrados continuam do mesmo tamanho. Reabrir **Configurações** depois de salvar mostra o card do layout salvo. Reabrir sem ter salvado mostra de novo o layout que já estava gravado, não o card que foi só tocado. Falha ao salvar mantém o layout anterior gravado; o card pode continuar no que a pessoa marcou até ela sair. Não há terceira opção para exibir.
- **Impacto no existente:** A escolha deixa de ser duas linhas de texto e passa a ser dois cards. O nome visível **Somente imagem** deixa de aparecer nessa escolha. O rótulo **Layout da página**, a frase de apoio, o padrão da criação, a opção inicial da edição e as regras de imagem permanecem. A lista e a personalização ficam para as specs seguintes.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado a criação de um evento, quando a tela abre, então **Personalizado** e **Imagem** aparecem lado a lado, **Personalizado** está marcado, e cada card mostra o quadrado com o ícone médio, o nome e a frase de apoio.
  - Dado o card **Personalizado**, quando o organizador olha o ícone, então o desenho é o **layout list**. Dado o card **Imagem**, quando olha o ícone, então o desenho é o **image**.
  - Dado **Configurações** de um evento já salvo em **Imagem**, quando a tela abre, então o card **Imagem** está marcado e o card **Personalizado** não tem o destaque de opção ativa.
  - Dado **Personalizado** marcado, quando o organizador toca o card **Imagem**, então só **Imagem** fica ativo.
  - Dado a escolha visível, quando o organizador lê os nomes, então não encontra o texto **Somente imagem**.
  - Dado um card marcado e ainda não salvo, quando o organizador fecha sem salvar e abre de novo, então o card marcado é o layout que já estava gravado.
- **Definição de pronto:** Na criação e em **Configurações**, os dois layouts são cards lado a lado, com o ícone certo dentro do quadrado, o nome **Personalizado** ou **Imagem** e a frase de apoio atual. Um card está sempre marcado, com destaque de opção ativa. Sair sem salvar não troca o layout gravado.
- **Dependências:** Nenhuma. A escolha de layout já existe.
- **Fora do escopo desta spec:** O texto da lista (Spec 02). Esconder controles de personalização e mudar a prévia (Spec 03). Mudar regras de imagem, de salvamento ou da página pública.

### Spec 02 — Rótulo do layout na lista

- **Fase:** Fase 1
- **Objetivo (o quê):** Na lista de eventos, mostrar o layout salvo como **Layout:**, um ícone pequeno e o nome **Personalizado** ou **Imagem**.
- **Intenção (por quê):** O organizador identifica o layout do evento na lista com o mesmo desenho da escolha, sem abrir o evento. O nome curto **Imagem** substitui **Somente imagem** também ali.
- **Contexto:** Cada card da lista já mostra, acima do título, o nome do layout salvo. Hoje esse nome é **Personalizado** ou **Somente imagem**. Quando o evento tem imagem, uma miniatura aparece ao lado dessa linha. A miniatura usa a proporção do layout salvo. A lista só conhece o layout já gravado.
- **Atores:** Organizador autenticado, na lista de eventos.
- **Descrição do comportamento:** A linha do layout passa a ser lida, da esquerda para a direita, como o texto **Layout:**, depois um ícone pequeno, depois o nome. No layout **Imagem**, o ícone é o **image** e o nome é **Imagem**. No layout **Personalizado**, o ícone é o **layout list** e o nome é **Personalizado**. O ícone da lista é pequeno e não fica dentro de um quadrado. A miniatura da imagem do evento, se houver, continua no lugar em que já está. Evento sem imagem continua mostrando a linha do layout, sem miniatura.
- **Entradas e saídas:** Entra o layout salvo de cada evento. Sai a linha **Layout:**, ícone pequeno e nome. Não sai o texto **Somente imagem**.
- **Dados/entidades envolvidos (conceitual):** Layout salvo do evento (**Personalizado** ou **Imagem**) e, quando existe, a imagem já salva usada na miniatura. O ícone da linha depende só do layout, não da existência da imagem.
- **Estados e transições:** Não se aplica um estado novo. A linha reflete o layout salvo. Depois que uma troca de layout é salva, a lista passa a mostrar o layout novo. Antes de salvar, a lista permanece no layout anterior.
- **Regras de negócio:** Valem as Regras 2, 4, 8 e 9 deste PRD.
- **Validações:** Não se aplica. Esta spec só exibe o layout já gravado. Não há entrada nova do organizador.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a lista de eventos.
  2. Em cada evento, lê **Layout:**, vê o ícone pequeno e lê **Personalizado** ou **Imagem**.
  3. Se o evento tem imagem, vê também a miniatura que a lista já mostrava.
  4. Abre o evento, troca o layout, salva e volta à lista. A linha mostra o layout recém-salvo.
- **Casos de borda e erros:** Lista vazia continua a mensagem de nenhum evento, sem linha de layout. Evento sem imagem não ganha um ícone no lugar da miniatura: a miniatura segue ausente e a linha **Layout:** continua. Um card marcado em **Configurações** e não salvo não altera a lista. Não existe evento sem layout: quem nunca teve a escolha continua aparecendo como **Personalizado**, que já é o layout desses eventos.
- **Impacto no existente:** O texto solto **Personalizado** ou **Somente imagem** nessa linha vira **Layout:**, ícone e nome. Título, data, horário, local, status da confirmação, miniatura e o destino do card permanecem.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento salvo em **Imagem**, quando o organizador vê a lista, então a linha do layout é **Layout:**, o ícone pequeno **image** e o nome **Imagem**.
  - Dado um evento salvo em **Personalizado**, quando o organizador vê a lista, então a linha do layout é **Layout:**, o ícone pequeno **layout list** e o nome **Personalizado**.
  - Dado a lista, quando o organizador procura o texto **Somente imagem**, então não o encontra.
  - Dado um evento com imagem, quando a lista é exibida, então a miniatura permanece e o ícone pequeno da linha é outro elemento, o do layout.
  - Dado um layout marcado e ainda não salvo, quando o organizador volta à lista sem salvar, então a linha continua no layout anterior.
- **Definição de pronto:** Todo evento da lista mostra **Layout:**, o ícone pequeno do layout salvo e o nome **Personalizado** ou **Imagem**. **Somente imagem** não aparece. A miniatura, quando existe, continua no card.
- **Dependências:** Nenhuma para funcionar. O nome **Imagem** é o desta feature; a Spec 01 usa o mesmo nome na escolha. As duas podem ser conferidas juntas para o nome não divergir.
- **Fora do escopo desta spec:** Desenhar os cards da escolha (Spec 01). Mudar a prévia, a página pública ou o tamanho da miniatura. Colocar o ícone da lista dentro de um quadrado.

### Spec 03 — Personalização e prévia conforme o card marcado

- **Fase:** Fase 1
- **Objetivo (o quê):** Fazer os controles e a prévia de **Personalizar a página do evento** seguirem o card de layout marcado, na hora, mesmo antes de salvar o layout.
- **Intenção (por quê):** O organizador que acabou de marcar **Imagem** ou **Personalizado** precisa ver a configuração e a prévia daquela página. Ver os controles do outro layout leva a ajustar uma página que não é a que ele escolheu.
- **Contexto:** **Personalizar** abre de dentro de **Configurações** de um evento já criado. Hoje os controles e a prévia seguem o layout já salvo, não o card marcado nesta visita. No layout salvo **Imagem**, a personalização mostra o fundo (desfoque ou gradiente) e, no gradiente, cor 1 e cor 2; no desfoque, esconde cor 1 e cor 2 e mostra o nível. No layout salvo **Personalizado**, mostra cor 1, cor 2, título e texto, em gradiente, sem fundo e sem desfoque. Título e texto não aparecem em **Imagem**. O aviso de contraste só vale para título e texto. A imagem já salva não serve para o outro layout. A página pública só muda quando o layout é salvo. Salvar a personalização grava o tema, não o layout. **Redefinir tema** grava a volta ao padrão na hora e não muda o layout. Na criação ainda não existe personalização. Os cards da escolha são a Spec 01; até eles existirem, “card marcado” significa a opção de layout marcada nesta visita.
- **Atores:** Organizador autenticado, em **Configurações** de um evento já criado, ao abrir **Personalizar**.
- **Descrição do comportamento:** O card marcado em **Configurações** decide, na hora, o que **Personalizar** mostra. Com **Personalizado** marcado, somem o fundo e o nível do desfoque; aparecem cor 1, cor 2, título e texto; a prévia é a página **Personalizado** em gradiente. Com **Imagem** marcado, somem título e texto; aparece o fundo; no gradiente aparecem cor 1 e cor 2; no desfoque somem cor 1 e cor 2 e aparece o nível; a prévia é a página **Imagem**. Mudar o card atualiza controles e prévia mesmo que a personalização já esteja aberta, e mesmo que o layout ainda não tenha sido salvo. A imagem da prévia é a válida para aquele card nesta visita: a já salva só se o card for o layout salvo e a imagem não tiver sido pedida para remoção; senão, o arquivo novo, se houver; senão, nenhuma. Sem imagem, **Personalizado** não mostra faixa. Sem imagem, **Imagem** mostra a confirmação sobre o gradiente, sem arte e sem fundo desfocado. Esconder um controle não apaga o valor. Salvar a personalização não grava o layout e não limpa o que ficou escondido. A página pública permanece no layout salvo até **Configurações** ser salvo.
- **Entradas e saídas:** Entram o card marcado, as cores, o modo de fundo e o nível já guardados, a imagem válida desta visita e os ajustes feitos na personalização. Saem os controles visíveis daquele card e a prévia daquela página. A página pública não muda nesta spec até o layout ser salvo por **Configurações**.
- **Dados/entidades envolvidos (conceitual):** Layout marcado nesta visita e layout já salvo. Cores do tema: cor 1, cor 2, título e texto. Modo de fundo: gradiente ou desfoque. Nível de desfoque. Imagem válida para o layout marcado nesta visita, que pode não existir. A prévia também lê título, detalhes, data, horário, nome do espaço e endereço já salvos, para desenhar a página **Personalizado**.
- **Estados e transições:**
  - **Card Personalizado:** prévia personalizada em gradiente; cores de título e texto visíveis; fundo e desfoque escondidos, porém guardados.
  - **Card Imagem e fundo gradiente:** prévia de imagem sobre o gradiente; cor 1 e cor 2 visíveis; título, texto e desfoque escondidos.
  - **Card Imagem e fundo desfoque, com imagem válida:** prévia com a foto desfocada, a arte nítida e a confirmação; nível visível; cor 1, cor 2, título e texto escondidos.
  - **Card Imagem sem imagem válida:** prévia sem arte, confirmação sobre o gradiente, mesmo que o modo guardado seja desfoque.
  - Salvar a personalização grava o tema e não muda o layout salvo.
  - Salvar **Configurações** grava o layout. Aí a página pública passa a coincidir com o card, se o salvamento for aceito.
  - Fechar **Configurações** sem salvar devolve o card ao layout salvo na próxima abertura. Ajustes de tema não salvos são descartados. Tema já salvo por **Personalizar** permanece.
- **Regras de negócio:** Valem as Regras 10 a 20 deste PRD.
- **Validações:** Não se aplica uma validação nova de layout. Salvar **Imagem** em **Configurações** continua exigindo imagem válida, com a mensagem que o produto já usa. Salvar a personalização continua aceitando as cores, o modo e o nível como já aceita. O aviso de contraste continua sem impedir o salvamento, e só aparece com **Personalizado** marcado.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre **Configurações**. O card do layout salvo está marcado.
  2. Marca o outro card.
  3. Abre **Personalizar**. Vê só os controles daquele card e a prévia daquela página.
  4. Ajusta o que está visível. A prévia acompanha na hora.
  5. Se salvar a personalização, o tema fica guardado e a página pública continua no layout antigo.
  6. Se salvar **Configurações** no card novo, com os dados que o layout exige, a página pública passa a ser esse layout.
  7. Se fechar sem salvar o layout, a página pública e a próxima abertura voltam ao layout salvo.
- **Casos de borda e erros:** Marcar **Imagem** sem arquivo novo e com o layout salvo em **Personalizado** mostra a prévia sem arte, sobre o gradiente; a imagem de faixa não é reaproveitada. Marcar **Personalizado** com o layout salvo em **Imagem**, sem arquivo novo, mostra a prévia sem faixa. Pedir remoção da imagem e manter o mesmo card tira a imagem da prévia. Voltar ao card original, sem arquivo novo e sem remoção, faz a imagem já salva voltar à prévia. Desfoque ativo sem imagem válida não inventa um fundo desfocado. Valores escondidos sobrevivem a um salvamento do tema e reaparecem quando o card que os usa é marcado de novo. **Redefinir tema** continua nos dois cards, restaura o tema como já faz e não troca o card nem o layout salvo. Falha ao salvar a personalização mantém o tema anterior e não troca o layout. A criação do evento não tem esta personalização.
- **Impacto no existente:** A personalização deixa de depender só do layout salvo para decidir o que mostrar. Passa a depender do card marcado nesta visita. A página pública, a lista e as regras de gravar o layout permanecem ligadas ao que foi salvo. Cores, modo e desfoque continuam guardados quando não estão em uso.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento salvo em **Imagem**, quando o organizador marca **Personalizado** e abre **Personalizar** sem salvar, então o fundo e o nível do desfoque não aparecem, cor 1, cor 2, título e texto aparecem, e a prévia é a página **Personalizado**.
  - Dado um evento salvo em **Personalizado**, quando o organizador marca **Imagem** e abre **Personalizar** sem salvar, então título e texto não aparecem, o fundo aparece, e a prévia é a página **Imagem**.
  - Dado **Imagem** marcado e o desfoque ativo, quando a personalização é exibida, então cor 1 e cor 2 ficam escondidas e o nível do desfoque fica visível.
  - Dado **Imagem** marcado, o gradiente ativo e sem imagem válida para esse layout nesta visita, quando a prévia é exibida, então não há arte, a confirmação fica sobre o gradiente e a imagem do outro layout não aparece.
  - Dado um tema salvo com o outro card ainda não salvo em **Configurações**, quando o convidado abre a página, então o layout público continua o layout já salvo.
  - Dado um controle escondido pelo card, quando o organizador salva a personalização e depois marca de novo o card que usa esse controle, então o valor anterior continua lá.
  - Dado a personalização aberta, quando o organizador muda o card, então controles e prévia mudam na hora, sem esperar o salvamento do layout.
- **Definição de pronto:** Marcar um card esconde na hora os controles do outro layout e a prévia mostra a página do card marcado, com a imagem só quando ela é válida para esse card nesta visita. A página pública não muda até o layout ser salvo. Valor escondido não é apagado.
- **Dependências:** Spec 01 — o card é o controle que esta spec observa. A personalização, as cores, o fundo desfocado e as regras de imagem já existem.
- **Fora do escopo desta spec:** Desenhar os cards (Spec 01). Mudar o rótulo da lista (Spec 02). Mudar o cálculo do desfoque, as cores padrão, o texto do botão **confirmo**, a superfície clara da confirmação ou o que **Redefinir tema** grava. Fazer a página pública acompanhar um card ainda não salvo.

## 14. Ordem recomendada de implementação

1. Spec 01 — Cards da escolha de layout
2. Spec 02 — Rótulo do layout na lista
3. Spec 03 — Personalização e prévia conforme o card marcado

A Spec 01 entrega o card que a Spec 03 usa como sinal do layout marcado. A Spec 02 usa o mesmo nome **Imagem** e os mesmos ícones, na lista. Seguir essa ordem evita a personalização observar uma escolha que ainda é só texto, e evita a lista continuar dizendo **Somente imagem** depois que a escolha já diz **Imagem**.
