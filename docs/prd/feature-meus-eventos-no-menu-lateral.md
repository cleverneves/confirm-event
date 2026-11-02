# PRD — Meus Eventos no menu lateral

> Tipo: PRD de feature · Data: 2026-11-02
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

Dentro de um evento, o menu lateral passa a ter, no topo e separado das áreas daquele evento, o item **Meus Eventos**. Esse item abre a lista que já existe, com os eventos da conta.

O botão **Novo Evento** sai do menu superior e passa a ficar na própria lista, na mesma faixa do título **Meus Eventos**.

No menu superior saem só esses dois controles. Permanecem o logotipo **Confirm Event**, **Meu perfil**, o nome, a foto e **Sair**. A trilha **Meus Eventos** nas páginas do evento e na criação do evento permanece.

## 2. Problema que resolve

**Meus Eventos** e **Novo Evento** estão no menu superior, longe do menu que a pessoa usa enquanto está num evento. Para voltar à lista, ela sobe até o topo. Para criar outro evento, o botão também está no topo, em todas as telas do painel, inclusive onde criar um evento não é a tarefa da tela.

Este recorte coloca a volta à lista no menu lateral do evento e deixa a criação de evento na área em que a lista é vista.

## 3. Público-alvo

O **organizador** autenticado, nas telas do painel: a lista **Meus Eventos**, a ficha de um evento ao qual ele tem acesso, as áreas desse evento que já usam o menu lateral, a criação de evento e **Meu perfil**.

O convidado não vê o painel, o menu lateral nem a lista.

## 4. Objetivo do recorte atual

1. Incluir **Meus Eventos** no topo do menu lateral do evento, separado de **Convidados** e **Configurações**, levando à lista de eventos da conta.
2. Colocar **Novo Evento** na lista **Meus Eventos**, junto do título, abrindo a mesma criação de evento de hoje.
3. Retirar **Meus Eventos** e **Novo Evento** do menu superior, mantendo o restante do cabeçalho e a trilha já existente.

## 5. Funcionalidades

**Essenciais:**

- Item **Meus Eventos** no menu lateral do evento, acima de **Convidados**, com separação visual em relação às áreas do evento.
- O item abre a lista **Meus Eventos** já existente.
- O item segue o menu reduzido e o menu expandido.
- Botão **Novo Evento** na faixa do título da lista **Meus Eventos**, visível com lista cheia, lista vazia ou falha ao carregar.
- Remover do menu superior o link **Meus Eventos** e o botão **Novo Evento**.
- Manter no menu superior o logotipo **Confirm Event**, **Meu perfil**, o nome, a foto e **Sair**.
- Manter a trilha **Meus Eventos** na ficha, nas áreas do evento e na criação de evento.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Mudar quais eventos entram na lista, a ordem, o card, as métricas, o estado vazio ou o aviso de falha ao carregar.
- Unificar ou remover o botão **Criar evento** que a lista vazia já mostra. **Suposição:** ele permanece, com o mesmo nome e o mesmo destino de hoje. A lista vazia pode, portanto, oferecer **Novo Evento** no título e **Criar evento** na mensagem de vazio; os dois abrem a mesma criação.
- Mudar o formulário, as regras ou o destino da criação de evento.
- Incluir **Novo Evento** no menu lateral.
- Alterar **Convidados**, **Configurações**, **Reduzir menu**, **Expandir menu**, ou a regra de menu reduzido e expandido.
- Mostrar o menu lateral na lista **Meus Eventos**, em **Meu perfil** ou na criação de evento.
- Remover a trilha **Meus Eventos** ou fazer o logotipo **Confirm Event** deixar de abrir a lista.
- Acrescentar trilha em **Meu perfil**.
- Mudar **Meu perfil**, **Sair**, nome ou foto.

## 7. Regras de negócio

- Regra 1: **Meus Eventos** no menu lateral é um link para a lista já titulada **Meus Eventos**. A lista continua mostrando os eventos que a conta criou, os eventos em que a conta foi adicionada e os mesmos casos legados que essa lista já inclui hoje. Este recorte não altera esse conjunto.
- Regra 2: O item fica no topo do menu, acima de **Convidados**. Entre ele e **Convidados** há uma separação visual clara, nos dois estados do menu, para que ele seja lido como saída do evento, e não como mais uma área daquele evento. **Convidados**, **Configurações** e o controle de reduzir ou expandir permanecem na ordem e no comportamento atuais. O controle de reduzir ou expandir continua separado no fim do menu.
- Regra 3: Com o menu expandido, o item mostra ícone e o título **Meus Eventos**. Com o menu reduzido, mostra só o ícone, e o título **Meus Eventos** aparece ao passar o mouse ou ao focar, no mesmo recurso já usado nos outros itens só com ícone. O ícone é próprio desse item e é diferente do ícone de **Convidados** e do ícone de **Configurações**.
- Regra 4: Enquanto a pessoa está num evento, **Meus Eventos** não é a área atual do menu. **Convidados** e **Configurações** continuam sendo marcadas como atuais só nas páginas em que já são atuais.
- Regra 5: Quem vê o menu lateral daquele evento vê o item **Meus Eventos**. Quem não tem acesso ao evento não vê a ficha, não vê o menu e não ganha acesso à lista por esse caminho. A lista em si continua exigindo a mesma autenticação de hoje.
- Regra 6: O botão **Novo Evento** existe na página da lista, na mesma faixa do título **Meus Eventos**, no extremo oposto do título. O rótulo pequeno **Painel**, acima do título, permanece. Em tela estreita, se o botão não couber na mesma linha, ele desce para a linha seguinte, ainda nessa faixa, antes da lista, do aviso de falha ou do estado vazio.
- Regra 7: **Novo Evento** aparece sempre que a página da lista é exibida: com eventos, sem eventos e quando a lista não carrega. O nome do botão é **Novo Evento**. Ele abre a mesma página de criação que o botão do menu superior abre hoje.
- Regra 8: **Novo Evento** não aparece no menu lateral, no menu superior, na ficha, nas áreas do evento, em **Meu perfil** nem na própria página de criação. A partir de um evento, o caminho para criar outro evento é abrir **Meus Eventos** e, na lista, acionar **Novo Evento**.
- Regra 9: O menu superior deixa de ter o link **Meus Eventos** e o botão **Novo Evento** em todas as telas do painel. Permanecem o logotipo **Confirm Event**, o link **Meu perfil**, o nome, a foto e **Sair**. **Meu perfil** continua destacado só quando a pessoa está em **Meu perfil**.
- Regra 10: O logotipo **Confirm Event** continua abrindo a lista **Meus Eventos**. Em **Meu perfil**, esse logotipo é o retorno à lista.
- Regra 11: A trilha permanece. Na ficha: **Meus Eventos / {título do evento}**. Nas áreas do evento: **Meus Eventos / {título} / {nome da área}**. Na criação: **Meus Eventos / Novo evento**. Em todos esses pontos, **Meus Eventos** na trilha continua abrindo a lista.

## 8. Fluxos principais

### Fluxo 1 — Voltar à lista pelo menu lateral

1. O organizador está na ficha de um evento, ou numa área desse evento que já mostra o menu lateral.
2. Vê **Meus Eventos** no topo do menu, separado de **Convidados**.
3. Aciona **Meus Eventos**.
4. Cai na lista **Meus Eventos**, com os eventos da conta.
5. O menu lateral do evento não aparece nessa lista.

### Fluxo 2 — Criar um evento a partir da lista

1. O organizador abre a lista **Meus Eventos** pelo menu lateral, pela trilha, pelo logotipo ou pelo endereço da lista.
2. Vê **Novo Evento** na faixa do título.
3. Aciona **Novo Evento**.
4. Cai na página de criação já existente.
5. A trilha **Meus Eventos / Novo evento** continua disponível para voltar à lista.

### Fluxo 3 — Usar o menu superior depois da mudança

1. Em qualquer tela do painel, o organizador olha o menu superior.
2. Não encontra **Meus Eventos** nem **Novo Evento**.
3. Encontra **Meu perfil**, o nome, a foto e **Sair**, e o logotipo **Confirm Event**.
4. **Meu perfil** abre o perfil. **Sair** encerra a sessão como hoje. O logotipo abre a lista.

## 9. Critérios de aceite

- O usuário consegue, dentro de um evento, acionar **Meus Eventos** no topo do menu lateral e chegar à lista dos eventos da conta.
- O sistema deve mostrar esse item acima de **Convidados**, separado visualmente das áreas do evento, com o menu reduzido e com o menu expandido.
- O sistema deve mostrar **Novo Evento** na faixa do título da lista e abrir a criação de evento já existente.
- O sistema deve mostrar **Novo Evento** nessa faixa também com a lista vazia e quando a lista não carrega.
- O sistema deve omitir **Meus Eventos** e **Novo Evento** do menu superior em todas as telas do painel.
- O sistema deve manter **Meu perfil**, nome, foto, **Sair**, o logotipo abrindo a lista e a trilha **Meus Eventos** na ficha, nas áreas do evento e na criação.
- Quando a pessoa está num evento, o sistema deve manter **Meus Eventos** do menu lateral sem o destaque de área atual.

## 10. Stack

A stack já usada no painel: Next.js, React, TypeScript e Tailwind, com os componentes de interface já adotados no painel. Autenticação e dados dos eventos continuam como estão. Nenhuma biblioteca nova.

## 11. Justificativa da stack

A mudança é de navegação em telas que já existem. O menu lateral, a lista, a criação, o cabeçalho e a trilha já estão no painel. Reutilizar isso evita uma segunda lista e um segundo caminho de criação.

## 12. Fases de construção

### Fase 1 — Navegação de Meus Eventos

Objetivo: levar a volta à lista para o menu lateral do evento e a criação de evento para a própria lista, limpando esses dois controles do menu superior.

Specs:

- Spec 01 — Meus Eventos no menu lateral
- Spec 02 — Novo Evento na lista

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Meus Eventos no menu lateral

- **Fase:** Fase 1 — Navegação de Meus Eventos
- **Objetivo (o quê):** Incluir no menu lateral do evento um item **Meus Eventos** que abre a lista de eventos da conta, e retirar o link **Meus Eventos** do menu superior.
- **Intenção (por quê):** Quem está dentro de um evento volta à lista pelo mesmo menu em que já troca de área, em vez de procurar esse link no topo da página.
- **Contexto:** O menu lateral já aparece na ficha do evento e nas áreas desse evento, com **Convidados**, **Configurações** e o controle de reduzir ou expandir. A lista **Meus Eventos** já existe e já reúne os eventos criados pela conta, os eventos em que a conta foi adicionada e os casos legados que ela inclui hoje. A trilha das páginas do evento já tem **Meus Eventos** apontando para essa lista. O logotipo **Confirm Event** também já abre essa lista.
- **Atores:** O organizador autenticado que está num evento ao qual tem acesso.
- **Descrição do comportamento:** No topo do menu lateral, acima de **Convidados**, o sistema mostra **Meus Eventos**, separado visualmente de **Convidados** e **Configurações**. Acionar o item abre a lista **Meus Eventos**. O menu do evento não é exibido nessa lista. O link de mesmo nome sai do menu superior. A trilha e o logotipo continuam levando à mesma lista.
- **Entradas e saídas:** A entrada é o acionamento do item **Meus Eventos** no menu lateral. A saída é a lista já existente, com os eventos daquela conta. Nenhuma informação nova é gravada.
- **Dados/entidades envolvidos (conceitual):** A conta do organizador e os eventos aos quais ela já tem acesso na lista. Este item não cria, não edita e não filtra evento de outro modo.
- **Estados e transições:** O item acompanha os dois estados já existentes do menu. Expandido: ícone e o texto **Meus Eventos**. Reduzido: só o ícone, com o texto **Meus Eventos** no foco ou ao passar o mouse. Ele não passa a ser a área atual em nenhuma página em que o menu lateral está visível, porque essas páginas ainda são de um evento. Ao abrir a lista, o menu lateral deixa de ser exibido, como já acontece fora do evento.
- **Regras de negócio:** Valem as regras 1, 2, 3, 4, 5, 9, 10 e 11 deste PRD, no que diz respeito a este item, ao link do menu superior, ao logotipo e à trilha. **Convidados**, **Configurações** e reduzir ou expandir não mudam de ordem, de destino nem de destaque.
- **Validações:** O item só é oferecido a quem já pode ver o menu daquele evento. Abrir a lista continua sujeito à mesma exigência de conta de hoje. Não há campo para validar.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre um evento no painel.
  2. No menu lateral, vê **Meus Eventos** acima de **Convidados**, com uma separação entre os dois.
  3. Se o menu estiver reduzido, reconhece o item pelo ícone e pelo nome **Meus Eventos** ao focar ou passar o mouse.
  4. Aciona **Meus Eventos**.
  5. Vê a lista dos eventos da conta, sem o menu lateral do evento.
  6. No menu superior dessa lista, e de qualquer outra tela do painel, não há mais o link **Meus Eventos**. **Meu perfil**, nome, foto, **Sair** e o logotipo permanecem.
- **Casos de borda e erros:** Se a pessoa não tem acesso ao evento, não vê este item, porque não vê o menu; o resultado de abrir o evento sem acesso permanece o de hoje. Se a lista falhar ao carregar, vale o aviso que a lista já mostra; este item não cria outro tratamento. Se o menu estiver reduzido, o nome **Meus Eventos** continua disponível no foco e ao passar o mouse. A separação visual em relação a **Convidados** permanece no menu reduzido. A trilha **Meus Eventos** e o logotipo continuam como caminho alternativo para a mesma lista, inclusive em **Meu perfil**, onde não há menu lateral.
- **Impacto no existente:** O menu lateral ganha um item no topo e uma separação antes de **Convidados**. O menu superior perde o link **Meus Eventos** e deixa de destacá-lo. **Meu perfil** continua destacado apenas no perfil. A trilha, o logotipo, o conteúdo da lista, **Convidados**, **Configurações** e o controle de reduzir ou expandir permanecem. O botão **Novo Evento** do menu superior não é tratado nesta spec.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um organizador na ficha de um evento ao qual tem acesso, quando o menu lateral está expandido, então **Meus Eventos** aparece acima de **Convidados**, com ícone e texto, e há uma separação visual entre esse item e **Convidados**.
  - Dado o mesmo menu reduzido, quando o organizador foca ou passa o mouse no item, então vê o nome **Meus Eventos**, e a separação antes de **Convidados** continua visível.
  - Dado o organizador nesse evento, quando aciona **Meus Eventos** no menu lateral, então chega à lista dos eventos da conta, a mesma lista de hoje, e o menu lateral do evento não é exibido.
  - Dado o organizador em qualquer tela do painel, quando olha o menu superior, então não encontra o link **Meus Eventos**, e ainda encontra **Meu perfil**, nome, foto, **Sair** e o logotipo **Confirm Event**.
  - Dado o organizador dentro do evento, quando observa o menu lateral, então **Meus Eventos** não está marcado como área atual, e a área atual de **Convidados** ou **Configurações** só aparece onde já aparecia.
  - Dado o organizador na ficha, numa área do evento ou na criação, quando usa a trilha **Meus Eventos**, então continua indo para a lista. Dado o organizador em **Meu perfil**, quando aciona o logotipo **Confirm Event**, então abre a lista.
- **Definição de pronto:** Dá para voltar à lista pelo topo do menu lateral, nos dois estados do menu, e o link **Meus Eventos** não está mais no menu superior. A trilha, o logotipo e as áreas já existentes do menu seguem funcionando.
- **Dependências:** O menu lateral do evento e a lista **Meus Eventos** já existentes. Nenhuma outra spec deste PRD.
- **Fora do escopo desta spec:** Mover ou remover o botão **Novo Evento**. Alterar quais eventos a lista mostra. Colocar o menu lateral na lista, no perfil ou na criação.

### Spec 02 — Novo Evento na lista

- **Fase:** Fase 1 — Navegação de Meus Eventos
- **Objetivo (o quê):** Mostrar o botão **Novo Evento** na faixa do título da lista **Meus Eventos** e removê-lo do menu superior.
- **Intenção (por quê):** Criar um evento é uma ação da lista, não uma ação presente em todas as telas do painel. Quem está vendo os próprios eventos encontra o botão ali.
- **Contexto:** O menu superior do painel tem hoje um botão **Novo Evento** que abre a página de criação. A lista já tem o título **Meus Eventos**, o rótulo **Painel** acima dele, os cards, um estado vazio com o botão **Criar evento** e um aviso quando a lista não carrega. A página de criação já tem a trilha **Meus Eventos / Novo evento**.
- **Atores:** O organizador autenticado, na lista **Meus Eventos**.
- **Descrição do comportamento:** Na página da lista, o sistema mostra **Novo Evento** na mesma faixa do título, no extremo oposto de **Meus Eventos**. O botão abre a página de criação já existente. O mesmo botão deixa de aparecer no menu superior. Ele não é acrescentado ao menu lateral.
- **Entradas e saídas:** A entrada é o acionamento de **Novo Evento** na lista. A saída é a página de criação de evento já existente, pronta para o preenchimento de hoje. Nenhum evento é criado neste acionamento.
- **Dados/entidades envolvidos (conceitual):** Nenhum dado novo. O botão só conduz à criação, que continua responsável pelos dados do evento.
- **Estados e transições:** O botão está presente nos três estados da página da lista: lista com eventos, lista vazia e falha ao carregar. Não há estado de carregamento próprio do botão. Na página de criação, o botão não é repetido; a volta à lista continua pela trilha **Meus Eventos**.
- **Regras de negócio:** Valem as regras 6, 7, 8 e 9 deste PRD. O botão **Criar evento** do estado vazio permanece, com o mesmo nome e o mesmo destino. Os dois podem aparecer juntos quando não há eventos; os dois abrem a mesma criação.
- **Validações:** Só quem já pode abrir a lista vê o botão. A página de criação mantém as validações que já tem. Não há campo novo nesta spec.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a lista **Meus Eventos**.
  2. Vê o título **Meus Eventos** e, na mesma faixa, **Novo Evento**.
  3. Aciona **Novo Evento**.
  4. Cai na criação do evento.
  5. Para voltar sem criar, usa **Meus Eventos** na trilha.
  6. No menu superior, em qualquer tela do painel, não há mais **Novo Evento**.
- **Casos de borda e erros:** Com a lista vazia, **Novo Evento** permanece na faixa do título e **Criar evento** permanece na mensagem de vazio. Quando a lista não carrega, o aviso atual permanece e **Novo Evento** continua na faixa do título, porque criar um evento não depende da lista ter carregado. Em tela estreita, o botão pode ir para a linha de baixo, ainda na faixa do título, antes do conteúdo da lista. Dentro de um evento, em **Meu perfil** e na própria criação, não há **Novo Evento** no menu superior nem no menu lateral; a pessoa vai até a lista e usa o botão de lá. O logotipo e a trilha continuam levando à lista.
- **Impacto no existente:** A faixa do título da lista passa a incluir **Novo Evento**. O menu superior perde esse botão em todas as telas do painel. A página de criação, o estado vazio, os cards e o aviso de falha permanecem. O link **Meus Eventos** do menu superior não é tratado nesta spec.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o organizador na lista **Meus Eventos** com um ou mais eventos, quando olha a faixa do título, então vê **Novo Evento** no extremo oposto do título **Meus Eventos**, com o rótulo **Painel** ainda acima.
  - Dado o organizador nessa lista, quando aciona **Novo Evento**, então abre a mesma página de criação de hoje, com a trilha **Meus Eventos / Novo evento**.
  - Dado a lista vazia, quando a página é exibida, então **Novo Evento** aparece na faixa do título e **Criar evento** continua na mensagem de vazio; os dois abrem a criação.
  - Dado a falha ao carregar a lista, quando a página é exibida, então o aviso de falha permanece e **Novo Evento** continua na faixa do título.
  - Dado o organizador em qualquer tela do painel, quando olha o menu superior, então não encontra **Novo Evento**.
  - Dado o organizador dentro de um evento, quando olha o menu lateral, então não encontra **Novo Evento** entre os itens.
- **Definição de pronto:** **Novo Evento** está na lista, abre a criação já existente, aparece também no vazio e na falha de carregamento, e não está no menu superior nem no menu lateral.
- **Dependências:** A lista **Meus Eventos** e a página de criação já existentes. Não depende da Spec 01 para funcionar; as duas, juntas, completam o menu superior descrito na regra 9.
- **Fora do escopo desta spec:** O item **Meus Eventos** do menu lateral e a remoção do link **Meus Eventos** do menu superior. Mudar o formulário de criação. Remover ou renomear **Criar evento** no estado vazio.

## 14. Ordem recomendada de implementação

1. Spec 01 — Meus Eventos no menu lateral
2. Spec 02 — Novo Evento na lista

A Spec 01 devolve a pessoa à lista pelo menu do evento antes de o atalho do topo sumir. A Spec 02 então coloca a criação nessa lista e tira o botão do topo. Cada spec já deixa o painel utilizável: a trilha e o logotipo continuam abrindo a lista enquanto a outra spec não estiver pronta. As duas são necessárias para o menu superior ficar só com **Meu perfil**, nome, foto, **Sair** e o logotipo.
