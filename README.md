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
- [ ] Usuários que se autenticarem com OAuth 2.0 poderam definir uma senha posteriormente;
- [ ] Para recuperação de senha:
  - [ ] O usuário receberá um código de 6 dígitos;
  - [ ] O código terá validade de 15 minutos;
  - [ ] Após 5 tentativas incorretas, o código será invalidado;
- [ ] Um usuário não pode seguir a si mesmo;
- [ ] O usuário só pode editar ou excluir posts feitos por ele;
- [ ] O usuário só pode editar ou excluir comentários feitos por ele;
- [ ] Um usuário não pode curtir o mesmo post mais de uma vez;
- [ ] A operação de curtir/descurtir deve ser idempotente:
  - [ ] Curtir/Descurtir um post ou comentário já curtido não deve gerar erro;
  - [ ] Pode retornar sucesso sem alterar estado;
- [ ] Um usuário não pode interagir com recursos inexistentes:
  - [ ] Curtir/comentar post inexistente;
  - [ ] Responder/curtir comentário inexistente;
- [ ] O contador de likes de posts e comentários representa o total bruto de interações realizadas, independentemente do status atual do usuário;
- [ ] A listagem de usuários que curtiram um post ou comentário deve considerar apenas usuários com status ACTIVE;
- [ ] Contadores (likes, comentários e respostas) devem ser materializados nas entidades principais para otimização de leitura, evitando consultas agregadas em tempo de execução;
- [ ] Um post deve estar associado a um usuário válido;
- [ ]  Um comentário deve estar associado a:
  - [ ] Um usuário válido;
  - [ ] Um post válido;
- [ ] Um comentário não pode ser criado em um post removido (deleted_at IS NOT NULL);
- [ ] Um post não pode ser criado sem conteúdo;
- [ ] Um post ou comentário só deve ser visível quando:
  - [ ] deleted_at IS NULL
  - [ ] o usuário autor estiver ACTIVE;
- [ ] Não pode ocorrer interações com post ou comentários que não estejam visíveis;
- [ ] Um post pode possuir uma ou mais imagens associadas:
  - [ ] Cada imagem pertence a um único post;
  - [ ] Máximo de 10 imagens por post;
  - [ ] A ordem das imagens deve ser única e sequencial;
- [ ] Regras de imagens:
  - [ ] Devem estar associadas a um post válido;
  - [ ] Não podem ser associadas a posts removidos;
  - [ ] Ao remover um post (soft delete), suas imagens tornam-se indisponíveis;
- [ ] Um comentário não pode ser criado sem conteúdo;
- [ ] Um comentário pode opcionalmente referenciar outro comentário como pai;
- [ ] Um comentário pai deve pertencer ao mesmo post;
- [ ] Um comentário não pode ser pai dele mesmos;
- [ ] Um comentário pode possuir no máximo 2 níveis:
  - [ ] Comentário raiz (parent_id = NULL)
  - [ ] Resposta (parent_id != NULL)
- [ ] Um comentário não pode responder outro comentário que já seja uma resposta;
- [ ] Ao reativar um comentário pai, seus comentários filhos devem voltar a ser visíveis apenas se: 
  - [ ] não estiverem removidos (deleted_at IS NULL);
  - [ ] o usuário autor estiver ACTIVE;
- [ ] Os posts do Feed global e Feed seguindo devem ser retornados ordenados por data de publicação;
- [ ] O feed global e o feed seguindo devem considerar apenas posts visíveis:
  - [ ] deleted_at IS NULL
  - [ ] usuário com status ACTIVE
- [ ] Sessões:
  - [ ] Revogada → logout ou invalidação manual;
  - [ ] Expirada → passou do expires_at;
  - [ ] Inativa → sem uso por mais de 7 dias;
- [ ] Posts e comentários devem ser excluídos utilizando a estratégia de soft delete, através do preenchimento de um campo de data de exclusão (deleted_at), sem remoção física dos dados;
- [ ] A visibilidade de posts e comentários deve ser derivada do status do usuário;
- [ ] Quando o usuário tiver sua conta pausada ou revogada, todos os seus posts e comentários devem se tornar invisíveis;
- [ ] Quando o usuário reativar sua conta (status ACTIVE), todos os seus posts e comentários que não estejam removidos (deleted_at IS NULL) devem voltar a ser visíveis automaticamente;
- [ ] Um usuário com conta pausada pode reativar sua conta utilizando suas credenciais anteriores;
- [ ] Usuários com conta pausada não podem se autenticar enquanto a conta não for reativada por meio de um link de reativação enviado ao e-mail cadastrado;
- [ ] Ao tentar autenticar com conta pausada:
  - [ ] O acesso deve ser negado;
  - [ ] Um novo token de reativação deve ser gerado;
  - [ ] Um e-mail de reativação deve ser enviado automaticamente;
- [ ] Se o usuário pausar sua conta ou tiver a conta revogada, todos os conteúdos gerados pelo usuário (posts e comentários (caso um comentário seja pai, seus comentários filhos também devem ser ocultados)) devem ter sua visibilidade suspensa imediatamente;
- [ ] Atualizar o last_used_at das sessões a cada 15 minutos;
- [ ] Sessões revogadas, expiradas e inativas devem ser removidas automaticamente a cada 1 hora;
- [ ] Se o usuário pausar sua conta ou tiver a conta revogada, todas as suas sessões serão revogadas imediatamente;
- [ ] Tokens não devem ser reutilizáveis, mesmo em cenários de concorrência (race condition);
- [ ] Todos os tokens (recuperação de senha, validação de e-mail e reativação de conta) devem expirar em 15 minutos;
- [ ] Um token não pode ser utilizado se já estiver expirado ou já tiver sido utilizado (used_at preenchido);

## RNFs (Requisitos Não Funcionais)
- [ ] Autenticação deve utilizar JWT (15 minutos) com refresh token (30 dias);
- [ ] Senhas devem ser criptografadas;
- [ ] Os dados da aplicação devem estar persistidos em um banco PostgreSQL;
- [ ] Consultas mais frequentes devem ser otimizadas com índices no banco de dados;
- [ ] Listagens devem ser paginadas com limite máximo de 50 registros por requisição;
- [ ] A aplicação deve utilizar o docker para subir os serviços;
- [ ] A aplicação deve seguir os princípios de Domain-Driven Design (DDD), separando camadas de domínio, aplicação e infraestrutura;
- [ ] O domínio deve ser independente de frameworks externos;
- [ ] A aplicação deve possuir testes unitários e testes de integração (e2e) para os principais fluxos;
- [ ] A API deve ter tempo de resposta inferior a 500ms;
- [ ] A remoção de sessões deve ser realizada por processo assíncrono (job/worker);
- [ ] Proibido salvar binários no banco;
- [ ] Imagens:
  - [ ] Converter para WebP;
  - [ ] Limite de 5MB;
  - [ ] Redimensionamento conforme contexto;

## Banco de dados

### 🧑‍💻 Users

```sql
CREATE TYPE user_status AS ENUM ('PENDING', 'ACTIVE', 'PAUSED', 'REVOKED');

CREATE TABLE users (
  id uuid PRIMARY KEY,
  username varchar(50) UNIQUE NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255),
  url_profile_photo varchar(255),
  description text,
  status user_status NOT NULL DEFAULT 'PENDING',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

#### Trigger

```sql
CREATE OR REPLACE FUNCTION revoke_sessions_on_user_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IN ('PAUSED', 'REVOKED') AND OLD.status = 'ACTIVE' THEN
    UPDATE sessions
    SET revoked_at = NOW()
    WHERE user_id = NEW.id
      AND revoked_at IS NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_revoke_sessions
AFTER UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION revoke_sessions_on_user_status_change();
```

#### Regras

* Ao alterar o status para `PAUSED` ou `REVOKED`, todas as sessões ativas devem ser revogadas.

---

### 🔗 User Providers (OAuth)

```sql
CREATE TABLE user_providers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id VARCHAR(255) NOT NULL,
  provider    VARCHAR(30)  NOT NULL DEFAULT 'GOOGLE',
  user_id     UUID         NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  CONSTRAINT uq_provider_provider_id UNIQUE (provider, provider_id),
  
  CONSTRAINT fk_user_providers_user 
  FOREIGN KEY (user_id) 
  REFERENCES users(id) 
  ON DELETE CASCADE
);
```

#### Índices

```sql
CREATE INDEX idx_user_providers_user_id 
ON user_providers(user_id);
```

---

### 🔐 Sessions

```sql
CREATE TABLE sessions (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  refresh_token_hash VARCHAR(255) NOT NULL UNIQUE,
  user_id            UUID         NOT NULL,
  user_agent         VARCHAR(255),
  ip_address         INET,
  created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  last_used_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  expires_at         TIMESTAMPTZ  NOT NULL,
  revoked_at         TIMESTAMPTZ, -- Se preenchido, a sessão foi invalidada/logout

  CONSTRAINT fk_sessions_user 
  FOREIGN KEY (user_id) 
  REFERENCES users(id) 
  ON DELETE CASCADE
);
```

#### Índices

##### Sessões ativas

```sql
CREATE INDEX idx_sessions_active
ON sessions(user_id)
WHERE revoked_at IS NULL;
```

##### Limpeza de sessões expiradas

```sql
CREATE INDEX idx_sessions_cleanup
ON sessions(expires_at)
WHERE revoked_at IS NULL;
```

##### Sessões inativas

```sql
CREATE INDEX idx_sessions_last_activity
ON sessions(last_used_at)
WHERE revoked_at IS NULL;
```

#### Regras

* Sessões são consideradas ativas quando:
  - revoked_at IS NULL
  - expires_at > now()
* Sessões devem ser removidas quando expiradas ou inativas.
* O campo `last_used_at` deve ser atualizado de forma preguiçosa para evitar sobrecarga no banco.

---

### 🎟️ User Tokens

```sql
CREATE TYPE token_type AS ENUM (
  'PASSWORD_RESET', 
  'ACCOUNT_REACTIVATION', 
  'EMAIL_VERIFICATION'
);

CREATE TABLE user_tokens (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash   VARCHAR(255) NOT NULL UNIQUE,
  user_id      UUID         NOT NULL,
  type         token_type   NOT NULL,
  attempts     INT          NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  used_at      TIMESTAMPTZ, -- preenchido quando o token é consumido
  expires_at   TIMESTAMPTZ  NOT NULL,

  CONSTRAINT fk_user_tokens_user 
  FOREIGN KEY (user_id) 
  REFERENCES users(id) 
  ON DELETE CASCADE,

  CONSTRAINT chk_max_attempts CHECK (attempts <= 5)
);
```

#### Índices

##### Tokens ativos

```sql
CREATE INDEX idx_user_tokens_active
ON user_tokens(user_id)
WHERE used_at IS NULL;
```

##### Limpeza de tokens expirados

```sql
CREATE INDEX idx_user_tokens_cleanup
ON user_tokens(expires_at)
WHERE used_at IS NULL;
```

##### Limpeza de tokens já usados

```sql
CREATE INDEX idx_user_tokens_garbage_collector
ON user_tokens(used_at)
WHERE used_at IS NOT NULL;
```

#### Update Atômico

```sql
UPDATE user_tokens
SET used_at = NOW()
WHERE token_hash = ?
AND used_at IS NULL
AND expires_at > NOW()
RETURNING *;
```

#### Regras

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

### 🔗 Follows

```sql
CREATE TABLE follows (
  follower_id uuid REFERENCES users(id),
  following_id uuid REFERENCES users(id),
  followed_at timestamptz DEFAULT now(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id <> following_id)
);
```

#### 📊 Índices

##### Busca de seguidores (quem segue um usuário)

```sql
CREATE INDEX idx_follows_following_follower
ON follows(following_id, follower_id);
```

##### Busca de quem o usuário segue

```sql
CREATE INDEX idx_follows_follower_id
ON follows(follower_id);
```

##### Busca direta por usuários seguidos

```sql
CREATE INDEX idx_follows_following_id
ON follows(following_id);
```

#### 📌 Regras

* A **primary key composta** (`follower_id`, `following_id`) garante que:
  * Um usuário só pode seguir outro **uma única vez**;
  * Não exista duplicidade de relacionamento;

* Um usuário **não pode seguir a si mesmo**:
  * Garantido via `CHECK (follower_id <> following_id)`;

#### Trigger

```sql
CREATE OR REPLACE FUNCTION check_follow_integrity()
RETURNS TRIGGER AS $$
BEGIN
  -- Usuário que segue precisa estar ativo
  IF EXISTS (
    SELECT 1 FROM users
    WHERE id = NEW.follower_id
      AND status <> 'ACTIVE'
  ) THEN
    RAISE EXCEPTION 'Usuário não pode seguir outros';
  END IF;

  -- Usuário seguido precisa estar ativo
  IF EXISTS (
    SELECT 1 FROM users
    WHERE id = NEW.following_id
      AND status <> 'ACTIVE'
  ) THEN
    RAISE EXCEPTION 'Não é possível seguir usuário inativo';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_follow_integrity
BEFORE INSERT ON follows
FOR EACH ROW
EXECUTE FUNCTION check_follow_integrity();
```
---

### 📝 Posts

```sql
CREATE TABLE posts (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id),
  description text,
  count_likes int NOT NULL DEFAULT 0,
  count_comments int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);
```

#### View

```sql
CREATE VIEW visible_posts AS
SELECT p.*
FROM posts p
JOIN users u ON u.id = p.user_id
WHERE p.deleted_at IS NULL
AND u.status = 'ACTIVE';
```

#### 📊 Índices

##### Feed seguindo (posts de usuários seguidos)

```sql
CREATE INDEX idx_posts_user_id_created_at
ON posts(user_id, created_at DESC)
WHERE deleted_at IS NULL;
```

##### Feed global (posts recentes)

```sql
CREATE INDEX idx_posts_created_at
ON posts(created_at DESC, id DESC)
WHERE deleted_at IS NULL;
```

#### 📌 Regras

* Posts com `deleted_at` preenchido são considerados removidos (soft delete).
* Os posts do **Feed Global** devem ser ordenados por data de criação (`created_at DESC`).
* Os posts do **Feed Seguindo** devem ser filtrados por `user_id` e ordenados por data de criação.
* Ao pausar ou revogar a conta de um usuário, seus posts devem ser **ocultados com base no status da conta**, sem alteração do campo `deleted_at`.
* Um post só deve ser visível quando:
  - deleted_at IS NULL
  - o usuário proprietário estiver com status ACTIVE;

#### 📊 Contadores

* Os campos `count_likes` e `count_comments` são utilizados como **contadores materializados**, com o objetivo de evitar consultas custosas utilizando `COUNT(*)`.
* Esses campos devem ser tratados como **fonte de leitura otimizada**, não como fonte de verdade absoluta.

##### 🔹 count_likes
* Representa a quantidade total de curtidas associadas ao post.
* Deve ser incrementado sempre que um registro for criado em `post_likes`.
* Deve ser decrementado sempre que uma curtida for removida.

##### 🔹 count_comments
* Representa a quantidade total de comentários (nível raiz + respostas) associados ao post.
* Deve ser incrementado sempre que um comentário for criado para o post.
* Deve ser decrementado quando um comentário for removido (soft delete).

##### ⚠️ Consistência

* A atualização dos contadores deve ocorrer **na mesma transação** da operação principal (like/comentário), garantindo consistência.
* Em caso de inconsistência eventual, os valores podem ser recalculados a partir das tabelas relacionais (`post_likes` e `comments`).

---

### 🖼️ Images

```sql
CREATE TABLE images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id       UUID         NOT NULL,
  url           VARCHAR(255) NOT NULL,
  order_in_post INT          NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  -- RN: Garante que não existam duas imagens na mesma posição no mesmo post
  CONSTRAINT uq_post_image_order UNIQUE (post_id, order_in_post),

  CONSTRAINT fk_images_post 
  FOREIGN KEY (post_id) 
  REFERENCES posts(id) 
  ON DELETE CASCADE
);
```

#### 📊 Índices

##### Imagens por post (ordenadas)

```sql
CREATE INDEX idx_images_post_id_order
ON images(post_id, order_in_post);
```

#### 📌 Regras

* Um post pode possuir múltiplas imagens associadas.
* As imagens devem ser recuperadas ordenadas pelo campo `order_in_post`.
* A exclusão de um post (soft delete) implica na **indisponibilidade lógica** das imagens associadas.

---

### 💬 Comments

```sql
CREATE TABLE comments (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id),
  post_id uuid NOT NULL REFERENCES posts(id),
  parent_id uuid REFERENCES comments(id),
  content text NOT NULL,
  count_likes int NOT NULL DEFAULT 0,
  count_responses int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,

  CHECK (parent_id IS NULL OR parent_id <> id),
  CHECK (length(trim(content)) > 0)
);
```

#### View

```sql
CREATE VIEW visible_comments AS
SELECT c.*
FROM comments c
JOIN users u ON u.id = c.user_id
JOIN posts p ON p.id = c.post_id
JOIN users pu ON pu.id = p.user_id
WHERE 
  c.deleted_at IS NULL
  AND p.deleted_at IS NULL
  AND u.status = 'ACTIVE'
  AND pu.status = 'ACTIVE';
```

#### Trigger

##### Integridade de comentários

```sql
CREATE OR REPLACE FUNCTION check_comment_integrity()
RETURNS TRIGGER AS $$
DECLARE
  parent_record comments%ROWTYPE;
BEGIN
  -- valida post
  IF NOT EXISTS (
    SELECT 1 FROM posts
    WHERE id = NEW.post_id
    AND deleted_at IS NULL
  ) THEN
    RAISE EXCEPTION 'Post inválido';
  END IF;

  -- valida usuário
  IF NOT EXISTS (
    SELECT 1 FROM users
    WHERE id = NEW.user_id
    AND status = 'ACTIVE'
  ) THEN
    RAISE EXCEPTION 'Usuário inválido';
  END IF;

  -- resposta
  IF NEW.parent_id IS NOT NULL THEN
    SELECT * INTO parent_record 
    FROM comments
    WHERE id = NEW.parent_id;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Comentário pai não encontrado';
    END IF;

    SELECT 1
    FROM users
    WHERE 
      id = parent_record.user_id
      AND status = 'ACTIVE';

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Usuário responsavel pelo comentário pai está com a conta desativada';
    END IF;

    IF TG_OP = 'UPDATE' AND OLD.parent_id IS DISTINCT FROM NEW.parent_id THEN
      RAISE EXCEPTION 'Não é permitido alterar parent_id';
    END IF;

    IF parent_record.post_id <> NEW.post_id THEN
      RAISE EXCEPTION 'Comentário deve pertencer ao mesmo post';
    END IF;

    IF parent_record.deleted_at IS NOT NULL THEN
      RAISE EXCEPTION 'Comentário pai removido';
    END IF;

    IF parent_record.parent_id IS NOT NULL THEN
      RAISE EXCEPTION 'Máximo 2 níveis';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_comment_integrity
BEFORE INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION check_comment_integrity();
```

#### 📊 Índices

##### Carregar todos os comentários de um post de uma vez só, já organizados
```sql
CREATE INDEX idx_comments_post_full
ON comments(post_id, parent_id, created_at ASC)
WHERE deleted_at IS NULL;
```

##### Comentários por usuário

```sql
CREATE INDEX idx_comments_user_id
ON comments(user_id)
WHERE deleted_at IS NULL;
```

##### Comentários principais do post (nível raiz)

```sql
CREATE INDEX idx_comments_post_id 
ON comments(post_id, created_at ASC) 
WHERE deleted_at IS NULL AND parent_id IS NULL;
```

##### Respostas de um comentário

```sql
CREATE INDEX idx_comments_parent_id 
ON comments(parent_id, created_at ASC)
WHERE parent_id IS NOT NULL AND deleted_at IS NULL;
```

#### 📌 Regras
* Um comentário não pode ser criado em um post removido (`deleted_at IS NOT NULL`);
* Um comentário pode opcionalmente referenciar outro comentário (`parent_id`);
* Um comentário filho:
  * Deve pertencer ao mesmo `post_id` do comentário pai;
  * Deve possuir um `parent_id` válido;
* Um comentário pode possuir no máximo 2 níveis:
  * Comentário raiz (parent_id = NULL)
  * Resposta (parent_id != NULL)
* Um comentário só deve ser visível quando:
  * `deleted_at IS NULL`;
  * O usuário proprietário estiver com status `ACTIVE`;
  * O post associado não estiver removido (`deleted_at IS NULL`);
* Ao pausar ou revogar a conta:
  * Os comentários do usuário devem ser **ocultados com base no status**, sem alterar `deleted_at`;
* Ao remover um comentário (soft delete):
  * Seus comentários filhos devem ter a visibilidade **ocultada logicamente**;

#### 📊 Contadores

* Os campos `count_likes` e `count_responses` são utilizados como **contadores materializados**, visando melhorar a performance de leitura.

##### 🔹 count_likes
* Representa a quantidade total de curtidas associadas ao comentário.
* Deve ser incrementado ao criar um registro em `comment_likes`.
* Deve ser decrementado ao remover uma curtida.

##### 🔹 count_responses
* Representa a quantidade de respostas diretas associadas ao comentário (nível 1).
* Deve ser incrementado ao criar um comentário com `parent_id` apontando para este comentário.
* Deve ser decrementado ao remover uma resposta.

##### ⚠️ Consistência

* Os contadores devem ser atualizados **na mesma transação** da criação/remoção da resposta ou curtida.
* Em caso de inconsistência, os valores podem ser recalculados a partir da tabela `comments` e a tabela relacional `comment_likes`.

##### Trigger

###### Controla o contador `count_responses`

```sql
CREATE OR REPLACE FUNCTION update_comment_count_responses()
RETURNS TRIGGER AS $$
BEGIN
  -- INSERT (nova resposta)
  IF TG_OP = 'INSERT' THEN
    IF NEW.parent_id IS NOT NULL THEN
      UPDATE comments
      SET count_responses = count_responses + 1
      WHERE id = NEW.parent_id;
    END IF;
  END IF;

  -- DELETE (remoção física - pouco provável mas seguro)
  IF TG_OP = 'DELETE' THEN
    IF OLD.parent_id IS NOT NULL THEN
      UPDATE comments
      SET count_responses = count_responses - 1
      WHERE id = OLD.parent_id
        AND count_responses > 0
        AND OLD.deleted_at IS NOT NULL;
    END IF;
  END IF;

  -- SOFT DELETE
  IF TG_OP = 'UPDATE' THEN
    IF OLD.deleted_at IS NULL AND NEW.deleted_at IS NOT NULL THEN
      IF NEW.parent_id IS NOT NULL THEN
        UPDATE comments
        SET count_responses = count_responses - 1
        WHERE id = NEW.parent_id
          AND count_responses > 0;
      END IF;
    END IF;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_comment_count_responses
AFTER INSERT OR UPDATE OR DELETE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_comment_count_responses();
```

###### Controla o contador `posts.count_comments` 

```sql
CREATE OR REPLACE FUNCTION update_post_count_comments()
RETURNS TRIGGER AS $$
BEGIN
  -- INSERT
  IF TG_OP = 'INSERT' THEN
    UPDATE posts
    SET count_comments = count_comments + 1
    WHERE id = NEW.post_id;
  END IF;

  -- DELETE
  IF TG_OP = 'DELETE' THEN
    UPDATE posts
    SET count_comments = count_comments - 1
    WHERE id = OLD.post_id
      AND count_comments > 0
      AND OLD.deleted_at IS NOT NULL;
  END IF;

  -- SOFT DELETE
  IF TG_OP = 'UPDATE' THEN
    IF OLD.deleted_at IS NULL AND NEW.deleted_at IS NOT NULL THEN
      UPDATE posts
      SET count_comments = count_comments - 1
      WHERE id = NEW.post_id
        AND count_comments > 0;
    END IF;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_post_count_comments
AFTER INSERT OR UPDATE OR DELETE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_post_count_comments();
```

---

### 💬 Comment Likes

```sql
CREATE TABLE comment_likes (
  comment_id uuid REFERENCES comments(id),
  user_id uuid REFERENCES users(id),
  liked_at timestamptz DEFAULT now(),
  PRIMARY KEY (comment_id, user_id)
);
```

#### Trigger

```sql
CREATE OR REPLACE FUNCTION check_comment_like_integrity()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM comments c
    JOIN users u ON u.id = c.user_id
    WHERE c.id = NEW.comment_id
    AND c.deleted_at IS NULL
    AND u.status = 'ACTIVE'
  ) THEN
    RAISE EXCEPTION 'Comment inválido para curtida';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM users
    WHERE id = NEW.user_id
    AND status = 'ACTIVE'
  ) THEN
    RAISE EXCEPTION 'Usuário inválido para curtida';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_comment_like_integrity
BEFORE INSERT ON comment_likes
FOR EACH ROW
EXECUTE FUNCTION check_comment_like_integrity();
```

#### 📊 Índices

##### Likes por comentário

```sql
CREATE INDEX idx_comment_likes_comment_id
ON comment_likes(comment_id);
```

##### Likes por usuário

```sql
CREATE INDEX idx_comment_likes_user_id
ON comment_likes(user_id);
```

#### 📌 Regras

* A **primary key composta** (`comment_id`, `user_id`) garante que:
  * Um usuário só pode curtir um comentário **uma única vez**;

#### 🔄 Atualização de Contador

* A criação de um registro em `comment_likes` deve resultar no incremento do campo `comments.count_likes`.
* A remoção de uma curtida deve resultar no decremento do campo `comments.count_likes`.

##### ⚠️ Consistência

* A operação deve ser realizada **de forma transacional**, garantindo que o contador reflita corretamente o estado da tabela.

##### 🔐 Concorrência

A atualização dos contadores deve ser feita utilizando operações atômicas no banco.

##### 🔁 Reprocessamento

* Em caso de inconsistência, o valor pode ser recalculado com base em:

```sql
SELECT COUNT(*) FROM comment_likes WHERE comment_id = ?
```

##### 🔁 Rebuild de Contadores

O sistema deve permitir a reconstrução completa dos contadores em cenários de inconsistência ou manutenção:

Exemplo:

```sql
UPDATE comments c
SET count_likes = (
  SELECT COUNT(*) 
  FROM comment_likes cl 
  WHERE cl.comment_id = c.id
);
```

##### Trigger

```sql
CREATE OR REPLACE FUNCTION update_comment_count_likes()
RETURNS TRIGGER AS $$
BEGIN
  -- INSERT
  IF TG_OP = 'INSERT' THEN
    UPDATE comments
    SET count_likes = count_likes + 1
    WHERE id = NEW.comment_id;
  END IF;

  -- DELETE
  IF TG_OP = 'DELETE' THEN
    UPDATE comments
    SET count_likes = count_likes - 1
    WHERE id = OLD.comment_id
      AND count_likes > 0;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_comment_count_likes
AFTER INSERT OR DELETE ON comment_likes
FOR EACH ROW
EXECUTE FUNCTION update_comment_count_likes();
```

---

### 📝 Post Likes

```sql
CREATE TABLE post_likes (
  post_id uuid REFERENCES posts(id),
  user_id uuid REFERENCES users(id),
  liked_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);
```

#### Trigger

```sql
CREATE OR REPLACE FUNCTION check_post_like_integrity()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM posts p
    JOIN users u ON u.id = p.user_id
    WHERE p.id = NEW.post_id
    AND p.deleted_at IS NULL
    AND u.status = 'ACTIVE'
  ) THEN
    RAISE EXCEPTION 'Post inválido para curtida';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM users
    WHERE id = NEW.user_id
    AND status = 'ACTIVE'
  ) THEN
    RAISE EXCEPTION 'Usuário inválido para curtida';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_post_like_integrity
BEFORE INSERT ON post_likes
FOR EACH ROW
EXECUTE FUNCTION check_post_like_integrity();
```

#### 📊 Índices

##### Likes por post

```sql
CREATE INDEX idx_post_likes_post_id
ON post_likes(post_id);
```

##### Likes por usuário

```sql
CREATE INDEX idx_post_likes_user_id
ON post_likes(user_id);
```

#### 📌 Regras

* A **primary key composta** (`post_id`, `user_id`) garante:
  * Um usuário não pode curtir o mesmo post mais de uma vez;

#### 🔄 Atualização de Contador

* A criação de um registro em `post_likes` deve resultar no incremento do campo `posts.count_likes`.
* A remoção de uma curtida deve resultar no decremento do campo `posts.count_likes`.

##### ⚠️ Consistência

* A operação deve ser realizada **de forma transacional**, garantindo que o contador reflita corretamente o estado da tabela.

##### 🔐 Concorrência

A atualização dos contadores deve ser feita utilizando operações atômicas no banco.

##### 🔁 Reprocessamento

* Em caso de inconsistência, o valor de `count_likes` pode ser recalculado com base em:

```sql
SELECT COUNT(*) FROM post_likes WHERE post_id = ?
```

##### 🔁 Rebuild de Contadores

O sistema deve permitir a reconstrução completa dos contadores em cenários de inconsistência ou manutenção:

Exemplo:

```sql
UPDATE posts p
SET count_likes = (
  SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id
);
```

##### Trigger

```sql
CREATE OR REPLACE FUNCTION update_post_count_likes()
RETURNS TRIGGER AS $$
BEGIN
  -- INSERT
  IF TG_OP = 'INSERT' THEN
    UPDATE posts
    SET count_likes = count_likes + 1
    WHERE id = NEW.post_id;
  END IF;

  -- DELETE
  IF TG_OP = 'DELETE' THEN
    UPDATE posts
    SET count_likes = count_likes - 1
    WHERE id = OLD.post_id
      AND count_likes > 0;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_post_count_likes
AFTER INSERT OR DELETE ON post_likes
FOR EACH ROW
EXECUTE FUNCTION update_post_count_likes();
```

---

### 🔒 Regras de Integridade (Banco de Dados)

* Não é permitido:
  * Curtir posts ou comentários inexistentes;
  * Curtir conteúdos removidos (`deleted_at IS NOT NULL`);
  * Curtir conteúdos de usuários com status diferente de `ACTIVE`.

* Todos os contadores devem considerar apenas entidades ativas:
  - deleted_at IS NULL
  - usuários com status ACTIVE
  
### 🧠 Estratégia de Soft Delete

* Likes **não são removidos** quando um post ou comentário é deletado.
* A consistência é garantida via **filtros nas queries** (`JOIN` com conteúdo ativo).

### Trigger para proteger update nas tabelas de likes

```sql
CREATE OR REPLACE FUNCTION prevent_like_update()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Update não permitido';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_comment_like_update
BEFORE UPDATE ON comment_likes
FOR EACH ROW
EXECUTE FUNCTION prevent_like_update();

CREATE TRIGGER trg_prevent_post_like_update
BEFORE UPDATE ON post_likes
FOR EACH ROW
EXECUTE FUNCTION prevent_like_update();
```

### Trigger para proteger hard delete

```sql
CREATE OR REPLACE FUNCTION prevent_delete()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Hard delete não permitido';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_user_delete
BEFORE DELETE ON users
FOR EACH ROW
EXECUTE FUNCTION prevent_delete();

CREATE TRIGGER trg_prevent_post_delete
BEFORE DELETE ON posts
FOR EACH ROW
EXECUTE FUNCTION prevent_delete();

CREATE TRIGGER trg_prevent_comment_delete
BEFORE DELETE ON comments
FOR EACH ROW
EXECUTE FUNCTION prevent_delete();
```