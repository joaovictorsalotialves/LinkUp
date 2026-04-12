# LinkUp 1.v

## RFs (Requisitos Funcionais)
- [ ] Segurança:
  - [ ] Deve ser possível se cadastrar com dados para identificação e acesso do usuário;
  - [ ] Deve ser possível se autenticar;
  - [ ] Deve ser possível recuperar a senha;
  - [ ] Deve ser possível obter o perfil do usuário logado;
  - [ ] Deve ser possível atualizar as informações do usuário logado;
  - [ ] Deve ser possível alterar a senha do usuário logado;
  - [ ] Deve ser possível criar uma sessão (login);
  - [ ] Deve ser possível encerrar qualquer sessão ativa associada à sua conta (logout);
  - [ ] Deve ser possível listar todas as sessões ativas do usuário logado;
  - [ ] Deve ser possível o usuário pausar a sua conta;

- [ ] Perfil:
  - [ ] Deve ser possível obter a quantidade de posts que o usuário postou;
  - [ ] Deve ser possível obter os posts do usuário;
  - [ ] Deve ser possível obter a quantidade de usuários que o usuário segue;
  - [ ] Deve ser possível obter a quantidade de seguidores do usuário;

- [ ] Post:
  - [ ] Deve ser possível postar um post;
  - [ ] Deve ser possível alterar um post;
  - [ ] Deve ser possível excluir um post;
  - [ ] Deve ser possível visualizar um post específico;
  - [ ] Deve ser possível obter posts de diversos usuários para o Feed global;
  - [ ] Deve ser possível obter posts dos usuários seguidos para o Feed seguindo;

- [ ] Comentário:
  - [ ] Deve ser possível comentar em um post;
  - [ ] Deve ser possível alterar um comentário;
  - [ ] Deve ser possível excluir um comentário;
  - [ ] Deve ser possível obter a quantidade de comentários de um post;
  - [ ] Deve ser possível obter os usuários que comentaram um post;
  - [ ] Deve ser possível responder um comentário;

- [ ] Likes:
  - [ ] Deve ser possível curtir um post;
  - [ ] Deve ser possível remover a curtida de post;
  - [ ] Deve ser possível obter a quantidade de curtidas de um post;
  - [ ] Deve ser possível obter os usuários que curtiram um post;
  - [ ] Deve ser possível curtir um comentário;
  - [ ] Deve ser possível remover a curtida de comentário;
  - [ ] Deve ser possível obter a quantidade de curtidas de um comentário;

- [ ] Seguir:
  - [ ] Deve ser possível seguir outros usuários;
  - [ ] Deve ser possível deixar de seguir outros usuários;
  - [ ] Deve ser possível listar seguidores de um usuário;
  - [ ] Deve ser possível listar quem o usuário segue;

## RNs (Regras de Negócio)
- [ ] O usuário só pode acessar recursos protegidos se estiver autenticado;
- [ ] Um refresh token deve ser utilizado apenas uma vez (rotação);
- [ ] O usuário não pode se cadastrar com um e-mail já existente;
- [ ] O usuário deve confirmar o e-mail cadastrado após o cadastro para que consiga se autenticar;
- [ ] As contas cadastradas podem ser cadastradas pelo formulário ou via OAuth 2.0 do Google;
- [ ] O login pode ser realizado via email/senha ou OAuth 2.0 do Google;
- [ ] Para recuperação de senha:
  - [ ] O usuário receberá um código de 6 dígitos;
  - [ ] O código terá validade de 15 minutos;
  - [ ] Após 5 tentativas incorretas, o código será invalidado;
- [ ] Um usuário não pode seguir a si mesmo;
- [ ] O usuário só pode editar ou excluir posts feitos por ele;
- [ ] O usuário só pode editar ou excluir comentários feitos por ele;
- [ ] Um usuário não pode curtir o mesmo post mais de uma vez;
- [ ]  Um usuário não pode interagir com recursos inexistentes:
  - [ ] Curtir/comentar post inexistente;
  - [ ] Responder/curtir comentário inexistente;
- [ ] Um post deve estar associado a um usuário válido;
- [ ]  Um comentário deve estar associado a:
  - [ ] Um usuário válido;
  - [ ] Um post válido;
- [ ] Um comentário não pode ser criado em um post removido (deleted_at IS NOT NULL);
- [ ] Um post não pode ser criado sem conteúdo;
- [ ] Um post só deve ser visível quando:
  - [ ] deleted_at IS NULL
  - [ ] o usuário proprietário estiver com status ACTIVE;
- [ ] Um post pode possuir uma ou mais imagens associadas:
  - [ ] Cada imagem pertence a um único post;
  - [ ] Máximo de 10 imagens por post;
  - [ ] A ordem das imagens deve ser única e sequencial;
- [ ] Regras de imagens:
  - [ ] Devem estar associadas a um post válido;
  - [ ] Não podem ser associadas a posts removidos;
  - [ ]Ao remover um post (soft delete), suas imagens tornam-se indisponíveis;
- [ ] Um comentário não pode ser criado sem conteúdo;
- [ ] Um comentário pode opcionalmente referenciar outro comentário como pai;
- [ ] Um comentário pai deve pertencer ao mesmo post;
- [ ] Um comentário não pode ser pai dele mesmos;
- [ ] Um comentário pode possuir no máximo 2 níveis:
  - Comentário raiz (parent_id = NULL)
  - Resposta (parent_id != NULL)
- [ ] Um comentário não pode responder outro comentário que já seja uma resposta;
- [ ] Os posts do Feed global e Feed seguindo devem ser retornados ordenados por data de publicação;
- [ ] Sessões:
  - [ ] Revogada → logout ou invalidação manual;
  - [ ] Expirada → passou do expires_at;
  - [ ] Inativa → sem uso por mais de 7 dias;
- [ ] Usuários, posts e comentários devem ser excluídos utilizando a estratégia de soft delete, através do preenchimento de um campo de data de exclusão (deleted_at), sem remoção física dos dados;
- [ ] Um usuário com conta pausada pode reativar sua conta utilizando suas credenciais anteriores;
- [ ] Usuários com conta pausada não podem se autenticar enquanto a conta não for reativada por meio de um link de reativação enviado ao e-mail cadastrado;
- [ ] Ao tentar autenticar com conta pausada:
  - [ ] O acesso deve ser negado;
  - [ ] Um novo token de reativação deve ser gerado;
  - [ ] Um e-mail de reativação deve ser enviado automaticamente;
- [ ] Se o usuário pausar sua conta ou tiver a conta revogada, todos os conteúdos gerados pelo usuário (posts e comentários (caso um comentário seja pai, seus comentários filhos também devem ser ocultados)) devem ter sua visibilidade suspensa imediatamente;
- [ ] Se o usuário pausar sua conta ou tiver a conta revogada, todas as suas sessões serão revogadas imediatamente;
- [ ] Tokens não devem ser reutilizáveis, mesmo em cenários de concorrência (race condition);
- [ ] Todos os tokens (recuperação de senha, validação de e-mail e reativação de conta) devem expirar em 15 minutos;
- [ ]  Um token não pode ser utilizado se já estiver expirado ou já tiver sido utilizado (used_at preenchido);

## RNFs (Requisitos Não Funcionais)
- [ ] Autenticação deve utilizar JWT (15 minutos) com refresh token (30 dias);
- [ ] Senhas devem ser criptografadas;
- [ ] Os dados da aplicação devem estar persistidos em um banco PostgreSQL;
- [ ] Consultas mais frequentes devem ser otimizadas com índices no banco de dados;
- [ ] Logs da aplicação devem ser registrados para auditoria;
- [ ] Listagens devem ser paginadas com limite máximo de 50 registros por requisição;
- [ ] A aplicação deve utilizar o docker para subir os serviços;
- [ ] A aplicação deve seguir os princípios de Domain-Driven Design (DDD), separando camadas de domínio, aplicação e infraestrutura;
- [ ] O domínio deve ser independente de frameworks externos;
- [ ] A aplicação deve possuir testes unitários e testes de integração (e2e) para os principais fluxos;
- [ ] A API deve ter tempo de resposta inferior a 500ms;
- [ ] Sessões revogadas, expiradas e inativas devem ser removidas automaticamente a cada 1 hora;
- [ ] A remoção de sessões deve ser realizada por processo assíncrono (job/worker);
- [ ] Proibido salvar binários no banco;
- [ ] Imagens:
  - [ ] Converter para WebP;
  - [ ] Limite de 5MB;
  - [ ] Redimensionamento conforme contexto;
- [ ] Servir as imagens via CDN para garantir baixa latência e redução de carga no servidor principal.

## Banco de dados

### 🧑‍💻 Users

```sql
users:
- id: uuid (PK)
- username: varchar(50) UNIQUE
- email: varchar(255) UNIQUE
- password_hash: varchar(255) (nullable)
- url_profile_photo: varchar(255) (nullable)
- description: text (nullable)
- status: enum ('ACTIVE', 'PENDING', 'PAUSED', 'REVOKED') DEFAULT 'PENDING'
- created_at: timestamptz
- updated_at: timestamptz
- deleted_at: timestamptz (nullable)
```

### Regras

* Usuários com `deleted_at` preenchido são considerados inativos e não podem se autenticar.
* Ao alterar o status para `PAUSED` ou `REVOKED`, todas as sessões ativas devem ser revogadas.

---

### 🔗 User Providers (OAuth)

```sql
user_providers:
- id: uuid (PK)
- provider_id: varchar(255)
- provider: varchar(30) DEFAULT 'GOOGLE'
- created_at: timestamptz
- user_id: uuid (FK → users.id)

UNIQUE (provider, provider_id)
```

### Índices

```sql
CREATE INDEX idx_user_providers_user_id 
ON user_providers(user_id);
```

### Regras

* A UNIQUE composta garante que um mesmo `provider_id` não seja duplicado dentro do mesmo provedor.

---

### 🔐 Sessions

```sql
sessions:
- id: uuid (PK)
- refresh_token_hash: varchar(255) UNIQUE
- user_id: uuid (FK → users.id)
- user_agent: varchar(255)
- ip_address: inet
- created_at: timestamptz
- last_used_at: timestamptz
- expires_at: timestamptz
- revoked_at: timestamptz (nullable)
```

### Índices

#### Sessões ativas

```sql
CREATE INDEX idx_sessions_active
ON sessions(user_id)
WHERE revoked_at IS NULL;
```

#### Limpeza de sessões expiradas

```sql
CREATE INDEX idx_sessions_cleanup
ON sessions(expires_at)
WHERE revoked_at IS NULL;
```

#### Sessões inativas

```sql
CREATE INDEX idx_sessions_last_activity
ON sessions(last_used_at)
WHERE revoked_at IS NULL;
```

### Regras

* Sessões são consideradas ativas quando:
  - revoked_at IS NULL
  - expires_at > now()
* Sessões devem ser removidas quando expiradas ou inativas.
* O campo `last_used_at` deve ser atualizado de forma preguiçosa para evitar sobrecarga no banco.

---

### 🎟️ User Tokens

```sql
user_tokens:
- id: uuid (PK)
- token_hash: varchar(255) UNIQUE
- user_id: uuid (FK → users.id)
- type: enum ('PASSWORD_RESET', 'ACCOUNT_REACTIVATION', 'EMAIL_VERIFICATION')
- attempts: int DEFAULT 0
- created_at: timestamptz
- used_at: timestamptz (nullable)
- expires_at: timestamptz
```

### Índices

#### Tokens ativos

```sql
CREATE INDEX idx_user_tokens_active
ON user_tokens(user_id)
WHERE used_at IS NULL;
```

#### Limpeza de tokens expirados

```sql
CREATE INDEX idx_user_tokens_cleanup
ON user_tokens(expires_at)
WHERE used_at IS NULL;
```

#### Limpeza de tokens já usados

```sql
CREATE INDEX idx_user_tokens_garbage_collector
ON user_tokens(used_at)
WHERE used_at IS NOT NULL;
```

### Regras

* Tokens só podem ser utilizados uma única vez (`used_at`).
* Tokens expiram conforme `expires_at`.
* O campo `attempts` controla tentativas de uso:
  * Após 5 tentativas inválidas, o token deve ser automaticamente invalidado.
* As operações dependem do status do usuário:
  * `ACTIVE` → recuperação de senha
  * `PENDING` → verificação de email
  * `PAUSED` → reativação de conta
  * `REVOKED` → nenhuma operação permitida

---

### 📝 Posts

```sql
posts:
- id: uuid (PK)
- user_id: uuid (FK → users.id)
- description: text (nullable)
- created_at: timestamptz
- updated_at: timestamptz
- deleted_at: timestamptz (nullable)
```

### 📊 Índices

#### Feed seguindo (posts de usuários seguidos)

```sql
CREATE INDEX idx_posts_user_id_created_at
ON posts(user_id, created_at DESC)
WHERE deleted_at IS NULL;
```

#### Feed global (posts recentes)

```sql
CREATE INDEX idx_posts_created_at
ON posts(created_at DESC)
WHERE deleted_at IS NULL;
```

### 📌 Regras

* Posts com `deleted_at` preenchido são considerados removidos (soft delete).
* O feed deve considerar apenas posts onde `deleted_at IS NULL`.
* Os posts do **Feed Global** devem ser ordenados por data de criação (`created_at DESC`).
* Os posts do **Feed Seguindo** devem ser filtrados por `user_id` e ordenados por data de criação.
* Ao pausar ou revogar a conta de um usuário, seus posts devem ser **ocultados com base no status da conta**, sem alteração do campo `deleted_at`.
* Um post só deve ser visível quando:
  - deleted_at IS NULL
  - o usuário proprietário estiver com status ACTIVE;

---

### 🖼️ Images

```sql
images:
- id: uuid (PK)
- post_id: uuid (FK → posts.id)
- url: varchar(255)
- order_in_post: int
- created_at: timestamptz

UNIQUE (post_id, order_in_post)
```

### 📊 Índices

#### Imagens por post (ordenadas)

```sql
CREATE INDEX idx_images_post_id_order
ON images(post_id, order_in_post);
```

### 📌 Regras

* Um post pode possuir múltiplas imagens associadas.
* As imagens devem ser recuperadas ordenadas pelo campo `order_in_post`.
* Cada imagem deve estar obrigatoriamente associada a um post válido.
* A exclusão de um post (soft delete) implica na **indisponibilidade lógica** das imagens associadas.

---

### 💬 Comments

```sql
comments:
- id: uuid (PK)
- user_id: uuid (FK → users.id)
- post_id: uuid (FK → posts.id)
- parent_id: uuid (FK → comments.id) (nullable)
- content: text
- created_at: timestamptz
- updated_at: timestamptz
- deleted_at: timestamptz (nullable)

CHECK (parent_id IS NULL OR parent_id <> id)
CHECK (length(trim(content)) > 0)
```

### 📊 Índices

#### Carregar todos os comentários de um post de uma vez só, já organizados
```sql
CREATE INDEX idx_comments_post_full
ON comments(post_id, parent_id, created_at)
WHERE deleted_at IS NULL;
```

#### Comentários por usuário

```sql
CREATE INDEX idx_comments_user_id
ON comments(user_id)
WHERE deleted_at IS NULL;
```

#### Comentários principais do post (nível raiz)

```sql
CREATE INDEX idx_comments_post_id 
ON comments(post_id, created_at ASC) 
WHERE deleted_at IS NULL AND parent_id IS NULL;
```

#### Respostas de um comentário

```sql
CREATE INDEX idx_comments_parent_id 
ON comments(parent_id, created_at ASC)
WHERE parent_id IS NOT NULL AND deleted_at IS NULL;
```

### Trigger

* ✔ Validar post;
* ✔ Comentário não pode ser pai dele mesmo;
* ✔ Limite de profundidade (2 níveis);
* ✔ Mesmo post;
* ✔ Não responder comentário deletado.

```sql
CREATE OR REPLACE FUNCTION check_comment_integrity()
RETURNS TRIGGER AS $$
DECLARE
  parent_record comments%ROWTYPE;
  is_post_deleted boolean;
BEGIN
  -- 1. Validar se o Post está ativo (Soft Delete Check)
  -- A existência do ID a FK já garante.
  SELECT (deleted_at IS NOT NULL) INTO is_post_deleted FROM posts WHERE id = NEW.post_id;
  
  IF is_post_deleted THEN
    RAISE EXCEPTION 'Não é possível comentar em post removido';
  END IF;

  -- 2. Se for uma resposta
  IF NEW.parent_id IS NOT NULL THEN
    -- Busca dados do pai para validar regras de negócio
    SELECT * INTO parent_record FROM comments WHERE id = NEW.parent_id;

    -- RN: Mesmo post
    IF parent_record.post_id <> NEW.post_id THEN
      RAISE EXCEPTION 'Comentário pai deve pertencer ao mesmo post';
    END IF;

    -- RN: Não responder comentário com soft delete
    IF parent_record.deleted_at IS NOT NULL THEN
      RAISE EXCEPTION 'Não é possível responder um comentário removido';
    END IF;

    -- RN: Limite de profundidade (Máximo 2 níveis)
    IF parent_record.parent_id IS NOT NULL THEN
      RAISE EXCEPTION 'Não é permitido responder uma resposta (máx 2 níveis)';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### 🔗 Agora conecta a trigger
```sql
CREATE TRIGGER trg_comments_before_ins_upd_check_integrity
BEFORE INSERT OR UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION check_comment_integrity();
```

### 📌 Regras
* Um comentário não pode ser criado em um post removido (`deleted_at IS NOT NULL`);
* Um comentário pode opcionalmente referenciar outro comentário (`parent_id`);
* Um comentário filho:
  * Deve pertencer ao mesmo `post_id` do comentário pai;
  * Deve possuir um `parent_id` válido;
* Um comentário pode possuir no máximo 2 níveis:
  * Comentário raiz (parent_id = NULL)
  * Resposta (parent_id != NULL)
* Um comentário não pode responder outro comentário que já seja uma resposta;
* Um comentário só deve ser visível quando:
  * `deleted_at IS NULL`;
  * O usuário proprietário estiver com status `ACTIVE`;
  * O post associado não estiver removido (`deleted_at IS NULL`);
* Ao pausar ou revogar a conta:
  * Os comentários do usuário devem ser **ocultados com base no status**, sem alterar `deleted_at`;
* Ao remover um comentário (soft delete):
  * Seus comentários filhos devem ter a visibilidade **ocultada logicamente**;

## 💬 Comment Likes

```sql
comment_likes:
- comment_id: uuid (FK → comments.id)
- user_id: uuid (FK → users.id)
- liked_at: timestamptz

PRIMARY KEY (comment_id, user_id)
```

### 📊 Índices

#### Likes por comentário

```sql
CREATE INDEX idx_comment_likes_comment_id
ON comment_likes(comment_id);
```

#### Likes por usuário

```sql
CREATE INDEX idx_comment_likes_user_id
ON comment_likes(user_id);
```

### 📌 Regras

* A **primary key composta** (`comment_id`, `user_id`) garante que:
  * Um usuário só pode curtir um comentário **uma única vez**;

### Trigger

```sql 
CREATE OR REPLACE FUNCTION check_comment_like_integrity()
RETURNS TRIGGER AS $$
DECLARE
  comment_record comments%ROWTYPE;
  user_status users.status%TYPE;
BEGIN
  -- 1. Busca o comentário
  SELECT *
  INTO comment_record
  FROM comments
  WHERE id = NEW.comment_id;

  -- 2. Deve existir
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Comentário não encontrado';
  END IF;

  -- 3. Não pode estar deletado
  IF comment_record.deleted_at IS NOT NULL THEN
    RAISE EXCEPTION 'Não é possível curtir comentário removido';
  END IF;

  -- 4. Busca status do dono do comentário
  SELECT status
  INTO user_status
  FROM users
  WHERE id = comment_record.user_id;

  -- 5. Usuário precisa estar ativo
  IF user_status <> 'ACTIVE' THEN
    RAISE EXCEPTION 'Não é possível curtir comentário de usuário inativo';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### 🔗 Agora conecta a trigger

```sql 
CREATE TRIGGER trg_check_comment_like_integrity
BEFORE INSERT ON comment_likes
FOR EACH ROW
EXECUTE FUNCTION check_comment_like_integrity();
```

## 📝 Post Likes

```sql
post_likes:
- post_id: uuid (FK → posts.id)
- user_id: uuid (FK → users.id)
- liked_at: timestamptz

PRIMARY KEY (post_id, user_id)
```

### 📊 Índices

#### Likes por post

```sql
CREATE INDEX idx_post_likes_post_id
ON post_likes(post_id);
```

#### Likes por usuário

```sql
CREATE INDEX idx_post_likes_user_id
ON post_likes(user_id);
```

### 📌 Regras

* A **primary key composta** (`post_id`, `user_id`) garante:
  * Um usuário não pode curtir o mesmo post mais de uma vez;

### Trigger

```sql 
CREATE OR REPLACE FUNCTION check_post_like_integrity()
RETURNS TRIGGER AS $$
DECLARE
  post_record posts%ROWTYPE;
  user_status users.status%TYPE;
BEGIN
  -- 1. Busca o post
  SELECT *
  INTO post_record
  FROM posts
  WHERE id = NEW.post_id;

  -- 2. Deve existir
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Post não encontrado';
  END IF;

  -- 3. Não pode estar deletado
  IF post_record.deleted_at IS NOT NULL THEN
    RAISE EXCEPTION 'Não é possível curtir post removido';
  END IF;

  -- 4. Busca status do dono do post
  SELECT status
  INTO user_status
  FROM users
  WHERE id = post_record.user_id;

  -- 5. Usuário precisa estar ativo
  IF user_status <> 'ACTIVE' THEN
    RAISE EXCEPTION 'Não é possível curtir post de usuário inativo';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```
#### 🔗 Agora conecta a trigger

```sql
CREATE TRIGGER trg_check_post_like_integrity
BEFORE INSERT ON post_likes
FOR EACH ROW
EXECUTE FUNCTION check_post_like_integrity();
```

### 🔒 Regras de Integridade (Banco de Dados)

* Não é permitido:
  * Curtir posts ou comentários inexistentes;
  * Curtir conteúdos removidos (`deleted_at IS NOT NULL`);
  * Curtir conteúdos de usuários com status diferente de `ACTIVE`.

### 🧠 Estratégia de Soft Delete

* Likes **não são removidos** quando um post ou comentário é deletado.
* A consistência é garantida via **filtros nas queries** (`JOIN` com conteúdo ativo).
