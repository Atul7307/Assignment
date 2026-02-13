<?php
// Suppress errors in production
@error_reporting(E_ERROR | E_PARSE);

// Handle all CORS preflight OPTIONS requests
// This file is called by .htaccess for any OPTIONS request

$allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'https://car-rental-api.rf.gd',
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Check if origin is allowed - be more permissive for localhost
$isAllowed = false;

if (!empty($origin)) {
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
}

// Set CORS headers
if ($isAllowed && !empty($origin)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
} else {
    // For same-origin requests or unspecified origin
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, User-Agent, Cookie, Accept, Origin");
header("Access-Control-Max-Age: 86400"); // Cache preflight for 24 hours
header("Content-Type: application/json");
header("Content-Length: 0");

http_response_code(200);
exit;
