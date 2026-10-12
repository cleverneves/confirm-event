# PRD — Fundo desfocado da página do evento

> Tipo: PRD de feature · Data: 2026-10-12
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". A atualização deste status é manual — feita pelo usuário ou pelo agente de codificação que implementar as specs, não por esta skill. -->

## 1. Visão geral

No layout **Somente imagem**, o organizador passa a escolher o fundo da página pública entre duas opções, na personalização que já existe:

- **Fundo com gradiente** — o gradiente de duas cores que a página já usa hoje.
- **Fundo com desfoque** — a mesma imagem do evento, ampliada e desfocada, cobrindo a página. A arte em retrato continua nítida, no centro.

Cada opção é um ícone. O ícone selecionado abre só os controles daquela opção: o gradiente abre as duas cores; o desfoque abre um controle deslizante, que começa em 70%.

Com o fundo desfocado, a confirmação fica sobre uma superfície clara, para o texto não depender das cores da foto. O botão **confirmo** continua na cor 1 do tema.

O layout **Personalizado** não muda.

## 2. Problema que resolve

No layout **Somente imagem**, a página pública coloca a arte em retrato sobre um gradiente. O organizador que quer a foto como atmosfera da página não tem essa escolha: o fundo é sempre o gradiente, e a imagem só aparece nítida no bloco do convite.

Esta feature deixa esse organizador publicar a própria imagem como fundo, maior e desfocada, com a intensidade do desfoque sob controle, sem perder o gradiente para quem preferir as duas cores.

## 3. Público-alvo

- **Organizador** — única conta do produto. Em um evento cujo layout salvo é **Somente imagem**, escolhe o fundo, ajusta o desfoque ou as cores, vê a prévia e salva.
- **Convidado** — só vê o resultado na página pública, sem login e sem escolher fundo.

## 4. Objetivo do recorte atual

Cada evento em **Somente imagem** tem um modo de fundo. O modo inicial, inclusive nos eventos que já existem, é o gradiente. Se o organizador escolher o desfoque, a página pública mostra a imagem ampliada e desfocada atrás da arte nítida, a confirmação sobre uma superfície clara, e o botão **confirmo** na cor 1. A prévia da personalização acompanha o rascunho na hora. A página pública muda quando o organizador salva, ou quando redefine o tema.

## 5. Funcionalidades

**Essenciais:**

- Duas opções de fundo, exclusivas, só no layout **Somente imagem**: **Fundo com desfoque** e **Fundo com gradiente**.
- Cada opção é um ícone. Selecionar o desfoque abre o controle deslizante e esconde as cores. Selecionar o gradiente abre as duas cores e esconde o deslize.
- O deslize mostra o nível em porcentagem, de 0% a 100%, e inicia em 70% quando ainda não há nível escolhido.
- Fundo desfocado: a mesma imagem do evento, cerca de 25% a 30% maior do que o necessário para cobrir a página, centralizada, com o desfoque no nível escolhido.
- A arte em retrato permanece nítida, no tamanho e na proporção que o layout **Somente imagem** já usa.
- Confirmação sobre uma superfície clara e estável, só nesse fundo desfocado.
- Botão **confirmo** na cor 1 efetiva, nos dois modos. As cores continuam salvas enquanto o desfoque está selecionado.
- Prévia imediata, com os dados reais do evento.
- Página pública no último fundo salvo.
- Eventos que já existem, e eventos novos, permanecem no gradiente até uma escolha salva de desfoque.

**Desejáveis:**

- Nenhuma neste recorte.

## 6. Fora do escopo

- Fundo desfocado no layout **Personalizado**.
- Terceiro tipo de fundo, ou os dois fundos visíveis ao mesmo tempo.
- Usar uma imagem de fundo diferente da imagem já enviada para o evento.
- Ampliar, desfocar ou cobrir com superfície a arte nítida.
- Superfície clara quando o fundo publicado é o gradiente, ou no layout **Personalizado**.
- Cor de botão separada da cor 1.
- Aplicar cor de título ou cor de texto no layout **Somente imagem**.
- Aviso de contraste por causa da foto.
- Impedir o salvamento por contraste baixo.
- Recortar, filtrar ou trocar a imagem dentro desta feature.
- Fundo desfocado no card da lista do painel.
- Fundo desfocado na página **Evento indisponível**.
- Convidado escolher o fundo ou o nível de desfoque.
- Animar o fundo, ou mudar o fundo conforme a rolagem.
- Tema diferente por convidado.
- Modo escuro próprio do evento.

## 7. Regras de negócio

- Regra 1: O modo de fundo e o nível de desfoque são **por evento**. Um evento não altera o fundo de outro.
- Regra 2: Estas escolhas só produzem efeito visual quando o layout salvo do evento é **Somente imagem**. No layout **Personalizado**, a página continua com o gradiente de duas cores, a arte em faixa quando houver, os textos do tema e a confirmação como já estão hoje, sem superfície clara e sem imagem de fundo desfocada.
- Regra 3: Todo evento nasce no modo gradiente. Evento que já existe também permanece no gradiente até o organizador salvar o modo desfoque. Nada do que já está publicado muda sozinho ao entrar esta feature.
- Regra 4: Os dois modos são exclusivos. Um está sempre selecionado. Não há estado sem fundo.
- Regra 5: No modo gradiente, o fundo publicado é o gradiente vertical já existente: cor 1 no topo, cor 2 na base, padrão `#F3F5F7` e `#E0E1DD` quando a cor não foi personalizada. A arte nítida e a confirmação seguem como hoje, sem superfície clara.
- Regra 6: No modo desfoque, o fundo da página inteira é a imagem do evento. Essa cópia de fundo fica cerca de 25% a 30% maior do que o tamanho necessário para cobrir a área da página, com o centro da foto no centro da página, sem faixa vazia nas bordas. A ampliação é em relação à área visível daquela página, na prévia ou na página pública.
- Regra 7: A arte nítida do layout **Somente imagem** não é ampliada nem desfocada. Continua no bloco do convite, na proporção e no encaixe que o produto já usa, por cima do fundo.
- Regra 8: O nível de desfoque é uma porcentagem inteira de 0% a 100%. **Suposição:** 0% é a foto de fundo nítida; 100% é o desfoque mais forte, em que o detalhe fino da foto deixa de ser legível e restam cor e massa; 70% é um desfoque claro, no qual a foto ainda se reconhece como a mesma da arte nítida. O valor publicado é o que o convidado vê.
- Regra 9: **Suposição:** 70% é o nível inicial quando o organizador ainda não ajustou o desfoque. Depois de mover o controle, o valor permanece. Trocar para o gradiente e voltar ao desfoque não devolve o deslize para 70%. Reabrir a personalização mostra o nível salvo, não 70%, se já houver um nível salvo.
- Regra 10: As cores do tema continuam salvas nos dois modos. No modo desfoque, cor 1 e cor 2 ficam escondidas e sem efeito no fundo. O botão **confirmo**, quando estiver visível, usa a cor 1 efetiva (personalizada ou padrão). O texto do botão continua claro ou escuro, o que ficar legível sobre a cor 1, como o tema já faz.
- Regra 11: No modo desfoque, o bloco da confirmação fica sobre uma superfície clara, a mesma para qualquer foto, opaca o bastante para a leitura não mudar de uma imagem para outra. A superfície cobre a frase “Confirmação de presença”, o campo de nome, o botão **confirmo**, os avisos de sucesso e de erro da confirmação e, quando a confirmação está encerrada, o texto “Confirmação indisponível”. Não cobre a arte nítida.
- Regra 12: A superfície clara não recolore o campo de nome, os avisos, o botão nem a frase “Confirmação de presença”. No layout **Somente imagem**, essa frase permanece no visual atual do produto. A cor de texto do tema continua sem efeito nesse layout.
- Regra 13: A prévia mostra o rascunho do fundo (modo, nível e cores) e o layout já salvo. A página pública, a lista e a prévia não usam um layout ainda não salvo. A página pública só muda depois que o organizador salva, ou quando redefine o tema.
- Regra 14: Sair sem salvar mantém o modo, o nível e as cores já gravados.
- Regra 15: **Suposição:** “Redefinir tema” restaura cor 1, cor 2, título e texto ao padrão, volta o modo de fundo para gradiente e descarta o nível de desfoque ajustado. O deslize volta a abrir em 70%. Essa restauração é gravada na hora, passa a valer na página pública e não pede uma segunda confirmação. O botão acompanha a cor 1 padrão.
- Regra 16: Cada cor pode voltar ao padrão sozinha, pelo controle que o tema já oferece, sem desfazer a outra cor, o modo de fundo nem o nível de desfoque. Essa volta individual só entra na página pública quando o organizador salva. Com o ícone de desfoque selecionado, esses controles de cor ficam escondidos junto com as cores.
- Regra 17: Trocar o layout não apaga o modo de fundo, o nível de desfoque nem as cores. Fora do **Somente imagem**, modo e nível ficam guardados e sem efeito visual. Ao voltar para **Somente imagem** e salvar o layout, o modo salvo volta a valer.
- Regra 18: Os ícones de fundo só aparecem na personalização quando o layout já salvo é **Somente imagem**. No layout **Personalizado**, a personalização continua com as quatro cores e a prévia em gradiente, sem ícones de fundo e sem deslize.
- Regra 19: Com o layout **Somente imagem** e o ícone de gradiente selecionado, a personalização mostra cor 1 e cor 2, como já faz hoje. Título e texto continuam ausentes dessa tela, porque esse layout não os usa.
- Regra 20: O aviso de contraste do tema não muda. Continua só para título e texto no layout **Personalizado**, e não bloqueia o salvamento. Não há aviso novo por causa da foto ou do desfoque.
- Regra 21: Se a imagem do evento não puder ser exibida, a página usa o gradiente das cores efetivas, sem superfície clara, para a confirmação continuar utilizável. A arte nítida também não aparece nesse caso, como já acontece quando não há imagem.
- Regra 22: Só o organizador autenticado altera o fundo. O convidado não edita modo nem desfoque.
- Regra 23: Link antigo que redireciona para o trecho atual mostra o fundo do evento atual.
- Regra 24: Página de evento inexistente ou excluído não tem este fundo. Continua “Evento indisponível” no visual atual.

## 8. Fluxos principais

### Fluxo 1 — Evento em Somente imagem no gradiente

1. O organizador cria o evento, ou mantém um evento já existente, no layout **Somente imagem**, com a imagem obrigatória desse layout.
2. O fundo permanece o gradiente, cor 1 em cima e cor 2 embaixo.
3. O convidado vê a arte nítida e, em seguida, a confirmação direto sobre o gradiente, como hoje.
4. O botão **confirmo** usa a cor 1.

### Fluxo 2 — Organizador escolhe o fundo desfocado

1. Na personalização de um evento cujo layout salvo é **Somente imagem**, o organizador vê o ícone de gradiente selecionado e as duas cores.
2. Seleciona o ícone de desfoque.
3. As cores somem. O deslize aparece em 70%, ou no nível já salvo, se houver.
4. A prévia passa a mostrar a imagem ampliada e desfocada, a arte nítida por cima e a confirmação sobre a superfície clara. O botão da prévia continua na cor 1.
5. O organizador move o deslize. A prévia acompanha na hora.
6. O organizador salva.
7. A página pública daquele evento passa a usar esse fundo. O painel, fora a prévia, continua no visual do produto.

### Fluxo 3 — Volta ao gradiente

1. Com o desfoque selecionado, o organizador seleciona o ícone de gradiente.
2. O deslize some. Cor 1 e cor 2 reaparecem com os valores que já estavam guardados.
3. A prévia volta ao gradiente, sem superfície clara e sem imagem de fundo.
4. Ao salvar, a página pública volta ao gradiente. O nível de desfoque permanece guardado.

### Fluxo 4 — Redefinir tema

1. Na personalização, o organizador aciona “Redefinir tema”.
2. O modo volta a gradiente, as cores voltam ao padrão e o nível de desfoque ajustado é descartado.
3. A prévia e a página pública acompanham. O botão volta a usar a cor 1 padrão.
4. Na próxima vez que o ícone de desfoque for selecionado, o deslize abre em 70%.

## 9. Critérios de aceite

- O organizador, num evento em **Somente imagem**, consegue escolher fundo com desfoque ou fundo com gradiente por ícones exclusivos.
- Ao selecionar o desfoque, o organizador vê o deslize e deixa de ver as cores. Ao selecionar o gradiente, vê as cores e deixa de ver o deslize.
- O deslize inicia em 70% quando não há nível escolhido, e a prévia usa esse nível.
- A prévia atualiza na hora ao trocar de ícone ou ao mover o deslize.
- Ao salvar o desfoque, o convidado vê a imagem de fundo cerca de 25% a 30% maior que a cobertura da página, desfocada no nível salvo, com a arte nítida no centro e a confirmação sobre uma superfície clara.
- O botão **confirmo** usa a cor 1 mesmo com as cores escondidas.
- Ao salvar o gradiente, o convidado vê o gradiente atual, sem superfície clara e sem imagem de fundo desfocada.
- Sair sem salvar não muda a página pública.
- No layout **Personalizado**, o organizador não vê os ícones de fundo, e a página pública permanece no gradiente.
- Evento que já estava publicado não muda de fundo até o organizador salvar o desfoque ou redefinir o tema.
- Quando a imagem não puder ser exibida, a página usa o gradiente.
- O sistema não aplica desfoque, ampliação de fundo nem superfície clara no layout **Personalizado**.

## 10. Stack

A stack já existente do projeto: Next.js, React, TypeScript, Tailwind CSS e Supabase. A personalização de tema, o layout **Somente imagem**, a imagem do evento, a prévia e a página pública são reutilizados.

Nenhuma capacidade nova de produto é exigida além do que o projeto já usa para tema, layout e imagem.

## 11. Justificativa da stack

O fundo, o desfoque, a ampliação e a superfície clara são apresentação da página que o produto já publica. As cores, a imagem e o layout já estão no evento. A escolha do organizador entra na personalização que já salva o tema e já mostra a prévia.

## 12. Fases de construção

### Fase 1 — Fundo do layout Somente imagem

Objetivo: o convidado vê o fundo escolhido, e o organizador escolhe esse fundo na personalização, com prévia fiel.

Specs:

- Spec 01 — Página com fundo desfocado ou gradiente
- Spec 02 — Escolha do fundo na personalização

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Página com fundo desfocado ou gradiente

- **Fase:** Fase 1 — Fundo do layout Somente imagem
- **Objetivo (o quê):** A página pública do layout **Somente imagem** exibe o gradiente atual ou a imagem do evento ampliada e desfocada, com a arte nítida por cima e a confirmação legível sobre uma superfície clara.
- **Intenção (por quê):** O organizador que já enviou a arte do convite precisa que essa mesma imagem dê a atmosfera da página, com um desfoque controlável, sem perder a leitura da confirmação nem a arte nítida. Quem não escolher isso continua no gradiente que já está publicado.
- **Contexto:** A página pública já tem dois layouts. Em **Somente imagem**, mostra a imagem em retrato e a confirmação, sobre o gradiente de cor 1 e cor 2. Em **Personalizado**, mostra a faixa quando há imagem, o nome do evento, os detalhes, a data, o horário, o local e a confirmação, também sobre o gradiente. O botão **confirmo** usa a cor 1. A frase “Confirmação de presença” no layout **Somente imagem** não usa a cor de texto. Esta spec acrescenta o modo de fundo só onde o layout salvo é **Somente imagem**. A prévia da personalização deve reproduzir o mesmo visual, no tamanho da prévia.
- **Atores:** O convidado vê a página pública. O organizador vê o mesmo visual na prévia, quando a Spec 02 estiver disponível. Até lá, a página pública já respeita o modo e o nível gravados no evento.
- **Descrição do comportamento:** Se o layout salvo não for **Somente imagem**, a página permanece como está hoje: gradiente, textos do tema e confirmação sem superfície clara. Se o layout salvo for **Somente imagem** e o modo gravado for gradiente, ou se o evento ainda não tiver modo gravado, a página também permanece como está hoje. Se o layout salvo for **Somente imagem** e o modo gravado for desfoque, a página inteira — de cima a baixo, inclusive o espaço em volta e abaixo do conteúdo — fica coberta pela imagem do evento. Essa cópia é a mesma foto da arte nítida, centralizada, cerca de 25% a 30% maior do que o necessário para cobrir a área visível, e desfocada no nível gravado. Por cima dela, no bloco do convite, a arte nítida aparece no tamanho atual. Em seguida, o bloco da confirmação aparece sobre uma superfície clara. O botão **confirmo** usa a cor 1 efetiva. Se a imagem não puder ser exibida, o fundo volta ao gradiente e a superfície clara não aparece.
- **Entradas e saídas:** Entradas: layout salvo do evento; modo de fundo gravado (gradiente ou desfoque; ausência significa gradiente); nível de desfoque gravado, de 0% a 100% (ausência, no modo desfoque, significa 70%); cor 1 e cor 2 efetivas; imagem do evento; dados que a página já mostra (título só como texto alternativo da imagem neste layout, e o estado da confirmação). Saída: a página pública, ou a prévia, com um dos dois fundos e com a confirmação legível.
- **Dados/entidades envolvidos (conceitual):** Um evento tem layout, imagem, cor 1, cor 2, cor de título e cor de texto, como já tem. Passa a ter também um modo de fundo, gradiente ou desfoque, e um nível de desfoque em porcentagem. O modo e o nível só mudam o que esta spec desenha quando o layout é **Somente imagem**.
- **Estados e transições:** Gradiente publicado: fundo em duas cores, arte nítida, confirmação sem superfície clara. Desfoque publicado: fundo fotográfico ampliado e desfocado, arte nítida, confirmação sobre superfície clara. Confirmação aberta: frase, nome e botão. Confirmação encerrada: só “Confirmação indisponível”, ainda sobre a superfície clara quando o fundo é o desfoque. Imagem indisponível durante o modo desfoque: trata como gradiente naquela exibição. Trocar o modo gravado troca o fundo na próxima exibição da página. O layout **Personalizado** não entra nesses estados.
- **Regras de negócio:** Regras 2, 3, 5, 6, 7, 8, 10, 11, 12, 17, 21, 23 e 24.
- **Validações:** O nível usado na página está entre 0% e 100%. Um nível ausente no modo desfoque vale 70%. Um nível fora dessa faixa não é aplicado: a página usa 70%. Um modo ausente ou irreconhecível vale gradiente. Não há validação de contraste da foto.
- **Fluxo do usuário (passo a passo):**
  1. O convidado abre o link do evento em **Somente imagem**.
  2. Se o modo gravado for gradiente, vê a arte nítida e a confirmação sobre o gradiente.
  3. Se o modo gravado for desfoque e a imagem carregar, vê a foto ampliada e desfocada em toda a página, a arte nítida no centro e a confirmação sobre a superfície clara.
  4. Preenche o nome e aciona **confirmo**, ou vê “Confirmação indisponível” se a confirmação estiver encerrada. O botão, quando existe, está na cor 1.
- **Casos de borda e erros:** Nível 0%: a foto de fundo fica nítida e ampliada, e a arte nítida continua distinta por estar no bloco do convite; a superfície clara permanece. Nível 100%: o detalhe fino da foto de fundo não é legível; cor e massa permanecem; a arte nítida e a superfície clara permanecem. Página curta: o fundo cobre também o espaço vazio abaixo do conteúdo. Página longa: o fundo cobre toda a rolagem, sem faixa de outra cor no fim. Prévia menor que a página pública: a ampliação de 25% a 30% é calculada sobre a área da prévia, e a arte nítida usa o tamanho que a prévia já usa. Imagem que não carrega: gradiente, sem superfície clara e sem arte. Layout **Personalizado** com modo desfoque gravado: o modo fica guardado e a página mostra o gradiente. Evento inexistente ou excluído: “Evento indisponível”, sem este fundo. Confirmação com aviso de sucesso ou de erro: o aviso fica na superfície clara quando o fundo é o desfoque.
- **Impacto no existente:** Páginas em gradiente, e todas as páginas **Personalizado**, permanecem visualmente como estão. A página **Somente imagem** em modo desfoque deixa de usar o gradiente como fundo e passa a apoiar a confirmação na superfície clara. A arte nítida, o texto do botão **confirmo**, a cor 1 do botão e a frase “Confirmação de presença” no visual atual desse layout permanecem.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento em **Somente imagem** sem modo de fundo gravado, quando o convidado abre a página, então o fundo é o gradiente das cores efetivas, a arte nítida aparece como hoje e a confirmação não ganha superfície clara.
  - Dado um evento em **Somente imagem** com modo desfoque e nível 70%, quando a imagem carrega, então o fundo é essa imagem, cerca de 25% a 30% maior que a cobertura da página, centralizada e desfocada, a arte nítida permanece no tamanho atual, e a confirmação fica sobre uma superfície clara.
  - Dado o modo desfoque, quando o convidado compara duas fotos de cores muito diferentes, então a superfície da confirmação continua clara e estável, e a frase, o campo, os avisos e “Confirmação indisponível” não mudam de leitura por causa da foto.
  - Dado o modo desfoque com cor 1 personalizada, quando o botão **confirmo** está visível, então o botão usa essa cor 1, e o texto do botão é o claro ou o escuro já definido pelo tema.
  - Dado o modo desfoque, quando a imagem não pode ser exibida, então a página usa o gradiente e não mostra a superfície clara.
  - Dado um evento no layout **Personalizado**, quando a página é exibida, então o fundo é o gradiente, sem imagem desfocada e sem superfície clara, mesmo que o modo desfoque esteja guardado.
- **Definição de pronto:** Um evento em **Somente imagem** pode ser exibido nos dois modos, com ampliação, desfoque, arte nítida, superfície clara e botão na cor 1 conferíveis um a um. Eventos em gradiente e o layout **Personalizado** seguem iguais ao que já está publicado. A prévia, quando passar a receber modo e nível, usa estas mesmas regras na área dela.
- **Dependências:** Nenhuma. O modo e o nível precisam existir no evento para o desfoque aparecer; enquanto não forem gravados, o resultado visível é o gradiente atual.
- **Fora do escopo desta spec:** Os ícones, o deslize, o salvamento e “Redefinir tema”. Isso é a Spec 02. Também ficam de fora: card da lista, página **Evento indisponível**, recorte da imagem e qualquer fundo desfocado no layout **Personalizado**.

### Spec 02 — Escolha do fundo na personalização

- **Fase:** Fase 1 — Fundo do layout Somente imagem
- **Objetivo (o quê):** Na personalização do evento em **Somente imagem**, o organizador escolhe o fundo por dois ícones, ajusta o desfoque ou as cores, vê a prévia no ato e publica a escolha ao salvar.
- **Intenção (por quê):** A escolha precisa ser óbvia e reversível. O organizador só vê os controles do fundo que está montando, confere o resultado antes de publicar e não perde as cores nem o nível ao alternar.
- **Contexto:** A personalização do tema já existe, separada da edição dos dados do evento. Hoje ela mostra cor 1 e cor 2; no layout **Personalizado**, também título e texto. Cada cor pode voltar ao padrão sozinha. “Redefinir tema” restaura as cores e publica na hora. “Salvar” publica o rascunho. A prévia usa os dados reais do evento e o layout já salvo, e hoje desenha sempre o gradiente. O layout **Somente imagem** já exige imagem. Esta spec acrescenta os ícones e o deslize, e faz a prévia usar o visual da Spec 01.
- **Atores:** O organizador autenticado, na personalização de um evento já criado.
- **Descrição do comportamento:** Se o layout já salvo for **Personalizado**, a personalização permanece como está: quatro cores, prévia em gradiente, sem ícones de fundo e sem deslize. Se o layout já salvo for **Somente imagem**, dois ícones aparecem: **Fundo com desfoque** e **Fundo com gradiente**. O ícone do modo gravado começa selecionado; se não houver modo gravado, o gradiente começa selecionado. Selecionar o desfoque esconde cor 1 e cor 2 e mostra o deslize, com a porcentagem visível. Selecionar o gradiente esconde o deslize e mostra cor 1 e cor 2. A prévia usa imediatamente o rascunho, com as regras visuais da Spec 01. “Salvar” grava modo, nível e cores juntos e só então muda a página pública. Sair sem salvar descarta o rascunho. “Redefinir tema” volta o modo para gradiente, restaura as cores ao padrão, descarta o nível ajustado e publica essa restauração na hora.
- **Entradas e saídas:** Entradas: layout já salvo; modo e nível já gravados; cores já gravadas; imagem do evento; interação nos ícones, no deslize, nas cores, em “Salvar” e em “Redefinir tema”. Saídas: prévia atualizada; ao salvar ou redefinir, modo, nível e cores gravados, e página pública alinhada a esse resultado. A prévia não grava nada por si.
- **Dados/entidades envolvidos (conceitual):** O mesmo evento da Spec 01: modo de fundo, nível de desfoque e as cores que o tema já guarda. O rascunho da personalização pode diferir do que está publicado até salvar ou redefinir.
- **Estados e transições:** Ícone gradiente selecionado: cores visíveis, deslize oculto, prévia em gradiente sem superfície clara. Ícone desfoque selecionado: deslize visível, cores ocultas, prévia com foto ampliada, desfoque no nível do deslize e superfície clara. Rascunho alterado e não salvo: a prévia muda e a página pública não. Salvo: página pública igual à prévia daquele momento. Redefinido: modo gradiente, cores padrão, nível descartado, prévia e página pública no gradiente padrão, deslize futuro em 70%.
- **Regras de negócio:** Regras 1, 4, 9, 10, 13, 14, 15, 16, 18, 19, 20 e 22. O visual da prévia obedece às regras 5, 6, 7, 8, 11 e 12 da Spec 01.
- **Validações:** O nível enviado está entre 0% e 100%. Valor vazio ou inválido não é gravado; o salvamento desse nível é recusado e o que já estava publicado permanece. As cores, quando o ícone de gradiente está selecionado, continuam com a validação que o tema já aplica. Salvar no modo desfoque não exige redigitar as cores: as cores já válidas permanecem guardadas. Só o organizador autenticado conclui salvar ou redefinir.
- **Fluxo do usuário (passo a passo):**
  1. O organizador abre a personalização de um evento em **Somente imagem**.
  2. Vê o ícone de gradiente selecionado, cor 1 e cor 2, e a prévia no gradiente.
  3. Seleciona o ícone de desfoque. O deslize aparece em 70% se não houver nível salvo. A prévia muda na hora.
  4. Move o deslize. A prévia acompanha a porcentagem.
  5. Salva. A página pública passa a mostrar esse fundo.
  6. Se selecionar de novo o ícone de gradiente, as cores voltam a aparecer, o deslize some e a prévia volta ao gradiente. O nível permanece para a próxima seleção do desfoque.
- **Casos de borda e erros:** Primeira seleção do desfoque, sem nível salvo: deslize em 70%, não em 0%. Reabrir depois de salvar 40%: ícone de desfoque selecionado e deslize em 40%. Alternar ícones sem salvar: a prévia alterna e a página pública fica no último valor gravado. Fechar a personalização sem salvar: modo, nível e cores publicados não mudam. “Redefinir tema” com o desfoque selecionado: publica o gradiente padrão, esconde o efeito do desfoque na página e faz o próximo deslize abrir em 70%. Cor inválida com o ícone de gradiente selecionado: o salvamento é recusado, com o aviso que o tema já usa, e a página pública não muda. Layout ainda não salvo como **Somente imagem**: os ícones não aparecem, porque a prévia e esta tela usam o layout já salvo. Falha ao gravar: a personalização informa que não foi possível salvar e mantém o publicado anterior. Evento de outro organizador, ou organizador sem sessão: a alteração não é gravada.
- **Impacto no existente:** A personalização do layout **Personalizado** permanece com as quatro cores e sem esta escolha. A personalização do layout **Somente imagem** deixa de mostrar as duas cores o tempo todo: elas aparecem com o ícone de gradiente e somem com o ícone de desfoque. “Salvar” passa a gravar também modo e nível. “Redefinir tema” passa a restaurar também o modo gradiente e a descartar o nível. A prévia deixa de ser sempre um gradiente quando o rascunho está em desfoque.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um evento em **Somente imagem** ainda no gradiente, quando o organizador abre a personalização, então o ícone de gradiente está selecionado, cor 1 e cor 2 estão visíveis e o deslize não está visível.
  - Dado essa tela, quando o organizador seleciona o ícone de desfoque pela primeira vez, então as cores ficam ocultas, o deslize aparece em 70% e a prévia mostra o fundo da Spec 01 nesse nível, com a superfície clara e o botão na cor 1.
  - Dado o deslize em 70%, quando o organizador muda para 40% e ainda não salvou, então a prévia usa 40% e a página pública continua no fundo publicado anteriormente.
  - Dado o desfoque ajustado em 40% e salvo, quando o organizador seleciona o gradiente e salva, então a página pública volta ao gradiente sem superfície clara, e as cores guardadas voltam a valer no fundo.
  - Dado um nível de 40% já salvo, quando o organizador seleciona de novo o ícone de desfoque, então o deslize mostra 40%, não 70%.
  - Dado qualquer modo selecionado, quando o organizador aciona “Redefinir tema”, então o modo publicado volta a gradiente, as cores publicadas voltam ao padrão, o nível ajustado deixa de valer e a página pública acompanha sem uma confirmação extra.
  - Dado um evento no layout **Personalizado**, quando o organizador abre a personalização, então não há ícones de fundo nem deslize, e a prévia permanece no gradiente.
  - Dado o organizador sem permissão para aquele evento, quando tenta salvar o fundo, então nada é gravado.
- **Definição de pronto:** No layout **Somente imagem**, os dois ícones alternam os controles certos, a prévia acompanha o rascunho com o visual da Spec 01, salvar publica modo e nível, sair sem salvar não publica, e “Redefinir tema” devolve o gradiente padrão. No layout **Personalizado**, a personalização segue como antes desta feature.
- **Dependências:** Spec 01 — o visual que a prévia e a página pública devem mostrar para cada modo e cada nível.
- **Fora do escopo desta spec:** Definir ampliação, intensidade visual dos extremos do desfoque e a superfície clara. Isso é a Spec 01. Também ficam de fora: escolher o layout nesta tela, enviar a imagem, alterar o card da lista e criar outra personalização além da que o evento já tem.

## 14. Ordem recomendada de implementação

1. Spec 01 — Página com fundo desfocado ou gradiente
2. Spec 02 — Escolha do fundo na personalização

A Spec 01 estabelece o que a página mostra em cada modo. A Spec 02 só consegue uma prévia fiel e um salvamento verificável depois que esse visual existe. Seguir a ordem evita publicar controles cujo resultado ainda não está definido.
