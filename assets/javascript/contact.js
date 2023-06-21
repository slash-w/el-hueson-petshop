
const button = document.querySelector(".miBoton");
const formulario = document.getElementById("formulario1");
const box = document.querySelector(".box");
const caja1 = document.querySelector(".caja1");
const caja2 = document.querySelector(".caja2");
const caja3 = document.querySelector(".caja3");
const radio = document.querySelectorAll(".radio1")

formulario.addEventListener("submit", function(event){
    event.preventDefault();
    Swal.fire(
        {
            title: 'Gracias por su consulta',
            customClass: {
                confirmButton: 'my-custom-button-class'
            }
        }
    )
    caja1.value = ""
    caja2.value = ""
    caja3.value = ""
    for(let i of radio){
        i.checked=false
    }
})
    
