<?php
session_start(); // Start the session at the top

// Database connection
$conn = new mysqli("localhost", "root", "", "ecommerce");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get values from form
$email = $_POST['email'];
$password = $_POST['password'];

// Query the user
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    $hashed_password = $row['password']; // This should be hashed in DB

    // ✅ VERIFY password and set session
    if (password_verify($password, $hashed_password)) {
        $_SESSION['email'] = $email; // Store in session
        header("Location: index.php"); // Redirect to main page
        exit();
    } else {
        echo "❌ Incorrect password.";
    }
} else {
    echo "❌ Email not found.";
}

$conn->close();
?>
