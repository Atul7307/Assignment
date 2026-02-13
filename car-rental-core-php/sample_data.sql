-- Sample data for testing
-- Run this after importing database.sql

-- Insert sample users
INSERT INTO users (name, email, password, role) VALUES
('John Customer', 'customer@example.com', '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'customer'),
('Jane Customer', 'customer2@example.com', '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'customer'),
('ABC Car Rentals', 'agency@example.com', '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'agency'),
('XYZ Motors', 'agency2@example.com', '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'agency');

-- Default password for all sample users: 123456

-- Insert sample cars (assuming agency users have IDs 3 and 4)
INSERT INTO cars (agency_id, model, vehicle_number, seating_capacity, rent_per_day) VALUES
(3, 'Toyota Camry', 'ABC-123', 5, 50),
(3, 'Honda Accord', 'ABC-456', 5, 55),
(3, 'Ford Explorer', 'ABC-789', 7, 80),
(4, 'Tesla Model 3', 'XYZ-111', 5, 120),
(4, 'BMW 5 Series', 'XYZ-222', 5, 100),
(4, 'Mercedes GLE', 'XYZ-333', 7, 150);

-- Insert sample bookings (assuming customer user ID 1 and cars with IDs 1-6)
INSERT INTO bookings (car_id, customer_id, start_date, days) VALUES
(1, 1, '2026-02-15', 3),
(2, 1, '2026-02-20', 5),
(4, 2, '2026-02-18', 2),
(5, 2, '2026-02-25', 4);

-- Verify data
SELECT 'Users:' as 'Table';
SELECT id, name, email, role FROM users;

SELECT 'Cars:' as 'Table';
SELECT id, agency_id, model, vehicle_number, seating_capacity, rent_per_day FROM cars;

SELECT 'Bookings:' as 'Table';
SELECT id, car_id, customer_id, start_date, days FROM bookings;
