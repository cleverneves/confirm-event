# PRD — Exibição de data, horário e local na página pública

> Tipo: PRD de feature · Data: 2026-10-08
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

Na página pública do evento, no layout **Personalizado**, o convidado deixa de ver data, horário e local em três colunas com os rótulos Data, Horário e Local.

No lugar disso, dia e horário ficam numa única linha, agrupados no centro, nesta ordem e com uma barra entre os trechos:

`Sábado | 07/11 | às 14h`

Logo abaixo, o nome do local aparece sozinho, também centralizado.

A prévia do tema no painel repete esse mesmo formato. A lista de eventos e a ficha do evento no painel continuam como estão hoje.

## 2. Problema que resolve

O bloco atual trata data, horário e local como três fichas iguais, cada uma com rótulo. O convidado lê “Data”, “Horário” e “Local” antes da informação, e a data sai longa, com dia da semana, mês por extenso e ano.

O convite público precisa mostrar o dia da semana, a data curta e o horário como uma frase visual única, e o local como uma linha própria embaixo, sem rótulos.

## 3. Público-alvo

- **Convidado** — vê o novo formato na página pública, sem login.
- **Organizador** — vê o mesmo formato na prévia do tema, para conferir o convite antes de compartilhar. Continua vendo o formato longo na lista e na ficha do evento.

## 4. Objetivo do recorte atual

Trocar só a apresentação de dia, horário e local onde o convite é mostrado ao convidado: a página pública no layout **Personalizado** e a prévia do tema desse mesmo layout. Os dados do evento não mudam. O que já está guardado (data, horário e local) passa a ser lido nesse formato novo.

## 5. Funcionalidades

**Essenciais:**

- Uma linha só, no centro, com três trechos nesta ordem: dia da semana por extenso, dia e mês no formato `07/11`, horário no formato `às 14h` ou `às 14h05`.
- Uma barra vertical `|` entre o dia da semana e a data, e outra entre a data e o horário.
- Sem os rótulos Data, Horário e Local.
- Nome do local sozinho, centralizado, na seção imediatamente abaixo dessa linha.
- A prévia do tema usa o mesmo texto e a mesma disposição quando o layout salvo é **Personalizado**.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mostrar data, horário ou local na página pública do layout **Somente imagem**. Esse layout continua só com a imagem e a confirmação.
- Alterar a lista de eventos do painel. Ela continua com a data longa, o horário `14:00` e o local como estão hoje.
- Alterar a ficha do evento no painel. Ela continua com a data longa, o horário `14:00` e o local como estão hoje.
- Alterar os avisos da janela de confirmação que citam uma data por extenso.
- Alterar o formulário de criação ou de edição, o que é obrigatório, ou o que fica gravado.
- Incluir o ano na data curta da página pública.
- Mudar título, detalhes, imagem, botão **confirmo**, campo de nome, avisos de confirmação ou o texto **Confirmação indisponível**.
- Mudar as cores do tema, o aviso de contraste ou quais textos a cor de título pode pintar.
- Página **Evento indisponível**.
- Convidado escolher outro formato.

## 7. Regras de negócio

- Regra 1: A mudança vale só onde o convite mostra dia, horário e local ao convidado: página pública e prévia do tema, ambas no layout **Personalizado**.
- Regra 2: No layout **Somente imagem**, a página pública e a prévia continuam sem dia, horário e local.
- Regra 3: A ordem da página **Personalizado** continua a mesma até esse bloco: faixa só se houver imagem; título; detalhes só se houver texto; em seguida dia, horário e local; depois a confirmação.
- Regra 4: Dia e horário formam uma seção. Os três trechos ficam na mesma linha, agrupados no centro. Não se espalham até as laterais da página.
- Regra 5: A ordem fixa é: dia da semana por extenso, depois dia e mês, depois horário.
- Regra 6: Há uma barra `|` entre o primeiro e o segundo trecho, e outra entre o segundo e o terceiro. Não há barra antes do dia da semana, nem depois do horário, nem na linha do local. **Suposição:** existe um espaço antes e outro depois de cada barra, para o separador ficar legível, como em `Sábado | 07/11 | às 14h`.
- Regra 7: O dia da semana sai por extenso, com a primeira letra maiúscula e o restante minúsculo: Sábado, Domingo, Segunda-feira, Terça-feira, Quarta-feira, Quinta-feira, Sexta-feira.
- Regra 8: A data curta é dia e mês, com dois dígitos em cada um, separados por `/`, sem ano. 7 de novembro é `07/11`. 17 de novembro é `17/11`. 7 de janeiro é `07/01`.
- Regra 9: O horário começa sempre com `às `, em minúsculas. Se os minutos são zero, aparecem só a hora e o `h`: 14:00 é `às 14h`. Se há minutos, eles entram com dois dígitos, sem dois-pontos e sem espaço: 14:30 é `às 14h30`; 14:05 é `às 14h05`.
- Regra 10: **Suposição:** a hora não ganha zero à esquerda. 9:00 é `às 9h`. 9:05 é `às 9h05`. 0:00 é `às 0h`. 0:30 é `às 0h30`.
- Regra 11: Os rótulos Data, Horário e Local não aparecem na página pública nem na prévia.
- Regra 12: A seção de local fica imediatamente abaixo da linha de dia e horário. Mostra só o nome do local já gravado, centralizado. Se o nome quebrar em mais de uma linha, o texto continua centralizado. O local não entra na linha de dia e horário.
- Regra 13: **Suposição:** as linhas horizontais que já separam esse bloco do título e da confirmação permanecem em volta do conjunto (linha de dia e horário mais o local). Esta feature muda o conteúdo e o alinhamento de dentro do bloco, não remove o enquadramento.
- Regra 14: Quando o evento tem cor de título, essa cor continua pintando o dia da semana, a data curta, o horário, as barras e o local. Sem cor de título, esses textos seguem a aparência do valor do convite, como já acontece hoje com o texto da data, do horário e do local. O tema em si não muda.
- Regra 15: Lista e ficha do painel continuam com a data longa de hoje (dia da semana, dia, mês por extenso e ano, com a primeira letra maiúscula) e com o horário em `14:00`, separados como já estão. O local da lista e da ficha também permanece como está.
- Regra 16: Nada nesta feature altera o dia, o horário ou o local gravados. Um evento já existente passa a ser lido no formato novo na página pública e na prévia, sem o organizador editar o evento.

## 8. Fluxos principais

### Fluxo 1 — Convidado abre o convite em Personalizado

1. O convidado abre a página pública de um evento no layout **Personalizado**.
2. Vê a faixa, se houver imagem, o título e os detalhes, se houver texto.
3. Vê uma linha centralizada, por exemplo `Sábado | 07/11 | às 14h`.
4. Logo abaixo, vê o nome do local centralizado, sem o rótulo Local.
5. Em seguida, vê a confirmação, como já acontece hoje.

### Fluxo 2 — Organizador confere a prévia do tema

1. O organizador abre a prévia do tema de um evento já salvo em **Personalizado**.
2. A prévia mostra a mesma linha de dia e horário e o mesmo local centralizado que o convidado vê.
3. A prévia de um evento em **Somente imagem** continua sem esse bloco.

### Fluxo 3 — Organizador olha a lista ou a ficha

1. O organizador abre a lista ou a ficha de um evento.
2. A data continua longa, o horário continua `14:00` e o local continua no formato atual do painel.
3. Abrir a página pública desse mesmo evento mostra o formato novo.

## 9. Critérios de aceite

- O convidado, no layout **Personalizado**, vê numa única linha centralizada o dia da semana, a data `DD/MM` e o horário, separados por `|`.
- O convidado não vê os rótulos Data, Horário e Local.
- O nome do local aparece sozinho, centralizado, abaixo dessa linha.
- 7 de novembro às 14:00 produz `Sábado | 07/11 | às 14h` quando esse dia for um sábado, e o horário `às 14h`.
- 14:30 produz `às 14h30`. 14:05 produz `às 14h05`.
- A prévia do tema em **Personalizado** mostra o mesmo texto e a mesma disposição.
- A prévia e a página pública em **Somente imagem** não mostram dia, horário nem local.
- A lista e a ficha do painel continuam com a data longa e o horário `14:00`.
- O título, os detalhes, a imagem, a confirmação e os dados gravados permanecem como já estão.

## 10. Stack

Next.js, TypeScript e Tailwind, na página pública do evento e na prévia do tema que o produto já tem. Os dados continuam sendo a data, o horário e o local já gravados no evento.

## 11. Justificativa da stack

A feature só muda como uma informação que o evento já possui é lida no convite. Não pede banco novo, autenticação nova nem serviço externo. A página pública e a prévia já exibem esse bloco no layout **Personalizado**; o trabalho é apresentar o mesmo conteúdo na disposição e no texto definidos aqui.

## 12. Fases de construção

### Fase 1 — Convite

Objetivo: o convidado e a prévia do tema leem dia, horário e local no formato novo, sem alterar o painel nem os dados do evento.

Specs:

- Spec 01 — Linha de dia e horário e local centralizado

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Linha de dia e horário e local centralizado

- **Fase:** Fase 1 — Convite
- **Objetivo (o quê):** Na página pública e na prévia do tema, no layout **Personalizado**, mostrar o dia da semana, a data curta e o horário numa única linha centralizada, com barras entre os trechos, e o nome do local centralizado logo abaixo, sem rótulos.
- **Intenção (por quê):** O convite deve ser lido como uma linha de ocasião (que dia, que data, que hora) e, embaixo, onde é. Os rótulos Data, Horário e Local e a data longa atrapalham essa leitura. A prévia precisa bater com a página pública para o organizador não aprovar um formato e o convidado ver outro.
- **Contexto:** O produto já tem a página pública do evento e a prévia do tema. No layout **Personalizado**, essa área hoje mostra três colunas: rótulo Data com a data longa (dia da semana, dia, mês por extenso e ano), rótulo Horário com o horário `14:00`, e rótulo Local com o nome do local. No layout **Somente imagem**, essa área não existe. A lista do painel e a ficha do evento também mostram a data longa e o horário `14:00`, e devem continuar assim. Título, detalhes, imagem e confirmação já existem acima e abaixo desse bloco e não fazem parte desta spec.
- **Atores:** O convidado, ao abrir a página pública. O organizador, ao abrir a prévia do tema.
- **Descrição do comportamento:** Quando o layout do evento é **Personalizado**, a página pública e a prévia substituem as três colunas por duas seções. A primeira é uma única linha, o conjunto centralizado na largura do convite, sem encostar nas laterais como três colunas espalhadas. O texto da linha é o dia da semana, uma barra, a data curta e uma barra, o horário. A segunda seção fica imediatamente abaixo e mostra apenas o nome do local, centralizado. Não há rótulo em nenhuma das duas. Quando o layout é **Somente imagem**, nada disso é exibido. Lista, ficha e avisos do painel que já citam a data longa permanecem com o formato atual.
- **Entradas e saídas:** Entram a data do evento, o horário do evento, o nome do local, o layout e, se houver, a cor de título — todos já gravados. Sai, no layout **Personalizado**, a linha formatada e o local centralizado. No layout **Somente imagem**, essa saída não existe. Exemplo completo, sendo o dia um sábado: entrada 7 de novembro de 2026, 14:00 e local “Salão Azul” produz a linha `Sábado | 07/11 | às 14h` e, abaixo, `Salão Azul` centralizado.
- **Dados/entidades envolvidos (conceitual):** O evento já tem uma data de calendário, um horário com hora e minuto, um nome de local e um layout (**Personalizado** ou **Somente imagem**). Pode ter uma cor de título. Esta spec não cria informação nova; só define como data, horário e local são lidos no convite.
- **Estados e transições:** Não se aplica. Não há estado novo nem transição. O bloco aparece ou não conforme o layout já salvo, e o texto é calculado a partir da data e do horário já gravados.
- **Regras de negócio:**
  - Vale apenas para **Personalizado**, na página pública e na prévia do tema.
  - **Somente imagem** não mostra o bloco.
  - Ordem da linha: dia da semana, data curta, horário. O conjunto fica no centro.
  - Duas barras `|`, uma entre cada par de trechos. **Suposição:** um espaço antes e outro depois de cada barra.
  - Dia da semana por extenso, só a primeira letra maiúscula: Sábado, Domingo, Segunda-feira, Terça-feira, Quarta-feira, Quinta-feira, Sexta-feira.
  - Data curta `DD/MM`, dois dígitos no dia e no mês, sem ano.
  - Horário: `às 14h` quando os minutos são zero; `às 14h30` e `às 14h05` quando há minutos, sempre com dois dígitos nos minutos, sem dois-pontos.
  - **Suposição:** a hora não leva zero à esquerda (`às 9h`, `às 9h05`, `às 0h`, `às 0h30`).
  - Sem rótulos Data, Horário e Local.
  - Local imediatamente abaixo, só o nome, centralizado, inclusive se o texto quebrar a linha.
  - **Suposição:** as linhas horizontais que já emolduram o bloco continuam em volta da linha de dia e horário e do local.
  - A cor de título, se existir, pinta o dia da semana, a data, as barras, o horário e o local. Sem essa cor, o texto segue a aparência atual do valor no convite.
  - Lista, ficha e os avisos do painel que usam a data longa não mudam.
  - Evento já existente passa a ser lido assim sem nova gravação.
- **Validações:** Não se aplica criar validação nova. A data e o horário exibidos já foram aceitos quando o evento foi salvo. Esta spec só formata o que já é válido: data de calendário e horário com hora e minuto.
- **Fluxo do usuário (passo a passo):**
  1. O convidado abre a página pública de um evento **Personalizado**.
  2. Depois do título e dos detalhes, se houver, lê a linha centralizada no formato `Sábado | 07/11 | às 14h`.
  3. Logo abaixo, lê o local centralizado.
  4. Segue para a confirmação, que não muda.
  5. O organizador, na prévia do tema desse evento, vê as mesmas duas seções.
- **Casos de borda e erros:**
  - Horário em ponto (14:00, 9:00): o texto não mostra minutos nem `:00`.
  - Minutos com um dígito (14:05): os minutos aparecem com zero à esquerda, `às 14h05`.
  - Dia ou mês com um dígito: ambos aparecem com zero à esquerda, `07/11` e `07/01`.
  - **Suposição:** hora de um dígito ou meia-noite não ganha zero à esquerda.
  - Local longo: quebra em linhas centralizadas e não se junta à linha de dia e horário.
  - Evento sem imagem e sem detalhes, em **Personalizado**: a linha e o local continuam aparecendo, abaixo do título.
  - Layout **Somente imagem**: a linha e o local não aparecem, mesmo com data, horário e local preenchidos.
  - Prévia aberta antes de salvar uma edição: continua mostrando o que já está salvo, como a prévia já faz hoje. O formato novo vale para esse conteúdo salvo.
  - Página de evento inexistente ou excluído: continua **Evento indisponível**, sem este bloco.
  - Não há erro novo para o convidado. Se o evento abre, a linha é montada com a data e o horário gravados.
- **Impacto no existente:** Some o bloco de três colunas com rótulos na página pública e na prévia de **Personalizado**. Título, detalhes, imagem, confirmação, tema, lista, ficha, formulário e dados gravados permanecem. O formato longo da data e o horário `14:00` continuam na lista, na ficha e nos avisos do painel que já falam a data por extenso.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento **Personalizado** num sábado, 7 de novembro, às 14:00, com local “Salão Azul”, quando o convidado abre a página pública, então vê a linha centralizada `Sábado | 07/11 | às 14h`, sem rótulos, e abaixo o texto “Salão Azul” centralizado.
  - Dado esse mesmo evento, quando o horário gravado é 14:30, então o trecho do horário é `às 14h30`.
  - Dado esse mesmo evento, quando o horário gravado é 14:05, então o trecho do horário é `às 14h05`.
  - Dado um evento em 17 de janeiro, quando o convidado abre a página pública em **Personalizado**, então a data curta é `17/01`.
  - Dado um evento **Personalizado** com cor de título, quando o convidado abre a página, então a linha, as barras e o local usam essa cor.
  - Dado um evento **Personalizado**, quando o organizador abre a prévia do tema, então a prévia mostra a mesma linha e o mesmo local centralizado da página pública.
  - Dado um evento **Somente imagem**, quando o convidado abre a página ou o organizador abre a prévia, então dia, horário e local não aparecem.
  - Dado qualquer evento, quando o organizador olha a lista ou a ficha, então a data continua longa, com mês por extenso e ano, e o horário continua `14:00`.
  - Dado um evento já existente, quando ninguém o edita, então a página pública **Personalizado** já usa o formato novo.
- **Definição de pronto:** A página pública e a prévia em **Personalizado** mostram a linha e o local como nesta spec, inclusive hora cheia, minutos, dia e mês com um dígito. **Somente imagem**, lista e ficha permanecem no formato que já tinham. Título, detalhes, imagem, confirmação e dados gravados não mudam.
- **Dependências:** Nenhuma. Usa o evento, o layout e a prévia que o produto já tem.
- **Fora do escopo desta spec:** Criar ou editar o evento; mudar layout, imagem, tema, confirmação ou textos do painel; exibir o bloco em **Somente imagem**; colocar o ano na data curta; manter os rótulos Data, Horário e Local.

## 14. Ordem recomendada de implementação

1. Spec 01 — Linha de dia e horário e local centralizado

Há uma única spec. Ela deve ser feita por inteiro: o formato do texto, a linha centralizada, o local abaixo e a prévia no mesmo formato, sem levar esse texto para a lista ou para a ficha. Implementar só a página pública e esquecer a prévia deixaria o organizador vendo um convite diferente do convidado.
