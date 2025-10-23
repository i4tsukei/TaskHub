-- 
-- BANCO DE DADOS: AgendaDB
-- 
CREATE DATABASE AgendaDB;
GO

USE AgendaDB;
GO

-- 
-- TABELA: Usuarios
-- 
CREATE TABLE Usuarios (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    Senha NVARCHAR(255) NOT NULL,
    DataCadastro DATETIME DEFAULT GETDATE()
);
GO

-- 
-- PROCEDURE: Inserir novo usuário
-- 
CREATE PROCEDURE sp_InserirUsuario
    @Nome NVARCHAR(100),
    @Email NVARCHAR(150),
    @Senha NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF EXISTS (SELECT 1 FROM Usuarios WHERE Email = @Email)
    BEGIN
        RAISERROR('Email já cadastrado!', 16, 1);
        RETURN;
    END

    INSERT INTO Usuarios (Nome, Email, Senha)
    VALUES (@Nome, @Email, @Senha);
END;
GO

-- 
-- PROCEDURE: Listar todos os usuários
-- 
CREATE PROCEDURE sp_ListarUsuarios
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Id, Nome, Email, Senha, DataCadastro
    FROM Usuarios
    ORDER BY Nome;
END;
GO

-- 
-- PROCEDURE: Atualizar usuário
-- 
CREATE PROCEDURE sp_AtualizarUsuario
    @Id INT,
    @Nome NVARCHAR(100),
    @Email NVARCHAR(150),
    @Senha NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE Id = @Id)
    BEGIN
        RAISERROR('Usuário não encontrado!', 16, 1);
        RETURN;
    END

    UPDATE Usuarios
    SET Nome = @Nome,
        Email = @Email,
        Senha = @Senha
    WHERE Id = @Id;
END;
GO

-- 
-- PROCEDURE: Deletar usuário
-- 
CREATE PROCEDURE sp_DeletarUsuario
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE Id = @Id)
    BEGIN
        RAISERROR('Usuário não encontrado!', 16, 1);
        RETURN;
    END

    DELETE FROM Usuarios WHERE Id = @Id;
END;
GO

-- 
-- DADOS INICIAIS
-- 
EXEC sp_InserirUsuario 'Admin', 'admin@taskhub.com', '123456';
EXEC sp_InserirUsuario 'João Silva', 'joao@email.com', '123456';
EXEC sp_InserirUsuario 'Maria Santos', 'maria@email.com', '123456';
GO
select * from Usuarios