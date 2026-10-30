# PRD — Organizadores nas configurações do evento

> Tipo: PRD de feature · Data: 2026-10-30
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

A lista **Organizadores** sai da ficha do evento e passa para o fim da página **Configurações do evento**.

Cada pessoa da lista mostra só a foto e o nome completo. Se o nome completo ainda não existir, mostra o e-mail no lugar do nome. O criador inclui alguém pelo botão **Adicionar**, que abre um modal com o e-mail e o botão **+**. Remover um organizador incluído e sair do evento continuam, com as mesmas confirmações de hoje.

Quem pode incluir, quem pode remover, quem pode sair e o que acontece com o acesso ao evento não mudam.

## 2. Problema que resolve

Quem administra o evento encontra os organizadores na ficha, entre as métricas e a exclusão, enquanto as demais decisões de administração já estão em **Configurações**. Incluir alguém também está sempre aberto na lista, com o e-mail repetido embaixo do nome.

A lista passa a ficar com as configurações do evento. Cada pessoa fica identificada pela foto e pelo nome. O e-mail só aparece quando ainda não há nome completo, e só é pedido na hora de incluir.

## 3. Público-alvo

O **criador** do evento, autenticado no painel, ao ver a lista, incluir uma conta e remover um organizador incluído.

O **organizador incluído**, autenticado no painel, ao ver a mesma lista e sair do evento.

A conta que abre um evento antigo ainda sem criador vê a lista, sem incluir, sem remover e sem sair.

O convidado da página pública não usa esta feature.

## 4. Objetivo do recorte atual

1. Tirar **Organizadores** da ficha e colocá-los no fim de **Configurações do evento**.
2. Mostrar, em cada pessoa, só a foto e o nome completo, ou só o e-mail quando o nome completo não existir.
3. Trocar o formulário aberto de inclusão pelo botão **Adicionar** e pelo modal com o e-mail e o **+**.
4. Manter remover, sair e as regras de quem pode fazer cada ação.

## 5. Funcionalidades

**Essenciais:**

- **Organizadores** deixa de aparecer na ficha.
- A seção **Organizadores** aparece no fim da página **Configurações do evento**, depois de layout, imagem, trecho do link, capacidade, janela, **Salvar**, encerrar ou reativar e **Personalizar**.
- Cada pessoa mostra a foto e um único texto: o nome completo, ou o e-mail se o nome completo não existir.
- O criador vê **Adicionar**. O botão abre um modal com o campo **E-mail do organizador** e o botão **+**.
- O **+** inclui a conta com as mesmas regras de hoje. No sucesso, o modal fecha e a pessoa aparece na lista.
- O criador continua removendo um organizador incluído, com confirmação, na linha dessa pessoa.
- O organizador incluído continua saindo por **Sair do evento**, com confirmação.
- O criador não sai e não é removido. O organizador incluído não inclui e não remove.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mudar quem cria o evento, quem vê o evento em **Meus Eventos** ou o que o organizador incluído pode alterar no restante do painel.
- Convidar por e-mail, pedir aceite ou cadastrar uma conta nova a partir do modal.
- Transferir a criação, limitar a quantidade de organizadores ou criar outro papel.
- Mostrar telefone, empresa ou, quando já existe nome completo, o e-mail ao lado do nome.
- Levar para **Configurações** a exclusão do evento, o card, as métricas ou a área de convidados.
- Mudar layout, imagem, trecho do link, capacidade, janela, encerrar, reativar ou **Personalizar**.
- Mudar **criado por:** em **Meus Eventos**, **Meu perfil** ou a página pública.
- Acrescentar uma área nova no menu lateral.

## 7. Regras de negócio

- Regra 1: **Organizadores** fica só na página **Configurações** daquele evento, no fim, depois do que essa página já mostra. A ficha continua com o card, as métricas e, para quem já pode, a exclusão. Não fica um espaço vazio no lugar da lista.
- Regra 2: Quem já pode abrir a ficha pode abrir **Configurações** e ver a seção. Quem não tem acesso ao evento não vê a seção e não conclui incluir, remover ou sair. O resultado é o mesmo de abrir a ficha sem acesso.
- Regra 3: A lista, quando carrega, mostra o criador primeiro e depois os organizadores incluídos, na ordem já usada. O criador sempre aparece. Não se mostra o selo **Criador**.
- Regra 4: O texto de cada pessoa é um só. É o nome e o sobrenome gravados em **Meu perfil**, nesta ordem. Faltando um dos dois, ou os dois, o texto é o e-mail da conta. Nome completo e e-mail não aparecem juntos. Telefone e empresa continuam ocultos.
- Regra 5: A foto é a foto de perfil da conta. Sem foto, ou se a foto não carregar, aparece a marca genérica de pessoa já usada quando não há foto de perfil.
- Regra 6: Só o criador vê **Adicionar** e só o criador conclui a inclusão. O organizador incluído e a conta num evento antigo sem criador não veem **Adicionar** e não concluem a inclusão.
- Regra 7: A inclusão usa o e-mail inteiro, sem considerar maiúsculas e minúsculas e ignorando espaços no começo e no fim. E-mail vazio, incompleto ou com formato inválido não é buscado. A mensagem é **Informe um e-mail válido.**
- Regra 8: Se não houver conta com aquele e-mail, a mensagem é **usuário não cadastrado.** e não há vínculo. Se a conta é a criadora ou já está incluída, a mensagem é **Este usuário já é organizador deste evento.** e não há duplicata. Se a conta existe e ainda não organiza o evento, o vínculo é criado na hora, sem aceite. Perfil sem nome não impede a inclusão.
- Regra 9: No sucesso, o sistema informa **Organizador adicionado.**, fecha o modal e a pessoa passa a aparecer na lista com foto e nome completo, ou com o e-mail se não houver nome completo. Fechar o modal sem **+** não inclui ninguém.
- Regra 10: Só o criador remove um organizador incluído, na linha dessa pessoa, depois da confirmação **Remover este organizador?**. Cancelar não muda o vínculo. Ninguém remove o criador. O sucesso informa **Organizador removido.** e a pessoa some da lista.
- Regra 11: Só o organizador incluído vê **Sair do evento**, na seção, depois da lista e do **Adicionar** quando esse botão existe. A confirmação continua **Sair deste evento?**. Cancelar permanece na página. O sucesso informa **Você saiu do evento.** e leva a **Meus Eventos**, já sem esse evento.
- Regra 12: Sair ou ser removido tira o acesso na hora. Confirmações, página pública e os outros organizadores permanecem. A volta só ocorre quando o criador inclui de novo o mesmo e-mail.
- Regra 13: Incluir, remover e sair não gravam layout, imagem, capacidade, janela, trecho do link nem tema. **Salvar**, **Alterar trecho**, encerrar, reativar e **Personalizar** não alteram organizadores.
- Regra 14: **Suposição:** incluir ou remover atualiza a lista e mantém na tela o que ainda não foi salvo em layout, imagem, capacidade e janela. Sair do evento deixa a página, então esse rascunho se perde.
- Regra 15: Se os organizadores não puderem ser carregados, a seção mostra **Organizadores indisponíveis** no lugar da lista. O restante de **Configurações** continua utilizável. O criador ainda vê **Adicionar**. Quem pode sair ainda vê **Sair do evento**.

## 8. Fluxos principais

### Fluxo 1 — Ver os organizadores nas configurações

1. O organizador abre o evento e entra em **Configurações**.
2. Depois das configurações que a página já tem, vê a seção **Organizadores**.
3. Cada pessoa aparece com a foto e o nome completo, ou com o e-mail se o nome completo não existir.
4. Na ficha desse evento, a seção não aparece. O card, as métricas e a exclusão de quem pode excluir continuam.

### Fluxo 2 — Incluir um organizador

1. O criador, na seção, clica em **Adicionar**.
2. O modal abre com o campo **E-mail do organizador** vazio e o botão **+**.
3. Informa o e-mail inteiro de uma conta já cadastrada e usa **+**.
4. O modal fecha, aparece **Organizador adicionado.** e a pessoa entra na lista.
5. Quando essa pessoa entra no painel, o evento está em **Meus Eventos**.

### Fluxo 3 — E-mail recusado

1. O criador abre **Adicionar** e usa **+** com um e-mail vazio, inválido, sem conta ou de alguém que já organiza o evento.
2. O modal permanece aberto, com o e-mail digitado e a mensagem correspondente.
3. A lista não muda.

### Fluxo 4 — Remover ou sair

1. O criador, na linha de um organizador incluído, pede para remover e confirma.
2. Aparece **Organizador removido.** A pessoa some da lista e deixa de ver o evento.
3. Em outro evento, o organizador incluído pede **Sair do evento** e confirma.
4. Aparece **Você saiu do evento.** Ele volta a **Meus Eventos**, já sem esse evento.

## 9. Critérios de aceite

- Na ficha, **Organizadores** não aparece. O card, as métricas e a exclusão de quem já pode excluir continuam.
- Em **Configurações do evento**, **Organizadores** aparece no fim, depois de **Personalizar**.
- Cada pessoa mostra só a foto e o nome completo. Sem nome completo, mostra a foto e o e-mail, e não os dois textos.
- O criador consegue abrir **Adicionar**, informar um e-mail de conta já cadastrada, confirmar com **+** e ver essa pessoa na lista com o modal fechado.
- O sistema deve responder **usuário não cadastrado.** quando o e-mail não pertence a nenhuma conta, e **Este usuário já é organizador deste evento.** quando a conta já organiza o evento, sem criar outro vínculo.
- O sistema deve impedir o organizador incluído de incluir ou remover, e deve continuar permitindo que ele saia.
- O sistema não deve deixar ninguém remover o criador, nem o criador sair do evento.
- Quando a conta sai ou é removida, o sistema deve esconder o evento dessa conta na hora e só devolvê-lo se o criador incluir o mesmo e-mail de novo.
- Incluir ou remover não deve salvar nem apagar, por conta própria, layout, imagem, capacidade, janela, trecho do link ou tema.

## 10. Stack

A stack já existente do Confirm Event: Next.js, React, TypeScript, Tailwind, shadcn/ui, React Hook Form, Zod, Supabase (Auth e Postgres) e o painel do organizador.

O modal usa o diálogo já adotado no painel. Não entra serviço novo de e-mail, cadastro ou fila.

## 11. Justificativa da stack

A lista, a inclusão pelo e-mail, a remoção, a saída e a página de configurações já existem. A entrega muda o lugar da lista, o que cada pessoa mostra e a forma de abrir a inclusão. A conta, o perfil e o vínculo com o evento continuam os mesmos.

## 12. Fases de construção

### Fase 1 — Organizadores nas configurações

Objetivo: a lista sair da ficha, ficar no fim de **Configurações**, identificar cada pessoa só pela foto e pelo nome ou e-mail, e passar a inclusão para o modal, sem mudar quem pode incluir, remover ou sair.
Specs:

- Spec 01 — Levar a lista para o fim de Configurações
- Spec 02 — Foto, nome e inclusão pelo modal

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Levar a lista para o fim de Configurações

- **Fase:** Fase 1 — Organizadores nas configurações
- **Objetivo (o quê):** **Organizadores** deixa de ser exibido na ficha e passa a ser a última seção da página **Configurações do evento**, com ver, incluir, remover e sair ainda possíveis para quem já pode.
- **Intenção (por quê):** A ficha mistura a ocasião do evento com a administração das pessoas. **Configurações** já é o lugar das decisões de administração. A lista precisa estar lá antes de a apresentação e o modal mudarem, para incluir, remover e sair não ficarem sem lugar.
- **Contexto:** A ficha do evento já mostra, nesta ordem, o card, as métricas de confirmados, **Organizadores** e, para quem pode, a exclusão. Se as presenças não carregam, o aviso **Presenças indisponíveis** fica no lugar das métricas; organizadores e exclusão continuam. A página **Configurações do evento** já reúne, nesta ordem, layout da página, imagem, trecho do link, capacidade máxima, início e fim da janela, **Salvar**, encerrar ou reativar e **Personalizar**. O menu lateral continua ao lado, com **Configurações** marcada como área atual só nessa página. Hoje a lista mostra foto, nome, o selo **Criador** no criador, o e-mail numa segunda linha, a remoção na linha de quem foi incluído e **Sair do evento** para o organizador incluído. A inclusão é um formulário aberto na seção, com o campo **E-mail do organizador** e o botão **Adicionar**. Uma descrição anterior da área de convidados ainda diz que os organizadores permanecem na ficha. Esta spec substitui essa parte: eles saem da ficha. A forma final da linha e o modal são a Spec 02. Até a Spec 02, a seção que muda de lugar é a que já existe.
- **Atores:** Criador, organizador incluído e conta que abre um evento antigo sem criador. Quem não tem acesso ao evento não entra.
- **Descrição do comportamento:** Abrir **Configurações** mostra a página como ela já é e, depois de **Personalizar**, a seção **Organizadores**. A ficha desse evento não renderiza mais a seção. A ordem do que resta na ficha é card, métricas e exclusão. A exclusão só aparece para quem já pode excluir. Não sobra faixa vazia entre as métricas e a exclusão, nem no fim da ficha quando não há exclusão. Na seção movida, o título continua **Organizadores**. A frase para o criador continua **Inclua contas já cadastradas para organizar este evento com você.** Para o organizador incluído e para o evento antigo sem criador, a frase continua **Quem organiza este evento.** A lista, o formulário de inclusão, a remoção e **Sair do evento** continuam com o efeito que já têm, só que dentro de **Configurações**. O criador vê o formulário. O organizador incluído não vê o formulário e vê **Sair do evento**. A conta do evento antigo não vê o formulário nem **Sair do evento**. **Salvar** e as outras ações da página não passam a incluir ou remover pessoas. Incluir, remover e sair não passam a gravar layout, imagem, capacidade, janela, trecho ou tema.
- **Entradas e saídas:** A entrada é o evento já aberto por quem tem acesso, na página de configurações. A saída é a seção no fim dessa página e a ausência dela na ficha. Incluir ainda recebe o e-mail inteiro e devolve a pessoa na lista ou uma das mensagens já usadas: **Organizador adicionado.**, **usuário não cadastrado.**, **Este usuário já é organizador deste evento.**, **Informe um e-mail válido.** Remover e sair devolvem **Organizador removido.** e **Você saiu do evento.**
- **Dados/entidades envolvidos (conceitual):** O evento. A conta criadora. Cada organizador incluído, ligado àquele evento. De cada conta: foto de perfil, nome, sobrenome e e-mail. O papel de quem está vendo: criador, organizador incluído ou conta de evento antigo sem criador.
- **Estados e transições:** A pessoa entra na lista quando o criador inclui o e-mail de uma conta que ainda não organiza o evento, e sai da lista quando é removida ou quando sai. O criador permanece na lista. Essas transições já existem e não mudam nesta spec. O que muda é o lugar em que a lista é vista.
- **Regras de negócio:**
  - A seção só existe em **Configurações** daquele evento, depois de **Personalizar**.
  - O criador inclui e remove. Não sai e não é removido.
  - O organizador incluído não inclui e não remove. Pode sair só daquele evento.
  - A conta de um evento antigo sem criador só vê a lista.
  - E-mail vazio ou inválido, conta inexistente e conta que já organiza o evento não criam vínculo.
  - A inclusão é imediata, sem aceite e sem mensagem para a outra pessoa.
  - Sair ou ser removido tira o acesso na hora. A pessoa só volta se o criador incluir o mesmo e-mail de novo.
  - **Suposição:** incluir ou remover atualiza a lista e mantém na página o rascunho ainda não salvo de layout, imagem, capacidade e janela. Sair do evento vai para **Meus Eventos** e esse rascunho se perde.
- **Validações:** As mesmas já usadas na inclusão: e-mail inteiro, no máximo o tamanho já aceito, sem busca se estiver vazio ou inválido. Remover e sair exigem a confirmação já existente. Cancelar a confirmação não altera o vínculo.
- **Fluxo do usuário (passo a passo):**
  1. Abre a ficha e não vê **Organizadores**. Vê o card, as métricas e, se puder, a exclusão.
  2. Abre **Configurações** pelo menu ou pelo caminho que já usa.
  3. Rola até o fim e encontra **Organizadores**, com as pessoas, e com incluir, remover ou sair conforme o papel.
  4. Se incluir, remover ou sair, o efeito é o de hoje, com as mesmas mensagens e confirmações.
- **Casos de borda e erros:**
  - Sem acesso ao evento: não vê a ficha, não vê **Configurações** e não conclui incluir, remover ou sair. A mensagem de falta de acesso continua **Você não tem acesso a este evento.**
  - Organizador incluído tenta incluir ou remover: não há controle para isso. Se a ação for tentada mesmo assim, a mensagem continua **Você não pode alterar os organizadores deste evento.**
  - Lista indisponível: no lugar das pessoas aparece **Organizadores indisponíveis**, com o motivo **Não foi possível carregar os organizadores.** O criador ainda pode tentar incluir. Quem pode sair ainda vê **Sair do evento**. O restante da página de configurações não é substituído por esse aviso.
  - Presenças indisponíveis: a ficha mostra **Presenças indisponíveis** no lugar das métricas. Isso não traz **Organizadores** de volta para a ficha.
  - Falha ao incluir, remover ou sair: a mensagem de falha já usada permanece, e o vínculo não muda. Incluir: **Não foi possível adicionar o organizador. Tente de novo.** Remover: **Não foi possível remover o organizador.** Sair: **Não foi possível sair do evento.**
  - Confirmação de remover ou sair cancelada: a pessoa continua na lista e na página.
  - **Personalizar** aberto, trecho ainda não confirmado ou campos de **Salvar** ainda não gravados: a seção de organizadores não envia esse rascunho. **Suposição:** o rascunho continua na tela depois de incluir ou remover.
- **Impacto no existente:** **Organizadores** sai da ficha e entra no fim de **Configurações**. Card, métricas, exclusão, menu lateral, página pública e **Meus Eventos** permanecem. A frase da área de convidados que mantinha os organizadores na ficha deixa de valer. Até a Spec 02, a linha ainda mostra selo **Criador**, e-mail embaixo do nome e o formulário aberto com o botão **Adicionar**.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um organizador com acesso ao evento, quando ele abre a ficha, então **Organizadores** não aparece, e o card, as métricas e a exclusão de quem pode excluir continuam.
  - Dado a página **Configurações do evento**, quando ela é exibida, então **Organizadores** é a última seção, depois de **Personalizar**.
  - Dado o criador nessa seção, quando ele inclui um e-mail de conta ainda não organizadora, então a pessoa entra na lista e o aviso é **Organizador adicionado.**
  - Dado o criador, quando ele confirma a remoção de um organizador incluído, então a pessoa some da lista e o aviso é **Organizador removido.**
  - Dado o organizador incluído, quando ele confirma **Sair do evento**, então vai para **Meus Eventos** sem esse evento e o aviso é **Você saiu do evento.**
  - Dado o organizador incluído ou a conta de um evento antigo sem criador, quando a seção é exibida, então não há formulário de inclusão nem remoção. **Sair do evento** só aparece para o organizador incluído.
- **Definição de pronto:** A ficha não mostra a seção. **Configurações** mostra a seção no fim. Incluir, remover e sair funcionam como antes, para os mesmos papéis, com as mesmas mensagens. O restante da página de configurações continua gravando só o que já gravava.
- **Dependências:** Nenhuma. Usa a lista, a inclusão, a remoção, a saída e a página de configurações já existentes.
- **Fora do escopo desta spec:** Tirar o selo **Criador**, esconder o e-mail de quem já tem nome completo e trocar o formulário pelo modal. Isso é a Spec 02. Também ficam de fora a exclusão do evento, os convidados, a página pública e **criado por:** em **Meus Eventos**.

### Spec 02 — Foto, nome e inclusão pelo modal

- **Fase:** Fase 1 — Organizadores nas configurações
- **Objetivo (o quê):** Cada organizador passa a ser identificado só pela foto e pelo nome completo, ou pelo e-mail quando não há nome completo, e o criador passa a incluir pelo botão **Adicionar**, que abre um modal com o e-mail e o **+**.
- **Intenção (por quê):** A linha não precisa repetir o e-mail de quem já tem nome, nem marcar o criador com um selo, para a pessoa ser reconhecida. O e-mail só é necessário na hora de incluir, então o campo deixa de ficar aberto o tempo todo.
- **Contexto:** A Spec 01 já colocou **Organizadores** no fim de **Configurações** e tirou a seção da ficha. Até aqui a linha ainda tem foto, nome, selo **Criador**, e-mail embaixo e, para o criador, o formulário aberto com **E-mail do organizador** e o botão **Adicionar**. Remover continua na linha de quem foi incluído. **Sair do evento** continua na seção para o organizador incluído. As regras de quem pode incluir, remover e sair, e as mensagens de sucesso e de recusa, já existem e permanecem. Esta spec muda a identificação de cada pessoa e substitui o formulário pelo modal.
- **Atores:** O criador, ao olhar a lista e ao incluir. O organizador incluído e a conta do evento antigo, ao olhar a lista. O organizador incluído, ao sair. Quem não tem acesso não vê a seção.
- **Descrição do comportamento:** Na seção, cada pessoa é uma linha com a foto à esquerda e um único texto à direita. O texto é o nome completo. Sem nome completo, o texto é o e-mail. Não há segunda linha, não há selo **Criador** e não há e-mail ao lado de um nome completo. A foto continua a pequena foto de perfil já usada nessa lista. O criador não tem ação na própria linha. Na linha de um organizador incluído, o criador continua com a ação de remover, com a mesma confirmação de hoje. O texto dessa confirmação usa o mesmo texto que identifica a pessoa na lista, nome completo ou e-mail. O organizador incluído não vê remover em linha nenhuma e continua vendo **Sair do evento** no fim da seção. No lugar do formulário aberto, o criador vê o botão **Adicionar**, depois da lista e antes de **Sair do evento** quando essa ação existe. **Adicionar** abre o modal **Adicionar organizador**. Dentro há só o campo **E-mail do organizador** e o botão **+**. Não há outro botão de confirmar. A orientação **Informe o e-mail inteiro de uma conta já cadastrada.** aparece enquanto o campo está válido. O **+** tenta a inclusão com as regras já usadas. Enquanto a tentativa não termina, outro **+** não dispara uma segunda inclusão. No sucesso, o modal fecha, o campo é esquecido, aparece **Organizador adicionado.** e a pessoa entra na lista com foto e nome completo, ou e-mail. No recuso ou na falha, o modal fica aberto, o e-mail digitado permanece e a mensagem aparece no campo quando for do e-mail, e no aviso já usado no painel. Fechar o modal sem **+** descarta o que foi digitado e não muda a lista. Abrir de novo começa com o campo vazio.
- **Entradas e saídas:** A entrada da inclusão é o e-mail digitado no modal, disparado pelo **+**. A saída no sucesso é a pessoa nova na lista, o modal fechado e **Organizador adicionado.** A saída no recuso é o modal aberto e uma destas mensagens: **Informe um e-mail válido.**, **usuário não cadastrado.** ou **Este usuário já é organizador deste evento.** A lista, para quem olha, mostra foto e um texto por pessoa. Remover e sair devolvem o mesmo resultado que já devolvem.
- **Dados/entidades envolvidos (conceitual):** Cada organizador do evento: foto de perfil, nome, sobrenome e e-mail. O nome completo é nome e sobrenome gravados, os dois presentes. O vínculo da conta com o evento, e se essa conta é a criadora. O e-mail informado no modal, antes de virar vínculo.
- **Estados e transições:** O modal está fechado ou aberto. Aberto, a inclusão está ociosa ou em andamento. O sucesso leva a fechado e acrescenta a pessoa à lista. O recuso permanece aberto. Fechar sem **+** volta a fechado sem nova pessoa. A linha não tem mais o estado visual de criador por selo: o criador é a pessoa sem remoção, e só o criador vê essa remoção nas outras.
- **Regras de negócio:**
  - O texto visível de cada pessoa é só o nome completo, ou só o e-mail. Vale a Regra 4 da seção 7.
  - Sem foto utilizável, a marca genérica de pessoa ocupa o lugar da foto. A linha não fica sem esse lugar.
  - **Adicionar** e o **+** existem só para o criador. O organizador incluído e a conta do evento antigo não os veem.
  - O **+** segue as Regras 7 e 8 da seção 7. Sucesso segue a Regra 9.
  - Remover e sair seguem as Regras 10, 11 e 12. A Spec 02 não tira essas ações da seção.
  - A frase da seção permanece: para o criador, **Inclua contas já cadastradas para organizar este evento com você.** Para os outros, **Quem organiza este evento.**
  - **Suposição:** o sucesso do **+** ou a remoção atualiza a lista sem apagar o rascunho ainda não salvo de layout, imagem, capacidade e janela, e sem disparar **Salvar**.
- **Validações:** Antes de buscar a conta, o e-mail é aparado, não pode ficar vazio e precisa ter formato de e-mail. Espaço nas pontas não conta. Maiúsculas e minúsculas não distinguem a conta. E-mail inválido mostra **Informe um e-mail válido.** no campo e não cria vínculo. Durante a tentativa, o **+** não aceita outra inclusão.
- **Fluxo do usuário (passo a passo):**
  1. Em **Configurações**, no fim da página, o criador vê cada pessoa só com foto e nome completo, ou foto e e-mail.
  2. Clica em **Adicionar**.
  3. No modal, informa o e-mail e clica em **+**.
  4. Se a conta puder entrar, o modal fecha e a pessoa aparece na lista.
  5. Para remover, usa a ação na linha de um incluído e confirma. Para sair, o incluído usa **Sair do evento** e confirma.
- **Casos de borda e erros:**
  - Nome ou e-mail longo: o texto fica em uma linha só. O que não couber é cortado como já acontece nessa lista.
  - Só o nome, ou só o sobrenome, gravado no perfil: a linha mostra o e-mail, não a parte que existe.
  - A pessoa atualiza nome, sobrenome ou foto em **Meu perfil**: a próxima vez que a lista carrega mostra o texto e a foto novos.
  - E-mail do próprio criador, ou de alguém já incluído: o modal permanece e informa **Este usuário já é organizador deste evento.**
  - E-mail sem conta: o modal permanece e informa **usuário não cadastrado.**
  - Fechar o modal no meio da digitação, ou com erro na tela: nada é incluído. A próxima abertura começa vazia.
  - Falha depois do **+**: o modal permanece, o e-mail permanece e o aviso é **Não foi possível adicionar o organizador. Tente de novo.**
  - Lista indisponível: não há linhas. O criador ainda vê **Adicionar**. Um sucesso que fizer a lista voltar mostra as pessoas no formato novo. Se o aviso continuar, a inclusão já confirmada não é desfeita.
  - Organizador incluído: não vê **Adicionar** nem remover. Vê foto e texto de cada pessoa, e **Sair do evento**.
  - Remover o criador ou sair sendo o criador: não há ação. A tentativa direta continua recusada, sem mudar o vínculo.
  - Duas inclusões seguidas no mesmo modal: a primeira, se der certo, fecha o modal. A pessoa abre **Adicionar** de novo para a próxima, com o campo vazio.
- **Impacto no existente:** Some o selo **Criador**. Some o e-mail de quem tem nome completo. O formulário aberto e o botão **Adicionar** de dentro do formulário são substituídos pelo botão **Adicionar** da seção e pelo modal com **+**. O lugar da seção, a ficha, remover, sair, as mensagens e o acesso ao evento permanecem como na Spec 01. **Meus Eventos** continua podendo mostrar o e-mail em **criado por:** quando o criador não tem nome completo. Isso não faz o e-mail reaparecer na linha de quem já tem nome.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um organizador com nome e sobrenome gravados, quando a lista é exibida, então a linha mostra a foto e esse nome completo, sem e-mail e sem o selo **Criador**.
  - Dado um organizador sem nome, sem sobrenome ou só com um dos dois, quando a lista é exibida, então a linha mostra a foto e o e-mail, e não mostra um nome parcial.
  - Dado um organizador sem foto de perfil, quando a lista é exibida, então o lugar da foto mostra a marca genérica de pessoa.
  - Dado o criador, quando ele clica em **Adicionar**, então abre o modal **Adicionar organizador** com o campo **E-mail do organizador** vazio e o botão **+**, sem outro botão de confirmar.
  - Dado o modal com um e-mail de conta que ainda não organiza o evento, quando o criador usa **+**, então o modal fecha, a pessoa aparece na lista e o aviso é **Organizador adicionado.**
  - Dado o modal com e-mail vazio, inválido, sem conta ou de quem já organiza o evento, quando o criador usa **+**, então o modal permanece aberto e a lista não ganha outra pessoa.
  - Dado o criador fecha o modal sem **+**, quando a seção é vista de novo, então a lista está como antes e o próximo **Adicionar** abre o campo vazio.
  - Dado o organizador incluído, quando a seção é exibida, então não há **Adicionar**, não há remoção nas linhas e há **Sair do evento**.
  - Dado o criador com layout, imagem, capacidade ou janela ainda não salvos, quando ele inclui ou remove um organizador com sucesso, então a lista atualiza e esse rascunho continua na página.
- **Definição de pronto:** Nenhuma linha mostra selo ou e-mail junto de um nome completo. O criador inclui só pelo modal e pelo **+**. Remover e sair continuam nas mesmas mãos de antes, com as mesmas confirmações. A seção segue no fim de **Configurações** e fora da ficha.
- **Dependências:** Spec 01 — a seção já está no fim de **Configurações** e já não está na ficha. Desta spec depende esse lugar; a identificação da linha e o modal são o que esta spec entrega.
- **Fora do escopo desta spec:** Mudar o texto das confirmações de remover e sair, além de usar o nome ou o e-mail já mostrado na linha. Mudar quem pode incluir, remover ou sair. Criar conta, enviar e-mail ou pedir aceite. Voltar a lista para a ficha. Alterar o que **Salvar**, **Alterar trecho**, encerrar, reativar e **Personalizar** gravam.

## 14. Ordem recomendada de implementação

1. Spec 01 — Levar a lista para o fim de Configurações
2. Spec 02 — Foto, nome e inclusão pelo modal

A Spec 01 tira a lista da ficha e a entrega inteira em **Configurações**, com incluir, remover e sair ainda utilizáveis. A Spec 02 só então simplifica a linha e troca o formulário pelo modal. Fazer a Spec 02 antes deixaria o modal e a linha nova sem o lugar definitivo, ou os aplicaria ainda na ficha.
