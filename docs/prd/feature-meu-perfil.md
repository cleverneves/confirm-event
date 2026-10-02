# PRD — Meu perfil do organizador

> Tipo: PRD de feature · Data: 2026-10-02
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

Dentro do painel, o organizador passa a ter uma área chamada **Meu perfil**. Nela ele vê o e-mail da conta (sem poder alterá-lo) e pode gravar e atualizar o próprio nome, o sobrenome, o telefone e a empresa.

Esses dados ficam só para o organizador. A página pública do evento, a lista de confirmações e o e-mail exibido no cabeçalho do painel não mudam por causa desta feature.

## 2. Problema que resolve

A conta do organizador hoje só identifica a pessoa pelo e-mail de login. Não há lugar para guardar nome, sobrenome, telefone ou empresa. Quem organiza o evento não consegue registrar esses dados no próprio sistema.

## 3. Público-alvo

O **organizador** já autenticado no painel. Continua sendo a conta de acesso ao painel; o convidado não entra nesta área e não vê estes dados.

## 4. Objetivo do recorte atual

Dar ao organizador uma página no painel para consultar o e-mail da conta e manter nome, sobrenome, telefone e empresa atualizados, com nome e sobrenome obrigatórios e telefone e empresa opcionais.

## 5. Funcionalidades

**Essenciais:**

- Link **Meu perfil** no menu do painel, ao lado de **Meus Eventos**, alcançável em tela larga e em tela estreita.
- Página da área com os dados atuais do organizador.
- E-mail da conta visível e bloqueado para edição.
- Edição e gravação de nome e sobrenome (obrigatórios).
- Edição, gravação e limpeza de telefone (opcional; se preenchido, telefone brasileiro com DDD, celular ou fixo).
- Edição, gravação e limpeza de empresa (opcional).
- Confirmação quando a gravação funciona e aviso claro quando algum campo impede salvar.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Alterar o e-mail de login.
- Alterar ou redefinir a senha (o fluxo já existente de recuperação de senha permanece como está).
- Foto ou avatar.
- Mostrar nome, sobrenome, telefone ou empresa na página pública do evento, nas confirmações, na lista de eventos ou no lugar do e-mail do cabeçalho.
- Obrigar o preenchimento do perfil para usar o restante do painel.
- Cadastro público de conta e mais de um organizador.
- Validar se o DDD existe na lista oficial da telefonia brasileira.

## 7. Regras de negócio

- Regra 1: Só o organizador autenticado abre e altera Meu perfil. Quem não tem sessão segue o mesmo destino de login do restante do painel. O convidado não acessa.
- Regra 2: O e-mail exibido é o e-mail de login da conta. Ele não é editável nesta área. Uma tentativa de enviá-lo diferente é ignorada; o e-mail de login permanece o atual.
- Regra 3: Nome e sobrenome são obrigatórios para gravar. Podem ser trocados por outros valores válidos. Não podem ser apagados de forma que a gravação fique sem um dos dois.
- Regra 4: Telefone e empresa são opcionais. Podem ficar em branco na primeira gravação e podem ser apagados numa gravação posterior.
- Regra 5: Telefone preenchido precisa ser um telefone brasileiro com DDD, fixo ou celular. Vazio é válido. Inválido não grava nada do formulário.
- Regra 6: Gravação inválida não altera os dados já salvos.
- Regra 7: Perfil incompleto não bloqueia lista de eventos, criação, edição, link, confirmações nem saída do painel.
- Regra 8: Nome, sobrenome, telefone e empresa não aparecem fora de Meu perfil.

## 8. Fluxos principais

### Fluxo 1 — Abrir Meu perfil

1. O organizador está autenticado no painel.
2. No menu, ao lado de **Meus Eventos**, escolhe **Meu perfil**.
3. A área abre mostrando o que já está gravado.
4. O e-mail da conta aparece e não pode ser editado.
5. Se nome e sobrenome ainda não foram gravados, esses campos aparecem vazios. Telefone e empresa vazios aparecem em branco.

### Fluxo 2 — Salvar alterações válidas

1. Na área Meu perfil, o organizador informa nome e sobrenome, e opcionalmente telefone e empresa.
2. Aciona salvar.
3. O sistema confere os campos.
4. Se estiver válido, grava e mantém o organizador na mesma área, já com os valores salvos, e confirma que deu certo.

### Fluxo 3 — Corrigir uma tentativa inválida

1. O organizador tenta salvar sem nome, sem sobrenome, ou com telefone em formato que não é brasileiro com DDD.
2. O sistema não grava.
3. A área explica o que precisa ser corrigido, junto do campo correspondente.
4. Os valores que já estavam salvos antes dessa tentativa continuam valendo.

### Fluxo 4 — Apagar telefone ou empresa

1. O organizador já tem telefone e/ou empresa gravados.
2. Limpa um desses campos ou os dois, mantém nome e sobrenome válidos e salva.
3. O sistema grava a ausência daquele dado opcional e confirma o sucesso.

## 9. Critérios de aceite

- O organizador autenticado encontra o link **Meu perfil** ao lado de **Meus Eventos** e abre a área tanto em tela larga quanto em tela estreita.
- Sem sessão, a área não abre e o caminho é o mesmo de quem tenta entrar no painel sem login.
- O organizador vê o e-mail da conta e não consegue alterá-lo por esta área.
- O organizador consegue gravar nome e sobrenome e, depois, trocá-los por outros valores válidos.
- O organizador consegue deixar telefone e empresa em branco, preenchê-los e, mais tarde, apagá-los.
- Com telefone preenchido, o sistema só aceita telefone brasileiro com DDD, celular ou fixo, digitado com ou sem pontuação.
- Quando a gravação é inválida, nada do que já estava salvo muda, e o organizador vê o que corrigir.
- Quando a gravação é válida, o organizador vê a confirmação e, ao abrir Meu perfil de novo, encontra os mesmos dados.
- Nome, sobrenome, telefone e empresa não aparecem na página pública, nas confirmações nem no lugar do e-mail do cabeçalho.
- O restante do painel continua utilizável mesmo se nome e sobrenome ainda estiverem vazios.

## 10. Stack

A feature usa o que o Confirm Event já tem: Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, formulários com validação no cliente e no servidor, e Supabase (Auth para a sessão e o e-mail de login; Postgres para os dados do perfil). Não exige serviço externo novo.

## 11. Justificativa da stack

O painel, o login do organizador e os formulários administrativos já existem nessa stack. Meu perfil é mais uma área autenticada do mesmo organizador. O e-mail continua sendo o da conta de acesso; nome, sobrenome, telefone e empresa são dados do perfil, separados da página pública.

## 12. Fases de construção

### Fase 1 — Meu perfil

Objetivo: o organizador abre Meu perfil no painel, vê o e-mail bloqueado e grava ou atualiza nome, sobrenome, telefone e empresa conforme as regras deste recorte.

Specs:

- Spec 01 — Área Meu perfil

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Área Meu perfil

- **Fase:** Fase 1 — Meu perfil
- **Objetivo (o quê):** Oferecer no painel a área **Meu perfil**, em que o organizador vê o e-mail da conta sem editá-lo e grava ou atualiza nome, sobrenome, telefone e empresa.
- **Intenção (por quê):** A conta hoje só é reconhecida pelo e-mail. O organizador precisa de um lugar próprio para registrar quem é e um contato opcional, sem misturar isso com o evento nem com a página do convidado.
- **Contexto:** O painel já exige organizador autenticado, lista eventos em **Meus Eventos** e mostra o e-mail da conta no cabeçalho, com a ação de sair. Não existe perfil com nome, sobrenome, telefone ou empresa. A conta continua sendo a conta de acesso já criada fora do cadastro público. Esta spec reutiliza essa sessão e esse e-mail; não cria outra conta e não altera eventos nem confirmações.
- **Atores:** Organizador autenticado. O convidado não participa.
- **Descrição do comportamento:** No menu do painel, ao lado de **Meus Eventos**, existe o link com o texto exato **Meu perfil**. Esse acesso permanece alcançável em tela larga e em tela estreita. Ao abri-lo, o organizador vê uma página só desta conta, com os valores já gravados. O e-mail de login aparece identificado como o e-mail da conta e não é um campo editável; fica evidente que ele não se altera aqui. Nome e sobrenome são campos editáveis. Telefone e empresa são campos editáveis e podem ficar vazios. Na primeira visita, se nada foi gravado ainda, nome, sobrenome, telefone e empresa aparecem vazios e o e-mail da conta aparece mesmo assim. Salvar envia nome, sobrenome, telefone e empresa. O sistema ignora qualquer tentativa de mudar o e-mail. Espaços só nas pontas de nome, sobrenome e empresa não contam como conteúdo. Se nome e sobrenome, depois disso, tiverem texto, e o telefone estiver vazio ou for um telefone brasileiro válido com DDD, a gravação substitui o perfil inteiro desses quatro dados (e-mail fora) e a própria área mostra os valores salvos mais uma confirmação de sucesso. Se nome ou sobrenome ficarem sem texto, ou se o telefone preenchido for inválido, nada é gravado, os dados anteriores permanecem e a área indica o campo com problema. Limpar telefone ou empresa, com nome e sobrenome válidos, grava esses opcionais como ausentes. Falha inesperada ao gravar também não troca o que já estava salvo e informa que não foi possível salvar. Sair de Meu perfil e voltar mostra a última gravação bem-sucedida. O restante do painel não passa a exigir perfil completo.
- **Entradas e saídas:**
  - Entrada ao abrir: sessão do organizador; e-mail de login da conta; perfil já gravado, se existir (nome, sobrenome, telefone, empresa).
  - Entrada ao salvar: nome, sobrenome, telefone e empresa informados na área. O e-mail não é entrada editável.
  - Saída em sucesso: perfil atualizado; a área reexibe os valores gravados e uma confirmação de que salvou.
  - Saída em validação recusada: perfil anterior intacto; mensagens no nome, no sobrenome e/ou no telefone, conforme o caso.
  - Saída em falha de gravação: perfil anterior intacto; aviso de que não foi possível salvar.
  - Fora da área: nenhuma saída nova. Página pública, confirmações, lista de eventos e o e-mail do cabeçalho seguem como já eram.
- **Dados/entidades envolvidos (conceitual):**
  - Conta do organizador: e-mail de login (somente leitura nesta área) e sessão.
  - Perfil do organizador: nome, sobrenome, telefone (opcional), empresa (opcional). Um perfil por conta. Ausência de perfil é o estado inicial, não um erro.
- **Estados e transições:**
  - **Sem perfil:** nome e sobrenome ainda não gravados; telefone e empresa ausentes; e-mail da conta visível. É o estado das contas que já existem quando a área entra no ar.
  - **Perfil gravado:** nome e sobrenome presentes; telefone e empresa presentes ou ausentes, conforme a última gravação válida.
  - Transição para **perfil gravado:** salvar com nome e sobrenome válidos e telefone vazio ou válido.
  - Permanência no estado anterior: salvar inválido ou falha ao gravar. A tela pode mostrar o que a pessoa digitou para ela corrigir, mas o que vale ao reabrir é a última gravação válida (ou a ausência dela).
- **Regras de negócio:** Regras 1 a 8 da seção 7. O texto do link é exatamente **Meu perfil**.
- **Validações:**
  - Nome: obrigatório. Depois de ignorar espaços nas pontas, precisa ter conteúdo. **Suposição:** no máximo 80 caracteres. Só espaços não vale.
  - Sobrenome: a mesma regra do nome, em separado. Nome preenchido não dispensa sobrenome, e o contrário também não.
  - Empresa: opcional. Só espaços equivale a vazia e é gravada como ausente. Se houver texto, **suposição:** no máximo 120 caracteres.
  - Telefone: opcional. Vazio ou só espaços é válido e gravado como ausente. Se houver conteúdo, vale o número nacional com DDD, com ou sem pontuação comum (parênteses, espaço, hífen). Contam-se os dígitos. Fixo: 10 dígitos (DDD de 2 dígitos + 8 do número). Celular: 11 dígitos (DDD de 2 dígitos + 9 do número, e esse número começa com 9). Se a pessoa digitar `+55` ou `55` na frente e o restante cumprir a regra do fixo ou do celular, também é aceito. Qualquer outra quantidade de dígitos, letra no lugar do número, celular de 11 dígitos que não comece com 9 depois do DDD, ou número sem DDD é inválido. Não se verifica se aquele DDD existe na lista oficial.
  - E-mail: não se valida como campo editável. Permanece o e-mail de login já conhecido.
  - A gravação é tudo ou nada: um campo inválido impede salvar os outros campos desta tentativa.
- **Fluxo do usuário (passo a passo):**
  1. O organizador entra no painel com a sessão já válida.
  2. Aciona **Meu perfil** no menu, ao lado de **Meus Eventos**.
  3. Vê o e-mail bloqueado e os campos de nome, sobrenome, telefone e empresa com o último valor gravado, ou vazios.
  4. Ajusta o que quiser, inclusive apagando telefone ou empresa, ou trocando nome e sobrenome.
  5. Salva.
  6. Se estiver válido, permanece na área, vê a confirmação e os dados salvos. Se não estiver, corrige o que a área apontou e pode salvar de novo. Os dados antigos só mudam depois de uma gravação válida.
- **Casos de borda e erros:**
  - Conta antiga sem nome: a área abre vazia nesses campos, com o e-mail visível. Usar eventos, link e confirmações continua permitido.
  - Nome ou sobrenome só com espaços: tratado como vazio; não grava; pede o campo.
  - Troca de nome e sobrenome por outros textos válidos: grava os novos e, na próxima abertura, mostra os novos.
  - Telefone `(11) 98888-7777`, `11988887777` ou `+55 11 98888-7777`: aceitos como celular com DDD.
  - Telefone de fixo com 10 dígitos e DDD, com ou sem pontuação: aceito.
  - Telefone com 8 ou 9 dígitos sem DDD, com letras, ou celular que não começa com 9: não grava; explica que o telefone precisa ser brasileiro, com DDD, celular ou fixo.
  - Apagar telefone e/ou empresa numa conta que já os tinha, com nome e sobrenome válidos: a próxima abertura mostra esses campos em branco e mantém nome e sobrenome.
  - Tentativa de alterar o e-mail (campo desabilitado ou envio forçado): o e-mail de login não muda; login e recuperação de senha seguem nesse e-mail.
  - Falha ao gravar: mensagem de erro genérica de que não foi possível salvar; reabrir a área mostra o perfil anterior.
  - Sessão ausente ou expirada ao abrir ou ao salvar: não altera o perfil e segue o fluxo já existente de retorno ao login do painel.
  - Convidado na página pública: não vê link, dados nem formulário de Meu perfil.
- **Impacto no existente:** O menu do painel ganha **Meu perfil** ao lado de **Meus Eventos**, também em tela estreita. O e-mail do cabeçalho, a saída, a recuperação de senha, eventos, links, confirmações e a página pública permanecem com o comportamento atual. O e-mail de login não passa a ser editável.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o organizador autenticado no painel, quando procura o menu, então vê o link **Meu perfil** ao lado de **Meus Eventos** e consegue abri-lo em tela larga e em tela estreita.
  - Dado alguém sem sessão, quando tenta abrir Meu perfil, então não vê os dados do organizador e é encaminhado ao login, como nas outras áreas do painel.
  - Dado o organizador na área, quando olha o e-mail, então vê o e-mail de login e não consegue substituí-lo.
  - Dado um perfil ainda vazio e nome e sobrenome válidos, com telefone e empresa em branco, quando salva, então esses nome e sobrenome passam a aparecer ao reabrir a área e o restante do painel continua disponível como antes.
  - Dado nome e sobrenome já gravados, quando o organizador os troca por outros valores válidos e salva, então a próxima abertura mostra os valores novos.
  - Dado nome ou sobrenome vazio (ou só espaços), quando salva, então nada é gravado e a área aponta o campo obrigatório que falta.
  - Dado telefone vazio, quando salva com nome e sobrenome válidos, então a gravação conclui sem telefone.
  - Dado um celular ou fixo brasileiro com DDD, digitado com ou sem pontuação (e com ou sem `+55` na frente), quando salva com nome e sobrenome válidos, então o telefone fica gravado e aparece ao reabrir.
  - Dado um telefone sem DDD, com quantidade errada de dígitos ou em formato que não seja celular nem fixo brasileiro, quando salva, então nada é gravado e a área explica o problema no telefone.
  - Dado telefone ou empresa já gravados, quando o organizador apaga esse campo, mantém nome e sobrenome válidos e salva, então a próxima abertura mostra o campo apagado em branco.
  - Dado uma falha ao gravar, quando o organizador reabre Meu perfil, então vê o último perfil válido, não a tentativa que falhou.
  - Dado qualquer gravação de perfil, quando o organizador abre a página pública, a lista de eventos ou o cabeçalho, então nome, sobrenome, telefone e empresa do perfil não substituem o e-mail do cabeçalho nem aparecem para o convidado.
- **Definição de pronto:** O organizador autenticado abre **Meu perfil** pelo menu, vê o e-mail bloqueado, grava e reedita nome e sobrenome, preenche ou limpa telefone e empresa, recebe confirmação ou correção conforme a validação, e o restante do produto segue igual para quem não usa essa área. Os critérios acima podem ser conferidos um a um.
- **Dependências:** Nenhuma spec deste PRD. Depende do acesso já existente do organizador ao painel (sessão e e-mail de login). Não depende de evento criado.
- **Fora do escopo desta spec:** Troca de e-mail, troca de senha, foto, exibir o perfil fora desta área, bloquear o painel até o perfil estar completo, cadastro de novas contas e validar a lista oficial de DDDs.

## 14. Ordem recomendada de implementação

1. Spec 01 — Área Meu perfil

Há uma única spec: ela inclui o acesso pelo menu e a gravação dos dados, porque a página sem salvar, ou o salvar sem a página, não entrega o que o organizador precisa. Implementá-la por inteiro evita uma área só de leitura ou um perfil sem entrada no painel.
