CREATE TABLE IF NOT EXISTS products (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
price DECIMAL(10, 2) NOT NULL
);

INSERT INTO products (name, price) VALUES
('Mechanical Keyboard', 99.99),
('Wireless Mouse', 49.50),
('4K UltraWide Monitor', 349.99),
('Noise Cancelling Headphones', 199.00),
('Webcam 1080p', 79.99)
ON CONFLICT (id) DO NOTHING;

