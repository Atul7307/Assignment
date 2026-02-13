<?php
// Set CORS headers FIRST, before any other output
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/functions.php';

requireRole('agency');

try {
    $agencyId = getUserId();
    
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("
        SELECT 
            bookings.*,
            users.name AS customer_name,
            cars.model
        FROM bookings
        JOIN cars ON bookings.car_id = cars.id
        JOIN users ON bookings.customer_id = users.id
        WHERE cars.agency_id = ?
        ORDER BY bookings.start_date DESC
    ");
    $stmt->execute([$agencyId]);
    $bookings = $stmt->fetchAll();
    
    sendJson($bookings);
    
} catch (Exception $e) {
    sendJson(['error' => 'Server error: ' . $e->getMessage()], 500);
}
?>
