<?php
// Database configuration template
// Copy this to database.php and update with your credentials

// For local development (XAMPP, WAMP, etc.)
define('DB_HOST', 'localhost');
define('DB_NAME', 'car_rental');
define('DB_USER', 'root');
define('DB_PASS', '');

// For InfinityFree deployment
// Uncomment and update these values:
/*
define('DB_HOST', 'sql123.infinityfree.com');
define('DB_NAME', 'epiz_xxxxx_car_rental');
define('DB_USER', 'epiz_xxxxx');
define('DB_PASS', 'your_password');
*/

// For other hosting providers
// Update with your specific values:
/*
define('DB_HOST', 'your_host');
define('DB_NAME', 'your_database');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
*/

function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit;
    }
}
?>
