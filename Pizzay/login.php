<?php
session_start();
include 'db.php'; // Include your database connection

// Handle form submission
if(isset($_POST['login'])){
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if user exists
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $user = $result->fetch_assoc();
        if(password_verify($password, $user['password'])){
            // Login successful
            $_SESSION['user_id'] = $user['u_id'];
            $_SESSION['user_name'] = $user['name'];
            header("Location: index.php"); // Redirect to homepage
            exit();
        } else {
            $error = "Incorrect password!";
        }
    } else {
        $error = "No user found with this email!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Login - Pizzay</title>
<link rel="stylesheet" href="style.css" />
</head>
<body>
  
<section class="page">
  <h2>Login</h2>

  <?php if(isset($error)){ echo "<p style='color:red;'>$error</p>"; } ?>

  <form class="auth-form" method="POST" action="">
    <input type="email" name="email" placeholder="Email" required />
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit" name="login" class="btn">Login</button>
  </form>
  <p>Don’t have an account? <a href="signup.php">Signup</a></p>
</section>
<script src="scrpt.js"></script>
</body>
</html>
