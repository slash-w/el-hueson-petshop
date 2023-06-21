
function createCartItem(producto) {
  const container = document.getElementById("cart");

  const row = document.createElement("div");
  row.classList.add("row");

  const innerRow = document.createElement("div");
  innerRow.classList.add("row", "main", "align-items-center");

  const imgCol = document.createElement("div");
  imgCol.classList.add("col-2");

  const img = document.createElement("img");
  img.classList.add("img-fluid");
  img.src = producto.imagen;

  imgCol.appendChild(img);

  const detailsCol = document.createElement("div");
  detailsCol.classList.add("colTitle");

  const categoryRow = document.createElement("div");
  categoryRow.classList.add("row", "text-muted");
  categoryRow.textContent = producto.categoria.toUpperCase();

  const nameRow = document.createElement("div");
  nameRow.classList.add("row");
  nameRow.textContent = producto.producto;

  detailsCol.appendChild(categoryRow);
  detailsCol.appendChild(nameRow);

  const quantityCol = document.createElement("div");
  quantityCol.classList.add("col");

  const minusLink = document.createElement("a");
  minusLink.href = "#";
  minusLink.textContent = "-";

  const quantityLink = document.createElement("a");
  quantityLink.classList.add("border");
  quantityLink.textContent = "1";

  const plusLink = document.createElement("a");
  plusLink.href = "#";
  plusLink.textContent = "+";

  quantityCol.appendChild(minusLink);
  quantityCol.appendChild(quantityLink);
  quantityCol.appendChild(plusLink);

  const priceCol = document.createElement("div");
  priceCol.classList.add("col");
  priceCol.textContent = `$ ${producto.precio}`;

  const closeSpan = document.createElement("span");
  closeSpan.innerHTML = " &#10005;";
  closeSpan.classList.add("close");

  closeSpan.addEventListener("click", () => {
    container.removeChild(row);
    updateProductCount();
    updateCartPrice();
  });

  const updateTotalPrice = () => {
    const quantity = parseInt(quantityLink.textContent);
    const totalPrice = producto.precio * quantity;
    priceCol.textContent = `$ ${totalPrice.toFixed(2)}`;
    updateProductCount();
    updateCartPrice();
  };

  minusLink.addEventListener("click", () => {
    let quantity = parseInt(quantityLink.textContent);
    if (quantity > 1) {
      quantity--;
      quantityLink.textContent = quantity.toString();
      updateTotalPrice();
    }
  });

  plusLink.addEventListener("click", () => {
    let quantity = parseInt(quantityLink.textContent);
    if (quantity < producto.disponibles) {
      quantity++;
      quantityLink.textContent = quantity.toString();
      updateTotalPrice();
    }
  });

  innerRow.appendChild(imgCol);
  innerRow.appendChild(detailsCol);
  innerRow.appendChild(quantityCol);
  innerRow.appendChild(priceCol);
  innerRow.appendChild(closeSpan);

  row.appendChild(innerRow);

  container.appendChild(row);
}

const ARRAY_CARRITO = ["63a28d36cc6fff6724518aa3"]; // Example array in detalles.js
const productCountLabel = document.getElementById("productCount");
const cartPriceElement = document.getElementById("cartPrice");

function updateProductCount() {
  const quantityLinks = document.querySelectorAll("#cart .row .col a.border");
  let sum = 0;
  quantityLinks.forEach((quantityLink) => {
    sum += parseInt(quantityLink.textContent);
  });
  productCountLabel.textContent = sum.toString();
}

function updateCartPrice() {
  const cartItems = document.querySelectorAll("#cart .row .col");
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const priceText = item.textContent;
    const price = parseFloat(priceText.substring(2).replace(",", ""));

    if (!isNaN(price)) {
      totalPrice += price;
    }
  });

  cartPriceElement.textContent = `$ ${totalPrice.toFixed(2)}`;
}

ARRAY_CARRITO.forEach((producto) => {
  createCartItem(producto);
});

updateProductCount();
updateCartPrice();
