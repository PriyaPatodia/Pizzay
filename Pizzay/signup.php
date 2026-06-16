<?php 
include 'db.php';

if (isset($_POST['signup'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (name, email, password)
            VALUES ('$name', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Signup successful! You can now log in.');</script>";
    } else {
        echo "<script>alert('Error: " . $conn->error . "');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Signup - Pizzay</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <section class="page">
    <h2>Create an Account</h2>
    <form class="auth-form" method="POST" action="">
      <input type="text" name="name" placeholder="Full Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit" name="signup" class="btn">Signup</button>
    </form>
    <p>Already have an account? <a href="login.php">Login</a></p>
  </section>
</body>
</html>
