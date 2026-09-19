# PRD — Confirm Event

> Tipo: PRD inicial · Data: 2026-09-19
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

Sistema web para o organizador criar **vários eventos** e receber confirmação de presença de cada convidado.

O produto é **genérico**: o mesmo fluxo serve para qualquer tipo de evento (reunião, workshop, confraternização, lançamento, encontro, cerimônia, etc.). O **título** e os **detalhes** descrevem o que é o evento; o sistema **não** tem tipos, categorias nem fluxos especiais por ocasião.

O convidado abre o **link daquele evento**, vê as informações (título, detalhes, data, horário e local), informa o **nome completo** e clica em **“Eu vou!”**.

O organizador entra na **área administrativa com login** (uma conta), gerencia os eventos, copia ou personaliza o link de cada um, consulta **quantas pessoas confirmaram** naquele evento, vê os **nomes**, e pode **editar ou remover** uma confirmação.

## 2. Problema que resolve

Quem organiza um evento precisa saber **quem vai** antes do dia, sem planilha, grupo ou mensagem solta. O convidado precisa de um jeito rápido de confirmar: nome e um botão.

Hoje isso seria controle manual. Passa a ser: organizador cria o evento → gera um link → envia o link na mão (WhatsApp, e-mail, etc.) → convidado confirma → organizador acompanha a lista daquele evento.

## 3. Público-alvo

- **Organizador** — uma única conta; cria e configura eventos, envia o link manualmente, consulta e ajusta as confirmações.
- **Convidados** — usam só a página pública do evento, sem login.

Não é um produto para vários organizadores nem um SaaS multi-conta.

## 4. Objetivo do recorte atual

Entregar a página pública de confirmação (por evento, via link próprio) e a área administrativa (login com recuperação de senha, vários eventos, edição dos dados e do link, totais, listagem, edição e exclusão de nomes, exclusão de evento). Sem recusa de presença, sem envio automático de convite e sem cadastro público de conta.

## 5. Funcionalidades

**Essenciais:**

- Página pública do evento com título, detalhes (se houver), data, horário e local.
- Campo de nome completo e botão **“Eu vou!”**.
- Área administrativa com login (e-mail e senha).
- Recuperação de senha do organizador.
- Organizador cria mais de um evento.
- Após o login, o organizador escolhe um evento e vê **somente** aquele evento (dados, link, totais e lista).
- Edição de título, detalhes, data, horário e local.
- Link único por evento, gerado automaticamente, que o organizador copia e pode alterar; trechos antigos redirecionam para o atual.
- Quantidade total de confirmados **daquele** evento.
- Listagem dos nomes confirmados naquele evento.
- Organizador edita o nome de uma confirmação.
- Organizador remove uma confirmação da lista.
- Organizador exclui um evento (some o link público e as confirmações daquele evento).

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Opção **“não vou”**.
- Convidado cancelar ou alterar a própria confirmação.
- Envio automático de convite por e-mail, WhatsApp ou SMS (o organizador **copia o link** e envia como quiser).
- Convidado ver a lista de outros confirmados.
- Exportar planilha.
- Cadastro público de conta e vários organizadores.
- App celular nativo.
- Acompanhantes no mesmo envio.
- Várias listas ou categorias de convidados no mesmo evento (cada evento tem **uma** lista).
- Tipos de evento no sistema (o título e os detalhes bastam para descrever a ocasião).
- Campos separados de nome e sobrenome.
- Limite máximo de confirmações por evento.
- Desfazer exclusão de evento.

## 7. Regras de negócio

- Regra 1: Existe **uma única conta** de organizador. Convidado não faz login.
- Regra 2: Sem sessão válida, ninguém acessa a área administrativa.
- Regra 3: O organizador pode ter **vários eventos**. Totais, lista, edição e link são **sempre do evento selecionado**.
- Regra 4: Para **criar** um evento são obrigatórios: **título, data, horário e local**. **Detalhes** é opcional.
- Regra 5: Ao criar, o sistema gera um **trecho de link único**. O organizador pode alterá-lo depois.
- Regra 6: O trecho do link é **único no sistema**: não pode coincidir com o trecho **atual** nem com o **histórico** de outro evento.
- Regra 7: **Suposição:** o trecho aceita letras, números e hífen; sem espaços; não pode ser vazio nem só hífens.
- Regra 8: Se o organizador alterar o trecho, **todos** os trechos anteriores daquele evento **redirecionam** para o trecho atual (vale mesmo após várias alterações).
- Regra 9: A confirmação é **só de presença**. Não existe recusa.
- Regra 10: Cada envio na página pública grava **uma pessoa** (o nome informado). Não há acompanhantes.
- Regra 11: **Nomes repetidos são permitidos** no mesmo evento (dois “João Silva” viram duas linhas).
- Regra 12: O convidado **não** cancela nem edita a confirmação depois de enviar.
- Regra 13: Só o **organizador** edita o nome ou remove uma confirmação daquele evento.
- Regra 14: Editar o nome altera **somente aquela linha**; não mescla com outra confirmação; continua valendo a regra 11.
- Regra 15: Remover uma confirmação diminui o total em 1 e tira aquela linha da lista. Não desfaz outras.
- Regra 16: Excluir um evento **apaga** o evento, as confirmações e o histórico de trechos daquele evento. Os trechos ficam **livres** para reuso. Não há desfazer neste recorte.
- Regra 17: Link de evento inexistente ou já excluído **não** aceita confirmação; o visitante vê que o evento não está disponível.
- Regra 18: A **data** do evento **não pode ser anterior ao dia corrente**. Vale na criação e quando o organizador **altera** a data. Evento cuja data já passou (o tempo andou) continua existindo; o organizador pode editar título, detalhes, horário, local e link sem ser obrigado a mudar a data — mas **não** pode gravar uma data nova que já ficou no passado.
- Regra 19: **Suposição:** “detalhes” é um texto livre opcional de descrição do evento. Se estiver vazio, a página pública **não** inventa um texto no lugar.
- Regra 20: **Suposição:** depois do sucesso, o convidado pode confirmar **outro** nome no mesmo evento (um envio por vez).
- Regra 21: Recuperação de senha é só para a conta do organizador, por e-mail.

## 8. Fluxos principais

### Fluxo 1 — Organizador entra e cria um evento

1. Acessa a área administrativa.
2. Informa e-mail e senha.
3. Vê a lista de eventos (vazia na primeira vez).
4. Cria um evento com título, data, horário e local (detalhes opcional).
5. O sistema grava o evento e gera o link.
6. O organizador entra na área daquele evento.

### Fluxo 2 — Organizador configura e envia o link

1. Com o evento selecionado, vê e pode editar título, detalhes, data, horário e local.
2. Vê o link atual e **copia**.
3. Se quiser, altera o trecho do link; o sistema valida unicidade e passa a usar o novo; os antigos redirecionam.
4. Envia o link atual aos convidados por fora do sistema.

### Fluxo 3 — Convidado confirma presença

1. Abre o link do evento (atual ou um trecho antigo que redireciona).
2. Vê título, detalhes (se houver), data, horário e local.
3. Informa o nome completo.
4. Clica em **“Eu vou!”**.
5. O sistema grava a confirmação e mostra que deu certo.

### Fluxo 4 — Organizador consulta e ajusta as presenças

1. Faz login, escolhe o evento.
2. Vê o total de confirmados e a lista de nomes daquele evento.
3. Se precisar, edita um nome ou remove uma linha.
4. Total e lista passam a refletir a alteração.

### Fluxo 5 — Organizador exclui um evento

1. No evento selecionado, pede para excluir.
2. Confirma a exclusão de forma explícita.
3. Evento, confirmações e links daquele evento deixam de existir.
4. Volta para a lista de eventos.
5. Quem abrir um link antigo daquele evento vê que não está disponível.

### Fluxo 6 — Organizador recupera a senha

1. Na entrada, pede para recuperar a senha.
2. Informa o e-mail.
3. Recebe instrução por e-mail (quando o e-mail é o da conta).
4. Define uma senha nova.
5. Entra com e-mail e a senha nova.

## 9. Critérios de aceite

- O organizador consegue entrar com e-mail e senha; sem login, não acessa o painel.
- O organizador consegue recuperar a senha por e-mail e entrar com a senha nova.
- O organizador consegue criar vários eventos; cada um tem título, data, horário, local e um link próprio.
- O organizador consegue editar título, detalhes, data, horário e local do evento selecionado.
- O sistema não deve aceitar data anterior ao dia corrente na criação nem ao alterar a data.
- O organizador consegue copiar o link e alterar o trecho; trechos antigos daquele evento redirecionam para o atual.
- O convidado consegue abrir o link, ver as informações do evento, informar o nome completo e confirmar com **“Eu vou!”**.
- O sistema deve aceitar o mesmo nome mais de uma vez no mesmo evento.
- O sistema não deve oferecer “não vou” nem deixar o convidado cancelar.
- O organizador vê a quantidade e os nomes **só do evento selecionado**.
- O organizador consegue editar o nome de uma confirmação e remover uma confirmação.
- Quando o evento é excluído, o sistema deve apagar as confirmações daquele evento e encerrar os links (atual e antigos).
- O sistema não deve misturar lista ou total de um evento com outro.
- O sistema não deve exigir tipo de evento nem categoria de convidado: título e detalhes descrevem a ocasião.

## 10. Stack

Em alto nível (já presente no projeto):

- **Next.js + TypeScript + Tailwind CSS** — interface web (página pública e área administrativa).
- **Supabase** — autenticação (e-mail, senha e recuperação de senha) e persistência de eventos, trechos de link e confirmações.

Nada além disso é exigido neste recorte: o envio do convite é manual (copiar o link). A recuperação de senha usa o e-mail já previsto pela autenticação existente.

## 11. Justificativa da stack

O repositório já usa Next.js com TypeScript e Tailwind, e já usa Supabase para login e dados. Este recorte continua precisando de **página web**, **login** e **guardar** eventos + presenças. Trocar a base seria desproporcional. Recuperação de senha cabe na autenticação que o projeto já escolheu.

## 12. Fases de construção

### Fase 1 — Acesso do organizador

Objetivo: só o organizador entra no painel e consegue recuperar a senha da conta única.
Specs:

- Spec 01 — Login do organizador
- Spec 02 — Recuperação de senha

### Fase 2 — Eventos

Objetivo: o organizador cria, configura, personaliza o link e exclui eventos.
Specs:

- Spec 03 — Listar e criar evento
- Spec 04 — Configurar evento e link
- Spec 05 — Excluir evento

### Fase 3 — Confirmação pública

Objetivo: o convidado confirma presença pelo link daquele evento.
Specs:

- Spec 06 — Página pública e confirmação “Eu vou!”

### Fase 4 — Presenças no painel

Objetivo: o organizador vê o total e os nomes do evento selecionado, e ajusta a lista.
Specs:

- Spec 07 — Totais, listagem, editar e remover nomes

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Login do organizador

- **Fase:** Fase 1 — Acesso do organizador
- **Objetivo (o quê):** Garantir que só o organizador, com e-mail e senha válidos, acesse a área administrativa. O convidado permanece na página pública, sem conta.
- **Intenção (por quê):** Lista de quem vai, totais e dados dos eventos não devem ser públicos. Uma conta só evita gestão de vários usuários neste recorte.
- **Contexto:** Depois do login, o destino é a **lista de eventos** (Spec 03). A página pública (Spec 06) continua aberta, sem login. Recuperação de senha é a Spec 02.
- **Atores:** Organizador (única conta). Convidado não usa esta spec.
- **Descrição do comportamento:** Existe uma conta de organizador já definida (não há tela pública de “criar conta”). Na entrada da área administrativa, o sistema pede e-mail e senha. Credenciais corretas: o organizador entra e vê a lista de eventos (Spec 03). Credenciais incorretas: não entra e vê aviso de erro, **sem** revelar se o problema é o e-mail ou a senha. Sem sessão válida, qualquer tentativa de abrir a área administrativa (lista, evento, totais, exclusão) leva de volta à entrada de login. De dentro do painel, o organizador pode sair; ao sair, deixa de acessar até autenticar de novo. Na mesma entrada, há o caminho para recuperar senha (Spec 02).
- **Entradas e saídas:**
  - Entrada: e-mail e senha informados pelo organizador.
  - Saída em sucesso: sessão autenticada; acesso à lista de eventos.
  - Saída em falha: permanece na entrada; mensagem de que não foi possível entrar.
  - Saída ao sair: sessão encerrada; área administrativa inacessível.
- **Dados/entidades envolvidos (conceitual):** Conta do organizador (e-mail, senha). Sessão de acesso (autenticado ou não).
- **Estados e transições:** Não autenticado → (login válido) autenticado no painel → (sair ou sessão inválida) não autenticado.
- **Regras de negócio:** Regras 1 e 2. Sem cadastro público. Área administrativa exige sessão válida.
- **Validações:** E-mail e senha obrigatórios para tentar entrar. Não aceitar tentativa vazia.
- **Fluxo do usuário (passo a passo):**
  1. Abre a entrada da área administrativa.
  2. Informa e-mail e senha.
  3. Envia.
  4. Se válido, vê a lista de eventos; se inválido, vê erro e pode tentar de novo.
  5. Pode sair do painel quando quiser.
- **Casos de borda e erros:**
  - Campos vazios: não entra; pede para preencher.
  - E-mail ou senha errados: não entra; mensagem genérica de falha.
  - Acesso direto a qualquer tela administrativa sem login: redirecionado para a entrada; não vê eventos, totais nem nomes.
  - Sessão expirada no meio do uso: volta a pedir login; não altera eventos nem confirmações.
- **Impacto no existente:** O produto atual já tem login de uma conta. O destino após o login passa a ser a lista de eventos (não um único evento). A conta única permanece.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado e-mail e senha corretos da conta do organizador, quando envia o login, então entra na área administrativa.
  - Dado e-mail ou senha incorretos, quando envia o login, então não entra e vê mensagem de erro genérica.
  - Dado que não está autenticado, quando tenta abrir lista, evento, totais ou exclusão, então é levado à entrada de login e não vê esses dados.
  - Dado que está no painel, quando sai, então precisa autenticar de novo para voltar.
- **Definição de pronto:** Organizador entra e sai com a conta única; visitante sem senha não vê o painel. Caminhos de sucesso e de erro conferidos manualmente.
- **Dependências:** Nenhuma.
- **Fora do escopo desta spec:** Recuperação de senha (Spec 02), cadastro de novas contas, vários organizadores, criar/editar eventos, página pública de confirmação.

### Spec 02 — Recuperação de senha

- **Fase:** Fase 1 — Acesso do organizador
- **Objetivo (o quê):** Permitir que o organizador defina uma senha nova quando não conseguir entrar, usando o e-mail da conta.
- **Intenção (por quê):** Há uma conta só; se a senha for esquecida, o produto inteiro fica inacessível. Recuperação evita depender de intervenção técnica manual.
- **Contexto:** Parte da entrada da Spec 01. Não cria conta nova. Não altera eventos nem confirmações.
- **Atores:** Organizador (titular do e-mail da conta). Convidado não usa esta spec.
- **Descrição do comportamento:** Na entrada de login, o organizador pede para recuperar a senha e informa um e-mail. O sistema **não revela** se aquele e-mail tem conta: mostra uma mensagem genérica de que, se o e-mail for o da conta, as instruções foram enviadas. Quando o e-mail **é** o da conta do organizador, ele recebe por e-mail um caminho para definir uma senha nova. Com senha nova válida, passa a entrar pela Spec 01. Link/instrução inválida ou vencida: não troca a senha e pede para solicitar de novo. Quem já está autenticado não precisa deste fluxo para usar o painel.
- **Entradas e saídas:**
  - Entrada: e-mail informado na recuperação; depois, a senha nova no passo de redefinição.
  - Saída imediata do pedido: mensagem genérica (não confirma existência da conta).
  - Saída em redefinição válida: senha da conta atualizada; organizador consegue autenticar com a senha nova.
  - Saída em redefinição inválida: senha antiga permanece; aviso para tentar de novo.
- **Dados/entidades envolvidos (conceitual):** Conta do organizador (e-mail, senha). Pedido de recuperação (e-mail de destino, validade do caminho de redefinição).
- **Estados e transições:** Senha atual → (redefinição válida) senha nova em vigor. Pedido de recuperação: solicitado → (caminho válido usado) concluído; ou (caminho inválido/vencido) expirado, senha inalterada.
- **Regras de negócio:** Regra 21. Uma conta só. Sem cadastro público. Não informar se o e-mail existe.
- **Validações:** E-mail obrigatório e em formato reconhecível para solicitar. Senha nova obrigatória e com o mesmo critério mínimo que o login já exige para uma senha utilizável (não aceitar senha vazia).
- **Fluxo do usuário (passo a passo):**
  1. Na entrada, escolhe recuperar senha.
  2. Informa o e-mail.
  3. Vê a mensagem genérica.
  4. Se for o e-mail da conta, abre a instrução recebida.
  5. Define a senha nova.
  6. Entra com e-mail e senha nova (Spec 01).
- **Casos de borda e erros:**
  - E-mail vazio ou inválido no pedido: não envia; pede um e-mail válido.
  - E-mail que não é o da conta: mesma mensagem genérica; nenhuma conta é alterada.
  - Caminho de redefinição vencido, já usado ou inválido: não altera a senha; informa que precisa solicitar de novo.
  - Senha nova vazia: não grava.
  - Falha no envio: informa que não foi possível concluir o pedido; pede para tentar de novo; senha atual permanece.
- **Impacto no existente:** O produto atual não previa recuperação de senha. Esta spec acrescenta o fluxo na entrada, sem mudar a regra da conta única.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o e-mail da conta do organizador, quando solicita recuperação e conclui a redefinição com senha nova válida, então passa a entrar com essa senha e a senha antiga deixa de funcionar.
  - Dado um e-mail que não é o da conta, quando solicita recuperação, então vê a mesma mensagem genérica e nenhuma senha é alterada.
  - Dado um caminho de redefinição inválido ou vencido, quando tenta definir senha nova, então a senha atual permanece.
  - Dado que não está autenticado, quando só pede a recuperação, então ainda não acessa o painel até autenticar de novo.
- **Definição de pronto:** Organizador recupera a senha da conta única e entra com a senha nova; e-mail desconhecido não vaza existência de conta; caminho inválido não troca senha. Conferido nos caminhos de sucesso e erro.
- **Dependências:** Spec 01 — a entrada de login e a conta única já existem.
- **Fora do escopo desta spec:** Cadastro público, troca de e-mail da conta, vários organizadores, qualquer tela de evento ou confirmação.

### Spec 03 — Listar e criar evento

- **Fase:** Fase 2 — Eventos
- **Objetivo (o quê):** Depois do login, o organizador vê a lista dos seus eventos e cria um evento novo com título, data, horário e local obrigatórios (detalhes opcional). Ao criar, o sistema gera um trecho de link único.
- **Intenção (por quê):** Sem lista e criação, não há como ter mais de um evento nem de onde partir a configuração e o link. O título é livre: descreve a ocasião, sem escolher um “tipo” no sistema.
- **Contexto:** Requer sessão da Spec 01. A lista é a tela inicial do painel. Criar já gera o link usado na Spec 04 (copiar/alterar) e na Spec 06 (página pública). Ainda não é nesta spec que se edita, exclui ou vê a lista de confirmados.
- **Atores:** Organizador autenticado.
- **Descrição do comportamento:** Autenticado, o organizador vê os eventos existentes, cada um distinguível no mínimo por **título** e **data**. Clicar em um evento abre a área **daquele** evento (Specs 04, 05 e 07). Há uma ação clara para **criar** evento. No formulário de criação: título, data, horário e local obrigatórios; detalhes opcional. Não há campo de tipo de evento. Ao salvar válido, o sistema grava o evento, gera um **trecho de link único** (a partir do título, diferenciando automaticamente se o trecho já existir) e o organizador passa a ter aquele evento na lista. **Suposição:** após criar, o organizador é levado à área daquele evento, para copiar o link e seguir configurando. Lista vazia: estado vazio compreensível, com convite para criar o primeiro evento. A lista **não** mistura confirmações; no máximo identifica o evento. **Suposição:** a lista não precisa mostrar o total de confirmados neste recorte — o total vive na área do evento (Spec 07).
- **Entradas e saídas:**
  - Entrada: título, data, horário, local; detalhes opcional.
  - Saída em sucesso: evento gravado; trecho de link único gerado; evento visível na lista; organizador na área daquele evento.
  - Saída em validação: nada gravado; indica o que falta.
- **Dados/entidades envolvidos (conceitual):**
  - Evento: título, detalhes (opcional), data, horário, local, trecho atual do link.
  - Lista de eventos do organizador (todos os eventos da conta única).
- **Estados e transições:** Sem eventos → (criação válida) evento existente com link gerado. Evento existente permanece listado até ser excluído (Spec 05).
- **Regras de negócio:** Regras 3, 4, 5, 7 e 18. Totais e nomes não são desta spec.
- **Validações:**
  - Título, data, horário e local obrigatórios; local e título não podem ser só espaços.
  - Data e horário devem ser valores reconhecíveis (não texto solto inválido).
  - A data não pode ser anterior ao dia corrente (Regra 18).
  - Detalhes pode ser vazio.
- **Fluxo do usuário (passo a passo):**
  1. Faz login (Spec 01).
  2. Vê a lista (ou o estado vazio).
  3. Inicia a criação.
  4. Informa título, data, horário e local; detalhes se quiser.
  5. Salva.
  6. O evento existe, com link gerado, e o organizador está na área daquele evento.
- **Casos de borda e erros:**
  - Sem login: não vê lista nem cria (Spec 01).
  - Campo obrigatório vazio: não cria; indica o que falta.
  - Título ou local só com espaços: tratado como vazio; não cria.
  - Data anterior ao dia corrente: não cria; informa que a data não pode estar no passado.
  - Data igual a hoje: permitida.
  - Falha ao gravar: informa que não foi possível criar; lista permanece como estava.
  - Dois eventos com o mesmo título: permitido; o trecho do link de cada um continua **único** (o sistema diferencia o trecho).
- **Impacto no existente:** O sistema deixa de ter um único evento e passa a ter uma lista na qual o organizador cria vários eventos genéricos.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o organizador autenticado e título, data, horário e local válidos, quando salva a criação, então o evento existe, tem um trecho de link único e aparece na lista.
  - Dado detalhes vazio e os obrigatórios preenchidos, quando cria, então o evento é gravado sem detalhes.
  - Dado um obrigatório vazio, quando tenta criar, então o sistema não grava e indica o problema.
  - Dado uma data anterior ao dia corrente e os demais campos válidos, quando tenta criar, então o sistema não grava e informa que a data não pode estar no passado.
  - Dado a data igual a hoje e os demais campos válidos, quando cria, então o evento é gravado.
  - Dado nenhum evento, quando entra no painel, então vê estado vazio e consegue iniciar a criação.
  - Dado dois eventos já criados, quando abre a lista, então vê os dois e, ao escolher um, entra só naquele.
  - Dado o formulário de criação, quando o organizador procura um campo “tipo de evento”, então **não há** esse campo.
- **Definição de pronto:** Organizador cria pelo menos dois eventos, vê os dois na lista, cada um com link próprio, e a criação inválida não grava. Estado vazio conferido. Sem tipo de evento no cadastro.
- **Dependências:** Spec 01 — sessão obrigatória.
- **Fora do escopo desta spec:** Editar dados e alterar/copiar o link (Spec 04), excluir (Spec 05), página pública (Spec 06), totais e nomes (Spec 07).

### Spec 04 — Configurar evento e link

- **Fase:** Fase 2 — Eventos
- **Objetivo (o quê):** No evento selecionado, o organizador atualiza título, detalhes, data, horário e local; vê e **copia** o link público atual; e pode **alterar o trecho** do link. Trechos anteriores daquele evento redirecionam para o atual.
- **Intenção (por quê):** O convidado precisa de informações corretas e de um endereço estável o bastante para o organizador enviar na mão — inclusive depois de personalizar o link.
- **Contexto:** O evento e o trecho inicial vêm da Spec 03. A página pública (Spec 06) **lê** estes dados e resolve trechos antigos via redirecionamento. Excluir o evento é a Spec 05. Presenças não são editadas aqui.
- **Atores:** Organizador autenticado, com um evento selecionado. O convidado só sente o efeito na página pública (dados visíveis e URL).
- **Descrição do comportamento:** Na área do evento selecionado, o organizador vê os campos de título, detalhes, data, horário e local, preenchidos com o valor atual. Ao salvar com dados válidos, o sistema grava e confirma o sucesso; vale a última gravação. Título, data, horário e local continuam obrigatórios na edição; detalhes pode ser esvaziado. O organizador vê o **link público atual** (endereço completo para enviar) e consegue **copiar** esse endereço. Pode alterar o **trecho** do link para um valor válido e único. Se o novo trecho for aceito, ele vira o atual; **todos** os trechos que aquele evento já usou passam a **redirecionar** para o atual (Regra 8), inclusive depois de várias mudanças. O trecho não pode colidir com o atual nem com o histórico de **outro** evento (Regra 6). Reusar um trecho que **este mesmo** evento já usou é permitido: ele volta a ser o atual. Copiar sempre copia o endereço do trecho **atual** (não o de um trecho antigo). Visitante que abrir um trecho antigo daquele evento é levado ao atual e vê a página (Spec 06).
- **Entradas e saídas:**
  - Entrada (dados): título, detalhes, data, horário, local.
  - Entrada (link): novo trecho desejado; ação de copiar o endereço atual.
  - Saída no painel: dados gravados visíveis; mensagem de sucesso; link atual visível e copiável.
  - Saída na pública: os mesmos dados; trechos antigos redirecionam para o atual.
- **Dados/entidades envolvidos (conceitual):**
  - Evento: título, detalhes, data, horário, local, trecho atual.
  - Histórico de trechos daquele evento (todos os trechos já usados, para redirecionar).
- **Estados e transições:** Dados atuais → (save válido) dados novos na pública. Trecho T1 → (alteração válida para T2) T2 atual, T1 redireciona para T2 → (alteração para T3) T3 atual, T1 e T2 redirecionam para T3.
- **Regras de negócio:** Regras 3–8, 18 e 19. Só o organizador autenticado altera. Presenças não mudam aqui.
- **Validações:**
  - Título, data, horário e local obrigatórios ao salvar dados; título e local não só espaços.
  - Se a data foi alterada, a nova data não pode ser anterior ao dia corrente (Regra 18).
  - Detalhes pode ser vazio.
  - Novo trecho: não vazio; **suposição:** só letras, números e hífen, não só hífens (Regra 7).
  - Novo trecho único frente a trechos atuais e históricos de **outros** eventos.
- **Fluxo do usuário (passo a passo):**
  1. Faz login e escolhe o evento (Specs 01 e 03).
  2. Altera os dados que quiser e salva.
  3. Copia o link atual para enviar manualmente.
  4. Se quiser, informa um trecho novo e confirma a alteração.
  5. Vê o link atualizado; o anterior passa a redirecionar.
- **Casos de borda e erros:**
  - Sem login ou sem evento selecionado: não configura (Specs 01 e 03).
  - Save de dados incompleto: não grava; indica o que falta.
  - Data alterada para um dia anterior a hoje: não grava a alteração; informa que a data não pode estar no passado.
  - Evento cuja data já passou e o organizador salva sem mudar a data: permitido (título, detalhes, horário, local e link podem ser atualizados).
  - Trecho já usado por outro evento (atual ou histórico): não altera; informa que aquele endereço não está disponível.
  - Trecho inválido (espaços, caracteres não permitidos, vazio): não altera; indica o formato.
  - Falha ao gravar dados ou trecho: mantém o que já estava; informa que não foi possível salvar.
  - Várias alterações de trecho: todos os antigos daquele evento redirecionam para o atual, não só o último.
  - Copiar: o organizador obtém o endereço atual completo, pronto para colar fora do sistema.
- **Impacto no existente:** O cadastro de evento passa a incluir título, detalhes e link próprio, além de data, horário e local.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o evento selecionado e dados válidos, quando salva, então a página pública daquele evento mostra a versão nova.
  - Dado detalhes preenchido, quando o organizador apaga os detalhes e salva, então a pública não mostra um texto de detalhes inventado.
  - Dado o link atual visível, quando o organizador copia, então obtém o endereço público atual daquele evento.
  - Dado trecho atual `/workshop` e alteração válida para `/workshop-maio`, quando um convidado abre o endereço antigo, então é levado ao atual e vê o evento.
  - Dado o evento já ter usado `/encontro` e `/lancamento` e o atual ser `/workshop-maio`, quando o convidado abre `/encontro` ou `/lancamento`, então chega ao atual.
  - Dado um trecho que outro evento já usa ou já usou, quando tenta gravar esse trecho, então o sistema recusa e o trecho atual permanece.
  - Dado um obrigatório vazio na edição, quando tenta salvar os dados, então não grava e indica o problema.
  - Dado o organizador alterando a data para um dia anterior a hoje, quando tenta salvar, então o sistema não grava e informa que a data não pode estar no passado.
  - Dado um evento cuja data já passou, quando o organizador altera só o título e salva (sem mudar a data), então a alteração é gravada.
- **Definição de pronto:** Organizador atualiza dados, copia o link, personaliza o trecho; redirecionamento de **todos** os trechos antigos daquele evento conferido; colisão com outro evento recusada.
- **Dependências:** Spec 01 (sessão). Spec 03 (evento existente e trecho inicial).
- **Fora do escopo desta spec:** Criar evento, excluir evento, confirmação de presença, editar/remover nomes, envio automático do link.

### Spec 05 — Excluir evento

- **Fase:** Fase 2 — Eventos
- **Objetivo (o quê):** O organizador exclui o evento selecionado. O sistema remove o evento, as confirmações daquele evento e os trechos de link (atual e históricos). Não há desfazer neste recorte.
- **Intenção (por quê):** Evento cancelado ou criado por engano não deve continuar aceitando confirmação nem aparecer no painel. A exclusão precisa ser explícita porque é irreversível e apaga nomes.
- **Contexto:** O evento vem da Spec 03; dados/link da Spec 04; confirmações da Spec 06/07. Depois de excluir, a lista da Spec 03 deixa de mostrar aquele evento. A página pública (Spec 06) trata os links apagados como indisponíveis.
- **Atores:** Organizador autenticado, no evento selecionado.
- **Descrição do comportamento:** Na área do evento, há uma ação de excluir. O sistema **pede confirmação explícita** (o organizador precisa confirmar que entende que o evento, os links e as confirmações daquele evento serão apagados). Se confirmar, o sistema apaga: o evento, todas as confirmações daquele evento, o trecho atual e o histórico de trechos daquele evento. Os trechos ficam **livres** para outro evento usar. O organizador volta para a lista de eventos. Se cancelar a confirmação, nada é apagado. Outros eventos não são afetados. Quem abrir qualquer link antigo ou atual daquele evento vê que o evento **não está disponível** e **não** consegue confirmar.
- **Entradas e saídas:**
  - Entrada: escolha de excluir o evento selecionado; confirmação explícita ou cancelamento.
  - Saída em confirmação: evento inexistente; lista sem aquele item; links daquele evento indisponíveis.
  - Saída em cancelamento: evento, links e confirmações inalterados.
- **Dados/entidades envolvidos (conceitual):** Evento; histórico de trechos; confirmações (nomes) daquele evento.
- **Estados e transições:** Evento existente → (exclusão confirmada) evento inexistente, trechos livres, confirmações daquele evento inexistentes. Pedido de exclusão → cancelado: permanece existente.
- **Regras de negócio:** Regras 16 e 17. Só o organizador autenticado exclui. Não desfaz.
- **Validações:** Só exclui o evento selecionado, e só após confirmação explícita. Sem sessão, não exclui.
- **Fluxo do usuário (passo a passo):**
  1. Faz login e escolhe o evento.
  2. Pede para excluir.
  3. Lê que evento, links e confirmações daquele evento serão apagados.
  4. Confirma.
  5. Volta à lista sem aquele evento.
- **Casos de borda e erros:**
  - Cancelar a confirmação: nada apagado.
  - Evento sem nenhuma confirmação: ainda assim some o evento e os links.
  - Evento com várias confirmações: todas as daquele evento desaparecem; outros eventos mantêm as suas.
  - Falha ao excluir: informa que não foi possível; evento permanece; pede para tentar de novo.
  - Sem login: não exclui (Spec 01).
  - Dois eventos no painel: excluir um não altera o outro nem libera o trecho **do outro**.
- **Impacto no existente:** Passa a existir exclusão de um evento específico, sem afetar os demais.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento com confirmações e trechos antigos, quando o organizador confirma a exclusão, então o evento some da lista, as confirmações daquele evento deixam de existir e qualquer link dele mostra indisponível.
  - Dado o pedido de exclusão, quando o organizador cancela, então o evento, os links e os nomes permanecem.
  - Dado dois eventos A e B, quando exclui A, então B continua na lista com seus nomes e seu link.
  - Dado que o evento A foi excluído e tinha o trecho `/workshop`, quando o organizador cria outro evento e usa `/workshop`, então o trecho pode ser aceito (ficou livre).
  - Dado visitante sem login, quando tenta excluir, então não consegue.
- **Definição de pronto:** Exclusão confirmada remove evento, nomes e links daquele evento; cancelar não remove; outro evento intacto; trechos liberados. Conferido com e sem confirmações.
- **Dependências:** Spec 01 e Spec 03. Specs 04, 06 e 07 podem já ter dados; a exclusão precisa funcionar também se ainda não houver confirmações.
- **Fora do escopo desta spec:** Desfazer exclusão, desativar sem apagar, excluir só uma confirmação (Spec 07), editar dados (Spec 04).

### Spec 06 — Página pública e confirmação “Eu vou!”

- **Fase:** Fase 3 — Confirmação pública
- **Objetivo (o quê):** O convidado, sem login, abre o link do evento, vê as informações e confirma presença informando o **nome completo** e clicando em **“Eu vou!”**. O sistema grava uma confirmação naquele evento. Nomes repetidos são aceitos.
- **Intenção (por quê):** Reduzir o atrito ao mínimo (nome + um botão) e registrar quem vai, evento a evento, sem recusa e sem o convidado gerenciar a própria resposta depois. A página é a mesma para qualquer ocasião.
- **Contexto:** Lê título, detalhes, data, horário, local e trecho de link das Specs 03 e 04 (incluindo redirecionamento de trechos antigos). Evento excluído (Spec 05) não confirma. As pessoas gravadas alimentam a Spec 07. Não usa login.
- **Atores:** Convidado. Organizador não confirma por esta página neste recorte.
- **Descrição do comportamento:** Ao abrir o endereço **atual** do evento, a página mostra: título, detalhes **somente se houver texto**, data, horário, local, um campo de **nome completo** e o botão **“Eu vou!”**. Não há tipo de evento, não há categorias de lista, não há acompanhantes, não há “não vou”. Se o endereço for um **trecho antigo** daquele evento, o visitante é levado ao endereço atual e então vê a mesma página. Se o evento não existir ou tiver sido excluído, mostra que o evento **não está disponível** e **não** exibe o formulário. Ao confirmar com nome válido, o sistema grava **uma** confirmação naquele evento e mostra sucesso. Nome igual a outro já gravado **é aceito** (outra linha). Nome vazio ou só espaços **não** grava. **Suposição (Regra 20):** após o sucesso, o convidado pode enviar outro nome (outro “Eu vou!”), cada um gerando uma confirmação nova. Não há tela para o convidado editar envio anterior. A página **não** lista outros confirmados.
- **Entradas e saídas:**
  - Entrada: endereço do evento (atual ou antigo); nome completo; ação “Eu vou!”.
  - Saída em sucesso: confirmação gravada naquele evento; mensagem de que a presença foi confirmada; Spec 07 passa a incluir essa linha.
  - Saída em validação: nada gravado; indica que o nome é obrigatório.
  - Saída evento indisponível: sem formulário; sem gravação.
- **Dados/entidades envolvidos (conceitual):**
  - Evento (exibição): título, detalhes opcional, data, horário, local.
  - Confirmação: nome completo, evento a que pertence, momento do envio (conceitualmente uma linha na lista).
- **Estados e transições:** Sem aquela confirmação → (envio válido) confirmação existente naquele evento. Não há estado “não vai”. O convidado não transita a confirmação para cancelada.
- **Regras de negócio:** Regras 8–12, 17, 19 e 20.
- **Validações:**
  - Evento precisa existir e não estar excluído.
  - Nome completo obrigatório, não só espaços.
  - Não exige sobrenome em campo separado; um único texto de nome.
- **Fluxo do usuário (passo a passo):**
  1. Abre o link recebido do organizador.
  2. Se for trecho antigo, é levado ao atual.
  3. Vê as informações do evento.
  4. Informa o nome completo.
  5. Clica em **“Eu vou!”**.
  6. Vê que a confirmação foi feita.
- **Casos de borda e erros:**
  - Nome vazio ou só espaços: não grava; pede o nome.
  - “João Silva” já confirmou e outro envio “João Silva”: grava a segunda linha; ambas aparecem na Spec 07.
  - Evento excluído ou trecho desconhecido: indisponível; não grava.
  - Falha ao gravar: informa que não foi possível confirmar; pede para tentar de novo; não cria linha pela metade.
  - Recarregar a página depois do sucesso **não** cria outra confirmação sozinho; novo envio só se o usuário informar um nome e clicar de novo.
  - Não existe ação “não vou”.
- **Impacto no existente:** A confirmação pública passa a ser por evento, com um nome completo por envio, sem categorias de lista e sem acompanhantes.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento existente e um nome completo válido, quando o convidado clica em “Eu vou!”, então a confirmação é gravada naquele evento e ele vê sucesso.
  - Dado detalhes vazio no evento, quando o convidado abre o link, então vê título, data, horário e local, e não vê um bloco de detalhes inventado.
  - Dado “João Silva” já confirmado, quando outro envio “João Silva” confirma no mesmo evento, então passam a existir duas linhas com esse nome.
  - Dado um trecho antigo do evento, quando o convidado abre, então chega à página atual e pode confirmar.
  - Dado evento excluído ou link inexistente, quando o visitante abre, então vê indisponível e não consegue confirmar.
  - Dado a página pública, quando o visitante procura recusar, então **não há** “não vou”.
  - Dado a página pública, quando o visitante procura escolher uma categoria ou lista de convidados, então **não há** essa escolha.
  - Dado nome vazio, quando clica em “Eu vou!”, então nada é gravado.
  - Dado uma confirmação gravada, quando o convidado quer mudar ou cancelar, então o sistema **não oferece** essa ação.
- **Definição de pronto:** Confirmação simples, duplicidade de nome aceita, trecho antigo redireciona, evento inexistente bloqueado, “não vou” inexistente, sem categoria de lista. Cada envio válido aparece na Spec 07 **só** daquele evento.
- **Dependências:** Spec 03 (evento e trecho inicial). Spec 04 para dados atualizados e redirecionamento; a confirmação já funciona com o trecho gerado na criação. Spec 01 não é necessária para o convidado.
- **Fora do escopo desta spec:** Login, totais, editar/remover nomes, criar evento, acompanhantes, envio de convite.

### Spec 07 — Totais, listagem, editar e remover nomes

- **Fase:** Fase 4 — Presenças no painel
- **Objetivo (o quê):** No evento selecionado, o organizador vê **quantas** confirmações existem e a **lista de nomes**; pode **editar o nome** de uma linha e **remover** uma linha.
- **Intenção (por quê):** Dar a lista nominal para o dia do evento e permitir corrigir digitação ou tirar alguém, sem abrir essa correção para o convidado.
- **Contexto:** Lê as confirmações da Spec 06. Exige login (Spec 01) e evento selecionado (Spec 03). Convive com a configuração da Spec 04, sem misturar com outros eventos. Excluir o evento inteiro é a Spec 05, não esta spec.
- **Atores:** Organizador autenticado, no evento selecionado.
- **Descrição do comportamento:** Na área do evento, o painel mostra a **quantidade total** de confirmações **daquele** evento (cada linha = 1). Mostra a listagem com **uma linha por confirmação**, com o nome completo. Lista vazia: estado vazio claro (ninguém confirmou ainda), total 0. O organizador pode **editar o nome** de uma linha específica: informa um nome completo válido e salva; só aquela linha muda; o total permanece o mesmo; nomes iguais a outras linhas **continuam permitidos**. O organizador pode **remover** uma linha: aquela confirmação deixa de existir; o total diminui em 1. **Suposição:** remover pede confirmação simples (sim/não) para evitar clique acidental; não é tão destrutivo quanto excluir o evento. Não há filtro por categoria de convidados. Não há exportar. Convidado não acessa esta lista. Editar ou remover em um evento **não** altera outro evento.
- **Entradas e saídas:**
  - Entrada: sessão autenticada; evento selecionado; novo nome ao editar; confirmação ao remover.
  - Saída: total numérico daquele evento; listagem; linha atualizada ou removida.
- **Dados/entidades envolvidos (conceitual):** Confirmação (nome completo, evento). Total derivado da contagem de confirmações daquele evento.
- **Estados e transições:** Confirmação existente → (edição de nome válida) mesma confirmação com nome novo. Confirmação existente → (remoção confirmada) confirmação inexistente. Filtro de tela: não se aplica (não há filtro neste recorte).
- **Regras de negócio:** Regras 3, 11, 13, 14 e 15.
- **Validações:**
  - Acesso só com sessão e evento selecionado.
  - Nome editado obrigatório, não só espaços.
  - Remoção só da linha escolhida, após confirmação.
- **Fluxo do usuário (passo a passo):**
  1. Faz login e escolhe o evento.
  2. Vê o total e a lista daquele evento.
  3. Se precisar, altera o nome de uma linha e salva.
  4. Se precisar, remove uma linha e confirma.
  5. Vê total e lista atualizados.
- **Casos de borda e erros:**
  - Nenhuma confirmação: total 0; estado vazio, não um erro.
  - Duas linhas “João Silva”: o organizador distingue como duas linhas e edita/remove **uma** delas.
  - Editar nome para vazio: não grava; pede o nome.
  - Cancelar a remoção: a linha permanece; total inalterado.
  - Falha ao carregar: informa que não foi possível obter as presenças; não mostra números inventados.
  - Falha ao editar ou remover: informa o erro; lista permanece como estava.
  - Sem login: não vê nomes nem total.
  - Evento A e evento B: lista e total de A não incluem B.
- **Impacto no existente:** A listagem passa a ser por evento, com edição e remoção de nomes, sem filtro por categoria de convidados.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado 3 confirmações no evento selecionado (mesmo que dois nomes iguais), quando o organizador abre a área daquele evento, então o total é 3 e há 3 linhas.
  - Dado confirmações no evento A e no B, quando está em A, então não vê nomes nem soma de B.
  - Dado uma linha “Ana Souza”, quando o organizador altera para “Ana Souza Lima” e salva, então só aquela linha mostra o nome novo e o total não muda.
  - Dado duas linhas “João Silva”, quando o organizador remove uma, então resta 1 linha “João Silva” e o total diminui em 1.
  - Dado lista vazia, quando entra no evento, então vê total 0 e estado vazio.
  - Dado visitante sem login, quando tenta a listagem, então não vê nomes nem totais.
  - Dado o painel, quando o organizador procura filtrar a lista por categoria de convidados, então **não há** esse filtro.
- **Definição de pronto:** Total bate com o número de linhas daquele evento; edição altera uma linha; remoção tira uma linha e o total; outro evento intacto; vazio conferido.
- **Dependências:** Spec 01 (acesso). Spec 03 (evento selecionado). Spec 06 (confirmações para contar); a tela já deve funcionar com lista vazia antes de existir qualquer “Eu vou!”.
- **Fora do escopo desta spec:** Exportar, buscar por texto, o convidado editar/cancelar, excluir o evento inteiro (Spec 05), página pública.

## 14. Ordem recomendada de implementação

1. Spec 01 — Login do organizador
2. Spec 02 — Recuperação de senha
3. Spec 03 — Listar e criar evento
4. Spec 04 — Configurar evento e link
5. Spec 05 — Excluir evento
6. Spec 06 — Página pública e confirmação “Eu vou!”
7. Spec 07 — Totais, listagem, editar e remover nomes

Seguir essa ordem evita painel sem porta, eventos sem link, página pública sem evento, e lista de nomes sem confirmação gravada. A Spec 02 pode ser feita logo após a Spec 01 (não bloqueia criar evento, mas destrava a conta se a senha for perdida). A Spec 05 pode ser validada com evento ainda sem confirmações; a Spec 07 só fica completa com o caminho da Spec 06 funcionando (o estado vazio pode ser conferido antes).
