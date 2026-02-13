<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Rental API</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            max-width: 800px;
            width: 100%;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
        }
        .endpoint {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 4px solid #667eea;
        }
        .method {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 3px;
            font-weight: bold;
            font-size: 12px;
            margin-right: 10px;
        }
        .get { background: #61affe; color: white; }
        .post { background: #49cc90; color: white; }
        .put { background: #fca130; color: white; }
        .delete { background: #f93e3e; color: white; }
        .path {
            font-family: 'Courier New', monospace;
            color: #333;
        }
        .section {
            margin: 30px 0;
        }
        .section-title {
            color: #667eea;
            font-size: 20px;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
        }
        .status {
            display: inline-block;
            padding: 5px 15px;
            background: #49cc90;
            color: white;
            border-radius: 20px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚗 Car Rental API</h1>
        <p class="subtitle">Core PHP Backend - Ready for InfinityFree Deployment</p>
        <div class="status">✓ API is running</div>
        
        <div class="section">
            <h2 class="section-title">Authentication Endpoints</h2>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="path">/api/register</span>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="path">/api/login</span>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="path">/api/logout</span>
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/me</span>
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Car Management</h2>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/cars</span> - Get all cars
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="path">/api/cars</span> - Create car (agency only)
            </div>
            <div class="endpoint">
                <span class="method put">PUT</span>
                <span class="path">/api/cars/{id}</span> - Update car (agency only)
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/agency/cars</span> - Get agency's cars
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Booking Management</h2>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="path">/api/book</span> - Book a car (customer only)
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/agency/bookings</span> - Get agency's bookings
            </div>
        </div>
    </div>
</body>
</html>
