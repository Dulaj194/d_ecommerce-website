-- Create database
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- Sample data for users (password: password123)
INSERT INTO users (name, email, password, role, created_at) VALUES
('Admin User', 'admin@example.com', '$2a$10$YfCJdQvE5gB9qU4yMRz5IeCqMXnHhP5HqQf5qL5KxY5pO.5KZvKZO', 'ADMIN', NOW()),
('John Doe', 'john@example.com', '$2a$10$YfCJdQvE5gB9qU4yMRz5IeCqMXnHhP5HqQf5qL5KxY5pO.5KZvKZO', 'CUSTOMER', NOW()),
('Jane Smith', 'jane@example.com', '$2a$10$YfCJdQvE5gB9qU4yMRz5IeCqMXnHhP5HqQf5qL5KxY5pO.5KZvKZO', 'CUSTOMER', NOW())
ON DUPLICATE KEY UPDATE name=name;

-- Sample data for categories
INSERT INTO categories (name) VALUES
('Electronics'),
('Clothing'),
('Books'),
('Home & Garden'),
('Sports')
ON DUPLICATE KEY UPDATE name=name;

-- Sample data for products
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
-- Electronics
('Laptop Pro 15', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 25, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 1),
('Wireless Mouse', 'Ergonomic wireless mouse with USB receiver', 29.99, 100, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', 1),
('USB-C Hub', '7-in-1 USB-C hub with HDMI and card reader', 49.99, 50, 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400', 1),
('Bluetooth Headphones', 'Noise-canceling over-ear headphones', 199.99, 40, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 1),
('Smartphone 128GB', 'Latest model with dual camera', 799.99, 30, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 1),

-- Clothing
('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt', 19.99, 200, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 2),
('Jeans Classic Fit', 'Durable denim jeans with classic fit', 59.99, 150, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 2),
('Running Shoes', 'Lightweight running shoes with cushioned sole', 89.99, 80, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 2),
('Winter Jacket', 'Warm winter jacket with hood', 129.99, 60, 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400', 2),

-- Books
('JavaScript Mastery', 'Complete guide to modern JavaScript', 39.99, 75, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 3),
('Python for Beginners', 'Learn Python programming from scratch', 34.99, 90, 'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400', 3),
('Web Development 2024', 'Modern web development practices', 44.99, 65, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', 3),

-- Home & Garden
('Coffee Maker', 'Programmable 12-cup coffee maker', 79.99, 45, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', 4),
('Indoor Plant Set', 'Set of 3 easy-care indoor plants', 49.99, 55, 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400', 4),
('LED Desk Lamp', 'Adjustable LED desk lamp with USB port', 34.99, 70, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400', 4),

-- Sports
('Yoga Mat', 'Non-slip yoga mat with carrying strap', 24.99, 120, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', 5),
('Dumbbell Set', '20kg adjustable dumbbell set', 89.99, 35, 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400', 5),
('Tennis Racket', 'Professional tennis racket', 149.99, 28, 'https://images.unsplash.com/photo-1617083278895-9ff84a0b3e48?w=400', 5)
ON DUPLICATE KEY UPDATE name=name;

-- Sample data for hero banners
INSERT INTO hero_banners (image_url, title, subtitle, display_order, is_active, created_at, updated_at) VALUES
('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600', 'Summer Collection 2024', 'Discover the latest trends with up to 50% off on selected items', 1, true, NOW(), NOW()),
('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600', 'Tech Innovation', 'Explore cutting-edge electronics and smart devices', 2, true, NOW(), NOW()),
('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600', 'Fitness Revolution', 'Get fit with premium sports equipment and apparel', 3, true, NOW(), NOW())
ON DUPLICATE KEY UPDATE image_url=image_url;
