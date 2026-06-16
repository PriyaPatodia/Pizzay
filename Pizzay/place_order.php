<?php
session_start();
include('db.php'); 

// Make sure the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo "User not logged in!";
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $u_id = $_SESSION['user_id'];  // Correct session variable
    $name = $_POST['name'];
    $address = $_POST['address'];
    $phone = $_POST['phone'];
    $total_price = $_POST['total_price'];
    $order_date = date('Y-m-d H:i:s');

    // Prepared statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO orders (u_id, name, address, phone, total_price, order_date) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssds", $u_id, $name, $address, $phone, $total_price, $order_date);

    if ($stmt->execute()) {
        echo "Order placed successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}
$conn->close();
?>
