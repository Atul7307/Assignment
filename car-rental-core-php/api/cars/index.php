<?php
// Set CORS headers FIRST, before any other output
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/functions.php';

startSession();

$requestMethod = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDBConnection();
    
    if ($requestMethod === 'GET') {
        // Get all cars
        $stmt = $pdo->query("SELECT * FROM cars");
        $cars = $stmt->fetchAll();
        sendJson($cars);
        
    } elseif ($requestMethod === 'POST') {
        // Create new car (agency only)
        requireRole('agency');
        
        $data = getJsonInput();
        validateRequired($data, ['model', 'vehicle_number', 'seating_capacity', 'rent_per_day']);
        
        $agencyId = getUserId();
        $model = sanitize($data['model']);
        $vehicleNumber = sanitize($data['vehicle_number']);
        $seatingCapacity = (int) $data['seating_capacity'];
        $rentPerDay = (int) $data['rent_per_day'];
        
        $stmt = $pdo->prepare("INSERT INTO cars (agency_id, model, vehicle_number, seating_capacity, rent_per_day) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$agencyId, $model, $vehicleNumber, $seatingCapacity, $rentPerDay]);
        
        sendJson(['status' => 'car added'], 201);
        
    } else {
        sendJson(['error' => 'Method not allowed'], 405);
    }
    
} catch (Exception $e) {
    sendJson(['error' => 'Server error: ' . $e->getMessage()], 500);
}
?>
