CREATE TABLE IF NOT EXISTS cursos (
    cursoid bigserial CONSTRAINT pk_cursos PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE,
    descricao VARCHAR(60),
    ativo BOOLEAN,
    deleted BOOLEAN DEFAULT false
);

INSERT INTO cursos VALUES
    (default, 'BSI', 'Bacharelado em Sistemas de Informação', true),
    (default, 'DIREITO', 'Bacharelado em Direito', true),
    (default, 'LETRAS', 'Licenciatura em Letras', true),
    (default, 'ADM', 'Bacharelado em Administração', false)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS alunos (
    alunoid bigserial CONSTRAINT pk_alunos PRIMARY KEY,
    prontuario VARCHAR(10) UNIQUE,
    nome VARCHAR(50),
    endereco VARCHAR(60),
    rendafamiliar NUMERIC(8,2),
    datanascimento DATE,
    cursoid BIGINT CONSTRAINT fk_aluno_curso REFERENCES cursos,
    deleted BOOLEAN DEFAULT false
);

INSERT INTO alunos VALUES
    (default, 'pront1', 'José das Neves', 'Rua A, Votuporanga', 6891.60, '2000-01-31', (SELECT cursoid from CURSOS where codigo = 'BSI')),
    (default, 'pront2', 'Maria Silveira', 'Rua B, São José do Rio Preto', 7372.41, '2002-03-12', (SELECT cursoid from CURSOS where codigo = 'DIREITO'))
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS usuarios (
    usuarioid bigserial CONSTRAINT pk_usuarios PRIMARY KEY,
    username VARCHAR(10) UNIQUE,
    password TEXT,
    deleted BOOLEAN DEFAULT false
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuarios VALUES
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;

-- Usado para exercícios

CREATE TABLE IF NOT EXISTS clientes (
    clienteid bigserial CONSTRAINT pk_clientes PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE,
    nome VARCHAR(60),
    endereco VARCHAR(50),
    ativo BOOLEAN,
    deleted BOOLEAN DEFAULT false
);

INSERT INTO clientes VALUES
    (default, 'CLI01', 'João da Silva', 'Rua A1', true),
    (default, 'CLI02', 'Marcia Almeida', 'Rua B2', true)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS pedidos (
    pedidoid bigserial CONSTRAINT pk_pedidos PRIMARY KEY,
    numero BIGINT UNIQUE,
    data DATE,
    valortotal NUMERIC(9,2),
    clienteid BIGINT CONSTRAINT fk_pedido_cliente REFERENCES clientes,
    deleted BOOLEAN DEFAULT false
);

INSERT INTO pedidos VALUES
    (default, 234, '2020-01-31', 6891.60, (SELECT clienteid FROM CLIENTES WHERE codigo = 'CLI01'))
ON CONFLICT DO NOTHING;

