<?php
// Set CORS headers FIRST, before any other output
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/functions.php';

requireAuth();

try {
    $userId = getUserId();
    
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("SELECT id, name, email, role FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();
    
    if (!$user) {
        sendJson(['error' => 'User not found'], 404);
    }
    
    sendJson([
        'user' => $user
    ]);
    
} catch (Exception $e) {
    sendJson(['error' => 'Server error: ' . $e->getMessage()], 500);
}
?>
