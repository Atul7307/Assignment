<?php
/**
 * Test script to verify API functionality
 * Access at: /test.php
 * 
 * This file should be DELETED before deploying to production!
 */

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Test Suite</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .test-section {
            background: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .test-result {
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
        }
        .success {
            background: #d4edda;
            border-left: 4px solid #28a745;
        }
        .error {
            background: #f8d7da;
            border-left: 4px solid #dc3545;
        }
        h1 { color: #333; }
        h2 { color: #667eea; }
        pre {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>🧪 API Test Suite</h1>
    
    <div class="warning">
        <strong>⚠️ Security Warning:</strong> Delete this file before deploying to production!
    </div>

    <?php
    // Test 1: PHP Version
    echo '<div class="test-section">';
    echo '<h2>PHP Version</h2>';
    $phpVersion = phpversion();
    if (version_compare($phpVersion, '7.4.0', '>=')) {
        echo '<div class="test-result success">✓ PHP Version: ' . $phpVersion . ' (Compatible)</div>';
    } else {
        echo '<div class="test-result error">✗ PHP Version: ' . $phpVersion . ' (Requires 7.4+)</div>';
    }
    echo '</div>';

    // Test 2: Required Extensions
    echo '<div class="test-section">';
    echo '<h2>Required Extensions</h2>';
    $extensions = ['pdo', 'pdo_mysql', 'json', 'mbstring'];
    foreach ($extensions as $ext) {
        if (extension_loaded($ext)) {
            echo '<div class="test-result success">✓ ' . $ext . ' is loaded</div>';
        } else {
            echo '<div class="test-result error">✗ ' . $ext . ' is NOT loaded</div>';
        }
    }
    echo '</div>';

    // Test 3: File Structure
    echo '<div class="test-section">';
    echo '<h2>File Structure</h2>';
    $requiredFiles = [
        '.htaccess',
        'config/database.php',
        'config/cors.php',
        'includes/functions.php',
        'api/auth/register.php',
        'api/auth/login.php',
        'api/cars/index.php',
        'api/bookings/book.php'
    ];
    foreach ($requiredFiles as $file) {
        if (file_exists($file)) {
            echo '<div class="test-result success">✓ ' . $file . ' exists</div>';
        } else {
            echo '<div class="test-result error">✗ ' . $file . ' is missing</div>';
        }
    }
    echo '</div>';

    // Test 4: Database Connection
    echo '<div class="test-section">';
    echo '<h2>Database Connection</h2>';
    try {
        require_once 'config/database.php';
        $pdo = getDBConnection();
        echo '<div class="test-result success">✓ Database connection successful</div>';
        
        // Check tables
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        $requiredTables = ['users', 'cars', 'bookings'];
        foreach ($requiredTables as $table) {
            if (in_array($table, $tables)) {
                echo '<div class="test-result success">✓ Table "' . $table . '" exists</div>';
            } else {
                echo '<div class="test-result error">✗ Table "' . $table . '" is missing</div>';
            }
        }
    } catch (Exception $e) {
        echo '<div class="test-result error">✗ Database Error: ' . $e->getMessage() . '</div>';
    }
    echo '</div>';

    // Test 5: Session Support
    echo '<div class="test-section">';
    echo '<h2>Session Support</h2>';
    if (session_start()) {
        echo '<div class="test-result success">✓ Sessions are working</div>';
        echo '<div class="test-result success">✓ Session ID: ' . session_id() . '</div>';
    } else {
        echo '<div class="test-result error">✗ Session start failed</div>';
    }
    echo '</div>';

    // Test 6: Writable Directories
    echo '<div class="test-section">';
    echo '<h2>Permissions</h2>';
    if (is_writable('.')) {
        echo '<div class="test-result success">✓ Current directory is writable</div>';
    } else {
        echo '<div class="test-result error">✗ Current directory is NOT writable</div>';
    }
    echo '</div>';

    // Test 7: .htaccess Rules
    echo '<div class="test-section">';
    echo '<h2>URL Rewriting</h2>';
    if (file_exists('.htaccess')) {
        $htaccess = file_get_contents('.htaccess');
        if (strpos($htaccess, 'RewriteEngine On') !== false) {
            echo '<div class="test-result success">✓ .htaccess contains rewrite rules</div>';
        } else {
            echo '<div class="test-result error">✗ .htaccess missing rewrite rules</div>';
        }
    }
    echo '<p>To test if URL rewriting works, try accessing: <a href="api/cars">api/cars</a></p>';
    echo '</div>';
    ?>

    <div class="test-section">
        <h2>Next Steps</h2>
        <ol>
            <li>If all tests pass, try accessing: <a href="api/cars">/api/cars</a></li>
            <li>Use Postman or Thunder Client to test API endpoints</li>
            <li>Test user registration and login</li>
            <li><strong>Delete this test.php file before production deployment!</strong></li>
        </ol>
    </div>
</body>
</html>
