# Confirm Event

Last updated: 2026-09-19

Site para o organizador criar **vários eventos** e receber confirmação de presença. O produto é genérico: **título** e **detalhes** descrevem a ocasião; não há tipos, categorias nem fluxos por tipo de evento.

Ver também: [Arquitetura](architecture.md).

## Quem usa

- **Organizador** — entra no painel com e-mail e senha. Não há tela de cadastro público; a conta é criada no Supabase.
- **Convidado** — usa só a página pública do evento, sem login.

## Página pública

Cada evento tem um endereço `/{slug}`. A página mostra título, detalhes (somente se houver texto), data, horário e local, um campo de **nome completo** e o botão **“Eu vou!”**.

Cada envio válido grava **uma** confirmação naquele evento. Nomes iguais viram linhas distintas. Depois do sucesso, o convidado pode confirmar outra pessoa. Não há “não vou”; o convidado não edita, não cancela e não vê os outros nomes.

Se o slug for um trecho antigo do mesmo evento, a visita redireciona para o slug atual. Evento inexistente ou já excluído mostra “Evento indisponível” e não aceita confirmação.

## Painel

`/` redireciona para `/painel` (com sessão) ou `/login`. Sem sessão, `/painel` e subrotas vão para `/login`.

O organizador:

1. Vê a lista de eventos (título e data) ou o estado vazio, e cria um novo em `/painel/eventos/novo`.
2. Informa título, data, horário e local (obrigatórios) e detalhes (opcional). A data não pode ser anterior ao dia corrente. O sistema gera um slug a partir do título.
3. Em `/painel/eventos/[id]`: edita os dados; copia o link; altera o trecho (letras, números e hífen; único no sistema, inclusive no histórico de outros eventos). Trechos antigos **daquele** evento passam a abrir o atual.
4. Vê o **total** e a **lista de nomes só daquele evento**; edita um nome ou remove uma linha (com confirmação).
5. Exclui o evento (confirmação explícita): apaga evento, confirmações e slugs. Os trechos ficam livres. Não há desfazer.

Se a data do evento já passou, ainda é possível salvar título, detalhes, horário, local e link sem mudar a data. Não é possível gravar uma **data nova** no passado.

Na entrada há **Esqueci a senha** (`/recuperar-senha`). A resposta é genérica (não revela se o e-mail existe). O e-mail da conta leva a `/auth/confirm` e depois a `/redefinir-senha` (senha nova com no mínimo 6 caracteres).

## Fora deste recorte

Cadastro público, vários organizadores no produto, envio automático de convite, recusa de presença, acompanhantes, exportar planilha e limite de confirmações por evento.
