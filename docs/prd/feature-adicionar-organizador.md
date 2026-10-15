# PRD — Adicionar organizador ao evento

> Tipo: PRD de feature · Data: 2026-10-14
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

O organizador que cria um evento pode incluir outras contas já cadastradas como organizadoras daquele mesmo evento. A busca é pelo e-mail inteiro. Se a conta existe, a inclusão é imediata e o evento passa a aparecer em **Meus Eventos** dessa pessoa. Se não existe, o sistema responde **usuário não cadastrado.**

Cada evento passa a ter um criador. Só o criador e os organizadores que ele incluiu veem e gerem o evento no painel. O organizador incluído faz o mesmo que o criador na ficha do evento, exceto três coisas: não inclui organizador, não remove organizador e não exclui o evento. Ele pode sair. Só volta se o criador incluir o mesmo e-mail de novo.

Na lista **Meus Eventos**, cada evento mostra **criado por:** seguido do nome do criador.

## 2. Problema que resolve

Hoje não existe dono do evento. Qualquer conta que entra no painel lê e altera todos os eventos e todas as confirmações. Não há como duas pessoas organizarem o mesmo evento sem as duas enxergarem também os eventos uma da outra.

Quem cria o evento precisa dividir a organização com outra pessoa que já tem conta, sem abrir o painel inteiro para ela e sem cadastrar uma conta nova na hora.

## 3. Público-alvo

O **organizador criador**, autenticado no painel, ao incluir ou remover organizadores do evento que ele criou.

O **organizador incluído**, autenticado no painel, ao ver esse evento em **Meus Eventos**, geri-lo com as mesmas ações do criador (exceto incluir organizador, remover organizador e excluir o evento) e sair quando quiser.

O convidado da página pública não usa esta feature. Ele continua confirmando presença sem login.

## 4. Objetivo do recorte atual

Fazer um evento pertencer ao criador e aos organizadores que ele incluir, mostrar quem criou na lista, incluir uma conta existente pelo e-mail e permitir que o criador remova um organizador ou que o organizador incluído saia.

## 5. Funcionalidades

**Essenciais:**

- Todo evento tem um criador: a conta que o criou. Os eventos que já existem ficam com a conta `cleverton.nvs@gmail.com`.
- **Meus Eventos** lista só os eventos em que a conta é criadora ou organizadora incluída.
- Cada card dessa lista mostra **criado por:** e o nome do criador. Sem nome gravado no perfil, mostra o e-mail da conta.
- Quem não organiza o evento não vê os dados dele no painel.
- Na ficha do evento, o criador busca um e-mail inteiro e inclui a conta na hora.
- E-mail sem conta cadastrada produz a mensagem **usuário não cadastrado.**
- O criador vê a lista de organizadores e pode remover os incluídos, com confirmação.
- O organizador incluído vê a mesma lista, não inclui e não remove ninguém, e pode sair do evento, com confirmação.
- O criador não sai e não é removido.
- Só o criador vê e conclui **Excluir evento**.
- Depois de sair ou de ser removida, a pessoa só volta se o criador incluir o e-mail de novo.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Cadastro público de conta nova a partir desta busca.
- E-mail, aviso ou convite para a pessoa aceitar ou recusar. A inclusão é imediata.
- Transferir a criação para outra conta, ou trocar quem é o criador.
- O criador sair do próprio evento.
- O organizador incluído excluir o evento, incluir organizador ou remover organizador.
- Papéis diferentes além de criador e organizador incluído.
- Limite de quantos organizadores um evento pode ter.
- Mostrar telefone ou empresa de outra conta.
- Lista ou busca parcial de contas. A busca não devolve outras pessoas além do e-mail informado.
- Alterar a página pública, o link do evento ou a forma como o convidado confirma presença.
- Alterar **Meu perfil**, o e-mail de login ou a senha.

## 7. Regras de negócio

- Regra 1: Cada evento tem exatamente um criador. O criador é a conta autenticada que criou o evento. Os eventos já existentes, sem criador, passam a ter como criador a conta `cleverton.nvs@gmail.com`, desde que essa conta exista.
- Regra 2: Um organizador incluído é uma conta diferente do criador, vinculada àquele evento pelo criador. A mesma conta não entra duas vezes no mesmo evento.
- Regra 3: A conta vê em **Meus Eventos**, e abre no painel, somente os eventos em que é criadora ou organizadora incluída. Os dados do evento, o link, as confirmações e a lista de organizadores não aparecem para quem está fora.
- Regra 4: A página pública do evento continua aberta a quem tiver o link, sem login, como hoje.
- Regra 5: O organizador incluído pode alterar os dados do evento, o link, o tema, a imagem, a janela de confirmação, a capacidade e a lista de presenças, no mesmo alcance do criador. Não pode excluir o evento, não pode incluir organizador e não pode remover organizador.
- Regra 6: Só o criador inclui organizador. A busca usa o e-mail inteiro, sem considerar maiúsculas e minúsculas e ignorando espaços no começo e no fim. E-mail vazio, incompleto ou com formato inválido não é buscado.
- Regra 7: Se não houver conta com aquele e-mail, o sistema informa **usuário não cadastrado.** e não cria vínculo. Se a conta existe e ainda não organiza aquele evento, o vínculo é criado na hora, sem aceite. Perfil sem nome não impede a inclusão.
- Regra 8: Se a conta já é a criadora ou já está incluída naquele evento, o sistema avisa **Este usuário já é organizador deste evento.** e não duplica o vínculo.
- Regra 9: Só o criador remove um organizador incluído. Ninguém remove o criador. O criador não tem ação de sair. O organizador incluído pode sair só daquele evento.
- Regra 10: Sair ou ser removido tira o acesso na hora. O evento some de **Meus Eventos** dessa conta. Confirmações, página pública e os outros organizadores permanecem. A volta só ocorre quando o criador inclui de novo o mesmo e-mail.
- Regra 11: **criado por:** usa o nome e o sobrenome gravados em **Meu perfil** do criador, nesta ordem. Se os dois ainda não estiverem gravados, usa o e-mail da conta. Quando o criador atualizar o nome, a lista passa a mostrar o nome novo.
- Regra 12: A lista de organizadores na ficha mostra o criador, marcado como criador, e cada organizador incluído. O nome segue a mesma regra do **criado por:**. Nesta lista, o e-mail da conta também aparece, para o criador conferir quem incluiu.
- Regra 13: Telefone e empresa de outra conta não aparecem. A busca não mostra uma relação de usuários: só responde ao e-mail digitado.
- Regra 14: Remover um organizador e sair do evento pedem confirmação explícita. Cancelar a confirmação não muda o vínculo.

## 8. Fluxos principais

### Fluxo 1 — Ver só os próprios eventos

1. O organizador entra no painel.
2. **Meus Eventos** mostra os eventos em que ele é criador ou organizador incluído.
3. Em cada card, além do que a lista já mostra, aparece **criado por:** e o nome do criador, ou o e-mail se o nome ainda não foi gravado.
4. Ele abre um desses eventos e vê a ficha. Não vê, na lista nem ao abrir o endereço, um evento em que não organiza.

### Fluxo 2 — Incluir um organizador

1. O criador abre o evento.
2. Informa o e-mail inteiro de uma conta já cadastrada e confirma a inclusão.
3. O sistema encontra a conta, cria o vínculo e informa **Organizador adicionado.**
4. A pessoa aparece na lista de organizadores daquele evento.
5. Quando essa pessoa entra no painel, o evento está em **Meus Eventos**, com **criado por:** apontando para o criador.

### Fluxo 3 — E-mail sem conta

1. O criador informa um e-mail inteiro que não pertence a nenhuma conta.
2. O sistema informa **usuário não cadastrado.**
3. A lista de organizadores não muda.

### Fluxo 4 — Remover ou sair

1. O criador, na ficha, pede para remover um organizador incluído e confirma.
2. O sistema informa **Organizador removido.** Essa conta deixa de ver o evento.
3. Em outro evento, o organizador incluído pede para sair e confirma.
4. O sistema informa **Você saiu do evento.** e o leva de volta a **Meus Eventos**, já sem esse evento.
5. Nos dois casos, a pessoa só volta a ver o evento se o criador incluir o e-mail outra vez.

## 9. Critérios de aceite

- O usuário criador consegue incluir, pelo e-mail inteiro, uma ou mais contas já cadastradas no mesmo evento, e cada uma passa a ver o evento em **Meus Eventos**.
- O sistema deve responder **usuário não cadastrado.** quando o e-mail inteiro não pertence a nenhuma conta, e não deve criar vínculo.
- O sistema deve impedir uma segunda inclusão da mesma conta no mesmo evento.
- O sistema deve mostrar em **Meus Eventos** somente eventos da conta logada, cada um com **criado por:** e o nome do criador, ou o e-mail quando não houver nome gravado.
- O sistema deve atribuir os eventos já existentes à conta `cleverton.nvs@gmail.com` como criadora, e os eventos criados depois à conta que os criou.
- O organizador incluído consegue alterar o evento e as presenças como o criador, e consegue sair.
- O sistema não deve deixar o organizador incluído excluir o evento, incluir organizador ou remover organizador.
- O sistema não deve deixar ninguém remover o criador, nem o criador sair do evento.
- Quando a conta sai ou é removida, o sistema deve esconder o evento dessa conta na hora e só devolvê-lo se o criador incluir o mesmo e-mail de novo.
- Quem não organiza o evento não vê título, link, confirmações nem organizadores desse evento no painel. A página pública desse evento continua aceitando confirmação de quem tem o link.

## 10. Stack

A stack já existente do Confirm Event: Next.js, React, TypeScript, Tailwind, shadcn/ui, React Hook Form, Zod, Supabase (Auth e Postgres) e o painel do organizador.

A busca usa as contas já cadastradas no Supabase. Não entra serviço novo de e-mail, cadastro ou fila.

## 11. Justificativa da stack

A feature acontece dentro do painel e das contas que o produto já usa. O perfil já guarda nome e sobrenome. O evento, a lista **Meus Eventos** e a ficha já existem. A entrega reutiliza isso e passa a distinguir quem organiza cada evento.

## 12. Fases de construção

### Fase 1 — Quem é dono do evento

Objetivo: cada evento ter um criador, a lista mostrar só os eventos da conta e identificar quem criou.
Specs:

- Spec 01 — Criador e acesso ao evento
- Spec 02 — Criado por na lista

### Fase 2 — Incluir e retirar organizador

Objetivo: o criador incluir e remover contas, e o organizador incluído poder sair.
Specs:

- Spec 03 — Incluir organizador pelo e-mail
- Spec 04 — Remover organizador e sair do evento

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Criador e acesso ao evento

- **Fase:** Fase 1 — Quem é dono do evento
- **Objetivo (o quê):** Cada evento fica com um criador, a conta só vê no painel os eventos em que organiza, e quem está de fora não lê os dados desse evento.
- **Intenção (por quê):** Sem um criador e sem separar o acesso, incluir outra pessoa não muda nada: hoje qualquer conta autenticada já vê e altera todos os eventos. Esta spec é a base para a lista, a inclusão e a saída fazerem sentido.
- **Contexto:** O painel já lista todos os eventos em **Meus Eventos** e abre a ficha com dados, link, tema, presenças e **Excluir evento**. Não existe criador nem lista de organizadores. A página pública do evento, pelo link, continua sem login. **Meu perfil** já guarda nome, sobrenome, telefone e empresa da própria conta. Conta nova continua sendo criada fora da aplicação.
- **Atores:** O organizador autenticado. O convidado da página pública não participa desta spec.
- **Descrição do comportamento:** Ao criar um evento, a conta autenticada que o criou torna-se a criadora. Ela não precisa incluir a si mesma. Os eventos que já existem, e que ainda não têm criador, passam a ter como criadora a conta `cleverton.nvs@gmail.com`, se essa conta estiver cadastrada. **Meus Eventos** passa a mostrar só os eventos em que a conta logada é criadora. A ficha, o link interno do painel, as presenças e a exclusão só abrem para a criadora enquanto não houver organizador incluído. Outra conta autenticada não vê esses eventos na lista e, se abrir o endereço do evento no painel, não recebe título, detalhes, link, tema, presenças nem qualquer outro dado do evento. A página pública permanece como está. O criador continua podendo editar e excluir o próprio evento. O controle **Excluir evento** existe só para o criador; um organizador incluído, quando passar a existir pela Spec 03, não o vê e uma tentativa direta de excluir não apaga o evento.
- **Entradas e saídas:** Entram a conta autenticada, os eventos já existentes e o evento novo criado por essa conta. Sai a lista só com os eventos dessa conta e a ficha só quando ela é a criadora. Para outra conta, a lista não inclui o evento e a ficha não devolve os dados.
- **Dados/entidades envolvidos (conceitual):** O evento passa a ter um criador, que é uma conta de organizador (e-mail de login e, se já gravado, nome e sobrenome). Os eventos antigos apontam o criador para a conta `cleverton.nvs@gmail.com`. Um evento novo aponta o criador para quem o criou. Telefone e empresa não entram aqui.
- **Estados e transições:** O evento deixa de ser visível para toda conta autenticada e passa a ser visível, no painel, para o criador. Ainda não há organizador incluído nesta spec. Excluir o evento, ação que já existe e continua só com o criador, remove o evento, as confirmações e o link, como hoje.
- **Regras de negócio:** Vale um criador por evento. A criadora dos eventos já existentes é `cleverton.nvs@gmail.com`. A criadora de um evento novo é a conta que o criou. Quem não é criador não vê o evento no painel. A página pública não passa a exigir login. **Excluir evento** só pode ser concluído pelo criador.
- **Validações:** Antes de restringir o acesso, a conta `cleverton.nvs@gmail.com` precisa existir. Se não existir, os eventos já existentes não perdem a visibilidade atual e não ficam sem criador: a restrição desta spec não entra em vigor e o resultado informa que a conta criadora não foi encontrada.
- **Fluxo do usuário (passo a passo):**
  1. A conta `cleverton.nvs@gmail.com` entra no painel.
  2. **Meus Eventos** continua mostrando os eventos que já existiam, agora como eventos criados por ela.
  3. Outra conta autenticada entra no painel e não vê esses eventos.
  4. Essa outra conta cria um evento novo e passa a vê-lo como criadora. A primeira conta não vê esse evento novo.
  5. Quem tem o link público ainda confirma presença, sem login.
- **Casos de borda e erros:** Se `cleverton.nvs@gmail.com` não estiver cadastrada, nada é escondido e a spec não se conclui. Se o endereço do evento no painel for aberto por quem não é o criador, ou por quem não tem sessão, não há vazamento de título, link ou presenças; quem não tem sessão segue para o login, como o restante do painel. Evento inexistente continua inexistente. A lista vazia, para uma conta sem eventos, continua oferecendo criar o primeiro evento.
- **Impacto no existente:** **Meus Eventos** deixa de listar eventos de outras contas. A ficha do painel deixa de abrir para quem não é o criador. A página pública, o formulário de presença e o conteúdo do card (layout, título, situação da confirmação, quantidade, data, horário e local) permanecem. **Excluir evento** permanece para o criador.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado os eventos já existentes e a conta `cleverton.nvs@gmail.com` cadastrada, quando essa conta abre **Meus Eventos**, então ela vê esses eventos.
  - Dado esses mesmos eventos, quando outra conta autenticada abre **Meus Eventos**, então ela não vê esses eventos.
  - Dado outra conta abrindo o endereço de um desses eventos no painel, quando a ficha seria carregada, então título, link, tema e presenças não são exibidos.
  - Dado uma conta autenticada, quando ela cria um evento, então ela é a criadora e vê o evento, e as outras contas não veem esse evento no painel.
  - Dado um evento com link público, quando um convidado abre o link sem login, então a confirmação de presença continua disponível.
  - Dado a conta `cleverton.nvs@gmail.com` ausente no cadastro, quando a feature seria aplicada aos eventos já existentes, então o acesso atual desses eventos não é restringido.
- **Definição de pronto:** Eventos antigos têm a criadora indicada, eventos novos nascem com a conta que os criou, cada conta só vê os próprios na lista e na ficha, e a página pública segue aceitando confirmação.
- **Dependências:** Nenhuma.
- **Fora do escopo desta spec:** O texto **criado por:**, o formulário de incluir por e-mail, a lista de organizadores na ficha, remover organizador e sair do evento. Também não entra avisar ninguém por e-mail.

### Spec 02 — Criado por na lista

- **Fase:** Fase 1 — Quem é dono do evento
- **Objetivo (o quê):** Cada card de **Meus Eventos** informa quem criou o evento.
- **Intenção (por quê):** Quando a mesma conta passa a ter evento próprio e evento em que foi incluída, o título sozinho não diz de quem é a criação. A linha **criado por:** separa isso no primeiro olhar, sem abrir a ficha.
- **Contexto:** A Spec 01 já define o criador de cada evento e já filtra a lista. O card já mostra layout, miniatura quando há imagem, título, se a confirmação está aberta ou encerrada, quantidade de confirmados, data, horário e local. O card inteiro abre a ficha. A lista vazia explica que ainda não há evento e oferece criar o primeiro. **Meu perfil** guarda nome e sobrenome da própria conta; telefone e empresa existem, mas não entram nesta linha.
- **Atores:** Qualquer organizador autenticado olhando **Meus Eventos**, seja criador do evento, seja organizador incluído.
- **Descrição do comportamento:** Em todo card de evento, a lista mostra a linha **criado por:** seguida do nome e do sobrenome do criador, separados por espaço. Se o criador ainda não gravou nome e sobrenome, a linha mostra o e-mail da conta no lugar do nome. A linha aparece também quando quem olha é o próprio criador. Ela não substitui título, data, horário, local, layout, situação ou quantidade. Se o criador depois gravar ou alterar o nome em **Meu perfil**, os cards passam a usar o nome atual. A lista vazia não ganha essa linha.
- **Entradas e saídas:** Entra cada evento visível para a conta, com o criador e o nome gravado ou ausente. Sai o mesmo card de hoje mais a linha **criado por:**.
- **Dados/entidades envolvidos (conceitual):** Criador do evento: nome, sobrenome e e-mail. O e-mail só aparece na linha quando nome e sobrenome não estão os dois gravados.
- **Estados e transições:** Sem nome completo gravado, a linha usa o e-mail. Com nome e sobrenome gravados, a linha usa o nome. Atualizar o perfil do criador atualiza a linha na próxima vez em que a lista é mostrada.
- **Regras de negócio:** A linha usa somente o criador, nunca o nome de um organizador incluído. Nome e sobrenome entram juntos; falta um dos dois e a linha usa o e-mail. Telefone e empresa não aparecem. A lista continua mostrando apenas eventos da Spec 01.
- **Validações:** Não há formulário nesta spec. O texto exibido não pode ficar vazio: ou há nome e sobrenome, ou há o e-mail da conta criadora.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre **Meus Eventos**.
  2. Em cada evento, lê **criado por:** e reconhece o criador pelo nome, ou pelo e-mail se o perfil ainda não tiver nome.
  3. Abre o card como hoje, pelo clique no card.
- **Casos de borda e erros:** Lista vazia permanece o estado vazio atual, sem a linha. Se o nome do criador não puder ser lido, a linha mostra o e-mail, desde que a conta criadora exista. Dois eventos de criadores diferentes mostram cada um o próprio criador.
- **Impacto no existente:** O card ganha uma linha. Layout, título, situação, quantidade, data, horário, local, miniatura e o destino do clique permanecem. A página pública não mostra **criado por:**.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento cujo criador tem nome e sobrenome gravados, quando a conta que organiza esse evento abre **Meus Eventos**, então o card mostra **criado por:** seguido desse nome e desse sobrenome.
  - Dado o criador ainda sem nome e sobrenome gravados, quando a lista é aberta, então **criado por:** mostra o e-mail dessa conta.
  - Dado o próprio criador olhando a lista, quando o card do evento dele aparece, então a linha também aparece, com o nome dele ou com o e-mail.
  - Dado o criador altera o nome em **Meu perfil**, quando a lista é aberta de novo, então **criado por:** mostra o nome novo.
  - Dado a lista sem eventos, quando o organizador a abre, então o estado vazio atual permanece, sem a linha **criado por:**.
  - Dado a página pública, quando o convidado a abre, então **criado por:** não aparece.
- **Definição de pronto:** Todo card de **Meus Eventos** identifica o criador pelo nome ou, na falta do nome, pelo e-mail, e o restante do card e a lista vazia seguem como já eram.
- **Dependências:** Spec 01 — o criador de cada evento, inclusive dos eventos já existentes, precisa estar definido.
- **Fora do escopo desta spec:** Incluir, remover ou sair; lista de organizadores na ficha; mudar os outros textos do card.

### Spec 03 — Incluir organizador pelo e-mail

- **Fase:** Fase 2 — Incluir e retirar organizador
- **Objetivo (o quê):** O criador inclui uma ou mais contas já cadastradas no evento, buscando pelo e-mail inteiro, e o evento passa a aparecer para essas contas.
- **Intenção (por quê):** O criador precisa dividir a organização com alguém que já entra no sistema, sem cadastrar essa pessoa de novo e sem entregar os outros eventos.
- **Contexto:** A Spec 01 restringe o painel ao criador e reserva **Excluir evento** a ele. A Spec 02 identifica o criador na lista. A ficha do evento já permite editar dados, link, tema, imagem, janela, capacidade e presenças. Não há, ainda, lugar para incluir outra conta. As contas vêm do cadastro já existente no Supabase. Não há tela de cadastro na aplicação.
- **Atores:** O criador, ao incluir. A conta incluída, ao passar a ver o evento. O organizador incluído não dispara a inclusão.
- **Descrição do comportamento:** Na ficha do evento, só o criador vê um meio de informar um e-mail e pedir a inclusão. Ele digita o e-mail inteiro da pessoa. O sistema compara com as contas cadastradas, sem diferenciar maiúsculas de minúsculas e ignorando espaços nas pontas. Se encontra a conta e ela ainda não organiza aquele evento, cria o vínculo na hora, mostra **Organizador adicionado.** e a pessoa passa a constar na lista de organizadores da ficha. Não há passo de aceite e nenhum e-mail é enviado. Na próxima entrada dessa pessoa no painel, o evento está em **Meus Eventos**, com **criado por:** do criador, conforme a Spec 02. Na ficha, essa pessoa pode alterar dados, link, tema, imagem, janela, capacidade e presenças no mesmo alcance do criador. Não vê o meio de incluir outra conta, não vê **Excluir evento** e não consegue concluir essas ações por tentativa direta. A lista de organizadores, visível para o criador e para quem foi incluído, mostra o criador marcado como criador e cada pessoa incluída. Cada um aparece com nome e sobrenome, ou com o e-mail se o nome não estiver gravado, e também com o e-mail da conta. Telefone e empresa não aparecem. O criador pode repetir a busca para incluir outras contas, uma por vez.
- **Entradas e saídas:** Entra o e-mail digitado pelo criador e o evento aberto. Sai o vínculo, a mensagem de resultado e a lista de organizadores atualizada. Para a conta incluída, sai o evento em **Meus Eventos** e o acesso à ficha.
- **Dados/entidades envolvidos (conceitual):** Conta cadastrada: e-mail de login e, se houver, nome e sobrenome. Vínculo de organizador incluído: a conta e o evento, distinto do criador. A lista da ficha reúne o criador e os incluídos.
- **Estados e transições:** Conta fora do evento permanece fora quando o e-mail não existe, é inválido ou já organiza o evento. Conta encontrada e ainda fora passa a organizadora incluída. O criador permanece criador. Não existe estado de convite pendente.
- **Regras de negócio:** Só o criador inclui. A inclusão é imediata. Um e-mail corresponde no máximo a uma conta. A mesma conta não é vinculada duas vezes. Incluir a conta não entrega a ela os outros eventos do criador. Perfil incompleto não bloqueia a inclusão. Entrar no painel continua sujeito às regras de login já existentes.
- **Validações:** E-mail vazio, só com espaços, incompleto ou em formato inválido não é buscado e produz **Informe um e-mail válido.** E-mail válido sem conta produz exatamente **usuário não cadastrado.** E-mail de quem já é criador ou já está incluído produz **Este usuário já é organizador deste evento.** Falha inesperada produz **Não foi possível adicionar o organizador. Tente de novo.** e não cria vínculo. Tentativa de inclusão por quem não é o criador não cria vínculo e informa **Você não pode alterar os organizadores deste evento.**
- **Fluxo do usuário (passo a passo):**
  1. O criador abre a ficha do evento.
  2. Informa o e-mail inteiro e pede para incluir.
  3. Se a conta existe e ainda não organiza o evento, vê **Organizador adicionado.** e a pessoa na lista.
  4. A pessoa entra no painel e encontra o evento em **Meus Eventos**.
  5. Ela abre a ficha, altera o que o criador também altera e não encontra inclusão de organizador nem **Excluir evento**.
- **Casos de borda e erros:** O próprio e-mail do criador cai na mensagem de quem já é organizador. Um organizador que saiu ou foi removido pode ser incluído de novo por este mesmo fluxo, porque na hora da busca ele não organiza o evento; a saída em si é a Spec 04. Dois pedidos seguidos com o mesmo e-mail deixam um único vínculo. A busca não lista outras contas e não revela telefone nem empresa. E-mail com diferença só de maiúsculas encontra a mesma conta. Organizador incluído não vê o campo de inclusão.
- **Impacto no existente:** A ficha do criador ganha a inclusão e a lista de organizadores. A conta incluída passa a ver esse evento na lista e na ficha, com as ações já existentes de edição e de presenças. **Excluir evento** some para ela. Os eventos em que ela não foi incluída continuam ocultos. A página pública não muda.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o criador na ficha e um e-mail de conta cadastrada que não organiza o evento, quando ele pede para incluir, então o vínculo é criado, aparece **Organizador adicionado.** e a pessoa entra na lista de organizadores.
  - Dado esse vínculo, quando a conta incluída abre **Meus Eventos**, então o evento aparece com **criado por:** do criador, e a ficha abre para ela.
  - Dado a conta incluída na ficha, quando ela olha as ações, então consegue alterar dados e presenças, e não vê inclusão de organizador nem **Excluir evento**.
  - Dado um e-mail inteiro sem conta, quando o criador pede para incluir, então aparece **usuário não cadastrado.** e a lista não muda.
  - Dado o e-mail do criador ou de alguém já incluído, quando o criador busca de novo, então aparece **Este usuário já é organizador deste evento.** e não surge um segundo vínculo.
  - Dado um e-mail vazio ou inválido, quando o criador pede para incluir, então aparece **Informe um e-mail válido.** e nenhuma busca de conta é tratada como ausência de cadastro.
  - Dado um organizador incluído, quando ele tenta incluir outra conta, então o vínculo não é criado e aparece **Você não pode alterar os organizadores deste evento.**
  - Dado a conta incluída em um evento, quando ela abre **Meus Eventos**, então os outros eventos do criador, nos quais ela não foi incluída, não aparecem.
- **Definição de pronto:** O criador inclui uma ou mais contas pelo e-mail, com as três mensagens de recusa e a de sucesso, e cada conta incluída vê só os eventos em que organiza, sem poder excluir o evento nem incluir outra pessoa.
- **Dependências:** Spec 01 — criador e acesso. Spec 02 — a linha **criado por:** que a conta incluída passa a ver na lista.
- **Fora do escopo desta spec:** Remover organizador, sair do evento, e-mail de aviso, cadastro de conta nova e aceite do convidado.

### Spec 04 — Remover organizador e sair do evento

- **Fase:** Fase 2 — Incluir e retirar organizador
- **Objetivo (o quê):** O criador retira um organizador incluído, e o organizador incluído sai sozinho. Os dois só se reencontram no evento se o criador incluir o e-mail de novo.
- **Intenção (por quê):** A pessoa incluída não pode ficar presa no evento, e o criador precisa desfazer uma inclusão. O criador, porém, não pode sumir: o evento ficaria sem dono e sem ninguém capaz de incluir de novo.
- **Contexto:** A Spec 03 já inclui contas e já mostra, na ficha, o criador e os organizadores incluídos. O criador já é o único que inclui. **Excluir evento** já é só do criador, pela Spec 01. Remover uma presença e excluir o evento já pedem confirmação explícita no produto; remover organizador e sair seguem esse mesmo cuidado.
- **Atores:** O criador, ao remover um organizador incluído. O organizador incluído, ao sair. O criador não sai. Ninguém remove o criador.
- **Descrição do comportamento:** Na lista de organizadores da ficha, o criador tem, em cada organizador incluído, a ação de remover. Não há essa ação no próprio criador. Ao pedir a remoção, o sistema pede confirmação explícita, deixando claro que a pessoa perde o acesso àquele evento e que as confirmações de presença permanecem. Se o criador confirma, o vínculo acaba, a pessoa sai da lista e o sistema informa **Organizador removido.** Se cancela, nada muda. O organizador incluído não vê ação de remover o criador nem os outros incluídos. Ele vê **Sair do evento**. Ao pedir para sair, o sistema pede confirmação explícita, deixando claro que ele perde o acesso e só volta se o criador incluir o e-mail de novo. Se confirma, o vínculo acaba, o sistema informa **Você saiu do evento.** e o leva a **Meus Eventos**, já sem esse evento. Se cancela, permanece na ficha. O criador não vê **Sair do evento**. Depois da saída ou da remoção, a conta não vê o evento na lista e não obtém dados ao abrir o endereço no painel. A página pública, as presenças e os organizadores que ficaram não mudam. O criador pode incluir o mesmo e-mail outra vez pela Spec 03; aí o acesso volta. Uma tentativa direta de remover o criador, de o incluído remover outra pessoa, ou de o criador sair, não altera o vínculo.
- **Entradas e saídas:** Entram o evento, quem pede a ação e a confirmação ou o cancelamento. Sai o vínculo encerrado, ou o estado anterior se a pessoa cancelar. A conta que saiu ou foi removida perde o evento na lista e na ficha.
- **Dados/entidades envolvidos (conceitual):** O vínculo entre a conta incluída e o evento. O criador não é um vínculo removível. Presenças, página pública e criador permanecem.
- **Estados e transições:** Organizador incluído, quando removido pelo criador ou quando sai, volta a estar fora do evento. Fora do evento, só retorna ao estado de incluído se o criador incluir o e-mail de novo. O criador não tem transição de saída.
- **Regras de negócio:** Só o criador remove incluídos. O incluído só remove a si mesmo, pela ação de sair. O criador não sai e não é removido. Cancelar a confirmação não altera nada. Sair de um evento não tira a pessoa dos outros eventos em que organiza, nem apaga eventos que ela mesma criou. Não há desfazer automático: a volta depende de nova inclusão pelo criador.
- **Validações:** A remoção só vale para um organizador incluído daquele evento, pedida pelo criador, depois da confirmação. Sair só vale para um organizador incluído daquele evento, depois da confirmação. Pedido sem ser criador, pedido contra o criador, ou pedido de sair feito pelo criador, é recusado com **Você não pode alterar os organizadores deste evento.** e sem mudança. Falha inesperada na remoção informa **Não foi possível remover o organizador. Tente de novo.** Falha inesperada ao sair informa **Não foi possível sair do evento. Tente de novo.** O vínculo permanece nessas falhas.
- **Fluxo do usuário (passo a passo):**
  1. O criador abre a ficha e vê os organizadores incluídos.
  2. Pede para remover um deles, lê a confirmação e confirma.
  3. Vê **Organizador removido.** e a lista sem essa pessoa.
  4. Essa pessoa, se estiver no painel, deixa de ver o evento.
  5. Noutro evento, o organizador incluído pede para sair, confirma e volta a **Meus Eventos** sem aquele evento.
  6. O criador, se quiser, inclui o mesmo e-mail de novo.
- **Casos de borda e erros:** Cancelar a confirmação mantém a pessoa no evento. Remover ou sair não apaga presenças nem fecha a página pública. O criador não encontra **Sair do evento** nem ação de remover a si mesmo. O incluído não encontra ação de remover os outros. Se a pessoa já não estiver no evento quando a confirmação é concluída, a lista segue sem ela e nenhuma prescrição é apagada. Sair não remove a pessoa de um segundo evento em que também foi incluída. Depois de sair, abrir o endereço antigo no painel não mostra os dados do evento.
- **Impacto no existente:** A ficha ganha remover, para o criador, e sair, para o incluído. **Excluir evento**, a edição e as presenças de quem continua no evento não mudam. A lista **Meus Eventos** deixa de mostrar o evento só para quem saiu ou foi removido.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o criador e um organizador incluído, quando o criador confirma a remoção, então o vínculo acaba, aparece **Organizador removido.** e essa conta não vê mais o evento em **Meus Eventos** nem os dados na ficha.
  - Dado o criador ainda na confirmação da remoção, quando ele cancela, então o organizador continua no evento.
  - Dado um organizador incluído, quando ele confirma **Sair do evento**, então o vínculo acaba, aparece **Você saiu do evento.**, ele vai para **Meus Eventos** e o evento não está mais lá.
  - Dado o criador na ficha, quando ele procura uma ação de sair ou de remover a si mesmo, então essa ação não existe, e uma tentativa direta não tira o criador do evento.
  - Dado um organizador incluído, quando ele tenta remover o criador ou outro incluído, então nada muda e aparece **Você não pode alterar os organizadores deste evento.**
  - Dado a pessoa removida ou que saiu, quando o criador inclui o mesmo e-mail de novo, então ela volta a ver o evento.
  - Dado a remoção ou a saída concluída, quando alguém abre a página pública, então as presenças e a confirmação de novos nomes continuam como estavam.
  - Dado a pessoa organiza dois eventos, quando ela sai de um, então o outro permanece em **Meus Eventos**.
- **Definição de pronto:** O criador remove incluídos com confirmação, o incluído sai com confirmação, o criador permanece, e a mesma conta só volta por uma nova inclusão do criador.
- **Dependências:** Spec 03 — é preciso existir organizador incluído e a lista na ficha. Spec 01 — o criador não é removível e quem fica fora não vê o evento.
- **Fora do escopo desta spec:** Transferir a criação, o criador sair, excluir o evento ao sair, e avisar por e-mail que a pessoa foi removida.

## 14. Ordem recomendada de implementação

1. Spec 01 — Criador e acesso ao evento
2. Spec 02 — Criado por na lista
3. Spec 03 — Incluir organizador pelo e-mail
4. Spec 04 — Remover organizador e sair do evento

A Spec 01 vem primeiro porque, sem criador e sem fechar o acesso, a inclusão não separa os eventos. A Spec 02 só tem o que mostrar depois que o criador existe, inclusive nos eventos já atribuídos a `cleverton.nvs@gmail.com`. A Spec 03 depende desse acesso para a conta incluída ver um evento e não ver os outros. A Spec 04 depende de já haver quem remover e de onde sair. Seguir essa ordem evita uma lista **criado por:** sem dono, ou uma saída de um vínculo que ainda não pode ser criado.
