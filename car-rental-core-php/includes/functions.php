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
    // Ensure CORS headers are set (in case they were missed)
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (!empty($origin) && !headers_sent()) {
        $allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3001',
            'https://car-rental-api.rf.gd',
        ];
        
        $isAllowed = false;
        
        // Exact match
        if (in_array($origin, $allowedOrigins)) {
            $isAllowed = true;
        }
        // Localhost variations (any port)
        elseif (preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin)) {
            $isAllowed = true;
        }
        // Deployed frontend domains
        elseif (strpos($origin, '.vercel.app') !== false || 
                strpos($origin, '.netlify.app') !== false ||
                strpos($origin, '.rf.gd') !== false) {
            $isAllowed = true;
        }
        
        if ($isAllowed) {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Credentials: true");
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, User-Agent, Cookie, Accept, Origin");
        }
    }
    
    if (!headers_sent()) {
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
