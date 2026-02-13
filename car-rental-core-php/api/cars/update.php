<?php
// Set CORS headers FIRST, before any other output
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/functions.php';

startSession();
requireRole('agency');

try {
    // Get car ID from query string
    if (!isset($_GET['id'])) {
        sendJson(['error' => 'Car ID is required'], 400);
    }
    
    $carId = (int) $_GET['id'];
    $agencyId = getUserId();
    
    $pdo = getDBConnection();
    
    // Check if car exists and belongs to the agency
    $stmt = $pdo->prepare("SELECT * FROM cars WHERE id = ?");
    $stmt->execute([$carId]);
    $car = $stmt->fetch();
    
    if (!$car) {
        sendJson(['error' => 'Car not found'], 404);
    }
    
    if ($car['agency_id'] != $agencyId) {
        sendJson(['error' => 'You can edit only your cars'], 403);
    }
    
    // Get update data
    $data = getJsonInput();
    validateRequired($data, ['model', 'vehicle_number', 'seating_capacity', 'rent_per_day']);
    
    $model = sanitize($data['model']);
    $vehicleNumber = sanitize($data['vehicle_number']);
    $seatingCapacity = (int) $data['seating_capacity'];
    $rentPerDay = (int) $data['rent_per_day'];
    
    // Update car
    $stmt = $pdo->prepare("UPDATE cars SET model = ?, vehicle_number = ?, seating_capacity = ?, rent_per_day = ? WHERE id = ?");
    $stmt->execute([$model, $vehicleNumber, $seatingCapacity, $rentPerDay, $carId]);
    
    sendJson(['status' => 'car updated']);
    
} catch (Exception $e) {
    sendJson(['error' => 'Server error: ' . $e->getMessage()], 500);
}
?>
