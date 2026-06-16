<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php"); // redirect if not logged in
    exit();
}
include 'db.php'
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Menu - Pizzay-</title>
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
          <li><a href="index.php">Home</a></li>
          <li><a href="menu.php" class="active">Menu</a></li>
          <li><a href="reserve.php">Reserve</a></li>
          <li><a href="logout.php">Logout</a></li>
        </ul>
      </nav>
    <button id="themeToggleBtn" style="position:absolute; top:20px; right:20px; padding:7px 9px; border:none; background:#fff; color:var(--accent-dark); font-weight:700; border-radius:7px; cursor:pointer;">Dark Mode</button>
  </header>
  <div class="container">
    <section class="menu">
      <input type="text" id="searchInput" class="search-input" placeholder="Search pizzas..." oninput="filterPizzas()" aria-label="Search pizzas" />
      <h2>Our Pizzas</h2>
      <ul class="pizza-list" id="pizzaMenu" aria-live="polite"></ul>
    </section>
  </div>
    <section class="cart" aria-label="Shopping cart">
      <h2>Your Cart <i class="fa fa-shopping-cart" aria-hidden="true"></i></h2>
      <ul class="cart-list" id="cartList"></ul>

      <div class="addons-section">
        <h3>Add-ons</h3>
        <div class="addons-list" id="addonsList">
          <label><input type="checkbox" onchange="updateAddons('Garlic Bread', 99)"> Garlic Bread <span>(₹99)</span></label>
          <label><input type="checkbox" onchange="updateAddons('Soft Drink', 49)"> Soft Drink <span>(₹49)</span></label>
          <label><input type="checkbox" onchange="updateAddons('Peri Peri Dip', 39)"> Peri Peri Dip <span>(₹39)</span></label>
          <label><input type="checkbox" onchange="updateAddons('Brownie', 79)"> Brownie <span>(₹79)</span></label>
        </div>
      </div>

      <div class="coupon-section">
        <input type="text" id="couponInput" class="coupon-input" placeholder="Enter Coupon Code" aria-label="Coupon code"/>
        <button class="coupon-apply-btn" onclick="applyCoupon()">Apply</button>
        <div id="couponMsg" class="coupon-msg" role="alert" aria-live="assertive"></div>
      </div>

      <div class="cart-total" id="cartTotal"></div>
      <button class="place-order-btn" id="orderBtn" onclick="openOrderModal()" disabled aria-disabled="true">
        <i class="fa fa-bolt" aria-hidden="true"></i> Place Order
      </button>
      <div class="order-msg" id="orderMsg" role="alert" aria-live="polite"></div>
    </section>
  </div>

  <div class="modal" id="orderModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDesc">
    <div class="modal-content">
      <span class="close-btn" onclick="closeOrderModal()" role="button" aria-label="Close order form">&times;</span>
      <h2 id="modalTitle">Place Your Order</h2>
      <form id="orderForm" onsubmit="submitOrder(event)">
        <label for="customerName">Name *</label>
        <input id="customerName" type="text" placeholder="Name" required aria-required="true" />

        <label for="customerAddress">Delivery Address *</label>
        <input id="customerAddress" type="text" placeholder="Address" required aria-required="true" />

        <label for="customerPhone">Phone Number *</label>
        <input id="customerPhone" type="tel" placeholder="Phone" pattern="[0-9\s+\-]{7,15}" placeholder="Digits only" required aria-required="true" />

        <!-- <button type="submit" class="coupon-apply-btn">Confirm Order</button> -->
      </form>
      <div id="orderSummary" class="order-summary hide" aria-live="polite" aria-atomic="true"></div>
      <button id="confirmBtn" class="coupon-apply-btn" onclick="confirmOrder()">Confirm Purchase</button>
    </div>
  </div>

<script src="scrpt.js"></script>
</body>
</html>
