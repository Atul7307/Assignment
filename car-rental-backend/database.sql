CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255),
  role ENUM('customer','agency')
);

CREATE TABLE cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  agency_id INT,
  model VARCHAR(100),
  vehicle_number VARCHAR(50),
  seating_capacity INT,
  rent_per_day INT
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  car_id INT,
  customer_id INT,
  start_date DATE,
  days INT
);
