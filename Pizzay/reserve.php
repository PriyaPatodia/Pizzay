<?php
session_start();
include 'db.php';

// Redirect if not logged in
if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}

// Handle reservation form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $u_id = $_SESSION['user_id'];
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $num_people = $_POST['num_people'];
  $time_slot = $_POST['time_slot'];

  // Insert into database
  $sql = "INSERT INTO reservations (u_id, name, phone, num_people, time_slot)
          VALUES ('$u_id', '$name', '$phone', '$num_people', '$time_slot')";

  if ($conn->query($sql) === TRUE) {
    $message = "Reservation successful!";
  } else {
    $message = "Error: " . $conn->error;
  }
}
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
  <header>
    <nav>
        <h1 class="logo">Pizzay</h1>
        <ul class="nav-links">
          <li><a href="index.php">Home</a></li>
          <li><a href="menu.php">Menu</a></li>
          <li><a href="reserve.php" class="active">Reserve</a></li>
          <li><a href="logout.php">Logout</a></li>
        </ul>
    </nav>

    <button id="themeToggleBtn" style="position:absolute; top:20px; right:20px; padding:7px 9px; border:none; background:#fff; color:var(--accent-dark); font-weight:700; border-radius:7px; cursor:pointer;">Dark Mode</button>
  </header>

    <section class="page">
      <h2>Reserve a table</h2>
      <?php if (!empty($message)) { ?>
        <p style="color: green;"><?php echo $message; ?></p>
      <?php } ?>

      <form class="reserve-form" method="POST" action="">
        <input type="text" name ="name" placeholder="Your Name" required />
        <input type="tel" name="phone" placeholder="Your contact number" pattern="[0-9]{10}" title="Enter a valid 10 digit number" required />
        <input type="number" name="num_people" placeholder="No. of people" min="1" max="20" required/>
        
        <label for="time_slot">Select Time Slot:</label>
        <select name="time_slot" required>
            <option value="">Choose a time</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
            <option value="8:00 PM">8:00 PM</option>
            <option value="9:00 PM">9:00 PM</option>
            <option value="10:00 PM">10:00 PM</option>
        </select>
        <button type="submit" class="btn">Send</button>
      </form>
    </section>
  </body>
</html>
