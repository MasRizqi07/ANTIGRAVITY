<?php
// Generic DB Integrity Verification Script

// Using standard Laravel environment variables if available
$host = getenv('DB_HOST') ?: '127.0.0.1';
$port = getenv('DB_PORT') ?: '3306';
$db   = getenv('DB_DATABASE') ?: 'ticket_db';
$user = getenv('DB_USERNAME') ?: 'root';
$pass = getenv('DB_PASSWORD') ?: '';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    // Note: If using SQLite in the sandbox, adjust DSN accordingly.
    // Assuming MySQL/Postgres for a realistic concurrency test.
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("DB Connection failed: " . $e->getMessage() . "\n(Note: Ensure DB credentials match your environment)\n");
}

$eventId = 1;
$ticketType = 'VIP';
$initialStock = 20;

$stmt = $pdo->prepare("SELECT stock_available FROM tickets WHERE event_id = ? AND type = ?");
$stmt->execute([$eventId, $ticketType]);
$ticket = $stmt->fetch();

$currentStock = $ticket ? (int)$ticket['stock_available'] : 0;

$stmt = $pdo->prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'PAID'");
$stmt->execute();
$paidOrdersCount = (int)$stmt->fetch()['count'];

echo "--- Data Integrity Verification ---\n";
echo "Initial Stock: $initialStock\n";
echo "Current Remaining Stock: $currentStock\n";
echo "Total Successful Orders (PAID): $paidOrdersCount\n\n";

$verdict = "PASS";
if ($currentStock < 0) {
    echo "[FAIL] Overbooked! Stock is negative.\n";
    $verdict = "FAIL";
} elseif (($currentStock + $paidOrdersCount) != $initialStock) {
    echo "[FAIL] Inconsistent state! Stock ($currentStock) + Orders ($paidOrdersCount) != Initial ($initialStock).\n";
    $verdict = "FAIL";
} else {
    echo "[PASS] Data Integrity Verified. Exact consistency maintained.\n";
}
