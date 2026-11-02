# PRD — Reorganizar o menu superior

> Tipo: PRD de feature · Data: 2026-11-02
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

O menu superior do painel passa a ter só duas zonas: o logotipo do sistema à esquerda e, à direita, o componente da conta logada (foto e nome, ou e-mail).

O link **Meu perfil** sai desse menu. O botão **Sair** que hoje fica ao lado do nome também sai dali. Foto e nome deixam de ser apenas informativos: o clique nesse componente abre um menu com duas seções, **Configurações** e **Sair**. **Configurações** abre a página em que a pessoa edita os dados da própria conta. Essa página deixa de se chamar **Meu perfil** e passa a se chamar **Configurações**.

O logotipo continua levando sempre à lista **Meus Eventos**.

Este recorte substitui, no menu superior, o que o PRD [Meus Eventos no menu lateral](feature-meus-eventos-no-menu-lateral.md) pedia para manter: o link **Meu perfil**, o nome e a foto soltos, e o **Sair** separado. O restante daquele PRD não é reaberto aqui.

## 2. Problema que resolve

O menu superior mistura o caminho para a conta com a identidade da pessoa. **Meu perfil** é um link ao lado do logotipo, enquanto o nome, a foto e **Sair** ficam do outro lado, como três coisas independentes. Para editar a conta ou sair, a pessoa procura em dois lugares.

A reorganização deixa o topo com uma leitura só: à esquerda, voltar para **Meus Eventos**; à direita, quem está logado e o que essa conta pode fazer (abrir as configurações da conta ou sair).

## 3. Público-alvo

O **organizador** autenticado, em qualquer tela do painel que já mostra o menu superior: a lista **Meus Eventos**, a ficha e as áreas de um evento, a criação de evento e a página de edição da conta.

O convidado da página pública não vê esse menu e não entra nesta feature.

## 4. Objetivo do recorte atual

1. Deixar o menu superior com o logotipo à esquerda e o componente da conta à direita.
2. Fazer o logotipo abrir sempre a lista **Meus Eventos**.
3. Mostrar no componente a foto e o nome completo; sem nome completo, o e-mail; sem foto, o círculo com ícone genérico de pessoa.
4. Abrir, no clique desse componente, as seções **Configurações** e **Sair**, cada uma com ícone e texto.
5. Fazer **Configurações** abrir a edição da conta e **Sair** encerrar a sessão.
6. Remover o link **Meu perfil** do menu superior e passar a chamar a página de edição da conta de **Configurações**.

## 5. Funcionalidades

**Essenciais:**

- Logotipo do sistema à esquerda do menu superior, em todas as telas do painel.
- Clique no logotipo abre a lista **Meus Eventos**, esteja a pessoa onde estiver no painel.
- Componente da conta à direita, com foto e nome completo, ou e-mail quando não houver nome completo.
- Sem foto, círculo com o ícone genérico de pessoa já usado hoje.
- Clique no componente abre o menu da conta, com **Configurações** e depois **Sair**.
- Cada seção desse menu tem um ícone e um texto.
- **Configurações** abre a página de edição da conta.
- **Sair** encerra a sessão.
- O link **Meu perfil** deixa de existir no menu superior.
- O título visível da página de edição da conta passa de **Meu perfil** para **Configurações**.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Redesenhar o logotipo ou trocar o nome **Confirm Event**.
- Incluir outras seções no menu da conta (troca de senha, tema, notificações ou atalhos de evento).
- Alterar o que a página de edição da conta grava: e-mail bloqueado, nome, sobrenome, telefone, empresa e imagem continuam com as regras já existentes.
- Mudar o item **Configurações** do menu lateral do evento, a página **Configurações do evento** ou a trilha **Meus Eventos / {título} / Configurações**.
- Mudar a lista **Meus Eventos**, o card, o botão **Novo Evento** ou o item **Meus Eventos** do menu lateral do evento.
- Mostrar telefone, empresa ou o e-mail junto do nome completo.
- Trocar o ícone genérico de pessoa por iniciais.
- Obrigar nome, sobrenome ou foto para usar o painel.
- Levar nome, e-mail ou foto para a página pública do evento.

## 7. Regras de negócio

- Regra 1: O menu superior do painel tem duas zonas. À esquerda, só o logotipo **Confirm Event**. À direita, só o componente da conta logada. Não há link **Meu perfil**, não há botão **Sair** solto e não há link **Meus Eventos** nem botão **Novo Evento** nesse menu.
- Regra 2: O clique no logotipo abre a lista **Meus Eventos** a partir de qualquer tela do painel, inclusive quando a pessoa já está nessa lista, dentro de um evento, na criação de evento ou em **Configurações** da conta.
- Regra 3: O texto do componente é o nome completo da conta: nome e sobrenome gravados, nesta ordem, separados por um espaço. Se faltar o nome, o sobrenome ou os dois, o texto é o e-mail de login. Nome completo e e-mail não aparecem juntos. Telefone e empresa não entram no menu.
- Regra 4: A foto é a imagem da conta, em círculo. Sem imagem salva, ou se a imagem salva não puder ser exibida, o círculo mostra o ícone genérico de pessoa. O texto (nome ou e-mail) permanece. A falha de exibição não apaga a imagem salva.
- Regra 5: Nome ou e-mail longo é cortado para o logotipo e o componente continuarem utilizáveis, em tela larga e em tela estreita. O corte não altera o dado gravado.
- Regra 6: O componente inteiro (foto e texto) é um único controle. O clique abre o menu da conta. O clique não abre a página de edição. Um segundo clique no mesmo controle fecha o menu.
- Regra 7: O menu da conta tem exatamente duas seções, nesta ordem: **Configurações**, depois **Sair**. Cada uma mostra um ícone e o texto. O ícone de **Configurações** comunica ajuste da conta. O ícone de **Sair** comunica encerrar a sessão. Os dois ícones são diferentes entre si.
- Regra 8: **Configurações** deste menu abre a página de edição da conta, a mesma área que hoje se chama **Meu perfil**. O título visível dessa página passa a ser **Configurações**. Esse destino não é o item **Configurações** do menu lateral de um evento nem a página **Configurações do evento**.
- Regra 9: **Sair** encerra a sessão do organizador no servidor e leva à tela de login, com o mesmo resultado do **Sair** atual. Não basta esconder o painel no navegador.
- Regra 10: Só o organizador autenticado vê este menu. Quem não tem sessão segue o mesmo caminho de login do restante do painel. O convidado não vê o menu superior.
- Regra 11: Perfil incompleto não bloqueia o menu, a lista, os eventos nem a saída. Conta sem nome completo vê o e-mail. Conta sem foto vê o ícone genérico. As duas seções continuam disponíveis.
- Regra 12: Depois de gravar nome e sobrenome com sucesso, o componente passa a mostrar o nome completo na próxima exibição do menu, sem exigir novo login. Depois de gravar, trocar ou remover a imagem com sucesso, a foto do componente acompanha esse resultado na próxima exibição. Sair da página sem gravar mantém o nome e a foto anteriores.

## 8. Fluxos principais

### Fluxo 1 — Voltar para Meus Eventos pelo logotipo

1. O organizador está autenticado em qualquer tela do painel.
2. Clica no logotipo **Confirm Event**.
3. A lista **Meus Eventos** abre.

### Fluxo 2 — Abrir as configurações da conta

1. O organizador olha o componente à direita e reconhece a própria foto e o nome completo, ou o e-mail se o nome completo não estiver cadastrado.
2. Clica no componente.
3. O menu abre com **Configurações** e **Sair**, cada um com ícone e texto.
4. Escolhe **Configurações**.
5. O menu fecha e a página de edição da conta abre, com o título **Configurações**.

### Fluxo 3 — Sair

1. O organizador abre o menu da conta.
2. Escolhe **Sair**.
3. A sessão termina.
4. A tela de login é exibida. As telas do painel deixam de abrir sem um novo acesso.

### Fluxo 4 — Fechar o menu sem escolher

1. O organizador abre o menu da conta.
2. Clica de novo no componente, clica fora do menu ou pressiona Escape.
3. O menu fecha. A pessoa permanece na mesma tela e continua autenticada.

## 9. Critérios de aceite

- Em qualquer tela do painel, o menu superior mostra o logotipo à esquerda e o componente da conta à direita, e não mostra o link **Meu perfil** nem um botão **Sair** solto.
- O clique no logotipo abre **Meus Eventos** a partir da lista, de um evento, da criação de evento e da página **Configurações** da conta.
- Com nome e sobrenome gravados, o componente mostra esse nome completo e a foto. Sem um dos dois, mostra o e-mail no lugar do nome. Sem foto, mostra o círculo com ícone genérico de pessoa.
- O clique no componente abre só **Configurações** e **Sair**, nessa ordem, cada uma com ícone e texto.
- **Configurações** abre a edição da conta, cujo título visível é **Configurações**, e não abre as configurações de um evento.
- **Sair** encerra a sessão e mostra a tela de login.
- O título **Meu perfil** não aparece mais nessa página nem no menu superior.
- O formulário da conta (e-mail bloqueado, nome, sobrenome, telefone, empresa e imagem) continua com as mesmas regras de antes.
- O item **Configurações** do evento e a página **Configurações do evento** continuam como já são.
- Em tela estreita, o logotipo, o componente e as duas seções do menu continuam utilizáveis.

## 10. Stack

A feature usa o que o Confirm Event já tem: Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui e Supabase (Auth para a sessão e o e-mail de login; Postgres para nome, sobrenome e imagem da conta). Não exige serviço externo novo.

## 11. Justificativa da stack

O menu superior, a sessão, a saída, a página de edição da conta e a imagem do perfil já existem nessa stack. Este recorte só muda a organização do que a pessoa vê e aciona no topo, e o nome visível da página da conta. Não há autenticação nova, dado novo nem outro canal.

## 12. Fases de construção

### Fase 1 — Menu superior e nome da página da conta

Objetivo: o topo do painel fica com logotipo e componente da conta; o menu desse componente leva à edição da conta, agora chamada **Configurações**, ou encerra a sessão; o link **Meu perfil** sai do topo.

Specs:

- Spec 01 — Página da conta chamada Configurações
- Spec 02 — Menu superior com logotipo e conta

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Página da conta chamada Configurações

- **Fase:** Fase 1 — Menu superior e nome da página da conta
- **Objetivo (o quê):** A página em que o organizador edita os dados da própria conta passa a se apresentar com o título **Configurações**.
- **Intenção (por quê):** O menu da conta vai ter uma seção com esse nome. A página de destino precisa usar o mesmo nome, para a pessoa reconhecer que chegou onde escolheu. O nome antigo **Meu perfil** deixa de ser o título dessa área.
- **Contexto:** Já existe uma página do painel em que o organizador vê o e-mail da conta sem poder alterá-lo e grava nome, sobrenome, telefone, empresa e uma imagem opcional. O título visível dessa página é **Meu perfil**. Acima do título há o rótulo **Painel** e, abaixo, o texto de que nome e sobrenome são obrigatórios e telefone e empresa são opcionais. Esta spec só muda o nome visível da área. A página **Configurações do evento** e o item **Configurações** do menu lateral do evento são outra coisa e não entram aqui.
- **Atores:** Organizador autenticado. O convidado não participa.
- **Descrição do comportamento:** Ao abrir a página de edição da conta, o título principal deixa de ser **Meu perfil** e passa a ser exatamente **Configurações**. O rótulo **Painel**, o texto de ajuda sobre nome, sobrenome, telefone e empresa, o e-mail bloqueado, os campos, a imagem e as mensagens de sucesso ou de erro permanecem. Mensagens que falam do dado (“perfil salvo”, “não foi possível carregar o perfil”) continuam falando do dado; não precisam repetir o título da página. Quem não tem sessão não abre a página e segue o mesmo destino de login do restante do painel. Nada nesta spec adiciona o link no menu superior nem remove o link **Meu perfil**; isso é a Spec 02.
- **Entradas e saídas:**
  - Entrada: sessão do organizador e os dados da conta já gravados (e-mail, nome, sobrenome, telefone, empresa, imagem), como a página já recebe hoje.
  - Saída: a mesma página de edição, com o título visível **Configurações**.
  - Não produz dado novo e não altera o que está gravado.
- **Dados/entidades envolvidos (conceitual):** Conta do organizador: e-mail de login, nome, sobrenome, telefone opcional, empresa opcional e imagem opcional. Nenhum campo novo.
- **Estados e transições:** Não se aplica à troca de título. Os estados do formulário (vazio, gravado, inválido, falha ao carregar, falha ao salvar) continuam os que a página já tem.
- **Regras de negócio:**
  - O título visível da área da conta é **Configurações**.
  - O título **Meu perfil** não aparece mais nessa página.
  - E-mail, nome, sobrenome, telefone, empresa e imagem seguem as regras já existentes dessa página, inclusive obrigatoriedade, telefone brasileiro com DDD e imagem opcional.
  - Esta página não é a página **Configurações do evento**.
- **Validações:** As validações do formulário não mudam. Esta spec não cria validação nova. Sem sessão, a página não é exibida.
- **Fluxo do usuário (passo a passo):**
  1. O organizador autenticado abre a página de edição da conta.
  2. Lê o título **Configurações**.
  3. Vê o mesmo formulário de antes e pode gravar ou corrigir como já faz.
- **Casos de borda e erros:**
  - Conta sem nome, sem sobrenome ou sem imagem: a página abre mesmo assim, com o título **Configurações** e os campos vazios ou a imagem ausente, como hoje.
  - Falha ao carregar os dados: o título **Configurações** continua visível e o aviso de falha que a página já mostra permanece. Nada é gravado.
  - Tentativa de abrir sem sessão: a página da conta não aparece; o caminho é o de login do painel.
  - Pessoa que estava numa página de evento chamada **Configurações do evento**: essa página não muda de título por causa desta spec.
- **Impacto no existente:** O título principal da página da conta muda de **Meu perfil** para **Configurações**. Formulário, regras, mensagens de campo e o fluxo de gravar ou de trocar a imagem permanecem. O menu lateral do evento e **Configurações do evento** permanecem. O link **Meu perfil** do menu superior permanece até a Spec 02.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um organizador autenticado, quando ele abre a página de edição da conta, então o título visível é **Configurações** e o título **Meu perfil** não aparece nessa página.
  - Dado essa página aberta, quando o organizador olha o formulário, então o e-mail continua bloqueado e nome, sobrenome, telefone, empresa e imagem continuam editáveis com as mesmas regras de antes.
  - Dado um organizador dentro de um evento, quando ele abre as configurações daquele evento, então a página continua **Configurações do evento** e o item do menu lateral do evento continua **Configurações** daquele evento.
  - Dado alguém sem sessão, quando tenta abrir a página da conta, então ela não é exibida e o destino é o login do painel.
- **Definição de pronto:** A página da conta se apresenta como **Configurações**, o formulário se comporta como antes, e a área de configuração de um evento não foi renomeada nem teve o destino trocado.
- **Dependências:** Nenhuma. A página da conta já existe.
- **Fora do escopo desta spec:** Montar o menu do perfil, remover o link **Meu perfil**, mover **Sair** para dentro do menu e mudar o logotipo. Isso é a Spec 02. Também ficam de fora novas seções na página, troca de senha e qualquer alteração nas regras dos campos.

### Spec 02 — Menu superior com logotipo e conta

- **Fase:** Fase 1 — Menu superior e nome da página da conta
- **Objetivo (o quê):** O menu superior fica com o logotipo à esquerda e o componente da conta à direita; esse componente abre **Configurações** e **Sair**; o link **Meu perfil** e o botão **Sair** solto deixam de existir.
- **Intenção (por quê):** A pessoa precisa achar, num lugar só, quem está logado, como editar a própria conta e como sair, sem um link **Meu perfil** separado do nome e da foto. O logotipo permanece o retorno estável para **Meus Eventos**.
- **Contexto:** O painel já tem menu superior com o logotipo **Confirm Event** (que já abre **Meus Eventos**), o link **Meu perfil**, a foto, o nome ou o e-mail, e um botão **Sair** ao lado. A foto ausente já usa um círculo com ícone genérico de pessoa. O nome exibido já é nome e sobrenome, ou o e-mail se faltar um dos dois. A saída já encerra a sessão e mostra a tela de login. A Spec 01 faz a página de edição da conta se chamar **Configurações**. O PRD [Meus Eventos no menu lateral](feature-meus-eventos-no-menu-lateral.md) pedia para manter **Meu perfil**, nome, foto e **Sair** soltos no topo; esta spec substitui essa parte. Não reabre o menu lateral, a lista nem o botão **Novo Evento**.
- **Atores:** Organizador autenticado, em qualquer tela do painel que mostra o menu superior. O convidado não vê esse menu.
- **Descrição do comportamento:** Em toda tela do painel, o menu superior mostra à esquerda o logotipo atual **Confirm Event** e à direita o componente da conta. O clique no logotipo abre a lista **Meus Eventos**, mesmo que a pessoa já esteja nela. O componente mostra a foto em círculo e, ao lado, o nome completo. Sem nome completo, mostra o e-mail. Sem foto, ou se a foto não carregar, mostra o círculo com ícone genérico de pessoa e mantém o texto. O componente é um único controle. Fechado, é o estado inicial. O clique abre um menu logo associado a esse controle, com duas seções: **Configurações** e, abaixo, **Sair**. Cada seção tem ícone e texto, os ícones com significados diferentes (ajuste da conta e encerrar a sessão). **Suposição:** clicar de novo no componente, clicar fora do menu ou pressionar Escape fecha o menu sem navegar e sem sair. Escolher **Configurações** fecha o menu e abre a página da conta, cujo título é **Configurações**. **Suposição:** se o menu for aberto com essa página já visível, a seção **Configurações** aparece marcada como a seção atual; **Sair** nunca fica marcada como atual. Escolher **Sair** encerra a sessão no servidor e mostra a tela de login. O link **Meu perfil** não é desenhado. O botão **Sair** solto não é desenhado. Não há outras seções. Em tela estreita, o nome ou o e-mail pode ser cortado com reticências, e as duas seções continuam legíveis e acionáveis dentro da tela. O controle e as seções são alcançáveis por teclado: o controle recebe foco e abre o menu; as seções podem ser acionadas; Escape fecha e devolve o foco ao controle.
- **Entradas e saídas:**
  - Entrada ao desenhar o menu: sessão do organizador; e-mail de login; nome e sobrenome, se gravados; imagem da conta, se gravada.
  - Entrada ao agir: clique ou tecla no logotipo, no componente ou numa seção.
  - Saída do logotipo: a lista **Meus Eventos**.
  - Saída de **Configurações**: a página de edição da conta, com o título **Configurações**.
  - Saída de **Sair**: sessão encerrada e tela de login.
  - Saída ao fechar sem escolher: a mesma tela, sessão mantida, menu fechado.
- **Dados/entidades envolvidos (conceitual):**
  - Conta do organizador: e-mail de login, nome, sobrenome, imagem opcional, sessão.
  - O menu não grava nem altera esses dados. **Sair** só encerra a sessão.
- **Estados e transições:**
  - **Menu fechado:** foto e texto visíveis; seções ocultas. É o estado ao entrar em qualquer tela.
  - **Menu aberto:** seções **Configurações** e **Sair** visíveis.
  - De fechado para aberto: clique ou acionamento por teclado no componente.
  - De aberto para fechado sem efeito: segundo acionamento no componente, clique fora ou Escape.
  - De aberto para a página da conta: escolha de **Configurações**. O menu não permanece aberto por cima da página.
  - De autenticado para sem sessão: escolha de **Sair** bem-sucedida. O menu do painel deixa de existir porque a sessão acabou.
- **Regras de negócio:** Valem as regras 1 a 12 da seção 7, em especial: só logotipo e componente no topo; texto é nome completo ou e-mail, nunca os dois; foto ou ícone genérico; duas seções com ícone e texto; **Configurações** não abre a área do evento; **Sair** encerra a sessão de verdade.
- **Validações:**
  - Sem sessão, o menu do painel não é exibido.
  - O componente não aceita edição do nome, do e-mail ou da foto. Esses dados só mudam na página **Configurações**.
  - **Sair** não pede confirmação extra. **Suposição:** o **Sair** atual também não pede, e este recorte mantém isso.
- **Fluxo do usuário (passo a passo):**
  1. O organizador entra no painel e vê o logotipo à esquerda e a própria conta à direita.
  2. Se quiser a lista, clica no logotipo e chega em **Meus Eventos**.
  3. Se quiser a conta, clica no componente, escolhe **Configurações** e chega na página com esse título.
  4. Se quiser encerrar, abre o componente e escolhe **Sair**. A tela de login aparece.
- **Casos de borda e erros:**
  - Sem nome completo: o texto é o e-mail. O menu abre do mesmo jeito.
  - Sem foto, ou foto que não carrega: ícone genérico de pessoa. O menu abre do mesmo jeito. A imagem salva não é apagada por falha de exibição.
  - Nome ou e-mail muito longo: o texto visível é cortado; o menu e o logotipo continuam utilizáveis. O valor gravado não muda.
  - Clique no componente: não troca de página. Só abre ou fecha o menu.
  - **Configurações** com a pessoa já nessa página: a página da conta é exibida de novo, ou permanece, com o título **Configurações**. Não abre **Configurações do evento**.
  - Logotipo com a pessoa já em **Meus Eventos**: a lista é exibida de novo, ou permanece. Não abre outra área.
  - Falha ao sair: **Suposição:** a sessão continua e o painel avisa que não foi possível sair. A pessoa não é levada ao login como se tivesse saído.
  - Sem sessão: o menu não aparece.
  - Tela estreita: as duas seções não ficam cortadas fora da tela a ponto de não poderem ser lidas ou acionadas.
  - Menu aberto e navegação por outro caminho (por exemplo, o logotipo): o menu não fica aberto por cima do destino.
- **Impacto no existente:** Saem do menu superior o link **Meu perfil** e o botão **Sair** solto. A foto e o texto, que hoje são só informativos, passam a abrir o menu. O logotipo permanece e continua abrindo **Meus Eventos**. A lista, o menu lateral do evento, **Novo Evento**, a trilha e a página pública não mudam. Esta spec substitui, no topo, a decisão do PRD de **Meus Eventos** no menu lateral que mantinha **Meu perfil** e **Sair** separados.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o organizador em qualquer tela do painel, quando o menu superior é exibido, então há o logotipo à esquerda, o componente da conta à direita, e não há link **Meu perfil** nem botão **Sair** fora do menu da conta.
  - Dado o organizador na ficha de um evento, na criação de evento ou na página **Configurações** da conta, quando ele clica no logotipo, então a lista **Meus Eventos** abre.
  - Dado nome e sobrenome gravados e uma foto salva, quando o menu superior é exibido, então o componente mostra a foto e o nome completo, sem o e-mail ao lado.
  - Dado nome ou sobrenome ausente, quando o menu superior é exibido, então o texto é o e-mail da conta e a foto, ou o ícone genérico se não houver foto.
  - Dado o componente fechado, quando o organizador clica nele, então aparecem somente **Configurações** e **Sair**, nessa ordem, cada uma com ícone e texto, e a página não muda.
  - Dado o menu aberto, quando o organizador clica fora, pressiona Escape ou aciona o componente de novo, então o menu fecha e a sessão continua.
  - Dado o menu aberto, quando o organizador escolhe **Configurações**, então a página de edição da conta abre com o título **Configurações**.
  - Dado o menu aberto dentro de um evento, quando o organizador escolhe **Configurações**, então não abre a página **Configurações do evento**.
  - Dado o menu aberto, quando o organizador escolhe **Sair** e a saída funciona, então a sessão termina e a tela de login é exibida.
  - Dado a saída falha, quando o organizador tinha escolhido **Sair**, então a sessão continua e há um aviso de que não foi possível sair.
  - Dado tela estreita, quando o organizador abre o menu da conta, então **Configurações** e **Sair** podem ser lidas e acionadas.
- **Definição de pronto:** No painel, o topo só oferece o logotipo (para **Meus Eventos**) e o componente da conta (para **Configurações** da conta e **Sair**); o link **Meu perfil** não existe mais; nome, e-mail e foto seguem as regras desta spec; a área de configuração do evento permanece intacta.
- **Dependências:** Spec 01 — o título visível da página de destino precisa ser **Configurações**. A sessão, a lista **Meus Eventos**, a página da conta, a imagem e a saída já existem.
- **Fora do escopo desta spec:** Mudar campos, validações ou a imagem dentro da página da conta. Renomear **Configurações do evento**. Alterar a lista **Meus Eventos**, o menu lateral ou **Novo Evento**. Acrescentar seções ao menu da conta. Redesenhar o logotipo.

## 14. Ordem recomendada de implementação

1. Spec 01 — Página da conta chamada Configurações
2. Spec 02 — Menu superior com logotipo e conta

A página precisa já se chamar **Configurações** antes do menu passar a apontar para ela com esse nome. A Spec 02 depende desse título e remove o link antigo. Seguir essa ordem evita um menu novo que ainda entregue uma página chamada **Meu perfil**, e evita apagar o único caminho visível para a página antes de o menu da conta existir.
