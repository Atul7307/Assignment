<?php
// Suppress errors in production
@error_reporting(E_ERROR | E_PARSE);


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, User-Agent, Cookie, Accept, Origin");
header("Access-Control-Max-Age: 86400");
?>

