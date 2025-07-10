-- CREATE TABLE IF NOT EXISTS products (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   type VARCHAR(255),
--   color VARCHAR(255),
--   cost VARCHAR(50),
--   image_url VARCHAR(255),
--   description TEXT,
--   material VARCHAR(255),
--   is_new_arrival BOOLEAN DEFAULT FALSE,
--   sizes JSON,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  -- Changed price to DECIMAL for accurate currency storage
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  image VARCHAR(255) NOT NULL,
  -- Optional: Add a timestamp for creation and last update
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: Insert some initial data for testing purposes
INSERT INTO products (name, description, price, image) VALUES
('Classic White T-Shirt', 'A comfortable and stylish everyday t-shirt made from 100% organic cotton.', 19.99, 'classic-white-tshirt.jpg'),
('High-Waist Denim Jeans', 'Versatile high-waisted jeans with a flattering fit, perfect for any occasion.', 49.50, 'high-waist-denim-jeans.jpg'),
('Leather Crossbody Bag', 'Elegant and compact crossbody bag crafted from genuine leather, ideal for essentials.', 75.00, 'leather-crossbody-bag.jpg'),
('Wireless Bluetooth Headphones', 'Immersive sound experience with noise-cancelling technology and long-lasting battery life.', 120.99, 'wireless-bluetooth-headphones.jpg'),
('Ergonomic Office Chair', 'Designed for maximum comfort and support during long working hours.', 199.95, 'ergonomic-office-chair.jpg'),
-- Add the Traditional Cloth Female Kemiss here
('Traditional Female Kemiss', 'A beautiful hand-woven Ethiopian traditional dress (Kemiss), perfect for special occasions. Features intricate patterns and vibrant colors.', 250.00, 'ethiopian-kemiss.jpg');
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_type VARCHAR(100),
  message TEXT,
  contact_method VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);
Initial Database Setup for Payment Methods and Orders

-- -----------------------------------------------------
-- Table `payment_methods`
-- Stores available payment methods that can be displayed and selected.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `payment_methods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `method_key` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Unique identifier (e.g., mobile_money, card_payment, cash_on_delivery)',
  `name` VARCHAR(100) NOT NULL COMMENT 'Display name (e.g., Mobile Money, Card Payment)',
  `description` TEXT NULL COMMENT 'Short description of the method',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Whether the method is currently enabled',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- Insert initial payment methods
INSERT INTO `payment_methods` (`method_key`, `name`, `description`, `is_active`) VALUES
('mobile_money', 'Mobile Money', 'CBE Birr, M-Birr, HelloCash (Ethiopia)', TRUE),
('bank_transfer', 'Bank Transfer', 'Direct bank transfer to our accounts (CBE, Dashen, Awash)', TRUE),
('card_payment', 'Card Payment', 'Secure payments via Visa, Mastercard (Online Gateway)', TRUE),
('cash_on_delivery', 'Cash on Delivery', 'Pay with cash upon delivery of your order', TRUE);


-- -----------------------------------------------------
-- Table `orders`
-- Stores main order details, linked to a user (if applicable) and a payment method.
-- Note: Assuming a `users` table exists. If not, you might need to create it or adjust.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL COMMENT 'Foreign key to users table, NULL for guest orders',
  `order_number` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Unique system-generated order number',
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'ETB',
  `payment_method_id` INT NULL COMMENT 'Foreign key to payment_methods table',
  `payment_status` ENUM('pending', 'paid', 'failed', 'refunded', 'awaiting_transfer', 'confirmed_cod', 'cancelled') NOT NULL DEFAULT 'pending',
  `order_status` ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned') NOT NULL DEFAULT 'pending',
  `shipping_address` TEXT NOT NULL,
  `billing_address` TEXT NULL,
  `notes` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_orders_payment_methods`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `payment_methods` (`id`)
    ON DELETE SET NULL -- If a payment method is deleted, set order's payment_method_id to NULL
    ON UPDATE CASCADE
  -- CONSTRAINT `fk_orders_users`
  --   FOREIGN KEY (`user_id`)
  --   REFERENCES `users` (`id`)
  --   ON DELETE SET NULL
  --   ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table `order_items`
-- Stores individual items within each order.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL COMMENT 'Foreign key to products table (assuming it exists)',
  `product_name` VARCHAR(255) NOT NULL, -- Store snapshot of product name in case product name changes
  `quantity` INT NOT NULL,
  `price_at_order` DECIMAL(10, 2) NOT NULL COMMENT 'Price of the product at the time of order',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_order_items_orders`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`id`)
    ON DELETE CASCADE -- If an order is deleted, its items are also deleted
    ON UPDATE CASCADE
  -- CONSTRAINT `fk_order_items_products`
  --   FOREIGN KEY (`product_id`)
  --   REFERENCES `products` (`id`)
  --   ON DELETE RESTRICT -- Prevent deleting a product if it's part of an existing order
  --   ON UPDATE CASCADE
);


-- -----------------------------------------------------
-- Table `transactions`
-- Logs individual payment transactions, useful for payment gateway integration details.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL COMMENT 'Foreign key to the orders table',
  `payment_method_id` INT NOT NULL COMMENT 'Foreign key to payment_methods table',
  `transaction_id_gateway` VARCHAR(255) NULL UNIQUE COMMENT 'Transaction ID from the payment gateway',
  `amount` DECIMAL(10, 2) NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'ETB',
  `status` ENUM('initiated', 'pending', 'completed', 'failed', 'cancelled', 'refunded') NOT NULL DEFAULT 'initiated',
  `details` JSON NULL COMMENT 'Store raw JSON response/details from payment gateway',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_transactions_orders`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_transactions_payment_methods`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `payment_methods` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- Add indexes for performance
CREATE INDEX `idx_orders_user_id` ON `orders` (`user_id`);
CREATE INDEX `idx_orders_payment_status` ON `orders` (`payment_status`);
CREATE INDEX `idx_orders_order_status` ON `orders` (`order_status`);
CREATE INDEX `idx_order_items_order_id` ON `order_items` (`order_id`);
CREATE INDEX `idx_order_items_product_id` ON `order_items` (`product_id`);
CREATE INDEX `idx_transactions_order_id` ON `transactions` (`order_id`);
CREATE INDEX `idx_transactions_gateway_id` ON `transactions` (`transaction_id_gateway`);
