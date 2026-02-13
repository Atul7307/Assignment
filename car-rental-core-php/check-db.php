<?php
// Quick database check
require_once __DIR__ . '/config/database.php';

header('Content-Type: application/json');

try {
    $pdo = getDBConnection();
    
    // Count users
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
    $userCount = $stmt->fetch()['count'];
    
    // Get sample users (without passwords)
    $stmt = $pdo->query("SELECT id, name, email, role FROM users LIMIT 5");
    $users = $stmt->fetchAll();
    
    // Count cars
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM cars");
    $carCount = $stmt->fetch()['count'];
    
    // Count bookings
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM bookings");
    $bookingCount = $stmt->fetch()['count'];
    
    echo json_encode([
        'database' => 'connected',
        'counts' => [
            'users' => $userCount,
            'cars' => $carCount,
            'bookings' => $bookingCount
        ],
        'sample_users' => $users,
        'message' => 'Database is working! If counts are 0, import sample_data.sql'
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage(),
        'message' => 'Database connection failed. Check config/database.php'
    ]);
}
?>
