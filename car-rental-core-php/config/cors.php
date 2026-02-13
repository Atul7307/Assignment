<?php
// Suppress errors in production
@error_reporting(E_ERROR | E_PARSE);

// CORS configuration
// Update the allowed origin when deploying

// Must be set BEFORE any output or session_start()
$allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'https://car-rental-api.rf.gd',
    // Add your deployed frontend domains here
    'https://car-rental-frontend.vercel.app',
    'https://car-rental-frontend.netlify.app',
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Always set CORS headers for cross-origin requests
if (!empty($origin)) {
    // Check if origin is allowed
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
    }
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, User-Agent, Cookie, Accept, Origin");
header("Access-Control-Max-Age: 86400");

// Note: OPTIONS requests are handled by .htaccess and routed to options.php
// This file only sets CORS headers for actual API requests
?>
