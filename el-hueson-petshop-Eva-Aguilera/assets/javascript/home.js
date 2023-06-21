const contenedor = document.getElementById("productoscontainer");
const destacados = document.getElementById("destacadoscontainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const noResultsMessage = document.getElementById("no-results-message");

function imprimirCards(cards, container) {
  let plantilla = '';
  for (const card of cards) {
    plantilla += `<div class="card">
      <a href="./assets/pages/detalles.html?id=${card._id}" >
          <img src="${card.imagen}" class="card-img-top" alt="rueda">
      </a>
      <div class="card-body">
          <h5 class="card-price">$${card.precio}</h5>
          <p class="card-text">
              <span class="disponibilidad disponible">${card.producto}</span><br>
              <span class="card-name">${card.descripcion}</span>
          </p>
      </div>
  </div>`;
  }
  container.innerHTML = plantilla;
}

function mostrarCard(data) {
  if (data.length === 0) {
    noResultsMessage.style.display = "block";
    contenedor.innerHTML = "";
  } else {
    noResultsMessage.style.display = "none";
    contenedor.innerHTML = "";
    imprimirCards(data, contenedor);
  }
}

function filtrarProductos(event) {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente
  const busqueda = searchInput.value.toLowerCase().trim();

  fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then(response => response.json())
    .then(data => {
      const productosFiltrados = data.filter(product => {
        const nombreProducto = product.producto.toLowerCase();
        const descripcionProducto = product.descripcion.toLowerCase();
        return nombreProducto.includes(busqueda) || descripcionProducto.includes(busqueda);
      });
      mostrarCard(productosFiltrados);
    })
    .catch(err => console.log(err));
}

searchButton.addEventListener("click", filtrarProductos);

fetch('https://mindhub-xj03.onrender.com/api/petshop')
  .then(response => response.json())
  .then(data => {
    imprimirCards(data, contenedor);
    const filteredProducts = data.filter(product => product.disponibles === 1);
    const productosDestacados = filteredProducts.slice(0, 4);
    imprimirCards(productosDestacados, destacados);
  })
  .catch(err => console.log(err));
