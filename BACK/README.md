# TaskHub - Sistema de Gerenciamento de Usuários

## Descrição
TaskHub é uma API REST desenvolvida em Spring Boot para gerenciamento de usuários, utilizando SQL Server como banco de dados.

## Estrutura do Banco de Dados
- **Banco**: AgendaDB
- **Tabela**: Usuarios
- **Campos**:
  - Id (INT IDENTITY PRIMARY KEY)
  - Nome (NVARCHAR(100) NOT NULL)
  - Email (NVARCHAR(150) NOT NULL UNIQUE)
  - Senha (NVARCHAR(255) NOT NULL)
  - DataCadastro (DATETIME DEFAULT GETDATE())

## Endpoints da API

### Base URL: `http://localhost:9090/api/v1/usuarios`

### 1. Listar todos os usuários
- **GET** `/api/v1/usuarios`
- **Resposta**: Lista de usuários

### 2. Buscar usuário por ID
- **GET** `/api/v1/usuarios/{id}`
- **Resposta**: Dados do usuário ou erro 404

### 3. Criar novo usuário
- **POST** `/api/v1/usuarios`
- **Body**:
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

### 4. Login
- **POST** `/api/v1/usuarios/login`
- **Body**:
```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

### 5. Atualizar usuário
- **PUT** `/api/v1/usuarios/{id}`
- **Body**:
```json
{
  "nome": "João Silva Santos",
  "email": "joao.santos@email.com",
  "senha": "novaSenha123"
}
```

### 6. Excluir usuário
- **DELETE** `/api/v1/usuarios/{id}`

## Configuração

### Banco de Dados
Configure a conexão no arquivo `application.properties`:
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=AgendaDB;encrypt=false;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=@ITB123456
```

### Executar o projeto
1. Execute o script `banco.sql` para criar o banco e as tabelas
2. Configure as credenciais do banco no `application.properties`
3. Execute: `mvn spring-boot:run`
4. A API estará disponível em: `http://localhost:9090`

## Stored Procedures Disponíveis
- `sp_InserirUsuario` - Inserir novo usuário
- `sp_ListarUsuarios` - Listar todos os usuários
- `sp_AtualizarUsuario` - Atualizar usuário existente
- `sp_DeletarUsuario` - Excluir usuário

## Tecnologias Utilizadas
- Java 17+
- Spring Boot
- Spring Data JPA
- SQL Server
- Maven