<?php
// Set CORS headers FIRST, before any other output
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/functions.php';

startSession();
requireRole('agency');

try {
    $agencyId = getUserId();
    
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("SELECT * FROM cars WHERE agency_id = ?");
    $stmt->execute([$agencyId]);
    $cars = $stmt->fetchAll();
    
    sendJson($cars);
    
} catch (Exception $e) {
    sendJson(['error' => 'Server error: ' . $e->getMessage()], 500);
}
?>
