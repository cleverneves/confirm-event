# PRD — Confirmação de presença (aniversário Mariana e Victor)

> Tipo: PRD inicial · Data: 2026-09-17
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

Sistema web para confirmar presença em uma festa de aniversário **compartilhada no mesmo local e horário**, com **duas listas de convidados**: festa da **Mariana** e festa do **Victor**.

O convidado recebe **um único link**, escolhe de qual aniversário está sendo convidado, informa nome e sobrenome (e, se quiser, acompanhantes com nome e sobrenome) e **confirma que vai**.

Quem organiza acessa uma **área administrativa com login** (uma conta só), informa **dia, horário e local** da festa, e consulta **quantas pessoas vão** no total e em cada festa, com listagem filtrável.

## 2. Problema que resolve

Duas pessoas fazem aniversário juntas, no mesmo lugar e horário, mas cada uma tem a própria lista de convidados. Sem um sistema, o organizador mistura confirmações, não sabe o tamanho de cada lista nem o total de pessoas no local, e o convidado não tem um jeito simples de dizer a qual festa pertence.

O que hoje seria controle manual (mensagem, planilha, memória) passa a ser: link público → confirmação identificada por festa → painel com totais e nomes.

## 3. Público-alvo

- **Organizador** — quem está convidando; usa a área administrativa (uma conta).
- **Convidados** — usam só a página pública, sem login.

Não é um produto para “qualquer evento” nem um SaaS genérico.

## 4. Objetivo do recorte atual

Entregar a confirmação pública (com dados da festa visíveis) e o painel do organizador (login, cadastro de dia/horário/local, totais, listagem e filtro). Sem convites por mensagem, sem o convidado recusar, e sem o admin editar ou apagar pessoas.

## 5. Funcionalidades

**Essenciais:**

- Página pública com dia, horário e local da festa.
- Escolha da festa (Mariana ou Victor).
- Confirmação de presença com nome e sobrenome de quem preenche.
- Acompanhantes opcionais, cada um com nome e sobrenome; pode confirmar sozinho.
- Área administrativa com login (e-mail e senha), uma conta de organizador.
- Organizador cadastra (e atualiza) dia, horário e local da festa.
- Totais: quantidade geral de pessoas e quantidade por festa.
- Listagem com uma linha por pessoa (quem confirmou e cada acompanhante).
- Filtro da listagem por festa (todas / Mariana / Victor).

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Opção “não vou”.
- Convidado alterar ou cancelar a confirmação depois de enviar.
- Organizador editar, apagar ou mover pessoas na lista.
- Envio de convite por e-mail, WhatsApp ou SMS.
- Exportar planilha.
- Recuperação de senha, vários administradores ou cadastro público de conta.
- App celular nativo.
- Vários eventos, várias duplas de anfitriões ou produto SaaS.
- Confirmar presença nas duas festas ao mesmo tempo.

## 7. Regras de negócio

- Regra 1: Existem exatamente duas festas: **Festa da Mariana** e **Festa do Victor**.
- Regra 2: Cada pessoa (nome + sobrenome) pertence a **uma festa só**.
- Regra 3: A confirmação é **só de presença**. Não existe recusa.
- Regra 4: Depois de gravada, a confirmação **não pode ser alterada** pelo convidado.
- Regra 5: Quem preenche informa **nome e sobrenome**. Cada acompanhante também.
- Regra 6: É permitido confirmar **sem acompanhantes**.
- Regra 7: **Suposição:** não há limite máximo de acompanhantes neste recorte.
- Regra 8: A identidade da pessoa é a combinação **nome + sobrenome**, comparada **sem diferenciar maiúsculas/minúsculas** e ignorando espaços extras no início/fim. **Suposição:** “Ana Silva” e “ana silva” são a mesma pessoa.
- Regra 9: Se o nome + sobrenome **já está na festa escolhida**, o sistema recusa e informa: **“Você já confirmou nesta festa”**.
- Regra 10: Se o nome + sobrenome **já está na outra festa**, o sistema recusa e informa que a pessoa **já está na outra festa**.
- Regra 11: As regras 9 e 10 valem para quem preenche **e** para cada acompanhante, contra qualquer pessoa já gravada (titular ou acompanhante).
- Regra 12: No mesmo envio, não pode haver nome + sobrenome repetido entre quem preenche e os acompanhantes, nem entre acompanhantes.
- Regra 13: Dia, horário e local são **únicos para as duas festas** (mesmo evento). O organizador cadastra e pode atualizar esses dados.
- Regra 14: Os totais contam **cada pessoa** (quem confirmou + cada acompanhante = 1 cada).
- Regra 15: A listagem do admin tem **uma linha por pessoa**, não uma linha por formulário enviado.
- Regra 16: A área administrativa é **consulta** para presenças (totais, lista, filtro) e **escrita** só para dia, horário e local.
- Regra 17: Há **uma única conta** de organizador. Convidado não faz login.
- Regra 18: Sem login válido, ninguém acessa o painel administrativo.

## 8. Fluxos principais

### Fluxo 1 — Organizador entra e informa o evento

1. Acessa a área administrativa.
2. Informa e-mail e senha.
3. Entra no painel.
4. Cadastra ou atualiza dia, horário e local.
5. Salva; o painel confirma que os dados do evento foram gravados.
6. Esses dados passam a aparecer na página pública.

### Fluxo 2 — Convidado confirma presença (sozinho)

1. Abre o link público.
2. Vê dia, horário e local (ou “a definir”, se o organizador ainda não cadastrou).
3. Escolhe festa da Mariana ou festa do Victor.
4. Informa nome e sobrenome.
5. Não adiciona acompanhantes.
6. Confirma presença.
7. O sistema grava e mostra que a confirmação foi feita.

### Fluxo 3 — Convidado confirma com acompanhantes

1. Segue os passos 1–4 do Fluxo 2.
2. Adiciona um ou mais acompanhantes, cada um com nome e sobrenome.
3. Confirma presença.
4. O sistema grava o titular e cada acompanhante na festa escolhida.
5. Mostra que a confirmação foi feita.

### Fluxo 4 — Nome já usado (mesma festa ou outra)

1. O convidado tenta confirmar (ele ou um acompanhante) com nome + sobrenome já existente.
2. O sistema **não grava**.
3. Se já está na festa escolhida: mensagem **“Você já confirmou nesta festa”**.
4. Se já está na outra festa: mensagem de que **já está na outra festa**.
5. A lista e os totais permanecem iguais.

### Fluxo 5 — Organizador consulta as presenças

1. Faz login.
2. Vê o total geral de pessoas e o total de cada festa.
3. Vê a listagem de todas as pessoas.
4. Filtra por festa da Mariana, festa do Victor ou todas.
5. A lista e os totais da tela acompanham o filtro (o total geral da festa/evento continua visível conforme a Spec 04).

## 9. Critérios de aceite

- O convidado consegue abrir o link, ver dia/horário/local, escolher a festa, informar nomes e confirmar presença.
- O convidado consegue confirmar sozinho ou com acompanhantes.
- O sistema deve gravar cada pessoa (titular e acompanhantes) na festa escolhida.
- O sistema não deve permitir “não vou”, duas festas para a mesma pessoa, nem alterar a resposta depois.
- Quando nome + sobrenome já existe na festa escolhida, o sistema deve recusar com “Você já confirmou nesta festa”.
- Quando nome + sobrenome já existe na outra festa, o sistema deve recusar e informar que já está na outra festa.
- O organizador consegue entrar com e-mail e senha; sem login, não acessa o painel.
- O organizador consegue cadastrar e atualizar dia, horário e local; a página pública exibe esses dados.
- O organizador vê quantidade total de pessoas e quantidade por festa.
- O organizador vê uma linha por pessoa e consegue filtrar por festa.
- O sistema não deve permitir editar ou apagar pessoas neste recorte.

## 10. Stack

Em alto nível (já presente no projeto + o que este recorte exige):

- **Next.js + TypeScript + Tailwind CSS** — interface web (pública e administrativa).
- **Supabase** — autenticação (e-mail e senha da conta do organizador) e persistência das confirmações e dos dados do evento.

## 11. Justificativa da stack

O repositório já nasceu em Next.js com TypeScript e Tailwind. O recorte precisa de **login** e de **guardar** evento + pessoas; montar auth e banco do zero seria desproporcional para uma festa pontual. Supabase cobre login e dados no mesmo serviço, no tamanho deste produto.

## 12. Fases de construção

### Fase 1 — Acesso do organizador

Objetivo: só quem organiza entra no painel.
Specs:

- Spec 01 — Login do organizador

### Fase 2 — Dados do evento

Objetivo: o organizador informa quando e onde é a festa, para o convidado ver no link.
Specs:

- Spec 02 — Cadastro de dia, horário e local

### Fase 3 — Confirmação pública

Objetivo: o convidado escolhe a festa, informa as pessoas e confirma presença, com as regras de duplicidade.
Specs:

- Spec 03 — Confirmação pública de presença

### Fase 4 — Consulta de presenças

Objetivo: o organizador vê o balanço e os nomes, filtrando por festa.
Specs:

- Spec 04 — Totais, listagem e filtro

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Login do organizador

- **Fase:** Fase 1 — Acesso do organizador
- **Objetivo (o quê):** Garantir que só o organizador, com e-mail e senha válidos, acesse a área administrativa; o convidado continua na página pública sem conta.
- **Intenção (por quê):** A lista de quem vai e os totais não devem ser públicos. Uma conta só evita complexidade de vários usuários neste evento.
- **Contexto:** O projeto ainda não tem autenticação nem área restrita. A página pública (Spec 03) permanece aberta. O painel (Specs 02 e 04) só existe depois do login.
- **Atores:** Organizador (única conta). Convidado não usa esta spec.
- **Descrição do comportamento:** Existe uma conta de organizador já definida (não há tela de “criar conta” para o público). Na entrada da área administrativa, o sistema pede e-mail e senha. Credenciais corretas: o organizador entra no painel. Credenciais incorretas: não entra e vê aviso de erro, sem revelar se o problema é o e-mail ou a senha. Sem sessão válida, qualquer tentativa de abrir o painel leva de volta à entrada de login. De dentro do painel, o organizador pode sair; ao sair, deixa de acessar o painel até login de novo.
- **Entradas e saídas:**
  - Entrada: e-mail e senha informados pelo organizador.
  - Saída em sucesso: acesso ao painel administrativo.
  - Saída em falha: permanece na entrada; mensagem de que não foi possível entrar.
  - Saída ao sair: sessão encerrada; área administrativa inacessível.
- **Dados/entidades envolvidos (conceitual):** Conta do organizador (e-mail, senha). Sessão de acesso (autenticado ou não).
- **Estados e transições:** Não autenticado → (login válido) autenticado no painel → (sair ou sessão inválida) não autenticado.
- **Regras de negócio:** Uma conta só. Sem cadastro público. Sem recuperação de senha neste recorte. Área administrativa exigindo sessão válida.
- **Validações:** E-mail e senha obrigatórios para tentar entrar. Não aceitar tentativa vazia.
- **Fluxo do usuário (passo a passo):**
  1. Abre a entrada da área administrativa.
  2. Informa e-mail e senha.
  3. Envia.
  4. Se válido, vê o painel; se inválido, vê erro e pode tentar de novo.
  5. Pode sair do painel quando quiser.
- **Casos de borda e erros:**
  - Campos vazios: não entra; pede para preencher.
  - E-mail ou senha errados: não entra; mensagem genérica de falha.
  - Acesso direto ao painel sem login: redirecionado para a entrada.
  - Sessão expirada no meio do uso: volta a pedir login; não altera dados de festa nem de pessoas.
- **Impacto no existente:** Nenhum fluxo de produto existe ainda; esta spec cria a porta da área administrativa.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado e-mail e senha corretos da conta do organizador, quando envia o login, então entra no painel.
  - Dado e-mail ou senha incorretos, quando envia o login, então não entra e vê mensagem de erro.
  - Dado que não está autenticado, quando tenta abrir o painel, então é levado à entrada de login e não vê totais nem lista.
  - Dado que está no painel, quando sai, então precisa autenticar de novo para voltar.
- **Definição de pronto:** Organizador entra e sai com a conta única; convidado e visitante sem senha não veem o painel. Comportamento conferido manualmente nos caminhos de sucesso e de erro.
- **Dependências:** Nenhuma.
- **Fora do escopo desta spec:** Cadastro de novas contas, vários organizadores, “esqueci minha senha”, tela pública de confirmação, cadastro de data/local, listagem de convidados.

### Spec 02 — Cadastro de dia, horário e local

- **Fase:** Fase 2 — Dados do evento
- **Objetivo (o quê):** O organizador autenticado informa e atualiza o **dia**, o **horário** e o **local** da festa. A página pública passa a exibir esses dados.
- **Intenção (por quê):** O convidado precisa saber quando e onde ir. Como as duas listas compartilham o mesmo evento, esses dados são cadastrados **uma vez**, não por festa.
- **Contexto:** Reutiliza o acesso da Spec 01. A página pública (Spec 03) **lê** estes dados para exibir. Não muda listas nem totais.
- **Atores:** Organizador autenticado. O convidado só visualiza o resultado na página pública.
- **Descrição do comportamento:** No painel, o organizador vê campos para dia, horário e local. Se ainda não houver dados, os campos vêm vazios. Ao salvar com dados válidos, o sistema grava e confirma o sucesso. O organizador pode alterar e salvar de novo; vale a última gravação. As duas festas (Mariana e Victor) usam os **mesmos** dia, horário e local. A página pública mostra o que estiver gravado; se ainda não houver cadastro, mostra de forma clara que dia, horário e local estão **a definir**, sem impedir a confirmação de presença (Spec 03).
- **Entradas e saídas:**
  - Entrada: dia, horário e local informados pelo organizador.
  - Saída no painel: dados gravados visíveis nos campos; mensagem de sucesso.
  - Saída na página pública: os mesmos dia, horário e local (ou “a definir”).
- **Dados/entidades envolvidos (conceitual):** Evento único (dia, horário, local). Não há um evento por anfitrião.
- **Estados e transições:** Evento sem dados → (primeiro save válido) evento publicado na página pública → (novo save válido) dados atualizados na pública.
- **Regras de negócio:** Um único conjunto de dia/horário/local para Mariana e Victor. Só o organizador autenticado altera. Presenças não são editadas aqui.
- **Validações:** Dia, horário e local obrigatórios para salvar. Local não pode ser só espaços em branco. Dia e horário devem ser valores de data e hora reconhecíveis (não texto solto inválido).
- **Fluxo do usuário (passo a passo):**
  1. Faz login (Spec 01).
  2. No painel, informa dia, horário e local.
  3. Salva.
  4. Vê confirmação de que foi gravado.
  5. Se precisar, altera e salva de novo.
  6. Na página pública, o convidado vê os dados atualizados.
- **Casos de borda e erros:**
  - Sem login: não acessa este cadastro (Spec 01).
  - Tentativa de salvar incompleto: não grava; indica o que falta.
  - Local só com espaços: tratado como vazio; não grava.
  - Falha ao gravar: mantém o que já estava salvo; informa que não foi possível salvar; pede para tentar de novo.
  - Página pública antes do primeiro cadastro: confirmação de presença continua disponível; dia/horário/local aparecem como “a definir”.
- **Impacto no existente:** Cria a fonte dos dados de quando/onde a festa acontece, exibidos na área pública.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o organizador autenticado e dia, horário e local válidos, quando salva, então os dados ficam gravados e aparecem na página pública.
  - Dado dados já gravados, quando o organizador altera e salva, então a página pública mostra a versão nova.
  - Dado que ainda não há dia/horário/local, quando o convidado abre o link, então vê “a definir” nesses campos e ainda pode confirmar presença.
  - Dado um campo obrigatório vazio, quando tenta salvar, então o sistema não grava e indica o problema.
  - Dado visitante sem login, quando tenta a área administrativa, então não consegue alterar dia, horário nem local.
- **Definição de pronto:** Organizador grava e atualiza o evento; a pública reflete o valor atual ou “a definir”. Caminhos de validação e de “ainda não cadastrado” conferidos.
- **Dependências:** Spec 01 — sessão de organizador obrigatória para cadastrar.
- **Fora do escopo desta spec:** Data/hora/local diferentes por festa; mapa interativo; convites; edição da lista de pessoas; totais.

### Spec 03 — Confirmação pública de presença

- **Fase:** Fase 3 — Confirmação pública
- **Objetivo (o quê):** O convidado, sem login, escolhe a festa (Mariana ou Victor), informa o próprio nome e sobrenome, opcionalmente informa acompanhantes (nome e sobrenome de cada um) e confirma que **vai**. O sistema grava cada pessoa na festa escolhida, recusando nomes já usados.
- **Intenção (por quê):** Separar as duas listas no mesmo evento e contar pessoas de verdade (não só quem preencheu o formulário), sem opção de recusa e sem segundo envio para a mesma pessoa.
- **Contexto:** A página pública exibe dia, horário e local da Spec 02 (ou “a definir”). Não usa login. As pessoas gravadas aqui alimentam totais e listagem da Spec 04.
- **Atores:** Convidado (titular do envio). Acompanhantes não preenchem o formulário; o titular os declara.
- **Descrição do comportamento:** A página mostra: identificação das duas festas, dados do evento, escolha obrigatória entre festa da Mariana e festa do Victor, campos de nome e sobrenome de quem confirma, forma de incluir zero ou mais acompanhantes (cada um com nome e sobrenome) e uma ação única de **confirmar presença** (não existe “não vou”). Ao confirmar, o sistema valida campos e duplicidade (regras 8–12). Se tudo estiver válido, grava o titular e cada acompanhante na festa escolhida e mostra sucesso. Se houver conflito de nome, **não grava ninguém daquele envio** (nem o titular, nem os acompanhantes) e mostra a mensagem adequada. A escolha de festa é exclusiva: o envio inteiro vai para uma festa só. Não há tela para editar envio anterior.
- **Entradas e saídas:**
  - Entrada: festa escolhida; nome e sobrenome do titular; lista opcional de acompanhantes (nome e sobrenome); dados do evento só para exibição.
  - Saída em sucesso: pessoas gravadas na festa; mensagem de confirmação feita; totais/lista (Spec 04) passam a incluir essas pessoas.
  - Saída em erro de validação ou duplicidade: nada gravado naquele envio; mensagem específica.
- **Dados/entidades envolvidos (conceitual):**
  - Festa: Mariana ou Victor.
  - Pessoa na lista: nome, sobrenome, festa, papel (titular do envio ou acompanhante).
  - Envio: agrupa o titular e seus acompanhantes na mesma festa, no mesmo momento.
- **Estados e transições:** Pessoa inexistente no sistema → (confirmação válida) pessoa confirmada na festa X. Não há transição para “não vai” nem para a outra festa depois de gravada.
- **Regras de negócio:** Regras 1–12 e 14. Sem “não vou”. Sem alteração posterior. Totais futuros contam cada pessoa do envio.
- **Validações:**
  - Festa obrigatória (uma das duas).
  - Nome e sobrenome do titular obrigatórios, não só espaços.
  - Cada acompanhante incluído precisa de nome e sobrenome, não só espaços.
  - Pode haver zero acompanhantes.
  - No mesmo envio, nome+sobrenome do titular e dos acompanhantes não podem se repetir entre si.
- **Fluxo do usuário (passo a passo):**
  1. Abre o link público.
  2. Vê dia, horário e local (ou “a definir”).
  3. Escolhe Mariana ou Victor.
  4. Informa nome e sobrenome.
  5. Se for o caso, adiciona acompanhantes com nome e sobrenome; pode confirmar sem nenhum.
  6. Confirma presença.
  7. Recebe sucesso ou mensagem de erro, sem lista administrativa.
- **Casos de borda e erros:**
  - Sem festa escolhida: não grava; pede para escolher.
  - Nome ou sobrenome do titular vazio: não grava.
  - Acompanhante com nome ou sobrenome vazio: não grava o envio.
  - Dois iguais no mesmo envio (ex.: titular e acompanhante “Ana Silva”): não grava; informa o conflito.
  - Nome+sobrenome já na festa escolhida (titular ou qualquer acompanhante vs qualquer pessoa já gravada): não grava o envio; **“Você já confirmou nesta festa”**. Se o conflito for de um acompanhante, a mensagem deixa claro que aquele nome já confirmou nesta festa.
  - Nome+sobrenome já na outra festa: não grava o envio; informa que **já está na outra festa** (indicando o nome em conflito quando for acompanhante).
  - Comparação ignora maiúsculas/minúsculas e espaços extras.
  - Falha ao gravar: informa que não foi possível confirmar; pede para tentar de novo; não deixa a lista pela metade daquele envio.
  - Recarregar a página depois do sucesso não deve criar um segundo envio sozinho; novo envio só se o usuário preencher e confirmar de novo (aí valem as regras de duplicidade).
- **Impacto no existente:** Cria as listas de pessoas que o painel consulta. Não altera login nem o cadastro de dia/horário/local, apenas os lê para exibir.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado festa escolhida, nome e sobrenome válidos e zero acompanhantes, quando confirma, então o titular entra na lista daquela festa e vê sucesso.
  - Dado titular e N acompanhantes válidos e sem conflito, quando confirma, então N+1 pessoas entram na mesma festa e vê sucesso.
  - Dado que “Ana Silva” já está na festa da Mariana, quando alguém tenta confirmar “Ana Silva” (titular ou acompanhante) de novo na Mariana, então nada daquele envio é gravado e a mensagem é “Você já confirmou nesta festa”.
  - Dado que “Ana Silva” já está na festa da Mariana, quando alguém tenta confirmá-la na festa do Victor, então nada daquele envio é gravado e o sistema informa que já está na outra festa.
  - Dado um envio com titular válido e um acompanhante cujo nome já existe, quando confirma, então **ninguém** daquele envio é gravado.
  - Dado a página pública, quando o visitante procura recusar presença, então **não há** ação “não vou”.
  - Dado uma confirmação já gravada, quando o convidado deseja mudar de festa ou de nomes, então o sistema **não oferece** edição; só um novo envio sujeito a duplicidade.
- **Definição de pronto:** Caminhos sozinho, com acompanhantes, duplicidade na mesma festa, duplicidade na outra festa, envio incompleto e “não vou inexistente” conferidos; cada pessoa válida aparece para a Spec 04.
- **Dependências:** Spec 02 — para exibir dia/horário/local (a confirmação funciona mesmo se estiverem “a definir”). Spec 01 não é necessária para o convidado.
- **Fora do escopo desta spec:** Login, totais e filtros do admin, editar/apagar pessoas, convite por mensagem, limite máximo de acompanhantes (não há neste recorte).

### Spec 04 — Totais, listagem e filtro

- **Fase:** Fase 4 — Consulta de presenças
- **Objetivo (o quê):** No painel, o organizador vê **quantas pessoas** confirmaram no total e em cada festa, e uma **listagem com uma linha por pessoa**, com filtro por festa (todas / Mariana / Victor).
- **Intenção (por quê):** Dar o balanço de ocupação do local e a lista nominal de cada anfitrião, sem misturar as duas festas quando o organizador filtrar.
- **Contexto:** Lê as pessoas gravadas na Spec 03. Exige login da Spec 01. Convive no painel com o cadastro de evento da Spec 02, sem alterar pessoas.
- **Atores:** Organizador autenticado.
- **Descrição do comportamento:** Após o login, o painel mostra: (1) quantidade total de pessoas confirmadas (soma das duas festas); (2) quantidade da festa da Mariana; (3) quantidade da festa do Victor. Mostra uma tabela/lista em que **cada pessoa** (titular ou acompanhante) é uma linha, com pelo menos: nome, sobrenome, festa e se é quem enviou a confirmação ou acompanhante. O organizador filtra por **todas**, **festa da Mariana** ou **festa do Victor**. Com filtro de uma festa, a listagem mostra só pessoas daquela festa. Os três números de balanço (total geral, Mariana, Victor) **permanecem visíveis** mesmo com filtro, para não perder o panorama do evento; a lista é que se restringe. Não há ações de editar, excluir, mover de festa ou marcar “não vai”. Lista vazia: mostra estado vazio compreensível (ninguém confirmou ainda / ninguém nesta festa).
- **Entradas e saídas:**
  - Entrada: sessão autenticada; escolha do filtro (todas / Mariana / Victor).
  - Saída: totais numéricos; listagem de pessoas conforme o filtro.
- **Dados/entidades envolvidos (conceitual):** Pessoa confirmada (nome, sobrenome, festa, papel titular/acompanhante). Totais derivados da contagem de pessoas.
- **Estados e transições:** Não se aplica — esta spec não muda estado da pessoa; só consulta. O filtro da tela é só visualização (todas / Mariana / Victor).
- **Regras de negócio:** Regras 14–18. Uma pessoa = 1 no total da festa dela e 1 no total geral. Organizador não altera a lista aqui.
- **Validações:** Não se aplica a formulário de convidado. Acesso só com sessão válida (Spec 01).
- **Fluxo do usuário (passo a passo):**
  1. Faz login.
  2. Vê total geral, total Mariana e total Victor.
  3. Vê a lista completa (filtro “todas”).
  4. Filtra por uma festa.
  5. Vê só os nomes daquela festa; os três totais do balanço continuam visíveis.
- **Casos de borda e erros:**
  - Nenhuma confirmação: totais zerados; listagem vazia com mensagem clara.
  - Filtro numa festa sem ninguém: lista vazia daquela festa; totais gerais ainda mostram a outra festa se houver gente lá.
  - Homônimos com sobrenomes diferentes: duas linhas distintas.
  - Sem login: não vê totais nem nomes.
  - Falha ao carregar: informa que não foi possível obter as presenças; não mostra números inventados.
- **Impacto no existente:** Não altera confirmações nem dados do evento; apenas exibe. É a tela principal de consulta depois do login.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado 1 titular na Mariana e 2 acompanhantes no mesmo envio, quando o organizador abre o painel, então o total da Mariana é 3, o do Victor é 0 e o geral é 3, e há 3 linhas na listagem.
  - Dado pessoas nas duas festas, quando filtra festa do Victor, então a lista mostra só pessoas do Victor e os totais geral/Mariana/Victor continuam visíveis.
  - Dado lista vazia, quando o organizador entra, então vê totais 0 e estado vazio, não um erro.
  - Dado o painel, quando procura editar ou apagar um nome, então **não há** essas ações.
  - Dado visitante sem login, quando tenta a listagem, então não vê nomes nem totais.
- **Definição de pronto:** Totais batem com a soma das linhas; filtro restringe a lista; vazio e duas festas conferidos; sem edição de pessoas.
- **Dependências:** Spec 01 (acesso). Spec 03 (pessoas para contar e listar). Spec 02 não é obrigatória para os números, mas o painel pode mostrar junto os dados do evento já cadastrados.
- **Fora do escopo desta spec:** Exportar, buscar por texto, ordenações avançadas, editar/apagar/mover pessoas, página pública.

## 14. Ordem recomendada de implementação

1. Spec 01 — Login do organizador  
2. Spec 02 — Cadastro de dia, horário e local  
3. Spec 03 — Confirmação pública de presença  
4. Spec 04 — Totais, listagem e filtro  

Seguir essa ordem evita painel sem porta, página pública sem dados do evento para mostrar, e totais sem pessoas gravadas. A Spec 03 pode ser testada com evento ainda “a definir”; a Spec 04 só faz sentido com pelo menos o caminho da Spec 03 funcionando.
