const $detalleCard = document.getElementById("detalleCard");
let colorIndex = 0;
let textIndex = 0;
const colors = ["#ffffff", "red"];
const colors2 = ["#f24c3d", "#22a699"];
const textComprar = ["Añadir al carrito", "Añadido exitosamente"];
const ARRAY_CARRITO = [];
const ARRAY_FAVORITO = [];

const params = new URLSearchParams(location.search);
const id = params.get("id");
fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then((response) => response.json())
  .then((data) => {
    const idEncontrado = data.find((data) => data._id == id);
    $detalleCard.innerHTML = `<div class="card mb-3" style="max-width: 840px">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="${idEncontrado.imagen}"
            class="detail img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div class="text col-md-8">
          <div class="nameLike">
            <h5 class="card-title">${idEncontrado.producto}</h5>
            <i class="icon bi bi-heart-fill fs-2" id="corazon"></i>
          </div>
          <div class="info">
            <p class="card-text" id="price">$ ${idEncontrado.precio}</p>
            <p class="card-text" id="Disponibles">Disponibles: ${idEncontrado.disponibles}</p>
          </div>
          <p class="card-text" id="description">
          ${idEncontrado.descripcion}
          </p>
          <button id="comprar">Añadir al carrito</button>
        </div>
      </div>
    </div>`;
    const corazon = $detalleCard.querySelector("#corazon");
    corazon.addEventListener("click", () => {
      colorIndex = (colorIndex + 1) % colors.length;
      corazon.style.color = colors[colorIndex];

      const index = ARRAY_FAVORITO.indexOf(idEncontrado);
      if (index > -1) {
        ARRAY_FAVORITO.splice(index, 1);
      } else {
        ARRAY_FAVORITO.push(idEncontrado);
      }
    });
    const comprar = $detalleCard.querySelector("#comprar");
    comprar.addEventListener("click", () => {
      colorIndex = (colorIndex + 1) % colors2.length;
      comprar.style.backgroundColor = colors2[colorIndex];
      textIndex = (textIndex + 1) % textComprar.length;
      comprar.textContent = textComprar[textIndex];

      const index2 = ARRAY_CARRITO.indexOf(idEncontrado);
      if (index2 > -1) {
        ARRAY_CARRITO.splice(index2, 1);
      } else {
        ARRAY_CARRITO.push(idEncontrado);
      }
    });
    console.log(ARRAY_FAVORITO);
    console.log(ARRAY_CARRITO);
  })
  .catch((err) => console.log(err));
