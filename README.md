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
- [ ] As contas cadastradas podem ser cadastradas pelo formulário de cadastro ou utilizando a OAuth 2.0 do Google;
- [ ] O login pode ser realizado utilizando email e senha ou utilizando a OAuth 2.0 do Google;
- [ ] Para recuperação de senha, o usuário receberá um código de 6 dígitos com validade de 10 minutos. Após 5 tentativas incorretas, o código será invalidado e o usuário deverá solicitar um novo.
- [ ] Um usuário não pode seguir a si mesmo;
- [ ] O usuário só pode editar ou excluir posts feitos por ele;
- [ ] O usuário só pode editar ou excluir comentários feitos por ele;
- [ ] Um usuário não pode curtir o mesmo post mais de uma vez;
- [ ] Um usuário não pode comentar ou curtir em um post inexistente;
- [ ] Um usuário não pode responder ou curtir um comentário inexistente;
- [ ] Um post deve estar associado a um usuário válido;
- [ ] Um comentário deve estar associado a um usuário válido;
- [ ] Um post não pode ser criado sem conteúdo;
- [ ] Um comentário não pode ser criado sem conteúdo;
- [ ] Um comentário pode opcionalmente referenciar outro comentário como pai;
- [ ] Um comentário pai deve pertencer ao mesmo post;
- [ ] Os posts do Feed global e Feed seguindo devem ser retornados ordenados por data de publicação;
- [ ] Uma sessão é considerada revogada quando o usuário realiza logout ou quando o sistema invalida manualmente a sessão;
- [ ] Uma sessão é considerada expirada quando ultrapassa sua data de expiração definida;
- [ ] Uma sessão é considerada inativa quando não há uso por um período superior a 7 dias;
- [ ] Usuários, posts e comentários devem ser excluídos utilizando a estratégia de soft delete, através do preenchimento de um campo de data de exclusão (deleted_at), sem remoção física dos dados;
- [ ] Um usuário com conta pausada pode reativar sua conta utilizando suas credenciais anteriores;
- [ ] Usuários com conta pausada não podem se autenticar enquanto a conta não for reativada por meio de um link de reativação enviado ao e-mail cadastrado;
- [ ] Ao pausar uma conta, todos os conteúdos gerados pelo usuário (posts e comentários (caso um comentário seja pai, seus comentários filhos também devem ser ocultados)) devem ter sua visibilidade suspensa imediatamente;
- [ ] Se o usuário pausar sua conta ou tiver a conta revogada, todas as suas sessões serão revogas imediatamente;

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
- [ ] Todos os tokens para recuperação de senha, validação do email e reativação da conta devem ser expirados em 15 minutos e serem de uso único;
- [ ] Proibido salvar binários no banco;
- [ ] Converter uploads de imagem para WebP, redimensionando conforme o tipo de conteúdo e limitando o arquivo original a 5MB;
- [ ] Servir as imagens via CDN para garantir baixa latência e redução de carga no servidor principal.

## Banco de dados

## 🧑‍💻 Users

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

## 🔗 User Providers (OAuth)

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

## 🔐 Sessions

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

* Sessões são consideradas ativas quando `revoked_at IS NULL`.
* Sessões devem ser removidas quando expiradas ou inativas.
* O campo `last_used_at` deve ser atualizado de forma preguiçosa para evitar sobrecarga no banco.

---

## 🎟️ User Tokens

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
