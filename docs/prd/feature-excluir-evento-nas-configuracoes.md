# PRD — Excluir evento nas configurações

> Tipo: PRD de feature · Data: 2026-10-30
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

A exclusão sai da ficha do evento e passa a ser a última seção da página **Configurações do evento**, depois de **Organizadores**.

A seção tem o título **Excluir evento**. Na linha de baixo, a frase **Apaga o evento por completo (convidados, configurações e página pública).** fica à esquerda e o botão **Excluir** fica à direita, na mesma linha.

Quem pode excluir, a confirmação, o que é apagado e o retorno a **Meus Eventos** continuam como já são.

## 2. Problema que resolve

Quem administra o evento encontra a exclusão na ficha, depois do card e das métricas, enquanto as decisões de administração já estão em **Configurações**. A ficha mistura a ocasião do evento com uma ação irreversível.

A exclusão passa a ficar no fim das configurações, com um título, uma frase do que será apagado e o botão na mesma linha da frase.

## 3. Público-alvo

O **criador** do evento, autenticado no painel, ao excluir o próprio evento.

A conta autenticada que abre um evento antigo ainda sem criador, ao excluir esse evento. Hoje essa conta já pode excluir.

O **organizador incluído** continua sem ver a exclusão e sem conseguir concluí-la.

O convidado da página pública não usa esta feature.

## 4. Objetivo do recorte atual

1. Tirar a exclusão da ficha.
2. Colocá-la como última seção de **Configurações do evento**, depois de **Organizadores**.
3. Mostrar o título **Excluir evento**, a frase nova e o botão **Excluir** à direita, na mesma linha da frase.
4. Manter a confirmação, quem pode excluir, o que é apagado e o destino depois da exclusão.

## 5. Funcionalidades

**Essenciais:**

- A exclusão deixa de aparecer na ficha.
- A seção **Excluir evento** aparece no fim de **Configurações do evento**, depois de **Organizadores**, só para quem já pode excluir.
- A primeira linha da seção é o título **Excluir evento**.
- A linha seguinte tem, à esquerda, **Apaga o evento por completo (convidados, configurações e página pública).** e, à direita, o botão **Excluir**.
- **Excluir** abre a mesma confirmação de hoje. **Cancelar** não apaga nada. Confirmar apaga o evento como hoje e leva a **Meus Eventos**.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mudar quem pode excluir o evento.
- Mudar o que a exclusão apaga, ou passar a apagar só convidados, só configurações ou só a página pública.
- Desfazer a exclusão, arquivar o evento ou excluir sem confirmação.
- Mudar o título, o texto ou os botões da confirmação já existente.
- Levar a exclusão para **Meus Eventos**, para o menu lateral ou para a página pública.
- Mudar **Organizadores**, o card, as métricas, **Salvar**, **Alterar trecho**, encerrar, reativar ou **Personalizar**.
- Criar outra forma de excluir um convidado, um organizador ou um trecho de link.

## 7. Regras de negócio

- Regra 1: A exclusão fica só na página **Configurações** daquele evento, como última seção, depois de **Organizadores**. A ficha fica com o card e as métricas. Se as presenças não carregam, o aviso **Presenças indisponíveis** continua no lugar das métricas. Não fica uma faixa vazia no lugar da exclusão.
- Regra 2: A seção só aparece para quem já pode excluir: o criador, e a conta que abre um evento antigo ainda sem criador. O organizador incluído não vê a seção. Para ele, **Organizadores** continua sendo o fim da página.
- Regra 3: A seção tem duas linhas. A primeira é só o título **Excluir evento**, alinhado ao início da seção. A segunda coloca a frase à esquerda e o botão **Excluir** à direita, na mesma linha. O botão não desce para uma linha própria. Se a frase não couber inteira, ela quebra no espaço que sobra à esquerda do botão.
- Regra 4: A frase é **Apaga o evento por completo (convidados, configurações e página pública).** Ela explica a ação. Não reduz o que já é apagado hoje.
- Regra 5: **Excluir** não apaga na hora. Abre a confirmação já usada: título **Excluir este evento?**, texto **O evento, os links (atual e antigos) e as confirmações deste evento serão apagados. Essa ação não pode ser desfeita.**, botões **Cancelar** e **Excluir**. **Cancelar**, ou fechar a confirmação sem **Excluir**, não muda o evento.
- Regra 6: Confirmar apaga aquele evento por completo: o evento, os links atual e antigos, as confirmações e o que depende dele, inclusive configurações e página pública. Não há desfazer. Os outros eventos permanecem. Um trecho que era daquele evento fica livre para outro evento. Quem abrir um link daquele evento vê que ele não está disponível e não confirma presença.
- Regra 7: No sucesso, a pessoa vai para **Meus Eventos**, já sem aquele evento. Na falha, permanece em **Configurações**, o evento continua, e o aviso é o já usado: **Não foi possível excluir o evento. Tente de novo.** Enquanto a exclusão não termina, o **Excluir** da confirmação não aceita outro clique.
- Regra 8: Quem não tem acesso ao evento não vê a seção e não conclui a exclusão. A mensagem continua **Você não tem acesso a este evento.** O organizador incluído não vê a seção. Uma tentativa direta continua recusada com **Só quem criou o evento pode excluí-lo.** e o evento permanece.
- Regra 9: Excluir não passa por **Salvar**, **Alterar trecho**, encerrar, reativar, **Personalizar** nem pelas ações de organizadores. Essas ações não excluem o evento. O que ainda não foi salvo em **Configurações** se perde porque o evento deixa de existir; não é gravado antes de apagar.
- Regra 10: O botão **Excluir** da seção continua a ação destrutiva já usada para apagar o evento. O rótulo da seção é **Excluir**. O rótulo **Excluir evento** fica só no título.

## 8. Fluxos principais

### Fluxo 1 — Encontrar a exclusão

1. Quem pode excluir abre o evento e entra em **Configurações**.
2. Depois de **Organizadores**, vê o título **Excluir evento**.
3. Na linha seguinte, lê a frase à esquerda e vê **Excluir** à direita.
4. Na ficha desse evento, a exclusão não aparece.

### Fluxo 2 — Excluir

1. A pessoa clica em **Excluir**.
2. Lê a confirmação de que o evento, os links e as confirmações serão apagados e que não dá para desfazer.
3. Confirma em **Excluir**.
4. Vai para **Meus Eventos**, sem aquele evento.
5. O link público daquele evento deixa de aceitar confirmação.

### Fluxo 3 — Desistir

1. A pessoa clica em **Excluir** e depois em **Cancelar**, ou fecha a confirmação sem confirmar.
2. Continua em **Configurações**.
3. O evento, os convidados, as configurações e a página pública permanecem.

## 9. Critérios de aceite

- O criador, e a conta de um evento antigo sem criador, encontram **Excluir evento** no fim de **Configurações**, depois de **Organizadores**.
- A frase e o botão **Excluir** ficam na mesma linha, com o botão à direita.
- A ficha desse evento não mostra mais a exclusão, e não deixa faixa vazia no lugar.
- O organizador incluído não vê a seção e não consegue excluir o evento.
- **Cancelar** não apaga nada.
- Confirmar apaga o evento por completo e leva a **Meus Eventos**, já sem esse evento.
- A confirmação continua com o título, o texto e os botões de hoje.

## 10. Stack

Next.js, TypeScript, Tailwind CSS e Supabase, como o painel já usa.

A página **Configurações do evento**, a confirmação antes de apagar e a exclusão do evento já existem. Não entra biblioteca, armazenamento nem fila novos.

## 11. Justificativa da stack

A exclusão já apaga o evento e já pede confirmação. A página de configurações já reúne a administração do evento e já termina em **Organizadores**. A entrega muda o lugar e a forma do bloco visível. Quem exclui, o que some e para onde a pessoa volta continuam os mesmos.

## 12. Fases de construção

### Fase 1 — Exclusão no fim das configurações

Objetivo: tirar a exclusão da ficha e mostrá-la como última seção de **Configurações**, com o título, a frase e o botão **Excluir** à direita, sem mudar a confirmação nem o efeito de apagar.
Specs:

- Spec 01 — Levar a exclusão para o fim de Configurações

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Levar a exclusão para o fim de Configurações

- **Fase:** Fase 1 — Exclusão no fim das configurações
- **Objetivo (o quê):** A exclusão deixa a ficha e passa a ser a última seção de **Configurações do evento**, com título, frase e botão **Excluir** à direita na mesma linha da frase.
- **Intenção (por quê):** A ficha deve ficar com o card e as métricas. A ação irreversível fica com as outras decisões de administração, no fim da página, explícita e alinhada à direita para não parecer mais um campo do formulário.
- **Contexto:** A ficha do evento já mostra, nesta ordem, o card, as métricas de confirmados e, para quem pode excluir, o bloco de exclusão. Se as presenças não carregam, **Presenças indisponíveis** fica no lugar das métricas e a exclusão continua abaixo. O bloco de hoje tem a frase **Apaga o evento, os links e todas as confirmações. Não dá para desfazer.** e o botão **Excluir evento**. Esse botão abre a confirmação **Excluir este evento?**, com o texto sobre evento, links e confirmações, e os botões **Cancelar** e **Excluir**. Confirmar apaga o evento e leva a **Meus Eventos**. Cancelar não apaga. A falha avisa **Não foi possível excluir o evento. Tente de novo.** Só o criador, ou a conta num evento antigo sem criador, vê e conclui a exclusão. O organizador incluído não vê o bloco. Uma tentativa direta responde **Só quem criou o evento pode excluí-lo.** Sem acesso, a mensagem é **Você não tem acesso a este evento.** A página **Configurações do evento** já reúne layout, imagem, trecho do link, capacidade, janela, **Salvar**, encerrar ou reativar, **Personalizar** e, por último, **Organizadores**. O menu lateral continua ao lado, com **Configurações** como área atual nessa página. Descrições anteriores ainda deixam a exclusão na ficha. Esta spec substitui só esse lugar: a exclusão sai da ficha.
- **Atores:** O criador e a conta de um evento antigo sem criador, ao ver e concluir a exclusão. O organizador incluído, ao usar **Configurações** sem ver a seção. Quem não tem acesso ao evento não entra.
- **Descrição do comportamento:** Quem pode excluir abre **Configurações** e, depois de **Organizadores**, vê a seção **Excluir evento**. A primeira linha é o título **Excluir evento**. A segunda linha mostra, à esquerda, **Apaga o evento por completo (convidados, configurações e página pública).** e, à direita, o botão **Excluir**. O botão permanece nessa linha, no fim dela. A frase ocupa o lado esquerdo e, se não couber, quebra antes do botão. O botão continua a ação destrutiva já usada para apagar o evento. Clicar em **Excluir** abre a confirmação já existente, com o mesmo título, o mesmo texto e os mesmos botões **Cancelar** e **Excluir**. **Cancelar** ou fechar sem confirmar deixa o evento como está e a pessoa continua em **Configurações**. Confirmar apaga aquele evento por completo, como hoje: evento, links atual e antigos, confirmações e o que depende dele, inclusive a página pública e as configurações. Não há desfazer. A pessoa vai para **Meus Eventos**, já sem esse evento. Outro evento não muda. Um link daquele evento passa a mostrar que ele não está disponível. Se a exclusão falha, a pessoa permanece em **Configurações**, o evento continua e o aviso é **Não foi possível excluir o evento. Tente de novo.** Enquanto a tentativa não termina, o **Excluir** da confirmação não dispara outra exclusão. A ficha desse evento deixa de mostrar título, frase e botão de exclusão. A ordem da ficha passa a ser card e métricas, ou card e **Presenças indisponíveis**. Não sobra faixa vazia. O organizador incluído abre **Configurações** e não vê a seção; o fim da página, para ele, continua **Organizadores**. **Salvar** e as outras ações da página não passam a excluir o evento. Excluir não grava layout, imagem, capacidade, janela, trecho ou tema que ainda estejam só na tela.
- **Entradas e saídas:** A entrada é o evento aberto por quem tem acesso, na página de configurações, e a escolha de **Excluir** seguida de confirmar ou desistir. A saída visual, para quem pode excluir, é a seção no fim da página e a ausência dela na ficha. A saída ao desistir é o evento inalterado. A saída ao confirmar é o evento inexistente, **Meus Eventos** sem ele, e a página pública daquele evento indisponível. A saída na falha é a permanência em **Configurações** e o aviso **Não foi possível excluir o evento. Tente de novo.** A saída para o organizador incluído é a página sem a seção. A saída de uma tentativa direta sem permissão é **Só quem criou o evento pode excluí-lo.**, com o evento intacto. Sem acesso, a saída continua **Você não tem acesso a este evento.**
- **Dados/entidades envolvidos (conceitual):** O evento. Os links atual e antigos desse evento. As confirmações desse evento. As configurações e a página pública, que existem por causa do evento. O papel de quem está vendo: criador, organizador incluído ou conta de evento antigo sem criador.
- **Estados e transições:** Evento existente, com a exclusão visível só em **Configurações** para quem pode excluir. Pedido de exclusão aberto → desistência: o evento continua. Pedido confirmado com sucesso: o evento deixa de existir e a pessoa vai para **Meus Eventos**. Pedido confirmado com falha: o evento continua e a pessoa permanece em **Configurações**. Para o organizador incluído, a seção não chega a existir na página.
- **Regras de negócio:** Valem as Regras 1 a 10 da seção 7. A frase nova não muda o alcance da exclusão. A confirmação não muda de texto. Quem não pode excluir hoje continua sem poder.
- **Validações:** A exclusão só é concluída para o evento aberto, por quem já pode excluí-lo, e só depois da confirmação explícita. Sem sessão ou sem acesso, não exclui. Uma segunda confirmação enquanto a primeira não terminou não dispara outra exclusão. **Cancelar** não é tratado como confirmação.
- **Fluxo do usuário (passo a passo):**
  1. Abre a ficha e não vê exclusão. Vê o card e as métricas, ou **Presenças indisponíveis**.
  2. Abre **Configurações** pelo menu ou pelo caminho que já usa.
  3. Se puder excluir, rola até depois de **Organizadores** e vê o título, a frase à esquerda e **Excluir** à direita.
  4. Clica em **Excluir**, lê a confirmação e confirma ou cancela.
  5. Se confirmar com sucesso, chega em **Meus Eventos** sem aquele evento. Se cancelar, continua em **Configurações** com o evento intacto.
- **Casos de borda e erros:**
  - Organizador incluído: não há título, frase nem botão. **Organizadores** é a última seção. Tentativa direta não apaga o evento e informa **Só quem criou o evento pode excluí-lo.**
  - Sem acesso ao evento: não vê a ficha, não vê **Configurações** e não exclui. A mensagem continua **Você não tem acesso a este evento.**
  - Evento antigo sem criador: a conta autenticada que já pode abrir esse evento vê a seção e pode excluir, como hoje.
  - **Cancelar** ou fechar a confirmação: nada é apagado e a seção continua no fim da página.
  - Falha ao excluir: o evento permanece, a pessoa permanece em **Configurações** e o aviso é **Não foi possível excluir o evento. Tente de novo.** Ela pode tentar de novo.
  - Exclusão em andamento: o **Excluir** da confirmação não aceita outro clique até a tentativa terminar.
  - Evento sem confirmações: ainda assim o evento, os links e a página pública somem.
  - Dois eventos: excluir um não altera o outro nem libera o trecho do outro.
  - Trecho antigo ou atual do evento excluído: quem abre vê que o evento não está disponível e não confirma presença.
  - **Organizadores** indisponíveis: o aviso dessa seção continua no lugar da lista, e **Excluir evento** continua depois dela, para quem pode excluir.
  - Presenças indisponíveis: a ficha mostra esse aviso no lugar das métricas e não traz a exclusão de volta.
  - Frase longa ou página estreita: o botão **Excluir** permanece à direita da linha da frase. A frase quebra à esquerda dele.
  - Rascunho ainda não salvo de layout, imagem, capacidade ou janela: excluir com sucesso apaga o evento e esse rascunho não é gravado. Cancelar a confirmação mantém o rascunho na página.
  - **Personalizar** aberto ou trecho ainda não confirmado: abrir **Excluir** não grava tema nem trecho. Só a confirmação da exclusão apaga o evento.
- **Impacto no existente:** A exclusão sai da ficha e entra no fim de **Configurações**, com título, frase nova e botão **Excluir**. O card, as métricas, **Organizadores**, o menu lateral, **Salvar** e as demais ações da página permanecem. A confirmação, as mensagens de falha e de permissão, o que é apagado e o destino **Meus Eventos** permanecem. Descrições anteriores que mantinham a exclusão na ficha deixam de valer quanto ao lugar dela. **Meus Eventos** e a página pública só mudam depois de uma exclusão confirmada, do mesmo jeito que já mudam hoje.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o criador na ficha do evento, quando a ficha é exibida, então não há exclusão, e o card e as métricas continuam, sem faixa vazia no fim.
  - Dado o criador em **Configurações**, quando a página é exibida, então a última seção, depois de **Organizadores**, tem o título **Excluir evento**, a frase **Apaga o evento por completo (convidados, configurações e página pública).** à esquerda e o botão **Excluir** à direita, na mesma linha da frase.
  - Dado essa seção, quando o criador clica em **Excluir**, então abre a confirmação **Excluir este evento?**, com o texto e os botões **Cancelar** e **Excluir** já usados hoje.
  - Dado a confirmação aberta, quando o criador cancela, então o evento permanece e ele continua em **Configurações**.
  - Dado a confirmação aberta, quando o criador confirma, então o evento some, ele vai para **Meus Eventos** sem esse evento, e o link público daquele evento não aceita confirmação.
  - Dado o organizador incluído, quando ele abre **Configurações**, então **Excluir evento** não aparece e **Organizadores** é a última seção.
  - Dado o organizador incluído, quando uma exclusão daquele evento é tentada diretamente, então o evento permanece e a mensagem é **Só quem criou o evento pode excluí-lo.**
  - Dado a exclusão não pôde ser concluída, quando a tentativa termina, então o evento permanece em **Configurações** e o aviso é **Não foi possível excluir o evento. Tente de novo.**
  - Dado dois eventos, quando o criador exclui um, então o outro continua em **Meus Eventos** com os próprios convidados e o próprio link.
- **Definição de pronto:** A ficha não mostra exclusão. Quem já pode excluir vê a seção no fim de **Configurações**, com título, frase e botão à direita na mesma linha. Confirmar apaga o evento como antes e leva a **Meus Eventos**. Cancelar não apaga. O organizador incluído não vê a seção e não exclui. O restante de **Configurações** continua gravando só o que já gravava.
- **Dependências:** Nenhuma. Usa a página de configurações, a confirmação e a exclusão já existentes. **Organizadores** já é a última seção dessa página; esta spec passa a ser a seção seguinte, só para quem pode excluir.
- **Fora do escopo desta spec:** Mudar o texto da confirmação. Mudar quem pode excluir. Excluir sem confirmação, desfazer, ou apagar só uma parte do evento. Colocar a exclusão no menu, em **Meus Eventos** ou na página pública. Alterar **Organizadores** ou o que **Salvar**, **Alterar trecho**, encerrar, reativar e **Personalizar** gravam.

## 14. Ordem recomendada de implementação

1. Spec 01 — Levar a exclusão para o fim de Configurações

Há uma única spec. Ela tira a exclusão da ficha e a entrega inteira no fim de **Configurações**, já com o título, a frase e o botão. A confirmação e o efeito de apagar já existem e são reutilizados nessa mesma entrega, para a ação não ficar sem lugar nem mudar de regra no meio do caminho.
