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
    $detalleCard.innerHTML = `
    <div class="details-card">
        <img src="${idEncontrado.imagen}" class="details-image" alt="..." />
        <div class="texto-detalles">
            <div class="nameLike p-gradient">
                <h5 class="card-title">${idEncontrado.producto}</h5>
            </div>
            <div class="info">
                <p class="card-text" id="price">$ ${idEncontrado.precio}</p>
                <p class="card-text" id="Disponibles">Disponibles: ${idEncontrado.disponibles}</p>
            </div>
            <p class="card-text" id="description">
                ${idEncontrado.descripcion}
            </p>
            <button class="p-gradient" id="comprar">Añadir al carrito</button>
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
      localStorage.setItem("carrito", JSON.stringify(ARRAY_CARRITO));
    });
    console.log(ARRAY_FAVORITO);
    console.log("ARRAY_CARRITO", ARRAY_CARRITO);
  })
  .catch((err) => console.log(err));
