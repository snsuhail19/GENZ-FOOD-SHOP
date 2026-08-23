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
    description: "Crispy Vada with chatneys",
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
    name: "White Rice",
    price: 30,
    description: "White rice with 3 gravys and veggies",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Pani Puri",
    price: 50,
    description: "Popular spicy Indian street snack",
    image: "panipoori.jpg"
  },
  {
    id: 7,
    name: "Pakoda",
    price: 40,
    description: "Crunchy onion pakoda",
    image: "pakoda.jpg"
  },
  {
    id: 8,
    name: "Momos",
    price: 80,
    description: "Steamed momos with spicy dip",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=700&q=80"
  }
];


// ================================
// CART
// ================================

let cart =
  JSON.parse(
    localStorage.getItem("genzCart")
  ) || [];


// ================================
// SAVE CART
// ================================

function saveCart() {

  localStorage.setItem(
    "genzCart",
    JSON.stringify(cart)
  );

  updateCartCount();

}


// ================================
// CART COUNT
// ================================

function updateCartCount() {

  const cartCount =
    document.getElementById("cartCount");

  if (!cartCount) return;

  cartCount.textContent =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

}


// ================================
// RENDER FOOD ITEMS
// ================================

function renderFoods() {

  const grid =
    document.getElementById("foodGrid");

  if (!grid) return;

  grid.innerHTML =
    foods.map(
      food => `

      <article class="food-card">

        <img
          src="${food.image}"
          alt="${food.name}"
          loading="lazy"
        >

        <div class="food-info">

          <h3>
            ${food.name}
          </h3>

          <p>
            ${food.description}
          </p>

          <div class="food-bottom">

            <span class="price">
              ₹${food.price}
            </span>

            <button
              class="add-btn"
              onclick="addToCart(${food.id})"
            >
              + Add
            </button>

          </div>

        </div>

      </article>

    `
    ).join("");

}


// ================================
// ADD TO CART
// ================================

function addToCart(id) {

  const food =
    foods.find(
      f => f.id === id
    );

  if (!food) return;


  const existing =
    cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.quantity++;

  }

  else {

    cart.push({
      ...food,
      quantity: 1
    });

  }


  saveCart();


  // IMPORTANT:
  // Cart popup will NOT open automatically.
  // Customer can click the Cart button manually.


  // Small confirmation
  const button =
    document.querySelector(
      `.add-btn[onclick="addToCart(${id})"]`
    );

  if (button) {

    const originalText =
      button.textContent;

    button.textContent =
      "✓ Added";

    button.disabled =
      true;


    setTimeout(() => {

      button.textContent =
        originalText;

      button.disabled =
        false;

    }, 800);

  }

}


// ================================
// CHANGE QUANTITY
// ================================

function changeQuantity(
  id,
  amount
) {

  const item =
    cart.find(
      i => i.id === id
    );


  if (!item) return;


  item.quantity += amount;


  if (
    item.quantity <= 0
  ) {

    cart =
      cart.filter(
        i => i.id !== id
      );

  }


  saveCart();

  renderCart();

}


// ================================
// REMOVE ITEM
// ================================

function removeItem(id) {

  cart =
    cart.filter(
      i => i.id !== id
    );

  saveCart();

  renderCart();

}


// ================================
// GET TOTAL
// ================================

function getTotal() {

  return cart.reduce(
    (sum, item) =>
      sum +
      item.price *
      item.quantity,
    0
  );

}


// ================================
// RENDER CART
// ================================

function renderCart() {

  const container =
    document.getElementById(
      "cartItems"
    );

  if (!container) return;


  if (
    cart.length === 0
  ) {

    container.innerHTML =
      '<div class="empty">Your cart is empty 🛒</div>';


    const total =
      document.getElementById(
        "cartTotal"
      );

    if (total) {

      total.textContent =
        "0";

    }

    return;

  }


  container.innerHTML =
    cart.map(
      item => `

      <div class="cart-item">

        <img
          src="${item.image}"
          alt="${item.name}"
        >

        <div class="cart-info">

          <h3>
            ${item.name}
          </h3>

          <p>
            ₹${item.price} ×
            ${item.quantity}
            =
            ₹${item.price * item.quantity}
          </p>

        </div>


        <div class="qty">

          <button
            onclick="changeQuantity(${item.id}, -1)"
          >
            −
          </button>


          <strong>
            ${item.quantity}
          </strong>


          <button
            onclick="changeQuantity(${item.id}, 1)"
          >
            +
          </button>


          <button
            class="remove"
            onclick="removeItem(${item.id})"
          >
            Remove
          </button>

        </div>

      </div>

    `
    ).join("");


  const total =
    document.getElementById(
      "cartTotal"
    );

  if (total) {

    total.textContent =
      getTotal();

  }

}


// ================================
// OPEN CART
// ================================

function openCart() {

  const modal =
    document.getElementById(
      "cartModal"
    );

  if (!modal) return;


  modal.style.display =
    "block";

  renderCart();

}


// ================================
// CLOSE CART
// ================================

function closeCart() {

  const modal =
    document.getElementById(
      "cartModal"
    );

  if (!modal) return;


  modal.style.display =
    "none";

}


// ================================
// GO TO PAYMENT
// ================================

function goToPayment() {

  if (
    cart.length === 0
  ) {

    alert(
      "Please add food to your cart first."
    );

    return;

  }


  window.location.href =
    "payment.html";

}


// ================================
// CLOSE CART WHEN CLICKING OUTSIDE
// ================================

window.onclick =
  function(event) {

    const modal =
      document.getElementById(
        "cartModal"
      );


    if (
      event.target === modal
    ) {

      closeCart();

    }

  };


// ================================
// START
// ================================

renderFoods();

updateCartCount();