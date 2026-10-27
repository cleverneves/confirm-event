# PRD — Configurações do evento

> Tipo: PRD de feature · Data: 2026-10-27
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

Na ficha de um evento já criado, o organizador passa a ter dois caminhos separados.

**Editar** continua no mesmo lugar e passa a alterar só o que identifica o evento: título, detalhes, data, horário e local.

**Configurações** fica ao lado de **Editar**. Abre um diálogo com o que hoje está espalhado entre o formulário de editar, o card e o botão **Personalizar**: tipo de layout, imagem do layout, trecho do link, capacidade máxima, início e fim da janela de confirmação, encerrar e reativar a confirmação. Dentro desse diálogo, **Personalizar** abre o diálogo de tema que já existe, com o salvar próprio.

O card continua mostrando o link, com **Copiar Link** e **Visualizar Página**, o selo de confirmação aberta ou encerrada e a frase de status. Criar um evento novo continua pedindo os campos de hoje.

## 2. Problema que resolve

Quem administra um evento já criado encontra, num formulário só, dados da ocasião (título, detalhes, data, horário e local) misturados com decisões de publicação (layout, imagem, capacidade e prazo de confirmação). O tema fica num botão ao lado. O trecho do link e o encerramento da confirmação ficam mais abaixo, no card.

A mistura faz a edição do convite parecer a mesma tarefa que ajustar a página pública e o prazo. Esta feature separa as duas tarefas, sem mudar o que cada uma já faz.

## 3. Público-alvo

- **Quem já pode editar o evento** — criador, organizador incluído pelo criador, e conta autenticada num evento antigo ainda aberto a qualquer conta do painel. É a mesma pessoa que hoje abre **Editar**, **Personalizar**, altera o trecho do link e encerra ou reativa a confirmação.
- **Convidado** — não entra no painel e não vê **Configurações**. Continua só na página pública, que reflete o que foi salvo.

## 4. Objetivo do recorte atual

Reorganizar a ficha do evento já criado. **Editar** fica só com título, detalhes, data, horário e local. O restante dessas decisões vai para **Configurações**, inclusive o botão **Personalizar**. O card mantém o link para copiar e visualizar, o selo e a frase de status. A tela de criar evento não muda.

## 5. Funcionalidades

**Essenciais:**

- Botão **Configurações** ao lado de **Editar**, no lugar que hoje é do botão **Personalizar**.
- Diálogo **Configurações do evento**, com as seções nesta ordem: layout da página, imagem, trecho do link, capacidade máxima, início e fim da janela, encerrar ou reativar, e o botão **Personalizar**.
- **Personalizar**, dentro desse diálogo, abre o diálogo de tema já existente. O salvar do tema continua só do tema.
- **Editar** permanece onde está e passa a ter só título, detalhes, data, horário e local.
- No card, o endereço do evento continua visível, com **Copiar Link** e **Visualizar Página**. Some dali o controle **Editar trecho do link**.
- No card, o selo e a frase de status da confirmação continuam. Somem dali **Encerrar agora** e **Reativar**.
- Salvar **Editar** não apaga layout, imagem, capacidade, janela, link nem tema. Salvar o grupo de **Configurações** não apaga título, detalhes, data, horário nem local.
- Criar evento continua com o formulário atual, incluindo capacidade, layout, imagem e janela.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mudar as regras já vigentes de layout, imagem, tema, capacidade, janela de confirmação, link, página pública, lista de presenças ou card de **Meus Eventos**.
- Tirar do card o endereço, **Copiar Link**, **Visualizar Página**, o selo ou a frase de status.
- Repetir **Copiar Link** e **Visualizar Página** dentro de **Configurações**.
- Juntar o salvar do tema ao salvar de layout, imagem, capacidade e janela.
- Mudar o formulário de criar evento, ou esconder nele capacidade, layout, imagem ou janela.
- Mover para **Configurações** a exclusão do evento, a lista de organizadores, a lista de presenças ou as métricas.
- Criar outro layout, outro tipo de imagem, aviso por e-mail ou uma página nova de configurações fora da ficha.

## 7. Regras de negócio

- Regra 1: **Configurações** e o **Editar** enxuto valem na ficha de um evento já criado. A tela de criar evento continua pedindo, de uma vez, título, detalhes, data, horário, local, capacidade, layout, imagem e janela, com as validações que já exige hoje.
- Regra 2: Quem já pode alterar o evento pode abrir **Editar** e **Configurações**. Quem não tem acesso ao evento não vê a ficha e não conclui essas ações por tentativa direta. O convidado não vê esses botões.
- Regra 3: **Editar** grava só título, detalhes, data, horário e local. Layout, imagem, capacidade, janela, trecho do link e tema permanecem como estavam.
- Regra 4: Em **Configurações**, um único **Salvar** grava juntos o layout, a imagem, a capacidade e as duas datas da janela. Esse salvar não altera título, detalhes, data, horário, local, trecho do link nem tema.
- Regra 5: O trecho do link tem a ação própria **Alterar trecho**, como hoje. Não depende do **Salvar** da Regra 4. Encerrar e reativar também são ações próprias, com o mesmo efeito de hoje. **Personalizar** continua com o salvar do diálogo de tema.
- Regra 6: Fechar **Configurações** sem usar o **Salvar** da Regra 4 descarta layout, imagem, capacidade e datas ainda não salvos. Trecho já confirmado com **Alterar trecho**, encerramento ou reativação já confirmados, e tema já salvo, permanecem.
- Regra 7: As regras já vigentes de cada campo continuam, só mudam de lugar. Isso inclui: layout **Personalizado** ou **Somente imagem**; imagem obrigatória só em **Somente imagem**; jpg ou png até 8 MB; aviso de proporção sem impedir o salvamento quando o arquivo é aceito; capacidade opcional, inteiro a partir de 1, ou vazio para sem limite; janela com as duas datas ou com nenhuma; trecho com letras, números e hífen, único no sistema.
- Regra 8: Mudar a data em **Editar** não apaga a janela. Se a data nova deixar a janela inválida, o sistema não grava a data e pede para ajustar ou limpar a janela em **Configurações**. Se a data nova for compatível com a janela já salva, a data é gravada e a confirmação é reavaliada com as regras que já existem, inclusive o encerramento manual, que só sai com **Reativar**.
- Regra 9: Mudar a janela em **Configurações** usa a data do evento já salva. Não dá para alterar a data do evento por esse diálogo.
- Regra 10: No card, **Copiar Link** e **Visualizar Página** usam o trecho atual. Depois de **Alterar trecho** com sucesso, o endereço do card passa a ser o novo. Um trecho antigo daquele evento continua abrindo o trecho atual. Trecho de outro evento continua recusado com **Esse endereço não está disponível.**
- Regra 11: **Encerrar agora** só aparece quando a confirmação está aberta, pede confirmação explícita e, se concluído, deixa de aceitar nomes novos. Quem já confirmou permanece na lista. **Reativar** só aparece quando a confirmação está encerrada e remove só o encerramento manual. Se o calendário ainda não abriu ou já fechou, a confirmação continua encerrada e a frase do card explica o motivo, como hoje.
- Regra 12: O selo e a frase de status do card acompanham o resultado de salvar a janela, de encerrar, de reativar e de mudar a data do evento. A frase continua sendo a que o painel já mostra hoje para cada motivo.

## 8. Fluxos principais

### Fluxo 1 — Ajustar os dados da ocasião

1. Na ficha, a pessoa clica em **Editar**.
2. Vê só título, detalhes, data, horário e local, já preenchidos com o que está salvo.
3. Altera o que quiser e salva.
4. O diálogo fecha. O card mostra os dados novos. Layout, imagem, capacidade, janela, link e tema ficam como estavam.

### Fluxo 2 — Ajustar layout, imagem, capacidade e janela

1. Na ficha, a pessoa clica em **Configurações**.
2. Vê o layout, a imagem, a capacidade e as datas da janela já salvos.
3. Altera o que quiser e usa **Salvar**.
4. Se estiver válido, o diálogo fecha e a página pública passa a refletir o que foi salvo. Título, detalhes, data, horário, local e trecho do link ficam como estavam.

### Fluxo 3 — Alterar o trecho do link

1. Em **Configurações**, a pessoa vê o endereço atual e o campo do trecho, já preenchido.
2. Informa outro trecho e usa **Alterar trecho**.
3. Se o trecho estiver livre, o endereço do card atualiza na hora. **Copiar Link** e **Visualizar Página** passam a usar o trecho novo. O diálogo de **Configurações** continua aberto.

### Fluxo 4 — Encerrar ou reativar

1. Em **Configurações**, se a confirmação está aberta, a pessoa vê **Encerrar agora**.
2. Confirma. A confirmação encerra. A frase e o selo do card atualizam. No diálogo, o botão passa a ser **Reativar**.
3. Se reativar e o prazo ainda permitir, a confirmação volta a aceitar nomes. Se o prazo não permitir, continua encerrada e a frase explica o motivo.

### Fluxo 5 — Personalizar o tema

1. Em **Configurações**, a pessoa clica em **Personalizar**.
2. Abre o diálogo de tema que já existe, por cima. **Configurações** permanece aberto, com o que ainda não foi salvo ali.
3. Salvar o tema grava só cores, modo de fundo e desfoque, como hoje, e fecha só o diálogo de tema.
4. Volta para **Configurações** com o rascunho de layout, imagem, capacidade, datas e trecho ainda não confirmado do jeito que estava.

### Fluxo 6 — Criar evento

1. A pessoa abre a tela de novo evento.
2. Continua vendo e preenchendo todos os campos de hoje, inclusive capacidade, layout, imagem e janela.
3. Ao salvar, o evento nasce com esses dados. Depois, na ficha, o ajuste fino segue os fluxos 1 a 5.

## 9. Critérios de aceite

- Na ficha, **Editar** e **Configurações** aparecem lado a lado. **Personalizar** não aparece mais nessa fileira.
- **Editar** mostra e grava só título, detalhes, data, horário e local.
- **Configurações** permite alterar layout, imagem, trecho do link, capacidade, início e fim da janela, e encerrar ou reativar a confirmação.
- **Personalizar**, dentro de **Configurações**, abre o diálogo de tema já existente e o salvar desse diálogo não grava os outros campos.
- O card mantém o endereço, **Copiar Link**, **Visualizar Página**, o selo e a frase de status.
- O card não mostra **Editar trecho do link**, **Encerrar agora** nem **Reativar**.
- Salvar um lado não apaga o que é do outro lado.
- Uma data de evento que deixe a janela inválida não é gravada, e a pessoa é orientada a ajustar a janela em **Configurações**.
- Criar evento continua com capacidade, layout, imagem e janela no mesmo formulário de hoje.
- Quem não tem acesso ao evento não conclui nenhuma dessas alterações.

## 10. Stack

Next.js, React, TypeScript e Tailwind, no painel que já existe. Dados e autenticação no Supabase. Formulários com os componentes de interface, validação e feedback que o painel já usa. Nenhuma biblioteca nova.

## 11. Justificativa da stack

A feature só muda onde a pessoa encontra decisões que o produto já grava. O painel, a ficha, os diálogos de editar e de tema, o link e a janela já estão nessa stack. Não há serviço, armazenamento nem canal novo.

## 12. Fases de construção

### Fase 1 — Abrir Configurações

Objetivo: concentrar na ficha, num diálogo só, o que deixa de ficar solto no card e o que vai sair de **Editar**, sem ainda retirar esses campos de **Editar**.
Specs:

- Spec 01 — Diálogo de Configurações e o que sai do card

### Fase 2 — Enxugar Editar

Objetivo: **Editar** passa a gravar só os dados da ocasião, depois que **Configurações** já oferece o restante. A criação do evento permanece completa.
Specs:

- Spec 02 — Editar só título, detalhes, data, horário e local

A feature só está pronta quando as duas specs estiverem feitas. Entre elas, layout, imagem, capacidade e janela podem aparecer nos dois lugares. Isso é transitório.

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Diálogo de Configurações e o que sai do card

- **Fase:** Fase 1 — Abrir Configurações
- **Objetivo (o quê):** Na ficha do evento, um botão **Configurações** abre um diálogo para layout, imagem, trecho do link, capacidade, datas da janela, encerrar ou reativar, e para entrar em **Personalizar**. O card deixa de oferecer editar o trecho, encerrar e reativar, e deixa de mostrar **Personalizar** ao lado de **Editar**.
- **Intenção (por quê):** Separar o ajuste da página pública e do prazo dos dados da ocasião, e tirar do card ações que a pessoa só usa de vez em quando, sem esconder o link nem o status da confirmação.
- **Contexto:** A ficha já mostra, no alto do card, data, horário, título, selo de confirmação aberta ou encerrada e local. Ao lado do título funcional há **Editar** e **Personalizar**. Abaixo, o endereço com **Copiar Link**, **Visualizar Página** e **Editar trecho do link**. Mais abaixo, a frase de status e, conforme o caso, **Encerrar agora** ou **Reativar**. **Editar** hoje também leva layout, imagem, capacidade e janela. O diálogo de tema já existe, com prévia e salvar próprio. Esta spec acrescenta **Configurações** e move para lá o que está no card e o acesso ao tema. Ainda não retira layout, imagem, capacidade e janela de **Editar** — isso é a Spec 02.
- **Atores:** Quem já pode editar o evento. O convidado não participa.
- **Descrição do comportamento:** Ao lado de **Editar** passa a existir **Configurações**. **Personalizar** sai dessa fileira. O clique abre o diálogo **Configurações do evento**. Se o conteúdo não couber, a pessoa rola dentro do diálogo. As seções aparecem nesta ordem.
  1. **Layout da página**, com as opções já existentes **Personalizado** (exibe todas as informações editáveis) e **Somente imagem** (exibe a imagem do evento). A opção salva já vem marcada.
  2. **Imagem**, com o rótulo **Imagem** quando o layout escolhido no diálogo é **Somente imagem**, e **Imagem (opcional)** quando é **Personalizado**. Mostra a prévia quando há imagem, o aviso de proporção quando a imagem foge do ideal, a troca de arquivo e **Remover imagem** quando há prévia. O texto de ajuda de cada layout continua o que o produto já mostra.
  3. **Trecho do link.** Mostra o endereço atual, só para leitura, e o campo **Trecho do link** já preenchido com o trecho salvo. As ações são **Alterar trecho** e, se a pessoa mudou o texto e quer desfazer antes de confirmar, **Cancelar**, que devolve o trecho salvo. Não há o passo extra de clicar em **Editar trecho do link**: o campo já está visível porque a pessoa abriu **Configurações** para isso.
  4. **Capacidade máxima de convidados (opcional)**, preenchida com o número salvo ou vazia se não houver limite.
  5. **Janela de confirmação (opcional)**, com o texto de que início e fim são o período em que a confirmação fica disponível para o convidado, e os campos **Início** e **Fim** com as datas salvas ou vazios.
  6. **Encerrar agora** ou **Reativar**, o que couber ao estado atual. **Encerrar agora** abre a confirmação já existente: título **Encerrar a confirmação agora?**, texto de que o link deixa de aceitar nomes novos, de que quem já confirmou permanece na lista e de que dá para reativar depois se o prazo ainda permitir, com **Cancelar** e **Encerrar**. **Reativar** age no clique, como hoje, sem segunda pergunta.
  7. Botão **Personalizar**, que abre por cima o diálogo **Personalizar a página do evento** já existente.

  O **Salvar** do diálogo grava só layout, imagem, capacidade e as duas datas da janela, e em seguida fecha **Configurações**. **Alterar trecho**, encerrar, reativar e o salvar do tema não usam esse botão e não fecham **Configurações**, exceto o tema, que fecha só o próprio diálogo.

  No card, permanecem o endereço, **Copiar Link**, **Visualizar Página**, o selo e a frase de status. Saem **Editar trecho do link**, **Encerrar agora** e **Reativar**.
- **Entradas e saídas:** Entram os valores já salvos do evento e o que a pessoa alterar em cada seção. Saem a gravação só do grupo pedido por cada ação, o diálogo fechado quando o **Salvar** do grupo layout/imagem/capacidade/janela dá certo, o endereço do card atualizado quando o trecho muda, e o selo e a frase atualizados quando a janela, o encerramento ou a reativação mudam o status. Erro de validação permanece no diálogo, no campo correspondente, com o aviso já usado hoje. Falha inesperada mostra o aviso genérico que essa ação já mostra hoje e não grava.
- **Dados/entidades envolvidos (conceitual):** Evento já criado: layout (**Personalizado** ou **Somente imagem**), imagem opcional ou obrigatória conforme o layout, trecho do link, endereço completo, capacidade máxima opcional, início e fim opcionais da janela, status da confirmação (aberta ou encerrada), motivo desse status, e tema visual (cores, modo de fundo e desfoque) só pelo diálogo de **Personalizar**. Título, detalhes, data, horário e local são lidos quando a regra da janela precisa da data, e não são gravados por este diálogo.
- **Estados e transições:** O diálogo abre com os valores salvos. Há rascunho enquanto a pessoa muda layout, imagem, capacidade ou datas e ainda não salvou. **Salvar** com sucesso volta ao estado salvo e fecha o diálogo. Fechar sem salvar descarta esse rascunho. O trecho tem rascunho próprio: **Alterar trecho** com sucesso torna o trecho novo o valor salvo e atualiza o endereço mostrado; **Cancelar** ou fechar o diálogo sem alterar descarta só o rascunho do trecho. Confirmação aberta mostra **Encerrar agora**. Confirmação encerrada mostra **Reativar**. Depois de encerrar com sucesso, o estado passa a encerrado e o botão vira **Reativar**. Depois de reativar, o estado segue o calendário: aberta, se o prazo permitir; encerrada, se ainda não abriu ou se o prazo já passou. O tema aberto por cima não muda o rascunho de **Configurações**.
- **Regras de negócio:** Valem as Regras 2, 4, 5, 6, 7, 9, 10, 11 e 12 deste PRD. Em especial: **Somente imagem** só salva se houver imagem nova aceita ou a imagem já salva desse mesmo layout, sem pedido de remoção. Trocar de layout não reaproveita a imagem do outro layout; na ida para **Somente imagem** sem arquivo novo, o salvamento é recusado. Na volta para **Personalizado**, dá para salvar sem imagem. Arquivo que não seja jpg ou png, ou maior que 8 MB, é recusado. Proporção fora do ideal avisa e ainda permite salvar se o arquivo for aceito. Capacidade vazia significa sem limite. Número inválido é recusado com **Informe um número inteiro a partir de 1**. A janela exige as duas datas ou nenhuma, com a mensagem **Informe o início e o fim da janela, ou deixe os dois vazios.** Datas inválidas, início que não seja anterior ao fim, ou data da janela que não seja anterior à data do evento já salva, são recusadas com as mensagens que o produto já usa. O trecho vazio, só com hífens ou com caractere fora de letras, números e hífen é recusado. Trecho de outro evento é recusado com **Esse endereço não está disponível.** Informar o mesmo trecho já salvo responde sucesso **Link atualizado.** sem mudar o endereço. Trechos antigos daquele evento continuam abrindo o atual. Encerrar sem a confirmação explícita não encerra. Encerrar quando já está encerrada informa que a confirmação já está encerrada e não muda o estado. Reativar não fura o calendário.
- **Validações:** Antes do **Salvar** do grupo, o sistema confere layout, arquivo de imagem, capacidade e o par de datas contra a data do evento já salva. Antes de **Alterar trecho**, confere o formato e se o trecho está livre para aquele evento. Antes de encerrar, confere se a confirmação ainda está aberta e se a pessoa confirmou. Antes de reativar, confere se a pessoa ainda tem acesso; o efeito final depende do calendário. Cada ação recusa o restante se a pessoa perdeu o acesso ao evento, com a mensagem de falta de acesso que o painel já usa.
- **Fluxo do usuário (passo a passo):**
  1. Abre a ficha e vê **Editar** e **Configurações**. Não vê **Personalizar** nessa fileira, nem **Editar trecho do link**, nem **Encerrar agora**, nem **Reativar** no card.
  2. Vê o endereço, copia ou abre a página, e lê o selo e a frase de status.
  3. Clica em **Configurações** e encontra as sete seções, preenchidas com o que já está salvo.
  4. Ajusta layout, imagem, capacidade ou janela e salva, ou altera o trecho, ou encerra ou reativa, ou abre **Personalizar**.
  5. Em caso de erro, permanece no diálogo e corrige o campo. Em caso de sucesso do **Salvar** do grupo, o diálogo fecha. Nas outras ações bem-sucedidas, o card e o próprio diálogo refletem o resultado sem descartar o rascunho das seções ainda não salvas.
- **Casos de borda e erros:** Fechar o diálogo, pelo controle de fechar ou por fora, descarta layout, imagem, capacidade e datas não salvos, e o trecho digitado ainda não confirmado. Imagem removida no rascunho volta se a pessoa fechar sem salvar. **Somente imagem** sem imagem nenhuma não salva e explica que a imagem é necessária. Capacidade menor do que o total já confirmado pode ser salva; as confirmações existentes permanecem e a página pública segue a regra de vagas que já existe. Janela só com uma das datas não salva. Data de janela igual ou posterior à data do evento não salva. Trecho indisponível não troca o endereço do card. Falha ao copiar o link no card continua avisando que não foi possível copiar, sem abrir **Configurações**. Se a confirmação muda de estado entre o clique e a conclusão, a ação informa o estado atual e não força a transição. Salvar o tema não grava layout, imagem, capacidade, janela nem trecho. Salvar **Configurações** não grava o tema nem o trecho. **Editar**, nesta spec, ainda contém layout, imagem, capacidade e janela; um salvamento feito por lá continua podendo gravar esses campos até a Spec 02.
- **Impacto no existente:** Muda a fileira de botões da ficha e o miolo do card. O diálogo de tema permanece, com outra porta de entrada. **Copiar Link**, **Visualizar Página**, selo, frase, página pública, lista, métricas, organizadores e exclusão do evento permanecem. **Editar** ainda não é enxugado.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento que a pessoa pode editar, quando ela abre a ficha, então vê **Editar** e **Configurações** lado a lado, e não vê **Personalizar** nessa fileira.
  - Dado o card do evento, quando a ficha é exibida, então o endereço, **Copiar Link**, **Visualizar Página**, o selo e a frase de status estão visíveis, e **Editar trecho do link**, **Encerrar agora** e **Reativar** não estão.
  - Dado **Configurações** aberto, quando a pessoa olha as seções, então a ordem é layout, imagem, trecho do link, capacidade, janela, encerrar ou reativar, e **Personalizar**.
  - Dado um evento em **Somente imagem** sem imagem nova e sem imagem já salva desse layout, quando a pessoa tenta **Salvar**, então nada é gravado e o diálogo explica que a imagem é necessária.
  - Dado uma capacidade vazia, quando a pessoa salva, então o evento fica sem limite. Dado um texto que não é inteiro a partir de 1, quando a pessoa salva, então o campo recusa com **Informe um número inteiro a partir de 1**.
  - Dado só a data de início da janela preenchida, quando a pessoa salva, então nada é gravado e aparece **Informe o início e o fim da janela, ou deixe os dois vazios.**
  - Dado um trecho já usado por outro evento, quando a pessoa usa **Alterar trecho**, então o endereço do card não muda e aparece **Esse endereço não está disponível.**
  - Dado um trecho livre, quando **Alterar trecho** conclui, então o card mostra o endereço novo, o diálogo de **Configurações** continua aberto, e um trecho antigo daquele evento abre o endereço novo.
  - Dado a confirmação aberta, quando a pessoa confirma **Encerrar**, então nomes novos deixam de ser aceitos, quem já confirmou permanece, o card atualiza selo e frase, e o diálogo passa a oferecer **Reativar**.
  - Dado a confirmação encerrada por prazo já vencido, quando a pessoa usa **Reativar**, então a confirmação continua encerrada e a frase do card explica que o prazo acabou.
  - Dado alterações não salvas de layout em **Configurações**, quando a pessoa abre **Personalizar**, salva o tema e volta, então o rascunho de layout continua lá e o tema salvo não inclui esse layout.
  - Dado **Configurações** fechado sem **Salvar**, quando a pessoa abre de novo, então layout, imagem, capacidade e janela são os últimos valores salvos.
  - Dado uma pessoa sem acesso ao evento, quando tenta concluir qualquer ação deste diálogo, então nada é gravado e ela recebe a mensagem de falta de acesso já usada no painel.
- **Definição de pronto:** Na ficha, **Configurações** concentra layout, imagem, trecho, capacidade, janela, encerrar, reativar e a entrada de **Personalizar**. O card só perdeu os controles que foram para esse diálogo. Cada ação grava só o próprio grupo. O diálogo de tema segue igual no conteúdo. **Editar** ainda não foi reduzido.
- **Dependências:** Nenhuma. Usa o que a ficha, o tema, o link, a capacidade e a janela já fazem.
- **Fora do escopo desta spec:** Retirar layout, imagem, capacidade e janela de **Editar**. Mudar o formulário de criar evento. Alterar regras da página pública, da lista ou do tema além da porta de entrada. Duplicar **Copiar Link** e **Visualizar Página** dentro do diálogo.

### Spec 02 — Editar só título, detalhes, data, horário e local

- **Fase:** Fase 2 — Enxugar Editar
- **Objetivo (o quê):** O diálogo **Editar** de um evento já criado passa a mostrar e gravar somente título, detalhes, data, horário e local. Criar evento continua com o formulário completo de hoje.
- **Intenção (por quê):** Depois que **Configurações** existe, manter aqueles campos também em **Editar** duplica a tarefa e arrisca um salvamento sobrescrever o outro. A ocasião fica num lugar; a página e o prazo ficam no outro.
- **Contexto:** A Spec 01 já oferece layout, imagem, capacidade, janela, trecho, encerrar, reativar e **Personalizar** em **Configurações**. Até esta spec, **Editar** ainda contém layout, imagem, capacidade e janela, além de título, detalhes, data, horário e local. A tela de criar evento usa o mesmo conjunto completo de campos e deve permanecer assim. A data do evento já não pode ser gravada no passado, com a exceção já existente: se a data salva já passou, dá para salvar o restante sem trocar essa data.
- **Atores:** Quem já pode editar o evento, no diálogo **Editar**. Quem cria um evento novo, na tela de criação, sem mudança.
- **Descrição do comportamento:** **Editar** abre com título, detalhes, data, horário e local preenchidos. Detalhes continuam opcionais. Título, data, horário e local continuam obrigatórios. Não há campo de capacidade, layout, imagem nem janela. **Salvar** grava só esses cinco dados e fecha o diálogo em caso de sucesso. O card passa a mostrar título, data, horário e local novos. Layout, imagem, capacidade, janela, trecho, tema e lista de presenças permanecem. A página pública usa a data, o horário, o local, o título e os detalhes novos na hora, respeitando o layout já salvo: em **Somente imagem**, esses textos continuam fora da página pública, como já acontece. Na criação, o formulário segue com todos os campos e com um único salvamento que grava ocasião, capacidade, layout, imagem e janela juntos.
- **Entradas e saídas:** Em **Editar**, entram título, detalhes, data, horário e local. Sai a gravação desses campos, ou a recusa com a mensagem no campo, sem alterar o resto do evento. Na criação, entram todos os campos de hoje e sai o evento novo completo, ou a recusa já existente.
- **Dados/entidades envolvidos (conceitual):** Evento: título, detalhes opcionais, data, horário e local. Para validar a data contra a janela, a spec lê a janela já salva (início, fim e encerramento manual) e não a altera. Capacidade, layout, imagem, trecho e tema são preservados, não editados aqui.
- **Estados e transições:** **Editar** abre limpo em relação a rascunho anterior, sempre com os valores salvos. Salvar com sucesso fecha e atualiza o card. Fechar sem salvar descarta o rascunho desses cinco campos. Se a data nova for incompatível com a janela salva, o estado do evento não muda. Se for compatível, a data muda e o status da confirmação é reavaliado: encerramento manual continua até **Reativar**; sem encerramento manual, o calendário abre ou fecha conforme a data nova e a janela que já existia.
- **Regras de negócio:** Valem as Regras 1, 2, 3 e 8 deste PRD. Título não pode ficar vazio nem só com espaços. Local também não. Data e horário precisam ser um dia e um horário válidos. Uma data nova anterior a hoje é recusada com **A data não pode estar no passado.** A data que já está salva pode ser mantida mesmo que esse dia já tenha passado. Detalhes podem ficar vazios. A janela não é limpa automaticamente. Quando a data nova faria a janela ficar inválida — início que não é anterior ao fim, ou data de janela que não é anterior à data nova do evento — o salvamento inteiro de **Editar** é recusado. A mensagem diz para ajustar ou limpar a janela em **Configurações** e não grava título, detalhes, horário nem local nessa tentativa. Capacidade abaixo ou acima do total, layout e imagem não são tocados.
- **Validações:** Título, local, data e horário são conferidos antes de gravar. A data nova é conferida contra a janela já salva. A criação continua conferindo, além disso, capacidade, layout, imagem e janela, como hoje. Sem acesso ao evento, **Editar** não grava e informa a falta de acesso.
- **Fluxo do usuário (passo a passo):**
  1. Na ficha, clica em **Editar**.
  2. Vê só título, detalhes, data, horário e local.
  3. Altera e salva.
  4. Se a data continuar compatível com a janela, o diálogo fecha e o card atualiza esses dados. O restante do evento fica igual.
  5. Se a data invalidar a janela, permanece em **Editar**, vê a orientação para **Configurações** e nada é gravado. Ajusta a data ou vai à **Configurações** ajustar a janela e tenta de novo.
  6. Na tela de novo evento, preenche também capacidade, layout, imagem e janela, como antes desta feature.
- **Casos de borda e erros:** Fechar **Editar** sem salvar mantém os cinco campos como estavam. Salvar sem mudar nada grava o mesmo conteúdo e fecha, sem limpar **Configurações**. Evento sem janela aceita uma data futura válida e a confirmação segue a regra de encerrar na véspera do dia do evento, ou já nasce encerrada se a data for hoje. Evento com encerramento manual continua encerrado depois de uma data nova válida; a frase do card continua oferecendo reativação até o último dia em que o prazo permitir, pelo caminho da Spec 01. Falha inesperada não grava e mostra o aviso genérico de não foi possível salvar. A criação com janela inválida para a data informada na própria criação continua recusando, como hoje, porque ali os campos ainda estão juntos.
- **Impacto no existente:** Remove de **Editar** os campos que a Spec 01 já oferece em **Configurações**. O card, a página pública e o status da confirmação passam a refletir título, detalhes, data, horário e local vindos só desse diálogo. A tela de criar evento não muda de campos nem de regras.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento já criado, quando a pessoa abre **Editar**, então vê título, detalhes, data, horário e local, e não vê capacidade, layout, imagem nem janela.
  - Dado um título só com espaços, quando a pessoa salva, então nada é gravado e o campo pede o título.
  - Dado uma data nova anterior a hoje, diferente da data já salva, quando a pessoa salva, então a data é recusada com **A data não pode estar no passado.**
  - Dado a data já salva no passado, quando a pessoa salva título, detalhes, horário e local sem trocar a data, então esses dados são gravados e a data permanece.
  - Dado uma janela já salva, quando a pessoa escolhe uma data de evento que torna essa janela inválida, então nada é gravado, nem título nem local, e a mensagem orienta a ajustar ou limpar a janela em **Configurações**.
  - Dado uma data nova compatível com a janela, quando **Editar** salva, então a data muda, a janela permanece, e o selo e a frase acompanham a reavaliação, sem ligar de novo uma confirmação encerrada manualmente.
  - Dado layout, imagem, capacidade, trecho e tema já salvos, quando **Editar** salva com sucesso, então esses itens permanecem iguais.
  - Dado a tela de criar evento, quando a pessoa a abre, então capacidade, layout, imagem e janela continuam no formulário, junto com título, detalhes, data, horário e local.
  - Dado uma pessoa sem acesso, quando tenta salvar **Editar**, então nada muda e ela recebe a mensagem de falta de acesso.
- **Definição de pronto:** **Editar** na ficha só trata dos cinco dados da ocasião, sem apagar o que vive em **Configurações**. A criação continua completa. Uma data incompatível com a janela é recusada com orientação clara, sem limpar a janela sozinha.
- **Dependências:** Spec 01 — **Configurações** já precisa existir, para a pessoa não perder layout, imagem, capacidade e janela quando eles saírem de **Editar**, e para a orientação da data inválida ter para onde apontar.
- **Fora do escopo desta spec:** Mudar o conteúdo do diálogo de **Configurações**. Mudar **Personalizar**. Mudar copiar, visualizar, selo ou frase, além de refletirem a data e os textos salvos aqui. Incluir encerrar, reativar ou trecho de volta em **Editar**.

## 14. Ordem recomendada de implementação

1. Spec 01 — Diálogo de Configurações e o que sai do card
2. Spec 02 — Editar só título, detalhes, data, horário e local

A Spec 01 vem antes para o organizador não ficar sem onde alterar layout, imagem, capacidade e janela. A Spec 02 só retira esses campos de **Editar** quando **Configurações** já os oferece. Fazer as duas completa a separação. Parar na Spec 01 deixa os mesmos campos nos dois lugares; isso não é o resultado desta feature.
