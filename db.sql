CREATE TABLE alunos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	cuso VARCHAR(100) NOT NULL 
);

SHOW TABLES;

SELECT * FROM alunos;

INSERT INTO alunos (nome, cuso)
VALUES ('Yuri', 'Desenvolvimento de Sistemas'),
		 ('Victória', 'Backend'),
		 ('Fernanda', 'Frontend'),
		 ('Julia', 'Administração');
	
SELECT * FROM alunos;


SELECT * FROM alunos WHERE id = 1