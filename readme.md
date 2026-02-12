# Car Rental System

This project is a **Car Rental Management System** where customers can rent cars from registered rental agencies. The system supports role-based access for customers and agencies.

---

## Tech Stack

**Frontend:** Next.js  
**Backend:** CodeIgniter 4 (REST APIs)  
**Database:** MySQL  

---

## Features

### Authentication
- User registration (Customer / Agency)
- Secure login using session-based authentication

### Agency Features
- Add new cars
- Edit existing cars
- View bookings for their cars

### Customer Features
- View available cars
- Book cars for selected dates

### Public Access
- Anyone can view available cars without login

---

## Database Structure

### users
- id
- name
- email
- password
- role

### cars
- id
- agency_id
- model
- vehicle_number
- seating_capacity
- rent_per_day

### bookings
- id
- car_id
- customer_id
- start_date
- days

