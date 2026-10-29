# PRD — Área de Convidados do evento

> Tipo: PRD de feature · Data: 2026-10-29
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

Na ficha de um evento já criado, no painel, o organizador passa a abrir uma área **Convidados** pelo menu lateral do evento.

Essa área é a gestão dos convidados. A lista **Gestão de Convidados**, que hoje fica na ficha, sai de lá e passa a ser o conteúdo dessa área.

A listagem continua sendo a dos convidados que confirmaram presença: nome completo, data da confirmação, busca por nome e ações de editar e remover. A página mostra no máximo 10 convidados. O nome aparece inteiro. Quando a linha não cabe na largura, a listagem rola para o lado.

O controle de editar deixa de ser a palavra **Editar** e passa a ser um ícone de lápis. O controle de remover troca o ícone de lixeira pelo ícone **circle-x**. As duas ações continuam as mesmas.

## 2. Problema que resolve

A gestão dos convidados está na ficha, abaixo do card e das métricas, misturada com organizadores e com a exclusão do evento. O menu lateral já mostra **Convidados**, mas acionar esse item não abre lugar nenhum.

Quem administra o evento precisa de uma área só para a lista, no mesmo menu em que **Configurações** já abre a página dela.

## 3. Público-alvo

O **organizador** autenticado que já pode abrir a ficha daquele evento. É a mesma pessoa que hoje vê a lista **Gestão de Convidados** nessa ficha.

O convidado da página pública não vê essa área. Quem não tem acesso ao evento também não vê.

## 4. Objetivo do recorte atual

1. Fazer **Convidados**, no menu lateral do evento, abrir a área de gestão dos convidados daquele evento.
2. Tirar a lista **Gestão de Convidados** da ficha e mostrá-la nessa área.
3. Manter na ficha o card, as métricas, os organizadores e a exclusão do evento.
4. Manter a listagem reconhecível: só confirmados, colunas, busca, ações, estados vazios e paginação, com no máximo 10 convidados por página.
5. Mostrar o nome inteiro e, quando a linha não couber, rolar a listagem para o lado.
6. Trocar o controle **Editar** pelo ícone de lápis e o ícone de lixeira pelo **circle-x**, sem mudar o que cada um faz.

## 5. Funcionalidades

**Essenciais:**

- **Convidados** no menu lateral abre a área de convidados daquele evento, com o menu reduzido ou expandido.
- Nessa área, **Convidados** é a área atual do menu.
- A lista **Gestão de Convidados** deixa de aparecer na ficha e aparece na área.
- A ficha continua com o card do evento, as métricas, os organizadores e, para quem já pode, a exclusão do evento.
- A lista mostra os convidados que confirmaram presença, do mais recente para o mais antigo.
- Busca por nome, colunas, ícone verde de confirmação ao lado do nome, data da confirmação e ações continuam.
- No máximo 10 convidados por página, com os controles de página já usados.
- Nome completo, numa linha só, sem cortar com reticências.
- Rolagem horizontal da listagem quando a linha não cabe; o menu lateral permanece no lugar.
- Lápis edita o nome na própria linha. **circle-x** pede confirmação e remove o convidado.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Levar para a área de convidados o card, as métricas, os organizadores ou a exclusão do evento.
- Incluir convidado à mão, importar lista, exportar, reenviar convite ou criar outro status além de confirmado.
- Mudar a página pública de confirmação.
- Mudar o que a edição e a remoção já fazem, o texto do diálogo de remoção, as colunas, a busca ou os estados vazios.
- Cortar o nome com reticências ou quebrar o nome em várias linhas para evitar a rolagem.
- Trocar o formato da paginação. Só muda a quantidade máxima por página, de 5 para 10.
- Mudar o funcionamento de reduzir e expandir o menu, ou acrescentar outra área ao menu.
- Gravar a página da lista, o texto da busca ou a rolagem para a próxima visita.

## 7. Regras de negócio

- Regra 1: A área de convidados existe para o evento que a pessoa já pode abrir. Quem não tem acesso a esse evento não vê a área. O resultado de abrir a área sem acesso é o mesmo de abrir a ficha sem acesso.
- Regra 2: **Convidados** passa a ser um destino do menu, nos dois estados, reduzido e expandido. Acioná-lo abre a área daquele evento. Na área, esse item é a área atual. Na ficha e em **Configurações**, **Convidados** não é a área atual.
- Regra 3: **Configurações** continua abrindo a página de configurações e só é a área atual nessa página.
- Regra 4: A ficha deixa de mostrar a lista **Gestão de Convidados**. Continuam nela, nesta ordem, o card do evento, as métricas, os organizadores e a exclusão, esta só para quem já pode excluir. Não fica um espaço vazio no lugar da lista.
- Regra 5: A área de convidados mostra a lista, não as métricas, não os organizadores e não a exclusão. O menu lateral do evento continua ao lado do conteúdo. **Suposição:** o caminho segue o de **Configurações**: **Meus Eventos / {título do evento} / Convidados**. O título do evento nesse caminho volta para a ficha.
- Regra 6: A lista é só de quem confirmou presença naquele evento. A ordem é a já usada: confirmação mais recente primeiro. Cada linha mostra o nome completo, a data e a hora da confirmação no formato já usado, e as ações.
- Regra 7: Fora da edição, o nome completo aparece numa linha só, com o ícone verde de pessoa confirmada ao lado, como já está. O nome não é cortado com reticências e não quebra em outra linha.
- Regra 8: Quando a linha é mais larga que o espaço ao lado do menu, a listagem rola para o lado. Nome, data, ações e o cabeçalho dessas colunas rolam juntos. O menu lateral, o caminho e o cabeçalho do painel permanecem no lugar.
- Regra 9: A busca por nome continua parcial e sem diferenciar maiúsculas de minúsculas. Ela só aparece quando existe ao menos uma confirmação. Mudar o texto da busca volta para a primeira página. A paginação vale sobre o resultado da busca. O texto de quantidade da página usa esse resultado. A frase de quantas pessoas confirmaram usa o total do evento, não o resultado da busca.
- Regra 10: Cada página mostra no máximo 10 convidados. Com 10 ou menos no resultado, há uma página só. **Anterior** fica indisponível na primeira página. **Próximo** fica indisponível na última. Os números de página continuam como já estão.
- Regra 11: O lápis coloca a linha em edição. A edição continua na própria linha: campo com o nome atual, **Salvar** e **Cancelar**. Durante a edição, o lápis, o **circle-x** e o ícone verde somem. **Cancelar** devolve o nome que estava na lista e sai da edição. **Salvar** com nome vazio ou só com espaços não grava; a linha continua em edição e aparece o aviso de falha já usado. **Salvar** aceito grava o nome, sai da edição, atualiza a lista e mostra o aviso de sucesso já usado.
- Regra 12: O **circle-x** abre o mesmo pedido de confirmação já usado: o título **Remover esta confirmação?**, o texto de que aquela pessoa sai da lista e o total diminui em 1, e os botões **Cancelar** e **Remover**. **Cancelar** fecha o pedido e mantém o convidado. **Remover** aceito tira a confirmação da lista e o total diminui. A falha mantém o convidado e mostra o aviso de falha já usado.
- Regra 13: Depois de renomear ou remover, as métricas da ficha passam a refletir o total novo quando a ficha é exibida de novo.
- Regra 14: Se as presenças não puderem ser obtidas, a ficha mostra o aviso **Presenças indisponíveis** no lugar das métricas, e a área de convidados mostra esse mesmo aviso no lugar da lista. Organizadores e exclusão continuam na ficha. Quando as presenças carregam, as métricas voltam para a ficha e a lista volta para a área.

## 8. Fluxos principais

### Fluxo 1 — Abrir a área de convidados

1. O organizador abre a ficha do evento.
2. Vê o card, as métricas, os organizadores e, se puder, a exclusão. Não vê a lista **Gestão de Convidados**.
3. Aciona **Convidados** no menu lateral.
4. Entra na área daquele evento, com **Convidados** marcado como área atual.
5. Vê a lista **Gestão de Convidados**.

### Fluxo 2 — Consultar, buscar e mudar de página

1. Na área, vê os confirmados, no máximo 10 por página, do mais recente para o mais antigo.
2. Busca por parte do nome.
3. A lista mostra só os nomes que combinam e volta para a primeira página.
4. Se houver mais de 10 no resultado, usa **Próximo**, **Anterior** ou o número da página para ver o restante.
5. Se o nome não couber na largura, rola a listagem para o lado e lê o nome inteiro, a data e as ações.

### Fluxo 3 — Editar o nome

1. Aciona o lápis na linha.
2. Altera o nome e aciona **Salvar**.
3. A linha volta a mostrar o nome novo, com o ícone verde, o lápis e o **circle-x**.
4. Se acionar **Cancelar**, o nome anterior volta e nada é gravado.

### Fluxo 4 — Remover um convidado

1. Aciona o **circle-x** na linha.
2. Lê o pedido de confirmação.
3. Aciona **Remover**.
4. A pessoa sai da lista e o total de confirmados diminui.
5. Se acionar **Cancelar**, a pessoa continua na lista.

### Fluxo 5 — Voltar para a ficha

1. Na área de convidados, aciona o título do evento no caminho, ou sai pelo fluxo já usado para voltar à ficha.
2. Vê a ficha sem a lista.
3. As métricas mostram o total já atualizado, se houve remoção ou se chegou confirmação nova.

## 9. Critérios de aceite

- O usuário consegue abrir a área de convidados pelo item **Convidados** do menu lateral, com o menu reduzido ou expandido.
- O sistema deve marcar **Convidados** como área atual só nessa área.
- O sistema deve deixar de mostrar **Gestão de Convidados** na ficha e deve continuar mostrando lá o card, as métricas, os organizadores e a exclusão de quem já pode excluir.
- O usuário consegue ver na área todos os convidados confirmados daquele evento, em páginas de no máximo 10, com busca por nome.
- O sistema deve mostrar o nome inteiro, sem reticências, e deve permitir rolar a listagem para o lado quando a linha não couber, sem levar o menu lateral junto.
- O usuário consegue editar o nome pelo lápis e remover o convidado pelo **circle-x**, com o mesmo resultado que **Editar** e a lixeira têm hoje.
- O sistema não deve aceitar nome vazio e não deve remover o convidado se a pessoa cancelar o pedido.
- Quando as presenças não puderem ser obtidas, o sistema deve mostrar **Presenças indisponíveis** no lugar das métricas na ficha e no lugar da lista na área.
- Quem não tem acesso ao evento não consegue ver a área.

## 10. Stack

A stack já usada no painel do evento: Next.js, TypeScript, Tailwind, componentes de interface já adotados no painel, ícones já adotados no painel e Supabase para autenticação e para os dados do evento e das confirmações.

Nenhuma biblioteca nova.

## 11. Justificativa da stack

A área entra no painel do evento que já existe, ao lado de **Configurações**, e reaproveita a lista, o acesso e os ícones que o projeto já tem. Não há motivo para acrescentar serviço, banco ou biblioteca.

## 12. Fases de construção

### Fase 1 — Área de Convidados

Objetivo: o organizador entra em **Convidados** pelo menu, encontra lá a gestão dos confirmados e deixa de encontrá-la na ficha.

Specs:

- Spec 01 — Entrar na área e tirar a lista da ficha
- Spec 02 — Listagem na área

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Entrar na área e tirar a lista da ficha

- **Fase:** Fase 1 — Área de Convidados
- **Objetivo (o quê):** **Convidados** no menu lateral abre a área de gestão daquele evento, e a lista **Gestão de Convidados** sai da ficha e passa a ser o conteúdo dessa área.
- **Intenção (por quê):** O menu já reserva o lugar de **Convidados**, mas ele ainda não leva a lugar nenhum. A lista não deve continuar solta na ficha, misturada com métricas, organizadores e exclusão. A pessoa precisa achar a gestão sempre pelo mesmo menu em que já acha **Configurações**.
- **Contexto:** A ficha do evento já mostra o caminho **Meus Eventos / {título}**, o menu lateral com **Convidados** e **Configurações**, o card, as métricas de confirmados, a lista **Gestão de Convidados**, os organizadores e, para quem pode, a exclusão. **Configurações** já abre a página de configurações daquele evento e, só nela, fica marcada como área atual. O caminho dessa página é **Meus Eventos / {título} / Configurações**, e o título volta para a ficha. Hoje **Convidados** aparece no menu reduzido e no expandido, mas não é destino: acioná-lo não muda de página e não o marca como área atual. A forma da lista em si está na Spec 02. Até a Spec 02, a lista que muda de lugar é a que já existe na ficha.
- **Atores:** Organizador autenticado com acesso ao evento. Quem não tem acesso não entra.
- **Descrição do comportamento:** Acionar **Convidados**, com o menu expandido ou reduzido, abre a área de convidados daquele evento. O menu lateral continua ao lado do conteúdo, com o mesmo reduzir e expandir já usados. Nessa área, **Convidados** é a área atual nos dois estados do menu. Na ficha e na página de configurações, **Convidados** deixa de ser apenas uma referência e passa a ser o destino, mas não fica marcado como atual. **Configurações** não muda de destino nem de quando fica atual. A ficha deixa de renderizar a lista. A ordem do que resta é card, métricas, organizadores e exclusão. A área de convidados mostra a lista e não mostra card, métricas, organizadores nem exclusão. **Suposição:** o caminho da área é **Meus Eventos / {título do evento} / Convidados**, no mesmo formato de **Configurações**, e o título do evento volta para a ficha. Abrir o evento continua caindo na ficha, não na área de convidados. Se as presenças não puderem ser obtidas, a ficha mostra o aviso **Presenças indisponíveis** no lugar das métricas; organizadores e exclusão continuam. O mesmo aviso, na área, fica no lugar da lista. Quem não tem acesso ao evento recebe o mesmo resultado de abrir a ficha sem acesso.
- **Entradas e saídas:** A entrada é o evento já aberto por quem tem acesso, e o acionamento de **Convidados**. A saída é a área com a lista da Spec 02, o item **Convidados** marcado como atual, e a ficha sem essa lista. Sem acesso, não há área.
- **Dados/entidades envolvidos (conceitual):** O evento identificado na ficha, com título e com as confirmações de presença já ligadas a ele. Cada confirmação tem a pessoa e o momento em que confirmou. As métricas da ficha continuam usando o total de confirmados e o total das últimas 24 horas. A lista usa os mesmos confirmados.
- **Estados e transições:** O item **Convidados** passa a ter estado de área atual, só enquanto a pessoa está na área. Ao ir para a ficha ou para **Configurações**, deixa de ser a área atual. O menu continua com os estados reduzido e expandido já existentes; esta spec não muda a regra de qual estado vale ao entrar. A ficha passa do estado “com a lista abaixo das métricas” para o estado “sem a lista”.
- **Regras de negócio:** Regras 1, 2, 3, 4, 5 e 14.
- **Validações:** Só entra quem já pode abrir a ficha daquele evento. Identificador de evento inválido ou evento inexistente tem o mesmo resultado que a ficha já tem nesses casos. Não há formulário novo nesta spec.
- **Fluxo do usuário (passo a passo):**
  1. Abre a ficha e vê card, métricas, organizadores e, se puder, exclusão, sem a lista.
  2. Aciona **Convidados** no menu.
  3. Vê a área, com o menu ao lado e **Convidados** como área atual.
  4. Vê a lista **Gestão de Convidados**.
  5. Aciona **Configurações** e vai para as configurações, onde **Configurações** é a área atual e **Convidados** não é.
  6. Aciona **Convidados** de novo e volta para a área.
  7. Volta à ficha pelo título do evento no caminho e não encontra a lista.
- **Casos de borda e erros:**
  - Menu reduzido: **Convidados** continua anunciado com esse nome e abre a área.
  - Já está na área e aciona **Convidados** de novo: permanece na área, com o item atual.
  - Presenças indisponíveis: a ficha mostra **Presenças indisponíveis** no lugar das métricas; a área mostra o mesmo aviso no lugar da lista. Organizadores e exclusão não somem da ficha.
  - Sem acesso, evento inexistente ou identificador inválido: o mesmo resultado da ficha nesses casos. A área não mostra confirmações de outro evento.
  - Evento sem confirmações: a ficha segue sem a lista e com as métricas zeradas, como o total já faz hoje; o estado vazio da lista fica na área e está na Spec 02.
- **Impacto no existente:** **Convidados** deixa de ser só referência no menu e passa a abrir a área. A lista sai da ficha. Card, métricas, organizadores, exclusão, página de configurações, reduzir e expandir o menu, cabeçalho do painel e página pública permanecem. O aviso de presenças indisponíveis, que hoje substitui métricas e lista juntas na ficha, passa a substituir as métricas na ficha e a lista na área.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um organizador com acesso ao evento, quando ele aciona **Convidados** no menu expandido ou reduzido, então abre a área daquele evento e **Convidados** fica marcado como área atual.
  - Dado a ficha do evento, quando ela é exibida, então a lista **Gestão de Convidados** não aparece, e o card, as métricas, os organizadores e a exclusão de quem pode excluir continuam.
  - Dado a área de convidados, quando ela é exibida, então a lista **Gestão de Convidados** aparece lá, e card, métricas, organizadores e exclusão não aparecem nessa área.
  - Dado a página de configurações, quando ela é exibida, então **Configurações** é a área atual e **Convidados** abre a área de convidados sem estar atual.
  - Dado que as presenças não puderam ser obtidas, quando a ficha e a área são exibidas, então as duas mostram **Presenças indisponíveis** no lugar das métricas e da lista, respectivamente.
  - Dado alguém sem acesso ao evento, quando tenta abrir a área, então o resultado é o mesmo de abrir a ficha sem acesso.
- **Definição de pronto:** Pelo menu, a pessoa entra na área de convidados daquele evento, vê a lista lá, vê **Convidados** como área atual, e a ficha segue útil sem essa lista. O caso sem acesso e o caso de presenças indisponíveis estão verificáveis.
- **Dependências:** Nenhuma para o menu e para a retirada da lista da ficha. A forma final da listagem, página de 10, nome inteiro, rolagem, lápis e **circle-x** é a Spec 02. Esta spec pode levar a lista como ela está hoje; a Spec 02 aplica os ajustes em cima da lista já na área.
- **Fora do escopo desta spec:** Mudar colunas, busca, texto dos vazios, quantidade por página, ícones de editar e remover, ou a rolagem horizontal. Isso é a Spec 02. Também ficam de fora levar organizadores, métricas ou exclusão para a área, e mudar configurações ou a página pública.

### Spec 02 — Listagem na área

- **Fase:** Fase 1 — Área de Convidados
- **Objetivo (o quê):** A lista **Gestão de Convidados**, já na área de convidados, continua reconhecível e passa a mostrar no máximo 10 por página, o nome inteiro com rolagem para o lado, o lápis para editar e o **circle-x** para remover.
- **Intenção (por quê):** Mudar a lista de lugar não pode fazer a pessoa perder o que já sabe fazer nela. Os ajustes servem para caber melhor na largura, reconhecer o nome por completo e trocar os controles por ícones, sem inventar outro tipo de gestão.
- **Contexto:** A lista hoje fica na ficha e a Spec 01 a coloca na área de convidados. Hoje ela tem o título **Gestão de Convidados**, a frase de quantas pessoas confirmaram, a busca **Buscar por nome...**, as colunas **Nome do convidado**, **Confirmação em** e **Ações**, o ícone verde de pessoa confirmada ao lado do nome, a data e a hora no formato já usado, a palavra **Editar**, o ícone de lixeira com o nome anunciado **Remover**, e a paginação com **Anterior**, os números e **Próximo**. O máximo atual é 5 por página. O texto da página é **Exibindo {quantidade desta página} de {quantidade do resultado} convidados confirmados**. Sem confirmações, o vazio é **Nenhuma confirmação ainda**, com a explicação de que as confirmações da página pública aparecem ali. Busca sem resultado: **Nenhum nome encontrado**, com a orientação para ajustar a busca. A edição é na linha, com **Salvar** e **Cancelar**. A remoção pede confirmação antes de tirar a pessoa e diminuir o total em 1.
- **Atores:** O mesmo organizador da Spec 01, dentro da área de convidados.
- **Descrição do comportamento:** A lista na área mantém título, frase de total, busca, colunas, ícone verde, data, vazios e o pedido de confirmação da remoção. Cada página passa a ter no máximo 10 convidados do resultado atual. O nome é o nome completo, numa linha só, sem reticências e sem quebra de linha. Se a linha ultrapassa a largura ao lado do menu, a listagem rola na horizontal, cabeçalho junto com as linhas, e o menu não rola. O controle de editar mostra só o lápis e continua anunciado como **Editar**. O controle de remover mostra só o **circle-x** e continua anunciado como **Remover**. O lápis abre a edição na linha. **Salvar** e **Cancelar** continuam escritos. O **circle-x** abre o pedido já existente. Sucesso e falha de salvar e de remover continuam com os avisos já usados. Remover com sucesso tira a pessoa da lista e diminui o total. As métricas da ficha, quando vistas de novo, acompanham esse total.
- **Entradas e saídas:** Entradas: texto da busca, página pedida, nome novo no **Salvar**, confirmação ou cancelamento da remoção. Saídas: a página de até 10 linhas, o nome inteiro visível pela rolagem, a linha em edição ou de volta à leitura, e a lista atualizada depois de salvar ou remover. Busca sem resultado e lista sem confirmações mostram os vazios já existentes, sem tabela e sem paginação.
- **Dados/entidades envolvidos (conceitual):** Confirmação de presença do evento: nome completo da pessoa e momento da confirmação. O total de confirmados do evento alimenta a frase da lista e as métricas da ficha. A busca não cria outro conjunto: só esconde, na hora, quem não combina com o texto.
- **Estados e transições:** A linha está em leitura ou em edição. Leitura mostra nome inteiro, ícone verde, data, lápis e **circle-x**. Edição mostra o campo, **Salvar** e **Cancelar**. **Salvar** aceito volta para leitura com o nome novo. **Cancelar** volta para leitura com o nome anterior. Remoção confirmada tira a linha. Se a página atual ficar vazia porque o resultado diminuiu, a lista mostra a última página que ainda tem itens. Mudar a busca volta para a página 1. Não há estado novo de convidado.
- **Regras de negócio:** Regras 6, 7, 8, 9, 10, 11, 12 e 13.
- **Validações:** A busca aceita texto vazio e volta a mostrar todos os confirmados. O nome salvo não pode ser vazio nem só espaços; nesse caso nada é gravado e a edição continua. A remoção só acontece depois de **Remover** no pedido. Não é possível editar ou remover confirmação de outro evento, nem agir sem acesso ao evento: a falha mostra o aviso já usado e a lista não muda.
- **Fluxo do usuário (passo a passo):**
  1. Abre a área e vê até 10 confirmados, nome completo e data.
  2. Se a linha não couber, rola a listagem para o lado até ver a data e os ícones.
  3. Busca um nome e, se houver mais de 10 resultados, muda de página.
  4. Aciona o lápis, altera o nome e salva, ou cancela.
  5. Aciona o **circle-x**, confirma a remoção ou cancela.
- **Casos de borda e erros:**
  - Nome curto ou largo: os dois aparecem inteiros. O largo não vira reticências. A rolagem só é necessária quando a linha não cabe.
  - Exatamente 10 resultados: uma página, **Próximo** indisponível.
  - 11 resultados: a segunda página tem 1 convidado.
  - Busca que não acha ninguém: **Nenhum nome encontrado**, sem paginação.
  - Nenhuma confirmação no evento: **Nenhuma confirmação ainda**, sem busca e sem paginação.
  - Nome vazio no **Salvar**: a linha segue em edição, o nome anterior continua o gravado, e aparece o aviso de falha já usado na edição.
  - **Cancelar** a edição ou o pedido de remoção: nada muda na lista.
  - Falha ao salvar ou ao remover: a lista permanece e aparece o aviso de falha já usado.
  - Remover o último da página atual: a pessoa some e a lista mostra a página anterior, se ela existir.
  - Durante a edição de uma linha, as outras continuam com lápis e **circle-x**.
- **Impacto no existente:** A lista deixa de ter no máximo 5 por página e passa a ter no máximo 10. A palavra **Editar** vira o ícone de lápis. A lixeira vira o **circle-x**. O nome deixa de poder ser cortado pela largura: a listagem rola. Título, frase de total, busca, colunas, ícone verde, formato da data, vazios, textos do pedido de remoção e o efeito de salvar e remover permanecem. A ficha não volta a mostrar a lista.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado 11 convidados confirmados, quando a área é exibida, então a primeira página mostra 10 e a segunda mostra 1.
  - Dado um nome maior que a largura disponível, quando a lista é exibida, então o nome aparece inteiro, sem reticências, e a pessoa rola a listagem para o lado até ver a data e as ações, com o menu lateral ainda no lugar.
  - Dado a linha em leitura, quando a pessoa olha as ações, então vê o lápis anunciado como **Editar** e o **circle-x** anunciado como **Remover**, e não vê a palavra **Editar** nem a lixeira.
  - Dado a linha em edição, quando a pessoa salva um nome não vazio, então a lista passa a mostrar esse nome e o aviso de sucesso já usado aparece.
  - Dado a linha em edição, quando a pessoa salva um nome vazio ou cancela, então o nome gravado não muda.
  - Dado o pedido de remoção aberto, quando a pessoa confirma, então o convidado sai da lista e o total diminui em 1. Quando cancela, então ele permanece.
  - Dado uma busca sem resultado, quando a lista atualiza, então aparece **Nenhum nome encontrado** e não aparece paginação.
- **Definição de pronto:** Na área, a lista segue utilizável como hoje, com páginas de até 10, nome inteiro, rolagem horizontal quando preciso, lápis e **circle-x** no lugar dos controles antigos, e editar e remover com o mesmo resultado de antes.
- **Dependências:** Spec 01 — a lista precisa estar na área de convidados, e a ficha não deve mais exibi-la.
- **Fora do escopo desta spec:** Criar o destino do menu, o caminho e a retirada da lista da ficha. Isso é a Spec 01. Também ficam de fora incluir convidado, exportar, mudar o diálogo de remoção, mudar a página pública e redesenhar a paginação além do máximo de 10.

## 14. Ordem recomendada de implementação

1. Spec 01 — Entrar na área e tirar a lista da ficha
2. Spec 02 — Listagem na área

A Spec 01 cria o lugar e tira a lista da ficha. A Spec 02 ajusta essa lista já no lugar certo. Fazer a Spec 02 antes deixaria os ícones, a página de 10 e a rolagem numa lista que ainda estaria na ficha, o que este recorte não quer.
