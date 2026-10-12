# PRD — Capacidade máxima de convidados

> Tipo: PRD de feature · Data: 2026-10-12
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

O organizador pode definir, ao criar ou editar um evento, quantos convidados aquele evento aceita no máximo. O campo é opcional. Sem número, o evento continua sem limite, como hoje.

Quando há capacidade, o card em **Meus Eventos** mostra o total de confirmados junto com esse teto, no texto **12 confirmados de 50**. Na página pública, com a confirmação aberta e o total já na capacidade ou acima dela, o convidado não vê o formulário: vê só a mensagem de convites esgotados. Se a última vaga acaba no instante do envio, o nome não é gravado e a mesma mensagem aparece.

A confirmação encerrada por prazo, pelo dia do evento ou pelo organizador continua mostrando **Confirmação indisponível**, mesmo que as vagas também tenham acabado.

## 2. Problema que resolve

Hoje cada envio válido na página pública vira uma confirmação, sem teto. O organizador não tem como dizer “este evento cabe até N pessoas”. A lista **Meus Eventos** mostra quantos confirmaram, mas não mostra até quanto o evento foi planejado. O convidado consegue confirmar mesmo depois que o organizador já considera o evento cheio.

Esta feature deixa o organizador registrar esse teto, enxergar o ocupado e o máximo na lista, e impede nova confirmação quando o teto é atingido.

## 3. Público-alvo

- **Organizador** — única conta do painel. Informa a capacidade na criação e na edição, e lê o ocupado e o máximo no card de **Meus Eventos**.
- **Convidado** — usa só o link público do evento, sem login. Quando o evento está lotado e a confirmação está aberta, vê a mensagem de convites esgotados em vez do formulário.

## 4. Objetivo do recorte atual

Permitir um limite opcional de confirmações por evento, visível no card da lista, e impedir que a página pública aceite um nome novo quando esse limite já foi atingido.

## 5. Funcionalidades

**Essenciais:**

- Campo opcional de capacidade máxima na criação e na edição do evento.
- Vazio significa sem limite. Número inteiro a partir de 1 define o teto.
- Permitir salvar um teto menor do que os já confirmados, sem apagar nomes.
- No card de **Meus Eventos**, quando há capacidade, trocar a linha de confirmados para **N confirmados de C**, mantendo o singular só quando o total é 1.
- Sem capacidade, o card continua com o texto atual: **0 confirmados**, **1 confirmado** ou **N confirmados**.
- Com a confirmação aberta e o total maior ou igual à capacidade, abrir o link público mostra só a mensagem de convites esgotados, sem formulário e sem a ficha do evento.
- Se o envio acontece quando já não há vaga, o nome não é gravado e o convidado vê a mesma mensagem.
- Voltar a aceitar confirmação assim que o total ficar abaixo da capacidade, desde que a confirmação esteja aberta. Isso vale ao aumentar o teto, ao esvaziar o campo ou ao remover uma confirmação.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mostrar a capacidade nas métricas da página do evento no painel (**Total de confirmados** e **Últimas 24 horas**). O organizador vê o teto no formulário de edição e no card da lista.
- Lista de espera, reserva de vaga sem nome e aviso automático ao organizador quando o evento lota.
- O convidado cancelar ou editar a própria presença.
- Acompanhantes, limite por pessoa ou qualquer contagem diferente de “uma confirmação = uma pessoa”.
- Alterar o botão de prévia no editor visual do evento. Aquele botão não confirma presença.
- Trocar **Confirmação indisponível** pela mensagem de esgotado quando a confirmação está encerrada.
- Impedir o organizador de apagar uma confirmação. Apagar continua permitido e, se o total cair abaixo da capacidade, libera vaga.
- Teto artificial além de “inteiro maior ou igual a 1”. Não há máximo extra neste recorte.
- Atualizar o card ou a página pública sozinhos, sem o organizador ou o convidado recarregar a tela.

## 7. Regras de negócio

- Regra 1: A capacidade é opcional. Campo vazio, ou só com espaços, significa que o evento não tem limite. O valor salvo, quando existe, é um número inteiro maior ou igual a 1.
- Regra 2: Zero, número negativo, decimal, texto e qualquer valor que não seja um inteiro a partir de 1 são recusados. O evento não é salvo com esse valor.
- Regra 3: Cada confirmação daquele evento conta uma pessoa, a mesma conta já usada em **Total de confirmados**. Nomes iguais continuam sendo confirmações distintas. Editar o nome de uma confirmação não muda o total.
- Regra 4: A página pública aceita um nome novo somente quando a confirmação daquele evento está aberta e, além disso, o evento não tem limite ou o total de confirmados é menor que a capacidade.
- Regra 5: Com a confirmação aberta e o total maior ou igual à capacidade, o link público não mostra o formulário. Mostra somente: **Convites esgotados para o evento {título do evento}. Agradecemos pelo seu interesse.** O título entra no lugar de `{título do evento}`, como foi salvo, sem rótulo extra.
- Regra 6: Se a confirmação está encerrada — prazo ainda não iniciado, prazo já terminado, dia do evento já alcançado ou encerramento feito pelo organizador — a página pública continua como hoje, com **Confirmação indisponível** no lugar do formulário, e a ficha do evento continua visível. Isso vale mesmo que o total também tenha atingido a capacidade. A mensagem de convites esgotados não aparece nesse caso.
- Regra 7: Um envio que faria o total passar da capacidade não é gravado. O convidado vê a mensagem da Regra 5. Dois envios ao mesmo tempo para a última vaga: só um nome é gravado; o outro não entra e vê a mesma mensagem.
- Regra 8: O botão **confirmo** e o formulário voltam a aparecer quando a confirmação está aberta e o total fica abaixo da capacidade. Aumentar o número, esvaziar o campo ou remover uma confirmação produzem esse efeito. Deixar o número igual ao total não reabre.
- Regra 9: O organizador pode salvar uma capacidade menor do que o total já confirmado. As confirmações existentes permanecem. Enquanto o total não ficar abaixo desse novo número, não entra nome novo.
- Regra 10: Esvaziar o campo na edição remove o limite. A partir daí o evento volta a aceitar confirmações enquanto a confirmação estiver aberta, sem teto.
- Regra 11: No card, com capacidade definida e total conhecido, o texto é **1 confirmado de C** somente quando o total é 1. Com 0 ou com 2 ou mais, é **N confirmados de C**. C é a capacidade salva. A frase ocupa o lugar da linha verde de confirmados que o card já tem, e continua verde.
- Regra 12: Sem capacidade, o card não ganha “de C”. Mantém **1 confirmado** só quando o total é 1, e **N confirmados** quando o total é 0 ou maior que 1.
- Regra 13: Se a lista carregar e o total de um evento não puder ser obtido, esse card continua visível e informa que a quantidade não está disponível. Não mostra **0 confirmados** nem **de C** no lugar do número desconhecido.
- Regra 14: **Suposição.** Quando o clique ainda encontra vaga e o nome é gravado, o convidado vê o sucesso já existente de presença confirmada. Se essa confirmação fez o total atingir a capacidade, a frase que convida a confirmar outra pessoa não aparece. Um novo acesso ao link, enquanto o evento seguir lotado e a confirmação aberta, mostra a mensagem da Regra 5. Se ainda houver vaga depois do sucesso, a frase que convida a confirmar outra pessoa permanece.

## 8. Fluxos principais

### Fluxo 1 — Definir a capacidade ao criar

1. O organizador abre a criação de evento e preenche os dados que já são obrigatórios.
2. No campo opcional de capacidade, informa um inteiro a partir de 1, ou deixa vazio.
3. Salva o evento.
4. O evento passa a existir com aquele teto, ou sem limite se o campo ficou vazio.

### Fluxo 2 — Ajustar a capacidade de um evento existente

1. O organizador abre o evento e entra na edição.
2. Vê a capacidade já salva, ou o campo vazio se não houver limite.
3. Aumenta o número, diminui, ou apaga o valor.
4. Salva.
5. O teto novo passa a valer para a página pública e para o card. Os nomes já confirmados não são apagados nem alterados por essa edição.

### Fluxo 3 — Convidado encontra o evento lotado

1. O convidado abre o link do evento.
2. A confirmação está aberta e o total já é igual ou maior que a capacidade.
3. A tela mostra só a mensagem de convites esgotados, com o título do evento. Não há campo de nome nem botão **confirmo**.

### Fluxo 4 — A última vaga acaba no envio

1. O convidado está no formulário porque, ao abrir, ainda havia vaga.
2. Antes do envio, o total alcança a capacidade.
3. Ele envia o nome.
4. O nome não é gravado.
5. A tela passa a mostrar só a mensagem de convites esgotados.

### Fluxo 5 — A vaga volta a existir

1. O evento está lotado e a confirmação está aberta.
2. O organizador aumenta a capacidade para acima do total, esvazia o campo, ou remove uma confirmação até o total ficar abaixo do teto.
3. O convidado abre de novo o link.
4. Vê a página do evento com o formulário e o botão **confirmo**, como quando há vaga.

## 9. Critérios de aceite

- O organizador consegue criar e editar um evento sem informar capacidade, e esse evento continua aceitando confirmações enquanto a confirmação estiver aberta.
- O organizador consegue informar um inteiro a partir de 1 na criação e na edição.
- O sistema não deve salvar zero, negativo, decimal ou texto nesse campo.
- O sistema deve permitir uma capacidade menor do que os já confirmados, sem remover esses nomes.
- O usuário consegue ler, no card, **12 confirmados de 50** quando há capacidade e o total é 12, e **1 confirmado de 50** quando o total é 1.
- O sistema não deve acrescentar “de C” no card quando o evento não tem capacidade.
- Quando o total não puder ser obtido, o sistema não deve mostrar **0 confirmados** nem **de C**.
- Com a confirmação aberta e o total na capacidade ou acima, o convidado vê só a mensagem **Convites esgotados para o evento {título}. Agradecemos pelo seu interesse.**
- O sistema não deve gravar o nome enviado quando isso faria o total passar da capacidade.
- Quando o total fica abaixo da capacidade e a confirmação está aberta, o sistema deve voltar a mostrar o formulário.
- Quando a confirmação está encerrada, o sistema deve continuar em **Confirmação indisponível**, mesmo com o evento também lotado.
- Quando a confirmação que acabou de ser gravada atinge a capacidade, o sistema não deve convidar o convidado a confirmar outra pessoa.

## 10. Stack

A feature usa o que o Confirm Event já tem: Next.js, React, TypeScript, Tailwind, componentes de interface já adotados no painel, formulário com validação, e Supabase para autenticação do organizador e para os dados de evento e confirmação.

Não entra serviço novo de fila, e-mail, pagamento ou armazenamento.

## 11. Justificativa da stack

A capacidade é um dado a mais do evento que já é criado e editado no painel, e uma condição a mais na confirmação pública que já existe. Reaproveitar esse fluxo evita um canal paralelo para o mesmo limite. A validação do número fica no mesmo lugar em que título, data, horário, local e janela de confirmação já são validados.

## 12. Fases de construção

### Fase 1 — Limite opcional de convidados

Objetivo: o organizador registra o teto, vê o ocupado e o máximo na lista, e a página pública deixa de aceitar nome novo quando o teto é atingido.
Specs:

- Spec 01 — Informar a capacidade na criação e na edição
- Spec 02 — Mostrar a capacidade no card de Meus Eventos
- Spec 03 — Recusar confirmação quando a capacidade é atingida

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Informar a capacidade na criação e na edição

- **Fase:** Fase 1 — Limite opcional de convidados
- **Objetivo (o quê):** O organizador informa, ou remove, a capacidade máxima de convidados ao criar um evento e ao editar um evento existente.
- **Intenção (por quê):** Sem este dado salvo, a lista não tem o que mostrar ao lado dos confirmados e a página pública não tem teto para respeitar. O campo é opcional para não obrigar um limite em evento que não precisa disso.
- **Contexto:** Criar evento e editar evento já pedem título, detalhes opcionais, data, horário, local, layout da página e janela de confirmação opcional. A data do evento não pode ser anterior ao dia corrente, com a exceção já existente de manter a data atual quando ela já passou. Esta spec acrescenta um campo opcional a esses dois formulários e faz o valor acompanhar o evento. Não altera o link público nem o card.
- **Atores:** Organizador autenticado, na criação de evento e na edição de um evento dele.
- **Descrição do comportamento:** Os dois formulários ganham o campo **Capacidade máxima de convidados (opcional)**. Na criação, ele começa vazio. Na edição, mostra o inteiro salvo ou fica vazio se o evento não tem limite. O organizador pode preencher um inteiro a partir de 1, corrigir o número ou apagar o conteúdo. Ao salvar com valor válido, aquele número passa a ser a capacidade do evento. Ao salvar com o campo vazio, o evento fica sem limite. Salvar não cria, não edita e não apaga confirmações. Um número menor do que os já confirmados é aceito. As demais regras de salvamento do evento continuam valendo: esta spec não relaxa título, data, horário, local nem janela.
- **Entradas e saídas:** Entra o que o organizador digita no campo, mais os outros dados do evento que o formulário já envia. Sai o evento salvo com capacidade inteira maior ou igual a 1, ou sem capacidade. Se o valor for inválido, o evento não muda e o campo mostra o erro. Na edição, a saída também inclui o valor anterior reapresentado quando o organizador reabre o formulário.
- **Dados/entidades envolvidos (conceitual):** O evento passa a ter uma capacidade máxima opcional: ou um inteiro maior ou igual a 1, ou a ausência de limite. Confirmações existentes não fazem parte do que este campo grava; só servem para deixar claro que um teto menor do que o total não as remove.
- **Estados e transições:** Sem limite: campo vazio no formulário e nenhuma capacidade salva. Com limite: inteiro maior ou igual a 1 salvo no evento. De sem limite para com limite: o organizador informa um inteiro válido e salva. De com limite para outro número: substitui e salva. De com limite para sem limite: esvazia o campo e salva. Valor inválido: permanece no estado anterior, porque o salvamento não ocorre.
- **Regras de negócio:** Regras 1, 2, 9 e 10 da seção 7.
- **Validações:** Vazio ou só espaços é válido e significa sem limite. Inteiro maior ou igual a 1 é válido. Zero, negativo, decimal (com ponto ou vírgula), texto e mistura de número com texto são inválidos, com a mensagem **Informe um número inteiro a partir de 1**. O restante do formulário continua com as validações que já tem. Capacidade menor do que o total confirmado não é erro.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a criação ou a edição.
  2. Localiza **Capacidade máxima de convidados (opcional)**.
  3. Deixa vazio, informa um inteiro a partir de 1, ou, na edição, apaga o número que estava lá.
  4. Salva.
  5. Com valor válido ou campo vazio, o evento guarda essa escolha. Com valor inválido, vê o erro no campo e o evento permanece como estava.
- **Casos de borda e erros:**
  - Campo vazio na criação: evento criado sem limite.
  - Campo vazio na edição de um evento que tinha limite: o limite é removido.
  - “0”, “-1”, “1,5”, “1.5”, “dez” ou “10 pessoas”: não salva e mostra **Informe um número inteiro a partir de 1**.
  - “05”: vale como 5.
  - Capacidade 10 com 12 pessoas já confirmadas: salva 10 e mantém as 12 confirmações.
  - O organizador não está autenticado ou o evento não é dele: o salvamento não ocorre e permanece o tratamento que o painel já usa para acesso negado.
  - Falha ao salvar por motivo alheio ao campo: o evento não fica pela metade; a mensagem segue o padrão de erro já usado na criação e na edição.
  - Data, título ou janela inválidos ao mesmo tempo que a capacidade: cada campo inválido mostra o próprio erro; nada é salvo.
- **Impacto no existente:** Criação e edição de evento ganham um campo opcional. Evento antigo, sem capacidade, continua sem limite até o organizador informar um número. Slug, imagem, tema, janela, encerrar confirmação, lista de nomes e exclusão do evento não mudam nesta spec.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado a criação de um evento com o campo de capacidade vazio e os demais dados válidos, quando o organizador salva, então o evento existe sem limite.
  - Dado a criação com capacidade 50 e os demais dados válidos, quando o organizador salva e reabre a edição, então o campo mostra 50.
  - Dado um evento sem limite, quando o organizador informa 30 na edição e salva, então a capacidade daquele evento passa a ser 30.
  - Dado um evento com capacidade 30, quando o organizador esvazia o campo e salva, então o evento fica sem limite.
  - Dado um evento com 12 confirmados, quando o organizador salva a capacidade 10, então as 12 confirmações permanecem e a capacidade fica 10.
  - Dado o valor 0, um decimal ou um texto no campo, quando o organizador tenta salvar, então o evento não é atualizado e o campo informa **Informe um número inteiro a partir de 1**.
- **Definição de pronto:** Criar e editar gravam inteiro a partir de 1 ou ausência de limite; valor inválido não salva; reduzir o teto abaixo do total não apaga nomes; evento antigo sem o campo preenchido segue sem limite.
- **Dependências:** Nenhuma. A página pública e o card ainda não precisam exibir este valor para a spec estar pronta.
- **Fora do escopo desta spec:** Texto do card, mensagem de convites esgotados, bloquear o botão **confirmo**, métricas da página do evento e qualquer aviso de que o total já passou do teto.

### Spec 02 — Mostrar a capacidade no card de Meus Eventos

- **Fase:** Fase 1 — Limite opcional de convidados
- **Objetivo (o quê):** O card em **Meus Eventos** mostra o total de confirmados e, quando o evento tem capacidade, o teto na mesma frase.
- **Intenção (por quê):** O organizador olha a lista para saber se o evento está cheio sem abrir a página do evento. O número sozinho não diz se 12 é pouco ou se já é o máximo combinado.
- **Contexto:** Cada card de **Meus Eventos** já mostra a identificação do layout, o título, a tag **Aberta** ou **Encerrada**, a linha verde de confirmados, a data, o horário e o local. A linha verde já usa **1 confirmado** só quando o total é 1, e **N confirmados** quando o total é 0 ou maior que 1. Esse total é o mesmo **Total de confirmados** da página do evento. Se o total não pode ser obtido, o card informa que a quantidade não está disponível e não mostra **0 confirmados**. O card continua sendo o link para a página daquele evento. A Spec 01 é quem grava a capacidade.
- **Atores:** Organizador autenticado, na lista **Meus Eventos**.
- **Descrição do comportamento:** A linha verde de confirmados continua no mesmo lugar do card. Se o evento não tem capacidade, o texto não muda. Se tem capacidade e o total é conhecido, a frase passa a incluir o teto: **0 confirmados de 50**, **1 confirmado de 50**, **12 confirmados de 50**. Número, palavras e o teto ficam verdes, inclusive quando o total é 0. A capacidade não aparece em outro ponto do card. A contagem das últimas 24 horas continua fora do card. A tag, o layout, a data, o horário, o local e o clique não mudam.
- **Entradas e saídas:** Entram o total de confirmações do evento, o mesmo da página do evento, e a capacidade salva na Spec 01, que pode não existir. Sai a frase verde no card, ou o aviso de quantidade indisponível quando o total não puder ser obtido.
- **Dados/entidades envolvidos (conceitual):** Total de confirmados do evento, já existente, e capacidade máxima opcional do evento. A frase usa os dois somente quando os dois são conhecidos; sem capacidade, usa só o total.
- **Estados e transições:** Sem capacidade e total conhecido: texto atual, sem “de C”. Com capacidade e total conhecido: **N confirmados de C**, com singular só no total 1. Total desconhecido: aviso de quantidade indisponível, com ou sem capacidade salva. Mudança de total ou de capacidade aparece na próxima carga da lista. Esta spec não atualiza o card sozinha enquanto ele está aberto.
- **Regras de negócio:** Regras 3, 11, 12 e 13 da seção 7.
- **Validações:** O total exibido é o mesmo da página daquele evento. O número depois de “de” é a capacidade salva, inteira e maior ou igual a 1. Singular **confirmado** só quando o total é exatamente 1. Total desconhecido não vira 0 e não recebe “de C”.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre **Meus Eventos**.
  2. No card de um evento sem capacidade, lê a linha verde como hoje.
  3. No card de um evento com capacidade, lê o total e o teto na mesma frase verde.
  4. Se quiser, abre o evento e confere o **Total de confirmados**: o número antes de “de” é o mesmo.
- **Casos de borda e erros:**
  - Total 0 e capacidade 50: **0 confirmados de 50**, em verde.
  - Total 1 e capacidade 50: **1 confirmado de 50**, em verde.
  - Total 12 e capacidade 10: **12 confirmados de 10**, em verde. O card não esconde o fato de o total ter passado do teto.
  - Sem capacidade: **0 confirmados**, **1 confirmado** ou **12 confirmados**, sem “de”.
  - Total desconhecido, haja ou não capacidade: o card não mostra número nem “de C”; informa que a quantidade não está disponível.
  - Lista vazia ou falha ao carregar a lista: permanece o comportamento atual, sem frase nova.
  - Evento de outro organizador: não aparece nesta lista.
- **Impacto no existente:** Só muda o texto da linha verde de confirmados quando o evento tem capacidade. Layout, tag, data, horário, local, clique e a página do evento permanecem. As métricas **Total de confirmados** e **Últimas 24 horas** não ganham o teto.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com 12 confirmados e capacidade 50, quando o organizador vê o card, então a linha verde é **12 confirmados de 50**.
  - Dado um evento com 1 confirmado e capacidade 50, quando o organizador vê o card, então a linha verde é **1 confirmado de 50**.
  - Dado um evento com 0 confirmados, total conhecido e capacidade 50, quando o organizador vê o card, então a linha verde é **0 confirmados de 50**.
  - Dado um evento sem capacidade e com 12 confirmados, quando o organizador vê o card, então a linha continua **12 confirmados**, sem “de”.
  - Dado um evento com 12 confirmados na página do evento e capacidade 50, quando o card e a página são comparados, então o 12 do card é o mesmo total da página.
  - Dado que o total de um evento não pôde ser obtido, quando o card é exibido, então ele não mostra **0 confirmados** nem **de** seguido da capacidade.
- **Definição de pronto:** Todo card com total conhecido e capacidade mostra a frase certa, em verde, no lugar da linha atual. Sem capacidade, a linha atual permanece. Total desconhecido não vira zero nem ganha teto. O restante do card e as métricas da página do evento ficam como já estão.
- **Dependências:** Spec 01 — a capacidade precisa estar salva no evento. O total de confirmados já existe e não depende desta feature.
- **Fora do escopo desta spec:** Criar ou validar o campo, bloquear a página pública, mensagem de convites esgotados, métricas da página do evento e atualização do card sem recarregar a lista.

### Spec 03 — Recusar confirmação quando a capacidade é atingida

- **Fase:** Fase 1 — Limite opcional de convidados
- **Objetivo (o quê):** Com a confirmação aberta, o link público deixa de aceitar nome novo quando o total de confirmados atinge a capacidade, e volta a aceitar quando o total fica abaixo dela.
- **Intenção (por quê):** O teto informado pelo organizador precisa valer para o convidado. Mostrar o número na lista sem impedir o envio deixaria o evento passar do combinado. A mensagem explica o motivo sem parecer que o evento foi despublicado.
- **Contexto:** A página pública do evento já mostra a ficha (título, detalhes se houver, data, horário, local e imagem, conforme o layout) e o formulário com nome completo e o botão **confirmo**. Cada envio válido grava uma confirmação e, em seguida, permite confirmar outra pessoa. Se a confirmação está encerrada, o formulário é substituído por **Confirmação indisponível** e a ficha do evento continua na página. Evento inexistente ou excluído continua em **Evento indisponível**. A Spec 01 grava a capacidade. Remover uma confirmação no painel já reduz o total. O organizador não tem exceção: o link público obedece a mesma regra para qualquer visitante.
- **Atores:** Convidado, no link público. O organizador altera o cenário ao mudar a capacidade ou ao remover uma confirmação, mas não usa esta tela como ferramenta do painel.
- **Descrição do comportamento:** Há três situações na página pública.
  1. Confirmação encerrada: nada desta spec substitui o que já existe. A ficha permanece e o formulário cede lugar a **Confirmação indisponível**, esteja o evento lotado ou não.
  2. Confirmação aberta, sem limite, ou com total menor que a capacidade: a página e o formulário continuam como hoje. O envio grava o nome se ele for válido.
  3. Confirmação aberta e total maior ou igual à capacidade: abrir o link mostra somente a mensagem **Convites esgotados para o evento {título}. Agradecemos pelo seu interesse.** Não aparecem ficha, campo de nome nem botão **confirmo**.
  Se o convidado já estava com o formulário aberto e envia quando a vaga não existe mais, o nome não é gravado e a tela passa a ser só essa mensagem. Se dois envios disputam a última vaga, apenas um é gravado; o outro cai na mesma mensagem. Se o envio ainda encontra vaga, o nome é gravado e o convidado vê o sucesso atual. Se esse sucesso fez o total atingir a capacidade, não aparece o convite para confirmar outra pessoa. Se ainda sobrou vaga, esse convite permanece. Enquanto o evento seguir lotado e a confirmação aberta, um novo acesso ao link mostra só a mensagem de esgotado. Se o organizador aumentar a capacidade para acima do total, remover o limite ou remover confirmações até o total ficar abaixo, o mesmo link volta a mostrar a página normal com formulário, desde que a confirmação esteja aberta.
- **Entradas e saídas:** Entram o estado da confirmação (aberta ou encerrada, pelas regras que o produto já tem), a capacidade opcional e o total de confirmados no momento da abertura e no momento do envio. No envio, entra também o nome completo. Sai ou a página atual do evento com formulário, ou **Confirmação indisponível** dentro da ficha, ou a tela só com a mensagem de convites esgotados. No sucesso, sai a confirmação gravada e a mensagem de presença confirmada, sem o convite para outra pessoa quando a capacidade foi atingida por aquele envio.
- **Dados/entidades envolvidos (conceitual):** Evento, com título e capacidade opcional; estado da confirmação já existente; cada confirmação de presença, que conta uma pessoa no total. A tela de esgotado usa o título salvo. Não cria uma confirmação recusada nem uma lista de quem tentou entrar depois do teto.
- **Estados e transições:** Formulário disponível: confirmação aberta e (sem limite ou total menor que a capacidade). Esgotado: confirmação aberta e total maior ou igual à capacidade. Encerrado: o estado já existente de confirmação encerrada, que prevalece sobre esgotado na página pública. De formulário para esgotado: um envio válido ocupa a última vaga, ou outro envio chega quando a vaga já acabou. De esgotado para formulário: o total passa a ser menor que a capacidade, ou o limite é removido, com a confirmação ainda aberta. De qualquer um desses para encerrado: vale a regra já existente de prazo, dia do evento ou encerramento manual; a página pública mostra **Confirmação indisponível**.
- **Regras de negócio:** Regras 3, 4, 5, 6, 7, 8 e 14 da seção 7.
- **Validações:** Antes de gravar, o nome continua obrigatório como hoje. Além disso, no momento do envio o total precisa ser menor que a capacidade, se houver capacidade, e a confirmação precisa estar aberta. As duas condições são revistas no envio, não só na abertura da página. Nome vazio não cria confirmação e não leva à tela de esgotado: permanece o erro de nome que o formulário já tem, se ainda houver vaga. Sem vaga, a tela de esgotado prevalece e nada é gravado, mesmo que o nome esteja vazio ou inválido.
- **Fluxo do usuário (passo a passo):**
  1. O convidado abre o link do evento.
  2. Se a confirmação está encerrada, vê a ficha e **Confirmação indisponível**.
  3. Se a confirmação está aberta e ainda há vaga, ou não há limite, vê a ficha e o formulário.
  4. Informa o nome e aciona **confirmo**.
  5. Se ainda há vaga nesse instante, o nome entra e ele vê que a presença foi confirmada. Se essa era a última vaga, não vê o convite para confirmar outra pessoa.
  6. Se não há mais vaga nesse instante, o nome não entra e ele vê só a mensagem de convites esgotados, com o título do evento.
  7. Se, ao abrir, o evento já estava lotado e a confirmação aberta, o passo 3 não ocorre: a primeira tela já é a mensagem de convites esgotados.
- **Casos de borda e erros:**
  - Confirmação encerrada e evento também lotado: **Confirmação indisponível**, com a ficha do evento. A mensagem de esgotado não aparece.
  - Confirmação aberta, sem capacidade: formulário normal, sem tela de esgotado.
  - Confirmação aberta, total exatamente igual à capacidade: tela só com a mensagem de esgotado.
  - Confirmação aberta, total maior que a capacidade porque o organizador reduziu o teto: mesma tela de esgotado. Nenhum nome antigo é apagado por isso.
  - Última vaga ocupada por outro envio enquanto o formulário estava aberto: o envio atual não grava e mostra a mensagem de esgotado.
  - Dois envios da última vaga ao mesmo tempo: um grava; o outro não grava e mostra a mensagem de esgotado.
  - Nome vazio com vaga ainda disponível: erro atual de nome, formulário permanece, nada é gravado.
  - Nome vazio ou inválido com o evento já lotado: nada é gravado e a tela é a de esgotado.
  - Sucesso que atinge a capacidade: presença confirmada, sem a frase de confirmar outra pessoa. Recarregar o link mostra a tela de esgotado.
  - Sucesso com vaga restante: presença confirmada e a frase atual de que é possível confirmar outra pessoa.
  - Organizador aumenta o teto para acima do total, ou remove uma confirmação e o total fica abaixo, com a confirmação aberta: o próximo acesso ao link mostra de novo a ficha e o formulário.
  - Organizador esvazia a capacidade: o limite deixa de existir e, com a confirmação aberta, o formulário volta.
  - Organizador deixa a capacidade igual ao total: continua esgotado.
  - Evento inexistente ou excluído: permanece **Evento indisponível**, sem a mensagem de esgotado.
  - Trecho antigo do link que já redireciona para o evento atual: depois de chegar ao evento atual, vale a regra desta spec.
  - Falha ao consultar se ainda há vaga, sem ter gravado o nome: o convidado vê que não foi possível confirmar e pode tentar de novo. O sistema não mostra sucesso nem a tela de esgotado como se a vaga tivesse acabado.
- **Impacto no existente:** A página pública ganha a tela de convites esgotados e o envio passa a poder ser recusado por capacidade. **Confirmação indisponível**, **Evento indisponível**, a validação do nome e o sucesso com vaga restante permanecem. Encerrar confirmação, janela, edição de nome, exclusão de uma confirmação e exclusão do evento continuam com os efeitos que já têm; exclusão de uma confirmação pode reabrir vaga como efeito da Regra 8. A prévia do botão no editor visual não depende da capacidade. O card não é alterado nesta spec.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com confirmação aberta, capacidade 2 e 2 confirmados, quando o convidado abre o link, então vê somente **Convites esgotados para o evento {título}. Agradecemos pelo seu interesse.** e não vê formulário nem ficha.
  - Dado esse mesmo evento lotado, quando a confirmação está encerrada, então o convidado vê a ficha e **Confirmação indisponível**, e não vê a mensagem de convites esgotados.
  - Dado um evento com confirmação aberta, capacidade 2 e 1 confirmado, quando o convidado envia um nome válido, então esse nome é gravado, o total passa a 2 e ele não é convidado a confirmar outra pessoa.
  - Dado o formulário aberto com 1 vaga, quando essa vaga é ocupada antes do envio e o convidado envia um nome, então o nome não é gravado e ele vê a mensagem de convites esgotados.
  - Dado dois envios válidos ao mesmo tempo para a única vaga restante, quando os dois terminam, então só uma confirmação nova existe e o outro envio não foi gravado.
  - Dado um evento lotado com confirmação aberta, quando o organizador aumenta a capacidade para acima do total e o convidado abre o link de novo, então a ficha e o formulário voltam.
  - Dado um evento lotado com confirmação aberta, quando o organizador remove uma confirmação, o total fica abaixo da capacidade e o convidado abre o link de novo, então a ficha e o formulário voltam.
  - Dado um evento sem capacidade e com confirmação aberta, quando o convidado abre o link e envia um nome válido, então o fluxo de confirmação permanece o de hoje.
  - Dado um evento inexistente, quando alguém abre o link, então continua **Evento indisponível**.
- **Definição de pronto:** Com confirmação aberta, total na capacidade ou acima leva só à mensagem de esgotado; envio sem vaga não grava; a última vaga não é entregue a dois envios; cair abaixo do teto reabre o formulário se a confirmação estiver aberta; confirmação encerrada segue em **Confirmação indisponível**; evento sem limite não muda o fluxo atual.
- **Dependências:** Spec 01 — precisa existir a capacidade opcional salva no evento. Remover uma confirmação já existe e é o que pode reduzir o total; esta spec não reimplementa essa exclusão.
- **Fora do escopo desta spec:** O campo no formulário do organizador, o texto do card, métricas do painel, lista de espera, guardar a tentativa recusada e mudar a prévia visual do botão **confirmo**.

## 14. Ordem recomendada de implementação

1. Spec 01 — Informar a capacidade na criação e na edição
2. Spec 02 — Mostrar a capacidade no card de Meus Eventos
3. Spec 03 — Recusar confirmação quando a capacidade é atingida

A Spec 01 vem primeiro porque o número precisa existir antes de ser mostrado ou obedecido. A Spec 02 só lê esse número e o total que o produto já calcula. A Spec 03 também depende do número salvo; fica por último para o bloqueio da página pública nascer em cima da capacidade já editável, inclusive nos casos em que o organizador aumenta, reduz ou apaga o teto. Seguir essa ordem evita exibir ou bloquear um limite que o organizador ainda não consegue gravar.
