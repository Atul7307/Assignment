<?php
// Set CORS headers FIRST, before any other output
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../includes/functions.php';

startSession();

session_destroy();

sendJson(['status' => 'logged out']);
?>
