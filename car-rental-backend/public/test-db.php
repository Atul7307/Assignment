<!DOCTYPE html>
<html>
<head>
    <title>Database Test</title>
</head>
<body>
    <h1>Database Connection Test</h1>
    
    <?php
    $db = app\Database::connect();
    
    try {
        // Test connection
        if ($db->connID) {
            echo "<p style='color: green;'>✓ Database connected successfully!</p>";
            echo "<p>Database: " . $db->database . "</p>";
            
            // Test if tables exist
            $tables = $db->listTables();
            echo "<h3>Existing Tables:</h3><ul>";
            foreach ($tables as $table) {
                echo "<li>$table</li>";
            }
            echo "</ul>";
            
            // Check users table
            if (in_array('users', $tables)) {
                $query = $db->query("SELECT COUNT(*) as count FROM users");
                $result = $query->getRow();
                echo "<p>Users table has " . $result->count . " records</p>";
            } else {
                echo "<p style='color: red;'>✗ Users table not found!</p>";
                echo "<p>Please run the database.sql script.</p>";
            }
            
        } else {
            echo "<p style='color: red;'>✗ Could not connect to database</p>";
        }
    } catch (Exception $e) {
        echo "<p style='color: red;'>✗ Error: " . $e->getMessage() . "</p>";
        echo "<p>Make sure you have:</p>";
        echo "<ol>";
        echo "<li>Created the 'car_rental' database</li>";
        echo "<li>Run the database.sql script</li>";
        echo "<li>MySQL service is running</li>";
        echo "</ol>";
    }
    ?>
</body>
</html>
