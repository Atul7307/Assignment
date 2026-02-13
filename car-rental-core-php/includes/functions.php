<?php
// Helper functions

// Start session if not already started
function startSession() {
    if (session_status() === PHP_SESSION_NONE) {
        // Configure session cookies for CORS compatibility
        // Only set these if we can (some hosting providers restrict this)
        if (function_exists('session_set_cookie_params')) {
            $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || 
                       (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
            
            // Set secure cookie params based on HTTPS availability
            if (PHP_VERSION_ID >= 70300) {
                // PHP 7.3+ supports array parameter
                session_set_cookie_params([
                    'lifetime' => 86400,
                    'path' => '/',
                    'domain' => '',
                    'secure' => $isHttps,
                    'httponly' => true,
                    'samesite' => $isHttps ? 'None' : 'Lax'
                ]);
            } else {
                // Fallback for older PHP versions
                session_set_cookie_params(86400, '/', '', $isHttps, true);
            }
        }
        @session_start();
    }
}

// Get JSON input
function getJsonInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true);
}

// Send JSON response
function sendJson($data, $statusCode = 200) {
    // Always set CORS headers - no conditions
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (!headers_sent()) {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, User-Agent, Cookie, Accept, Origin");
        header("Content-Type: application/json; charset=UTF-8");
    }
    
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Check if user is authenticated
function isAuthenticated() {
    startSession();
    return isset($_SESSION['user_id']);
}

// Check if user has specific role
function hasRole($role) {
    startSession();
    return isset($_SESSION['role']) && $_SESSION['role'] === $role;
}

// Get current user ID
function getUserId() {
    startSession();
    return $_SESSION['user_id'] ?? null;
}

// Get current user role
function getUserRole() {
    startSession();
    return $_SESSION['role'] ?? null;
}

// Require authentication
function requireAuth() {
    header('Access-Control-Allow-Origin: *');
    if (!isAuthenticated()) {
        sendJson(['error' => 'Not authenticated'], 401);
    }
}

// Require specific role
function requireRole($role) {
    requireAuth();
    if (!hasRole($role)) {
        sendJson(['error' => 'Unauthorized'], 403);
    }
}

// Validate required fields
function validateRequired($data, $fields) {
    foreach ($fields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            sendJson(['error' => "Field '$field' is required"], 400);
        }
    }
}

// Sanitize input
function sanitize($data) {
    if (is_array($data)) {
        return array_map('sanitize', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)));
}
?>
