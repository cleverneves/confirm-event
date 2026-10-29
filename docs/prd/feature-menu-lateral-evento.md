# PRD — Menu lateral do evento

> Tipo: PRD de feature · Data: 2026-10-29
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

Na ficha de um evento já criado, no painel, o organizador passa a ter um menu lateral com duas áreas, nesta ordem: **Convidados** e **Configurações**.

Cada área aparece como ícone seguido do título. O menu é flexível. Reduzido, mostra só os ícones. Expandido, mostra o ícone e o título da área.

**Configurações** abre a página daquele evento com as configurações que ele já tem hoje: layout da página, imagem, trecho do link, capacidade máxima, início e fim da janela de confirmação, encerrar ou reativar a confirmação, e **Personalizar**. O botão de engrenagem do card passa a abrir essa mesma página.

**Convidados** entra só como referência no menu. A área de convidados não é criada neste recorte. A lista **Gestão de Convidados** continua na ficha, onde já está.

## 2. Problema que resolve

Quem administra um evento encontra as configurações dentro de um diálogo aberto pelo card, e a lista de convidados mais abaixo na mesma ficha. Não há um lugar fixo, ao lado do evento, para ir de uma área a outra.

O menu lateral dá esse lugar. Neste recorte ele já mostra as duas áreas e leva a **Configurações**. A área de convidados fica reservada no menu, sem ser construída agora.

## 3. Público-alvo

O **organizador** autenticado, na ficha de um evento ao qual ele tem acesso, e na página de configurações desse mesmo evento. É a mesma pessoa que hoje abre o evento no painel e usa o botão **Configurações** do card.

O convidado não vê o menu. Quem está em **Meus Eventos**, em **Meu perfil** ou na criação de um evento também não vê este menu.

## 4. Objetivo do recorte atual

1. Exibir, à esquerda do conteúdo do evento, um menu com **Convidados** e **Configurações**, cada um no formato ícone e título da área.
2. Permitir reduzir o menu a só ícones e expandi-lo de volta a ícone e título.
3. Levar **Configurações** à página que reúne as configurações que o evento já tem.
4. Manter **Convidados** apenas como referência visual e de nome no menu.

## 5. Funcionalidades

**Essenciais:**

- Menu lateral do evento aberto, com as áreas **Convidados** e **Configurações**, nesta ordem.
- Em cada área, o ícone vem antes do título.
- Estado reduzido: só os ícones. Estado expandido: ícone e título.
- Um controle do próprio menu alterna entre reduzido e expandido.
- **Configurações** abre a página de configurações daquele evento.
- Essa página mostra, na ordem já usada hoje, layout da página, imagem, trecho do link, capacidade máxima, início e fim da janela, **Salvar**, encerrar ou reativar a confirmação, e **Personalizar**.
- O botão de engrenagem do card abre essa mesma página.
- **Convidados** aparece no menu nos dois estados, com o título **Convidados** quando o menu está expandido, e não abre área nenhuma.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Criar a área, a página ou a lista de **Convidados**. A lista **Gestão de Convidados**, as métricas, os organizadores e a exclusão do evento continuam na ficha.
- Mudar o que cada configuração já faz: layout, imagem, tema, trecho do link, capacidade, janela, encerrar e reativar.
- Incluir no menu **Editar**, o link do evento, **Copiar Link**, **Visualizar página**, organizadores ou exclusão.
- Mudar o cabeçalho do painel (**Meus Eventos**, **Meu perfil**, **Novo Evento**, **Sair**).
- Mostrar o menu na lista **Meus Eventos**, em **Meu perfil**, na criação de evento ou na página pública.
- Trocar o menu lateral por uma gaveta, uma faixa no topo ou um menu que cubra o conteúdo.
- Gravar a escolha reduzido/expandido na conta, para outro aparelho ou para uma visita futura.
- Acrescentar outras áreas ao menu.

## 7. Regras de negócio

- Regra 1: O menu existe na ficha do evento e na página de configurações desse evento. Ele fica à esquerda do conteúdo, abaixo do caminho **Meus Eventos / …**. O cabeçalho do painel permanece acima dos dois.
- Regra 2: As áreas são duas, de cima para baixo: **Convidados**, depois **Configurações**. Não há terceira área neste recorte.
- Regra 3: No menu expandido, cada área mostra o ícone e, em seguida, o título. O título de uma é **Convidados**. O título da outra é **Configurações**. O título fica na mesma linha do ícone.
- Regra 4: No menu reduzido, cada área mostra só o ícone. O título some da tela e continua sendo o nome da área. **Suposição:** ao passar o mouse ou focar o ícone, o título aparece junto dele, no mesmo recurso já usado nos botões só com ícone do card.
- Regra 5: **Suposição:** o ícone de **Convidados** é o de pessoas já usado nas métricas do evento. O ícone de **Configurações** é a engrenagem já usada no card. Os dois saem do conjunto de ícones já adotado no painel.
- Regra 6: Um controle do menu, separado das duas áreas, alterna os estados. Com o menu expandido, o nome do controle é **Reduzir menu**. Com o menu reduzido, o nome é **Expandir menu**. No estado reduzido, o controle também fica só com ícone e mantém esse nome. **Suposição:** no estado expandido o controle segue o mesmo formato das áreas, ícone e texto.
- Regra 7: **Suposição:** em tela larga, no mesmo ponto em que o card já coloca as ações ao lado das informações, o menu começa expandido. Em tela estreita, abaixo desse ponto, o menu começa reduzido. A pessoa pode inverter o estado nos dois tamanhos.
- Regra 8: **Suposição:** a escolha reduzido ou expandido vale enquanto a pessoa permanece naquele evento, inclusive ao ir da ficha para as configurações e voltar. Ao sair para **Meus Eventos**, para outro evento ou para **Meu perfil**, a próxima entrada naquele evento volta ao padrão da regra 7. A escolha não é gravada na conta.
- Regra 9: **Convidados** é só a referência da seção. Aparece nos dois estados do menu, na ficha e na página de configurações. Não é um link. Acioná-lo não muda de página, não rola a ficha até a lista e não marca a área como atual. A lista **Gestão de Convidados** permanece na ficha.
- Regra 10: **Configurações** é um link para a página de configurações daquele evento. Na página de configurações, essa área é a atual, nos dois estados do menu. Na ficha, ela não é a atual.
- Regra 11: A página de configurações reúne o que o diálogo **Configurações do evento** já reúne, na mesma ordem: layout da página, imagem, trecho do link, capacidade máxima, início e fim da janela, **Salvar**, encerrar ou reativar, e **Personalizar**. O título da página é **Configurações do evento**. Não entra campo novo e não sai campo que esse diálogo já mostra.
- Regra 12: Quem já pode abrir a ficha do evento pode ver o menu e abrir a página de configurações. Quem não tem acesso ao evento não vê a ficha, não vê o menu e não abre a página de configurações por endereço direto. O resultado é o mesmo de abrir a ficha sem acesso. O convidado não vê o menu.
- Regra 13: **Salvar**, **Alterar trecho**, encerrar, reativar e o salvar de **Personalizar** continuam com o efeito que já têm. **Salvar** grava layout, imagem, capacidade e as duas datas da janela, e não altera título, detalhes, data, horário, local, trecho do link nem tema. **Alterar trecho**, encerrar, reativar e **Personalizar** continuam ações próprias.
- Regra 14: Sair da página de configurações sem **Salvar** descarta layout, imagem, capacidade e datas ainda não salvos. Trecho já confirmado, encerramento ou reativação já confirmados e tema já salvo permanecem. **Salvar** com sucesso mantém a pessoa na página de configurações e mostra o aviso de sucesso já usado. A falha mostra o aviso de falha já usado e mantém na página o que ainda não foi aceito.
- Regra 15: O botão de engrenagem do card continua no lugar de hoje, só com ícone, e continua nomeado **Configurações**. O acionamento abre a página de configurações daquele evento. O diálogo deixa de ser o lugar dessas configurações.
- Regra 16: Na página de configurações, o caminho é **Meus Eventos / {título do evento} / Configurações**. **Meus Eventos** volta à lista. O título volta à ficha daquele evento. **Configurações** é a página atual. A ficha mantém o caminho que já tem: **Meus Eventos / {título}**.
- Regra 17: O menu mostra as áreas do evento aberto. Não lista outros eventos e não mistura configuração de um evento com a de outro.

## 8. Fluxos principais

### Fluxo 1 — Alternar o menu

1. O organizador abre um evento no painel.
2. Vê o menu à esquerda, com **Convidados** e **Configurações**.
3. Em tela larga, o menu começa expandido: ícone e título. Em tela estreita, começa só com ícones.
4. Aciona **Reduzir menu** ou **Expandir menu**.
5. O menu muda de estado e o conteúdo do evento continua ao lado.

### Fluxo 2 — Abrir as configurações pelo menu

1. Na ficha, ou já na página de configurações, o organizador aciona **Configurações** no menu.
2. Cai na página **Configurações do evento** daquele evento.
3. Vê as configurações que o evento já tem, com o menu ao lado. **Configurações** é a área atual.
4. Ajusta e salva como já faz hoje. Permanece nessa página.

### Fluxo 3 — Voltar à ficha

1. Na página de configurações, o organizador aciona o título do evento no caminho.
2. Volta à ficha, com o card, a lista de convidados e o restante que já estava lá.
3. O menu continua à esquerda. **Configurações** deixa de ser a área atual.

### Fluxo 4 — Ver a referência de Convidados

1. O organizador olha o menu, expandido ou reduzido.
2. Reconhece **Convidados** pelo ícone e, no menu expandido, pelo título.
3. Acionar essa área não abre página nem desloca a ficha. A lista **Gestão de Convidados** segue na ficha.

## 9. Critérios de aceite

- O usuário consegue ver, na ficha do evento, um menu lateral com **Convidados** acima de **Configurações**.
- O sistema deve mostrar ícone e título com o menu expandido, e somente o ícone com o menu reduzido.
- O sistema deve oferecer **Reduzir menu** e **Expandir menu**, e manter o conteúdo do evento ao lado do menu.
- O sistema deve abrir a página **Configurações do evento** ao acionar **Configurações** no menu e ao acionar a engrenagem do card.
- O sistema deve mostrar nessa página as configurações que o diálogo já mostrava, na mesma ordem, com as mesmas ações de salvar.
- O sistema deve manter a pessoa na página de configurações depois de um **Salvar** bem-sucedido.
- O sistema deve marcar **Configurações** como área atual só nessa página.
- O sistema deve exibir **Convidados** nos dois estados do menu e não deve abrir área, página ou lista nova ao acioná-lo.
- O sistema deve manter **Gestão de Convidados**, as métricas, os organizadores e a exclusão na ficha.
- O sistema não deve mostrar este menu em **Meus Eventos**, em **Meu perfil**, na criação de evento ou na página pública.
- Quando a pessoa não tem acesso ao evento, o sistema deve impedir a página de configurações do mesmo modo que impede a ficha.

## 10. Stack

A stack já usada no Confirm Event: Next.js, React, TypeScript, Tailwind CSS e os componentes de interface já presentes no painel. Os ícones saem do conjunto já usado nas telas do evento. Autenticação, dados do evento e as ações de salvar configurações continuam vindo de onde a ficha já os obtém.

Nenhuma biblioteca nova.

## 11. Justificativa da stack

A ficha, o card, o diálogo de configurações e as ações de layout, imagem, link, capacidade, janela, encerrar, reativar e tema já existem. Este recorte muda o lugar por onde se chega às configurações e acrescenta o menu ao lado do evento. Reutilizar a stack e os ícones já adotados evita um conjunto visual diferente do resto do painel.

## 12. Fases de construção

### Fase 1 — Menu do evento e página de configurações

Objetivo: o organizador vê o menu lateral na ficha e nas configurações, reduz e expande esse menu, e abre num único lugar as configurações que o evento já tem. **Convidados** fica só referenciado.

Specs:

- Spec 01 — Menu lateral, estados e referência de Convidados
- Spec 02 — Página de configurações do evento

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Menu lateral, estados e referência de Convidados

- **Fase:** Fase 1 — Menu do evento e página de configurações
- **Objetivo (o quê):** Colocar na ficha do evento um menu lateral com **Convidados** e **Configurações**, expansível e reduzível, deixando **Convidados** apenas como referência da seção.
- **Intenção (por quê):** O organizador precisa achar as áreas do evento sempre no mesmo lugar, lendo o título quando há espaço e reconhecendo a área pelo ícone quando o menu está reduzido. A área de convidados precisa já ocupar o lugar dela no menu, sem ser construída agora.
- **Contexto:** A ficha do evento no painel já mostra o caminho **Meus Eventos / {título}**, o card, as métricas, a lista **Gestão de Convidados**, os organizadores e, para quem pode, a exclusão. Não existe menu lateral. O cabeçalho do painel, com **Meus Eventos** e **Meu perfil**, fica fora desta spec. A página que o item **Configurações** abre é a Spec 02. Até essa página existir, o item já é o link para ela.
- **Atores:** Organizador autenticado, ao abrir a ficha de um evento ao qual tem acesso.
- **Descrição do comportamento:** O menu fica à esquerda do conteúdo da ficha, abaixo do caminho. De cima para baixo, as áreas são **Convidados** e **Configurações**. No menu expandido, cada uma mostra o ícone e o título na mesma linha, o ícone primeiro. No menu reduzido, mostra só o ícone; o título continua sendo o nome anunciado da área. **Convidados** usa o ícone de pessoas já usado nas métricas. **Configurações** usa a engrenagem já usada no card. **Convidados** não é link: acioná-lo não navega, não rola a página e não o marca como área atual. **Configurações** é o link para a página de configurações daquele evento e, na ficha, não é a área atual. Um controle separado das duas áreas alterna o estado. O nome é **Reduzir menu** quando está expandido e **Expandir menu** quando está reduzido. No estado reduzido, esse controle também fica só com ícone. Em tela larga o menu começa expandido. Em tela estreita começa reduzido. A escolha feita pela pessoa permanece ao navegar entre a ficha e a página de configurações do mesmo evento, e volta ao padrão quando ela sai desse evento. O conteúdo da ficha permanece à direita do menu, nos dois estados.
- **Entradas e saídas:** Entra o evento já aberto na ficha. Saem o menu nos dois estados e o link de **Configurações**. Não há gravação. A escolha reduzido/expandido não é gravada na conta.
- **Dados/entidades envolvidos (conceitual):** Evento aberto: identidade usada para o link de **Configurações** apontar para as configurações desse evento, e não as de outro. Não há dado novo de convidado nem de configuração nesta spec.
- **Estados e transições:** O menu tem dois estados, expandido e reduzido. O controle passa de um para o outro. Em tela larga, o primeiro estado ao entrar no evento é expandido. Em tela estreita, é reduzido. Sair do evento descarta a escolha. **Convidados** não tem estado de área atual. **Configurações** só fica atual na página da Spec 02.
- **Regras de negócio:** Regras 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12 e 17. As suposições das regras 4, 5, 6, 7 e 8 valem para esta spec. A regra 10, no trecho da área atual, completa-se na Spec 02.
- **Validações:** Não se aplica a formulário. O menu só é exibido para quem já pode ver a ficha. Um evento sem acesso não ganha menu por esta spec; continua valendo o bloqueio que a ficha já tem.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre o evento.
  2. Vê **Convidados** e **Configurações** no menu à esquerda.
  3. Se a tela for larga, lê ícone e título. Se for estreita, vê os ícones e os nomes ao foco ou ao passar o mouse.
  4. Aciona **Reduzir menu** ou **Expandir menu** e o menu troca de estado sem tirar o conteúdo da ficha.
  5. Acionar **Convidados** não abre área nova. A lista **Gestão de Convidados** continua na ficha.
  6. Acionar **Configurações** segue para a página descrita na Spec 02.
- **Casos de borda e erros:**
  - Tela estreita: o menu começa reduzido e continua lateral. Não vira gaveta, faixa superior nem camada sobre o conteúdo. A pessoa pode expandir; ícone e título cabem na mesma linha, e o conteúdo segue ao lado.
  - Tela larga: o menu começa expandido. Reduzi-lo deixa só os ícones, com o conteúdo ganhando o espaço ao lado.
  - Título do evento longo, no caminho acima do menu: o caminho continua como hoje. O menu não repete o título do evento como área.
  - **Convidados** acionado por mouse, toque ou teclado: a página permanece a mesma. A área não fica marcada como atual.
  - Menu reduzido e leitor de tela: **Convidados** e **Configurações** são anunciados com esses nomes. O controle é anunciado como **Reduzir menu** ou **Expandir menu**, conforme o estado.
  - Troca da ficha para a página de configurações e volta, na mesma visita: o estado do menu escolhido pela pessoa permanece. Uma entrada nova, depois de sair do evento, volta ao padrão da largura da tela.
  - Outro evento: o menu é o daquele evento. A escolha feita no evento anterior não é reaproveitada.
- **Impacto no existente:** Acrescenta o menu à ficha. Não muda o card, a lista **Gestão de Convidados**, as métricas, os organizadores, a exclusão, o cabeçalho do painel nem a página pública. O destino do link **Configurações** e a troca da engrenagem do card ficam na Spec 02.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento aberto em tela larga, quando a ficha é exibida, então o menu à esquerda mostra **Convidados** acima de **Configurações**, cada um com ícone e título, e começa expandido.
  - Dado um evento aberto em tela estreita, quando a ficha é exibida, então o menu começa só com os ícones, permanece à esquerda do conteúdo e anuncia os nomes **Convidados** e **Configurações**.
  - Dado o menu expandido, quando o organizador aciona **Reduzir menu**, então os títulos somem da tela, os ícones permanecem e o controle passa a se chamar **Expandir menu**.
  - Dado o menu reduzido, quando o organizador aciona **Expandir menu**, então cada área volta a mostrar ícone e título, nesta ordem.
  - Dado o menu em qualquer estado, quando o organizador aciona **Convidados**, então a ficha não muda de página, a lista **Gestão de Convidados** permanece onde está e **Convidados** não fica marcado como área atual.
  - Dado o menu, quando o controle e as áreas são anunciados para leitor de tela, então os nomes são **Convidados**, **Configurações**, **Reduzir menu** ou **Expandir menu**, conforme o elemento e o estado.
  - Dado o organizador em **Meus Eventos**, **Meu perfil**, na criação de evento ou na página pública, quando a tela é exibida, então este menu não aparece.
- **Definição de pronto:** Na ficha, o menu mostra as duas áreas na ordem combinada, reduz e expande, e mantém os nomes acessíveis no estado só com ícone. **Convidados** não leva a lugar nenhum. **Configurações** é o link da página da Spec 02. A lista de convidados da ficha permanece. O menu não aparece fora do evento.
- **Dependências:** Nenhuma para desenhar o menu na ficha. O conteúdo aberto por **Configurações** depende da Spec 02. O mesmo menu, ao lado da página de configurações, é colocado na Spec 02.
- **Fora do escopo desta spec:** Conteúdo da página de configurações, regras de salvar, engrenagem do card, mudança da lista **Gestão de Convidados**, métricas, organizadores, exclusão, cabeçalho do painel e página pública.

### Spec 02 — Página de configurações do evento

- **Fase:** Fase 1 — Menu do evento e página de configurações
- **Objetivo (o quê):** Abrir, a partir de **Configurações**, uma página do evento com todas as configurações que ele já tem, e fazer a engrenagem do card ir para essa mesma página.
- **Intenção (por quê):** O organizador que escolhe **Configurações** no menu, ou a engrenagem no card, precisa cair no conjunto único de configurações do evento, em página, sem procurar esse conjunto dentro de um diálogo e sem perder o que esse conjunto já permite fazer.
- **Contexto:** Hoje a engrenagem do card abre o diálogo **Configurações do evento**. Dentro dele estão, nesta ordem, layout da página, imagem, trecho do link, capacidade máxima, início e fim da janela, **Salvar**, encerrar ou reativar, e **Personalizar**. Cada ação já tem regra própria. A Spec 01 cria o item **Configurações** no menu e o define como link desta página. Esta spec cria a página, coloca nela esse conteúdo e usa o menu da Spec 01 ao lado.
- **Atores:** Organizador autenticado com acesso ao evento. A mesma pessoa que hoje abre a engrenagem do card.
- **Descrição do comportamento:** Acionar **Configurações** no menu abre a página **Configurações do evento** daquele evento. Acionar a engrenagem do card também abre essa página. A engrenagem continua no lugar de hoje, só com ícone, nomeada **Configurações**. O diálogo deixa de abrir. A página mostra o caminho **Meus Eventos / {título} / Configurações**. O título do evento nesse caminho volta à ficha. Abaixo do caminho, o menu da Spec 01 fica à esquerda e o conteúdo das configurações fica à direita. No menu, **Configurações** é a área atual nos dois estados. **Convidados** continua só como referência, como na Spec 01. O conteúdo repete o do diálogo, na mesma ordem, com o título **Configurações do evento**. **Salvar** com sucesso mantém a pessoa na página e mostra o aviso de sucesso já usado. Falha de validação ou de gravação mostra o aviso já usado e permanece na página. Sair sem **Salvar** descarta só o que esse **Salvar** ainda não gravou. **Alterar trecho**, encerrar, reativar e **Personalizar** continuam ações próprias, concluídas nessa página, com o mesmo efeito de hoje. **Personalizar** continua abrindo o diálogo de tema já existente.
- **Entradas e saídas:** Entram as configurações já salvas do evento: layout, imagem, trecho do link, capacidade, janela, estado da confirmação e tema. Saem as mesmas gravações que o diálogo já faz. O endereço da página é o de configurações daquele evento. Abrir o endereço direto, com acesso, mostra a mesma página.
- **Dados/entidades envolvidos (conceitual):** Evento: layout da página, imagem, trecho do link, capacidade máxima, início e fim da janela, encerramento manual da confirmação e tema. Nenhum campo novo.
- **Estados e transições:** A página abre com os valores já salvos. Alterar layout, imagem, capacidade ou janela sem **Salvar** deixa esses valores pendentes; sair da página descarta os pendentes. **Salvar** com sucesso grava esse grupo e permanece na página, já com os valores gravados. **Alterar trecho**, encerrar, reativar e salvar o tema mudam só o que cada uma já muda hoje e também permanecem na página. Se a pessoa volta à ficha pelo título no caminho, a ficha mostra o que foi gravado. O que ficou pendente não aparece na ficha.
- **Regras de negócio:** Regras 1, 10, 11, 12, 13, 14, 15, 16 e 17. As regras já vigentes de cada campo, hoje aplicadas no diálogo, continuam valendo nesta página: layout **Personalizado** ou **Somente imagem**; imagem obrigatória só em **Somente imagem**; jpg ou png até 8 MB; aviso de proporção sem impedir o salvamento quando o arquivo é aceito; capacidade opcional, inteiro a partir de 1, ou vazio para sem limite; janela com as duas datas ou com nenhuma; trecho com letras, números e hífen, único no sistema; encerrar só com a confirmação aberta e com confirmação explícita; reativar só quando há encerramento manual.
- **Validações:** As mesmas que o diálogo já aplica antes de gravar. Dado inválido não é gravado, a mensagem já usada aparece no campo ou no aviso, e a pessoa continua na página. Endereço de outro evento, evento inexistente ou conta sem acesso recebe o mesmo desfecho de abrir a ficha nessas condições. Não se cria mensagem nova para esses casos.
- **Fluxo do usuário (passo a passo):**
  1. O organizador aciona **Configurações** no menu, ou a engrenagem no card.
  2. Vê a página **Configurações do evento**, com o menu à esquerda e **Configurações** marcada como área atual.
  3. Ajusta layout, imagem, capacidade ou janela e aciona **Salvar**, ou usa **Alterar trecho**, encerrar, reativar ou **Personalizar**.
  4. Permanece na página e vê o aviso da ação, como hoje.
  5. Se quiser a ficha, aciona o título do evento no caminho.
- **Casos de borda e erros:**
  - Endereço aberto direto, com acesso: a página mostra as configurações salvas daquele evento e o menu. **Configurações** é a área atual.
  - Sem acesso, ou evento inexistente: o desfecho é o mesmo de abrir a ficha nessas condições. A página não mostra configuração de outro evento.
  - **Salvar** com dado inválido: nada desse grupo é gravado, o aviso já usado aparece, e os valores pendentes continuam na página para correção.
  - **Salvar** com sucesso: o aviso de sucesso já usado aparece e a página segue aberta, com os valores gravados.
  - Sair sem **Salvar** depois de mudar layout, imagem, capacidade ou janela: a ficha e uma nova abertura da página mostram os valores que já estavam salvos.
  - **Alterar trecho**, encerrar, reativar ou tema já confirmados antes de sair: permanecem gravados, mesmo se o grupo do **Salvar** for descartado.
  - Menu reduzido nesta página: **Configurações** continua reconhecível como área atual só pelo ícone, e o nome anunciado continua **Configurações**.
  - Engrenagem do card: não abre mais o diálogo. Abre esta página.
- **Impacto no existente:** Tira as configurações do diálogo e as coloca na página. A engrenagem do card muda de destino e mantém lugar, ícone e nome. As regras de cada campo e de cada ação permanecem. A ficha perde o diálogo e mantém o restante. O menu da Spec 01 passa a aparecer também nesta página.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado a ficha de um evento, quando o organizador aciona **Configurações** no menu, então abre a página **Configurações do evento** daquele evento.
  - Dado o card do evento, quando o organizador aciona a engrenagem, então abre essa mesma página e o diálogo de configurações não abre.
  - Dado a página de configurações, quando ela é exibida, então mostra, nesta ordem, layout da página, imagem, trecho do link, capacidade máxima, início e fim da janela, **Salvar**, encerrar ou reativar, e **Personalizar**, com o menu à esquerda e **Configurações** como área atual.
  - Dado uma alteração válida de layout, imagem, capacidade ou janela, quando o organizador aciona **Salvar**, então esse grupo é gravado, o aviso de sucesso já usado aparece e a pessoa permanece na página.
  - Dado uma alteração inválida, quando o organizador aciona **Salvar**, então o grupo não é gravado, o aviso já usado aparece e a pessoa permanece na página.
  - Dado uma alteração ainda não salva de layout, imagem, capacidade ou janela, quando o organizador volta à ficha pelo título no caminho, então a ficha mantém os valores salvos antes dessa alteração.
  - Dado o trecho do link, o encerramento, a reativação ou o tema, quando o organizador conclui a ação própria correspondente, então o efeito é o mesmo que essa ação já tem hoje.
  - Dado uma conta sem acesso ao evento, quando ela pede a página de configurações, então o desfecho é o mesmo de pedir a ficha sem acesso.
  - Dado a página de configurações, quando o organizador aciona **Convidados** no menu, então nenhuma área de convidados abre.
- **Definição de pronto:** Menu e engrenagem abrem a mesma página, com as configurações que o diálogo já tinha e com as mesmas regras de gravar, descartar e autorizar. O diálogo não é mais o lugar dessas configurações. A página mostra o menu, marca **Configurações** como atual e volta à ficha pelo título no caminho. **Convidados** segue sem destino.
- **Dependências:** Spec 01 — o menu, os dois estados, a referência de **Convidados** e o item **Configurações** como link. Esta spec coloca esse menu na página e entrega o destino do link. As regras de cada campo dependem do comportamento que o diálogo já tem hoje; esta spec não as redefine.
- **Fora do escopo desta spec:** Criar a área de **Convidados**, mudar a lista **Gestão de Convidados**, mudar **Editar**, mudar o cabeçalho do painel, criar configuração nova e alterar a validação já vigente de cada campo.

## 14. Ordem recomendada de implementação

1. Spec 01 — Menu lateral, estados e referência de Convidados
2. Spec 02 — Página de configurações do evento

A Spec 01 fixa o menu na ficha e o link de **Configurações**. A Spec 02 entrega a página desse link, repete o menu ao lado dela e troca o destino da engrenagem. Fazer as duas, nesta ordem, evita uma página de configurações sem o menu, ou um item **Configurações** cujo destino ainda não reúne o que o evento já configura hoje.
