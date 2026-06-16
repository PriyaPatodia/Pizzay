const pizzas = [
  {id:1, name:"Margherita", desc:"Classic cheese & tomato.", price:199, img:"https://au.ooni.com/cdn/shop/articles/20220211142645-margherita-9920.jpg?crop=center&height=800&v=1737368217&width=800"},
  {id:2, name:"Veggie Delight", desc:"Loaded with onion, capsicum, sweet corn.", price:259,img:"https://thepizzabakery.in/wp-content/uploads/2022/01/Popo-768-x-538.jpg"},
  {id:3, name:"Peppy Paneer", desc:"Paneer, paprika, capsicum & spice.", price:259,img:"https://cdn.dotpe.in/longtail/store-items/7935708/CR9nPJWC.jpeg"},
  {id:4, name:"Garden Fresh", desc:"Fresh mushroom, olives, capsicum & herbs.", price:289,img:"https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"},
  {id:5, name:"Basil Tomato", desc:"Fresh basil, cherry tomatoes, feta cheese.", price:269,img:"https://www.saveur.com/uploads/2013/04/JTPSD2ONPYISBHIP4CJ5HDW55A_01.webp?format=auto&optimize=high&width=1440"},
  
  {id:6, name:"Peri Peri Fries", desc:"Potato french fries coated in spicy peri peri seasoning.", price:189,img:"https://cdn.dotpe.in/longtail/store-items/5523029/QgPqC7wa.jpeg"},
  {id:7, name:"Classic Fries", desc:"Salted potato french fries.", price:159,img:"https://simpleveganblog.com/wp-content/uploads/2020/04/Baked-Frech-Fries-3.jpg"},
  {id:8, name:"Choco Lava", desc:"Chocolate cake with chocolate filling.", price:229,img:"https://www.billyparisi.com/wp-content/uploads/2022/02/lava-cake-1.jpg"},
];

/*NEWWWWW*/
const FIXED_EMAIL = "user@example.com";
const FIXED_PASSWORD = "password123";
function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ name: "Demo User", email })
    );
    window.location.href = "index.php";
    return false;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password!");
    return false;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  window.location.href = "index.php";
  return false;
}
function signupUser(event) {
  event.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((u) => u.email === email)) {
    alert("User already exists!");
    return false;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful! Please login.");
  window.location.href = "login.php";
  return false;
}
function checkAuth() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.php"; // redirect to login
  } else {
    const usernameSpan = document.getElementById("username");
    if (usernameSpan) usernameSpan.textContent = user.name || "User";
  }
}

function logoutUser() {
  fetch("logout.php")
    .then(() => {
      window.location.href = "login.php";
    })
    .catch(() => alert("Logout failed"));
}



const addonsData = {"Garlic Bread":99, "Soft Drink":49, "Peri Peri Dip":39, "Brownie":79};

let cart = [];
let selectedAddons = {};
let coupon = null;
let discount = 0;

const themeToggleBtn = document.getElementById('themeToggleBtn');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggleBtn.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});

function renderMenu() {
  const menu = document.getElementById("pizzaMenu");
  menu.innerHTML = "";
  pizzas.forEach(p => {
    menu.innerHTML += `
    <li class="pizza-card">
      <img src="${p.img}" alt="${p.name} pizza" class="pizza-img" loading="lazy" />
      <span class="pizza-name">${p.name}<i class="fa fa-leaf" style="color:#21bf3c;font-size:1.03em"></i></span>
      <div class="pizza-desc">${p.desc}</div>
      <div class="pizza-price">₹${p.price}</div>
      <div class="pizza-action">
        <button class="add-btn" onclick="addToCart(${p.id})"><i class="fa fa-plus"></i> Add</button>
      </div>
    </li>
    `;
  });
}

function addToCart(id) {
  const li = document.querySelector(`#pizzaMenu li[data-id='${id}']`);
  const name = li.textContent.split(" - ₹")[0]; // Get pizza name
  const price = parseFloat(li.dataset.price);   // Get pizza price

  const existing = cart.find(item => item.id === id);
  if(existing){
      existing.qty++; // If pizza already in cart, increase quantity
  } else {
    cart.push({id, name, price, qty: 1}); // Add new pizza to cart
  }
  renderCart();
  animateAddToCart(id);
}

function changeQty(id, delta) {
  let idx = cart.findIndex(item => item.id === id);
  if(idx === -1) return;
  cart[idx].qty += delta;
  if(cart[idx].qty < 1) cart.splice(idx, 1);
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function updateAddons(name, price) {
  if(selectedAddons[name]) delete selectedAddons[name];
  else selectedAddons[name] = price;
  renderCart();
}

function applyCoupon() {
  const input = document.getElementById('couponInput');
  const msg = document.getElementById('couponMsg');
  const code = input.value.trim().toUpperCase();
  if(code === "SAVE10"){
    coupon = code;
    discount = 0.1; // 10% off
    msg.style.color = 'green';
    msg.textContent = 'Coupon applied: 10% off!';
  } else if(code === "FLAT50"){
    coupon = code;
    discount = 50; // ₹50 off
    msg.style.color = 'green';
    msg.textContent = 'Coupon applied: ₹50 off!';
  } else {
    coupon = null;
    discount = 0;
    msg.style.color = 'red';
    msg.textContent = 'Invalid coupon code';
  }
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cartList');
  list.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const pizza = pizzas.find(p => p.id === item.id);
    const subtotal = pizza.price * item.qty;
    total += subtotal;
    list.innerHTML += `
    <li class="cart-item">
      <span>${pizza.name}<br>₹${pizza.price}
        <button class="qty-btn" aria-label="Decrease quantity" onclick="changeQty(${item.id}, -1)">-</button>
        <span class="cart-qty">${item.qty}</span>
        <button class="qty-btn" aria-label="Increase quantity" onclick="changeQty(${item.id}, 1)">+</button>
      </span>
      <span>
        <span style="font-weight:600">₹${subtotal}</span>
        <button class="remove-btn" aria-label="Remove item" onclick="removeFromCart(${item.id})"><i class="fa fa-trash"></i></button>
      </span>
    </li>`;
  });

  for(const [name, price] of Object.entries(selectedAddons)){
    total += price;
    list.innerHTML += `
      <li class="cart-item">
        <span>${name} (Add-on)</span>
        <span>₹${price}</span>
      </li>`;
  }

  let discountAmt = 0;
  if(coupon){
    discountAmt = discount < 1 ? total * discount : discount;
  }
  let finalTotal = Math.max(total - discountAmt, 0);
  const cartTotal = document.getElementById('cartTotal');
  let discountText = discountAmt > 0 ? ` | Discount: -₹${discountAmt.toFixed(2)}` : '';
  cartTotal.textContent = `Total: ₹${finalTotal.toFixed(2)}${discountText}`;

  const orderBtn = document.getElementById('orderBtn');
  orderBtn.disabled = cart.length === 0 && Object.keys(selectedAddons).length === 0;

  document.getElementById('orderMsg').textContent = '';
}

let flyingPizzaTimeout;
function animateAddToCart(pizzaId){
  clearTimeout(flyingPizzaTimeout);
  const pizzaCard = [...document.querySelectorAll('.pizza-card')].find(card=>
    card.querySelector('button').onclick.toString().includes(`addToCart(${pizzaId})`)
  );
  if(!pizzaCard) return;
  const flying = pizzaCard.cloneNode(true);
  flying.style.position='fixed';
  flying.style.top=pizzaCard.getBoundingClientRect().top+'px';
  flying.style.left=pizzaCard.getBoundingClientRect().left+'px';
  flying.style.width=pizzaCard.offsetWidth+'px';
  flying.style.height=pizzaCard.offsetHeight+'px';
  flying.style.zIndex=2000;
  flying.style.transition='all 1s ease-in-out';
  flying.style.pointerEvents='none';
  document.body.appendChild(flying);

  const cartIcon = document.querySelector('.cart-list');
  const targetX = cartIcon.getBoundingClientRect().left;
  const targetY = cartIcon.getBoundingClientRect().top;

  requestAnimationFrame(()=>{
    flying.style.transform=`translate(${targetX - pizzaCard.getBoundingClientRect().left}px,${targetY - pizzaCard.getBoundingClientRect().top}px) scale(0.1)`;
    flying.style.opacity='0.5';
  });

  flyingPizzaTimeout = setTimeout(()=>{document.body.removeChild(flying);},1000);
}

function filterPizzas(){
  const search = document.getElementById('searchInput').value.toLowerCase();
  const filtered = pizzas.filter(p=> p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search));
  const menu = document.getElementById("pizzaMenu");
  menu.innerHTML = '';
  filtered.forEach(p=>{
    menu.innerHTML += `
    <li class="pizza-card">
      <img src="${p.img}" alt="${p.name} pizza" class="pizza-img" loading="lazy" />
      <span class="pizza-name">${p.name}<i class="fa fa-leaf" style="color:#21bf3c;font-size:1.03em"></i></span>
      <div class="pizza-desc">${p.desc}</div>
      <div class="pizza-price">₹${p.price}</div>
      <div class="pizza-action">
        <button class="add-btn" onclick="addToCart(${p.id})"><i class="fa fa-plus"></i> Add</button>
      </div>
    </li>
    `;
  });
}

function openOrderModal(){
  document.getElementById("orderModal").style.display = "flex";
  document.getElementById("orderForm").style.display = "block";
  document.getElementById("orderSummary").classList.add("hide");
  document.getElementById("confirmBtn").classList.add("hide");
  document.getElementById("orderMsg").textContent = "";
  document.getElementById("orderForm").reset();
}

function closeOrderModal(){
  document.getElementById("orderModal").style.display = "none";
}

// Order form submit
function submitOrder(e){
  e.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const totalText = document.getElementById("cartTotal").textContent;
  const total_price = totalText.replace("Total: ₹","").trim();
  if(!name || !address || !phone){
    alert("Please fill out all fields.");
    return;
  }
  
  const summaryEl = document.getElementById("orderSummary");
  let html = `<h3>Order Summary</h3><ul>`;
  cart.forEach((item) => {
    const p = pizzas.find(pz => pz.id === item.id);
    html += `<li><strong>${p.name}</strong> x ${item.qty} - ₹${p.price * item.qty}</li>`;
  });
  for(const [addon, price] of Object.entries(selectedAddons)){
    html += `<li><strong>${addon}</strong> - ₹${price}</li>`;
  }
  let totalAmt = 0;
  cart.forEach((item)=>{
    const p = pizzas.find(pz=>pz.id===item.id);
    totalAmt += p.price * item.qty;
  });
  totalAmt += Object.values(selectedAddons).reduce((a,b)=>a+b,0);
  let discountAmt = 0;
  if(coupon) discountAmt = discount < 1 ? totalAmt * discount : discount;
  let finalTotal = Math.max(totalAmt - discountAmt,0);
  html += `</ul><p class="order-summary-total">Total: ₹${finalTotal.toFixed(2)} (Discount: ₹${discountAmt.toFixed(2)})</p>`;
  html += `<p><strong>Name: </strong>${name}<br><strong>Address: </strong>${address}<br><strong>Phone: </strong>${phone}</p>`;
  summaryEl.innerHTML = html;
  summaryEl.classList.remove("hide");
  document.getElementById("orderForm").style.display = "none";
  document.getElementById("confirmBtn").classList.remove("hide");
}

// Confirm final order
function confirmOrder() {
  const name = document.getElementById("customerName").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const banner = document.getElementById("orderConfirmationBanner");
  const totalText = document.getElementById("cartTotal").textContent;
  const total_price = totalText.replace("Total: ₹", "").trim() || "0";

  if (!name || !address || !phone) {
    alert("Please fill all fields before confirming your order!");
    return;
  }


  let orderDesc = `Order Confirmed! Thank you, ${name}. Items: `;
  cart.forEach((item, idx) => {
    const p = pizzas.find(pz => pz.id === item.id);
    orderDesc += `${p.name} x${item.qty}`;
    if (idx < cart.length - 1) orderDesc += ", ";
  });
  const addonsList = Object.keys(selectedAddons);
  if (addonsList.length > 0) {
    if (cart.length > 0) orderDesc += ", ";
    orderDesc += addonsList.join(", ");
  }

 
  fetch("place_order.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `name=${encodeURIComponent(name)}&address=${encodeURIComponent(address)}&phone=${encodeURIComponent(phone)}&total_price=${encodeURIComponent(total_price)}`,
    credentials: "same-origin" // ensures session is sent
})

  .then(res => res.text())
  .then(response => {
    console.log(response); 
    banner.innerHTML = `<i class="fa fa-check-circle"></i> ${orderDesc}`;
    banner.style.display = "block";
    setTimeout(() => banner.style.display = "none", 6000);

    cart = [];
    selectedAddons = {};
    coupon = null;
    discount = 0;
    document.getElementById('couponInput').value = '';
    document.getElementById('couponMsg').textContent = '';
    renderCart();

    document.getElementById('confirmBtn').classList.add('hide');
    document.getElementById('orderSummary').classList.add('hide');
    document.getElementById('orderForm').style.display = 'block';
    closeOrderModal();
    document.getElementById('orderMsg').textContent = '🍕 Your order has been placed successfully!';
  })
  .catch(err => {
    console.error("Error:", err);
    alert("Failed to place order. Please try again.");
  });
}


function validateForm() {
  const phone = document.querySelector('input[type="tel"]');
  if (!/^[0-9]{10}$/.test(phone.value)) {
    alert("Please enter a valid 10-digit phone number");
    return false;
  }
  return true;
}

renderMenu(); renderCart();