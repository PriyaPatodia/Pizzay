<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.php"); // redirect if not logged in
  exit();
}
$username = $_SESSION['user_name'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Pizzay-A Pizza Delivery App</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css?family=Poppins:700|Roboto:400&display=swap" rel="stylesheet" />
<!-- FontAwesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
<link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="orderConfirmationBanner" aria-live="polite" role="alert"></div>
  <header>
    <nav>
        <h1 class="logo">Pizzay</h1>
        <ul class="nav-links">
          <li><a href="index.php" class="active">Home</a></li>
          <li><a href="menu.php">Menu</a></li>
          <li><a href="reserve.php">Reserve</a></li>
          <li><a href="logout.php">Logout</a></li>
        </ul>
    </nav>

    <button id="themeToggleBtn" style="position:absolute; top:20px; right:20px; padding:7px 9px; border:none; background:#fff; color:var(--accent-dark); font-weight:700; border-radius:7px; cursor:pointer;">Dark Mode</button>
  </header>
  <section class="hero">
      <h2>Hello! <span id="username"><?php echo htmlspecialchars($username) ?></span></h2>

      <p>Welcome to pizzay. We are delighted to serve you again.</p>
      <p>Have a great meal.</p>
  </section>


<script src="scrpt.js"></script>
</body>
</html>
