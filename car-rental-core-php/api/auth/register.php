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
    validateRequired($data, ['name', 'email', 'password', 'role']);
    
    // Sanitize input
    $name = sanitize($data['name']);
    $email = sanitize($data['email']);
    $password = $data['password'];
    $role = sanitize($data['role']);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJson(['error' => 'Invalid email format'], 400);
    }
    
    // Validate role
    if (!in_array($role, ['customer', 'agency'])) {
        sendJson(['error' => 'Invalid role. Must be customer or agency'], 400);
    }
    
    $pdo = getDBConnection();
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->fetch()) {
        sendJson(['error' => 'Email already registered'], 400);
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert user
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $hashedPassword, $role]);
    
    sendJson([
        'status' => 'registered',
        'message' => 'Registration successful'
    ], 201);
    
} catch (Exception $e) {
    sendJson(['error' => 'Server error: ' . $e->getMessage()], 500);
}
?>
