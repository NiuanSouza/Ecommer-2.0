-- seeds.sql

-- 1. Limpeza de dados (Opcional, use se quiser resetar o banco antes de popular)
DELETE FROM Compra;
DELETE FROM Produto;
DELETE FROM Usuario;

-- 2. Inserindo Usuários
INSERT INTO Usuario (id, nome, email) VALUES 
(1, 'Ana Vendedora', 'ana@email.com'),      -- Vendedora de Tech
(2, 'Bruno Vendedor', 'bruno@email.com'),   -- Vendedor de Escritório
(3, 'Carla Administradora', 'carla@email.com'),
(4, 'Diego Comprador', 'diego@email.com'),
(5, 'Elena Compradora', 'elena@email.com');

-- 3. Inserindo Produtos (id_usuario_vendedor aponta para Ana e Bruno)
INSERT INTO Produto (nome, preco, estoque, id_usuario_vendedor) VALUES 
('Notebook Gamer i7', 4500.00, 8, 1),
('Mouse Logitech MX', 289.90, 45, 1),
('Monitor 4K 27"', 1899.00, 12, 1),
('Teclado Mecânico RGB', 450.00, 0, 1),     -- Produto esgotado (não aparecerá no cliente)
('Cadeira Ergonômica Pro', 1250.00, 5, 2),
('Mesa Stand Desk', 2100.00, 3, 2),
('Webcam Full HD', 320.00, 15, 2);

-- 4. Inserindo Compras de Teste (Histórico)
INSERT INTO Compra (id_usuario_comprador, id_produto, quantidade, data_compra) VALUES 
(4, 1, 1, '2025-12-10T10:00:00Z'), -- Diego comprou Notebook
(4, 2, 2, '2025-12-11T15:30:00Z'), -- Diego comprou 2 Mouses
(5, 3, 1, '2025-12-15T09:20:00Z'), -- Elena comprou Monitor
(5, 5, 1, '2025-12-16T14:45:00Z'), -- Elena comprou Cadeira
(1, 6, 1, '2025-12-17T11:00:00Z'); -- Ana (vendedora) também comprou de Bruno