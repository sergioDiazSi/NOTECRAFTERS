DROP DATABASE IF EXISTS diario;
CREATE DATABASE diario;
USE diario;

CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo CHAR(30),
    descripcion CHAR(250)
) AUTO_INCREMENT = 1;

INSERT INTO notas (titulo, descripcion) VALUES ('Nota Prueba', 'Esta es mi primera nota en este diario, espero tener más...');
