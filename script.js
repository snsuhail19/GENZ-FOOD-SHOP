// ================================
// EDIT YOUR FOOD ITEMS HERE
// ================================
const foods = [
  {
    id: 1,
    name: "Samosa",
    price: 20,
    description: "Crispy potato-filled with ketchup",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Vada",
    price: 30,
    description: "Crispy Vada with chatney's",
    image: "vada.jpg"
  },
  {
    id: 3,
    name: "Masala Dosa",
    price: 70,
    description: "Dosa with delicious masala filling",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Idli",
    price: 40,
    description: "Soft steamed South Indian idli",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Bajji",
    price: 30,
    description: "Hot and crispy Indian fritters",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Pani Puri",
    price: 50,
    description: "Popular spicy Indian street snack",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 7,
    name: "Pakoda",
    price: 40,
    description: "Crunchy onion pakoda",
    image: "https://images.unsplash.com/photo-1626776876729-bab436b5e42b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    name: "Momos",
    price: 80,
    description: "Steamed momos with spicy dip",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=700&q=80"
  }
];

let cart = JSON.parse(localStorage.getItem("genzCart")) || [];

function saveCart() {
  localStorage.setItem("genzCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cartCount").textContent =
    cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderFoods() {
  const grid = document.getElementById("foodGrid");
  grid.innerHTML = foods.map(food => `
    <article class="food-card">
      <img src="${food.image}" alt="${food.name}" loading="lazy">
      <div class="food-info">
        <h3>${food.name}</h3>
        <p>${food.description}</p>
        <div class="food-bottom">
          <span class="price">₹${food.price}</span>
          <button class="add-btn" onclick="addToCart(${food.id})">+ Add</button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const food = foods.find(f => f.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...food, quantity: 1});
  }

  saveCart();
  openCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderCart() {
  const container = document.getElementById("cartItems");

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty">Your cart is empty 🛒</div>';
    document.getElementById("cartTotal").textContent = "0";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</p>
      </div>
      <div class="qty">
        <button onclick="changeQuantity(${item.id}, -1)">−</button>
        <strong>${item.quantity}</strong>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
        <button class="remove" onclick="removeItem(${item.id})">Remove</button>
      </div>
    </div>
  `).join("");

  document.getElementById("cartTotal").textContent = getTotal();
}

function openCart() {
  document.getElementById("cartModal").style.display = "block";
  renderCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function goToPayment() {
  if (cart.length === 0) {
    alert("Please add food to your cart first.");
    return;
  }
  window.location.href = "payment.html";
}

window.onclick = function(event) {
  const modal = document.getElementById("cartModal");
  if (event.target === modal) closeCart();
};

renderFoods();
updateCartCount();
