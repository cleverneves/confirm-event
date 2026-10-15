# PRD — Ícone na lista de Gestão de Convidados

> Tipo: PRD de feature · Data: 2026-10-15
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

Na lista **Gestão de Convidados**, dentro da ficha do evento no painel, cada convidado confirmado deixa de aparecer com um círculo contendo as iniciais do nome.

No lugar desse círculo, a linha em visualização mostra só o ícone de pessoa com marca de confirmação (user round check), em verde fixo, ao lado do nome completo. O círculo, a borda e o fundo somem. Durante a edição do nome, o ícone não aparece.

## 2. Problema que resolve

A marca atual depende das letras do nome. Um nome com uma palavra, dois nomes iguais ou um nome curto gera iniciais pouco úteis, e o círculo compete com o nome que já está escrito ao lado.

A lista é de pessoas que já confirmaram presença. A marca ao lado do nome deve comunicar isso de forma única, igual para todo convidado, sem repetir letras que o nome já mostra.

## 3. Público-alvo

**Organizador do evento** — quem abre a ficha do evento no painel e consulta, busca, edita ou remove confirmações na lista Gestão de Convidados.

O convidado não vê esta lista. Quem só organiza outro evento também não vê a lista deste evento.

## 4. Objetivo do recorte atual

Trocar apenas a marca visual à esquerda do nome na listagem de Gestão de Convidados: sair o círculo de iniciais; entrar o ícone user round check em verde fixo, visível só enquanto a linha não está em edição.

Nome, data da confirmação, busca, paginação, editar e remover continuam como estão.

## 5. Funcionalidades

**Essenciais:**

- Remover o círculo com as iniciais do nome e do sobrenome em cada linha da listagem.
- Mostrar, no mesmo lugar, somente o ícone user round check, sem círculo, borda ou fundo.
- Pintar esse ícone com um verde fixo, o mesmo no tema claro e no tema escuro.
- Mostrar o ícone só na visualização da linha. Na edição do nome, a linha continua só com o campo de nome.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mudar nome, data, busca, paginação, botões Editar, Salvar, Cancelar e Remover, ou os textos da lista.
- Mostrar o ícone no estado vazio (“Nenhuma confirmação ainda”) ou no estado de busca sem resultado (“Nenhum nome encontrado”).
- Usar o ícone como status variável. Toda linha visível em visualização recebe o mesmo ícone; não há ícone diferente para confirmado, pendente ou recusado, porque esta lista só tem confirmações.
- Levar o ícone para a página pública, a lista de eventos, a ficha de métricas, a lista de organizadores ou qualquer outra tela.
- Trocar a cor de sucesso do tema, o tema do evento ou outras marcas verdes do produto.
- Incluir foto, avatar ou iniciais em outro formato.

## 7. Regras de negócio

- Regra 1: A troca vale só para a marca à esquerda do nome na lista **Gestão de Convidados** da ficha do evento.
- Regra 2: Em visualização, cada linha da página atual mostra o ícone user round check e, ao lado, o nome completo já gravado. Não há letras de iniciais.
- Regra 3: O ícone aparece sozinho. Não fica dentro de círculo, não tem borda e não tem fundo próprio.
- Regra 4: A cor do ícone é um verde fixo. Tema claro e tema escuro mostram o mesmo verde. A cor de sucesso do tema não pinta este ícone.
- Regra 5: **Suposição:** o verde é um verde médio de confirmação, legível sobre o fundo da lista nos dois temas, no tom de referência `#16a34a`. Se esse tom falhar contraste no fundo real da lista, o ajuste fica no mesmo verde fixo, sem passar a usar a cor do tema.
- Regra 6: O ícone não depende do nome. Nome com uma palavra, várias palavras, nomes iguais na lista ou nome curto recebem o mesmo ícone.
- Regra 7: Na edição do nome, o ícone não aparece. A célula do nome mostra só o campo, como hoje. Cancelar ou salvar com sucesso devolve a linha à visualização, e o ícone volta ao lado do nome (o original, se cancelou; o salvo, se concluiu).
- Regra 8: O ícone é decorativo. Não é botão, não tem ação de clique e não substitui o nome como identificação da linha. O nome continua sendo o texto lido por quem usa a lista.
- Regra 9: Busca, paginação, total de confirmações, editar, remover e a data “Confirmação em” permanecem com o comportamento atual. O ícone acompanha cada linha visível da página corrente e não aparece em linhas que a busca ou a página não estão mostrando.
- Regra 10: Lista vazia e busca sem resultado continuam nos estados vazios atuais, sem ícone.

## 8. Fluxos principais

### Fluxo 1 — Ver a lista

1. O organizador abre a ficha de um evento que já tem confirmações.
2. Em Gestão de Convidados, cada linha da página mostra o ícone user round check em verde fixo e o nome completo ao lado.
3. Não há círculo nem iniciais.
4. Data, ações e paginação seguem como hoje.

### Fluxo 2 — Editar o nome

1. O organizador clica em Editar numa linha.
2. O ícone some. Fica só o campo com o nome.
3. Se cancela, a linha volta a mostrar o ícone e o nome anterior.
4. Se salva com sucesso, a linha volta a mostrar o ícone e o nome salvo.
5. Se o salvamento falha, a linha permanece em edição, sem ícone, com a mensagem de erro já usada hoje.

## 9. Critérios de aceite

- O organizador vê o ícone user round check em verde fixo ao lado do nome de cada convidado na visualização da lista.
- O organizador não vê círculo, borda, fundo ou iniciais nessa marca.
- O verde do ícone é o mesmo no tema claro e no tema escuro.
- O sistema não usa a cor de sucesso do tema para pintar esse ícone.
- Quando o organizador clica em Editar, o sistema esconde o ícone e mostra só o campo de nome.
- Quando o organizador cancela ou salva com sucesso, o sistema volta a mostrar o ícone ao lado do nome correspondente.
- Quando não há confirmações, ou a busca não acha nome, o sistema não mostra o ícone.
- Nome, data, busca, paginação, editar e remover continuam funcionando como antes desta troca visual.

## 10. Stack

A stack já existente do Confirm Event: Next.js, TypeScript, Tailwind CSS, shadcn/ui e o conjunto de ícones que o painel já usa. Supabase permanece como autenticação e banco; esta feature não grava dado novo.

## 11. Justificativa da stack

A lista Gestão de Convidados já existe no painel do evento. A feature só troca uma marca visual dessa lista. Não pede biblioteca, serviço ou tela novos. O ícone user round check deve sair do conjunto de ícones que o projeto já utiliza.

## 12. Fases de construção

### Fase 1 — Marca do convidado na listagem

Objetivo: substituir o círculo de iniciais pelo ícone user round check em verde fixo, apenas na visualização das linhas de Gestão de Convidados.

Specs:

- Spec 01 — Ícone verde no lugar das iniciais

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Ícone verde no lugar das iniciais

- **Fase:** Fase 1 — Marca do convidado na listagem
- **Objetivo (o quê):** Na visualização de cada linha de Gestão de Convidados, o círculo com as iniciais do nome sai e entra somente o ícone user round check, em verde fixo, ao lado do nome completo.
- **Intenção (por quê):** A lista é de quem já confirmou presença. A marca deve dizer isso de um jeito só, igual para todos, sem repetir letras do nome nem depender de como o nome foi escrito.
- **Contexto:** Na ficha do evento, o card Gestão de Convidados lista as confirmações daquele evento. Cada linha em visualização mostra hoje um círculo com borda e fundo, com as iniciais (duas letras quando há nome e sobrenome; duas primeiras letras quando há uma palavra só; “?” se não houver palavra), e o nome completo ao lado. A mesma célula, em edição, mostra só o campo de nome, sem o círculo. A lista também tem data de confirmação, busca por nome, paginação, Editar, Salvar, Cancelar e Remover. Esta spec reutiliza essa lista e não cria outra.
- **Atores:** Organizador autenticado com acesso à ficha daquele evento.
- **Descrição do comportamento:** Em toda linha visível que não está em edição, a marca à esquerda do nome passa a ser só o ícone de pessoa com marca de confirmação, o user round check. O ícone fica alinhado com o nome, no lugar que o círculo ocupava, sem invólucro circular, borda ou fundo. A cor é verde fixo, idêntica no tema claro e no tema escuro, e não acompanha a cor de sucesso do tema. O nome completo continua imediatamente ao lado, com o mesmo destaque de hoje. Ao entrar em edição, o ícone deixa de ser exibido e a célula fica só com o campo de nome. Cancelar restaura o ícone com o nome anterior. Salvar com sucesso restaura o ícone com o nome salvo. Falha ao salvar mantém a edição, sem ícone. Linhas de outras páginas, a lista vazia e a busca sem resultado não mostram o ícone. O ícone não recebe clique e não anuncia um texto próprio no lugar do nome.
- **Entradas e saídas:** Entrada: as confirmações já carregadas da lista (nome completo e demais dados que a linha já usa). Saída visual: ícone user round check verde ao lado do nome, só em visualização. Nenhuma saída nova de dado, mensagem ou total.
- **Dados/entidades envolvidos (conceitual):** Confirmação de presença já existente: nome completo, data em que confirmou, vínculo com o evento. O ícone não é um dado gravado e não muda o status da confirmação.
- **Estados e transições:**
  - Visualização: ícone verde + nome. É o estado inicial de cada linha listada.
  - Edição: só o campo de nome. O ícone não está na tela.
  - Cancelar: volta para visualização com o nome de antes e o ícone.
  - Salvar com sucesso: volta para visualização com o nome salvo e o ícone.
  - Salvar com falha: permanece em edição, sem ícone.
  - Lista sem confirmações ou busca sem resultado: nenhum ícone, estados vazios atuais.
- **Regras de negócio:** Regras 1 a 10 da seção 7. Em especial: um ícone só, sem círculo; verde fixo independente do tema; some na edição; igual para qualquer nome; decorativo.
- **Validações:** Não se aplica à marca em si. Ela não recebe texto nem escolha do organizador. As validações já existentes do nome, ao salvar a edição, continuam valendo e esta spec não as altera.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a ficha do evento e olha Gestão de Convidados.
  2. Em cada linha da página, vê o ícone user round check em verde e o nome ao lado, sem iniciais e sem círculo.
  3. Clica em Editar: o ícone some e o campo de nome aparece.
  4. Cancela ou salva: o ícone volta ao lado do nome que a linha passou a mostrar.
  5. Busca um nome ou muda de página: só as linhas daquela página, em visualização, mostram o ícone.
- **Casos de borda e erros:**
  - Nome com uma palavra, várias palavras ou muito curto: o ícone é o mesmo. Não há fallback de letras nem “?”.
  - Dois convidados com o mesmo nome: cada linha tem o seu ícone, como cada uma já tem o seu nome.
  - Tema claro e tema escuro: o verde não muda.
  - Edição aberta enquanto a busca ou a página mudam: ao voltar a exibir aquela linha em visualização, o ícone está presente. Se a linha segue em edição, o ícone continua oculto.
  - Falha ao salvar o nome: a linha não volta à visualização e o ícone não reaparece até cancelar ou salvar com sucesso.
  - Lista vazia ou busca sem resultado: nenhum ícone, textos vazios atuais.
  - Organizador sem acesso ao evento: continua sem ver a ficha, como hoje. Esta spec não abre a lista para mais ninguém.
- **Impacto no existente:** Some o círculo de iniciais na célula do nome da lista Gestão de Convidados. O restante da linha, do card e das outras telas permanece. A edição do nome continua sem marca ao lado do campo.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com ao menos uma confirmação, quando o organizador vê a lista em visualização, então cada linha da página mostra o ícone user round check em verde fixo ao lado do nome e não mostra iniciais, círculo, borda ou fundo nessa marca.
  - Dado o tema claro e o tema escuro, quando o organizador compara o ícone, então o verde é o mesmo e não é a cor de sucesso do tema.
  - Dado uma linha em visualização, quando o organizador clica em Editar, então o ícone deixa de aparecer e só o campo de nome fica na célula.
  - Dado uma linha em edição, quando o organizador cancela, então o ícone volta ao lado do nome anterior.
  - Dado uma linha em edição com nome válido, quando o salvamento conclui com sucesso, então o ícone volta ao lado do nome salvo.
  - Dado uma linha em edição, quando o salvamento falha, então a linha permanece em edição, sem ícone, e o aviso de erro atual é exibido.
  - Dado um nome de uma palavra, um nome curto ou dois nomes iguais, quando a linha está em visualização, então o ícone é o mesmo user round check verde das demais linhas.
  - Dado nenhuma confirmação, ou uma busca que não encontra nome, quando a lista mostra o estado vazio, então o ícone não aparece.
  - Dado a data, a busca, a paginação e as ações da linha, quando o organizador as usa depois da troca, então o comportamento delas permanece o de antes, exceto pela marca visual do nome.
- **Definição de pronto:** Na ficha do evento, a listagem de Gestão de Convidados mostra só o ícone user round check em verde fixo no lugar das iniciais, o ícone some durante a edição e volta ao cancelar ou ao salvar com sucesso, e o restante da lista segue utilizável como antes. A suposição do tom `#16a34a` está aplicada, ou um verde fixo equivalente se o contraste exigir, sem usar a cor do tema.
- **Dependências:** Nenhuma. A lista Gestão de Convidados já existe.
- **Fora do escopo desta spec:** Qualquer outra tela, foto de convidado, ícone condicionado a status, mudança de dados gravados, mudança das ações da linha e mudança da cor de sucesso global do tema.

## 14. Ordem recomendada de implementação

1. Spec 01 — Ícone verde no lugar das iniciais

Há uma única spec. Ela fecha o recorte inteiro: a lista já existe, e a troca não depende de outra entrega.
