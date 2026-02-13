<?php
// Suppress errors in production
@error_reporting(E_ERROR | E_PARSE);

// Get the origin from request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Always allow the requesting origin
if (!empty($origin)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, User-Agent, Cookie, Accept, Origin");
header("Access-Control-Max-Age: 86400");
?>

