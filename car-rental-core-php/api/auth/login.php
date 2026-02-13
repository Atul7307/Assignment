<?php
// Set CORS headers FIRST, before any other output
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../includes/functions.php';

startSession();

try {
    $data = getJsonInput();
    
    if (!$data) {
        sendJson(['error' => 'No JSON received'], 400);
    }
    
    // Validate required fields
    validateRequired($data, ['email', 'password']);
    
    $email = sanitize($data['email']);
    $password = $data['password'];
    
    $pdo = getDBConnection();
    
    // Find user by email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user || !password_verify($password, $user['password'])) {
        sendJson(['error' => 'Invalid credentials'], 401);
    }
    
    // Set session data
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['name'] = $user['name'];
    
    sendJson([
        'status' => 'login success',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role']
        ]
    ]);
    
} catch (Exception $e) {
    sendJson(['error' => 'Server error: ' . $e->getMessage()], 500);
}
?>
