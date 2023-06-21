const contenedor = document.getElementById("productos-container");
const destacados = document.getElementById("destacados-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const noResultsMessage = document.getElementById("no-results-message");
// modificado samuel
const ARRAY_CARRITO = [];
// fin modificacion samuel
function imprimirCards(cards, container) {
  let plantilla = "";
  for (const card of cards) {
    plantilla += `
    
    <div class="card">
        <a href="./assets/pages/detalles.html?id=${card._id}">
            <img src="${card.imagen}" class="card-img-top" alt="rueda">
        </a>
        <div class="card-body">
            <div class="card-header">
                <h5 class="card-price">$${card.precio}</h5>
                <button class="add-to-cart" data-id="${card._id}"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
            <p class="card-text">
                <span class="disponibilidad disponible">${card.producto}</span><br>
                <span class="card-name">${card.descripcion}</span>
            </p>
        </div>
    </div>`;
  }
  container.innerHTML = plantilla;
  // modificado samuel
  const carritoButton = container.querySelectorAll(".add-to-cart");
  carritoButton.forEach((button) => {
    button.addEventListener("click", () => {
      const cardId = button.dataset.id;
      const selectedCard = cards.find((card) => card._id === cardId);
      const existingIndex = ARRAY_CARRITO.findIndex(
        (card) => card._id === selectedCard._id
      );
      if (existingIndex !== -1) {
        ARRAY_CARRITO.splice(existingIndex, 1);
        console.log(ARRAY_CARRITO);
      } else {
        ARRAY_CARRITO.push(selectedCard);
        console.log(ARRAY_CARRITO);
      }
      localStorage.setItem("carrito", JSON.stringify(ARRAY_CARRITO));
    });
  });
  // fin modificacion samuel
}

function mostrarCard(data) {
  if (data.length === 0) {
    noResultsMessage.style = "display: block";
    contenedor.innerHTML = "";
  } else {
    noResultsMessage.style = "display: none";
    contenedor.innerHTML = "";
    imprimirCards(data, contenedor);
  }
}

function filtrarProductos(event) {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente
  const busqueda = searchInput.value.toLowerCase().trim();

  fetch("https://mindhub-xj03.onrender.com/api/petshop")
    .then((response) => response.json())
    .then((data) => {
      const productosFiltrados = data.filter((product) => {
        const nombreProducto = product.producto.toLowerCase();
        const descripcionProducto = product.descripcion.toLowerCase();
        return (
          nombreProducto.includes(busqueda) ||
          descripcionProducto.includes(busqueda)
        );
      });
      mostrarCard(productosFiltrados);
    })
    .catch((err) => console.log(err));
}

fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then((response) => response.json())
  .then((data) => {
    imprimirCards(data, contenedor);
    const filteredProducts = data.filter(
      (product) => product.disponibles === 1
    );
    const productosDestacados = filteredProducts.slice(0, 3);
    imprimirCards(productosDestacados, destacados);
  })
  .catch((err) => console.log(err));

searchButton.addEventListener("click", filtrarProductos);