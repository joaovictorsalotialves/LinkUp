# LinkUp 1.v

## RFs (Requisitos Funcionais)
- [ ] Segurança:
  - [ ] Deve ser possível se cadastrar com dados para identificação e acesso do usuário;
  - [ ] Deve ser possível se autenticar;
  - [ ] Deve ser possível recuperar a senha;
  - [ ] Deve ser possível obter o perfil do usuário logado;
  - [ ] Deve ser possível atualizar as informações do usuário logado;
  - [ ] Deve ser possível alterar a senha do usuário logado;
  - [ ] Deve ser possível encerrar sessão (logout);

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
  - [ ] Deve ser possível obter posts variados de diversos usuários para o Feed global;
  - [ ] Deve ser possível obter posts variados dos usuários seguidos para o Feed seguindo;

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
- [ ] O usuário não pode se cadastrar com um e-mail já existente;
- [ ] As contas cadastradas podem ser cadastradas pelo formulário de cadastro ou utilizando a OAuth 2.0 do google;
- [ ] O login pode ser realizado utilizando email e senha ou utilizando a OAuth 2.0 do google;
- [ ] Para recuperação de senha, o usuário deve receber um e-mail com um código de 6 dígitos, que poderá utilizar apenas uma vez e deve expirar em 5 minutos;
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
- [ ] Os posts do Feed global e Feed seguindo devem ser retornados ordenados por data de publicação;

## RNFs (Requisitos Não Funcionais)
- [ ] Autenticação deve utilizar JWT com refresh token
- [ ] Senhas devem ser criptografadas
- [ ] Os dados da aplicação devem estar persistidos em um banco PostgreSQL;
- [ ] Consultas mais frequentes devem ser otimizadas com índices no banco de dados;
- [ ] Logs da aplicação devem ser registrados para auditoria;
- [ ] Listagens devem ser paginadas com limite máximo de 50 registros por requisição;
- [ ] A aplicação deve utilizar o docker para subir os serviços;
- [ ] A aplicação deve seguir os princípios de Domain-Driven Design (DDD), separando camadas de domínio, aplicação e infraestrutura;
- [ ] O domínio deve ser independente de frameworks externos;
- [ ] A aplicação deve possuir testes unitários e testes de integração (e2e) para os principais fluxos;
- [ ] A API deve ter tempo de resposta inferior a 500ms;
