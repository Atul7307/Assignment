<?php
// Set CORS headers FIRST, before any other output
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/functions.php';

requireRole('customer');

try {
    $data = getJsonInput();
    validateRequired($data, ['car_id', 'start_date', 'days']);
    
    $carId = (int) $data['car_id'];
    $customerId = getUserId();
    $startDate = sanitize($data['start_date']);
    $days = (int) $data['days'];
    
    // Validate date format
    $dateObj = DateTime::createFromFormat('Y-m-d', $startDate);
    if (!$dateObj || $dateObj->format('Y-m-d') !== $startDate) {
        sendJson(['error' => 'Invalid date format. Use YYYY-MM-DD'], 400);
    }
    
    $pdo = getDBConnection();
    
    // Check if car exists
    $stmt = $pdo->prepare("SELECT id FROM cars WHERE id = ?");
    $stmt->execute([$carId]);
    if (!$stmt->fetch()) {
        sendJson(['error' => 'Car not found'], 404);
    }
    
    // Create booking
    $stmt = $pdo->prepare("INSERT INTO bookings (car_id, customer_id, start_date, days) VALUES (?, ?, ?, ?)");
    $stmt->execute([$carId, $customerId, $startDate, $days]);
    
    sendJson(['status' => 'car booked'], 201);
    
} catch (Exception $e) {
    sendJson(['error' => 'Server error: ' . $e->getMessage()], 500);
}
?>
